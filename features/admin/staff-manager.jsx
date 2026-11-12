"use client";

import { useState } from "react";
import { Mail, Plus, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { staff as seedStaff, roles } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/utils/format";

export function StaffManager() {
  const [staff, setStaff] = useState(seedStaff);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "KYC Reviewer", department: "Risk & Compliance" });
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  function invite(event) {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter the staff member's name.";
    if (!form.email.includes("@")) next.email = "Enter a valid work email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStaff((current) => [...current, { id: `STF-${String(current.length + 1).padStart(3, "0")}`, name: form.name, initials: form.name.split(" ").map((p) => p[0]).join("").slice(0, 2), email: form.email, role: form.role, department: form.department, status: "Invited", lastActive: null, joined: null, mfa: false }]);
    setOpen(false);
    setForm({ name: "", email: "", role: "KYC Reviewer", department: "Risk & Compliance" });
    toast({ title: "Staff invitation staged", message: "No invitation email was sent. A backend must create the account and audit the action.", tone: "info" });
  }

  function toggle(member) {
    setStaff((current) => current.map((item) => item.id === member.id ? { ...item, status: item.status === "Suspended" ? "Active" : "Suspended" } : item));
    toast({ title: "Staff access staged", message: "No permissions or account status were changed on a server.", tone: "info" });
  }

  const columns = [
    { key: "name", header: "Staff member", sortable: true, render: (row) => <div className="table-primary-copy"><strong>{row.name}</strong><span>{row.email}</span></div> },
    { key: "role", header: "Role", sortable: true, render: (row) => row.role },
    { key: "department", header: "Department", sortable: true, render: (row) => row.department, hideOnMobile: true },
    { key: "status", header: "Status", sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    { key: "mfa", header: "MFA", render: (row) => row.mfa ? <span className="badge badge-emerald">Enabled</span> : <span className="badge badge-sand">Required</span>, hideOnMobile: true },
    { key: "lastActive", header: "Last active", render: (row) => row.lastActive ? formatDateTime(row.lastActive) : "Never", hideOnMobile: true },
    { key: "actions", header: "", exportable: false, align: "right", render: (row) => <button type="button" className="btn btn-outline btn-sm" onClick={() => toggle(row)}>{row.status === "Suspended" ? "Activate" : "Suspend"}</button> },
  ];

  return (
    <div className="app-page">
      <PageHeader eyebrow="Administration" title="Staff management" description="Invite staff, assign roles and manage access. Staff access must be least-privilege and require multi-factor authentication." actions={<button type="button" className="btn btn-primary" onClick={() => setOpen(true)}><Plus size={16} /> Invite staff</button>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Staff accounts" value={staff.length} detail="In this sample directory" icon="briefcase" tone="emerald" />
        <StatCard label="Active" value={staff.filter((s) => s.status === "Active").length} detail="Currently able to access" icon="user-check" tone="forest" />
        <StatCard label="Invited" value={staff.filter((s) => s.status === "Invited").length} detail="Awaiting acceptance" icon="mail" tone="sand" />
        <StatCard label="MFA enabled" value={`${staff.filter((s) => s.mfa).length}/${staff.length}`} detail="Security coverage" icon="shield-check" tone="sage" />
      </div>
      <DataTable columns={columns} rows={staff} searchPlaceholder="Search staff name, email or role…" searchKeys={["name", "email", "role", "department", "status"]} filters={[{ key: "status", label: "Status", options: ["Active", "Invited", "Suspended"] }]} exportName="vee-staff" footerNote="Demonstration staff directory" />
      <div className="info-note is-warning" style={{ marginTop: 14 }}><ShieldCheck size={15} /><span>Staff accounts require identity verification, MFA and periodic access review. Frontend role checks do not replace backend authorisation.</span></div>
      <Modal open={open} onClose={() => setOpen(false)} title="Invite a staff member" description="A live workflow would send a secure invitation and require MFA setup before access." footer={<><button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button type="submit" form="staff-form" className="btn btn-primary"><Mail size={15} /> Send invitation</button></>}>
        <form id="staff-form" className="stack" onSubmit={invite}>
          <Input label="Full name" name="staffName" value={form.name} onChange={(event) => setForm((c) => ({ ...c, name: event.target.value }))} error={errors.name} required />
          <Input label="Work email" name="staffEmail" type="email" value={form.email} onChange={(event) => setForm((c) => ({ ...c, email: event.target.value }))} error={errors.email} required />
          <Select label="Role" name="staffRole" value={form.role} onChange={(event) => setForm((c) => ({ ...c, role: event.target.value }))} options={roles.map((role) => role.name)} required />
          <Select label="Department" name="staffDept" value={form.department} onChange={(event) => setForm((c) => ({ ...c, department: event.target.value }))} options={["Risk & Compliance", "Investments", "Finance", "Client Experience", "Executive Office"]} required />
        </form>
      </Modal>
    </div>
  );
}
