import { useCSSVariable } from "uniwind";

export function useHeaderIconColor(fallback = "#1a1a1a") {
  const foregroundColor = useCSSVariable("--foreground");
  return typeof foregroundColor === "string" ? foregroundColor : fallback;
}
