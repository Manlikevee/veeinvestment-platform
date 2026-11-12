import { Suspense } from "react";
import { VerificationCodeForm } from "@/features/auth/verification-code-form";

export const metadata = { title: "Verify phone" };

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="auth-form-skeleton" aria-label="Loading OTP verification" />}>
      <VerificationCodeForm mode="phone" />
    </Suspense>
  );
}
