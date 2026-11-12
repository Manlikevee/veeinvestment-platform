"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ClipboardCheck, Download, Info,
  RefreshCw, Save, ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { OnboardingStep } from "./onboarding-steps";
import {
  DRAFT_KEY, hydrateDraft, initialOnboardingData, onboardingSteps, safeDraft, stepGroups,
} from "./onboarding-data";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "@/providers/toast-provider";
import { isValidEmail, isValidPhone, passwordStrength } from "@/lib/utils/validation";
import { cn } from "@/lib/utils/cn";

export function OnboardingWizard() {
  const router = useRouter();
  const { session } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => structuredClone(initialOnboardingData));
  const [errors, setErrors] = useState({});
  const [restored, setRestored] = useState(false);
  const [saveState, setSaveState] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const topRef = useRef(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        setData(hydrateDraft(JSON.parse(raw)));
        setRestored(true);
      }
    } catch {
      setRestored(false);
    }
  }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const progress = useMemo(() => Math.round(((step + 1) / onboardingSteps.length) * 100), [step]);

  function setField(section, field, value) {
    setData((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSaveState("unsaved");
  }

  function resetDraft() {
    if (!window.confirm("Reset this demonstration draft to the sample profile? Unsaved changes will be lost.")) return;
    setData(structuredClone(initialOnboardingData));
    setErrors({});
    setStep(0);
    setRestored(false);
    setSaveState("idle");
    try { window.sessionStorage.removeItem(DRAFT_KEY); } catch { /* no-op */ }
    toast({ title: "Draft reset", message: "The sample profile has been restored.", tone: "info" });
  }

  function saveDraft({ quiet = false } = {}) {
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(safeDraft(data)));
      setSaveState("saved");
      setRestored(true);
      if (!quiet) toast({ title: "Draft saved for this session", message: "Passwords and file contents are never stored.", tone: "success" });
    } catch {
      setSaveState("error");
      if (!quiet) toast({ title: "Could not save draft", message: "Browser storage is unavailable.", tone: "error" });
    }
  }

  function validateStep(index) {
    const next = {};
    if (index === 0) {
      if (!data.account.firstName.trim()) next.firstName = "Enter your first name.";
      if (!data.account.lastName.trim()) next.lastName = "Enter your last name.";
      if (!isValidEmail(data.account.email)) next.email = "Enter a valid email address.";
      if (!isValidPhone(data.account.phone)) next.phone = "Enter a valid phone number.";
      if (data.account.password || data.account.confirmPassword) {
        if (passwordStrength(data.account.password).score < 4) next.password = "Choose a stronger password.";
        if (data.account.password !== data.account.confirmPassword) next.confirmPassword = "Passwords do not match.";
      }
    }
    if (index === 1) {
      if (!data.personal.dob) next.dob = "Enter your date of birth.";
      if (!data.personal.nationality) next.nationality = "Select your nationality.";
      if (!data.personal.country) next.country = "Select your country of residence.";
      if (!data.personal.employmentStatus) next.employmentStatus = "Select your employment status.";
      if (!data.personal.occupation.trim()) next.occupation = "Enter your occupation.";
    }
    if (index === 2) {
      if (!data.address.country) next.addressCountry = "Select your country.";
      if (!data.address.state.trim()) next.state = "Enter your state or region.";
      if (!data.address.city.trim()) next.city = "Enter your city.";
      if (!data.address.street.trim()) next.street = "Enter your street address.";
      if (!data.address.postalCode.trim()) next.postalCode = "Enter your postal code.";
    }
    if (index === 3) {
      if (!data.kin.name.trim()) next.kinName = "Enter the full name.";
      if (!data.kin.relationship) next.relationship = "Select a relationship.";
      if (!isValidPhone(data.kin.phone)) next.kinPhone = "Enter a valid phone number.";
      if (!isValidEmail(data.kin.email)) next.kinEmail = "Enter a valid email address.";
    }
    if (index === 4) {
      if (!data.financial.employmentType) next.employmentType = "Select employment type.";
      if (!data.financial.employer.trim()) next.employer = "Enter your employer or business.";
      if (!data.financial.sourceFunds) next.sourceFunds = "Select a source of funds.";
      if (!data.financial.income) next.income = "Select an income range.";
      if (!data.financial.experience) next.experience = "Select your experience level.";
    }
    if (index === 5) {
      if (!data.identity.documentType) next.documentType = "Select a document type.";
      if (!data.identity.documentNumber.trim()) next.documentNumber = "Enter the document number.";
      if (!data.identity.expiry) next.expiry = "Enter the expiry date.";
      if (!data.identity.file || data.identity.file.status !== "Ready") next.identityFile = "Upload a clear identity document.";
    }
    if (index === 6) {
      if (!data.addressVerification.file || data.addressVerification.file.status !== "Ready") next.addressFile = "Upload a proof of address.";
    }
    if (index === 7) {
      if (!data.bank.bankName.trim()) next.bankName = "Enter the bank name.";
      if (!data.bank.accountName.trim()) next.accountName = "Enter the account name.";
      if (data.bank.accountNumber.length < 8) next.accountNumber = "Enter a valid account number.";
    }
    if (index === 8) {
      if (!data.preferences.objectives.length) next.objectives = "Select at least one objective.";
      if (!data.preferences.horizon) next.horizon = "Select an investment horizon.";
      if (!data.preferences.categories.length) next.categories = "Select at least one category.";
    }
    if (index === 10) {
      if (!Object.values(data.agreements).every(Boolean)) next.agreements = "Record consent for all four declarations.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) {
      toast({ title: "A few fields need attention", message: "Review the highlighted fields before continuing.", tone: "warning" });
      return;
    }
    saveDraft({ quiet: true });
    if (step < onboardingSteps.length - 1) {
      setStep((current) => current + 1);
      setErrors({});
    }
  }

  function goBack() {
    if (step === 0) return;
    setStep((current) => current - 1);
    setErrors({});
  }

  function goTo(index) {
    if (index <= step) {
      setStep(index);
      setErrors({});
      return;
    }
    for (let i = step; i < index; i += 1) {
      if (!validateStep(i)) {
        toast({ title: "Complete this step first", message: "Some required information is missing.", tone: "warning" });
        return;
      }
    }
    setStep(index);
    setErrors({});
  }

  async function submitApplication() {
    if (!validateStep(10)) {
      setStep(10);
      toast({ title: "Consent is required", message: "Record all four declarations before submitting.", tone: "warning" });
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    const ref = `VEE-ONB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReference(ref);
    setSubmitted(true);
    setSubmitting(false);
    try {
      window.sessionStorage.setItem("vee-onboarding-submitted", JSON.stringify({ reference: ref, status: "Pending review", submittedAt: new Date().toISOString() }));
    } catch { /* no-op */ }
    toast({ title: "Application recorded", message: "Status: Pending review. No verification or approval has occurred.", tone: "info" });
  }

  function downloadSummary() {
    const summary = {
      reference,
      status: "Pending review",
      applicant: `${data.account.firstName} ${data.account.lastName}`,
      email: data.account.email,
      submittedAt: new Date().toISOString(),
      note: "Demonstration summary. No application was transmitted to a backend.",
    };
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${reference}-summary.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (submitted) {
    return (
      <div className="onboarding-shell">
        <header className="onboarding-topbar">
          <div className="onboarding-topbar-left"><Logo /><span className="onboarding-topbar-divider" /><span className="onboarding-topbar-title">Application <span>· submitted</span></span></div>
          <div className="onboarding-topbar-actions"><ThemeToggle /><Link href="/" className="btn btn-outline btn-sm">Back to website</Link></div>
        </header>
        <div className="container" style={{ paddingTop: 42, paddingBottom: 70 }}>
          <div className="submission-card">
            <span className="submission-icon"><CheckCircle2 size={30} /></span>
            <p className="eyebrow">Application received</p>
            <h1>Your application is pending review.</h1>
            <p>
              Your demonstration application has been recorded in this browser. In a live environment,
              the information would now enter a review queue. No identity verification, approval or
              investment has occurred.
            </p>
            <div className="submission-ref"><ClipboardCheck size={16} /> {reference}</div>
            <div className="submission-steps">
              <div className="submission-step"><span>01</span><strong>Application review</strong><p>An authorised reviewer checks completeness and eligibility.</p></div>
              <div className="submission-step"><span>02</span><strong>Document verification</strong><p>Identity and address documents are reviewed separately.</p></div>
              <div className="submission-step"><span>03</span><strong>Decision & next steps</strong><p>You would be notified of any additional information required.</p></div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              <button type="button" className="btn btn-primary" onClick={downloadSummary}><Download size={16} /> Download summary</button>
              <Link href={session ? "/dashboard" : "/auth/login"} className="btn btn-outline">{session ? "Go to dashboard" : "Sign in to track"}</Link>
              <Link href="/contact" className="btn btn-ghost">Contact support</Link>
            </div>
            <div className="info-note" style={{ marginTop: 26, textAlign: "left" }}>
              <Info size={16} />
              <span>Demonstration status: <strong>Pending review</strong>. No email, SMS or backend workflow has been triggered. A real journey must never claim verification or approval before the authorised workflow confirms it.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-shell" ref={topRef}>
      <header className="onboarding-topbar">
        <div className="onboarding-topbar-left">
          <Logo />
          <span className="onboarding-topbar-divider" />
          <span className="onboarding-topbar-title">Client onboarding <span>· Secure application</span></span>
        </div>
        <div className="onboarding-topbar-actions">
          <span className="onboarding-save-status">
            <Save size={13} />
            {saveState === "saved" ? "Draft saved" : saveState === "unsaved" ? "Unsaved changes" : saveState === "error" ? "Save unavailable" : "Draft not saved"}
          </span>
          <ThemeToggle compact />
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { saveDraft(); router.push(session?.route || "/"); }}>Save & exit</button>
          <Link href="/" className="btn btn-outline btn-sm">Exit</Link>
        </div>
      </header>

      <div className="onboarding-layout">
        <aside className="onboarding-sidebar">
          <div className="onboarding-sidebar-head">
            <p className="eyebrow">Your application</p>
            <h1>Let&apos;s get you set up.</h1>
            <p>Complete at your own pace. Your progress is saved for this session.</p>
          </div>
          <div className="onboarding-progress">
            <div className="onboarding-progress-top"><span>Progress</span><strong>{progress}%</strong></div>
            <div className="onboarding-progress-bar"><span style={{ width: `${progress}%` }} /></div>
          </div>
          <nav className="onboarding-nav" aria-label="Onboarding steps">
            {stepGroups.map((group) => (
              <div className="onboarding-nav-group" key={group}>
                <p className="onboarding-nav-label">{group}</p>
                {onboardingSteps.map((item, index) => {
                  if (item.group !== group) return null;
                  const complete = index < step;
                  const active = index === step;
                  return (
                    <button
                      type="button"
                      key={item.title}
                      className={cn("onboarding-nav-item", active && "is-active", complete && "is-complete")}
                      onClick={() => goTo(index)}
                      aria-current={active ? "step" : undefined}
                    >
                      <span className="onboarding-nav-dot">{complete ? <Check size={10} /> : index + 1}</span>
                      {item.short}
                      {complete ? <span className="onboarding-nav-status"><CheckCircle2 size={12} /></span> : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
          <div className="onboarding-sidebar-foot">
            <p>Questions? <Link href="/contact">Talk to the client team</Link>. Your progress is saved when you continue.</p>
          </div>
        </aside>

        <main id="main" className="onboarding-main">
          <div className="onboarding-form-wrap">
            <div className="onboarding-mobile-progress">
              <div className="onboarding-mobile-progress-top"><span>Step {step + 1} of {onboardingSteps.length}</span><strong>{progress}% complete</strong></div>
              <div className="onboarding-progress-bar"><span style={{ width: `${progress}%` }} /></div>
              <div className="onboarding-mobile-select">
                <span className="badge badge-neutral">Step {step + 1}</span>
                <select value={step} onChange={(event) => goTo(Number(event.target.value))} aria-label="Go to onboarding step">
                  {onboardingSteps.map((item, index) => <option value={index} key={item.title}>{index + 1}. {item.title}</option>)}
                </select>
              </div>
            </div>

            {restored && step < 9 ? (
              <div className="notice-bar" style={{ marginBottom: 18 }}>
                <span><RefreshCw size={14} /> A saved demonstration draft was restored from this browser.</span>
                <button type="button" className="text-button" onClick={resetDraft}>Reset draft</button>
              </div>
            ) : null}

            <div className="onboarding-step-head">
              <p className="eyebrow">Step {String(step + 1).padStart(2, "0")} of {onboardingSteps.length} · {onboardingSteps[step].group}</p>
              <h1>{onboardingSteps[step].title}</h1>
              <p>{onboardingSteps[step].description}</p>
            </div>

            <OnboardingStep step={step} data={data} setField={setField} goTo={goTo} errors={errors} />

            {Object.keys(errors).length ? (
              <div className="auth-alert" role="alert" style={{ marginTop: 16 }}>
                <ShieldCheck size={17} />
                <span>Please review the highlighted fields. Your draft remains available in this session.</span>
              </div>
            ) : null}

            <div className="onboarding-actions">
              <div className="onboarding-actions-left">
                {step > 0 ? <button type="button" className="btn btn-outline" onClick={goBack}><ArrowLeft size={16} /> Back</button> : null}
                <button type="button" className="text-button" onClick={() => saveDraft()}><Save size={14} /> Save draft</button>
              </div>
              <div className="onboarding-actions-right">
                {step < onboardingSteps.length - 1 ? (
                  <button type="button" className="btn btn-primary" onClick={goNext}>Continue <ArrowRight size={16} /></button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={submitApplication} disabled={submitting}>
                    {submitting ? <span className="button-spinner" /> : <CheckCircle2 size={16} />}
                    {submitting ? "Submitting…" : "Submit application"}
                  </button>
                )}
              </div>
            </div>
            <p className="auth-demo-note" style={{ textAlign: "left" }}>
              Demonstration onboarding. No information is transmitted to a backend. Submitting records a mock
              reference and a <strong>Pending review</strong> status only.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
