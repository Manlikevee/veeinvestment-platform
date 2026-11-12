"use client";

import { useState } from "react";
import { Eye, LockKeyhole, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { Modal } from "@/components/ui/modal";
import { formatDateTime } from "@/lib/utils/format";
import { auditLogs } from "@/lib/data/admin";

export function AuditView() {
  const [selected, setSelected] = useState(null);
  const columns = [
    { key: "time", header: "Timestamp", sortable: true, render: (row) => <div className="table-primary-copy"><strong>{formatDateTime(row.time)}</strong><span>{row.id}</span></div> },
    { key: "actor", header: "Actor", sortable: true, render: (row) => <div className="table-primary-copy"><strong>{row.actor}</strong><span>{row.role}</span></div> },
    { key: "action", header: "Action", sortable: true, render: (row) => row.action },
    { key: "record", header: "Affected record", render: (row) => <span className="mono small">{row.record}</span>, hideOnMobile: true },
    { key: "ip", header: "IP address", render: (row) => <span className="mono small">{row.ip}</span>, hideOnMobile: true },
    { key: "severity", header: "Severity", render: (row) => <span className={`badge badge-${row.severity === "critical" ? "clay" : row.severity === "high" ? "sand" : row.severity === "medium" ? "sage" : "neutral"}`}>{row.severity}</span> },
    { key: "actionBtn", header: "", exportable: false, align: "right", render: (row) => <button type="button" className="icon-button" onClick={() => setSelected(row)} aria-label="View audit detail"><Eye size={15} /></button> },
  ];
  return (
    <div className="app-page">
      <PageHeader eyebrow="Governance" title="Audit logs" description="An append-only record of staff activity, customer changes, document decisions, investment decisions, product changes and system events." actions={<span className="badge badge-neutral"><LockKeyhole size={12} /> Read-only</span>} />
      <div className="notice-bar" style={{ marginBottom: 16 }}><span><ShieldCheck size={14} /> Audit logs are immutable through the ordinary administration interface. Corrections require a separate controlled process.</span></div>
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Events (sample)" value={auditLogs.length} detail="Recent period" icon="scroll-text" tone="emerald" />
        <StatCard label="Critical events" value={auditLogs.filter((l) => l.severity === "critical").length} detail="Requires periodic review" icon="warning" tone="clay" />
        <StatCard label="Staff actors" value={new Set(auditLogs.map((l) => l.actor)).size} detail="Distinct in sample" icon="users" tone="forest" />
        <StatCard label="System events" value={auditLogs.filter((l) => l.actor === "System").length} detail="Automated jobs" icon="activity" tone="sage" />
      </div>
      <DataTable columns={columns} rows={auditLogs} searchPlaceholder="Search actor, action, record or IP…" searchKeys={["actor", "action", "record", "ip", "severity"]} filters={[{ key: "severity", label: "Severity", options: ["critical", "high", "medium", "info"] }]} exportName="vee-audit-logs" initialSort={{ key: "time", direction: "desc" }} footerNote="Append-only demonstration log" />
      <div className="info-note" style={{ marginTop: 14 }}><LockKeyhole size={15} /><span>Frontend audit views must never provide edit or delete controls. Export access should itself be audited.</span></div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.action} description={selected ? `${selected.id} · ${formatDateTime(selected.time)}` : ""} footer={<button type="button" className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>}>
        {selected ? <div className="stack"><div className="info-grid"><div className="info-row"><span>Actor</span><strong>{selected.actor}</strong></div><div className="info-row"><span>Role</span><strong>{selected.role}</strong></div><div className="info-row"><span>Record</span><strong className="mono">{selected.record}</strong></div><div className="info-row"><span>IP address</span><strong className="mono">{selected.ip}</strong></div><div className="info-row full"><span>Before</span><strong>{selected.before || "—"}</strong></div><div className="info-row full"><span>After</span><strong>{selected.after || "—"}</strong></div></div><div className="info-note"><LockKeyhole size={15} /><span>This audit record is read-only. It cannot be edited or deleted through the administration interface.</span></div></div> : null}
      </Modal>
    </div>
  );
}
