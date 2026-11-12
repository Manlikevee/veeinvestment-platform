"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, ShieldCheck } from "lucide-react";
import { AuthAlert, AuthFooterLink, AuthIntro, AuthSuccess } from "@/components/forms/auth/auth-message";
import { OtpInput } from "@/components/forms/otp-input";
import { Input } from "@/components/ui/form-field";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/providers/toast-provider";

export function TwoFactorForm() {
  const [method, setMethod] = useState("authenticator");
  const [code, setCode] = useState("");
  const [backup, setBackup] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const { toast } = useToast();

  async function submit(event) {
    event.preventDefault();
    const value = method === "authenticator" ? code : backup;
    if (method === "authenticator" && value.length !== 6) {
      setError("Enter the six-digit code from your authenticator app.");
      return;
    }
    if (method === "backup" && value.trim().length < 8) {
      setError("Enter a valid backup code.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setComplete(true);
    toast({ title: "Challenge completed for demonstration", message: "No live session was authorised.", tone: "info" });
  }

  if (complete) {
    return (
      <div className="auth-card">
        <AuthSuccess
          icon="shield-check"
          title="Two-factor challenge complete"
          description="This demonstration accepted the challenge input. In production, the backend must validate the factor and issue the session. No authentication has been performed."
        >
          <Link href="/auth/login" className="btn btn-primary">Continue to sign in</Link>
        </AuthSuccess>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <span className="auth-shield-mark"><ShieldCheck size={25} /></span>
      <AuthIntro
        eyebrow="Account security"
        title="Two-factor authentication"
        description="Enter a code from your authenticator app, or use a backup code if you cannot access it."
      />
      <Tabs
        items={[{ value: "authenticator", label: "Authenticator app" }, { value: "backup", label: "Backup code" }]}
        active={method}
        onChange={(value) => { setMethod(value); setError(""); }}
        ariaLabel="Two-factor method"
      />
      <AuthAlert tone="info">Demo interface: no live factor is validated.</AuthAlert>
      {error ? <AuthAlert>{error}</AuthAlert> : null}
      <form className="auth-form" onSubmit={submit}>
        {method === "authenticator" ? (
          <OtpInput value={code} onChange={setCode} label="Authenticator code" />
        ) : (
          <Input label="Backup code" name="backup" value={backup} onChange={(event) => setBackup(event.target.value)} placeholder="XXXX-XXXX-XXXX" autoComplete="one-time-code" />
        )}
        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="button-spinner" /> : <KeyRound size={17} />}
          {loading ? "Checking…" : "Verify and continue"}
        </button>
      </form>
      <div className="auth-help-links">
        <Link href="/help">Lost access to your authenticator?</Link>
        <Link href="/contact">Contact support</Link>
      </div>
      <AuthFooterLink prompt="Not your account?" linkLabel="Return to sign in" href="/auth/login" />
    </div>
  );
}
