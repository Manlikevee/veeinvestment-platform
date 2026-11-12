"use client";

import { useState } from "react";
import { Building2, CreditCard, Save, ShieldCheck, Wrench } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Icon } from "@/components/ui/icon";
import { Input, Select, Textarea } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";
import { systemSettings } from "@/lib/data/admin";
import { cn } from "@/lib/utils/cn";

const initial = {
  legalName: "Vee Investment & Wealth Management Limited", publicName: "Vee Investment",
  email: "hello@veeinvestment.com", phone: "+234 (0) 700 833 4683",
  address: "12C Akin Adesola Street, Victoria Island, Lagos, Nigeria",
  baseCurrency: "NGN — Nigerian Naira", countries: "Nigeria, Ghana, Kenya, South Africa, United Kingdom",
  approvalThreshold: "5,000,000", earlyWithdrawal: true,
  defaultLoanRate: "18.5", maxLtv: "70",
  sessionMinutes: "30", mfaRequired: true, ipRestriction: false,
  maintenance: false, maintenanceMessage: "We are performing scheduled maintenance. Please return shortly.",
  fromEmail: "notifications@veeinvestment.com", smsSender: "VEE",
  provider: "Configured server-side", webhook: "Healthy",
};

export function AdminSettingsView() {
  const [active, setActive] = useState("company");
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const update = (key, value) => { setValues((c) => ({ ...c, [key]: value })); setSaved(false); };
  function save(event) {
    event.preventDefault();
    setSaved(true);
    toast({ title: "System settings staged", message: "No server configuration was changed. Sensitive settings require a controlled deployment and audit record.", tone: "info" });
  }
  return (
    <div className="app-page">
      <PageHeader eyebrow="System" title="System settings" description="Configure company information, platform defaults, document rules, notifications, integrations, security and maintenance mode." actions={<StatusBadge status="Administrator access" />} />
      <div className="notice-bar" style={{ marginBottom: 16 }}><span><ShieldCheck size={14} /> Secrets and payment credentials are never exposed to the client. Configuration changes require audit records.</span></div>
      <div className="settings-layout">
        <nav className="settings-nav" aria-label="System settings sections">
          {systemSettings.map((setting) => <button type="button" key={setting.id} className={active === setting.id ? "is-active" : ""} onClick={() => setActive(setting.id)}><Icon name={setting.icon} size={15} /><span style={{ flex: 1, textAlign: "left" }}>{setting.label}</span></button>)}
        </nav>
        <form className="settings-content" onSubmit={save}>
          <section className="settings-panel">
            <div className="settings-panel-head"><div><h2>{systemSettings.find((s) => s.id === active)?.label}</h2><p>{systemSettings.find((s) => s.id === active)?.description}</p></div>{saved ? <span className="badge badge-emerald">Staged</span> : null}</div>
            {active === "company" ? <div className="form-grid two"><Input label="Legal name" name="legalName" value={values.legalName} onChange={(e) => update("legalName", e.target.value)} /><Input label="Public name" name="publicName" value={values.publicName} onChange={(e) => update("publicName", e.target.value)} /><Input label="Public email" name="companyEmail" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} /><Input label="Public phone" name="companyPhone" value={values.phone} onChange={(e) => update("phone", e.target.value)} /><Input className="full" label="Registered office" name="companyAddress" value={values.address} onChange={(e) => update("address", e.target.value)} /></div> : null}
            {active === "brand" ? <div className="form-grid two"><Input label="Primary colour" name="primary" value="#007146" readOnly /><Input label="Accent colour" name="accent" value="#C8F169" readOnly /><div className="full"><div className="info-note"><Building2 size={15} /><span>Brand tokens are defined in the design system. Logo and colour changes require design review and full contrast testing.</span></div></div></div> : null}
            {active === "currency" ? <div className="form-grid two"><Select label="Base currency" name="currency" value={values.baseCurrency} onChange={(e) => update("baseCurrency", e.target.value)} options={["NGN — Nigerian Naira", "USD — US Dollar", "GBP — Pound Sterling", "KES — Kenyan Shilling"]} /><Input label="Supported countries" name="countries" value={values.countries} onChange={(e) => update("countries", e.target.value)} /><div className="info-note full"><ShieldCheck size={15} /><span>Availability by jurisdiction must be confirmed by legal and compliance before configuration.</span></div></div> : null}
            {active === "investment" ? <div className="form-grid two"><Input label="Approval threshold" name="approvalThreshold" prefix="₦" value={values.approvalThreshold} onChange={(e) => update("approvalThreshold", e.target.value)} /><label className="flex-between" style={{ paddingTop: 24 }}><span style={{ fontSize: "0.77rem" }}>Allow early withdrawal requests</span><input type="checkbox" checked={values.earlyWithdrawal} onChange={(e) => update("earlyWithdrawal", e.target.checked)} /></label><div className="info-note full"><ShieldCheck size={15} /><span>Early withdrawal must always remain subject to product terms and approval, not a global toggle alone.</span></div></div> : null}
            {active === "loans" ? <div className="form-grid two"><Input label="Default interest rate" name="loanRate" value={values.defaultLoanRate} onChange={(e) => update("defaultLoanRate", e.target.value)} /><Input label="Maximum LTV (%)" name="maxLtv" value={values.maxLtv} onChange={(e) => update("maxLtv", e.target.value)} /><div className="info-note full"><ShieldCheck size={15} /><span>Defaults do not replace affordability assessment or credit approval.</span></div></div> : null}
            {active === "documents" ? <div className="stack"><label className="checkbox"><input type="checkbox" defaultChecked /> Identity document required</label><label className="checkbox"><input type="checkbox" defaultChecked /> Proof of address required</label><label className="checkbox"><input type="checkbox" defaultChecked /> Source of funds for high-value applications</label><label className="checkbox"><input type="checkbox" /> Additional corporate documents for entity accounts</label><div className="form-grid two"><Input label="Document review SLA (days)" name="docSla" defaultValue="3" /><Input label="Expiry warning (days)" name="docExpiry" defaultValue="30" /></div><div className="info-note"><ShieldCheck size={15} /><span>Requirements should be configurable by jurisdiction and product.</span></div></div> : null}
            {active === "onboarding" ? <div className="stack"><Select label="Onboarding version" name="onboardingVersion" defaultValue="2026.1" options={["2026.1", "2025.2"]} /><label className="flex-between"><span style={{ fontSize: "0.77rem" }}>Save and resume enabled</span><input type="checkbox" defaultChecked /></label><label className="flex-between"><span style={{ fontSize: "0.77rem" }}>Manual review required before submission</span><input type="checkbox" defaultChecked /></label><div className="info-note"><ShieldCheck size={15} /><span>Consent versions must be immutable once used on a submitted application.</span></div></div> : null}
            {active === "notifications" ? <div className="form-grid two"><Input label="From email" name="fromEmail" type="email" value={values.fromEmail} onChange={(e) => update("fromEmail", e.target.value)} /><Input label="SMS sender ID" name="smsSender" value={values.smsSender} onChange={(e) => update("smsSender", e.target.value)} /><div className="info-note full"><ShieldCheck size={15} /><span>Delivery providers and credentials are configured server-side. This interface cannot send live messages.</span></div></div> : null}
            {active === "payments" ? <div className="stack"><div className="form-grid two"><Input label="Payment provider" name="provider" value={values.provider} disabled /><Input label="Webhook health" name="webhook" value={values.webhook} disabled /></div><Input label="API secret" name="apiSecret" value="Configured server-side — never exposed" disabled /><div className="info-note is-warning"><CreditCard size={15} /><span>Never expose payment API secrets in client-side code. Gateway configuration must be set through server environment or a secure secret manager.</span></div></div> : null}
            {active === "security" ? <div className="stack"><div className="form-grid two"><Input label="Session timeout (minutes)" name="session" value={values.sessionMinutes} onChange={(e) => update("sessionMinutes", e.target.value)} /><label className="flex-between" style={{ paddingTop: 24 }}><span style={{ fontSize: "0.77rem" }}>Require MFA for staff</span><input type="checkbox" checked={values.mfaRequired} onChange={(e) => update("mfaRequired", e.target.checked)} /></label><label className="flex-between"><span style={{ fontSize: "0.77rem" }}>Restrict administration by IP</span><input type="checkbox" checked={values.ipRestriction} onChange={(e) => update("ipRestriction", e.target.checked)} /></label></div><div className="info-note"><ShieldCheck size={15} /><span>Security policy must be enforced server-side. Client toggles are not a security boundary.</span></div></div> : null}
            {active === "maintenance" ? <div className="stack"><label className="flex-between"><span style={{ fontSize: "0.77rem" }}>Maintenance mode enabled</span><input type="checkbox" checked={values.maintenance} onChange={(e) => update("maintenance", e.target.checked)} /></label><Textarea label="Maintenance message" name="maintenanceMessage" value={values.maintenanceMessage} onChange={(e) => update("maintenanceMessage", e.target.value)} rows={3} /><div className={`info-note ${values.maintenance ? "is-warning" : ""}`}><Wrench size={15} /><span>{values.maintenance ? "Public and client access would be restricted. Emergency administrator access must remain available with an audit trail." : "Maintenance mode is currently off."}</span></div></div> : null}
            <div className="form-actions"><button type="submit" className="btn btn-primary"><Save size={15} /> Save settings</button></div>
          </section>
          <section className="settings-panel">
            <div className="settings-panel-head"><div><h2>Configuration safety</h2><p>Every change should be versioned and reviewable.</p></div></div>
            <div className="verification-status-list"><div className="verification-status-row"><span><ShieldCheck size={14} /></span><div><strong>Secrets excluded from client</strong><small>No API keys or gateway secrets are rendered.</small></div><StatusBadge status="Verified" /></div><div className="verification-status-row"><span><ShieldCheck size={14} /></span><div><strong>Demonstration mode</strong><small>Changes are staged locally, not persisted.</small></div><span className="badge badge-sand">Local only</span></div></div>
          </section>
        </form>
      </div>
    </div>
  );
}
