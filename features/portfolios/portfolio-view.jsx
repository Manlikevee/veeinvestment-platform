"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Download, PieChart, TrendingUp, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PortfolioPerformanceChart, AllocationDonut, ChartLegend } from "@/components/charts/chart-primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownloadStatement } from "@/components/ui/download-statement";
import { formatCompactCurrency, formatCurrency, formatDate } from "@/lib/utils/format";
import {
  allocation, investments, portfolioHistory, portfolioSummary, statements,
} from "@/lib/data/customer";

const periods = [
  { value: "12m", label: "12 months" },
  { value: "6m", label: "6 months" },
  { value: "ytd", label: "Year to date" },
];

export function PortfolioView() {
  const [period, setPeriod] = useState("12m");
  const data = useMemo(() => {
    if (period === "6m") return portfolioHistory.slice(-6);
    if (period === "ytd") return portfolioHistory.filter((item) => !["Dec 25", "Jan 26"].includes(item.month));
    return portfolioHistory;
  }, [period]);

  const active = investments.filter((item) => item.status === "Active");
  const maturityGroups = [
    { label: "Q4 2026", items: active.filter((item) => item.maturityDate?.startsWith("2026-1")) },
    { label: "H1 2027", items: active.filter((item) => item.maturityDate?.startsWith("2027-0")) },
    { label: "2028", items: active.filter((item) => item.maturityDate?.startsWith("2028")) },
  ];

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Portfolio"
        title="Portfolio overview"
        description="A consolidated view of your allocations, performance and maturity calendar. All values are illustrative demonstration data."
        actions={
          <DownloadStatement
            title="Portfolio statement"
            filename="vee-portfolio-statement.pdf"
            label="Export portfolio"
            lines={[
              `Total portfolio value: ${formatCurrency(portfolioSummary.totalValue)}`,
              `Total invested: ${formatCurrency(portfolioSummary.totalInvested)}`,
              `Applicable earnings: ${formatCurrency(portfolioSummary.earnings)}`,
              ...allocation.map((item) => `${item.name}: ${item.value}% · ${formatCurrency(item.amount)}`),
            ]}
          />
        }
      />

      <div className="metric-strip" style={{ marginBottom: 16 }}>
        <div className="metric-strip-item"><span>Total value</span><strong>{formatCurrency(portfolioSummary.totalValue)}</strong><small>As at 12 Nov 2026</small></div>
        <div className="metric-strip-item"><span>Invested capital</span><strong>{formatCurrency(portfolioSummary.totalInvested)}</strong><small>Across {investments.length} applications</small></div>
        <div className="metric-strip-item"><span>Applicable earnings</span><strong>{formatCurrency(portfolioSummary.earnings)}</strong><small>Actual and accrued</small></div>
        <div className="metric-strip-item"><span>Available balance</span><strong>{formatCurrency(portfolioSummary.availableBalance)}</strong><small>Demonstration wallet</small></div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <section className="panel">
            <div className="panel-head">
              <div><h2>Portfolio performance</h2><p>Illustrative portfolio value against capital invested</p></div>
              <div className="tabs" style={{ borderBottom: 0 }} role="tablist" aria-label="Performance period">
                {periods.map((item) => (
                  <button type="button" role="tab" aria-selected={period === item.value} key={item.value} className={`tab${period === item.value ? " is-active" : ""}`} onClick={() => setPeriod(item.value)}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}>
              <PortfolioPerformanceChart data={data} height={310} />
            </div>
            <div className="panel-footer"><ChartLegend items={[{ label: "Portfolio value", color: "var(--brand-600)" }, { label: "Capital invested", color: "var(--gold)" }]} /><span>Demo data</span></div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Investment distribution</h2><p>Active and completed allocations</p></div><PieChart size={17} style={{ color: "var(--text-tertiary)" }} /></div>
            <div className="table-scroll">
              <table className="data-table">
                <thead><tr><th>Product</th><th>Principal</th><th>Current value</th><th>Status</th><th>Maturity</th><th /></tr></thead>
                <tbody>
                  {investments.map((investment) => (
                    <tr key={investment.id}>
                      <td><div className="table-primary-copy"><strong>{investment.product}</strong><span>{investment.category} · {investment.reference}</span></div></td>
                      <td className="table-amount">{formatCurrency(investment.principal)}</td>
                      <td className="table-amount">{formatCurrency(investment.currentValue)}</td>
                      <td><StatusBadge status={investment.status} /></td>
                      <td>{formatDate(investment.maturityDate)}</td>
                      <td><Link href={`/dashboard/investments/${investment.id}`} className="icon-button" aria-label="View investment"><ArrowUpRight size={15} /></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Maturity calendar</h2><p>Upcoming maturity dates by period</p></div><CalendarDays size={17} style={{ color: "var(--text-tertiary)" }} /></div>
            <div className="panel-body">
              {maturityGroups.map((group) => (
                <div key={group.label} style={{ marginBottom: 18 }}>
                  <p className="otp-label" style={{ marginBottom: 5 }}>{group.label}</p>
                  {group.items.length ? group.items.map((investment) => (
                    <div className="maturity-item" key={investment.id}>
                      <span className="maturity-date"><strong>{new Date(investment.maturityDate).getDate()}</strong><span>{new Date(investment.maturityDate).toLocaleString("en-GB", { month: "short" })}</span></span>
                      <span className="maturity-copy"><strong>{investment.product}</strong><span>{investment.reference}</span></span>
                      <span className="maturity-value">{formatCompactCurrency(investment.currentValue)}<small>Projected value</small></span>
                    </div>
                  )) : <p className="small muted">No maturities in this period.</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="dashboard-side-col">
          <section className="panel">
            <div className="panel-head"><div><h2>Allocation</h2><p>Current portfolio mix</p></div></div>
            <div className="panel-body">
              <AllocationDonut data={allocation} centerLabel="Total" centerValue={formatCompactCurrency(portfolioSummary.totalValue)} height={220} />
              <div className="allocation-list" style={{ marginTop: 8 }}>
                {allocation.map((item) => (
                  <div className="allocation-row" key={item.name}>
                    <i style={{ background: item.color }} />
                    <span className="allocation-name">{item.name}</span>
                    <span className="allocation-value">{item.value}%</span>
                    <div className="allocation-bar"><span style={{ width: `${item.value}%`, background: item.color }} /></div>
                    <span className="allocation-amount">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Statements</h2><p>Latest generated documents</p></div><Link href="/dashboard/statements" className="panel-link">All</Link></div>
            <div className="panel-body">
              <div className="detail-document-list">
                {statements.slice(0, 3).map((statement) => (
                  <div className="detail-document" key={statement.id}>
                    <span className="detail-document-icon"><Download size={14} /></span>
                    <div className="detail-document-copy"><strong>{statement.name}</strong><span>{statement.period} · {statement.size}</span></div>
                    <DownloadStatement title={statement.name} filename={`${statement.id}.pdf`} lines={[`Period: ${statement.period}`, `Generated: ${formatDate(statement.date)}`, "Demonstration statement"]} label="" className="icon-button" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Portfolio actions</h2></div></div>
            <div className="panel-body stack">
              <Link href="/dashboard/investments/new" className="btn btn-primary">Add to portfolio</Link>
              <Link href="/dashboard/statements" className="btn btn-outline">Download statements</Link>
              <Link href="/dashboard/support" className="btn btn-ghost">Ask about my portfolio</Link>
              <div className="info-note"><TrendingUp size={16} /><span>Past performance and illustrative projections are not reliable indicators of future results.</span></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
