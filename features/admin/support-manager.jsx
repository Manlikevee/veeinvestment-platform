"use client";

import { useState } from "react";
import { MessageCircle, Send, Tag, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { formatDateTime } from "@/lib/utils/format";
import { tickets as customerTickets } from "@/lib/data/customer";

const initial = customerTickets.map((ticket) => ({ ...ticket, customer: "Bayo Adeyemi", customerId: "CUS-1042", assigned: ticket.assignee }));

export function AdminSupportManager() {
  const [tickets, setTickets] = useState(initial);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [internal, setInternal] = useState(false);
  const { toast } = useToast();

  function send() {
    if (!reply.trim()) return;
    setTickets((current) => current.map((ticket) => ticket.id === selected.id ? { ...ticket, updatedAt: new Date().toISOString(), messages: [...ticket.messages, { from: internal ? "Internal note" : "Support team", date: new Date().toISOString(), body: reply.trim() }] } : ticket));
    setReply("");
    toast({ title: internal ? "Internal note added" : "Reply staged", message: "No message was delivered. A live system would send notifications and record the event.", tone: "info" });
  }

  function assign() {
    setTickets((current) => current.map((ticket) => ticket.id === selected.id ? { ...ticket, assigned: "Ngozi Eze", assignee: "Ngozi Eze" } : ticket));
    toast({ title: "Assigned to you in this demonstration", message: "No backend assignment was made.", tone: "info" });
  }

  const columns = [
    { key: "subject", header: "Ticket", sortable: true, render: (row) => <div className="table-primary-copy"><button type="button" className="table-link" onClick={() => setSelected(row)}>{row.subject}</button><span>{row.reference} · {row.customer}</span></div> },
    { key: "category", header: "Category", sortable: true, render: (row) => row.category },
    { key: "priority", header: "Priority", render: (row) => <span className={`badge badge-${row.priority === "High" ? "clay" : row.priority === "Normal" ? "sage" : "neutral"}`}>{row.priority}</span> },
    { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    { key: "assigned", header: "Assigned", render: (row) => row.assigned || "Unassigned", hideOnMobile: true },
    { key: "updatedAt", header: "Updated", sortable: true, render: (row) => formatDateTime(row.updatedAt), hideOnMobile: true },
    { key: "action", header: "", exportable: false, align: "right", render: (row) => <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelected(row)}><MessageCircle size={13} /> Open</button> },
  ];

  return (
    <div className="app-page">
      <PageHeader eyebrow="Client care" title="Support management" description="Manage customer conversations, assignment, priority and resolution. Internal notes are never visible to customers." />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Open tickets" value={tickets.filter((t) => t.status !== "Resolved").length} detail="Across sample customers" icon="life-buoy" tone="emerald" />
        <StatCard label="High priority" value={tickets.filter((t) => t.priority === "High").length} detail="Requires attention" icon="warning" tone="clay" />
        <StatCard label="Pending" value={tickets.filter((t) => t.status === "Pending review").length} detail="Awaiting internal action" icon="hourglass" tone="sand" />
        <StatCard label="Resolved" value={tickets.filter((t) => t.status === "Resolved").length} detail="Closed with record" icon="check-circle" tone="forest" />
      </div>
      <DataTable columns={columns} rows={tickets} searchPlaceholder="Search ticket, customer or category…" searchKeys={["subject", "reference", "customer", "category", "status", "assigned"]} filters={[{ key: "status", label: "Status", options: ["Open", "Pending review", "Resolved"] }, { key: "priority", label: "Priority", options: ["High", "Normal", "Low"] }]} exportName="vee-support-tickets" initialSort={{ key: "updatedAt", direction: "desc" }} footerNote="Demonstration support queue" />
      <div className="info-note" style={{ marginTop: 14 }}><Tag size={15} /><span>Support staff must not change customer financial records directly. Escalate to the relevant controlled workflow.</span></div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.subject} description={selected ? `${selected.reference} · ${selected.customer} · ${selected.status}` : ""} size="lg" footer={<button type="button" className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>}>
        {selected ? (
          <div className="stack">
            <div className="flex-between"><div className="flex-center"><StatusBadge status={selected.status} /><span className="badge badge-neutral">{selected.priority}</span></div><button type="button" className="btn btn-outline btn-sm" onClick={assign}><UserCheck size={14} /> Assign to me</button></div>
            <div className="ticket-thread">{selected.messages.map((message, index) => <div className={`ticket-message ${message.from.includes("Internal") ? "is-me" : ""}`} key={`${message.date}-${index}`}><div className="ticket-message-head"><strong>{message.from}</strong><span>{formatDateTime(message.date)}</span></div><p>{message.body}</p></div>)}</div>
            <div className="ticket-composer">
              <Textarea label="Reply" name="adminReply" value={reply} onChange={(event) => setReply(event.target.value)} rows={3} placeholder="Write a reply or internal note…" />
              <div className="flex-between" style={{ marginTop: 8 }}><label className="checkbox"><input type="checkbox" checked={internal} onChange={(event) => setInternal(event.target.checked)} /> Internal note only</label><button type="button" className="btn btn-primary btn-sm" onClick={send} disabled={!reply.trim()}><Send size={14} /> {internal ? "Add note" : "Send reply"}</button></div>
            </div>
            <div className="info-note"><UserCheck size={15} /><span>No message is delivered in this demonstration. Resolution requires a documented outcome and customer communication.</span></div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
