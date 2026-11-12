"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarClock, Plus, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils/format";
import { loans } from "@/lib/data/customer";

const columns = [
  {
    key: "product", header: "Facility", sortable: true,
    render: (row) => <div className="table-primary-copy"><Link className="table-link" href={`/dashboard/loans/${row.id}`}>{row.product}</Link><span>{row.reference} · {row.purpose}</span></div>,
  },
  { key: "amount", header: "Original amount", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.amount)}</span>, hideOnMobile: true },
  { key: "outstanding", header: "Outstanding", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.outstanding)}</span> },
  { key: "interestRate", header: "Rate", sortable: true, render: (row) => formatPercent(row.interestRate), hideOnMobile: true },
  { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
  { key: "nextPayment", header: "Next payment", render: (row) => row.nextPayment ? <div className="table-primary-copy"><strong>{formatDate(row.nextPayment)}</strong><span>{formatCurrency(row.nextPaymentAmount)}</span></div> : "—", hideOnMobile: true },
  { key: "actions", header: "", exportable: false, align: "right", render: (row) => <Link href={`/dashboard/loans/${row.id}`} className="icon-button" aria-label="View loan"><ArrowUpRight size={15} /></Link> },
];

export default function LoansPage() {
  const active = loans.find((loan) => loan.status === "Active");
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Finance"
        title="Loans"
        description="View your borrowing facilities, repayment schedules and documents. Loan approval is subject to eligibility and affordability assessment."
        actions={<Link href="/dashboard/loans/new" className="btn btn-primary"><Plus size={16} /> New application</Link>}
      />

      {active ? (
        <section className="detail-banner highlight" style={{ marginBottom: 16 }}>
          <div className="detail-banner-main">
            <p className="detail-banner-label">Outstanding balance · {active.reference}</p>
            <p className="detail-banner-value">{formatCurrency(active.outstanding)}</p>
            <div className="detail-banner-meta"><StatusBadge status={active.status} /><span>{active.product}</span><span>·</span><span>{active.interestRate}% p.a.</span></div>
          </div>
          <div className="detail-return">
            <div><span>Next repayment</span><strong>{formatDate(active.nextPayment)}</strong></div>
            <div><span>Amount due</span><strong>{formatCurrency(active.nextPaymentAmount)}</strong></div>
            <Link href={`/dashboard/loans/${active.id}`} className="btn btn-primary">View schedule</Link>
          </div>
        </section>
      ) : null}

      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Total borrowed" value={formatCurrency(loans.reduce((sum, loan) => sum + loan.amount, 0))} detail="Across all facilities" icon="hand-coins" tone="emerald" />
        <StatCard label="Outstanding" value={formatCurrency(loans.reduce((sum, loan) => sum + loan.outstanding, 0))} detail="Principal outstanding" icon="wallet" tone="sand" />
        <StatCard label="Active facilities" value={loans.filter((loan) => loan.status === "Active").length} detail="Current commitments" icon="activity" tone="forest" />
        <StatCard label="Next payment" value={formatDate(active?.nextPayment)} detail={formatCurrency(active?.nextPaymentAmount)} icon="calendar" tone="sage" />
      </div>

      <div className="notice-bar" style={{ marginBottom: 14 }}>
        <span><ShieldCheck size={14} /> A loan application is not an offer of credit. All facilities require approval and signed documentation.</span>
        <Link href="/contact" className="text-link">Questions? Contact us</Link>
      </div>

      <DataTable
        columns={columns}
        rows={loans}
        searchPlaceholder="Search by facility, reference or purpose…"
        searchKeys={["product", "reference", "purpose", "status"]}
        filters={[{ key: "status", label: "Status", options: ["Active", "Completed", "Pending review", "Overdue"] }]}
        exportName="vee-loans"
        footerNote="Illustrative loan records"
      />

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="panel-head"><div><h2>Repayment approach</h2><p>How facilities and schedules are managed</p></div><CalendarClock size={17} style={{ color: "var(--text-tertiary)" }} /></div>
        <div className="panel-body">
          <div className="about-values" style={{ marginTop: 0 }}>
            <article className="about-value"><span><ShieldCheck size={18} /></span><h3>Transparent schedule</h3><p>Every approved facility includes principal, interest and fees before drawdown.</p></article>
            <article className="about-value"><span><CalendarClock size={18} /></span><h3>Payment reminders</h3><p>Upcoming repayments appear in notifications and the loan view.</p></article>
            <article className="about-value"><span><ArrowUpRight size={18} /></span><h3>No hidden changes</h3><p>Changes to terms require documentation and an audit record.</p></article>
          </div>
        </div>
      </section>
    </div>
  );
}
