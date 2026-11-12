"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Download, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { adminTransactions as seedTransactions } from "@/lib/data/admin";

export function TransactionsManager() {
  const [transactions, setTransactions] = useState(seedTransactions);
  const [selected, setSelected] = useState([]);
  const { toast } = useToast();

  function reconcile() {
    if (!selected.length) return;
    setTransactions((current) => current.map((item) => selected.includes(item.id) ? { ...item, status: "Completed", reconciled: true } : item));
    toast({ title: `${selected.length} transaction${selected.length > 1 ? "s" : ""} reconciled in this demonstration`, message: "No balances were changed. A live system would record a reconciliation reference and actor.", tone: "info" });
    setSelected([]);
  }

  const columns = [
    { key: "reference", header: "Reference", sortable: true, render: (row) => <div className="table-primary-copy"><strong className="mono">{row.reference}</strong><span>{row.customer}</span></div> },
    { key: "type", header: "Type", sortable: true, render: (row) => row.type },
    { key: "amount", header: "Amount", sortable: true, align: "right", render: (row) => <span className="table-amount">{formatCurrency(row.amount)}</span> },
    { key: "date", header: "Date", sortable: true, render: (row) => formatDate(row.date), hideOnMobile: true },
    { key: "method", header: "Method", render: (row) => row.method, hideOnMobile: true },
    { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    { key: "reconciled", header: "Reconciliation", render: (row) => row.reconciled ? <span className="badge badge-emerald">Reconciled</span> : <span className="badge badge-sand">Exception</span>, hideOnMobile: true },
    { key: "paymentRef", header: "Payment ref", render: (row) => <span className="mono small">{row.paymentRef}</span>, hideOnMobile: true },
  ];

  return (
    <div className="app-page">
      <PageHeader eyebrow="Finance" title="Transactions" description="Review deposits, withdrawals, investment payments, returns, loan repayments and fees. Reconciliation is a controlled workflow." actions={<button type="button" className="btn btn-primary" onClick={reconcile} disabled={!selected.length}><RefreshCw size={16} /> Reconcile selected {selected.length ? `(${selected.length})` : ""}</button>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Awaiting reconciliation" value={transactions.filter((t) => !t.reconciled).length} detail="Exception queue" icon="refresh" tone="sand" />
        <StatCard label="Settled today" value={formatCurrency(transactions.filter((t) => t.status === "Completed").reduce((s, t) => s + t.amount, 0))} detail="Demonstration value" icon="wallet" tone="emerald" />
        <StatCard label="Failed / reversed" value={transactions.filter((t) => ["Failed", "Reversed"].includes(t.status)).length} detail="Requires investigation" icon="x-circle" tone="clay" />
        <StatCard label="Total records" value={transactions.length} detail="In this sample view" icon="arrow-left-right" tone="forest" />
      </div>
      <div className="notice-bar" style={{ marginBottom: 14 }}><span><CheckCircle2 size={14} /> Select pending transactions to reconcile. This does not edit balances or move money.</span><Link href="/admin/payments" className="text-link">Payment management <ArrowUpRight size={13} /></Link></div>
      <DataTable columns={columns} rows={transactions} searchPlaceholder="Search reference, customer or type…" searchKeys={["reference", "customer", "type", "status", "paymentRef", "method"]} filters={[{ key: "status", label: "Status", options: ["Completed", "Pending", "Failed", "Awaiting verification", "Under review", "Reversed"] }, { key: "type", label: "Type", options: ["Deposit", "Withdrawal", "Investment payment", "Return", "Loan repayment", "Fee", "Maturity"] }]} exportName="vee-transactions-admin" initialSort={{ key: "date", direction: "desc" }} selectable selectedIds={selected} onSelectionChange={setSelected} footerNote="No arbitrary balance manipulation" />
      <div className="info-note is-warning" style={{ marginTop: 14 }}><RefreshCw size={15} /><span>Reconciliation must not be used to falsify a payment. Exceptions require an investigation note, supporting evidence and audit history.</span></div>
    </div>
  );
}
