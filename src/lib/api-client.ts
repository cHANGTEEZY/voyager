import * as SecureStore from "expo-secure-store";
import axios, {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type RawAxiosHeaders,
} from "axios";

const BASE_URL =
  (process.env.EXPO_PUBLIC_API_URL as string | undefined) ??
  "http://localhost:8000/api";
const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 300;

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retryCount?: number;
    _skipAuthRefresh?: boolean;
  }
}

export type RequestConfig = Omit<
  AxiosRequestConfig,
  "baseURL" | "data" | "method" | "url"
> & {
  _skipAuthRefresh?: boolean;
};

export interface ValidationErrors {
  [field: string]: string[];
}

interface ApiErrorBody {
  message?: string;
  error?: string;
  code?: string;
  errors?: ValidationErrors;
}

export interface CancellableRequest<TResponse> {
  request: Promise<TResponse>;
  cancel: (reason?: string) => void;
}

export interface ApiClient {
  get: <TResponse>(url: string, config?: RequestConfig) => Promise<TResponse>;
  post: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: RequestConfig,
  ) => Promise<TResponse>;
  put: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: RequestConfig,
  ) => Promise<TResponse>;
  patch: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: RequestConfig,
  ) => Promise<TResponse>;
  delete: <TResponse = void>(
    url: string,
    config?: RequestConfig,
  ) => Promise<TResponse>;
  upload: <TResponse>(
    url: string,
    formData: FormData,
    onProgress?: (percent: number) => void,
    config?: RequestConfig,
  ) => Promise<TResponse>;
  cancellable: <TResponse>(
    url: string,
    config?: RequestConfig,
  ) => CancellableRequest<TResponse>;
  instance: AxiosInstance;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly validationErrors: ValidationErrors | null;
  readonly originalError: AxiosError;

  constructor(
    message: string,
    status: number,
    code: string,
    validationErrors: ValidationErrors | null,
    originalError: AxiosError,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.validationErrors = validationErrors;
    this.originalError = originalError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isConflict(): boolean {
    return this.status === 409;
  }

  isValidation(): boolean {
    return this.status === 422;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isTimeout(): boolean {
    return this.code === "TIMEOUT";
  }

  isNetwork(): boolean {
    return this.code === "NETWORK_ERROR";
  }
}

const ACCESS_TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const memoryTokens = {
  access: null as string | null,
  refresh: null as string | null,
};

export const tokenStore = {
  getToken: (): string | null => memoryTokens.access,
  setToken: (token: string): void => {
    memoryTokens.access = token;
    void SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },
  clearToken: (): void => {
    memoryTokens.access = null;
    void SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: (): string | null => memoryTokens.refresh,
  setRefreshToken: (token: string): void => {
    memoryTokens.refresh = token;
    void SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  },
  clearRefreshToken: (): void => {
    memoryTokens.refresh = null;
    void SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
  clearAll: (): void => {
    memoryTokens.access = null;
    memoryTokens.refresh = null;
    void SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    void SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
  hydrate: async (): Promise<void> => {
    memoryTokens.access = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    memoryTokens.refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },
} as const;

type UnauthorizedListener = () => void;
const unauthorizedListeners = new Set<UnauthorizedListener>();

export const authEvents = {
  onUnauthorized: (listener: UnauthorizedListener): (() => void) => {
    unauthorizedListeners.add(listener);
    return () => {
      unauthorizedListeners.delete(listener);
    };
  },
  emitUnauthorized: (): void => {
    for (const listener of unauthorizedListeners) {
      listener();
    }
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return isRecord(value);
}

function parseValidationErrors(value: unknown): ValidationErrors | null {
  if (!isRecord(value)) {
    return null;
  }

  const entries = Object.entries(value).filter(
    (entry): entry is [string, string[]] =>
      Array.isArray(entry[1]) &&
      entry[1].every((item) => typeof item === "string"),
  );

  return entries.length > 0 ? Object.fromEntries(entries) : null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isRetryable(error: AxiosError, attempt: number): boolean {
  if (attempt >= MAX_RETRIES) {
    return false;
  }

  if (!error.response) {
    return true;
  }

  const { status } = error.response;
  return status === 429 || (status >= 500 && status !== 501);
}

function retryDelay(attempt: number, error: AxiosError): number {
  const retryAfterHeader = error.response?.headers["retry-after"];
  if (retryAfterHeader) {
    return Number(retryAfterHeader) * 1_000;
  }

  return RETRY_BASE_DELAY_MS * 2 ** attempt + Math.random() * 100;
}

type RefreshQueueEntry = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let refreshQueue: RefreshQueueEntry[] = [];

function flushRefreshQueue(error: unknown, token: string | null): void {
  for (const entry of refreshQueue) {
    if (error) {
      entry.reject(error);
    } else if (token) {
      entry.resolve(token);
    }
  }

  refreshQueue = [];
}

async function doTokenRefresh(): Promise<string> {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const { data } = await axios.post<{ access_token: string }>(
    `${BASE_URL}/auth/refresh`,
    { refresh_token: refreshToken },
  );

  tokenStore.setToken(data.access_token);
  return data.access_token;
}

function normalizeError(error: AxiosError): ApiError {
  const status = error.response?.status ?? 0;
  const data = isApiErrorBody(error.response?.data)
    ? error.response.data
    : undefined;

  if (!error.response) {
    const isTimeout =
      error.code === "ECONNABORTED" || error.code === "ERR_CANCELED";

    return new ApiError(
      isTimeout
        ? "Request timed out. Please try again."
        : "Network error. Please check your connection.",
      status,
      isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
      null,
      error,
    );
  }

  const message = String(
    data?.message ?? data?.error ?? error.message ?? "An unexpected error occurred",
  );
  const code = String(data?.code ?? `HTTP_${status}`);
  const validationErrors = parseValidationErrors(data?.errors);

  return new ApiError(message, status, code, validationErrors, error);
}

const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStore.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config._retryCount ??= 0;
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig | undefined;
    if (!config) {
      return Promise.reject(normalizeError(error));
    }

    if (error.response?.status === 401 && !config._skipAuthRefresh) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`;
          return httpClient(config);
        });
      }

      isRefreshing = true;

      try {
        const newToken = await doTokenRefresh();
        flushRefreshQueue(null, newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
        return httpClient(config);
      } catch (refreshError) {
        flushRefreshQueue(refreshError, null);
        tokenStore.clearAll();
        authEvents.emitUnauthorized();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const attempt = config._retryCount ?? 0;
    if (isRetryable(error, attempt)) {
      config._retryCount = attempt + 1;
      await sleep(retryDelay(attempt, error));
      return httpClient(config);
    }

    return Promise.reject(normalizeError(error));
  },
);

async function get<TResponse>(
  url: string,
  config?: RequestConfig,
): Promise<TResponse> {
  const response = await httpClient.get<TResponse>(url, config);
  return response.data;
}

async function post<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: RequestConfig,
): Promise<TResponse> {
  const response = await httpClient.post<TResponse>(url, data, config);
  return response.data;
}

async function put<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: RequestConfig,
): Promise<TResponse> {
  const response = await httpClient.put<TResponse>(url, data, config);
  return response.data;
}

async function patch<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: RequestConfig,
): Promise<TResponse> {
  const response = await httpClient.patch<TResponse>(url, data, config);
  return response.data;
}

async function del<TResponse = void>(
  url: string,
  config?: RequestConfig,
): Promise<TResponse> {
  const response = await httpClient.delete<TResponse>(url, config);
  return response.data;
}

function resolveHeaders(
  headers: RequestConfig["headers"] | undefined,
): AxiosHeaders {
  if (!headers) {
    return new AxiosHeaders();
  }

  if (headers instanceof AxiosHeaders) {
    return headers;
  }

  if (typeof headers === "string") {
    return new AxiosHeaders(headers);
  }

  return new AxiosHeaders(headers as RawAxiosHeaders);
}

async function upload<TResponse>(
  url: string,
  formData: FormData,
  onProgress?: (percent: number) => void,
  config?: RequestConfig,
): Promise<TResponse> {
  const headers = resolveHeaders(config?.headers);
  headers.set("Content-Type", "multipart/form-data");

  const response = await httpClient.post<TResponse>(url, formData, {
    ...config,
    headers,
    onUploadProgress: (event) => {
      config?.onUploadProgress?.(event);
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded * 100) / event.total));
      }
    },
  });

  return response.data;
}

function cancellable<TResponse>(
  url: string,
  config?: RequestConfig,
): CancellableRequest<TResponse> {
  const controller = new AbortController();
  const request = get<TResponse>(url, { ...config, signal: controller.signal });

  return {
    request,
    cancel: (reason?: string) => {
      controller.abort(reason);
    },
  };
}

export const api: ApiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
  cancellable,
  instance: httpClient,
};
