import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowUpRight, Calendar, CheckCircle2, Clock, Download, FileText,
  Hourglass, Landmark, ShieldCheck, TrendingUp, Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownloadStatement } from "@/components/ui/download-statement";
import { DemoActionButton } from "@/components/ui/demo-action";
import { PortfolioPerformanceChart } from "@/components/charts/chart-primitives";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { investments, transactions } from "@/lib/data/customer";

export function generateStaticParams() {
  return investments.map((investment) => ({ id: investment.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const investment = investments.find((item) => item.id === id);
  return { title: investment ? investment.product : "Investment" };
}

export default async function InvestmentDetailPage({ params }) {
  const { id } = await params;
  const investment = investments.find((item) => item.id === id);
  if (!investment) notFound();
  const relatedTransactions = transactions.filter((transaction) => transaction.related === investment.id);
  const isPending = investment.status === "Pending review";

  return (
    <div className="app-page">
      <PageHeader
        compact
        breadcrumbs={[{ label: "My investments", href: "/dashboard/investments" }, { label: investment.reference }]}
        title={investment.product}
        description={`${investment.reference} · ${investment.category} · ${investment.term}`}
        actions={
          <>
            <DownloadStatement
              title={`${investment.product} — demonstration statement`}
              filename={`${investment.reference}-statement.pdf`}
              lines={[
                `Reference: ${investment.reference}`,
                `Principal: ${formatCurrency(investment.principal)}`,
                `Current value: ${formatCurrency(investment.currentValue)}`,
                `Status: ${investment.status}`,
                `Start date: ${formatDate(investment.startDate)}`,
                `Maturity date: ${formatDate(investment.maturityDate)}`,
                `Target return: ${investment.targetReturn}% per annum`,
              ]}
            />
            {investment.status === "Active" ? (
              <DemoActionButton
                className="btn btn-outline"
                modalTitle="Request an early withdrawal review"
                modalDescription="This is an interface demonstration. No withdrawal request will be created."
                modalBody={
                  <div className="stack">
                    <div className="info-note is-warning"><ShieldCheck size={16} /><span>Early withdrawal is subject to the product terms, notice periods and manager approval. It is not guaranteed.</span></div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                      In a live platform, this action would create a reviewable request and notify the investment team. No funds move automatically.
                    </p>
                    <label className="checkbox"><input type="checkbox" defaultChecked /> I understand a review request is not an approval.</label>
                  </div>
                }
                modalConfirmLabel="Submit demo request"
              >
                <ArrowUpRight size={15} /> Early withdrawal
              </DemoActionButton>
            ) : null}
          </>
        }
      />

      <div className="detail-layout">
        <div className="detail-main">
          <section className="detail-banner highlight">
            <div className="detail-banner-main">
              <p className="detail-banner-label">{isPending ? "Application amount" : "Current value"}</p>
              <p className="detail-banner-value">{formatCurrency(isPending ? investment.principal : investment.currentValue)}</p>
              <div className="detail-banner-meta">
                <StatusBadge status={investment.status} />
                <span>Principal {formatCurrency(investment.principal)}</span>
                <span>·</span>
                <span>{investment.targetReturn}% target p.a.</span>
              </div>
            </div>
            <div className="detail-return">
              <div><span>Term</span><strong>{investment.term}</strong></div>
              <div><span>{isPending ? "Submitted" : "Maturity"}</span><strong>{formatDate(isPending ? investment.submittedAt : investment.maturityDate)}</strong></div>
              <div><span>Next payment</span><strong>{isPending ? "Not scheduled" : formatDate(investment.nextPayment)}</strong></div>
            </div>
          </section>

          {isPending ? (
            <section className="panel">
              <div className="panel-head"><div><h2>Application status</h2><p>No investment is active until the application is approved and funded.</p></div><StatusBadge status={investment.status} /></div>
              <div className="panel-body">
                <div className="timeline">
                  <div className="timeline-item"><span className="timeline-marker" /><div className="timeline-copy"><strong>Application submitted</strong><p>Your application was received and recorded.</p><span>{formatDate(investment.submittedAt)}</span></div></div>
                  <div className="timeline-item"><span className="timeline-marker" /><div className="timeline-copy"><strong>Suitability review</strong><p>An authorised reviewer will assess eligibility, suitability and source of funds.</p><span>Current stage · {investment.applicationStage}</span></div></div>
                  <div className="timeline-item"><span className="timeline-marker is-muted" /><div className="timeline-copy"><strong>Decision</strong><p>You will be notified of the outcome and any next steps.</p><span>Not yet reached</span></div></div>
                  <div className="timeline-item"><span className="timeline-marker is-muted" /><div className="timeline-copy"><strong>Funding and activation</strong><p>Only after approval and reconciled payment would an investment be created.</p><span>Not yet reached</span></div></div>
                </div>
              </div>
            </section>
          ) : (
            <section className="panel">
              <div className="panel-head"><div><h2>Performance</h2><p>Illustrative movement in value since inception</p></div><span className="badge badge-neutral">Demo</span></div>
              <div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}>
                {investment.performance.length ? (
                  <PortfolioPerformanceChart data={investment.performance} height={240} />
                ) : (
                  <EmptyState icon="chart" title="No performance history" description="A pending application does not yet have a performance record." />
                )}
              </div>
            </section>
          )}

          <section className="panel">
            <div className="panel-head"><div><h2>Investment details</h2><p>Terms shown are illustrative and subject to the final agreement.</p></div></div>
            <div className="panel-body">
              <div className="info-grid three">
                <div className="info-row"><span>Reference</span><strong className="mono">{investment.reference}</strong></div>
                <div className="info-row"><span>Product</span><strong>{investment.product}</strong></div>
                <div className="info-row"><span>Category</span><strong>{investment.category}</strong></div>
                <div className="info-row"><span>Principal</span><strong>{formatCurrency(investment.principal)}</strong></div>
                <div className="info-row"><span>Target return</span><strong>{investment.targetReturn}% p.a.</strong></div>
                <div className="info-row"><span>Payment frequency</span><strong>{investment.paymentFrequency}</strong></div>
                <div className="info-row"><span>Start date</span><strong>{formatDate(investment.startDate)}</strong></div>
                <div className="info-row"><span>Maturity date</span><strong>{formatDate(investment.maturityDate)}</strong></div>
                <div className="info-row"><span>Risk classification</span><strong>{investment.risk}</strong></div>
              </div>
              <div className="info-note" style={{ marginTop: 18 }}><ShieldCheck size={16} /><span>Target returns are not guaranteed. The value of this investment can fall, and the terms may be subject to change before final documentation.</span></div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Payment history</h2><p>Distributions and related activity</p></div><Link href="/dashboard/transactions" className="panel-link">All transactions</Link></div>
            {relatedTransactions.length ? (
              <div className="table-scroll">
                <table className="data-table">
                  <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
                  <tbody>
                    {relatedTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{formatDate(transaction.date)}</td>
                        <td>{transaction.description}</td>
                        <td className="table-amount">{formatCurrency(transaction.amount, { signed: true })}</td>
                        <td><StatusBadge status={transaction.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="panel-body"><EmptyState icon="receipt" title="No payments yet" description={isPending ? "No funds have been committed while the application is under review." : "Distributions will appear here once processed."} /></div>
            )}
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Documents</h2><p>Agreements and statements for this investment</p></div></div>
            <div className="panel-body">
              <div className="detail-document-list">
                {investment.documents.map((document) => (
                  <div className="detail-document" key={document}>
                    <span className="detail-document-icon"><FileText size={15} /></span>
                    <div className="detail-document-copy"><strong>{document}</strong><span>PDF · Demonstration placeholder</span></div>
                    <DownloadStatement title={document} filename={`${investment.reference}-${document.toLowerCase().replaceAll(" ", "-")}.pdf`} lines={[`Investment: ${investment.product}`, `Reference: ${investment.reference}`, `Status: ${investment.status}`]} label="" className="icon-button" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="detail-side">
          <div className="sidebar-card">
            <h3>Need to make a change?</h3>
            <p>Changes to instructions or bank details require additional verification. Contact support to begin a controlled process.</p>
            <Link href="/dashboard/support" className="btn btn-primary">Contact support</Link>
            <Link href="/dashboard/investments" className="btn btn-ghost" style={{ marginTop: 7 }}>Back to investments</Link>
          </div>
          <div className="sidebar-card">
            <h3>Risk reminder</h3>
            <p>Investments can fall in value. Projected or target returns are not guarantees, and early exit may be restricted.</p>
            <Link href="/risk-disclosure" className="text-link" style={{ marginTop: 8 }}>Read risk disclosure <ArrowUpRight size={13} /></Link>
          </div>
          <div className="sidebar-card">
            <h3>Investment reference</h3>
            <p className="mono" style={{ color: "var(--text)", fontSize: "0.78rem" }}>{investment.reference}</p>
            <p style={{ marginTop: 5 }}>Quote this reference in any support request.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
