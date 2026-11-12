"use client";

import { useState } from "react";
import { CheckCircle2, Download, RefreshCw, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { payments as seedPayments } from "@/lib/data/admin";

export function PaymentsManager() {
  const [payments, setPayments] = useState(seedPayments);
  const [action, setAction] = useState(null);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  function run() {
    if (!action) return;
    if (note.trim().length < 6) { toast({ title: "Add a note", message: "A reason is required for the payment record.", tone: "warning" }); return; }
    if (action.type === "verify") {
      setPayments((current) => current.map((item) => item.id === action.payment.id ? { ...item, status: "Settled", reconciled: true } : item));
    }
    toast({ title: "Payment action staged", message: "No payment was verified, refunded or settled. A live action requires gateway evidence and server-side controls.", tone: "info" });
    setAction(null); setNote("");
  }

  const columns = [
    { key: "reference", header: "Reference", sortable: true, render: (row) => <div className="table-primary-copy"><strong className="mono">{row.reference}</strong><span>{row.customer}</span></div> },
    { key: "purpose", header: "Purpose", sortable: true, render: (row) => row.purpose },
    { key: "amount", header: "Amount", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.amount)}</span> },
    { key: "date", header: "Date", sortable: true, render: (row) => formatDate(row.date), hideOnMobile: true },
    { key: "gateway", header: "Gateway", render: (row) => row.gateway, hideOnMobile: true },
    { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    { key: "reconciled", header: "Reconciled", render: (row) => row.reconciled ? "Yes" : <span className="badge badge-sand">No</span>, hideOnMobile: true },
    { key: "action", header: "", exportable: false, align: "right", render: (row) => <button type="button" className="btn btn-outline btn-sm" onClick={() => setAction({ type: "verify", payment: row })}>{row.status === "Pending verification" ? "Verify" : "Review"}</button> },
  ];

  return (
    <div className="app-page">
      <PageHeader eyebrow="Finance" title="Payment management" description="Review payment records, references, verification states and reconciliation exceptions. Prepared for gateway integration." actions={<button type="button" className="btn btn-outline" onClick={() => toast({ title: "Reconciliation report staged", message: "Demo only. No file or gateway record was created.", tone: "info" })}><Download size={16} /> Reconciliation report</button>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Pending verification" value={payments.filter((p) => p.status === "Pending verification").length} detail="Finance review" icon="hourglass" tone="sand" />
        <StatCard label="Settled" value={payments.filter((p) => p.status === "Settled").length} detail="Matched records" icon="check-circle" tone="emerald" />
        <StatCard label="Failed" value={payments.filter((p) => p.status === "Failed").length} detail="No funds moved" icon="x-circle" tone="clay" />
        <StatCard label="Held" value={payments.filter((p) => p.status === "Held").length} detail="Requires exception review" icon="shield" tone="amber" />
      </div>
      <div className="notice-bar" style={{ marginBottom: 14 }}><span><ShieldAlert size={14} /> No card, bank or gateway credentials are stored in the frontend. Payment verification must be server-authoritative.</span></div>
      <DataTable columns={columns} rows={payments} searchPlaceholder="Search reference, customer or gateway…" searchKeys={["reference", "customer", "purpose", "gateway", "status"]} filters={[{ key: "status", label: "Status", options: ["Settled", "Pending verification", "Held", "Failed"] }]} exportName="vee-payments" initialSort={{ key: "date", direction: "desc" }} footerNote="Demonstration payment records" />
      <div className="info-note is-warning" style={{ marginTop: 14 }}><RefreshCw size={15} /><span>A successful payment record must be supported by gateway evidence and reconciliation. The frontend cannot mark a payment as settled by itself.</span></div>
      <Modal open={Boolean(action)} onClose={() => setAction(null)} title="Review payment record" description={action ? `${action.payment.reference} · ${action.payment.customer}` : ""} footer={<><button type="button" className="btn btn-ghost" onClick={() => setAction(null)}>Cancel</button><button type="button" className="btn btn-primary" onClick={run}><CheckCircle2 size={15} /> Record demo action</button></>}>
        {action ? <div className="stack"><div className="info-grid"><div className="info-row"><span>Amount</span><strong>{formatCurrency(action.payment.amount)}</strong></div><div className="info-row"><span>Gateway reference</span><strong className="mono">{action.payment.gatewayRef}</strong></div><div className="info-row"><span>Purpose</span><strong>{action.payment.purpose}</strong></div><div className="info-row"><span>Status</span><strong><StatusBadge status={action.payment.status} /></strong></div></div><Textarea label="Reconciliation / exception note *" name="paymentNote" value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Describe the evidence checked and the outcome." /></div> : null}
      </Modal>
    </div>
  );
}
