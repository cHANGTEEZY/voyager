import { PasswordField } from "@/components/auth/password-field";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { AuthHeader } from "@/components/auth/auth-header";
import { authClient } from "@/lib/auth-client";
import { Link, router } from "expo-router";
import { Button, Input, Separator, Spinner, Typography, TextField } from "heroui-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message ?? "Sign in failed. Please try again.");
        return;
      }

      router.replace("/(tabs)");
    } catch {
      setError("Unable to reach the server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Typography.Heading type="h2" weight="bold" className="mb-2 text-foreground">
            Welcome back
          </Typography.Heading>
          <Typography.Paragraph color="muted">
            Log in to continue your adventures.
          </Typography.Paragraph>
        </View>

        <View className="gap-4">
          <TextField>
            <Typography type="body-sm" color="muted" className="mb-1">
              Email address
            </Typography>
            <Input
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </TextField>

          <PasswordField
            label="Password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {error ? (
          <Typography type="body-sm" className="mt-4 text-danger">
            {error}
          </Typography>
        ) : null}

        <Button
          size="lg"
          className="mt-6 w-full"
          isDisabled={isSubmitting}
          onPress={handleLogin}
        >
          {isSubmitting ? (
            <Spinner size="sm" color="white" />
          ) : (
            <Button.Label>Log In</Button.Label>
          )}
        </Button>

        <View className="my-8">
          <Separator />
          <Typography type="body-xs" align="center" color="muted" className="my-3 uppercase">
            Or sign in with
          </Typography>
          <Separator />
        </View>

        <SocialAuthButtons
          mode="sign-in"
          onUnavailable={() => {
            setError("Social sign in is not configured yet.");
          }}
        />

        <View className="mt-8 flex-row items-center justify-center gap-1">
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
