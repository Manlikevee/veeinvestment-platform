"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Download, ReceiptText, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { DownloadStatement } from "@/components/ui/download-statement";
import { Modal } from "@/components/ui/modal";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { transactions } from "@/lib/data/customer";

export function TransactionsView() {
  const [selected, setSelected] = useState(null);
  const totalIn = transactions.filter((item) => item.amount > 0 && item.status === "Completed").reduce((sum, item) => sum + item.amount, 0);
  const totalOut = transactions.filter((item) => item.amount < 0 && item.status === "Completed").reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const columns = [
    {
      key: "description", header: "Transaction", sortable: true,
      render: (row) => (
        <div className="table-primary">
          <span className={`txn-icon ${row.amount > 0 ? "positive" : "negative"}`} style={{ width: 30, height: 30 }}>
            {row.amount > 0 ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
          </span>
          <div className="table-primary-copy"><strong>{row.description}</strong><span>{row.reference} · {row.type}</span></div>
        </div>
      ),
    },
    { key: "date", header: "Date", sortable: true, render: (row) => formatDate(row.date), hideOnMobile: true },
    { key: "method", header: "Method", render: (row) => row.method, hideOnMobile: true },
    { key: "amount", header: "Amount", sortable: true, align: "right", render: (row) => <span className={`table-amount ${row.amount > 0 ? "positive" : ""}`}>{formatCurrency(row.amount, { signed: true })}</span> },
    { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "receipt", header: "", align: "right", exportable: false,
      render: (row) => (
        <button type="button" className="icon-button" onClick={() => setSelected(row)} aria-label={`View receipt for ${row.reference}`} disabled={!row.receiptAvailable}>
          <ReceiptText size={15} />
        </button>
      ),
    },
  ];

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Activity"
        title="Transactions"
        description="Deposits, withdrawals, investment payments, returns, loan repayments and fees. All records are illustrative."
        actions={
          <DownloadStatement
            title="Transaction statement"
            filename="vee-transactions.pdf"
            label="Download statement"
            lines={transactions.slice(0, 10).map((item) => `${formatDate(item.date)} · ${item.description} · ${formatCurrency(item.amount, { signed: true })} · ${item.status}`)}
          />
        }
      />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Money in" value={formatCurrency(totalIn)} detail="Completed credits shown" icon="arrow-down-right" tone="emerald" />
        <StatCard label="Money out" value={formatCurrency(totalOut)} detail="Completed debits shown" icon="arrow-up-right" tone="sand" />
        <StatCard label="Pending" value={transactions.filter((item) => ["Pending", "Under review"].includes(item.status)).length} detail="Requires reconciliation" icon="hourglass" tone="amber" />
        <StatCard label="Wallet balance" value={formatCurrency(842350)} detail="Demonstration balance" icon="wallet" tone="forest" />
      </div>
      <DataTable
        columns={columns}
        rows={transactions}
        searchPlaceholder="Search description, reference or type…"
        searchKeys={["description", "reference", "type", "method", "status"]}
        filters={[
          { key: "status", label: "Status", options: ["Completed", "Pending", "Failed", "Under review"] },
          { key: "type", label: "Type", options: ["Deposit", "Withdrawal", "Investment", "Return", "Loan repayment", "Fee", "Maturity"] },
        ]}
        exportName="vee-transactions"
        initialSort={{ key: "date", direction: "desc" }}
        footerNote="Demonstration activity"
      />

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? `Receipt · ${selected.reference}` : "Receipt"}
        description="Demonstration receipt. This is not proof of a live payment."
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
            {selected ? <DownloadStatement title={`Receipt ${selected.reference}`} filename={`${selected.reference}-receipt.pdf`} label="Download PDF" lines={[`Reference: ${selected.reference}`, `Description: ${selected.description}`, `Amount: ${formatCurrency(selected.amount, { signed: true })}`, `Date: ${formatDate(selected.date)}`, `Status: ${selected.status}`, `Method: ${selected.method}`]} /> : null}
          </>
        }
      >
        {selected ? (
          <div className="stack">
            <div className="detail-banner" style={{ padding: 16 }}>
              <div><p className="detail-banner-label">Amount</p><p className="detail-banner-value">{formatCurrency(selected.amount, { signed: true })}</p></div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="info-grid">
              <div className="info-row"><span>Reference</span><strong className="mono">{selected.reference}</strong></div>
              <div className="info-row"><span>Date</span><strong>{formatDate(selected.date)}</strong></div>
              <div className="info-row"><span>Type</span><strong>{selected.type}</strong></div>
              <div className="info-row"><span>Method</span><strong>{selected.method}</strong></div>
              <div className="info-row full"><span>Description</span><strong>{selected.description}</strong></div>
              {selected.failureReason ? <div className="info-row full"><span>Failure reason</span><strong>{selected.failureReason}</strong></div> : null}
            </div>
            <div className="info-note"><Wallet size={16} /><span>No live payment or balance change is represented by this receipt.</span></div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
