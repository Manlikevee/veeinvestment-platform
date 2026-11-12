"use client";

import { useState } from "react";
import { BarChart3, Download, FileText, Filter, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { GrowthLineChart, InvestmentActivityChart, RevenueChart, ChartLegend } from "@/components/charts/chart-primitives";
import { Input, Select } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { reportCards, customerGrowth, investmentActivity, revenueTrend } from "@/lib/data/admin";
import { downloadCsv, downloadMockPdf } from "@/lib/utils/download";

export function ReportsView() {
  const [from, setFrom] = useState("2026-06-01");
  const [to, setTo] = useState("2026-11-12");
  const [type, setType] = useState("All reports");
  const { toast } = useToast();
  const filtered = type === "All reports" ? reportCards : reportCards.filter((item) => item.title.toLowerCase().includes(type.toLowerCase().replace(" report", "")));

  function exportReport(report, format) {
    if (format === "CSV") {
      downloadCsv(`${report.title.toLowerCase().replaceAll(" ", "-")}.csv`, ["Metric", "Value"], [["Report", report.title], ["Period", `${from} to ${to}`], ["Updated", report.updated]]);
      toast({ title: "CSV exported", message: `${report.title} demonstration export downloaded.`, tone: "success" });
    } else {
      downloadMockPdf({ filename: `${report.title.toLowerCase().replaceAll(" ", "-")}.pdf`, title: report.title, lines: [`Reporting period: ${from} to ${to}`, `Updated: ${report.updated}`, "Demonstration report — not for regulatory or financial reporting."] });
      toast({ title: "PDF exported", message: `${report.title} demonstration PDF downloaded.`, tone: "success" });
    }
  }

  return (
    <div className="app-page">
      <PageHeader eyebrow="Analytics" title="Reports" description="Generate operational, financial and compliance reports. Exports are demonstration files and must be replaced with server-side reporting before launch." actions={<button type="button" className="btn btn-primary" onClick={() => toast({ title: "Report schedule interface", message: "Scheduled reporting requires a backend job. No schedule was created.", tone: "info" })}><Filter size={16} /> Schedule report</button>} />
      <div className="panel" style={{ marginBottom: 16 }}><div className="panel-body"><div className="form-grid three"><Input label="From" name="from" type="date" value={from} onChange={(event) => setFrom(event.target.value)} /><Input label="To" name="to" type="date" value={to} onChange={(event) => setTo(event.target.value)} /><Select label="Report type" name="reportType" value={type} onChange={(event) => setType(event.target.value)} options={["All reports", "Customer report", "Investment report", "Transaction report", "Loan report"]} /></div><div className="info-note" style={{ marginTop: 12 }}><Filter size={15} /><span>Date filters are demonstration controls. Exports use the selected period metadata.</span></div></div></div>
      <div className="stat-grid" style={{ marginBottom: 16 }}><StatCard label="Report packs" value={reportCards.length} detail="Available interfaces" icon="bar-chart" tone="emerald" /><StatCard label="Customers" value="1,248" detail="Sample platform total" icon="users" tone="forest" /><StatCard label="AUM" value="₦18.4bn" detail="Illustrative" icon="landmark" tone="sage" /><StatCard label="Reporting period" value="6 months" detail={`${from} to ${to}`} icon="calendar" tone="sand" /></div>
      <div className="dashboard-grid">
        <div className="dashboard-main-col"><section className="panel"><div className="panel-head"><div><h2>Operational trends</h2><p>Applications and approvals</p></div></div><div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}><InvestmentActivityChart data={investmentActivity} height={270} /></div><div className="panel-footer"><ChartLegend items={[{ label: "Applications", color: "var(--brand-100)" }, { label: "Approved", color: "var(--brand-600)" }]} /></div></section><section className="panel"><div className="panel-head"><div><h2>Revenue</h2><p>Illustrative monthly revenue and cost</p></div></div><div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}><RevenueChart data={revenueTrend} height={240} /></div></section><section className="panel"><div className="panel-head"><div><h2>Customer growth</h2></div></div><div className="panel-body" style={{ paddingLeft: 8, paddingRight: 8 }}><GrowthLineChart data={customerGrowth} height={240} /></div></section></div>
        <div className="dashboard-side-col">
          <section className="panel"><div className="panel-head"><div><h2>Download a report</h2><p>CSV and PDF interfaces</p></div><FileText size={17} style={{ color: "var(--text-tertiary)" }} /></div><div className="panel-body stack">{filtered.map((report) => <div key={report.title} className="detail-document" style={{ alignItems: "flex-start" }}><span className="detail-document-icon"><FileText size={14} /></span><div className="detail-document-copy"><strong>{report.title}</strong><span>{report.description}</span><div style={{ display: "flex", gap: 5, marginTop: 7 }}><button type="button" className="btn btn-outline btn-sm" onClick={() => exportReport(report, "CSV")}><Download size={12} /> CSV</button><button type="button" className="btn btn-outline btn-sm" onClick={() => exportReport(report, "PDF")}><Download size={12} /> PDF</button></div></div></div>)}</div></section>
          <section className="panel"><div className="panel-head"><div><h2>Report catalogue</h2></div></div><div className="panel-body"><div className="wizard-summary-list">{reportCards.map((report) => <div className="wizard-summary-row" key={report.title}><span>{report.title}</span><strong>{report.formats.join(" / ")}</strong></div>)}</div></div></section>
        </div>
      </div>
      <div className="info-note is-warning" style={{ marginTop: 16 }}><BarChart3 size={15} /><span>Report figures are demonstration data. Regulatory, revenue and tax reporting must be generated server-side from immutable records.</span></div>
    </div>
  );
}
