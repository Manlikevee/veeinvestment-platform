import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/reset-password-form";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="auth-form-skeleton" aria-label="Loading password reset form" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
