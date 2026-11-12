import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, FileText, ShieldCheck, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { DemoActionButton } from "@/components/ui/demo-action";
import { DownloadStatement } from "@/components/ui/download-statement";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { adminLoans } from "@/lib/data/admin";

export function generateStaticParams() { return adminLoans.map((loan) => ({ id: loan.id })); }
export async function generateMetadata({ params }) { const { id } = await params; const loan = adminLoans.find((l) => l.id === id); return { title: loan ? loan.id : "Loan" }; }

function scheduleFor(loan) {
  const months = Number.parseInt(loan.term, 10) || 12;
  const monthly = loan.repayment || Math.round((loan.amount * (1 + (loan.rate / 100) * (months / 12))) / months);
  return Array.from({ length: Math.min(months, 12) }, (_, index) => {
    const date = new Date(loan.approved || loan.submitted);
    date.setMonth(date.getMonth() + index + 1);
    const interest = Math.round(loan.amount * (loan.rate / 100) / 12);
    return { due: date.toISOString().slice(0, 10), amount: monthly, principal: Math.max(0, monthly - interest), interest, status: index < 5 ? "Paid" : index === 5 ? "Due" : "Upcoming" };
  });
}

export default async function AdminLoanDetailPage({ params }) {
  const { id } = await params;
  const loan = adminLoans.find((item) => item.id === id);
  if (!loan) notFound();
  const schedule = scheduleFor(loan);
  return (
    <div className="app-page">
      <PageHeader compact breadcrumbs={[{ label: "Loan management", href: "/admin/loans" }, { label: loan.id }]} title={`${loan.customer} · ${loan.product}`} description={`${loan.id} · ${loan.purpose} · ${loan.term}`} actions={<><Link href="/admin/loans" className="btn btn-outline"><ArrowLeft size={15} /> Back</Link><DownloadStatement title={`${loan.id} facility schedule`} filename={`${loan.id}-schedule.pdf`} label="Export schedule" lines={schedule.map((s) => `${formatDate(s.due)} · ${formatCurrency(s.amount)} · ${s.status}`)} /></>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <div className="stat-card"><p className="stat-label">Original amount</p><p className="stat-value">{formatCurrency(loan.amount)}</p><p className="stat-detail">Approved {formatDate(loan.approved)}</p></div>
        <div className="stat-card"><p className="stat-label">Outstanding</p><p className="stat-value">{formatCurrency(loan.outstanding)}</p><p className="stat-detail">Next due {formatDate(loan.nextDue)}</p></div>
        <div className="stat-card"><p className="stat-label">Monthly repayment</p><p className="stat-value">{formatCurrency(loan.repayment)}</p><p className="stat-detail">{loan.rate}% p.a.</p></div>
        <div className="stat-card"><p className="stat-label">Status</p><p className="stat-value" style={{ fontSize: "1.2rem" }}><StatusBadge status={loan.status} /></p><p className="stat-detail">{loan.overdue ? "Arrears require attention" : "No arrears recorded"}</p></div>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel"><div className="panel-head"><div><h2>Facility details</h2><p>Customer, terms and approval context</p></div></div><div className="panel-body"><div className="info-grid three"><div className="info-row"><span>Customer</span><strong><Link href={`/admin/customers/${loan.customerId}`}>{loan.customer}</Link></strong></div><div className="info-row"><span>Product</span><strong>{loan.product}</strong></div><div className="info-row"><span>Purpose</span><strong>{loan.purpose}</strong></div><div className="info-row"><span>Submitted</span><strong>{formatDate(loan.submitted)}</strong></div><div className="info-row"><span>Approved</span><strong>{formatDate(loan.approved)}</strong></div><div className="info-row"><span>Interest rate</span><strong>{loan.rate}% p.a.</strong></div><div className="info-row"><span>Term</span><strong>{loan.term}</strong></div><div className="info-row"><span>Next due</span><strong>{formatDate(loan.nextDue)}</strong></div><div className="info-row"><span>Repayment source</span><strong>Assessed at approval</strong></div></div></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Repayment schedule</h2><p>Illustrative amortisation</p></div><span className="badge badge-neutral">Demo</span></div><div className="table-scroll"><table className="data-table"><thead><tr><th>Due date</th><th>Total</th><th>Principal</th><th>Interest</th><th>Status</th></tr></thead><tbody>{schedule.map((item, index) => <tr key={item.due} style={item.status === "Due" ? { background: "var(--brand-50)" } : undefined}><td>{formatDate(item.due)}</td><td className="table-amount">{formatCurrency(item.amount)}</td><td>{formatCurrency(item.principal)}</td><td>{formatCurrency(item.interest)}</td><td><StatusBadge status={item.status} /></td></tr>)}</tbody></table></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Documents & approval history</h2></div></div><div className="panel-body"><div className="detail-document-list">{[["Facility agreement"],["Affordability assessment"],["Approval memo"]].map(([doc]) => <div className="detail-document" key={doc}><span className="detail-document-icon"><FileText size={14} /></span><div className="detail-document-copy"><strong>{doc}</strong><span>PDF · Demonstration placeholder</span></div><DownloadStatement title={doc} filename={`${loan.id}-${doc.toLowerCase().replaceAll(" ", "-")}.pdf`} label="" className="icon-button" lines={[`Loan: ${loan.id}`, `Customer: ${loan.customer}`]} /></div>)}</div><div className="timeline" style={{ marginTop: 16 }}><div className="timeline-item"><span className="timeline-marker" /><div className="timeline-copy"><strong>Application submitted</strong><p>{loan.customer}</p><span>{formatDate(loan.submitted)}</span></div></div>{loan.approved ? <div className="timeline-item"><span className="timeline-marker" /><div className="timeline-copy"><strong>Facility approved</strong><p>Approval recorded after credit assessment.</p><span>{formatDate(loan.approved)}</span></div></div> : null}</div></div></section>
        </div>
        <aside className="detail-side"><section className="panel"><div className="panel-head"><div><h2>Credit decisions</h2><p>Authorised actions</p></div></div><div className="panel-body"><div className="review-actions"><DemoActionButton className="btn btn-primary" toastTitle="Loan approval staged" toastMessage="No credit decision or disbursement was made."><Check size={15} /> Approve</DemoActionButton><DemoActionButton className="btn btn-outline" toastTitle="Information request staged" toastMessage="No message was sent."><ShieldCheck size={15} /> Request info</DemoActionButton><DemoActionButton className="btn btn-danger" toastTitle="Rejection staged" toastMessage="No loan record was changed."><X size={15} /> Reject</DemoActionButton></div><div className="info-note is-warning" style={{ marginTop: 12 }}><ShieldCheck size={15} /><span>Approval must include affordability evidence and must not disburse automatically.</span></div></div></section><section className="panel"><div className="panel-head"><div><h2>Arrears</h2></div><StatusBadge status={loan.overdue ? "Overdue" : "Current"} /></div><div className="panel-body"><p className="small muted">{loan.overdue ? "This account is overdue. A documented collections process must be followed; do not alter balances directly." : "No arrears in the sample. Continue monitoring repayment status."}</p></div></section></aside>
      </div>
    </div>
  );
}
