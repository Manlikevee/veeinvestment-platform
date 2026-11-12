import Link from "next/link";
import {
  AlertCircle, ArrowRight, ArrowUpRight, CalendarClock, ChartNoAxesCombined,
  CheckCircle2, FileCheck2, Plus, ShieldCheck, TrendingUp, Wallet,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownloadStatement } from "@/components/ui/download-statement";
import { PortfolioPerformanceChart, AllocationDonut, ChartLegend } from "@/components/charts/chart-primitives";
import { Icon } from "@/components/ui/icon";
import { formatCompactCurrency, formatCurrency, formatDate, formatPercent } from "@/lib/utils/format";
import {
  allocation, customer, investments, notifications, portfolioHistory, portfolioSummary,
  transactions,
} from "@/lib/data/customer";

export const metadata = { title: "Overview" };

export default function DashboardPage() {
  const active = investments.filter((item) => item.status === "Active");
  const pending = investments.find((item) => item.status === "Pending review");
  const recentTransactions = transactions.slice(0, 5);
  const maturities = investments
    .filter((item) => item.status === "Active" && item.maturityDate)
    .sort((a, b) => new Date(a.maturityDate) - new Date(b.maturityDate));
  const unread = notifications.filter((item) => !item.read);
  const tasks = [
    pending ? { icon: "hourglass", title: "Application in review", meta: `${pending.product} · ${formatCurrency(pending.principal)}`, href: `/dashboard/investments/${pending.id}`, tone: "warning", badge: "Pending" } : null,
    { icon: "files", title: "Source-of-funds document needs attention", meta: "Replacement requested · 3 Nov 2026", href: "/dashboard/documents", tone: "danger", badge: "Action" },
    { icon: "calendar", title: "Upcoming loan repayment", meta: `${formatCurrency(412500)} due 28 Nov 2026`, href: "/dashboard/loans/LN-8841", tone: "info", badge: "Due" },
  ].filter(Boolean);

  return (
    <div className="app-page">
      <section className="dashboard-welcome">
        <div className="dashboard-welcome-copy">
          <p className="eyebrow">Wednesday, 12 November 2026</p>
          <h1>Good morning, <em>{customer.firstName}.</em></h1>
          <p>
            Your portfolio is visible and up to date. You have {unread.length} unread notifications
            and {tasks.length} items that may need your attention.
          </p>
        </div>
        <div className="dashboard-welcome-actions">
          <Link href="/dashboard/investments/new" className="btn btn-primary"><Plus size={16} /> New investment</Link>
          <Link href="/dashboard/portfolio" className="btn btn-outline">View portfolio</Link>
        </div>
      </section>

      <div className="balance-grid">
        <article className="balance-card primary">
          <div className="balance-card-top">
            <span className="balance-card-label">Total portfolio value</span>
            <span className="balance-card-icon"><ChartNoAxesCombined size={16} /></span>
          </div>
          <p className="balance-card-value">{formatCurrency(portfolioSummary.totalValue)}</p>
          <div className="balance-card-meta"><span className="positive">+{formatPercent(portfolioSummary.monthChange)}</span><span>this month</span><span className="badge badge-neutral">Illustrative</span></div>
        </article>
        <article className="balance-card">
          <div className="balance-card-top">
            <span className="balance-card-label">Total invested</span>
            <span className="balance-card-icon"><Wallet size={16} /></span>
          </div>
          <p className="balance-card-value">{formatCurrency(portfolioSummary.totalInvested)}</p>
          <div className="balance-card-meta"><span>Across {investments.length} applications</span></div>
        </article>
        <article className="balance-card">
          <div className="balance-card-top">
            <span className="balance-card-label">Applicable earnings</span>
            <span className="balance-card-icon"><TrendingUp size={16} /></span>
          </div>
          <p className="balance-card-value">{formatCurrency(portfolioSummary.earnings)}</p>
          <div className="balance-card-meta"><span>Actual and accrued demonstration data</span></div>
        </article>
      </div>

      <div className="balance-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 18 }}>
        <article className="balance-card" style={{ minHeight: 110 }}>
          <span className="balance-card-label">Active investments</span>
          <p className="balance-card-value" style={{ fontSize: "1.6rem" }}>{portfolioSummary.activeInvestments}</p>
          <p className="balance-card-meta">Fully funded</p>
        </article>
        <article className="balance-card" style={{ minHeight: 110 }}>
          <span className="balance-card-label">Pending</span>
          <p className="balance-card-value" style={{ fontSize: "1.6rem" }}>{portfolioSummary.pendingInvestments}</p>
          <p className="balance-card-meta">Awaiting review</p>
        </article>
        <article className="balance-card" style={{ minHeight: 110 }}>
          <span className="balance-card-label">Available balance</span>
          <p className="balance-card-value" style={{ fontSize: "1.6rem" }}>{formatCurrency(portfolioSummary.availableBalance)}</p>
          <p className="balance-card-meta">Wallet demonstration balance</p>
        </article>
        <article className="balance-card" style={{ minHeight: 110 }}>
          <span className="balance-card-label">Next maturity</span>
          <p className="balance-card-value" style={{ fontSize: "1.35rem" }}>{portfolioSummary.nextMaturityLabel}</p>
          <p className="balance-card-meta">Money Market Plus</p>
        </article>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <section className="panel">
            <div className="panel-head">
              <div><h2>Portfolio performance</h2><p>Illustrative value against capital invested · 12 months</p></div>
              <div className="panel-head-action"><span className="badge badge-neutral">Demo data</span></div>
            </div>
            <div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}>
              <PortfolioPerformanceChart data={portfolioHistory} height={280} />
            </div>
            <div className="panel-footer">
              <ChartLegend items={[{ label: "Portfolio value", color: "var(--brand-600)" }, { label: "Capital invested", color: "var(--gold)" }]} />
              <Link href="/dashboard/portfolio" className="panel-link">Full portfolio <ArrowRight size={13} /></Link>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div><h2>Recent transactions</h2><p>Latest account activity</p></div>
              <Link href="/dashboard/transactions" className="panel-link">View all</Link>
            </div>
            <div className="panel-body">
              <div className="txn-list">
                {recentTransactions.map((transaction) => (
                  <div className="txn-item" key={transaction.id}>
                    <span className={`txn-icon ${transaction.amount > 0 ? "positive" : "negative"}`}>
                      <Icon name={transaction.amount > 0 ? "arrow-down-right" : "arrow-up-right"} size={16} />
                    </span>
                    <div className="txn-copy">
                      <strong>{transaction.description}</strong>
                      <span>{formatDate(transaction.date)} · {transaction.reference}</span>
                    </div>
                    <div className="txn-amount">
                      <strong className={transaction.amount > 0 ? "positive" : ""}>{formatCurrency(transaction.amount, { signed: true })}</strong>
                      <StatusBadge status={transaction.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel-footer">
              <span>Statements available for completed activity</span>
              <DownloadStatement title="Account activity summary" filename="vee-activity-summary.pdf" lines={recentTransactions.map((t) => `${formatDate(t.date)}  ${t.description}  ${formatCurrency(t.amount, { signed: true })}  ${t.status}`)} label="Download summary" />
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div><h2>My investments</h2><p>Active and pending allocations</p></div>
              <Link href="/dashboard/investments" className="panel-link">Manage investments</Link>
            </div>
            <div className="table-scroll">
              <table className="data-table">
                <thead><tr><th>Product</th><th>Principal</th><th>Status</th><th>Maturity</th><th /></tr></thead>
                <tbody>
                  {investments.slice(0, 4).map((investment) => (
                    <tr key={investment.id}>
                      <td><div className="table-primary-copy"><strong>{investment.product}</strong><span>{investment.reference}</span></div></td>
                      <td className="table-amount">{formatCurrency(investment.principal)}</td>
                      <td><StatusBadge status={investment.status} /></td>
                      <td>{formatDate(investment.maturityDate)}</td>
                      <td><Link href={`/dashboard/investments/${investment.id}`} className="icon-button" aria-label={`View ${investment.product}`}><ArrowUpRight size={15} /></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="dashboard-side-col">
          <section className="panel">
            <div className="panel-head"><div><h2>Allocation</h2><p>By asset category</p></div></div>
            <div className="panel-body" style={{ paddingTop: 0 }}>
              <AllocationDonut data={allocation} centerLabel="Portfolio" centerValue={formatCompactCurrency(portfolioSummary.totalValue)} height={205} />
              <div className="allocation-list" style={{ marginTop: 8 }}>
                {allocation.map((item) => (
                  <div className="allocation-row" key={item.name}>
                    <i style={{ background: item.color }} />
                    <span className="allocation-name">{item.name}</span>
                    <span className="allocation-value">{item.value}%</span>
                    <div className="allocation-bar"><span style={{ width: `${item.value}%`, background: item.color }} /></div>
                    <span className="allocation-amount">{formatCompactCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Needs attention</h2><p>{tasks.length} open items</p></div><AlertCircle size={17} style={{ color: "var(--warning)" }} /></div>
            <div className="panel-body">
              <div className="task-list">
                {tasks.map((task) => (
                  <Link className="task-item" href={task.href} key={task.title}>
                    <span className="task-icon"><Icon name={task.icon} size={15} /></span>
                    <span className="task-copy"><strong>{task.title}</strong><span>{task.meta}</span></span>
                    <span className={`badge badge-${task.tone === "danger" ? "clay" : task.tone === "warning" ? "sand" : "sage"}`}>{task.badge}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Upcoming maturities</h2><p>Next 12 months</p></div><CalendarClock size={17} style={{ color: "var(--text-tertiary)" }} /></div>
            <div className="panel-body">
              <div className="maturity-list">
                {maturities.map((investment) => {
                  const date = new Date(investment.maturityDate);
                  return (
                    <Link href={`/dashboard/investments/${investment.id}`} className="maturity-item" key={investment.id}>
                      <span className="maturity-date"><strong>{date.getDate()}</strong><span>{date.toLocaleString("en-GB", { month: "short" })}</span></span>
                      <span className="maturity-copy"><strong>{investment.product}</strong><span>{formatCurrency(investment.currentValue)} projected</span></span>
                      <span className="maturity-value">{formatCompactCurrency(investment.principal)}<small>Principal</small></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head"><div><h2>Verification</h2><p>Account and document status</p></div><ShieldCheck size={17} style={{ color: "var(--success)" }} /></div>
            <div className="panel-body">
              <div className="verification-status-list">
                <div className="verification-status-row"><span><CheckCircle2 size={14} /></span><div><strong>Identity</strong><small>Reviewed 12 Mar 2024</small></div><StatusBadge status="Verified" /></div>
                <div className="verification-status-row"><span><CheckCircle2 size={14} /></span><div><strong>Address</strong><small>Reviewed 22 Oct 2026</small></div><StatusBadge status="Verified" /></div>
                <div className="verification-status-row"><span className="warning"><FileCheck2 size={14} /></span><div><strong>Source of funds</strong><small>Replacement requested</small></div><StatusBadge status="Action required" /></div>
              </div>
              <Link href="/dashboard/documents" className="text-link" style={{ marginTop: 13 }}>Review documents <ArrowRight size={14} /></Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
