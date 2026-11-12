"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { AuthAlert, AuthFooterLink, AuthIntro } from "@/components/forms/auth/auth-message";
import { Input, PasswordInput } from "@/components/ui/form-field";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "@/providers/toast-provider";
import { demoAccounts } from "@/lib/data/customer";
import { isValidEmail } from "@/lib/utils/validation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, session, ready, rememberedEmail } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const expired = searchParams.get("reason") === "session-expired";

  useEffect(() => {
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, [rememberedEmail]);

  useEffect(() => {
    if (ready && session) {
      router.replace(session.route);
    }
  }, [ready, session, router]);

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const nextSession = await login({ email, password, remember });
      toast({
        title: `Welcome back, ${nextSession.user.name.split(" ")[0]}`,
        message: "Your demonstration session is ready.",
        tone: "success",
      });
      const requested = searchParams.get("next");
      const destination =
        requested && requested.startsWith(nextSession.route) ? requested : nextSession.route;
      router.push(destination);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(account) {
    setEmail(account.email);
    setPassword(account.password);
    setErrors({});
    setFormError("");
  }

  return (
    <div className="auth-card">
      <AuthIntro
        eyebrow="Welcome back"
        title="Sign in to your account"
        description="Access your portfolio, documents and investment activity in one secure workspace."
      />

      {expired ? (
        <AuthAlert tone="info">Your session ended for security. Please sign in again.</AuthAlert>
      ) : null}
      {formError ? <AuthAlert>{formError}</AuthAlert> : null}

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <Input
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          error={errors.password}
          required
        />

        <div className="auth-form-row">
          <label className="checkbox">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            <span>Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-link">Forgot password?</Link>
        </div>

        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="button-spinner" aria-hidden="true" /> : <LockKeyhole size={17} />}
          {loading ? "Signing in…" : "Sign in securely"}
        </button>
      </form>

      <AuthFooterLink prompt="New to Vee Investment?" linkLabel="Create an account" href="/auth/register" />

      <div className="demo-accounts">
        <div className="demo-accounts-head">
          <span>Demonstration accounts</span>
          <small>Select to fill credentials</small>
        </div>
        {demoAccounts.map((account) => (
          <button type="button" className="demo-account" key={account.role} onClick={() => fillDemo(account)}>
            <span className="demo-account-role">{account.label}</span>
            <span className="demo-account-email">{account.email}</span>
            <span className="demo-account-use">Use <ArrowRight size={13} /></span>
          </button>
        ))}
        <p className="demo-accounts-note">
          These accounts exist only in the frontend demonstration. Passwords are not stored.
        </p>
      </div>
    </div>
  );
}
