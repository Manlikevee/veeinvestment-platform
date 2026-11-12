"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, Clock, FileCheck2,
  ShieldCheck, Users,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { GrowthLineChart, InvestmentActivityChart, RevenueChart, AllocationDonut, ChartLegend } from "@/components/charts/chart-primitives";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import {
  adminStats, applications, aumAllocation, customerGrowth, documentQueue,
  investmentActivity, pendingTasks, revenueTrend,
} from "@/lib/data/admin";

const applicationColumns = [
  { key: "customer", header: "Customer", sortable: true, render: (row) => <div className="table-primary-copy"><Link className="table-link" href={`/admin/investments/${row.id}`}>{row.customer}</Link><span>{row.product}</span></div> },
  { key: "amount", header: "Amount", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.amount)}</span> },
  { key: "stage", header: "Stage", render: (row) => row.stage, hideOnMobile: true },
  { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
  { key: "submitted", header: "Submitted", sortable: true, render: (row) => formatDate(row.submitted), hideOnMobile: true },
  { key: "action", header: "", exportable: false, align: "right", render: (row) => <Link href={`/admin/investments/${row.id}`} className="icon-button" aria-label="View application"><ArrowUpRight size={15} /></Link> },
];

export default function AdminOverviewPage() {
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Operations overview"
        title="Good morning, Ngozi."
        description="A live operational view of onboarding, verification, investment activity and finance. All figures are demonstration data."
        actions={
          <>
            <Link href="/admin/reports" className="btn btn-outline"><CalendarDays size={16} /> Reports</Link>
            <Link href="/admin/onboarding" className="btn btn-primary">Review queue <ArrowRight size={16} /></Link>
          </>
        }
      />

      <div className="stat-grid" style={{ marginBottom: 16 }}>
        {adminStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <section className="panel">
            <div className="panel-head"><div><h2>Customer growth</h2><p>Registered and active customers · 12 months</p></div><div className="panel-head-action"><span className="badge badge-neutral">Demo data</span></div></div>
            <div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}><GrowthLineChart data={customerGrowth} height={280} /></div>
            <div className="panel-footer"><ChartLegend items={[{ label: "Registered", color: "var(--brand-600)" }, { label: "Active", color: "var(--gold)" }]} /><Link href="/admin/customers" className="panel-link">Customer directory</Link></div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Investment activity</h2><p>Applications and approvals · six months</p></div><span className="badge badge-forest">{investmentActivity.reduce((sum, item) => sum + item.applications, 0)} applications</span></div>
            <div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}><InvestmentActivityChart data={investmentActivity} height={260} /></div>
            <div className="panel-footer"><ChartLegend items={[{ label: "Applications", color: "var(--brand-100)" }, { label: "Approved", color: "var(--brand-600)" }]} /><Link href="/admin/investments" className="panel-link">Manage applications</Link></div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Applications requiring attention</h2><p>Pending, information requested and on hold</p></div><Link href="/admin/investments" className="panel-link">View all</Link></div>
            <DataTable
              columns={applicationColumns}
              rows={applications.filter((item) => !["Active", "Matured", "Rejected"].includes(item.status))}
              searchPlaceholder="Search applications…"
              searchKeys={["customer", "product", "status"]}
              pageSize={5}
              exportName="vee-pending-applications"
              footerNote="Demo queue"
            />
          </section>
        </div>

        <div className="dashboard-side-col">
          <section className="panel">
            <div className="panel-head"><div><h2>Assets under management</h2><p>By product category</p></div></div>
            <div className="panel-body">
              <AllocationDonut data={aumAllocation} centerLabel="AUM" centerValue="₦18.4bn" height={200} />
              <div className="allocation-list" style={{ marginTop: 8 }}>
                {aumAllocation.map((item) => <div className="allocation-row" key={item.name}><i style={{ background: item.color }} /><span className="allocation-name">{item.name}</span><span className="allocation-value">{item.value}%</span><div className="allocation-bar"><span style={{ width: `${item.value}%`, background: item.color }} /></div></div>)}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Pending tasks</h2><p>Prioritised operational queue</p></div><Clock size={17} style={{ color: "var(--warning)" }} /></div>
            <div className="panel-body">
              <div className="task-list">
                {pendingTasks.map((task) => (
                  <Link href={task.href} className="task-item" key={task.id}>
                    <span className="task-icon"><ShieldCheck size={15} /></span>
                    <span className="task-copy"><strong>{task.title}</strong><span>{task.meta}</span></span>
                    <span className={`badge badge-${task.priority === "High" ? "clay" : task.priority === "Medium" ? "sand" : "neutral"}`}>{task.priority}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Revenue trend</h2><p>Demonstration revenue and cost</p></div></div>
            <div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}><RevenueChart data={revenueTrend} height={190} /></div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Document queue</h2><p>{documentQueue.filter((item) => item.status === "Under review").length} awaiting review</p></div><Link href="/admin/documents" className="panel-link">Open queue</Link></div>
            <div className="panel-body">
              <div className="maturity-list">
                {documentQueue.slice(0, 4).map((document) => (
                  <Link href={`/admin/documents/${document.id}`} className="maturity-item" key={document.id}>
                    <span className="maturity-date"><FileCheck2 size={17} /></span>
                    <span className="maturity-copy"><strong>{document.customer}</strong><span>{document.document}</span></span>
                    <StatusBadge status={document.status} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
