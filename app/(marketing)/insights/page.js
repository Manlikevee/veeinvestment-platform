import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { InsightsExplorer } from "@/components/marketing/insights-explorer";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { insightCategories, insights } from "@/lib/data/site";

export const metadata = {
  title: "Insights",
  description:
    "Research and education on portfolio construction, risk, liquidity, planning and investor behaviour from Vee Investment.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Clear thinking for <em>better decisions.</em></>}
        description="A considered library on markets, portfolio construction, risk and the human side of investing. Educational content — not personal advice."
        breadcrumbs={[{ label: "Insights" }]}
        actions={<Link href="/auth/register" className="btn btn-primary">Start your journey <ArrowRight size={16} /></Link>}
        aside={
          <div className="hero-aside-card">
            <h3>What we write about</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Portfolio thinking</span><strong>Long-term</strong></div>
              <div className="hero-aside-row"><span>Risk</span><strong>Practical</strong></div>
              <div className="hero-aside-row"><span>Planning</span><strong>Behaviour-aware</strong></div>
              <div className="hero-aside-row"><span>Markets</span><strong>No forecasts</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <InsightsExplorer articles={insights} categories={insightCategories} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="newsletter-panel">
            <div>
              <p className="eyebrow">VEE notes</p>
              <h2>Get the next note.</h2>
              <p>Occasional research and practical explainers. No noise; unsubscribe any time.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
