"use client";

import Link from "next/link";
import { ArrowUpRight, Download, PieChart } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { GrowthLineChart, AllocationDonut, ChartLegend } from "@/components/charts/chart-primitives";
import { DownloadStatement } from "@/components/ui/download-statement";
import { formatCurrency } from "@/lib/utils/format";
import { customers, aumAllocation, customerGrowth } from "@/lib/data/admin";

const columns = [
  { key: "name", header: "Customer", sortable: true, render: (row) => <div className="table-primary-copy"><Link className="table-link" href={`/admin/portfolio/${row.id}`}>{row.name}</Link><span>{row.id} · {row.manager}</span></div> },
  { key: "portfolio", header: "Portfolio value", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.portfolio)}</span> },
  { key: "invested", header: "Invested", sortable: true, align: "right", render: (row) => formatCurrency(row.invested), hideOnMobile: true },
  { key: "risk", header: "Risk", sortable: true, render: (row) => row.risk },
  { key: "status", header: "Status", render: (row) => row.status, hideOnMobile: true },
  { key: "actions", header: "", exportable: false, align: "right", render: (row) => <Link href={`/admin/portfolio/${row.id}`} className="icon-button" aria-label="Open portfolio"><ArrowUpRight size={15} /></Link> },
];

export default function AdminPortfolioPage() {
  const total = customers.reduce((sum, c) => sum + c.portfolio, 0);
  return (
    <div className="app-page">
      <PageHeader eyebrow="Investment operations" title="Portfolio management" description="Monitor assets under management, customer portfolios, allocation and maturity exposure. Historical records are immutable." actions={<DownloadStatement title="AUM portfolio report" filename="vee-aum-portfolio-report.pdf" lines={customers.map((c) => `${c.id} · ${c.name} · ${formatCurrency(c.portfolio)}`)} label="Export report" />} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Assets under management" value="₦18.4bn" detail="Illustrative platform total" icon="landmark" tone="emerald" />
        <StatCard label="Customer sample total" value={formatCurrency(total)} detail="Sum of displayed records" icon="pie-chart" tone="forest" />
        <StatCard label="Active portfolios" value={customers.filter((c) => c.portfolio > 0).length} detail="In the sample directory" icon="activity" tone="sage" />
        <StatCard label="Average portfolio" value={formatCurrency(total / Math.max(1, customers.filter((c) => c.portfolio > 0).length))} detail="Sample average" icon="chart" tone="sand" />
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <section className="panel"><div className="panel-head"><div><h2>AUM growth</h2><p>Illustrative customer and portfolio trend</p></div><span className="badge badge-neutral">Demo</span></div><div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}><GrowthLineChart data={customerGrowth} height={280} /></div><div className="panel-footer"><ChartLegend items={[{ label: "Registered customers", color: "var(--brand-600)" }, { label: "Active customers", color: "var(--gold)" }]} /><span>Customer count proxy</span></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Customer portfolios</h2><p>Sample records and relationship ownership</p></div></div><DataTable columns={columns} rows={customers} searchPlaceholder="Search customer or manager…" searchKeys={["name", "id", "manager"]} pageSize={7} exportName="vee-customer-portfolios" footerNote="Demonstration data" /></section>
        </div>
        <aside className="dashboard-side-col">
          <section className="panel"><div className="panel-head"><div><h2>Allocation</h2><p>Across the sample book</p></div><PieChart size={17} style={{ color: "var(--text-tertiary)" }} /></div><div className="panel-body"><AllocationDonut data={aumAllocation} centerLabel="AUM" centerValue="₦18.4bn" height={220} /><div className="allocation-list" style={{ marginTop: 8 }}>{aumAllocation.map((item) => <div className="allocation-row" key={item.name}><i style={{ background: item.color }} /><span className="allocation-name">{item.name}</span><span className="allocation-value">{item.value}%</span><div className="allocation-bar"><span style={{ width: `${item.value}%`, background: item.color }} /></div></div>)}</div></div></section>
          <section className="panel"><div className="panel-head"><div><h2>Maturity exposure</h2><p>Next 12 months</p></div></div><div className="panel-body"><div className="maturity-list">{[["Q4 2026", "₦4.2m"], ["Q1 2027", "₦7.8m"], ["Q2 2027", "₦2.5m"]].map(([label, value]) => <div className="maturity-item" key={label}><span className="maturity-date"><strong>{label.split(" ")[1]}</strong><span>{label.split(" ")[0]}</span></span><span className="maturity-copy"><strong>{label}</strong><span>Projected maturities</span></span><span className="maturity-value">{value}</span></div>)}</div><div className="info-note" style={{ marginTop: 12 }}>Illustrative maturity exposure only.</div></div></section>
        </aside>
      </div>
    </div>
  );
}
