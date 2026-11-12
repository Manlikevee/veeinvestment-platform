"use client";

import { useState } from "react";
import { Check, KeyRound, Save, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";
import { permissionGroups, rolePermissionMap, roles } from "@/lib/data/admin";
import { cn } from "@/lib/utils/cn";

export function RolesManager() {
  const [selectedRole, setSelectedRole] = useState(roles[2].name);
  const [permissions, setPermissions] = useState(() =>
    Object.fromEntries(roles.map((role) => [role.name, rolePermissionMap[role.name] || []])),
  );
  const { toast } = useToast();
  const role = roles.find((item) => item.name === selectedRole);
  const active = permissions[selectedRole] || [];

  function toggle(key) {
    setPermissions((current) => ({ ...current, [selectedRole]: current[selectedRole].includes(key) ? current[selectedRole].filter((item) => item !== key) : [...current[selectedRole], key] }));
  }

  function save() {
    toast({ title: "Role permissions staged", message: `${selectedRole} now has ${active.length} demonstration permissions. No access was changed on a server.`, tone: "info" });
  }

  return (
    <div className="app-page">
      <PageHeader eyebrow="Access control" title="Roles & permissions" description="Configure role-based access by module and action. Permissions shown here are interfaces; the backend must enforce every decision." actions={<button type="button" className="btn btn-primary" onClick={save}><Save size={16} /> Save permissions</button>} />
      <div className="notice-bar" style={{ marginBottom: 16 }}><span><ShieldCheck size={14} /> Changes affect every session in this profile in a real system. Here changes are local.</span><span className="badge badge-neutral">Demonstration RBAC</span></div>
      <div className="settings-layout">
        <aside className="settings-nav" aria-label="Roles">
          <p className="otp-label" style={{ marginBottom: 5 }}>Roles</p>
          {roles.map((item) => <button type="button" key={item.id} className={selectedRole === item.name ? "is-active" : ""} onClick={() => setSelectedRole(item.name)}><KeyRound size={14} /> <span style={{ flex: 1 }}>{item.name}</span><small>{item.members}</small></button>)}
          <div className="sidebar-card" style={{ marginTop: 10 }}><h3>Role summary</h3><p>{role?.description}</p><div className="flex-between" style={{ marginTop: 9 }}><span className="badge badge-forest">{active.length} permissions</span><span className="badge badge-neutral">{role?.members} members</span></div></div>
        </aside>
        <div className="settings-content">
          <section className="settings-panel">
            <div className="settings-panel-head"><div><h2>{selectedRole}</h2><p>Toggle permissions by module. Sensitive actions are highlighted by module.</p></div><StatusBadge status="System role" /></div>
            {permissionGroups.map((group) => (
              <div key={group.module} style={{ padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="flex-between" style={{ marginBottom: 9 }}><strong style={{ fontSize: "0.8rem" }}>{group.module}</strong><span className="badge badge-neutral">{group.permissions.filter((p) => active.includes(p.key)).length}/{group.permissions.length}</span></div>
                <div className="permission-grid">
                  {group.permissions.map((permission) => {
                    const checked = active.includes(permission.key);
                    return (
                      <label key={permission.key} className={cn("permission-item", checked && "is-checked")}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(permission.key)} />
                        <span className="permission-check">{checked ? <Check size={11} /> : null}</span>
                        <span>{permission.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="form-actions"><button type="button" className="btn btn-primary" onClick={save}><Save size={15} /> Save role permissions</button></div>
          </section>
        </div>
      </div>
    </div>
  );
}
