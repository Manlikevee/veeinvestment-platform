"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, CheckCircle2, Info, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Input, Select, Textarea } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";
import { formatCurrency } from "@/lib/utils/format";

export function LoanApplicationForm() {
  const { toast } = useToast();
  const [values, setValues] = useState({ amount: "2000000", tenor: "12", purpose: "", source: "", notes: "", consent: false });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const calculation = useMemo(() => {
    const principal = Number(values.amount) || 0;
    const months = Number(values.tenor) || 0;
    const rate = 18.5;
    const interest = principal * (rate / 100) * (months / 12);
    return { principal, months, rate, interest, total: principal + interest, monthly: months ? (principal + interest) / months : 0 };
  }, [values.amount, values.tenor]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submit(event) {
    event.preventDefault();
    const next = {};
    if (!values.amount || Number(values.amount) < 250000) next.amount = "The minimum demonstration amount is ₦250,000.";
    if (!values.tenor) next.tenor = "Select a repayment term.";
    if (!values.purpose) next.purpose = "Select a purpose.";
    if (!values.source) next.source = "Select a repayment source.";
    if (!values.consent) next.consent = "Confirm the declaration to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setReference(`VEE-LN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
    setSubmitting(false);
    toast({ title: "Loan application recorded for demonstration", message: "Status: Pending review. No credit decision has been made.", tone: "info" });
  }

  if (submitted) {
    return (
      <div className="app-page">
        <div className="submission-card" style={{ maxWidth: 720, margin: "20px auto" }}>
          <span className="submission-icon"><CheckCircle2 size={30} /></span>
          <p className="eyebrow">Application submitted</p>
          <h1>Your loan application is pending review.</h1>
          <p>This demonstration has recorded an application for {formatCurrency(calculation.principal)}. It is not an offer of credit and no funds will be disbursed.</p>
          <div className="submission-ref"><ShieldCheck size={16} /> {reference}</div>
          <div className="info-grid" style={{ marginTop: 24, textAlign: "left" }}>
            <div className="info-row"><span>Amount requested</span><strong>{formatCurrency(calculation.principal)}</strong></div>
            <div className="info-row"><span>Term</span><strong>{calculation.months} months</strong></div>
            <div className="info-row"><span>Indicative monthly repayment</span><strong>{formatCurrency(calculation.monthly)}</strong></div>
            <div className="info-row"><span>Status</span><strong><StatusBadge status="Pending review" /></strong></div>
          </div>
          <div className="info-note" style={{ marginTop: 20, textAlign: "left" }}><Info size={16} /><span>A credit assessment would review affordability, documents and eligibility. An indicative repayment is not a final offer.</span></div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            <Link href="/dashboard/loans" className="btn btn-primary">Back to loans</Link>
            <Link href="/dashboard/support" className="btn btn-outline">Contact support</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <PageHeader
        compact
        breadcrumbs={[{ label: "Loans", href: "/dashboard/loans" }, { label: "New application" }]}
        title="Loan application"
        description="Tell us what you need and how you plan to repay it. Your application is subject to affordability and credit assessment."
        actions={<Link href="/dashboard/loans" className="btn btn-outline"><ArrowLeft size={15} /> Cancel</Link>}
      />

      <div className="detail-layout">
        <form className="detail-main" onSubmit={submit} noValidate>
          <section className="form-section">
            <div className="form-section-head"><span className="form-section-icon"><Calculator size={18} /></span><div><h2>Facility details</h2><p>Choose an amount and term. The repayment figure is indicative only.</p></div></div>
            <div className="form-grid two">
              <Input label="Amount requested" name="amount" type="number" value={values.amount} onChange={(event) => update("amount", event.target.value)} prefix="₦" error={errors.amount} hint="Minimum demonstration amount ₦250,000" required />
              <Select label="Repayment term" name="tenor" value={values.tenor} onChange={(event) => update("tenor", event.target.value)} options={[{ value: "6", label: "6 months" }, { value: "9", label: "9 months" }, { value: "12", label: "12 months" }, { value: "18", label: "18 months" }, { value: "24", label: "24 months" }]} error={errors.tenor} required />
              <Select label="Purpose" name="purpose" value={values.purpose} onChange={(event) => update("purpose", event.target.value)} options={["Working capital", "Inventory financing", "Equipment", "Home renovation", "Education", "Other"]} error={errors.purpose} required />
              <Select label="Primary repayment source" name="source" value={values.source} onChange={(event) => update("source", event.target.value)} options={["Salary", "Business income", "Professional income", "Investment income", "Other"]} error={errors.source} required />
            </div>
            <Textarea label="Additional context (optional)" name="notes" value={values.notes} onChange={(event) => update("notes", event.target.value)} rows={3} placeholder="Anything the credit team should understand about this request." />
          </section>

          <section className="form-section">
            <div className="form-section-head"><span className="form-section-icon"><ShieldCheck size={18} /></span><div><h2>Declaration</h2><p>Read the statement and confirm before submitting.</p></div></div>
            <label className="consent-item">
              <input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} />
              <div><strong>Affordability and credit declaration *</strong><p>I confirm the information is accurate, I can provide supporting documents, and I understand this application is not an approval or an offer of credit. A credit check and affordability assessment may be required.</p></div>
            </label>
            {errors.consent ? <p className="field-error" style={{ marginTop: 8 }}>{errors.consent}</p> : null}
            <div className="form-actions">
              <Link href="/dashboard/loans" className="btn btn-ghost">Cancel</Link>
              <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <span className="button-spinner" /> : <CheckCircle2 size={16} />}{submitting ? "Submitting…" : "Submit application"}</button>
            </div>
          </section>
        </form>

        <aside className="detail-side">
          <div className="sidebar-card">
            <h3>Indicative repayment</h3>
            <p style={{ fontSize: "2rem", fontWeight: 750, letterSpacing: "-0.045em", color: "var(--text)", marginTop: 7 }}>{formatCurrency(calculation.monthly)}<span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--text-tertiary)" }}> / month</span></p>
            <div className="wizard-summary-list">
              <div className="wizard-summary-row"><span>Principal</span><strong>{formatCurrency(calculation.principal)}</strong></div>
              <div className="wizard-summary-row"><span>Indicative interest</span><strong>{formatCurrency(calculation.interest)}</strong></div>
              <div className="wizard-summary-row"><span>Total repayment</span><strong>{formatCurrency(calculation.total)}</strong></div>
              <div className="wizard-summary-row"><span>Indicative rate</span><strong>{calculation.rate}% p.a.</strong></div>
            </div>
            <div className="info-note is-warning" style={{ marginTop: 14 }}><Info size={16} /><span>Indicative only. The final rate, fees and schedule are confirmed in an approved facility agreement.</span></div>
          </div>
          <div className="sidebar-card">
            <h3>What happens next?</h3>
            <p>1. We check completeness and eligibility.<br />2. Affordability and documents are reviewed.<br />3. You receive a documented decision or a request for more information.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
