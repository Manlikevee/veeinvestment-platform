import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, ScanFace, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { DocumentReviewActions } from "@/components/admin/document-review-actions";
import { DownloadStatement } from "@/components/ui/download-statement";
import { formatDate } from "@/lib/utils/format";
import { documentQueue, customers } from "@/lib/data/admin";

export function generateStaticParams() {
  return documentQueue.map((document) => ({ id: document.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const document = documentQueue.find((item) => item.id === id);
  return { title: document ? document.document : "Document review" };
}

export default async function AdminDocumentDetailPage({ params }) {
  const { id } = await params;
  const document = documentQueue.find((item) => item.id === id);
  if (!document) notFound();
  const customer = customers.find((item) => item.id === document.customerId);
  return (
    <div className="app-page">
      <PageHeader compact breadcrumbs={[{ label: "Documents", href: "/admin/documents" }, { label: document.id }]} title={document.document} description={`${document.customer} · ${document.category} · ${document.id}`} actions={<Link href="/admin/documents" className="btn btn-outline"><ArrowLeft size={15} /> Back to queue</Link>} />
      <div className="review-layout">
        <section className="document-preview">
          <div className="preview-toolbar">
            <div className="preview-toolbar-copy"><strong>{document.document}</strong><span>{document.size} · Uploaded {formatDate(document.uploaded)}</span></div>
            <div className="preview-actions"><DownloadStatement title={document.document} filename={`${document.id}.pdf`} label="" className="icon-button" lines={[`Document: ${document.document}`, `Customer: ${document.customer}`, `Status: ${document.status}`]} /><StatusBadge status={document.status} /></div>
          </div>
          <div className="preview-canvas">
            <div className="mock-document">
              <div className="mock-document-head"><div><strong>{document.type}</strong><span>DEMONSTRATION DOCUMENT</span></div><FileText size={18} /></div>
              <div className="mock-document-portrait" />
              <div className="mock-document-line" /><div className="mock-document-line short" />
              <div className="mock-document-band"><div><span>Holder</span><strong>{document.customer}</strong></div><div><span>Reference</span><strong>{document.id}</strong></div></div>
              <div className="mock-document-band"><div><span>Issued</span><strong>{formatDate(document.uploaded)}</strong></div><div><span>Expires</span><strong>{formatDate(document.expires)}</strong></div></div>
              <div className="mock-document-line short" /><div className="mock-document-line" />
              <p style={{ marginTop: 20, fontSize: "0.5rem", color: "var(--text-tertiary)" }}>Illustrative document preview. No personal data is displayed.</p>
            </div>
          </div>
        </section>
        <aside className="review-side">
          <section className="panel">
            <div className="panel-head"><div><h2>Document metadata</h2><p>Evidence and reviewer context</p></div><ScanFace size={17} style={{ color: "var(--text-tertiary)" }} /></div>
            <div className="panel-body">
              <div className="info-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="info-row"><span>Customer</span><strong><Link href={`/admin/customers/${document.customerId}`}>{document.customer}</Link></strong></div>
                <div className="info-row"><span>Category</span><strong>{document.category}</strong></div>
                <div className="info-row"><span>Document type</span><strong>{document.type}</strong></div>
                <div className="info-row"><span>Uploaded</span><strong>{formatDate(document.uploaded)}</strong></div>
                <div className="info-row"><span>Expiry</span><strong>{formatDate(document.expires)}</strong></div>
                <div className="info-row"><span>Reviewer</span><strong>{document.reviewer}</strong></div>
                <div className="info-row"><span>Priority</span><strong>{document.priority}</strong></div>
              </div>
              {customer ? <div className="info-note" style={{ marginTop: 12 }}><ShieldCheck size={15} /><span>Customer KYC status: {customer.kyc}. Review this document against the full account record.</span></div> : null}
            </div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Review decision</h2><p>Record a reason for the outcome</p></div></div>
            <div className="panel-body"><DocumentReviewActions initialStatus={document.status === "Pending upload" ? "Under review" : document.status} /></div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Review history</h2></div></div>
            <div className="panel-body"><div className="timeline"><div className="timeline-item"><span className="timeline-marker" /><div className="timeline-copy"><strong>Document uploaded</strong><p>{document.customer}</p><span>{formatDate(document.uploaded)}</span></div></div><div className="timeline-item"><span className="timeline-marker is-muted" /><div className="timeline-copy"><strong>Awaiting reviewer</strong><p>{document.reviewer}</p><span>Current</span></div></div></div></div>
          </section>
        </aside>
      </div>
    </div>
  );
}
