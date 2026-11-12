import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Download, FileText, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ProductCard, ProductFeatureList } from "@/components/marketing/product-card";
import { RiskMeter } from "@/components/marketing/risk-meter";
import { Accordion } from "@/components/ui/accordion";
import { formatCompactCurrency } from "@/lib/utils/format";
import { products } from "@/lib/data/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Investment not found" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function InvestmentDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${product.category} · ${product.status}`}
        title={product.name}
        description={product.summary}
        breadcrumbs={[{ label: "Investments", href: "/investments" }, { label: product.shortName }]}
        actions={
          <>
            <Link href={`/dashboard/investments/new?product=${product.slug}`} className="btn btn-primary">
              Apply to invest <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-outline">Ask a question</Link>
          </>
        }
        aside={
          <div className="hero-aside-card">
            <div className="flex-between"><h3>Indicative terms</h3><span className="badge badge-neutral">Demo</span></div>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Target return</span><strong>{product.targetReturn}% p.a.</strong></div>
              <div className="hero-aside-row"><span>Minimum</span><strong>{formatCompactCurrency(product.min)}</strong></div>
              <div className="hero-aside-row"><span>Duration</span><strong>{product.durationLabel}</strong></div>
              <div className="hero-aside-row"><span>Risk</span><strong>{product.risk}</strong></div>
            </div>
            <p className="hero-aside-row" style={{ borderTop: 0, paddingBottom: 0, color: "var(--text-tertiary)", fontSize: "0.62rem", lineHeight: 1.5 }}>
              Target returns are not guaranteed. Terms are confirmed in the final product agreement.
            </p>
          </div>
        }
      />

      <section className="section">
        <div className="container detail-sections">
          <div>
            <div className="detail-block">
              <p className="eyebrow">Overview</p>
              <h2>Investment objective</h2>
              <p>{product.description}</p>
              <ProductFeatureList items={product.objectives} />
            </div>

            <div className="detail-block">
              <h2>Eligibility and application</h2>
              <p>Eligibility is assessed during application. Meeting the criteria below does not guarantee acceptance.</p>
              <ProductFeatureList items={product.eligibility} />
              <div className="info-note" style={{ marginTop: 16 }}>
                <Check size={17} />
                <span>Applications are reviewed by an authorised team. No investment is created until a decision is recorded and funding is reconciled.</span>
              </div>
            </div>

            <div className="detail-block">
              <h2>Fees and charges</h2>
              <table className="fee-table">
                <tbody>
                  {product.fees.map((fee) => (
                    <tr key={fee.label}><td>{fee.label}</td><td>{fee.value}</td></tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: 12, fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
                Fees shown are illustrative and subject to the final terms. Total costs can reduce returns.
              </p>
            </div>

            <div className="detail-block">
              <h2>Withdrawals and liquidity</h2>
              <p>{product.withdrawal}</p>
              <div className="risk-disclosure-box">
                <strong><ShieldAlert size={15} /> Liquidity is not guaranteed</strong>
                <p>Access to capital may be restricted by the product term, notice periods or market conditions. Do not commit funds you may need before maturity.</p>
              </div>
            </div>

            <div className="detail-block">
              <h2>Documents</h2>
              <p>These documents would be provided in final form before an application is completed.</p>
              <div className="detail-document-list" style={{ marginTop: 14 }}>
                {product.documents.map((document) => (
                  <div className="detail-document" key={document}>
                    <span className="detail-document-icon"><FileText size={15} /></span>
                    <div className="detail-document-copy"><strong>{document}</strong><span>PDF · Demonstration placeholder</span></div>
                    <button type="button" className="icon-button" aria-label={`Download ${document}`} title="Demonstration documents are not available">
                      <Download size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-block">
              <h2>Frequently asked questions</h2>
              <Accordion items={product.faqs} />
            </div>
          </div>

          <aside className="content-sidebar">
            <div className="apply-card">
              <div className="product-return-large">
                <div><span>{product.returnLabel}</span><strong>{product.targetReturn}%</strong></div>
                <span>Illustrative<br />Not guaranteed</span>
              </div>
              <div className="apply-card-list">
                <div className="apply-card-row"><span>Minimum investment</span><strong>{formatCompactCurrency(product.min)}</strong></div>
                <div className="apply-card-row"><span>Maximum</span><strong>{formatCompactCurrency(product.max)}</strong></div>
                <div className="apply-card-row"><span>Duration</span><strong>{product.durationLabel}</strong></div>
                <div className="apply-card-row"><span>Risk classification</span><strong><RiskMeter level={product.riskLevel} label={product.risk} /></strong></div>
                <div className="apply-card-row"><span>Status</span><strong>{product.status}</strong></div>
              </div>
              <Link href={`/dashboard/investments/new?product=${product.slug}`} className="btn btn-primary">
                Start application <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{ marginTop: 8 }}>Speak to the team</Link>
              <small>
                By applying, you confirm that you have read the product terms and risk disclosure.
                Application is not approval and no funds move automatically.
              </small>
            </div>
            <div className="sidebar-card">
              <h3>Risk classification</h3>
              <p>{product.risk} risk · Level {product.riskLevel} of 5. This classification is indicative and may be updated after formal product approval.</p>
              <Link href="/risk-disclosure" className="text-link" style={{ marginTop: 9 }}>Read the risk disclosure <ArrowRight size={14} /></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="eyebrow">Other opportunities</p>
              <h2>Compare another option.</h2>
            </div>
            <Link href="/investments" className="link-arrow">All opportunities <span><ArrowRight size={15} /></span></Link>
          </div>
          <div className="product-grid">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
