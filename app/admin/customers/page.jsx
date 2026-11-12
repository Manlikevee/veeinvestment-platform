"use client";

import Link from "next/link";
import { ArrowUpRight, Download, UserCheck, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { customers } from "@/lib/data/admin";

const columns = [
  {
    key: "name", header: "Customer", sortable: true,
    render: (row) => <div className="table-primary"><Avatar name={row.name} size="sm" /><div className="table-primary-copy"><Link className="table-link" href={`/admin/customers/${row.id}`}>{row.name}</Link><span>{row.id} · {row.email}</span></div></div>,
  },
  { key: "accountType", header: "Type", render: (row) => row.accountType, hideOnMobile: true },
  { key: "status", header: "Account", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
  { key: "kyc", header: "KYC", sortable: true, render: (row) => <StatusBadge status={row.kyc} /> },
  { key: "portfolio", header: "Portfolio value", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.portfolio)}</span> },
  { key: "joined", header: "Joined", sortable: true, render: (row) => formatDate(row.joined), hideOnMobile: true },
  { key: "manager", header: "Manager", render: (row) => row.manager, hideOnMobile: true },
  { key: "actions", header: "", exportable: false, align: "right", render: (row) => <Link href={`/admin/customers/${row.id}`} className="icon-button" aria-label="View customer"><ArrowUpRight size={15} /></Link> },
];

export default function AdminCustomersPage() {
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Client operations"
        title="Customer management"
        description="Search and review customer accounts, verification status, portfolio value and relationship ownership."
        actions={<><Link href="/admin/onboarding" className="btn btn-outline"><UserPlus size={16} /> Onboarding queue</Link><Link href="/admin/reports" className="btn btn-primary"><Download size={16} /> Export report</Link></>}
      />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Total customers" value={customers.length} detail="In this demonstration directory" icon="users" tone="emerald" />
        <StatCard label="Active accounts" value={customers.filter((customer) => customer.status === "Active").length} detail="Able to transact" icon="user-check" tone="forest" />
        <StatCard label="Pending KYC" value={customers.filter((customer) => customer.kyc !== "Verified").length} detail="Documents or checks outstanding" icon="scan-face" tone="sand" />
        <StatCard label="Suspended" value={customers.filter((customer) => customer.status === "Suspended").length} detail="Access restricted" icon="shield" tone="amber" />
      </div>
      <DataTable
        columns={columns}
        rows={customers}
        searchPlaceholder="Search name, email, reference or manager…"
        searchKeys={["name", "email", "id", "manager", "kyc", "status"]}
        filters={[
          { key: "status", label: "Account", options: ["Active", "Suspended", "Closed", "Pending"] },
          { key: "kyc", label: "Verification", options: ["Verified", "Under review", "Pending documents", "Not started"] },
        ]}
        exportName="vee-customers"
        initialSort={{ key: "portfolio", direction: "desc" }}
        footerNote="Demonstration directory · 12 of 1,248 sample records"
      />
      <div className="info-note" style={{ marginTop: 14 }}><Users size={16} /><span>The directory is a sample. Bulk export, notes and account actions must be authorised and recorded by the future API.</span></div>
    </div>
  );
}
