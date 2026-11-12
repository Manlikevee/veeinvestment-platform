"use client";

import Link from "next/link";
import { ArrowUpRight, Filter } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { applications } from "@/lib/data/admin";

const columns = [
  { key: "customer", header: "Customer", sortable: true, render: (row) => <div className="table-primary-copy"><Link className="table-link" href={`/admin/investments/${row.id}`}>{row.customer}</Link><span>{row.id} · {row.customerId}</span></div> },
  { key: "product", header: "Product", sortable: true, render: (row) => row.product, hideOnMobile: true },
  { key: "amount", header: "Amount", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.amount)}</span> },
  { key: "stage", header: "Stage", render: (row) => row.stage, hideOnMobile: true },
  { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
  { key: "payment", header: "Payment", render: (row) => <StatusBadge status={row.payment} />, hideOnMobile: true },
  { key: "submitted", header: "Submitted", sortable: true, render: (row) => formatDate(row.submitted), hideOnMobile: true },
  { key: "actions", header: "", exportable: false, align: "right", render: (row) => <Link href={`/admin/investments/${row.id}`} className="icon-button" aria-label="Review application"><ArrowUpRight size={15} /></Link> },
];

export default function AdminInvestmentsPage() {
  return (
    <div className="app-page">
      <PageHeader eyebrow="Investment operations" title="Investment applications" description="Review eligibility, suitability, documentation and funding status. Approval is a separate decision and does not create a transaction." actions={<Link href="/admin/investment-products" className="btn btn-outline"><Filter size={16} /> Manage products</Link>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Pending review" value={applications.filter((a) => a.status === "Pending review").length} detail="Awaiting a decision" icon="hourglass" tone="sand" />
        <StatCard label="Approved" value={applications.filter((a) => ["Approved", "Active"].includes(a.status)).length} detail="Approved or funded" icon="check-circle" tone="emerald" />
        <StatCard label="Needs information" value={applications.filter((a) => ["Information requested", "On hold"].includes(a.status)).length} detail="Customer or compliance action" icon="warning" tone="amber" />
        <StatCard label="Application value" value={formatCurrency(applications.reduce((sum, a) => sum + a.amount, 0))} detail="Demonstration pipeline" icon="chart" tone="forest" />
      </div>
      <DataTable columns={columns} rows={applications} searchPlaceholder="Search customer, product or reference…" searchKeys={["customer", "product", "id", "status", "stage"]} filters={[{ key: "status", label: "Status", options: ["Pending review", "Approved", "Active", "Rejected", "On hold", "Information requested", "Matured"] }]} exportName="vee-investment-applications" initialSort={{ key: "submitted", direction: "desc" }} footerNote="Demonstration pipeline" />
      <div className="info-note" style={{ marginTop: 14 }}><ShieldCheck /><span>Decision interfaces must enforce permissions server-side. No approval should create or settle a transaction automatically.</span></div>
    </div>
  );
}

function ShieldCheck() { return <span aria-hidden="true" style={{ color: "var(--brand-700)" }}>✓</span>; }
