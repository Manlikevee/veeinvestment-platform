"use client";

import { useMemo, useState } from "react";
import { Download, FilePlus2, FileText, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownloadStatement } from "@/components/ui/download-statement";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/providers/toast-provider";
import { formatDate } from "@/lib/utils/format";
import { statements as seedStatements } from "@/lib/data/customer";
import { cn } from "@/lib/utils/cn";

const types = ["All", "Portfolio", "Transactions", "Loan", "Investment", "Account activity"];

export function StatementsView() {
  const [statements, setStatements] = useState(seedStatements);
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "Portfolio", period: "October 2026" });
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return statements.filter((statement) => (type === "All" || statement.type === type) && (!q || statement.name.toLowerCase().includes(q) || statement.period.toLowerCase().includes(q)));
  }, [statements, type, query]);

  async function generate() {
    setGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const id = `STM-${new Date().toISOString().slice(0, 7)}-${Math.floor(100 + Math.random() * 900)}`;
    setStatements((current) => [{ id, name: `${form.type} statement — ${form.period}`, type: form.type, period: form.period, date: new Date().toISOString().slice(0, 10), size: "Generated", format: "PDF", status: "Ready" }, ...current]);
    setGenerating(false);
    setOpen(false);
    toast({ title: "Demonstration statement generated", message: "Added to this page only. No server file was created.", tone: "success" });
  }

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Documents"
        title="Statements"
        description="Portfolio, transaction, investment and loan statements. Downloads are illustrative PDF documents for this demonstration."
        actions={<button type="button" className="btn btn-primary" onClick={() => setOpen(true)}><FilePlus2 size={16} /> Generate statement</button>}
      />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Available statements" value={statements.length} detail="Ready to download" icon="file-text" tone="emerald" />
        <StatCard label="Portfolio reports" value={statements.filter((item) => item.type === "Portfolio").length} detail="Monthly summaries" icon="pie-chart" tone="forest" />
        <StatCard label="Transaction reports" value={statements.filter((item) => item.type === "Transactions").length} detail="Activity statements" icon="arrow-left-right" tone="sage" />
        <StatCard label="Latest" value={formatDate(statements[0]?.date)} detail={statements[0]?.name} icon="calendar" tone="sand" />
      </div>
      <div className="catalogue-toolbar">
        <div className="chip-row">{types.map((item) => <button type="button" key={item} className={cn("chip", type === item && "is-active")} onClick={() => setType(item)} aria-pressed={type === item}>{item}</button>)}</div>
        <label className="search-input" style={{ minWidth: 250 }}><Search size={16} /><span className="sr-only">Search statements</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search statements…" /></label>
      </div>
      <div className="panel">
        <div className="panel-body">
          {filtered.length ? (
            <div className="statement-list">
              {filtered.map((statement) => (
                <div className="statement-row" key={statement.id}>
                  <span className="statement-icon"><FileText size={16} /></span>
                  <div className="statement-copy"><strong>{statement.name}</strong><span>{statement.period} · {statement.id}</span></div>
                  <span className="statement-meta">{formatDate(statement.date)}</span>
                  <span className="statement-format">{statement.format} · {statement.size}</span>
                  <div className="flex" style={{ gap: 5, justifyContent: "flex-end" }}>
                    <StatusBadge status={statement.status} />
                    <DownloadStatement title={statement.name} filename={`${statement.id}.pdf`} label="" className="icon-button" lines={[`Statement: ${statement.name}`, `Period: ${statement.period}`, `Generated: ${formatDate(statement.date)}`]} />
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyState icon="file-text" title="No statements match" description="Try another type or search term." />}
        </div>
      </div>
      <div className="info-note" style={{ marginTop: 14 }}><Download size={16} /><span>Generated PDFs are demonstration documents and must not be relied on for tax, legal or financial reporting.</span></div>

      <Modal open={open} onClose={() => setOpen(false)} title="Generate a statement" description="Choose a statement type and period. This demonstration generates a local PDF placeholder." footer={<><button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button type="button" className="btn btn-primary" onClick={generate} disabled={generating}>{generating ? <span className="button-spinner" /> : <FilePlus2 size={16} />}{generating ? "Generating…" : "Generate statement"}</button></>}>
        <div className="form-grid two">
          <Select label="Statement type" name="statementType" value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} options={["Portfolio", "Transactions", "Loan", "Investment", "Account activity"]} />
          <Input label="Period" name="period" value={form.period} onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))} placeholder="e.g. October 2026" />
        </div>
        <div className="info-note" style={{ marginTop: 14 }}><FileText size={16} /><span>A production statement must be generated server-side and retained with an audit record.</span></div>
      </Modal>
    </div>
  );
}
