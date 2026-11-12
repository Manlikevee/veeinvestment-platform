import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { ApplicationDecision } from "@/features/admin/application-decision";
import { DownloadStatement } from "@/components/ui/download-statement";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { applications, customers } from "@/lib/data/admin";

export function generateStaticParams() {
  return applications.map((application) => ({ id: application.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const application = applications.find((item) => item.id === id);
  return { title: application ? `${application.customer} application` : "Application" };
}

export default async function AdminApplicationDetailPage({ params }) {
  const { id } = await params;
  const application = applications.find((item) => item.id === id);
  if (!application) notFound();
  const customer = customers.find((item) => item.id === application.customerId);
  return (
    <div className="app-page">
      <PageHeader compact breadcrumbs={[{ label: "Applications", href: "/admin/investments" }, { label: application.id }]} title={`${application.customer} · ${application.product}`} description={`${application.id} · Submitted ${formatDate(application.submitted)} · ${application.stage}`} actions={<><Link href="/admin/investments" className="btn btn-outline"><ArrowLeft size={15} /> Back to applications</Link><DownloadStatement title="Application summary" filename={`${application.id}-summary.pdf`} label="Export summary" lines={[`Application: ${application.id}`, `Customer: ${application.customer}`, `Product: ${application.product}`, `Amount: ${formatCurrency(application.amount)}`, `Status: ${application.status}`]} /></>} />
      <div className="detail-layout">
        <div className="detail-main">
          <section className="detail-banner highlight">
            <div className="detail-banner-main"><p className="detail-banner-label">Requested amount</p><p className="detail-banner-value">{formatCurrency(application.amount)}</p><div className="detail-banner-meta"><StatusBadge status={application.status} /><span>{application.product}</span><span>·</span><span>{application.risk} risk</span></div></div>
            <div className="detail-return"><div><span>Payment</span><strong>{application.payment}</strong></div><div><span>Reviewer</span><strong>{application.reviewer}</strong></div><div><span>Stage</span><strong>{application.stage}</strong></div></div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Application information</h2><p>Customer and product context</p></div></div>
            <div className="panel-body">
              <div className="info-grid three">
                <div className="info-row"><span>Customer</span><strong><Link href={`/admin/customers/${application.customerId}`}>{application.customer}</Link></strong></div>
                <div className="info-row"><span>Customer reference</span><strong className="mono">{application.customerId}</strong></div>
                <div className="info-row"><span>Email</span><strong>{customer?.email || "—"}</strong></div>
                <div className="info-row"><span>Product</span><strong>{application.product}</strong></div>
                <div className="info-row"><span>Submitted</span><strong>{formatDate(application.submitted)}</strong></div>
                <div className="info-row"><span>Risk profile</span><strong>{application.risk}</strong></div>
                <div className="info-row"><span>Stage</span><strong>{application.stage}</strong></div>
                <div className="info-row"><span>Payment status</span><strong><StatusBadge status={application.payment} /></strong></div>
                <div className="info-row"><span>Reviewer</span><strong>{application.reviewer}</strong></div>
              </div>
              <div className="info-note" style={{ marginTop: 16 }}><ShieldCheck size={16} /><span>Verification and application decisions must be made by an authorised person. The platform must record the actor, timestamp and reason.</span></div>
            </div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Documents</h2><p>Supporting evidence for this application</p></div><Link href="/admin/documents" className="panel-link">Review centre</Link></div>
            <div className="panel-body">
              <div className="detail-document-list">
                {["Application summary", "Suitability assessment", "Risk disclosure acknowledgement"].map((doc) => <div className="detail-document" key={doc}><span className="detail-document-icon"><FileText size={15} /></span><div className="detail-document-copy"><strong>{doc}</strong><span>PDF · Demonstration</span></div><DownloadStatement title={doc} filename={`${application.id}-${doc.toLowerCase().replaceAll(" ", "-")}.pdf`} label="" className="icon-button" lines={[`Application: ${application.id}`, `Customer: ${application.customer}`]} /></div>)}
              </div>
            </div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Decision history</h2><p>Recorded decisions and conditions</p></div><span className="badge badge-neutral">Append-only</span></div>
            <div className="panel-body">
              {application.decisionHistory.length ? <div className="timeline">{application.decisionHistory.map((decision) => <div className="timeline-item" key={`${decision.date}-${decision.decision}`}><span className="timeline-marker" /><div className="timeline-copy"><strong>{decision.decision}</strong><p>{decision.note}</p><span>{decision.actor} · {formatDate(decision.date)}</span></div></div>)}</div> : <p className="muted small">No decision has been recorded.</p>}
            </div>
          </section>
        </div>
        <aside className="detail-side">
          <section className="panel"><div className="panel-head"><div><h2>Decision</h2><p>Authorised review action</p></div></div><div className="panel-body"><ApplicationDecision initialStatus={application.status} /></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Payment status</h2></div><StatusBadge status={application.payment} /></div><div className="panel-body"><p className="small muted">No payment is requested until approval. Finance must reconcile funds separately before an investment is recorded.</p><Link href="/admin/payments" className="btn btn-outline btn-sm" style={{ marginTop: 12 }}>Payment records <ArrowUpRight size={13} /></Link></div></section>
        </aside>
      </div>
    </div>
  );
}
