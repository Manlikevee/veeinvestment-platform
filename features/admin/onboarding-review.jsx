"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardCheck, Eye, UserRound } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/form-field";
import { ProgressBar } from "@/components/ui/progress";
import { useToast } from "@/providers/toast-provider";
import { formatDateTime } from "@/lib/utils/format";
import { onboardingApplications } from "@/lib/data/admin";

export function OnboardingReview() {
  const [apps, setApps] = useState(onboardingApplications);
  const [selected, setSelected] = useState(null);
  const [decision, setDecision] = useState("");
  const [note, setNote] = useState("");
  const { toast } = useToast();

  function decide() {
    if (!decision) { toast({ title: "Select a decision", tone: "warning" }); return; }
    if (note.trim().length < 10) { toast({ title: "Add a review note", message: "A note of at least 10 characters is required.", tone: "warning" }); return; }
    const status = decision === "approve" ? "Approved" : decision === "info" ? "Additional information" : "Rejected";
    setApps((current) => current.map((app) => app.id === selected.id ? { ...app, stage: status, updated: new Date().toISOString(), reviewer: "Ngozi Eze" } : app));
    toast({ title: `Onboarding marked ${status.toLowerCase()} in this demonstration`, message: "No customer record or verification result was changed by a backend.", tone: "info" });
    setSelected(null); setDecision(""); setNote("");
  }

  const columns = [
    { key: "name", header: "Applicant", sortable: true, render: (row) => <div className="table-primary-copy"><strong>{row.name}</strong><span>{row.email} · {row.id}</span></div> },
    { key: "stage", header: "Stage", sortable: true, render: (row) => <StatusBadge status={row.stage} /> },
    { key: "completion", header: "Completion", sortable: true, render: (row) => <div style={{ minWidth: 100 }}><div className="flex-between" style={{ fontSize: "0.6rem", marginBottom: 4 }}><span>{row.completion}%</span></div><ProgressBar value={row.completion} /></div> },
    { key: "docs", header: "Docs", align: "right", render: (row) => row.docs, hideOnMobile: true },
    { key: "risk", header: "Risk", render: (row) => row.risk, hideOnMobile: true },
    { key: "reviewer", header: "Reviewer", render: (row) => row.reviewer, hideOnMobile: true },
    { key: "updated", header: "Updated", sortable: true, render: (row) => formatDateTime(row.updated), hideOnMobile: true },
    { key: "action", header: "", exportable: false, align: "right", render: (row) => <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelected(row)}><Eye size={14} /> Review</button> },
  ];

  return (
    <div className="app-page">
      <PageHeader eyebrow="Client operations" title="Onboarding review" description="Inspect submitted applications, completion status and reviewer ownership. Decisions here are demonstration-only." actions={<Link href="/admin/customers" className="btn btn-outline"><UserRound size={16} /> Customer directory</Link>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="In progress" value={apps.filter((a) => a.stage === "In progress").length} detail="Incomplete applications" icon="clipboard" tone="sage" />
        <StatCard label="Submitted" value={apps.filter((a) => a.stage === "Submitted").length} detail="Awaiting first review" icon="file-check" tone="emerald" />
        <StatCard label="Additional info" value={apps.filter((a) => a.stage === "Additional information").length} detail="Customer action required" icon="warning" tone="sand" />
        <StatCard label="Approved" value={apps.filter((a) => a.stage === "Approved").length} detail="Completed reviews" icon="check-circle" tone="forest" />
      </div>
      <DataTable columns={columns} rows={apps} searchPlaceholder="Search applicant or reference…" searchKeys={["name", "email", "id", "stage"]} filters={[{ key: "stage", label: "Stage", options: ["In progress", "Submitted", "Pending review", "Additional information", "Approved", "Rejected"] }]} exportName="vee-onboarding-applications" footerNote="Demonstration queue" />
      <div className="info-note" style={{ marginTop: 14 }}><ClipboardCheck size={16} /><span>Approving an onboarding review does not by itself verify documents or authorise an investment. Each workflow requires its own permission and audit record.</span></div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.name} description={selected ? `${selected.id} · ${selected.stage}` : ""} size="lg" footer={<><button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>Cancel</button><button type="button" className="btn btn-primary" onClick={decide}>Record decision</button></>}>
        {selected ? (
          <div className="stack">
            <div className="info-grid">
              <div className="info-row"><span>Email</span><strong>{selected.email}</strong></div>
              <div className="info-row"><span>Completion</span><strong>{selected.completion}%</strong></div>
              <div className="info-row"><span>Documents</span><strong>{selected.docs} uploaded</strong></div>
              <div className="info-row"><span>Reviewer</span><strong>{selected.reviewer}</strong></div>
              <div className="info-row"><span>Risk profile</span><strong>{selected.risk}</strong></div>
              <div className="info-row"><span>Submitted</span><strong>{selected.submitted ? formatDateTime(selected.submitted) : "Not submitted"}</strong></div>
            </div>
            <div className="info-note"><ShieldCheckIcon /><span>Personal data is visible only to authorised reviewers. Decisions must be based on the evidence in the record.</span></div>
            <div className="form-grid two">
              <label className="field"><span style={{ fontSize: "0.75rem", fontWeight: 700 }}>Decision</span><select className="select" value={decision} onChange={(event) => setDecision(event.target.value)}><option value="">Select a decision</option><option value="approve">Approve onboarding</option><option value="info">Request additional information</option><option value="reject">Reject application</option></select></label>
            </div>
            <Textarea label="Review note *" name="onboardingNote" value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Record the reason for this decision." />
            <div className="info-note is-warning"><ClipboardCheck size={16} /><span>Approval of onboarding must not be described as KYC verification. Those are separate controls with separate evidence.</span></div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function ShieldCheckIcon() {
  return <span aria-hidden="true" style={{ width: 16, flexShrink: 0, color: "var(--brand-700)" }}>✓</span>;
}
