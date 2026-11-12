"use client";

import { useState } from "react";
import { Save, ShieldCheck, UploadCloud } from "lucide-react";
import { Input, Select, Textarea } from "@/components/ui/form-field";
import { FileUpload } from "@/components/forms/file-upload";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";

export function ProductConfigForm({ product }) {
  const [form, setForm] = useState({
    name: product.name, category: product.category, summary: product.summary, description: product.description,
    min: String(product.min), max: String(product.max), duration: String(product.durationMonths),
    target: String(product.targetReturn), risk: product.risk, status: product.status,
    fees: product.fees.map((fee) => `${fee.label}: ${fee.value}`).join("\n"),
    eligibility: product.eligibility.join("\n"), withdrawal: product.withdrawal,
    visible: true, applicationsOpen: product.status === "Open",
  });
  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  function set(key, value) { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); }
  function save(event) {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Product name is required.";
    if (Number(form.min) <= 0) next.min = "Minimum must be greater than zero.";
    if (Number(form.max) < Number(form.min)) next.max = "Maximum must be at least the minimum.";
    if (!form.description.trim()) next.description = "Add a product description.";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast({ title: "Product configuration staged", message: "No terms were published. Financial term changes require approval and an audit record.", tone: "info" });
  }
  return (
    <form onSubmit={save}>
      <div className="detail-layout">
        <div className="detail-main">
          <section className="form-section">
            <div className="form-section-head"><span className="form-section-icon"><ShieldCheck size={18} /></span><div><h2>Product information</h2><p>Public name, category and description.</p></div></div>
            <div className="form-grid two">
              <Input label="Product name" name="productName" value={form.name} onChange={(event) => set("name", event.target.value)} error={errors.name} required />
              <Select label="Category" name="productCategory" value={form.category} onChange={(event) => set("category", event.target.value)} options={["Fixed income", "Impact", "Managed portfolio", "Liquidity", "Alternatives"]} />
              <Textarea className="full" label="Short summary" name="productSummary" value={form.summary} onChange={(event) => set("summary", event.target.value)} rows={2} />
              <Textarea className="full" label="Full description" name="productDescription" value={form.description} onChange={(event) => set("description", event.target.value)} error={errors.description} rows={4} required />
            </div>
          </section>
          <section className="form-section">
            <div className="form-section-head"><span className="form-section-icon"><ShieldCheck size={18} /></span><div><h2>Financial terms</h2><p>Changes are versioned and require approval in a live system.</p></div></div>
            <div className="form-grid two">
              <Input label="Minimum investment" name="productMin" type="number" prefix="₦" value={form.min} onChange={(event) => set("min", event.target.value)} error={errors.min} />
              <Input label="Maximum investment" name="productMax" type="number" prefix="₦" value={form.max} onChange={(event) => set("max", event.target.value)} error={errors.max} />
              <Input label="Duration (months)" name="productDuration" type="number" value={form.duration} onChange={(event) => set("duration", event.target.value)} />
              <Input label="Target return (% p.a.)" name="productTarget" type="number" value={form.target} onChange={(event) => set("target", event.target.value)} hint="Not a guaranteed return." />
              <Select label="Risk classification" name="productRisk" value={form.risk} onChange={(event) => set("risk", event.target.value)} options={["Conservative", "Moderate", "Balanced", "Growth", "Higher risk"]} />
              <Select label="Status" name="productStatus" value={form.status} onChange={(event) => set("status", event.target.value)} options={["Draft", "Open", "Opening soon", "Paused", "Archived"]} />
              <Textarea className="full" label="Fees (one per line)" name="productFees" value={form.fees} onChange={(event) => set("fees", event.target.value)} rows={4} />
              <Textarea className="full" label="Eligibility (one per line)" name="productEligibility" value={form.eligibility} onChange={(event) => set("eligibility", event.target.value)} rows={4} />
              <Textarea className="full" label="Withdrawal terms" name="productWithdrawal" value={form.withdrawal} onChange={(event) => set("withdrawal", event.target.value)} rows={3} />
            </div>
          </section>
          <section className="form-section">
            <div className="form-section-head"><span className="form-section-icon"><UploadCloud size={18} /></span><div><h2>Product documents</h2><p>Attach the term sheet, risk disclosure or agreement for publication.</p></div></div>
            <FileUpload id="product-document" label="Upload product document" value={document} onChange={setDocument} />
          </section>
        </div>
        <aside className="detail-side">
          <section className="panel">
            <div className="panel-head"><div><h2>Publication</h2><p>Control visibility and application availability.</p></div></div>
            <div className="panel-body stack">
              <label className="flex-between"><span style={{ fontSize: "0.76rem" }}>Visible on public site</span><input type="checkbox" checked={form.visible} onChange={(event) => set("visible", event.target.checked)} /></label>
              <label className="flex-between"><span style={{ fontSize: "0.76rem" }}>Applications open</span><input type="checkbox" checked={form.applicationsOpen} onChange={(event) => set("applicationsOpen", event.target.checked)} /></label>
              <div className="info-note is-warning"><ShieldCheck size={15} /><span>Frontend visibility is not an access control. The backend must enforce product availability.</span></div>
              <button type="submit" className="btn btn-primary"><Save size={16} /> Save configuration</button>
            </div>
          </section>
          <section className="panel">
            <div className="panel-head"><div><h2>Status</h2></div><StatusBadge status={form.status} /></div>
            <div className="panel-body"><p className="small muted">Product changes must be reviewed and versioned. Existing investments must not be altered by a product configuration change.</p></div>
          </section>
        </aside>
      </div>
    </form>
  );
}
