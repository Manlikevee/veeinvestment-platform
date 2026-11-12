"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, UserPlus } from "lucide-react";
import { AuthAlert, AuthFooterLink, AuthIntro } from "@/components/forms/auth/auth-message";
import { Input, PasswordInput, Select } from "@/components/ui/form-field";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useToast } from "@/providers/toast-provider";
import { isValidEmail, isValidPhone, passwordStrength } from "@/lib/utils/validation";

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "Other"];

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    contact: "Email",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!values.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!values.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!isValidEmail(values.email)) nextErrors.email = "Enter a valid email address.";
    if (!isValidPhone(values.phone)) nextErrors.phone = "Enter a valid phone number.";
    if (!values.country) nextErrors.country = "Select your country of residence.";
    if (passwordStrength(values.password).score < 4) nextErrors.password = "Use a stronger password that meets at least four requirements.";
    if (values.password !== values.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    if (!values.terms) nextErrors.terms = "Please accept the terms, privacy policy and risk disclosure.";
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    try {
      window.sessionStorage.setItem(
        "vee-registration-email",
        JSON.stringify({ email: values.email, firstName: values.firstName }),
      );
    } catch {
      // The verification screen can still be previewed without storage.
    }
    toast({
      title: "Account details captured",
      message: "Check your email verification interface next. No live email was sent.",
      tone: "success",
    });
    router.push(`/auth/verify-email?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <div className="auth-card auth-card-wide">
      <AuthIntro
        eyebrow="Open an account"
        title="Start with a clear foundation"
        description="Create your account, then complete onboarding and verification at your own pace."
      />

      <div className="auth-step-note">
        <span>Step 1 of 3</span>
        <div className="mini-progress"><span style={{ width: "33%" }} /></div>
        <small>Account details</small>
      </div>

      {formError ? <AuthAlert>{formError}</AuthAlert> : null}

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="form-grid two">
          <Input label="First name" name="firstName" value={values.firstName} onChange={(event) => update("firstName", event.target.value)} autoComplete="given-name" error={errors.firstName} required />
          <Input label="Last name" name="lastName" value={values.lastName} onChange={(event) => update("lastName", event.target.value)} autoComplete="family-name" error={errors.lastName} required />
        </div>
        <div className="form-grid two">
          <Input label="Email address" name="email" type="email" value={values.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" placeholder="you@example.com" error={errors.email} required />
          <Input label="Phone number" name="phone" type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" placeholder="+234 800 000 0000" error={errors.phone} required />
        </div>
        <div className="form-grid two">
          <Select label="Country of residence" name="country" value={values.country} onChange={(event) => update("country", event.target.value)} options={countries} error={errors.country} required />
          <Select label="Preferred contact" name="contact" value={values.contact} onChange={(event) => update("contact", event.target.value)} options={["Email", "Phone", "SMS", "WhatsApp"]} />
        </div>
        <PasswordInput
          label="Password"
          name="password"
          value={values.password}
          onChange={(event) => update("password", event.target.value)}
          autoComplete="new-password"
          error={errors.password}
          required
        />
        <PasswordStrength password={values.password} />
        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={(event) => update("confirmPassword", event.target.value)}
          autoComplete="new-password"
          error={errors.confirmPassword}
          required
        />

        <div className={`consent-box${errors.terms ? " has-error" : ""}`}>
          <label className="checkbox align-start">
            <input type="checkbox" checked={values.terms} onChange={(event) => update("terms", event.target.checked)} />
            <span>
              I agree to the <Link href="/terms">Terms of use</Link>, <Link href="/privacy-policy">Privacy policy</Link> and{" "}
              <Link href="/risk-disclosure">Risk disclosure</Link>. I understand that investing involves risk.
            </span>
          </label>
          {errors.terms ? <p className="field-error" role="alert">{errors.terms}</p> : null}
        </div>

        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
          {loading ? <span className="button-spinner" aria-hidden="true" /> : <UserPlus size={17} />}
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <div className="auth-demo-note">
        Demonstration only: no account is created and no password is stored by this frontend.
      </div>
      <AuthFooterLink prompt="Already have an account?" linkLabel="Sign in" href="/auth/login" />
      <p className="auth-tiny-link"><Link href="/auth/account-activation">Already registered but need to activate your account? <ArrowRight size={13} /></Link></p>
    </div>
  );
}
