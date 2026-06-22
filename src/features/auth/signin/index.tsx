import { AuthHeader } from "@/components/auth/auth-header";
import { PasswordField } from "@/components/auth/password-field";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { LabeledSeparator } from "@/components/ui/labeled-separator";
import { authClient } from "@/lib/auth-client";
import getFieldErrorMessage from "@/lib/utils/get-field-error";
import { useForm } from "@tanstack/react-form";
import { Link } from "expo-router";
import { Button, Input, Spinner, TextField, Typography } from "heroui-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onBlur: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { error: signInError } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "/(tabs)",
        });

        if (signInError) {
          setError(signInError.message ?? "Sign in failed. Please try again.");
          return;
        }
      } catch (error) {
        console.error(error);
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
            Welcome back
          </Typography.Heading>
          <Typography.Paragraph color="muted">
            Log in to continue your adventures.
          </Typography.Paragraph>
        </View>

        <View className="gap-4">
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
                <Button.Label>Log In</Button.Label>
              )}
            </Button>
          )}
        </form.Subscribe>

        <LabeledSeparator label="Or sign in with" />

        <SocialAuthButtons
          mode="sign-in"
          onUnavailable={() => {
            setError("Social sign in is not configured yet.");
          }}
        />

        <View className="mt-8 flex-row items-center justify-center">
          <Typography.Paragraph type="body-sm" color="muted">
            Don&apos;t have an account?
          </Typography.Paragraph>
          <Link href="/(auth)/signup" asChild>
            <Button variant="ghost" size="sm">
              <Button.Label className="text-accent">Sign Up</Button.Label>
            </Button>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
