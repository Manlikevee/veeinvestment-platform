"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, KeyRound } from "lucide-react";
import { AuthAlert, AuthFooterLink, AuthIntro, AuthSuccess } from "@/components/forms/auth/auth-message";
import { Input, PasswordInput } from "@/components/ui/form-field";
import { PasswordStrength } from "@/components/ui/password-strength";
import { passwordStrength } from "@/lib/utils/validation";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState(searchParams.get("token") || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!code.trim()) nextErrors.code = "Enter the reset code from your email.";
    if (passwordStrength(password).score < 4) nextErrors.password = "Choose a stronger password.";
    if (password !== confirm) nextErrors.confirm = "Passwords do not match.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setComplete(true);
  }

  if (complete) {
    return (
      <div className="auth-card">
        <AuthSuccess
          icon="check-circle"
          title="Password updated in this demonstration"
          description="In a live environment, the backend would invalidate existing sessions and confirm the change by email. This interface has not changed any real credentials."
        >
          <Link href="/auth/login" className="btn btn-primary">Return to sign in</Link>
        </AuthSuccess>
        <AuthFooterLink prompt="Need help?" linkLabel="Contact support" href="/contact" />
      </div>
    );
  }

  return (
    <div className="auth-card">
      <AuthIntro
        eyebrow="Account recovery"
        title="Choose a new password"
        description={email ? `Resetting access for ${email}.` : "Enter the code sent to your email and choose a new password."}
      />
      <AuthAlert tone="info">
        For the demonstration, any 6-digit reset code is accepted by the interface. No password is changed or stored.
      </AuthAlert>
      {Object.keys(errors).length ? <AuthAlert>Please review the highlighted fields.</AuthAlert> : null}
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <Input label="Reset code" name="code" value={code} onChange={(event) => setCode(event.target.value)} placeholder="6-digit code" inputMode="numeric" error={errors.code} required />
        <PasswordInput label="New password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" error={errors.password} required />
        <PasswordStrength password={password} />
        <PasswordInput label="Confirm new password" name="confirm" value={confirm} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" error={errors.confirm} required />
        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="button-spinner" /> : <KeyRound size={17} />}
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
      <p className="auth-secure-note"><CheckCircle2 size={14} /> Passwords are never stored in browser storage by this frontend.</p>
      <AuthFooterLink prompt="Remembered your password?" linkLabel="Sign in" href="/auth/login" />
    </div>
  );
}
