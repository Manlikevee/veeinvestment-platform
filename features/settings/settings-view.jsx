"use client";

import { useState } from "react";
import {
  AlertTriangle, Bell, Check, Download, Laptop, LockKeyhole, LogOut, Monitor,
  Moon, Palette, ShieldCheck, Smartphone, Sun, Trash2, UserCog,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input, PasswordInput, Select } from "@/components/ui/form-field";
import { PasswordStrength } from "@/components/ui/password-strength";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/providers/toast-provider";
import { useTheme } from "@/providers/theme-provider";
import { customer, notificationPreferences, sessions as seedSessions } from "@/lib/data/customer";
import { passwordStrength } from "@/lib/utils/validation";
import { downloadJson } from "@/lib/utils/download";
import { cn } from "@/lib/utils/cn";

const navigation = [
  { value: "account", label: "Account", icon: UserCog },
  { value: "security", label: "Password & security", icon: LockKeyhole },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "appearance", label: "Appearance", icon: Palette },
  { value: "privacy", label: "Privacy & data", icon: ShieldCheck },
  { value: "sessions", label: "Sessions", icon: Laptop },
  { value: "closure", label: "Close account", icon: Trash2 },
];

const themeOptions = [
  { value: "light", label: "Light", description: "Bright surfaces and deep green accents.", icon: Sun },
  { value: "dark", label: "Dark", description: "Low-light surfaces with accessible contrast.", icon: Moon },
  { value: "system", label: "System", description: "Follow your device appearance setting.", icon: Monitor },
];

export function SettingsView() {
  const [tab, setTab] = useState("account");
  const [profile, setProfile] = useState({ email: customer.email, phone: customer.phone, language: "English (UK)", timezone: "Africa/Lagos" });
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [twoFactor, setTwoFactor] = useState(true);
  const [preferences, setPreferences] = useState(notificationPreferences);
  const [sessions, setSessions] = useState(seedSessions);
  const [twoFactorModal, setTwoFactorModal] = useState(false);
  const [closureModal, setClosureModal] = useState(false);
  const [closureReason, setClosureReason] = useState("");
  const [closureRequested, setClosureRequested] = useState(false);
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  function saveProfile(event) {
    event.preventDefault();
    setSaved(true);
    toast({ title: "Preferences staged", message: "This demonstration does not persist changes to a server.", tone: "info" });
  }

  function changePassword(event) {
    event.preventDefault();
    const next = {};
    if (!password.current) next.current = "Enter your current password.";
    if (passwordStrength(password.next).score < 4) next.next = "Choose a stronger password.";
    if (password.next !== password.confirm) next.confirm = "Passwords do not match.";
    setPasswordErrors(next);
    if (Object.keys(next).length) return;
    setPassword({ current: "", next: "", confirm: "" });
    toast({ title: "Password change interface complete", message: "No real credential was changed. A live platform would revoke other sessions.", tone: "info" });
  }

  function togglePreference(id, channel) {
    setPreferences((current) => current.map((item) => item.id === id && !item.locked ? { ...item, [channel]: !item[channel] } : item));
  }

  function revokeSession(id) {
    setSessions((current) => current.filter((session) => session.id !== id));
    toast({ title: "Session revoked in this demonstration", message: "The device would be signed out by the backend in a live environment.", tone: "success" });
  }

  function exportData() {
    downloadJson("vee-demonstration-data-request.json", {
      generatedAt: new Date().toISOString(),
      note: "Demonstration data export. Not a formal data subject access response.",
      customer: { name: customer.name, email: customer.email, reference: customer.reference },
      profile: profile,
      consent: customer.consent,
    });
    toast({ title: "Demonstration export downloaded", message: "No server-side data request was created.", tone: "info" });
  }

  function requestClosure() {
    if (closureReason.trim().length < 10) {
      toast({ title: "Add a reason", message: "Please provide at least 10 characters.", tone: "warning" });
      return;
    }
    setClosureRequested(true);
    setClosureModal(false);
    toast({ title: "Closure request recorded for demonstration", message: "No account has been closed. A live process requires review and confirmation.", tone: "info" });
  }

  return (
    <div className="app-page">
      <PageHeader eyebrow="Account" title="Settings" description="Manage your account, security, notifications, appearance, privacy and active sessions." />
      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          {navigation.map((item) => {
            const Icon = item.icon;
            return <button type="button" key={item.value} className={tab === item.value ? "is-active" : ""} onClick={() => setTab(item.value)}><Icon size={16} /> {item.label}</button>;
          })}
        </nav>

        <div className="settings-content">
          {tab === "account" ? (
            <form className="settings-panel" onSubmit={saveProfile}>
              <div className="settings-panel-head"><div><h2>Account preferences</h2><p>Contact details and regional settings.</p></div>{saved ? <span className="badge badge-emerald"><Check size={12} /> Staged</span> : null}</div>
              <div className="flex-center" style={{ marginBottom: 18 }}><Avatar name={customer.name} size="md" /><div><strong style={{ display: "block", fontSize: "0.82rem" }}>{customer.name}</strong><span style={{ color: "var(--text-tertiary)", fontSize: "0.68rem" }}>{customer.reference} · {customer.accountStatus}</span></div><StatusBadge status="Verified" className="ml-auto" /></div>
              <div className="form-grid two">
                <Input label="Email address" name="settingsEmail" type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} />
                <Input label="Phone number" name="settingsPhone" type="tel" value={profile.phone} onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))} />
                <Select label="Language" name="language" value={profile.language} onChange={(event) => setProfile((current) => ({ ...current, language: event.target.value }))} options={["English (UK)", "English (US)", "French"]} />
                <Select label="Time zone" name="timezone" value={profile.timezone} onChange={(event) => setProfile((current) => ({ ...current, timezone: event.target.value }))} options={["Africa/Lagos", "Africa/Accra", "Africa/Nairobi", "Europe/London"]} />
              </div>
              <div className="form-actions"><button type="submit" className="btn btn-primary">Save preferences</button></div>
            </form>
          ) : null}

          {tab === "security" ? (
            <>
              <section className="settings-panel">
                <div className="settings-panel-head"><div><h2>Change password</h2><p>Use a unique password you do not use on another service.</p></div><LockKeyhole size={18} style={{ color: "var(--brand-700)" }} /></div>
                <form onSubmit={changePassword} className="stack">
                  <PasswordInput label="Current password" name="currentPassword" value={password.current} onChange={(event) => setPassword((current) => ({ ...current, current: event.target.value }))} error={passwordErrors.current} autoComplete="current-password" />
                  <PasswordInput label="New password" name="newPassword" value={password.next} onChange={(event) => setPassword((current) => ({ ...current, next: event.target.value }))} error={passwordErrors.next} autoComplete="new-password" />
                  <PasswordStrength password={password.next} />
                  <PasswordInput label="Confirm new password" name="confirmPassword" value={password.confirm} onChange={(event) => setPassword((current) => ({ ...current, confirm: event.target.value }))} error={passwordErrors.confirm} autoComplete="new-password" />
                  <div className="form-actions"><button type="submit" className="btn btn-primary">Update password</button></div>
                </form>
              </section>
              <section className="settings-panel">
                <div className="settings-panel-head"><div><h2>Two-factor authentication</h2><p>Add a second step when signing in on a new device.</p></div><StatusBadge status={twoFactor ? "Active" : "Not enabled"} /></div>
                <div className="flex-between">
                  <div className="flex-center"><span className="verification-status-row" style={{ border: 0, padding: 0 }}><span><ShieldCheck size={14} /></span></span><div><strong style={{ display: "block", fontSize: "0.8rem" }}>Authenticator app</strong><span style={{ color: "var(--text-tertiary)", fontSize: "0.67rem" }}>{twoFactor ? "Configured on 18 Oct 2026" : "Not configured"}</span></div></div>
                  <button type="button" className={twoFactor ? "btn btn-outline btn-sm" : "btn btn-primary btn-sm"} onClick={() => setTwoFactorModal(true)}>{twoFactor ? "Manage" : "Set up"}</button>
                </div>
                <div className="info-note" style={{ marginTop: 15 }}><AlertTriangle size={16} /><span>If you lose access to your authenticator, recovery requires identity verification. Keep backup codes in a safe place.</span></div>
              </section>
            </>
          ) : null}

          {tab === "notifications" ? (
            <section className="settings-panel">
              <div className="settings-panel-head"><div><h2>Notification preferences</h2><p>Choose which channels may be used for each type of update.</p></div></div>
              <div className="preferences-table">
                <div className="preferences-row header"><span>Category</span><span>Email</span><span>SMS</span><span>In-app</span></div>
                {preferences.map((item) => (
                  <div className="preferences-row" key={item.id}>
                    <div><strong>{item.label}</strong><small>{item.description}</small></div>
                    {["email", "sms", "inApp"].map((channel) => (
                      <button type="button" key={channel} role="switch" aria-checked={item[channel]} aria-label={`${item.label} ${channel}`} className={cn("toggle-switch", item[channel] && "is-on")} onClick={() => togglePreference(item.id, channel)} disabled={item.locked}><span /></button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="info-note" style={{ marginTop: 15 }}><Bell size={16} /><span>Security alerts cannot be disabled. Changes to preferences are staged locally in this demonstration.</span></div>
            </section>
          ) : null}

          {tab === "appearance" ? (
            <section className="settings-panel">
              <div className="settings-panel-head"><div><h2>Appearance</h2><p>Choose a theme. Your preference is saved on this device and applied across the platform.</p></div></div>
              <div className="theme-choice-grid">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button type="button" key={option.value} className={cn("theme-choice", theme === option.value && "is-selected")} onClick={() => { setTheme(option.value); toast({ title: `${option.label} theme applied`, message: "Theme preference saved on this device.", tone: "success" }); }} aria-pressed={theme === option.value}>
                      <span className={`theme-swatch theme-swatch-${option.value}`}><span /><span /><span /></span>
                      <span className="theme-choice-copy"><Icon size={16} /><strong>{option.label}</strong><small>{option.description}</small></span>
                      {theme === option.value ? <span className="theme-choice-check"><Check size={13} /></span> : null}
                    </button>
                  );
                })}
              </div>
              <div className="info-note" style={{ marginTop: 16 }}><Palette size={16} /><span>Theme changes apply immediately and persist between visits. System mode follows your operating-system preference.</span></div>
            </section>
          ) : null}

          {tab === "privacy" ? (
            <>
              <section className="settings-panel">
                <div className="settings-panel-head"><div><h2>Privacy and data</h2><p>Review your consent record and request a copy of your information.</p></div></div>
                <div className="info-grid">
                  <div className="info-row"><span>Terms version</span><strong>{customer.consent.termsVersion}</strong></div>
                  <div className="info-row"><span>Privacy version</span><strong>{customer.consent.privacyVersion}</strong></div>
                  <div className="info-row"><span>Risk disclosure</span><strong>{customer.consent.riskVersion}</strong></div>
                  <div className="info-row"><span>Consent recorded</span><strong>12 Mar 2024</strong></div>
                </div>
                <div className="form-actions"><button type="button" className="btn btn-outline" onClick={exportData}><Download size={15} /> Download my data</button><a href="/privacy-policy" className="btn btn-ghost">Read privacy policy</a></div>
              </section>
              <section className="settings-panel">
                <div className="settings-panel-head"><div><h2>Cookie preferences</h2><p>Essential cookies are always required for secure sign-in.</p></div></div>
                <div className="stack">
                  <div className="flex-between"><div><strong style={{ fontSize: "0.8rem" }}>Essential</strong><p className="small muted">Security, session and fraud prevention.</p></div><span className="badge badge-emerald">Always on</span></div>
                  <div className="flex-between"><div><strong style={{ fontSize: "0.8rem" }}>Analytics</strong><p className="small muted">Aggregate performance measurement.</p></div><span className="badge badge-neutral">Not enabled</span></div>
                  <div className="flex-between"><div><strong style={{ fontSize: "0.8rem" }}>Marketing</strong><p className="small muted">Advertising and behavioural profiling.</p></div><span className="badge badge-neutral">Not enabled</span></div>
                </div>
                <a href="/cookie-policy" className="text-link" style={{ marginTop: 14 }}>Cookie policy <Download size={13} /></a>
              </section>
            </>
          ) : null}

          {tab === "sessions" ? (
            <section className="settings-panel">
              <div className="settings-panel-head"><div><h2>Active sessions</h2><p>Review the devices currently able to access your account.</p></div><button type="button" className="btn btn-outline btn-sm" onClick={() => { setSessions((current) => current.filter((session) => session.current)); toast({ title: "Other sessions revoked (demonstration)", tone: "success" }); }}><LogOut size={14} /> Revoke others</button></div>
              <div>
                {sessions.map((session) => (
                  <div className="session-row" key={session.id}>
                    <span className="session-icon">{session.device.includes("iPhone") ? <Smartphone size={16} /> : <Monitor size={16} />}</span>
                    <div className="session-copy"><strong>{session.device}{session.current ? " · Current" : ""}</strong><span>{session.location} · {session.ip} · {session.lastActive}</span></div>
                    {session.current ? <span className="badge badge-emerald">This device</span> : <button type="button" className="text-button" onClick={() => revokeSession(session.id)}>Revoke</button>}
                  </div>
                ))}
              </div>
              <div className="info-note" style={{ marginTop: 15 }}><Laptop size={16} /><span>If you do not recognise a session, revoke it and contact support immediately. Session revocation is local to this demonstration.</span></div>
            </section>
          ) : null}

          {tab === "closure" ? (
            <section className="settings-panel" style={{ borderColor: "color-mix(in srgb, var(--danger) 25%, var(--border))" }}>
              <div className="settings-panel-head"><div><h2>Close your account</h2><p>Account closure is a controlled process. It is not instant and may affect open investments or loans.</p></div><AlertTriangle size={18} style={{ color: "var(--danger)" }} /></div>
              {closureRequested ? (
                <div className="info-note is-warning"><ShieldCheck size={16} /><span>Closure request recorded for this demonstration. No account has been closed. A live team would review open positions, fees and regulatory retention requirements before proceeding.</span></div>
              ) : (
                <>
                  <ul className="detail-list" style={{ gridTemplateColumns: "1fr" }}>
                    <li><AlertTriangle size={14} /> Any active investment or loan must be resolved first.</li>
                    <li><AlertTriangle size={14} /> Records may be retained where law or regulation requires it.</li>
                    <li><AlertTriangle size={14} /> Statements and tax documents should be downloaded before closure.</li>
                  </ul>
                  <button type="button" className="btn btn-danger" style={{ marginTop: 16 }} onClick={() => setClosureModal(true)}>Request account closure</button>
                </>
              )}
            </section>
          ) : null}
        </div>
      </div>

      <Modal open={twoFactorModal} onClose={() => setTwoFactorModal(false)} title={twoFactor ? "Manage two-factor authentication" : "Set up two-factor authentication"} description="Demonstration only. No authenticator is provisioned." footer={<><button type="button" className="btn btn-ghost" onClick={() => setTwoFactorModal(false)}>Cancel</button><button type="button" className="btn btn-primary" onClick={() => { setTwoFactor((value) => !value); setTwoFactorModal(false); toast({ title: "Two-factor preference updated locally", message: "No real security setting changed.", tone: "info" }); }}>{twoFactor ? "Disable in demo" : "Enable in demo"}</button></>}>
        <div className="stack">
          <div className="info-note"><ShieldCheck size={16} /><span>In production, setup would require a time-based one-time password, verification and recovery-code generation. Frontend state alone is not a security control.</span></div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{twoFactor ? "Two-factor authentication is shown as active. Disabling it would reduce account protection." : "Set up an authenticator app to add a second verification step."}</p>
        </div>
      </Modal>

      <Modal open={closureModal} onClose={() => setClosureModal(false)} title="Request account closure" description="This does not close your account. It records a demonstration request for review." footer={<><button type="button" className="btn btn-ghost" onClick={() => setClosureModal(false)}>Cancel</button><button type="button" className="btn btn-danger" onClick={requestClosure}>Submit request</button></>}>
        <label className="field">
          <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>Reason for closure</span>
          <textarea className="textarea" rows={4} aria-label="Reason for account closure" value={closureReason} onChange={(event) => setClosureReason(event.target.value)} placeholder="Let us know why you are requesting closure." />
        </label>
        <div className="info-note is-warning" style={{ marginTop: 14 }}><AlertTriangle size={16} /><span>Open investments, loans and retained records may prevent immediate closure.</span></div>
      </Modal>
    </div>
  );
}
