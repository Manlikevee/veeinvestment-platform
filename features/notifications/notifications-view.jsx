"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Check, CheckCheck, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Icon } from "@/components/ui/icon";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDateTime } from "@/lib/utils/format";
import { notifications as seedNotifications } from "@/lib/data/customer";
import { cn } from "@/lib/utils/cn";
import { useToast } from "@/providers/toast-provider";

export function NotificationsView() {
  const [items, setItems] = useState(seedNotifications);
  const [view, setView] = useState("all");
  const { toast } = useToast();
  const unread = items.filter((item) => !item.read).length;
  const filtered = view === "unread" ? items.filter((item) => !item.read) : items;

  function markRead(id) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, read: true } : item));
  }

  function markAll() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
    toast({ title: "All notifications marked as read", message: "This change is local to the demonstration.", tone: "success" });
  }

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Account"
        title="Notifications"
        description="Verification updates, investment activity, payment confirmations, loan reminders and security notices."
        actions={<><button type="button" className="btn btn-outline" onClick={markAll} disabled={!unread}><CheckCheck size={16} /> Mark all read</button><Link href="/dashboard/settings" className="btn btn-ghost"><Settings2 size={16} /> Preferences</Link></>}
      />
      <div className="panel">
        <div className="panel-tabs" style={{ paddingTop: 4 }}>
          <Tabs items={[{ value: "all", label: "All", count: items.length }, { value: "unread", label: "Unread", count: unread }]} active={view} onChange={setView} ariaLabel="Notification filter" />
        </div>
        <div className="panel-body">
          {filtered.length ? (
            <div className="notification-list">
              {filtered.map((item) => (
                <article className={cn("notification-item", !item.read && "is-unread")} key={item.id}>
                  <span className={`notification-icon ${item.tone}`}><Icon name={item.tone === "security" ? "shield" : item.tone === "success" ? "check-circle" : item.tone === "warning" ? "warning" : "info"} size={16} /></span>
                  <div className="notification-copy">
                    <div className="notification-copy-head"><strong>{item.title}</strong>{!item.read ? <span className="notification-dot-unread" aria-label="Unread" /> : null}<span className="badge badge-neutral">{item.category}</span></div>
                    <p>{item.body}</p>
                    <footer><time dateTime={item.date}>{formatDateTime(item.date)}</time>{item.action ? <Link href={item.action.href} onClick={() => markRead(item.id)}>{item.action.label}</Link> : null}{!item.read ? <button type="button" className="text-button" onClick={() => markRead(item.id)}><Check size={13} /> Mark read</button> : <span>Read</span>}</footer>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState icon="bell" title="No unread notifications" description="You are up to date. New account activity will appear here." action={<Link href="/dashboard/settings" className="btn btn-outline btn-sm">Notification preferences</Link>} />
          )}
        </div>
      </div>
      <div className="info-note" style={{ marginTop: 14 }}><Bell size={16} /><span>Notifications shown are demonstration records. No email, SMS or push message has been sent.</span></div>
    </div>
  );
}
