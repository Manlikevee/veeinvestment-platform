import { Suspense } from "react";
import { VerificationCodeForm } from "@/features/auth/verification-code-form";

export const metadata = { title: "Verify email" };

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="auth-form-skeleton" aria-label="Loading email verification" />}>
      <VerificationCodeForm mode="email" />
    </Suspense>
  );
}
