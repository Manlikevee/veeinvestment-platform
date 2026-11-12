import Link from "next/link";
import { ArrowRight, Check, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Accordion } from "@/components/ui/accordion";

export const metadata = {
  title: "How it works",
  description: "The Vee Investment journey: registration, onboarding, verification, product selection, application, funding and portfolio monitoring.",
};

const steps = [
  { title: "Register", body: "Create the basic account with your name, email and phone. You can save and resume the journey.", meta: "Account setup" },
  { title: "Complete onboarding", body: "Tell us about your circumstances, goals, horizon and investment experience across a guided 12-step process.", meta: "12 guided steps" },
  { title: "Submit verification documents", body: "Upload identity and address evidence. The platform records status, reviewer notes and any replacement request.", meta: "Human review" },
  { title: "Explore investment products", body: "Compare minimums, durations, risk classifications, fees and liquidity terms before you decide.", meta: "Informed choice" },
  { title: "Apply for an investment", body: "Select an amount and review the complete terms. The application enters a suitability and eligibility review.", meta: "Application" },
  { title: "Complete payment requirements", body: "If approved, receive authenticated funding instructions. Payments are reconciled by the finance team; nothing is auto-confirmed.", meta: "Controlled funding" },
  { title: "Monitor your portfolio", body: "Track value, allocation, maturities, transactions, statements and documents from the client portal.", meta: "Ongoing visibility" },
];

const principles = [
  "Your application is not approval.",
  "A target return is not a guarantee.",
  "Documents are reviewed by an authorised person.",
  "Payments are reconciled before investment records are created.",
  "Historical financial records are never silently changed.",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>A clear path from <em>question to portfolio.</em></>}
        description="No mystery steps and no pressure. Here is exactly what happens, what we need from you and where a human decision is required."
        breadcrumbs={[{ label: "How it works" }]}
        actions={
          <>
            <Link href="/auth/register" className="btn btn-primary">Start onboarding <ArrowRight size={16} /></Link>
            <Link href="/investments" className="btn btn-outline">View opportunities</Link>
          </>
        }
        aside={
          <div className="hero-aside-card">
            <h3>Your controls</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Save & exit</span><strong>Any step</strong></div>
              <div className="hero-aside-row"><span>Review before submit</span><strong>Required</strong></div>
              <div className="hero-aside-row"><span>Consent records</span><strong>Versioned</strong></div>
              <div className="hero-aside-row"><span>Support</span><strong>Throughout</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container how-grid">
          <div className="how-sticky">
            <p className="eyebrow">The journey</p>
            <h2>Seven stages, each with a purpose.</h2>
            <p>
              The platform is designed to capture the right information once, explain why it is
              needed and keep you informed about the next action. You can stop and return without
              losing your progress.
            </p>
            <ul className="how-checklist">
              {principles.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
            </ul>
            <Link href="/onboarding" className="btn btn-outline" style={{ marginTop: 24 }}>Preview onboarding</Link>
          </div>
          <div className="how-timeline">
            {steps.map((step, index) => (
              <div className="how-step" key={step.title}>
                <span className="badge badge-neutral" style={{ marginBottom: 7 }}>Step {index + 1} · {step.meta}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Built for confidence"
            title="What the platform handles for you."
            description="The experience is designed so that sensitive decisions are visible, recorded and supported."
          />
          <div className="about-values">
            <article className="about-value"><span><FileCheck2 size={18} /></span><h3>Document status</h3><p>See what is under review, verified, rejected or awaiting replacement.</p></article>
            <article className="about-value"><span><ShieldCheck size={18} /></span><h3>Application history</h3><p>Track submission, review, decision and funding status with timestamps.</p></article>
            <article className="about-value"><span><LockKeyhole size={18} /></span><h3>Secure sessions</h3><p>Session expiry and device review help protect your account.</p></article>
            <article className="about-value"><span><ArrowRight size={18} /></span><h3>Clear next actions</h3><p>Pending tasks are surfaced rather than buried in email.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-cta-layout">
          <div className="faq-cta-intro">
            <p className="eyebrow">Before you begin</p>
            <h2>Questions people ask first.</h2>
            <p>If your question is not here, contact the team or browse the full FAQ.</p>
            <Link href="/faq" className="btn btn-outline">All FAQs</Link>
          </div>
          <Accordion
            items={[
              { q: "How long does onboarding take?", a: "Most of the information can be completed in 10–15 minutes. The timeline depends on document readiness and review queues. You can save and resume." },
              { q: "Can I invest before verification is complete?", a: "No. Products require completed identity and address verification, and some require additional suitability checks. A submitted application is not an approval." },
              { q: "What happens after I apply?", a: "The application is reviewed for eligibility, suitability and payment status. You will see the status in the portal. No investment is created until the decision and funding steps are complete." },
              { q: "Are my documents visible to everyone at VEE?", a: "No. Access is role-based and restricted to the review functions that need it. Document access and decisions are logged." },
            ]}
          />
        </div>
      </section>
    </>
  );
}
