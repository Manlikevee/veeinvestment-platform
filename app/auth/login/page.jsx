import { Suspense } from "react";
import { LoginForm } from "@/features/auth/login-form";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-form-skeleton" aria-label="Loading sign-in form" />}>
      <LoginForm />
    </Suspense>
  );
}
