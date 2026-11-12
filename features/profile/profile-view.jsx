"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, Camera, CheckCircle2, Pencil, ShieldCheck, Upload } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs } from "@/components/ui/tabs";
import { Input, Select } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { customer, documents } from "@/lib/data/customer";
import { formatDate } from "@/lib/utils/format";

const tabs = [
  { value: "personal", label: "Personal" },
  { value: "address", label: "Address" },
  { value: "bank", label: "Bank" },
  { value: "kin", label: "Next of kin" },
  { value: "employment", label: "Employment" },
  { value: "verification", label: "Verification" },
];

export function ProfileView() {
  const [tab, setTab] = useState("personal");
  const [profile, setProfile] = useState(customer);
  const [errors, setErrors] = useState({});
  const [photoName, setPhotoName] = useState("");
  const { toast } = useToast();

  function save(event) {
    event.preventDefault();
    const next = {};
    if (tab === "personal") {
      if (!profile.firstName.trim()) next.firstName = "First name is required.";
      if (!profile.lastName.trim()) next.lastName = "Last name is required.";
      if (!profile.email.includes("@")) next.email = "Enter a valid email address.";
    }
    if (tab === "kin" && !profile.nextOfKin.name.trim()) next.kinName = "Next-of-kin name is required.";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast({ title: "Profile changes staged", message: "This demonstration does not transmit the update. In production, sensitive changes require backend review.", tone: "info" });
  }

  function onPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    toast({ title: "Profile photo staged", message: "No image was uploaded to a server.", tone: "info" });
  }

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Keep your personal details, contact information and verification record current. Sensitive changes may require additional review."
        actions={<Link href="/dashboard/settings" className="btn btn-outline"><Pencil size={15} /> Account settings</Link>}
      />

      <section className="profile-cover">
        <Avatar name={profile.name} size="lg" tone="emerald" />
        <div className="profile-cover-copy">
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p>{profile.email} · Client since {formatDate(profile.memberSince)}</p>
          <span className="badge badge-emerald"><BadgeCheck size={12} /> KYC verified</span>
        </div>
        <div className="profile-photo-action">
          <label className="btn btn-outline btn-sm" style={{ cursor: "pointer" }}>
            <Camera size={14} /> {photoName ? "Photo selected" : "Change photo"}
            <input type="file" accept="image/jpeg,image/png" className="sr-only" onChange={onPhoto} />
          </label>
        </div>
      </section>

      <div className="settings-layout" style={{ marginTop: 16 }}>
        <nav className="settings-nav" aria-label="Profile sections">
          {tabs.map((item) => <button type="button" key={item.value} className={tab === item.value ? "is-active" : ""} onClick={() => { setTab(item.value); setErrors({}); }}>{item.label}</button>)}
          <div className="sidebar-card" style={{ marginTop: 10 }}>
            <p style={{ margin: 0 }}>Profile completeness</p>
            <div className="flex-between" style={{ marginTop: 6 }}><strong style={{ fontSize: "1.4rem" }}>{profile.profileComplete}%</strong><span className="badge badge-forest">Good</span></div>
            <div className="progress" style={{ marginTop: 8 }}><span style={{ width: `${profile.profileComplete}%` }} /></div>
            <p style={{ marginTop: 8 }}>Add a profile photo and confirm source of funds to improve completeness.</p>
          </div>
        </nav>

        <div className="settings-content">
          <form className="settings-panel" onSubmit={save}>
            {tab === "personal" ? (
              <>
                <div className="settings-panel-head"><div><h2>Personal information</h2><p>Your legal name and contact details. Name changes require documentary evidence.</p></div><StatusBadge status="Verified" /></div>
                <div className="form-grid two">
                  <Input label="First name" name="firstName" value={profile.firstName} onChange={(event) => setProfile((current) => ({ ...current, firstName: event.target.value }))} error={errors.firstName} required />
                  <Input label="Last name" name="lastName" value={profile.lastName} onChange={(event) => setProfile((current) => ({ ...current, lastName: event.target.value }))} error={errors.lastName} required />
                  <Input label="Middle name" name="middleName" value={profile.middleName} onChange={(event) => setProfile((current) => ({ ...current, middleName: event.target.value }))} />
                  <Input label="Date of birth" name="dob" type="date" value={profile.dob} disabled hint="Date of birth cannot be edited online." />
                  <Input label="Email address" name="profileEmail" type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} error={errors.email} required />
                  <Input label="Phone number" name="profilePhone" type="tel" value={profile.phone} onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))} />
                  <Select label="Preferred contact" name="preferredContact" value={profile.preferredContact} onChange={(event) => setProfile((current) => ({ ...current, preferredContact: event.target.value }))} options={["Email", "Phone", "SMS", "WhatsApp"]} />
                  <Input label="Nationality" name="nationality" value={profile.nationality} disabled hint="Contact support to update verified personal details." />
                </div>
              </>
            ) : null}
            {tab === "address" ? (
              <>
                <div className="settings-panel-head"><div><h2>Residential address</h2><p>Your verified residential address. A change may require new proof of address.</p></div><StatusBadge status="Verified" /></div>
                <div className="form-grid two">
                  <Input label="Country" name="country" value={profile.country} onChange={(event) => setProfile((current) => ({ ...current, country: event.target.value }))} />
                  <Input label="State or region" name="state" value={profile.state} onChange={(event) => setProfile((current) => ({ ...current, state: event.target.value }))} />
                  <Input label="City" name="city" value={profile.city} onChange={(event) => setProfile((current) => ({ ...current, city: event.target.value }))} />
                  <Input label="Postal code" name="postalCode" value={profile.postalCode} onChange={(event) => setProfile((current) => ({ ...current, postalCode: event.target.value }))} />
                  <Input className="full" label="Street address" name="address" value={profile.address} onChange={(event) => setProfile((current) => ({ ...current, address: event.target.value }))} />
                  <Select label="Residential status" name="residentialStatus" value={profile.residentialStatus} onChange={(event) => setProfile((current) => ({ ...current, residentialStatus: event.target.value }))} options={["Owner-occupied", "Rented", "Living with family", "Other"]} />
                </div>
                <div className="info-note is-warning" style={{ marginTop: 16 }}><ShieldCheck size={16} /><span>Changing your address may require a new proof-of-address review before payments or statements are reissued.</span></div>
              </>
            ) : null}
            {tab === "bank" ? (
              <>
                <div className="settings-panel-head"><div><h2>Bank information</h2><p>Your settlement account. Details are masked; changes require additional verification.</p></div><StatusBadge status="Verified" /></div>
                <div className="info-grid">
                  <div className="info-row"><span>Bank</span><strong>{profile.bank.bankName}</strong></div>
                  <div className="info-row"><span>Account name</span><strong>{profile.bank.accountName}</strong></div>
                  <div className="info-row"><span>Account number</span><strong className="mono">{profile.bank.accountNumberMasked}</strong></div>
                  <div className="info-row"><span>Account type</span><strong>{profile.bank.accountType}</strong></div>
                  <div className="info-row"><span>Sort code</span><strong>{profile.bank.sortCode}</strong></div>
                  <div className="info-row"><span>Country</span><strong>{profile.bank.country}</strong></div>
                </div>
                <div className="info-note is-warning" style={{ marginTop: 16 }}><ShieldCheck size={16} /><span>For your protection, bank changes are not made through a simple form. A verification call and supporting evidence are required.</span></div>
                <Link href="/dashboard/support" className="btn btn-primary" style={{ marginTop: 16 }}>Request a bank change</Link>
              </>
            ) : null}
            {tab === "kin" ? (
              <>
                <div className="settings-panel-head"><div><h2>Next of kin</h2><p>Emergency contact details. This is not a beneficiary nomination.</p></div></div>
                <div className="form-grid two">
                  <Input label="Full name" name="kinName" value={profile.nextOfKin.name} onChange={(event) => setProfile((current) => ({ ...current, nextOfKin: { ...current.nextOfKin, name: event.target.value } }))} error={errors.kinName} />
                  <Select label="Relationship" name="kinRelationship" value={profile.nextOfKin.relationship} onChange={(event) => setProfile((current) => ({ ...current, nextOfKin: { ...current.nextOfKin, relationship: event.target.value } }))} options={["Spouse", "Partner", "Parent", "Sibling", "Child", "Friend", "Other"]} />
                  <Input label="Phone" name="kinPhone" type="tel" value={profile.nextOfKin.phone} onChange={(event) => setProfile((current) => ({ ...current, nextOfKin: { ...current.nextOfKin, phone: event.target.value } }))} />
                  <Input label="Email" name="kinEmail" type="email" value={profile.nextOfKin.email} onChange={(event) => setProfile((current) => ({ ...current, nextOfKin: { ...current.nextOfKin, email: event.target.value } }))} />
                  <Input className="full" label="Address" name="kinAddress" value={profile.nextOfKin.address} onChange={(event) => setProfile((current) => ({ ...current, nextOfKin: { ...current.nextOfKin, address: event.target.value } }))} />
                </div>
              </>
            ) : null}
            {tab === "employment" ? (
              <>
                <div className="settings-panel-head"><div><h2>Employment information</h2><p>Used for suitability and affordability assessments. Material changes should be kept current.</p></div></div>
                <div className="form-grid two">
                  <Input label="Employment status" name="employmentStatus" value={profile.employmentStatus} onChange={(event) => setProfile((current) => ({ ...current, employmentStatus: event.target.value }))} />
                  <Input label="Occupation" name="occupation" value={profile.occupation} onChange={(event) => setProfile((current) => ({ ...current, occupation: event.target.value }))} />
                  <Input label="Employer" name="employer" value={profile.employer} onChange={(event) => setProfile((current) => ({ ...current, employer: event.target.value }))} />
                  <Input label="Industry" name="industry" value={profile.industry} onChange={(event) => setProfile((current) => ({ ...current, industry: event.target.value }))} />
                  <Select label="Income range" name="incomeRange" value={profile.incomeRange} onChange={(event) => setProfile((current) => ({ ...current, incomeRange: event.target.value }))} options={["Under ₦5m", "₦5m – ₦10m", "₦10m – ₦25m", "₦25m – ₦50m", "Over ₦50m"]} />
                  <Select label="Investment experience" name="experience" value={profile.investmentExperience} onChange={(event) => setProfile((current) => ({ ...current, investmentExperience: event.target.value }))} options={["None", "Less than 2 years", "2–5 years", "5–10 years", "Over 10 years"]} />
                  <Input label="Source of funds" name="sourceOfFunds" value={profile.sourceOfFunds} onChange={(event) => setProfile((current) => ({ ...current, sourceOfFunds: event.target.value }))} />
                  <Input label="Source of wealth" name="sourceOfWealth" value={profile.sourceOfWealth} onChange={(event) => setProfile((current) => ({ ...current, sourceOfWealth: event.target.value }))} />
                </div>
              </>
            ) : null}
            {tab === "verification" ? (
              <>
                <div className="settings-panel-head"><div><h2>Verification status</h2><p>Only authorised reviewers can change verification outcomes.</p></div><ShieldCheck size={18} style={{ color: "var(--success)" }} /></div>
                <div className="verification-status-list">
                  <div className="verification-status-row"><span><CheckCircle2 size={14} /></span><div><strong>Identity verification</strong><small>International passport · reviewed {formatDate("2024-03-12")}</small></div><StatusBadge status="Verified" /></div>
                  <div className="verification-status-row"><span><CheckCircle2 size={14} /></span><div><strong>Address verification</strong><small>Utility bill · reviewed 22 Oct 2026</small></div><StatusBadge status="Verified" /></div>
                  <div className="verification-status-row"><span className="warning"><Upload size={14} /></span><div><strong>Source of funds</strong><small>Additional evidence requested</small></div><StatusBadge status="Action required" /></div>
                  <div className="verification-status-row"><span><CheckCircle2 size={14} /></span><div><strong>Bank verification</strong><small>Account ending 4821</small></div><StatusBadge status="Verified" /></div>
                </div>
                <div className="detail-document-list" style={{ marginTop: 18 }}>
                  {documents.filter((document) => ["Identity", "Address", "Compliance"].includes(document.category)).map((document) => (
                    <div className="detail-document" key={document.id}><span className="detail-document-icon"><ShieldCheck size={14} /></span><div className="detail-document-copy"><strong>{document.name}</strong><span>{document.category} · {document.status}</span></div><StatusBadge status={document.status} /></div>
                  ))}
                </div>
                <Link href="/dashboard/documents" className="btn btn-outline" style={{ marginTop: 14 }}>Manage documents</Link>
              </>
            ) : null}

            {!["bank", "verification"].includes(tab) ? (
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => { setProfile(customer); setErrors({}); toast({ title: "Changes discarded", tone: "info" }); }}>Discard</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
