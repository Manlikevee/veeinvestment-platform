"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, Info, LockKeyhole, ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/providers/toast-provider";
import { products } from "@/lib/data/site";
import { calculateIndicativeReturn, formatCompactCurrency, formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const wizardSteps = ["Select product", "Eligibility", "Amount", "Review terms", "Confirm"];

export function NewInvestmentWizard({ initialProduct = "" }) {
  const { toast } = useToast();
  const initial = products.find((item) => item.slug === initialProduct) || products[0];
  const [step, setStep] = useState(0);
  const [productSlug, setProductSlug] = useState(initial.slug);
  const [amount, setAmount] = useState(String(initial.min));
  const [confirmedEligibility, setConfirmedEligibility] = useState(false);
  const [readTerms, setReadTerms] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const product = products.find((item) => item.slug === productSlug) || products[0];
  const numericAmount = Number(amount) || 0;
  const projection = useMemo(
    () => calculateIndicativeReturn({ amount: numericAmount, rate: product.targetReturn, months: product.durationMonths }),
    [numericAmount, product],
  );
  const fee = Math.round(numericAmount * 0.01);

  function selectProduct(slug) {
    const next = products.find((item) => item.slug === slug);
    setProductSlug(slug);
    setAmount(String(next.min));
    setConfirmedEligibility(false);
    setReadTerms(false);
    setError("");
  }

  function next() {
    setError("");
    if (step === 1 && !confirmedEligibility) {
      setError("Confirm each eligibility statement before continuing.");
      return;
    }
    if (step === 2) {
      if (numericAmount < product.min) { setError(`The minimum for this product is ${formatCurrency(product.min)}.`); return; }
      if (numericAmount > product.max) { setError(`The maximum for this product is ${formatCurrency(product.max)}.`); return; }
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) { setError("Enter a valid investment amount."); return; }
    }
    if (step === 3 && !readTerms) { setError("Confirm that you have reviewed the terms and fees."); return; }
    setStep((current) => Math.min(current + 1, wizardSteps.length - 1));
  }

  function back() {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  }

  async function submit() {
    if (!acknowledged) {
      setError("You must acknowledge that submission is not approval and that capital is at risk.");
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setReference(`VEE-APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
    setSubmitting(false);
    toast({ title: "Application recorded for demonstration", message: "Status: Pending review. No funds have moved.", tone: "info" });
  }

  if (submitted) {
    return (
      <div className="app-page">
        <div className="submission-card" style={{ maxWidth: 760, margin: "20px auto" }}>
          <span className="submission-icon"><CheckCircle2 size={30} /></span>
          <p className="eyebrow">Application submitted</p>
          <h1>Your application is pending review.</h1>
          <p>
            This demonstration has recorded an application for <strong>{product.name}</strong> at{" "}
            <strong>{formatCurrency(numericAmount)}</strong>. No investment has been created, no payment
            has been taken and no approval has been granted.
          </p>
          <div className="submission-ref"><ShieldCheck size={16} /> {reference}</div>
          <div className="info-grid" style={{ marginTop: 26, textAlign: "left" }}>
            <div className="info-row"><span>Product</span><strong>{product.name}</strong></div>
            <div className="info-row"><span>Amount</span><strong>{formatCurrency(numericAmount)}</strong></div>
            <div className="info-row"><span>Target return</span><strong>{product.targetReturn}% p.a. (illustrative)</strong></div>
            <div className="info-row"><span>Status</span><strong><StatusBadge status="Pending review" /></strong></div>
          </div>
          <div className="info-note" style={{ marginTop: 20, textAlign: "left" }}>
            <Info size={16} />
            <span>Next: an authorised reviewer would assess eligibility, suitability and source of funds. Funding instructions would only be issued after approval.</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            <Link href="/dashboard/investments/INV-24102" className="btn btn-primary">View application</Link>
            <Link href="/dashboard/investments" className="btn btn-outline">Back to investments</Link>
            <Link href="/dashboard/support" className="btn btn-ghost">Ask a question</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <PageHeader
        compact
        breadcrumbs={[{ label: "My investments", href: "/dashboard/investments" }, { label: "New investment" }]}
        title="New investment application"
        description="Select a product, review the terms and submit an application. Nothing is invested automatically."
        actions={<Link href="/dashboard/investments" className="btn btn-outline"><ArrowLeft size={15} /> Cancel</Link>}
      />

      <div className="wizard-shell">
        <aside className="wizard-summary-card">
          <p className="eyebrow">Application</p>
          <h3>{product.name}</h3>
          <div className="wizard-summary-list">
            <div className="wizard-summary-row"><span>Category</span><strong>{product.category}</strong></div>
            <div className="wizard-summary-row"><span>Minimum</span><strong>{formatCompactCurrency(product.min)}</strong></div>
            <div className="wizard-summary-row"><span>Term</span><strong>{product.durationLabel}</strong></div>
            <div className="wizard-summary-row"><span>Target return</span><strong>{product.targetReturn}%</strong></div>
            <div className="wizard-summary-row"><span>Risk</span><strong>{product.risk}</strong></div>
          </div>
          <div className="info-note" style={{ marginTop: 16 }}>
            <ShieldCheck size={15} />
            <span>Application is not approval. Terms are illustrative until confirmed in the final agreement.</span>
          </div>
        </aside>

        <section className="wizard-panel">
          <div className="wizard-steps" aria-label="Application steps">
            {wizardSteps.map((label, index) => (
              <div className={cn("wizard-step", index === step && "is-active", index < step && "is-complete")} key={label}>
                <span className="wizard-step-dot">{index < step ? <Check size={11} /> : index + 1}</span>
                <span>{label}</span>
                {index < wizardSteps.length - 1 ? <span className="wizard-divider" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>

          <div className="wizard-form">
            {step === 0 ? (
              <>
                <h2>Choose an investment product</h2>
                <p>Product terms are illustrative. You can review the full details before submitting.</p>
                <div className="invest-choice-grid">
                  {products.map((item) => (
                    <label className={cn("invest-choice", item.slug === productSlug && "is-selected")} key={item.id}>
                      <input type="radio" name="product" checked={item.slug === productSlug} onChange={() => selectProduct(item.slug)} />
                      <span className={`product-icon ${item.color}`}><Icon name={item.icon} size={18} /></span>
                      <span className="invest-choice-copy">
                        <strong>{item.name}</strong>
                        <small>{item.category} · {item.durationLabel}</small>
                        <span>{formatCompactCurrency(item.min)} minimum · {item.targetReturn}% target</span>
                      </span>
                    </label>
                  ))}
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <h2>Eligibility confirmation</h2>
                <p>Confirm the following before continuing. Eligibility will still be assessed by an authorised reviewer.</p>
                <div className="invest-eligibility">
                  {[
                    "I am at least 18 years old and legally able to enter into this application.",
                    `I have read the product terms and understand the ${product.durationLabel} commitment and liquidity terms.`,
                    "I understand that the target return is not guaranteed and my capital is at risk.",
                    "The information in my profile is accurate and I will notify VEE of any material change.",
                  ].map((text) => (
                    <label className="consent-item" key={text}>
                      <input type="checkbox" checked={confirmedEligibility} onChange={(event) => setConfirmedEligibility(event.target.checked)} />
                      <div><p>{text}</p></div>
                    </label>
                  ))}
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <h2>Investment amount</h2>
                <p>Enter an amount within the product limits. The projection is illustrative and not a forecast.</p>
                <div className="form-grid two" style={{ marginTop: 18 }}>
                  <Input label="Amount" name="amount" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} prefix="₦" hint={`Minimum ${formatCurrency(product.min)} · Maximum ${formatCurrency(product.max)}`} error={error} />
                  <div className="info-row" style={{ borderBottom: 0 }}>
                    <span>Product limits</span>
                    <strong>{formatCompactCurrency(product.min)} – {formatCompactCurrency(product.max)}</strong>
                  </div>
                </div>
                <div className="invest-projection">
                  <div><span>Indicative return at target</span><strong>{formatCurrency(projection.interest)}</strong><small>{product.targetReturn}% p.a. for {product.durationLabel}</small></div>
                  <div><span>Indicative total at maturity</span><strong>{formatCurrency(projection.total)}</strong><small>Before fees and taxes</small></div>
                  <div><span>Illustrative management fee</span><strong>{formatCurrency(fee)}</strong><small>1.00% p.a. example</small></div>
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <h2>Review terms and fees</h2>
                <p>Read the product summary below. The final agreement may contain additional terms.</p>
                <div className="info-grid" style={{ marginTop: 16 }}>
                  <div className="info-row"><span>Product</span><strong>{product.name}</strong></div>
                  <div className="info-row"><span>Amount</span><strong>{formatCurrency(numericAmount)}</strong></div>
                  <div className="info-row"><span>Target return</span><strong>{product.targetReturn}% p.a.</strong></div>
                  <div className="info-row"><span>Term</span><strong>{product.durationLabel}</strong></div>
                  <div className="info-row"><span>Risk classification</span><strong>{product.risk}</strong></div>
                  <div className="info-row"><span>Withdrawal</span><strong>Subject to product terms</strong></div>
                </div>
                <div className="fee-list" style={{ marginTop: 16 }}>
                  {product.fees.map((feeItem) => (
                    <div className="flex-between" key={feeItem.label}><span>{feeItem.label}</span><strong>{feeItem.value}</strong></div>
                  ))}
                </div>
                <div className="risk-disclosure-box">
                  <strong><ShieldCheck size={15} /> Capital at risk</strong>
                  <p>The target return is an objective, not a guarantee. The value of the investment can fall and you may get back less than you invest. Review the risk disclosure in full.</p>
                </div>
                <label className="checkbox" style={{ marginTop: 14 }}>
                  <input type="checkbox" checked={readTerms} onChange={(event) => setReadTerms(event.target.checked)} />
                  <span>I have reviewed the terms, fees and risk disclosure for this application.</span>
                </label>
              </>
            ) : null}

            {step === 4 ? (
              <>
                <h2>Confirm your application</h2>
                <p>Review the details. Submitting creates a pending application, not an investment.</p>
                <div className="detail-banner highlight" style={{ marginTop: 16 }}>
                  <div className="detail-banner-main">
                    <p className="detail-banner-label">Application amount</p>
                    <p className="detail-banner-value">{formatCurrency(numericAmount)}</p>
                    <div className="detail-banner-meta"><span>{product.name}</span><span>·</span><span>{product.durationLabel}</span><span>·</span><span>{product.targetReturn}% target p.a.</span></div>
                  </div>
                  <StatusBadge status="Pending review" />
                </div>
                <div className="info-grid" style={{ marginTop: 15 }}>
                  <div className="info-row"><span>Illustrative return</span><strong>{formatCurrency(projection.interest)}</strong></div>
                  <div className="info-row"><span>Illustrative total</span><strong>{formatCurrency(projection.total)}</strong></div>
                  <div className="info-row"><span>Management fee example</span><strong>{formatCurrency(fee)}</strong></div>
                  <div className="info-row"><span>Payment</span><strong>Not yet requested</strong></div>
                </div>
                <label className="consent-item" style={{ marginTop: 16 }}>
                  <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />
                  <div>
                    <strong>Application acknowledgement *</strong>
                    <p>I understand that this is not an approval, no funds have moved, returns are not guaranteed and the final terms require an authorised decision.</p>
                  </div>
                </label>
                <div className="info-note" style={{ marginTop: 14 }}>
                  <LockKeyhole size={16} />
                  <span>Payment instructions are only issued through an authenticated channel after approval. Never act on instructions received elsewhere.</span>
                </div>
              </>
            ) : null}
          </div>

          {error ? <p className="field-error" role="alert" style={{ marginTop: 14 }}>{error}</p> : null}

          <div className="wizard-footer">
            <button type="button" className="btn btn-ghost" onClick={back} disabled={step === 0}><ArrowLeft size={16} /> Back</button>
            <div className="wizard-footer-right">
              {step < wizardSteps.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={next}>Continue <ArrowRight size={16} /></button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={submit} disabled={submitting}>
                  {submitting ? <span className="button-spinner" /> : <CheckCircle2 size={16} />}
                  {submitting ? "Submitting…" : "Submit application"}
                </button>
              )}
            </div>
          </div>
          <p className="auth-demo-note" style={{ textAlign: "left", marginTop: 14 }}>
            Demonstration application. No payment, approval or investment record is created.
          </p>
        </section>
      </div>
    </div>
  );
}
