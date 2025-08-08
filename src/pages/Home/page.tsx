import { useQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";

import api from "@/web/api/client";
import { Query } from "@/web/components/custom/Query";
import { Button } from "@/web/components/ui/button";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
} from "@/web/components/ui/text-field";

export const Home = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [submitting, setSubmitting] = createSignal(false);
  const [emailError, setEmailError] = createSignal<string | null>(null);
  const [passwordError, setPasswordError] = createSignal<string | null>(null);

  const helloQuery = useQuery(() => ({
    queryKey: ["hello"],
    queryFn: async () => {
      const response = await api.get();
      return response.data;
    },
  }));

  const isValidEmail = (value: string) => /^(?:[^\s@]+@[^\s@]+\.[^\s@]+)$/.test(value.trim());

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    const nextEmail = email().trim();
    const nextPassword = password();

    let isValid = true;
    if (!isValidEmail(nextEmail)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (nextPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (!isValid) return;

    setSubmitting(true);
    try {
      // TODO: Replace with real auth call
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="min-h-screen bg-background flex items-center justify-center p-6">
      <div class="w-full max-w-md rounded-lg border border-border bg-card shadow-sm">
        <div class="p-6">
          <h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p class="mt-1 text-sm text-muted-foreground">Sign in to your account</p>

          <div class="mt-4 text-sm">
            <Query
              query={helloQuery}
              loading={<span>Loading greeting…</span>}
              error={() => <span class="text-red-500">Failed to load greeting</span>}
            >
              {(data) => (
                <>
                  <span class="text-muted-foreground">Server says: </span>
                  <span class="font-medium">{data}</span>
                </>
              )}
            </Query>
          </div>

          <form class="mt-6 space-y-4" onSubmit={handleSubmit}>
            <TextField required validationState={emailError() ? "invalid" : "valid"}>
              <TextFieldLabel>Email</TextFieldLabel>
              <TextFieldInput
                type="email"
                placeholder="you@example.com"
                value={email()}
                onInput={(e) => {
                  setEmail(e.currentTarget.value);
                  if (emailError()) setEmailError(null);
                }}
              />
              <TextFieldErrorMessage>{emailError()}</TextFieldErrorMessage>
            </TextField>

            <TextField required validationState={passwordError() ? "invalid" : "valid"}>
              <TextFieldLabel>Password</TextFieldLabel>
              <TextFieldInput
                type="password"
                placeholder="••••••••"
                value={password()}
                onInput={(e) => {
                  setPassword(e.currentTarget.value);
                  if (passwordError()) setPasswordError(null);
                }}
              />
              <TextFieldErrorMessage>{passwordError()}</TextFieldErrorMessage>
            </TextField>

            <div class="flex items-center justify-between">
              <a href="#" class="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" class="w-full" disabled={submitting()}>
              {submitting() ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p class="mt-6 text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a href="#" class="text-primary hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
