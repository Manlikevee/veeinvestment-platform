"use client";

import { useState } from "react";
import Link from "next/link";
import { MailCheck, RefreshCw } from "lucide-react";
import { AuthAlert, AuthFooterLink, AuthIntro, AuthSuccess } from "@/components/forms/auth/auth-message";
import { Input } from "@/components/ui/form-field";
import { OtpInput } from "@/components/forms/otp-input";
import { isValidEmail } from "@/lib/utils/validation";
import { useToast } from "@/providers/toast-provider";

export function ActivationForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const { toast } = useToast();

  async function activate(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!isValidEmail(email)) nextErrors.email = "Enter the email used to register.";
    if (code.length !== 6) nextErrors.code = "Enter the six-digit activation code.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setComplete(true);
    toast({ title: "Activation interface complete", message: "No account was activated in this demonstration.", tone: "info" });
  }

  if (complete) {
    return (
      <div className="auth-card">
        <AuthSuccess
          icon="badge-check"
          title="Activation code accepted"
          description="In a live environment, the backend would activate the account and record the event. This demonstration has not changed any real account state."
        >
          <Link href="/auth/login" className="btn btn-primary">Continue to sign in</Link>
        </AuthSuccess>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <AuthIntro
        eyebrow="Account activation"
        title="Activate your account"
        description="Enter the email you registered with and the activation code from your welcome message."
      />
      <AuthAlert tone="info">Demonstration only: no account is activated and no email is sent.</AuthAlert>
      {Object.keys(errors).length ? <AuthAlert>Please review the fields below.</AuthAlert> : null}
      <form className="auth-form" onSubmit={activate}>
        <Input label="Email address" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} placeholder="you@example.com" />
        <OtpInput value={code} onChange={setCode} label="Activation code" />
        {errors.code ? <p className="field-error">{errors.code}</p> : null}
        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="button-spinner" /> : <MailCheck size={17} />}
          {loading ? "Activating…" : "Activate account"}
        </button>
      </form>
      <div className="auth-help-links">
        <button type="button" className="text-button" onClick={() => toast({ title: "Demo resend triggered", message: "No email was sent.", tone: "info" })}>
          <RefreshCw size={14} /> Resend activation email
        </button>
      </div>
      <AuthFooterLink prompt="Already activated?" linkLabel="Sign in" href="/auth/login" />
    </div>
  );
}
