import { LifeBuoy } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { FaqExplorer } from "@/components/marketing/faq-explorer";
import { faqs } from "@/lib/data/site";

export const metadata = {
  title: "Frequently asked questions",
  description: "Answers on registration, verification, investments, payments, withdrawals, loans, security and support.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Help centre"
        title={<>Questions, answered <em>plainly.</em></>}
        description="Find clear answers on onboarding, investing, payments, loans and security. If something is still unclear, our team is available."
        breadcrumbs={[{ label: "FAQ" }]}
        actions={<a href="/contact" className="btn btn-primary"><LifeBuoy size={16} /> Contact support</a>}
        aside={
          <div className="hero-aside-card">
            <h3>Popular topics</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Returns guaranteed?</span><strong>No</strong></div>
              <div className="hero-aside-row"><span>Verification time</span><strong>Document-dependent</strong></div>
              <div className="hero-aside-row"><span>Withdrawals</span><strong>Product-specific</strong></div>
              <div className="hero-aside-row"><span>Loan approval</span><strong>Subject to assessment</strong></div>
            </div>
          </div>
        }
      />
      <section className="section">
        <div className="container">
          <FaqExplorer faqs={faqs} />
        </div>
      </section>
    </>
  );
}
