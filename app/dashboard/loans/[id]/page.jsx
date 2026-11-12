import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarClock, Download, FileText, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownloadStatement } from "@/components/ui/download-statement";
import { DemoActionButton } from "@/components/ui/demo-action";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { loans } from "@/lib/data/customer";

export function generateStaticParams() {
  return loans.map((loan) => ({ id: loan.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const loan = loans.find((item) => item.id === id);
  return { title: loan ? loan.reference : "Loan" };
}

export default async function LoanDetailPage({ params }) {
  const { id } = await params;
  const loan = loans.find((item) => item.id === id);
  if (!loan) notFound();
  const paid = loan.schedule.filter((item) => item.status === "Paid").length;

  return (
    <div className="app-page">
      <PageHeader
        compact
        breadcrumbs={[{ label: "Loans", href: "/dashboard/loans" }, { label: loan.reference }]}
        title={loan.product}
        description={`${loan.reference} · ${loan.term} · ${loan.interestRate}% p.a.`}
        actions={
          <>
            <DownloadStatement title={`${loan.product} — repayment schedule`} filename={`${loan.reference}-schedule.pdf`} label="Download schedule" lines={loan.schedule.map((item) => `${formatDate(item.dueDate)} · ${formatCurrency(item.amount)} · ${item.status}`)} />
            <DemoActionButton className="btn btn-outline" modalTitle="Request a repayment review" modalDescription="Demonstration only. No request is submitted." modalConfirmLabel="Submit demo request">
              <ShieldCheck size={15} /> Repayment help
            </DemoActionButton>
          </>
        }
      />

      <div className="detail-layout">
        <div className="detail-main">
          <section className="detail-banner highlight">
            <div className="detail-banner-main">
              <p className="detail-banner-label">Outstanding balance</p>
              <p className="detail-banner-value">{formatCurrency(loan.outstanding)}</p>
              <div className="detail-banner-meta"><StatusBadge status={loan.status} /><span>Original {formatCurrency(loan.amount)}</span><span>·</span><span>Next {formatDate(loan.nextPayment)}</span></div>
            </div>
            <div className="detail-return">
              <div><span>Monthly repayment</span><strong>{formatCurrency(loan.monthlyRepayment)}</strong></div>
              <div><span>Repayments made</span><strong>{paid} of {loan.schedule.length}</strong></div>
              <div><span>Maturity</span><strong>{formatDate(loan.maturityDate)}</strong></div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Facility details</h2><p>Illustrative terms from the approved facility</p></div><span className="badge badge-neutral">Demo</span></div>
            <div className="panel-body">
              <div className="info-grid three">
                <div className="info-row"><span>Reference</span><strong className="mono">{loan.reference}</strong></div>
                <div className="info-row"><span>Facility</span><strong>{loan.product}</strong></div>
                <div className="info-row"><span>Purpose</span><strong>{loan.purpose}</strong></div>
                <div className="info-row"><span>Original amount</span><strong>{formatCurrency(loan.amount)}</strong></div>
                <div className="info-row"><span>Interest rate</span><strong>{loan.interestRate}% p.a.</strong></div>
                <div className="info-row"><span>Term</span><strong>{loan.term}</strong></div>
                <div className="info-row"><span>Start date</span><strong>{formatDate(loan.startDate)}</strong></div>
                <div className="info-row"><span>Maturity date</span><strong>{formatDate(loan.maturityDate)}</strong></div>
                <div className="info-row"><span>Collateral</span><strong>{loan.collateral}</strong></div>
              </div>
              <div className="progress" style={{ marginTop: 18 }}><span style={{ width: `${loan.progress}%` }} /></div>
              <div className="flex-between" style={{ marginTop: 6, fontSize: "0.64rem", color: "var(--text-tertiary)" }}><span>Repayment progress</span><span>{loan.progress}%</span></div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Repayment schedule</h2><p>{loan.status === "Active" ? "Next payment highlighted" : "Completed facility"}</p></div><CalendarClock size={17} style={{ color: "var(--text-tertiary)" }} /></div>
            <div className="table-scroll">
              <table className="data-table">
                <thead><tr><th>Due date</th><th>Total</th><th>Principal</th><th>Interest</th><th>Status</th><th /></tr></thead>
                <tbody>
                  {loan.schedule.map((item) => (
                    <tr key={item.dueDate} style={item.status === "Due" ? { background: "var(--brand-50)" } : undefined}>
                      <td><strong>{formatDate(item.dueDate)}</strong></td>
                      <td className="table-amount">{formatCurrency(item.amount)}</td>
                      <td>{formatCurrency(item.principal)}</td>
                      <td>{formatCurrency(item.interest)}</td>
                      <td><StatusBadge status={item.status} /></td>
                      <td>{item.status === "Due" ? <span className="badge badge-sand">Next</span> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Facility documents</h2><p>Signed agreements and statements</p></div></div>
            <div className="panel-body">
              <div className="detail-document-list">
                {loan.documents.map((document) => (
                  <div className="detail-document" key={document}>
                    <span className="detail-document-icon"><FileText size={15} /></span>
                    <div className="detail-document-copy"><strong>{document}</strong><span>PDF · Demonstration document</span></div>
                    <DownloadStatement title={document} filename={`${loan.reference}-${document.toLowerCase().replaceAll(" ", "-")}.pdf`} label="" className="icon-button" lines={[`Facility: ${loan.reference}`, `Product: ${loan.product}`, `Outstanding: ${formatCurrency(loan.outstanding)}`]} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="detail-side">
          <div className="sidebar-card">
            <h3>Repayment responsibilities</h3>
            <p>Keep your nominated account funded by the due date. If you anticipate difficulty, contact support before the date — do not wait for a missed payment.</p>
            <Link href="/dashboard/support" className="btn btn-primary">Contact support</Link>
          </div>
          <div className="sidebar-card">
            <h3>Need help?</h3>
            <p>Repayment queries are handled by the credit operations team with a documented case reference.</p>
            <Link href="/contact" className="text-link" style={{ marginTop: 8 }}>Public enquiry <ArrowLeft size={13} style={{ transform: "rotate(180deg)" }} /></Link>
          </div>
          <div className="sidebar-card">
            <h3>Credit risk</h3>
            <p>Late or missed payments may affect your credit profile and incur charges under the facility agreement.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
