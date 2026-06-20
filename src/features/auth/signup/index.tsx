import { AuthHeader } from "@/components/auth/auth-header";
import { PasswordField } from "@/components/auth/password-field";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { LabeledSeparator } from "@/components/ui/labeled-separator";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Link, router } from "expo-router";
import { Button, Input, Spinner, TextField, Typography } from "heroui-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

import getFieldErrorMessage from "@/lib/utils/get-field-error";

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } satisfies SignUpValues,
    validators: {
      onBlur: signUpSchema,
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      try {
        const { error: signUpError } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
        });

        if (signUpError) {
          setError(signUpError.message ?? "Sign up failed. Please try again.");
          return;
        }

        router.replace("/(tabs)");
      } catch (caughtError: unknown) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to reach the server. Check your connection and try again.",
        );
      }
    },
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AuthHeader />
      <ScrollView
        contentContainerClassName="grow px-6 pb-8"
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="mb-8 mt-4">
          <Typography.Heading
            type="h2"
            weight="bold"
            className="mb-2 text-foreground"
          >
            Join the journey
          </Typography.Heading>
          <Typography.Paragraph color="muted">
            Document your adventures and share stories.
          </Typography.Paragraph>
        </View>

        <View className="gap-4">
          <form.Field name="name">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              const errorMessage = getFieldErrorMessage(
                field.state.meta.errors,
              );

              return (
                <TextField isInvalid={hasError}>
                  <Typography type="body-sm" color="muted" className="mb-1">
                    Full Name
                  </Typography>
                  <Input
                    placeholder="Your name"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    autoCapitalize="words"
                  />
                  {hasError && errorMessage ? (
                    <Typography type="body-sm" className="mt-1 text-danger">
                      {errorMessage}
                    </Typography>
                  ) : null}
                </TextField>
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              const errorMessage = getFieldErrorMessage(
                field.state.meta.errors,
              );

              return (
                <TextField isInvalid={hasError}>
                  <Typography type="body-sm" color="muted" className="mb-1">
                    Email address
                  </Typography>
                  <Input
                    placeholder="Email address"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                  />
                  {hasError && errorMessage ? (
                    <Typography type="body-sm" className="mt-1 text-danger">
                      {errorMessage}
                    </Typography>
                  ) : null}
                </TextField>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              const errorMessage = getFieldErrorMessage(
                field.state.meta.errors,
              );

              return (
                <PasswordField
                  label="Password"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  onBlur={field.handleBlur}
                  isInvalid={hasError}
                  errorMessage={errorMessage}
                />
              );
            }}
          </form.Field>
        </View>

        {error ? (
          <Typography type="body-sm" className="mt-4 text-danger">
            {error}
          </Typography>
        ) : null}

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              size="lg"
              className="mt-6 w-full"
              isDisabled={isSubmitting}
              onPress={() => form.handleSubmit()}
            >
              {isSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                <Button.Label>Create Account</Button.Label>
              )}
            </Button>
          )}
        </form.Subscribe>

        <LabeledSeparator label="Or sign up with" />

        <SocialAuthButtons
          mode="sign-up"
          onUnavailable={() => {
            setError("Social sign up is not configured yet.");
          }}
        />

        <View className="mt-8 flex-row items-center justify-center gap-1">
          <Typography.Paragraph type="body-sm" color="muted">
            Already have an account?
          </Typography.Paragraph>
          <Link href="/(auth)/login" asChild>
            <Button variant="ghost" size="sm">
              <Button.Label className="text-accent">Log In</Button.Label>
            </Button>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
