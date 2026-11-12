"use client";

import Link from "next/link";
import { ArrowUpRight, Eye, ScanFace } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils/format";
import { documentQueue } from "@/lib/data/admin";

const columns = [
  { key: "customer", header: "Customer", sortable: true, render: (row) => <div className="table-primary-copy"><Link className="table-link" href={`/admin/documents/${row.id}`}>{row.customer}</Link><span>{row.customerId} · {row.document}</span></div> },
  { key: "category", header: "Category", sortable: true, render: (row) => <span className="badge badge-neutral">{row.category}</span> },
  { key: "uploaded", header: "Uploaded", sortable: true, render: (row) => formatDate(row.uploaded), hideOnMobile: true },
  { key: "expires", header: "Expires", render: (row) => formatDate(row.expires), hideOnMobile: true },
  { key: "priority", header: "Priority", render: (row) => <span className={`badge badge-${row.priority === "High" ? "clay" : row.priority === "Normal" ? "sage" : "neutral"}`}>{row.priority}</span> },
  { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
  { key: "reviewer", header: "Reviewer", render: (row) => row.reviewer, hideOnMobile: true },
  { key: "action", header: "", exportable: false, align: "right", render: (row) => <Link href={`/admin/documents/${row.id}`} className="icon-button" aria-label="Open review"><Eye size={15} /></Link> },
];

export default function AdminDocumentsPage() {
  return (
    <div className="app-page">
      <PageHeader eyebrow="KYC & compliance" title="Document review centre" description="Review identity, address, bank and supporting documents. Open a record for the split-screen review interface." actions={<Link href="/admin/onboarding" className="btn btn-outline"><ScanFace size={16} /> Onboarding queue</Link>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Awaiting review" value={documentQueue.filter((d) => d.status === "Under review").length} detail="Assigned or unassigned" icon="scan-face" tone="sand" />
        <StatCard label="Replacement requested" value={documentQueue.filter((d) => d.status === "Replacement requested").length} detail="Customer action required" icon="warning" tone="clay" />
        <StatCard label="Approved" value={documentQueue.filter((d) => d.status === "Approved").length} detail="In this sample queue" icon="check-circle" tone="emerald" />
        <StatCard label="Rejected" value={documentQueue.filter((d) => d.status === "Rejected").length} detail="Document failed review" icon="x-circle" tone="amber" />
      </div>
      <DataTable columns={columns} rows={documentQueue} searchPlaceholder="Search customer, document or reference…" searchKeys={["customer", "document", "id", "status", "reviewer"]} filters={[{ key: "status", label: "Status", options: ["Under review", "Approved", "Rejected", "Replacement requested", "Pending upload"] }, { key: "category", label: "Category", options: ["Identity", "Address", "Bank", "Investment", "Loan", "Compliance"] }]} exportName="vee-document-queue" initialSort={{ key: "priority", direction: "desc" }} footerNote="Demonstration queue" />
      <div className="info-note" style={{ marginTop: 14 }}><ScanFace size={16} /><span>Reviewers must not share customer documents outside approved systems. Every access and decision requires an audit record.</span></div>
    </div>
  );
}
