import Link from "next/link";
import { ArrowRight, LifeBuoy } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { helpCategories } from "@/lib/data/content";
import { HelpExplorer } from "@/components/marketing/help-explorer";

export const metadata = {
  title: "Help centre",
  description: "Practical help for onboarding, investments, payments, documents, loans and account security.",
};

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Help centre"
        title={<>Where to find <em>a clear answer.</em></>}
        description="Start with the topic closest to your question. For account-specific issues, sign in and create a secure support ticket so the team can see your record."
        breadcrumbs={[{ label: "Help" }]}
        actions={
          <>
            <Link href="/faq" className="btn btn-primary">Browse FAQs <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn btn-outline"><LifeBuoy size={16} /> Contact support</Link>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <HelpExplorer categories={helpCategories} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="newsletter-panel">
            <div>
              <p className="eyebrow">Still stuck?</p>
              <h2>Create a secure support ticket.</h2>
              <p>Signed-in clients can attach documents, track status and keep the full conversation in one place.</p>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <Link href="/dashboard/support" className="btn btn-primary">Go to support</Link>
              <Link href="/contact" className="btn btn-outline">Public enquiry</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
