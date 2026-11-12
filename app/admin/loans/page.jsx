"use client";

import Link from "next/link";
import { ArrowUpRight, HandCoins } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { adminLoans } from "@/lib/data/admin";

const columns = [
  { key: "customer", header: "Customer", sortable: true, render: (row) => <div className="table-primary-copy"><Link className="table-link" href={`/admin/loans/${row.id}`}>{row.customer}</Link><span>{row.id} · {row.product}</span></div> },
  { key: "amount", header: "Amount", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.amount)}</span> },
  { key: "outstanding", header: "Outstanding", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.outstanding)}</span> },
  { key: "rate", header: "Rate", sortable: true, render: (row) => `${row.rate}%`, hideOnMobile: true },
  { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
  { key: "nextDue", header: "Next due", render: (row) => formatDate(row.nextDue), hideOnMobile: true },
  { key: "overdue", header: "Arrears", render: (row) => row.overdue ? <span className="badge badge-clay">Overdue</span> : <span className="badge badge-emerald">Current</span>, hideOnMobile: true },
  { key: "actions", header: "", exportable: false, align: "right", render: (row) => <Link href={`/admin/loans/${row.id}`} className="icon-button" aria-label="View loan"><ArrowUpRight size={15} /></Link> },
];

export default function AdminLoansPage() {
  return (
    <div className="app-page">
      <PageHeader eyebrow="Credit operations" title="Loan management" description="Review applications, approved facilities, repayment schedules and overdue accounts." actions={<Link href="/admin/reports" className="btn btn-outline"><HandCoins size={16} /> Loan report</Link>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Outstanding principal" value={formatCurrency(adminLoans.reduce((s, l) => s + l.outstanding, 0))} detail="Across sample facilities" icon="hand-coins" tone="emerald" />
        <StatCard label="Active facilities" value={adminLoans.filter((l) => l.status === "Active").length} detail="Currently repaying" icon="activity" tone="forest" />
        <StatCard label="Overdue accounts" value={adminLoans.filter((l) => l.overdue).length} detail="Arrears require action" icon="warning" tone="clay" />
        <StatCard label="Pending review" value={adminLoans.filter((l) => l.status === "Pending review").length} detail="Credit assessment" icon="hourglass" tone="sand" />
      </div>
      <DataTable columns={columns} rows={adminLoans} searchPlaceholder="Search customer, facility or reference…" searchKeys={["customer", "product", "id", "status"]} filters={[{ key: "status", label: "Status", options: ["Active", "Pending review", "Approved", "Rejected", "Completed", "Overdue"] }]} exportName="vee-loans-admin" initialSort={{ key: "outstanding", direction: "desc" }} footerNote="Demonstration loan book" />
      <div className="info-note" style={{ marginTop: 14 }}><HandCoins size={16} /><span>Credit decisions require authorised approval and complete affordability evidence. The frontend must not calculate a final credit decision.</span></div>
    </div>
  );
}
