import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowUpRight, FileText, Mail, MapPin, Phone, ShieldCheck, UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { CustomerActions } from "@/components/admin/customer-actions";
import { CustomerNote } from "@/features/admin/customer-note";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils/format";
import { customers, applications, adminTransactions, documentQueue, auditLogs } from "@/lib/data/admin";
import { customer as primaryCustomer, investments, transactions, documents, tickets, activity } from "@/lib/data/customer";

export function generateStaticParams() {
  return customers.map((customer) => ({ id: customer.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const record = customers.find((item) => item.id === id);
  return { title: record ? record.name : "Customer" };
}

export default async function AdminCustomerDetailPage({ params }) {
  const { id } = await params;
  const record = customers.find((item) => item.id === id);
  if (!record) notFound();
  const isPrimary = record.id === primaryCustomer.id;
  const full = isPrimary ? primaryCustomer : null;
  const customerInvestments = isPrimary ? investments : [];
  const customerTransactions = isPrimary ? transactions : [];
  const customerDocuments = isPrimary ? documents : documentQueue.filter((document) => document.customerId === id);
  const customerTickets = isPrimary ? tickets : [];
  const customerApps = applications.filter((application) => application.customerId === id);
  const audit = auditLogs.filter((log) => log.record.includes(record.name) || log.record.includes(id));

  return (
    <div className="app-page">
      <PageHeader
        compact
        breadcrumbs={[{ label: "Customers", href: "/admin/customers" }, { label: record.name }]}
        title={record.name}
        description={`${record.id} · ${record.accountType} · Joined ${formatDate(record.joined)}`}
        actions={
          <>
            <CustomerActions customerId={record.id} initialStatus={record.status} />
            <Link href="/admin/documents" className="btn btn-outline">Documents</Link>
            <Link href={`/admin/portfolio/${record.id}`} className="btn btn-primary">View portfolio</Link>
          </>
        }
      />

      <section className="profile-cover" style={{ marginBottom: 16 }}>
        <Avatar name={record.name} size="lg" />
        <div className="profile-cover-copy">
          <h2>{record.name}</h2>
          <p>{record.email} · {record.phone}</p>
          <span className="badge badge-emerald"><ShieldCheck size={12} /> {record.kyc}</span>
        </div>
      </section>

      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <div className="stat-card"><p className="stat-label">Portfolio value</p><p className="stat-value">{formatCurrency(record.portfolio)}</p><p className="stat-detail">Total invested {formatCurrency(record.invested)}</p></div>
        <div className="stat-card"><p className="stat-label">Risk profile</p><p className="stat-value" style={{ fontSize: "1.3rem" }}>{record.risk}</p><p className="stat-detail">Profile completeness {record.profileComplete}%</p></div>
        <div className="stat-card"><p className="stat-label">Relationship manager</p><p className="stat-value" style={{ fontSize: "1.1rem" }}>{record.manager}</p><p className="stat-detail">Last active {formatDateTime(record.lastActive)}</p></div>
        <div className="stat-card"><p className="stat-label">Open items</p><p className="stat-value">{record.flags + (record.kyc !== "Verified" ? 1 : 0)}</p><p className="stat-detail">Verification or account flags</p></div>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel">
            <div className="panel-head"><div><h2>Customer profile</h2><p>Identity, contact and employment information</p></div><StatusBadge status={record.onboarding} /></div>
            <div className="panel-body">
              <div className="info-grid three">
                <div className="info-row"><span>Customer reference</span><strong className="mono">{record.id}</strong></div>
                <div className="info-row"><span>Email</span><strong><a href={`mailto:${record.email}`}>{record.email}</a></strong></div>
                <div className="info-row"><span>Phone</span><strong>{record.phone}</strong></div>
                <div className="info-row"><span>Country</span><strong>{record.country}</strong></div>
                <div className="info-row"><span>City</span><strong>{record.city}</strong></div>
                <div className="info-row"><span>Occupation</span><strong>{record.occupation}</strong></div>
                <div className="info-row"><span>Employer</span><strong>{record.employer}</strong></div>
                <div className="info-row"><span>Source of funds</span><strong>{record.sourceOfFunds}</strong></div>
                <div className="info-row"><span>Preferred contact</span><strong>{full?.preferredContact || "Email"}</strong></div>
                <div className="info-row"><span>Date of birth</span><strong>{full?.dob ? formatDate(full.dob) : "—"}</strong></div>
                <div className="info-row"><span>Nationality</span><strong>{full?.nationality || "—"}</strong></div>
                <div className="info-row"><span>Profile completeness</span><strong>{record.profileComplete}%</strong></div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Investments and applications</h2><p>{customerInvestments.length + customerApps.length} records linked to this customer</p></div><Link href={`/admin/portfolio/${record.id}`} className="panel-link">Portfolio record</Link></div>
            <div className="table-scroll">
              <table className="data-table">
                <thead><tr><th>Reference</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {customerInvestments.map((investment) => (
                    <tr key={investment.id}><td className="mono">{investment.reference}</td><td>{investment.product}</td><td className="table-amount">{formatCurrency(investment.principal)}</td><td><StatusBadge status={investment.status} /></td><td>{formatDate(investment.startDate || investment.submittedAt)}</td></tr>
                  ))}
                  {customerApps.map((application) => (
                    <tr key={application.id}><td className="mono">{application.id}</td><td>{application.product}</td><td className="table-amount">{formatCurrency(application.amount)}</td><td><StatusBadge status={application.status} /></td><td>{formatDate(application.submitted)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Documents</h2><p>Identity, address and financial evidence</p></div><Link href="/admin/documents" className="panel-link">Review centre</Link></div>
            <div className="panel-body">
              {customerDocuments.length ? (
                <div className="detail-document-list">
                  {customerDocuments.map((document) => (
                    <div className="detail-document" key={document.id}>
                      <span className="detail-document-icon"><FileText size={15} /></span>
                      <div className="detail-document-copy"><strong>{document.name || document.document}</strong><span>{document.category} · {document.reviewer || "Unassigned"}</span></div>
                      <StatusBadge status={document.status} />
                    </div>
                  ))}
                </div>
              ) : <p className="muted small">No documents in the sample record.</p>}
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Transactions</h2><p>Account activity requiring finance oversight</p></div></div>
            <div className="table-scroll">
              <table className="data-table">
                <thead><tr><th>Reference</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {(customerTransactions.length ? customerTransactions : adminTransactions.filter((item) => item.customerId === id)).slice(0, 6).map((transaction) => (
                    <tr key={transaction.id}><td className="mono">{transaction.reference}</td><td>{transaction.type}</td><td className="table-amount">{formatCurrency(transaction.amount)}</td><td><StatusBadge status={transaction.status} /></td><td>{formatDate(transaction.date)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Support history</h2><p>Client requests and conversation status</p></div></div>
            <div className="panel-body">
              {customerTickets.length ? customerTickets.map((ticket) => <div className="ticket-item" key={ticket.id} style={{ marginBottom: 8 }}><div className="ticket-copy"><h3>{ticket.subject}</h3><p>{ticket.messages[ticket.messages.length - 1].body}</p><div className="ticket-meta"><span>{ticket.reference}</span><span>·</span><span>{ticket.category}</span></div></div><div className="ticket-item-side"><StatusBadge status={ticket.status} /><Link href="/admin/support" className="btn btn-outline btn-sm">Open</Link></div></div>) : <p className="muted small">No support tickets in the sample record.</p>}
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Audit trail</h2><p>Decisions and changes linked to this record</p></div><span className="badge badge-neutral">Immutable</span></div>
            <div className="panel-body">
              <div className="timeline">
                {(audit.length ? audit : [
                  { id: "AUD-X1", action: "Customer record created", actor: "System", time: record.joined, before: null, after: "Active" },
                  { id: "AUD-X2", action: "Document review completed", actor: "Compliance team", time: full?.consent.acceptedAt || record.joined, before: "Pending", after: "Verified" },
                ]).map((log) => (
                  <div className="timeline-item" key={log.id}><span className="timeline-marker" /><div className="timeline-copy"><strong>{log.action}</strong><p>{log.actor}{log.before ? ` · ${log.before} → ${log.after}` : ""}</p><span>{formatDateTime(log.time)}</span></div></div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="detail-side">
          <section className="panel">
            <div className="panel-head"><div><h2>Contact details</h2></div></div>
            <div className="panel-body">
              <div className="contact-detail"><span className="contact-detail-icon"><Mail size={15} /></span><div><strong>Email</strong><a href={`mailto:${record.email}`}>{record.email}</a></div></div>
              <div className="contact-detail"><span className="contact-detail-icon"><Phone size={15} /></span><div><strong>Phone</strong><p>{record.phone}</p></div></div>
              <div className="contact-detail"><span className="contact-detail-icon"><MapPin size={15} /></span><div><strong>Location</strong><p>{record.city}, {record.country}</p></div></div>
            </div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Bank information</h2><p>Masked for security</p></div></div>
            <div className="panel-body">
              <div className="info-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="info-row"><span>Bank</span><strong>{full?.bank.bankName || "Guaranty Trust Bank"}</strong></div>
                <div className="info-row"><span>Account name</span><strong>{full?.bank.accountName || record.name}</strong></div>
                <div className="info-row"><span>Account number</span><strong className="mono">•••••••4821</strong></div>
                <div className="info-row"><span>Verification</span><strong><StatusBadge status="Verified" /></strong></div>
              </div>
              <div className="info-note" style={{ marginTop: 12 }}><ShieldCheck size={15} /><span>Full bank details are not exposed in ordinary administration views.</span></div>
            </div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Internal notes</h2><p>Visible to authorised staff only</p></div></div>
            <div className="panel-body"><CustomerNote /></div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Recent activity</h2></div></div>
            <div className="panel-body">
              <div className="timeline">
                {(isPrimary ? activity : [{ date: record.lastActive, event: "Last active", detail: record.city }]).map((item) => <div className="timeline-item" key={item.date}><span className="timeline-marker is-muted" /><div className="timeline-copy"><strong>{item.event}</strong><p>{item.detail}</p><span>{formatDateTime(item.date)}</span></div></div>)}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
