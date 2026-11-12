"use client";

import { Info, Pencil, ShieldCheck, Target } from "lucide-react";
import { Input, Select } from "@/components/ui/form-field";
import { PasswordStrength } from "@/components/ui/password-strength";
import { FileUpload } from "@/components/forms/file-upload";
import {
  addressDocTypes, categoryOptions, countries, identityTypes, objectiveOptions,
} from "./onboarding-data";

function Grid({ children }) {
  return <div className="onboarding-form-grid">{children}</div>;
}

function Head({ icon: HeadingIcon, title, text }) {
  return (
    <div className="onboarding-subhead">
      <span className="onboarding-subhead-icon"><HeadingIcon size={18} /></span>
      <div><h2>{title}</h2><p>{text}</p></div>
    </div>
  );
}

function ReviewField({ label, value }) {
  return <div className="review-field"><span>{label}</span><strong>{value || "—"}</strong></div>;
}

function FieldError({ children }) {
  return children ? <p className="field-error" role="alert" style={{ marginTop: 6 }}>{children}</p> : null;
}

export function OnboardingStep({ step, data, setField, goTo, errors }) {
  const e = (key) => errors[key];

  if (step === 0) {
    return (
      <>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Your account details" text="These details identify your account. Your email and phone must be reachable." />
          <Grid>
            <Input label="First name" name="firstName" value={data.account.firstName} onChange={(event) => setField("account", "firstName", event.target.value)} error={e("firstName")} autoComplete="given-name" required />
            <Input label="Middle name" name="middleName" value={data.account.middleName} onChange={(event) => setField("account", "middleName", event.target.value)} autoComplete="additional-name" />
            <Input label="Last name" name="lastName" value={data.account.lastName} onChange={(event) => setField("account", "lastName", event.target.value)} error={e("lastName")} autoComplete="family-name" required />
            <Input label="Email address" name="email" type="email" value={data.account.email} onChange={(event) => setField("account", "email", event.target.value)} error={e("email")} autoComplete="email" required />
            <Input label="Phone number" name="phone" type="tel" value={data.account.phone} onChange={(event) => setField("account", "phone", event.target.value)} error={e("phone")} autoComplete="tel" required />
            <Select label="Preferred contact method" name="preferredContact" value={data.account.preferredContact} onChange={(event) => setField("account", "preferredContact", event.target.value)} options={["Email", "Phone", "SMS", "WhatsApp"]} required />
          </Grid>
        </div>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Account security" text="Set a new password if required. Passwords are never stored in your saved draft." />
          <Grid>
            <Input label="New password (optional)" name="password" type="password" value={data.account.password} onChange={(event) => setField("account", "password", event.target.value)} autoComplete="new-password" error={e("password")} hint="Leave blank to keep the existing credential." />
            <Input label="Confirm password" name="confirmPassword" type="password" value={data.account.confirmPassword} onChange={(event) => setField("account", "confirmPassword", event.target.value)} autoComplete="new-password" error={e("confirmPassword")} />
          </Grid>
          {data.account.password ? <PasswordStrength password={data.account.password} /> : null}
          <div className="onboarding-help"><ShieldCheck size={14} /> The demonstration never stores a password or sends it to a server.</div>
        </div>
      </>
    );
  }

  if (step === 1) {
    return (
      <div className="onboarding-card">
        <Head icon={ShieldCheck} title="Personal details" text="We collect only what is required for verification, suitability and legal obligations." />
        <Grid>
          <Input label="Date of birth" name="dob" type="date" value={data.personal.dob} onChange={(event) => setField("personal", "dob", event.target.value)} error={e("dob")} required />
          <Select label="Gender" name="gender" value={data.personal.gender} onChange={(event) => setField("personal", "gender", event.target.value)} options={["Male", "Female", "Non-binary", "Prefer not to say"]} required />
          <Select label="Marital status" name="maritalStatus" value={data.personal.maritalStatus} onChange={(event) => setField("personal", "maritalStatus", event.target.value)} options={["Single", "Married", "Civil partnership", "Divorced", "Widowed", "Prefer not to say"]} />
          <Select label="Nationality" name="nationality" value={data.personal.nationality} onChange={(event) => setField("personal", "nationality", event.target.value)} options={["Nigerian", "Ghanaian", "Kenyan", "South African", "British", "Other"]} error={e("nationality")} required />
          <Select label="Country of residence" name="personalCountry" value={data.personal.country} onChange={(event) => setField("personal", "country", event.target.value)} options={countries} error={e("country")} required />
          <Select label="Employment status" name="employmentStatus" value={data.personal.employmentStatus} onChange={(event) => setField("personal", "employmentStatus", event.target.value)} options={["Employed", "Self-employed", "Business owner", "Retired", "Student", "Unemployed"]} error={e("employmentStatus")} required />
          <Input label="Occupation" name="occupation" value={data.personal.occupation} onChange={(event) => setField("personal", "occupation", event.target.value)} error={e("occupation")} required />
        </Grid>
        <div className="onboarding-help"><Info size={14} /> Your date of birth is used for eligibility checks and is not shown on a public profile.</div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="onboarding-card">
        <Head icon={ShieldCheck} title="Where do you live?" text="Use your current residential address. A P.O. box cannot be accepted as proof of address." />
        <Grid>
          <Select label="Country" name="addressCountry" value={data.address.country} onChange={(event) => setField("address", "country", event.target.value)} options={countries} error={e("addressCountry")} required />
          <Input label="State or region" name="state" value={data.address.state} onChange={(event) => setField("address", "state", event.target.value)} error={e("state")} required />
          <Input label="City" name="city" value={data.address.city} onChange={(event) => setField("address", "city", event.target.value)} error={e("city")} required />
          <Input label="Postal code" name="postalCode" value={data.address.postalCode} onChange={(event) => setField("address", "postalCode", event.target.value)} error={e("postalCode")} autoComplete="postal-code" required />
          <Input className="full" label="Street address" name="street" value={data.address.street} onChange={(event) => setField("address", "street", event.target.value)} error={e("street")} autoComplete="street-address" required />
          <Select label="Residential status" name="residentialStatus" value={data.address.residentialStatus} onChange={(event) => setField("address", "residentialStatus", event.target.value)} options={["Owner-occupied", "Rented", "Living with family", "Other"]} required />
        </Grid>
        <div className="info-note" style={{ marginTop: 17 }}><Info size={16} /><span>Your address must match the proof-of-address document you upload later.</span></div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="onboarding-card">
        <Head icon={ShieldCheck} title="Next of kin" text="Someone we can contact if we cannot reach you. This is not a beneficiary nomination." />
        <Grid>
          <Input label="Full name" name="kinName" value={data.kin.name} onChange={(event) => setField("kin", "name", event.target.value)} error={e("kinName")} required />
          <Select label="Relationship" name="relationship" value={data.kin.relationship} onChange={(event) => setField("kin", "relationship", event.target.value)} options={["Spouse", "Partner", "Parent", "Sibling", "Child", "Friend", "Other"]} error={e("relationship")} required />
          <Input label="Phone number" name="kinPhone" type="tel" value={data.kin.phone} onChange={(event) => setField("kin", "phone", event.target.value)} error={e("kinPhone")} required />
          <Input label="Email address" name="kinEmail" type="email" value={data.kin.email} onChange={(event) => setField("kin", "email", event.target.value)} error={e("kinEmail")} required />
          <Input className="full" label="Address" name="kinAddress" value={data.kin.address} onChange={(event) => setField("kin", "address", event.target.value)} required />
        </Grid>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="onboarding-card">
        <Head icon={ShieldCheck} title="Employment and finances" text="This helps us understand affordability and source of funds. We may request evidence." />
        <Grid>
          <Select label="Employment type" name="employmentType" value={data.financial.employmentType} onChange={(event) => setField("financial", "employmentType", event.target.value)} options={["Employed", "Self-employed", "Business owner", "Retired", "Student", "Other"]} error={e("employmentType")} required />
          <Input label="Employer or business" name="employer" value={data.financial.employer} onChange={(event) => setField("financial", "employer", event.target.value)} error={e("employer")} required />
          <Input label="Occupation" name="financialOccupation" value={data.financial.occupation} onChange={(event) => setField("financial", "occupation", event.target.value)} required />
          <Select label="Annual income range" name="income" value={data.financial.income} onChange={(event) => setField("financial", "income", event.target.value)} options={["Under ₦5m", "₦5m – ₦10m", "₦10m – ₦25m", "₦25m – ₦50m", "Over ₦50m", "Prefer not to say"]} error={e("income")} required />
          <Select label="Source of funds" name="sourceFunds" value={data.financial.sourceFunds} onChange={(event) => setField("financial", "sourceFunds", event.target.value)} options={["Salary", "Business income", "Professional income", "Investments", "Inheritance", "Other"]} error={e("sourceFunds")} required />
          <Select label="Source of wealth, where required" name="sourceWealth" value={data.financial.sourceWealth} onChange={(event) => setField("financial", "sourceWealth", event.target.value)} options={["Business ownership", "Salary savings", "Investments", "Inheritance", "Property sale", "Other"]} />
          <Select label="Investment experience" name="experience" value={data.financial.experience} onChange={(event) => setField("financial", "experience", event.target.value)} options={["None", "Less than 2 years", "2–5 years", "5–10 years", "Over 10 years"]} error={e("experience")} required />
        </Grid>
      </div>
    );
  }

  if (step === 5) {
    return (
      <>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Identity document" text="Provide a clear, unredacted document with all four corners visible." />
          <Grid>
            <Select label="Document type" name="documentType" value={data.identity.documentType} onChange={(event) => setField("identity", "documentType", event.target.value)} options={identityTypes} error={e("documentType")} required />
            <Input label="Document number" name="documentNumber" value={data.identity.documentNumber} onChange={(event) => setField("identity", "documentNumber", event.target.value)} error={e("documentNumber")} required />
            <Select label="Issuing country" name="issuingCountry" value={data.identity.issuingCountry} onChange={(event) => setField("identity", "issuingCountry", event.target.value)} options={countries} required />
            <Input label="Expiry date" name="expiry" type="date" value={data.identity.expiry} onChange={(event) => setField("identity", "expiry", event.target.value)} error={e("expiry")} required />
          </Grid>
        </div>
        <FileUpload id="identity-upload" label="Upload identity document" value={data.identity.file} onChange={(value) => setField("identity", "file", value)} required />
        <FieldError>{e("identityFile")}</FieldError>
        <div className="info-note"><ShieldCheck size={17} /><span>Files are access-controlled and reviewed by an authorised KYC reviewer. No upload occurs in this demonstration.</span></div>
      </>
    );
  }

  if (step === 6) {
    return (
      <>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Proof of address" text="Upload a document issued within the last three months showing your name and address." />
          <Select label="Document type" name="addressDocType" value={data.addressVerification.documentType} onChange={(event) => setField("addressVerification", "documentType", event.target.value)} options={addressDocTypes} required />
        </div>
        <FileUpload id="address-upload" label="Upload proof of address" value={data.addressVerification.file} onChange={(value) => setField("addressVerification", "file", value)} required />
        <FieldError>{e("addressFile")}</FieldError>
        <div className="info-note"><Info size={16} /><span>Mobile phone bills and P.O. box documents may not be accepted. Requirements are configurable by jurisdiction.</span></div>
      </>
    );
  }

  if (step === 7) {
    return (
      <>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Bank account" text="This account will be used for funding, distributions and withdrawals. It should be in your name." />
          <Grid>
            <Input label="Bank name" name="bankName" value={data.bank.bankName} onChange={(event) => setField("bank", "bankName", event.target.value)} error={e("bankName")} required />
            <Input label="Account name" name="accountName" value={data.bank.accountName} onChange={(event) => setField("bank", "accountName", event.target.value)} error={e("accountName")} required />
            <Input label="Account number" name="accountNumber" value={data.bank.accountNumber} onChange={(event) => setField("bank", "accountNumber", event.target.value.replace(/[^\d]/g, ""))} error={e("accountNumber")} inputMode="numeric" required />
            <Select label="Account type" name="accountType" value={data.bank.accountType} onChange={(event) => setField("bank", "accountType", event.target.value)} options={["Current", "Savings", "Business"]} required />
            <Select label="Country" name="bankCountry" value={data.bank.country} onChange={(event) => setField("bank", "country", event.target.value)} options={countries} required />
            <Input label="Sort code / routing details" name="sortCode" value={data.bank.sortCode} onChange={(event) => setField("bank", "sortCode", event.target.value)} />
          </Grid>
        </div>
        <div className="info-note is-warning"><ShieldCheck size={17} /><span>Sensitive bank details are masked after submission. Bank changes require additional verification and are never made silently.</span></div>
      </>
    );
  }

  if (step === 8) {
    return (
      <>
        <div className="onboarding-card">
          <Head icon={Target} title="Investment objectives" text="Select all that apply. This is customer profiling, not personalised financial advice." />
          <div className="choice-chips" role="group" aria-label="Investment objectives">
            {objectiveOptions.map((objective) => (
              <label className="choice-chip" key={objective}>
                <input type="checkbox" checked={data.preferences.objectives.includes(objective)} onChange={(event) => setField("preferences", "objectives", event.target.checked ? [...data.preferences.objectives, objective] : data.preferences.objectives.filter((item) => item !== objective))} />
                <span>{objective}</span>
              </label>
            ))}
          </div>
          <FieldError>{e("objectives")}</FieldError>
          <Grid>
            <Select label="Investment horizon" name="horizon" value={data.preferences.horizon} onChange={(event) => setField("preferences", "horizon", event.target.value)} options={["Under 1 year", "1–3 years", "3–5 years", "5–10 years", "Over 10 years"]} error={e("horizon")} required />
            <Select label="Preferred communication" name="communication" value={data.preferences.communication} onChange={(event) => setField("preferences", "communication", event.target.value)} options={["Email", "Phone", "SMS", "In-app"]} required />
          </Grid>
          <div style={{ marginTop: 20 }}>
            <p className="otp-label" style={{ marginBottom: 8 }}>Preferred investment categories *</p>
            <div className="choice-chips" role="group" aria-label="Preferred categories">
              {categoryOptions.map((category) => (
                <label className="choice-chip" key={category}>
                  <input type="checkbox" checked={data.preferences.categories.includes(category)} onChange={(event) => setField("preferences", "categories", event.target.checked ? [...data.preferences.categories, category] : data.preferences.categories.filter((item) => item !== category))} />
                  <span>{category}</span>
                </label>
              ))}
            </div>
            <FieldError>{e("categories")}</FieldError>
          </div>
        </div>
        <div className="onboarding-card">
          <Head icon={Target} title="Risk perspective" text="There are no right or wrong answers. This does not replace a suitability assessment." />
          <div className="stack">
            <Question
              title="1. How would you describe your tolerance for investment losses?"
              name="riskTolerance"
              current={data.preferences.riskAnswers.tolerance}
              options={[
                { value: "low", label: "Low", detail: "I would be uncomfortable with meaningful losses." },
                { value: "balanced", label: "Balanced", detail: "I can accept some movement for potential returns." },
                { value: "high", label: "Higher", detail: "I can tolerate significant fluctuations over time." },
              ]}
              onChange={(value) => setField("preferences", "riskAnswers", { ...data.preferences.riskAnswers, tolerance: value })}
            />
            <Question
              title="2. If your portfolio fell 15% in a month, what would you most likely do?"
              name="riskReaction"
              current={data.preferences.riskAnswers.reaction}
              options={[
                { value: "sell", label: "Reduce exposure", detail: "I would want to protect remaining capital." },
                { value: "hold", label: "Hold and review", detail: "I would review the plan before changing it." },
                { value: "add", label: "Add capital", detail: "I would consider the fall an opportunity." },
              ]}
              onChange={(value) => setField("preferences", "riskAnswers", { ...data.preferences.riskAnswers, reaction: value })}
            />
            <Question
              title="3. How comfortable are you with market-linked investments?"
              name="riskExperience"
              current={data.preferences.riskAnswers.experience}
              options={[
                { value: "uncomfortable", label: "Not comfortable", detail: "I prefer defined terms and lower volatility." },
                { value: "comfortable", label: "Somewhat comfortable", detail: "I accept movement for diversification." },
                { value: "very", label: "Very comfortable", detail: "I am comfortable with significant market exposure." },
              ]}
              onChange={(value) => setField("preferences", "riskAnswers", { ...data.preferences.riskAnswers, experience: value })}
            />
          </div>
        </div>
      </>
    );
  }

  if (step === 9) {
    const sections = [
      { key: "account", step: 0, title: "Account information", fields: [["First name", data.account.firstName], ["Last name", data.account.lastName], ["Email", data.account.email], ["Phone", data.account.phone]] },
      { key: "personal", step: 1, title: "Personal information", fields: [["Date of birth", data.personal.dob], ["Nationality", data.personal.nationality], ["Country", data.personal.country], ["Occupation", data.personal.occupation]] },
      { key: "address", step: 2, title: "Residential address", fields: [["Street", data.address.street], ["City", data.address.city], ["State", data.address.state], ["Postal code", data.address.postalCode]] },
      { key: "kin", step: 3, title: "Next of kin", fields: [["Name", data.kin.name], ["Relationship", data.kin.relationship], ["Phone", data.kin.phone], ["Email", data.kin.email]] },
      { key: "financial", step: 4, title: "Employment & finances", fields: [["Employment", data.financial.employmentType], ["Employer", data.financial.employer], ["Source of funds", data.financial.sourceFunds], ["Income range", data.financial.income]] },
      { key: "bank", step: 7, title: "Bank information", fields: [["Bank", data.bank.bankName], ["Account name", data.bank.accountName], ["Account number", `••••••${data.bank.accountNumber.slice(-4)}`], ["Country", data.bank.country]] },
      { key: "preferences", step: 8, title: "Investment preferences", fields: [["Objectives", data.preferences.objectives.join(", ")], ["Horizon", data.preferences.horizon], ["Categories", data.preferences.categories.join(", ")], ["Communication", data.preferences.communication]] },
    ];
    return (
      <>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Review your information" text="Check each section. Use Edit to return to the relevant step. Nothing is submitted yet." />
          {sections.map((section) => (
            <div className="review-block" key={section.key}>
              <div className="review-block-head">
                <h3>{section.title}</h3>
                <button type="button" onClick={() => goTo(section.step)}>Edit <Pencil size={11} /></button>
              </div>
              <div className="review-grid">
                {section.fields.map(([label, value]) => <ReviewField key={label} label={label} value={value} />)}
              </div>
            </div>
          ))}
        </div>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Uploaded documents" text="Files remain in your browser in this demonstration." />
          <div className="stack">
            {[
              { title: "Identity document", file: data.identity.file },
              { title: "Proof of address", file: data.addressVerification.file },
            ].map((item) => (
              <div className="uploaded-file" key={item.title}>
                <span className="uploaded-file-icon"><ShieldCheck size={15} /></span>
                <div className="uploaded-file-copy">
                  <strong>{item.title}</strong>
                  <span>{item.file ? `${item.file.name} · ${item.file.size}` : "No document attached"}</span>
                </div>
                <span className={`status-badge ${item.file ? "status-info" : "status-danger"}`}>{item.file ? "Ready for review" : "Missing"}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (step === 10) {
    return (
      <>
        <div className="onboarding-card">
          <Head icon={ShieldCheck} title="Consent and declarations" text="Read each statement and record your consent." />
          <div className="consent-list">
            {[
              { key: "terms", title: "Terms of use", body: <>I have read and agree to the <a href="/terms">Terms of use</a> and understand that submitting an application does not create an investment.</> },
              { key: "privacy", title: "Privacy policy", body: <>I have read the <a href="/privacy-policy">Privacy policy</a> and understand how my information and documents will be used.</> },
              { key: "risk", title: "Risk disclosure", body: <>I have read the <a href="/risk-disclosure">Risk disclosure</a> and understand that capital is at risk and returns are not guaranteed.</> },
              { key: "declaration", title: "Declaration", body: <>I confirm the information is accurate and complete, and I will notify VEE of any material change.</> },
            ].map((item) => (
              <label className="consent-item" key={item.key}>
                <input type="checkbox" checked={data.agreements[item.key]} onChange={(event) => setField("agreements", item.key, event.target.checked)} />
                <div><strong>{item.title} *</strong><p>{item.body}</p></div>
              </label>
            ))}
          </div>
          <FieldError>{e("agreements")}</FieldError>
          <div className="consent-meta"><ShieldCheck size={13} /> Consent version 2026.1 will be recorded with a timestamp on submission.</div>
        </div>
        <div className="info-note is-warning"><Info size={16} /><span>If you do not understand a document or declaration, contact support before submitting.</span></div>
      </>
    );
  }

  return (
    <>
      <div className="onboarding-card">
        <Head icon={ShieldCheck} title="Final check" text="Confirm your application. You will receive a reference and a pending status — not an approval." />
        <div className="review-grid">
          <ReviewField label="Applicant" value={`${data.account.firstName} ${data.account.lastName}`} />
          <ReviewField label="Email" value={data.account.email} />
          <ReviewField label="Phone" value={data.account.phone} />
          <ReviewField label="Country" value={data.personal.country} />
          <ReviewField label="Identity document" value={data.identity.documentType} />
          <ReviewField label="Proof of address" value={data.addressVerification.documentType} />
          <ReviewField label="Bank" value={`${data.bank.bankName} · ••••${data.bank.accountNumber.slice(-4)}`} />
          <ReviewField label="Objectives" value={data.preferences.objectives.join(", ")} />
          <ReviewField label="Horizon" value={data.preferences.horizon} />
          <ReviewField label="Consent version" value="2026.1" />
        </div>
        <div className="info-note" style={{ marginTop: 18 }}>
          <ShieldCheck size={17} />
          <span>After submission, the application will be marked <strong>Pending review</strong>. Verification and approval are only recorded by an authorised reviewer.</span>
        </div>
      </div>
    </>
  );
}

function Question({ title, name, options, current, onChange }) {
  return (
    <div>
      <p className="otp-label" style={{ marginBottom: 7 }}>{title}</p>
      <div className="radio-group">
        {options.map((option) => (
          <label className="radio-card" key={option.value}>
            <input type="radio" name={name} checked={current === option.value} onChange={() => onChange(option.value)} />
            <div><strong>{option.label}</strong><span>{option.detail}</span></div>
          </label>
        ))}
      </div>
    </div>
  );
}
