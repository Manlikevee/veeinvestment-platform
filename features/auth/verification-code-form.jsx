"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, RefreshCw } from "lucide-react";
import { AuthAlert, AuthFooterLink, AuthIntro, AuthSuccess } from "@/components/forms/auth/auth-message";
import { OtpInput } from "@/components/forms/otp-input";
import { Input } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";

export function VerificationCodeForm({ mode = "email" }) {
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email") || "";
  const [destination, setDestination] = useState(queryEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const { toast } = useToast();

  const isEmail = mode === "email";

  useEffect(() => {
    if (seconds <= 0) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  async function verify(event) {
    event.preventDefault();
    if (!destination.trim()) {
      setError(isEmail ? "Enter your email address." : "Enter your phone number.");
      return;
    }
    if (code.length !== 6) {
      setError("Enter all six digits.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setComplete(true);
    toast({
      title: "Code accepted for this demonstration",
      message: "No live verification service was contacted.",
      tone: "info",
    });
  }

  function resend() {
    setSeconds(30);
    setCode("");
    toast({
      title: "Demo resend triggered",
      message: `A live platform would send a new code to ${destination || "your contact on file"}.`,
      tone: "info",
    });
  }

  if (complete) {
    return (
      <div className="auth-card">
        <AuthSuccess
          icon="shield-check"
          title={isEmail ? "Email verification interface complete" : "Phone verification interface complete"}
          description={
            isEmail
              ? "In a live environment, the backend would now confirm ownership of this email. No verification has been recorded by this demonstration."
              : "In a live environment, the backend would now confirm ownership of this number. No verification has been recorded by this demonstration."
          }
        >
          <div className="auth-success-actions">
            <Link href="/onboarding" className="btn btn-primary">Preview onboarding <ArrowRight size={16} /></Link>
            <Link href="/auth/login" className="btn btn-outline">Return to sign in</Link>
          </div>
        </AuthSuccess>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <AuthIntro
        eyebrow="Verification"
        title={isEmail ? "Verify your email" : "Verify your phone"}
        description={
          isEmail
            ? "Enter the six-digit code sent to your email address to continue your account setup."
            : "Enter the six-digit code sent by SMS to your mobile number."
        }
      />
      <AuthAlert tone="info">
        Demonstration only. No email or SMS is sent, and no verification is recorded.
      </AuthAlert>
      {error ? <AuthAlert>{error}</AuthAlert> : null}

      <form className="auth-form" onSubmit={verify} noValidate>
        <Input
          label={isEmail ? "Email address" : "Phone number"}
          name="destination"
          type={isEmail ? "email" : "tel"}
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder={isEmail ? "you@example.com" : "+234 800 000 0000"}
          error=""
        />
        <OtpInput value={code} onChange={setCode} label="Six-digit verification code" />
        <div className="otp-actions">
          <span>{seconds > 0 ? `Resend available in ${seconds}s` : "Didn't receive a code?"}</span>
          <button type="button" className="text-button" onClick={resend} disabled={seconds > 0}>
            <RefreshCw size={14} /> Resend code
          </button>
        </div>
        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="button-spinner" /> : null}
          {loading ? "Checking code…" : "Verify and continue"}
        </button>
      </form>

      <AuthFooterLink prompt="Wrong account?" linkLabel="Go back" href={isEmail ? "/auth/register" : "/auth/login"} />
    </div>
  );
}
