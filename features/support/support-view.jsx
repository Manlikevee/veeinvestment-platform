"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, MessageCircle, Paperclip, Plus, Send, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Input, Select, Textarea } from "@/components/ui/form-field";
import { FileUpload } from "@/components/forms/file-upload";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/providers/toast-provider";
import { tickets as seedTickets, supportCategories } from "@/lib/data/customer";
import { formatDateTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const statusFilters = ["All", "Open", "Pending review", "Resolved"];

export function SupportView() {
  const [tickets, setTickets] = useState(seedTickets);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [reply, setReply] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", category: "", priority: "Normal", message: "" });
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const selected = tickets.find((ticket) => ticket.id === selectedId);
  const filtered = useMemo(() => (filter === "All" ? tickets : tickets.filter((ticket) => ticket.status === filter)), [tickets, filter]);
  const openCount = tickets.filter((ticket) => ticket.status !== "Resolved").length;

  function createTicket(event) {
    event.preventDefault();
    const next = {};
    if (!form.subject.trim()) next.subject = "Enter a subject.";
    if (!form.category) next.category = "Select a category.";
    if (form.message.trim().length < 20) next.message = "Add at least 20 characters so the team can help.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const ticket = {
        id: `TKT-${Math.floor(4500 + Math.random() * 400)}`,
        reference: `VEE-SUP-${Math.floor(4500 + Math.random() * 400)}`,
        subject: form.subject, category: form.category, priority: form.priority, status: "Open",
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), assignee: "Unassigned",
        attachment: attachment ? { name: attachment.name, size: attachment.size } : null,
        messages: [{ from: "You", date: new Date().toISOString(), body: form.message }],
      };
      setTickets((current) => [ticket, ...current]);
      setSubmitting(false);
      setCreateOpen(false);
      setForm({ subject: "", category: "", priority: "Normal", message: "" });
      setAttachment(null);
      setSelectedId(ticket.id);
      toast({ title: "Support ticket created for this demonstration", message: "No ticket was sent to a live support system.", tone: "info" });
    }, 700);
  }

  function sendReply() {
    if (!reply.trim()) return;
    setTickets((current) => current.map((ticket) => ticket.id === selectedId ? {
      ...ticket,
      updatedAt: new Date().toISOString(),
      status: ticket.status === "Resolved" ? "Open" : ticket.status,
      messages: [...ticket.messages, { from: "You", date: new Date().toISOString(), body: reply.trim() }],
    } : ticket));
    setReply("");
    toast({ title: "Reply added locally", message: "No message was transmitted to a support team.", tone: "info" });
  }

  function resolveTicket() {
    setTickets((current) => current.map((ticket) => ticket.id === selectedId ? { ...ticket, status: "Resolved", updatedAt: new Date().toISOString() } : ticket));
    toast({ title: "Ticket marked resolved (demonstration)", message: "A live system would record the resolution and notify the assignee.", tone: "success" });
  }

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Client care"
        title="Support"
        description="Create a secure request, continue a conversation and track the status of each ticket. This demonstration keeps changes in your browser."
        actions={<button type="button" className="btn btn-primary" onClick={() => setCreateOpen(true)}><Plus size={16} /> New ticket</button>}
      />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Open requests" value={openCount} detail="Across all categories" icon="life-buoy" tone="emerald" />
        <StatCard label="Awaiting your reply" value={0} detail="No outstanding information" icon="message-circle" tone="sage" />
        <StatCard label="Resolved" value={tickets.filter((ticket) => ticket.status === "Resolved").length} detail="Closed conversations" icon="check-circle" tone="forest" />
        <StatCard label="Response target" value="1 day" detail="General support enquiries" icon="clock" tone="sand" />
      </div>
      <div className="chip-row" style={{ marginBottom: 14 }}>
        {statusFilters.map((item) => <button type="button" key={item} className={cn("chip", filter === item && "is-active")} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}
      </div>
      {filtered.length ? (
        <div className="ticket-list">
          {filtered.map((ticket) => (
            <article className="ticket-item" key={ticket.id}>
              <div className="ticket-copy">
                <h3>{ticket.subject}</h3>
                <p>{ticket.messages[ticket.messages.length - 1].body}</p>
                <div className="ticket-meta"><span>{ticket.reference}</span><span>·</span><span>{ticket.category}</span><span>·</span><span>Updated {formatDateTime(ticket.updatedAt)}</span></div>
              </div>
              <div className="ticket-item-side">
                <StatusBadge status={ticket.status} />
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelectedId(ticket.id)}><MessageCircle size={14} /> View conversation</button>
              </div>
            </article>
          ))}
        </div>
      ) : <EmptyState icon="message-circle" title="No tickets in this view" description="Select another status or create a new support ticket." />}
      <div className="info-note" style={{ marginTop: 15 }}><ShieldCheck size={16} /><span>Never include passwords, one-time codes or full card numbers in a support message.</span></div>

      <Modal open={Boolean(selected)} onClose={() => setSelectedId(null)} title={selected?.subject} description={selected ? `${selected.reference} · ${selected.category} · ${selected.status}` : ""} size="lg" footer={<button type="button" className="btn btn-outline" onClick={() => setSelectedId(null)}>Close</button>}>
        {selected ? (
          <div>
            <div className="flex-between" style={{ marginBottom: 16 }}>
              <div className="flex-center"><StatusBadge status={selected.status} /><span className="badge badge-neutral">{selected.priority} priority</span></div>
              {selected.status !== "Resolved" ? <button type="button" className="text-button" onClick={resolveTicket}><CheckCircle2 size={14} /> Mark resolved</button> : null}
            </div>
            <div className="ticket-thread">
              {selected.messages.map((message, index) => (
                <div className={cn("ticket-message", message.from === "You" && "is-me")} key={`${message.date}-${index}`}>
                  <div className="ticket-message-head"><strong>{message.from}</strong><time dateTime={message.date}>{formatDateTime(message.date)}</time></div>
                  <p>{message.body}</p>
                </div>
              ))}
            </div>
            {selected.attachment ? <div className="uploaded-file" style={{ marginTop: 12 }}><span className="uploaded-file-icon"><Paperclip size={14} /></span><div className="uploaded-file-copy"><strong>{selected.attachment.name}</strong><span>{selected.attachment.size} · Demonstration attachment</span></div></div> : null}
            <div className="ticket-composer">
              <Textarea label="Reply" name="reply" value={reply} onChange={(event) => setReply(event.target.value)} rows={3} placeholder="Add to this conversation…" />
              <button type="button" className="btn btn-primary btn-sm" onClick={sendReply} disabled={!reply.trim()}><Send size={14} /> Send reply</button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create a support ticket" description="Describe the issue as clearly as you can. A live platform would route it to the right team." footer={<><button type="button" className="btn btn-ghost" onClick={() => setCreateOpen(false)}>Cancel</button><button type="submit" form="ticket-form" className="btn btn-primary" disabled={submitting}>{submitting ? <span className="button-spinner" /> : <Send size={15} />}{submitting ? "Creating…" : "Create ticket"}</button></>}>
        <form id="ticket-form" className="stack" onSubmit={createTicket}>
          <Input label="Subject" name="ticketSubject" value={form.subject} onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))} error={errors.subject} required />
          <div className="form-grid two">
            <Select label="Category" name="ticketCategory" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} options={supportCategories} error={errors.category} required />
            <Select label="Priority" name="ticketPriority" value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))} options={["Low", "Normal", "High", "Urgent"]} />
          </div>
          <Textarea label="What can we help with?" name="ticketMessage" value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} error={errors.message} rows={5} required />
          <FileUpload id="ticket-attachment" label="Attachment (optional)" hint="PDF, JPG or PNG · Maximum 10 MB" value={attachment} onChange={setAttachment} />
        </form>
      </Modal>
    </div>
  );
}
