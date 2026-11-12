"use client";

import Link from "next/link";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { investments, portfolioSummary } from "@/lib/data/customer";

export default function InvestmentsPage() {
  const columns = [
    {
      key: "product",
      header: "Investment",
      sortable: true,
      render: (row) => (
        <div className="table-primary-copy">
          <Link className="table-link" href={`/dashboard/investments/${row.id}`}>{row.product}</Link>
          <span>{row.reference} · {row.category}</span>
        </div>
      ),
      csvValue: (row) => row.product,
    },
    { key: "principal", header: "Principal", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.principal)}</span> },
    { key: "currentValue", header: "Current value", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.currentValue)}</span>, hideOnMobile: true },
    { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    { key: "startDate", header: "Start", sortable: true, render: (row) => formatDate(row.startDate), hideOnMobile: true },
    { key: "maturityDate", header: "Maturity", sortable: true, render: (row) => formatDate(row.maturityDate), hideOnMobile: true },
    { key: "targetReturn", header: "Target", sortable: true, align: "right", render: (row) => `${row.targetReturn}%`, hideOnMobile: true },
    {
      key: "actions",
      header: "",
      exportable: false,
      align: "right",
      render: (row) => (
        <Link href={`/dashboard/investments/${row.id}`} className="icon-button" aria-label={`View ${row.product}`}>
          <ArrowUpRight size={15} />
        </Link>
      ),
    },
  ];

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Portfolio"
        title="My investments"
        description="Every application and active allocation in one place. Values are illustrative and updated for this demonstration."
        actions={<Link href="/dashboard/investments/new" className="btn btn-primary"><Plus size={16} /> New investment</Link>}
      />

      <div className="stat-grid" style={{ marginBottom: 18 }}>
        <StatCard label="Active investments" value={portfolioSummary.activeInvestments} detail="Fully funded allocations" icon="chart" tone="emerald" />
        <StatCard label="Pending applications" value={portfolioSummary.pendingInvestments} detail="Awaiting a decision" icon="hourglass" tone="sand" />
        <StatCard label="Total invested" value={formatCurrency(portfolioSummary.totalInvested)} detail="Across all applications" icon="wallet" tone="forest" />
        <StatCard label="Completed" value={portfolioSummary.completedInvestments} detail="Matured or settled" icon="check-circle" tone="sage" />
      </div>

      <div className="notice-bar" style={{ marginBottom: 14 }}>
        <span>Only approved and reconciled investments appear as active. Pending applications are not yet investments.</span>
        <Link href="/investments" className="text-link">Explore products <ArrowUpRight size={13} /></Link>
      </div>

      <DataTable
        columns={columns}
        rows={investments}
        searchPlaceholder="Search by product, reference or category…"
        searchKeys={["product", "reference", "category", "status"]}
        filters={[
          { key: "status", label: "Status", options: ["Active", "Pending review", "Matured"] },
          { key: "category", label: "Category", options: ["Fixed income", "Impact", "Liquidity", "Alternatives", "Managed portfolio"] },
        ]}
        exportName="vee-investments"
        initialSort={{ key: "principal", direction: "desc" }}
        emptyTitle="No investments match"
        footerNote="Illustrative data"
      />
    </div>
  );
}
