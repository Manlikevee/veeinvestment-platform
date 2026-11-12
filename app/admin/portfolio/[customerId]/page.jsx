import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownloadStatement } from "@/components/ui/download-statement";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { customers, applications } from "@/lib/data/admin";
import { investments } from "@/lib/data/customer";

export function generateStaticParams() { return customers.map((customer) => ({ customerId: customer.id })); }
export async function generateMetadata({ params }) { const { customerId } = await params; const c = customers.find((i) => i.id === customerId); return { title: c ? `${c.name} portfolio` : "Portfolio" }; }

export default async function AdminCustomerPortfolioPage({ params }) {
  const { customerId } = await params;
  const customer = customers.find((item) => item.id === customerId);
  if (!customer) notFound();
  const customerInvestments = customer.id === "CUS-1042" ? investments.filter((i) => i.status === "Active" || i.status === "Matured") : [];
  const customerApps = applications.filter((a) => a.customerId === customer.id);
  return (
    <div className="app-page">
      <PageHeader compact breadcrumbs={[{ label: "Portfolio management", href: "/admin/portfolio" }, { label: customer.name }]} title={`${customer.name} · Portfolio`} description={`${customer.id} · Relationship manager ${customer.manager} · ${customer.risk} risk profile`} actions={<><Link href="/admin/portfolio" className="btn btn-outline"><ArrowLeft size={15} /> Back</Link><DownloadStatement title={`${customer.name} portfolio statement`} filename={`${customer.id}-portfolio.pdf`} label="Export statement" lines={[`Customer: ${customer.name}`, `Portfolio value: ${formatCurrency(customer.portfolio)}`, `Invested: ${formatCurrency(customer.invested)}`]} /></>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <div className="stat-card"><p className="stat-label">Portfolio value</p><p className="stat-value">{formatCurrency(customer.portfolio)}</p><p className="stat-detail">As at 12 Nov 2026</p></div>
        <div className="stat-card"><p className="stat-label">Total invested</p><p className="stat-value">{formatCurrency(customer.invested)}</p><p className="stat-detail">Capital committed</p></div>
        <div className="stat-card"><p className="stat-label">Active records</p><p className="stat-value">{customerInvestments.filter((i) => i.status === "Active").length}</p><p className="stat-detail">Fully funded</p></div>
        <div className="stat-card"><p className="stat-label">Application records</p><p className="stat-value">{customerApps.length}</p><p className="stat-detail">All statuses</p></div>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel"><div className="panel-head"><div><h2>Customer information</h2><p>Identity and relationship context</p></div><StatusBadge status={customer.status} /></div><div className="panel-body"><div className="info-grid three"><div className="info-row"><span>Email</span><strong>{customer.email}</strong></div><div className="info-row"><span>Phone</span><strong>{customer.phone}</strong></div><div className="info-row"><span>Location</span><strong>{customer.city}, {customer.country}</strong></div><div className="info-row"><span>Joined</span><strong>{formatDate(customer.joined)}</strong></div><div className="info-row"><span>KYC</span><strong><StatusBadge status={customer.kyc} /></strong></div><div className="info-row"><span>Manager</span><strong>{customer.manager}</strong></div></div></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Investments</h2><p>Principal, dates, maturity and status</p></div></div><div className="table-scroll"><table className="data-table"><thead><tr><th>Reference</th><th>Product</th><th>Principal</th><th>Value</th><th>Start</th><th>Maturity</th><th>Status</th></tr></thead><tbody>{customerInvestments.length ? customerInvestments.map((i) => <tr key={i.id}><td className="mono">{i.reference}</td><td>{i.product}</td><td className="table-amount">{formatCurrency(i.principal)}</td><td className="table-amount">{formatCurrency(i.currentValue)}</td><td>{formatDate(i.startDate)}</td><td>{formatDate(i.maturityDate)}</td><td><StatusBadge status={i.status} /></td></tr>) : <tr><td colSpan={7}><p className="muted small" style={{ padding: 14 }}>No active sample investment records. Application records are shown below.</p></td></tr>}</tbody></table></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Investment history</h2><p>Applications and decisions</p></div></div><div className="table-scroll"><table className="data-table"><thead><tr><th>ID</th><th>Product</th><th>Amount</th><th>Status</th><th>Submitted</th></tr></thead><tbody>{customerApps.length ? customerApps.map((a) => <tr key={a.id}><td className="mono">{a.id}</td><td>{a.product}</td><td className="table-amount">{formatCurrency(a.amount)}</td><td><StatusBadge status={a.status} /></td><td>{formatDate(a.submitted)}</td></tr>) : <tr><td colSpan={5}><p className="muted small" style={{ padding: 14 }}>No application records in the sample.</p></td></tr>}</tbody></table></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Payment records</h2><p>Distributions and funding history</p></div></div><div className="panel-body"><div className="info-note"><ShieldCheck size={15} /><span>Payment records are reconciled through finance workflows. No balance is edited from the portfolio view.</span></div></div></section>
        </div>
        <aside className="detail-side"><div className="sidebar-card"><h3>Historical integrity</h3><p>Portfolio values and transaction records are not silently overwritten. Adjustments require a reversal or correction workflow with an audit record.</p></div><div className="sidebar-card"><h3>Customer actions</h3><Link href={`/admin/customers/${customer.id}`} className="btn btn-outline">Customer profile <ArrowUpRight size={13} /></Link><Link href="/admin/investments" className="btn btn-ghost" style={{ marginTop: 7 }}>Applications</Link></div></aside>
      </div>
    </div>
  );
}
