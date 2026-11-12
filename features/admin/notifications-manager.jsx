"use client";

import { useState } from "react";
import { Bell, Plus, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Input, Select, Textarea } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { announcements as seedAnnouncements } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/utils/format";

export function NotificationsManager() {
  const [announcements, setAnnouncements] = useState(seedAnnouncements);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", audience: "All active clients", channel: "Email · In-app", message: "" });
  const { toast } = useToast();
  function send(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.message.trim()) return;
    setAnnouncements((current) => [{ id: `ANN-${210 + current.length}`, title: form.title, audience: form.audience, channel: form.channel, sent: new Date().toISOString(), delivered: "0", opened: "—", status: "Scheduled" }, ...current]);
    setOpen(false); setForm({ title: "", audience: "All active clients", channel: "Email · In-app", message: "" });
    toast({ title: "Announcement staged for demonstration", message: "No email, SMS or push notification was sent.", tone: "info" });
  }
  const columns = [
    { key: "title", header: "Announcement", sortable: true, render: (row) => <div className="table-primary-copy"><strong>{row.title}</strong><span>{row.channel}</span></div> },
    { key: "audience", header: "Audience", sortable: true, render: (row) => row.audience, hideOnMobile: true },
    { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    { key: "sent", header: "Sent", sortable: true, render: (row) => row.sent ? formatDateTime(row.sent) : "—", hideOnMobile: true },
    { key: "delivered", header: "Delivered", align: "right", render: (row) => row.delivered, hideOnMobile: true },
    { key: "opened", header: "Opened", align: "right", render: (row) => row.opened, hideOnMobile: true },
  ];
  return (
    <div className="app-page">
      <PageHeader eyebrow="Engagement" title="Notifications" description="Create announcements, target customer groups and review delivery status. Email, SMS and push integrations are prepared but not connected." actions={<button type="button" className="btn btn-primary" onClick={() => setOpen(true)}><Plus size={16} /> Create announcement</button>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Announcements" value={announcements.length} detail="All statuses" icon="bell" tone="emerald" />
        <StatCard label="Sent" value={announcements.filter((a) => a.status === "Sent").length} detail="Delivery recorded" icon="send" tone="forest" />
        <StatCard label="Scheduled" value={announcements.filter((a) => a.status === "Scheduled").length} detail="Future sends" icon="clock" tone="sage" />
        <StatCard label="Open rate" value="61%" detail="Latest sent announcement" icon="activity" tone="sand" />
      </div>
      <DataTable columns={columns} rows={announcements} searchPlaceholder="Search announcements…" searchKeys={["title", "audience", "channel", "status"]} filters={[{ key: "status", label: "Status", options: ["Sent", "Scheduled", "Draft"] }]} exportName="vee-announcements" initialSort={{ key: "sent", direction: "desc" }} footerNote="Demonstration delivery data" />
      <div className="info-note is-warning" style={{ marginTop: 14 }}><Bell size={15} /><span>Delivery metrics are illustrative. A production system must record consent, provider message IDs, bounce handling and unsubscribe state.</span></div>
      <Modal open={open} onClose={() => setOpen(false)} title="Create announcement" description="No live message is sent from this demonstration." footer={<><button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button type="submit" form="announcement-form" className="btn btn-primary"><Send size={15} /> Stage announcement</button></>}>
        <form id="announcement-form" className="stack" onSubmit={send}>
          <Input label="Subject" name="announcementTitle" value={form.title} onChange={(event) => setForm((c) => ({ ...c, title: event.target.value }))} required />
          <div className="form-grid two"><Select label="Audience" name="audience" value={form.audience} onChange={(event) => setForm((c) => ({ ...c, audience: event.target.value }))} options={["All active clients", "All customers", "Verified customers", "Pending verification", "Portfolio ≥ ₦5m", "Waitlist"]} /><Select label="Channels" name="channel" value={form.channel} onChange={(event) => setForm((c) => ({ ...c, channel: event.target.value }))} options={["Email", "In-app", "Email · In-app", "Email · SMS", "SMS"]} /></div>
          <Textarea label="Message" name="announcementMessage" value={form.message} onChange={(event) => setForm((c) => ({ ...c, message: event.target.value }))} rows={5} required />
          <div className="info-note"><Bell size={15} /><span>Audience and channel rules would be enforced server-side against consent preferences.</span></div>
        </form>
      </Modal>
    </div>
  );
}
