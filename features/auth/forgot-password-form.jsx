"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { AuthAlert, AuthFooterLink, AuthIntro, AuthSuccess } from "@/components/forms/auth/auth-message";
import { Input } from "@/components/ui/form-field";
import { isValidEmail } from "@/lib/utils/validation";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="auth-card">
        <AuthSuccess
          icon="mail"
          title="Check your inbox"
          description={`If an account exists for ${email}, a password reset link would be sent. For this demonstration, use the reset interface directly.`}
        >
          <div className="auth-success-actions">
            <Link href={`/auth/reset-password?email=${encodeURIComponent(email)}`} className="btn btn-primary">Open reset interface</Link>
            <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>Use a different email</button>
          </div>
          <p className="auth-demo-inline"><MailCheck size={14} /> No live email was sent.</p>
        </AuthSuccess>
        <AuthFooterLink prompt="Remembered your password?" linkLabel="Back to sign in" href="/auth/login" />
      </div>
    );
  }

  return (
    <div className="auth-card">
      <Link href="/auth/login" className="auth-inline-back"><ArrowLeft size={15} /> Back to sign in</Link>
      <AuthIntro
        eyebrow="Account recovery"
        title="Reset your password"
        description="Enter the email associated with your account. We will send instructions if the account exists."
      />
      {error ? <AuthAlert>{error}</AuthAlert> : null}
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <Input
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          error={error}
          required
        />
        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="button-spinner" /> : null}
          {loading ? "Sending…" : "Send reset instructions"}
        </button>
      </form>
      <AuthFooterLink prompt="New to Vee Investment?" linkLabel="Create an account" href="/auth/register" />
    </div>
  );
}
