import Link from "next/link";
import { ArrowRight, Check, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProductCatalogue } from "@/components/marketing/product-catalogue";
import { products } from "@/lib/data/site";

export const metadata = {
  title: "Investment opportunities",
  description:
    "Explore VEE investment products across fixed income, impact, managed portfolios, liquidity and alternatives. Illustrative terms only.",
};

export default function InvestmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investment opportunities"
        title={<>Clarity before <em>capital.</em></>}
        description="Compare the terms that matter — minimum, duration, liquidity, fees and risk classification. Every product page explains what can go wrong, not just the return objective."
        breadcrumbs={[{ label: "Investments" }]}
        actions={
          <>
            <Link href="/auth/register" className="btn btn-primary">Create an account <ArrowRight size={16} /></Link>
            <Link href="/risk-disclosure" className="btn btn-outline">Read risk disclosure</Link>
          </>
        }
        aside={
          <div className="hero-aside-card">
            <h3>Before you invest</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Terms</span><strong>Illustrative</strong></div>
              <div className="hero-aside-row"><span>Returns</span><strong>Not guaranteed</strong></div>
              <div className="hero-aside-row"><span>Capital</span><strong>At risk</strong></div>
              <div className="hero-aside-row"><span>Suitability</span><strong>Assessed at application</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <div className="info-note" style={{ marginBottom: 26 }}>
            <ShieldAlert size={17} />
            <span>
              The catalogue below is demonstration content. Target returns, fees and availability
              are illustrative; no product is being offered for sale. A final agreement must be
              reviewed and signed before any investment.
            </span>
          </div>
          <ProductCatalogue products={products} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="How to choose"
            title="Start with the decision, not the yield."
            description="A target return is only one input. These four questions will help you compare opportunities on a more useful basis."
          />
          <div className="about-values">
            <article className="about-value"><span>01</span><h3>When do you need the money?</h3><p>A 24-month lock-in is not suitable for a near-term commitment, regardless of the target return.</p></article>
            <article className="about-value"><span>02</span><h3>What can you afford to lose?</h3><p>Risk classification is a starting point. Your own capacity for loss and emotional tolerance matter too.</p></article>
            <article className="about-value"><span>03</span><h3>What does the fee include?</h3><p>Management fees, fund expenses and exit costs should be compared on a like-for-like basis.</p></article>
            <article className="about-value"><span>04</span><h3>What happens if markets move?</h3><p>Understand valuation, liquidity and early-exit mechanics before committing capital.</p></article>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
            <Link href="/how-it-works" className="btn btn-outline">See the investment journey <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <div className="prose">
            <p className="eyebrow">Important information</p>
            <h2>What this catalogue is — and is not.</h2>
            <p>
              This page is an interface demonstration. It is not an offer, solicitation or
              recommendation to buy any financial product. Product names, return objectives,
              minimums and terms are sample data and require approval, final documentation and
              jurisdiction-specific disclosures before launch.
            </p>
            <h3>Capital at risk</h3>
            <p>
              The value of investments can fall as well as rise. You may get back less than you
              invested. Past performance and illustrative projections are not reliable indicators
              of future results. Only invest capital you can afford to lose.
            </p>
            <h3>Suitability</h3>
            <p>
              Applying for a product does not guarantee acceptance. We assess eligibility,
              suitability, affordability and source of funds where required. We may request
              additional information before making a decision.
            </p>
            <h3>No deposit protection</h3>
            <p>
              Investment products are not bank deposits and are not covered by deposit insurance
              unless a specific product document states otherwise in writing. Check the final
              terms before investing.
            </p>
          </div>
          <aside className="content-sidebar">
            <div className="sidebar-card">
              <h3>Talk it through</h3>
              <p>Questions about eligibility, risk or liquidity? Our team can help you understand the terms.</p>
              <Link href="/contact" className="btn btn-primary">Contact us</Link>
            </div>
            <div className="sidebar-card">
              <h3>Already a client?</h3>
              <p>Access your portfolio, statements and applications in the client portal.</p>
              <Link href="/auth/login" className="btn btn-outline">Client login</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
