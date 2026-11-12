"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pencil, Plus, Power, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { Modal } from "@/components/ui/modal";
import { Input, Select, Textarea } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { products as seedProducts } from "@/lib/data/site";
import { formatCompactCurrency } from "@/lib/utils/format";

const blank = { name: "", category: "Fixed income", summary: "", min: "500000", max: "50000000", durationMonths: "12", targetReturn: "10", risk: "Balanced", status: "Draft" };

export function ProductsManager() {
  const [products, setProducts] = useState(seedProducts);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  function startCreate() { setEditing(null); setForm(blank); setErrors({}); setOpen(true); }
  function startEdit(product) { setEditing(product); setForm({ name: product.name, category: product.category, summary: product.summary, min: String(product.min), max: String(product.max), durationMonths: String(product.durationMonths), targetReturn: String(product.targetReturn), risk: product.risk, status: product.status }); setErrors({}); setOpen(true); }

  function save() {
    const next = {};
    if (!form.name.trim()) next.name = "Enter a product name.";
    if (!form.summary.trim()) next.summary = "Add a clear product summary.";
    if (Number(form.min) <= 0) next.min = "Minimum must be greater than zero.";
    if (Number(form.max) < Number(form.min)) next.max = "Maximum must be at least the minimum.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (editing) {
      setProducts((current) => current.map((item) => item.id === editing.id ? { ...item, ...form, min: Number(form.min), max: Number(form.max), durationMonths: Number(form.durationMonths), targetReturn: Number(form.targetReturn) } : item));
      toast({ title: "Product changes staged", message: "No product was updated on a server. Financial term changes require approval.", tone: "info" });
    } else {
      const id = `PRD-${String(products.length + 1).padStart(3, "0")}`;
      setProducts((current) => [{ ...seedProducts[0], ...form, id, slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), min: Number(form.min), max: Number(form.max), durationMonths: Number(form.durationMonths), targetReturn: Number(form.targetReturn), riskLevel: 2, badge: "New", featured: false }, ...current]);
      toast({ title: "Draft product created in this demonstration", message: "No product was published or made available for applications.", tone: "info" });
    }
    setOpen(false);
  }

  function toggle(product) {
    setProducts((current) => current.map((item) => item.id === product.id ? { ...item, status: item.status === "Open" ? "Paused" : "Open" } : item));
    toast({ title: "Product availability staged", message: "Application availability would be server-enforced.", tone: "info" });
  }

  const columns = [
    { key: "name", header: "Product", sortable: true, render: (row) => <div className="table-primary-copy"><Link className="table-link" href={`/admin/investment-products/${row.id}`}>{row.name}</Link><span>{row.id} · {row.category}</span></div> },
    { key: "min", header: "Minimum", sortable: true, align: "right", render: (row) => formatCompactCurrency(row.min) },
    { key: "durationMonths", header: "Duration", sortable: true, render: (row) => `${row.durationMonths} months`, hideOnMobile: true },
    { key: "targetReturn", header: "Target", sortable: true, align: "right", render: (row) => `${row.targetReturn}%` },
    { key: "risk", header: "Risk", render: (row) => row.risk, hideOnMobile: true },
    { key: "status", header: "Status", sortable: true, render: (row) => <span className={`badge badge-${row.status === "Open" ? "emerald" : row.status === "Draft" ? "neutral" : "sand"}`}>{row.status}</span> },
    { key: "actions", header: "", exportable: false, align: "right", render: (row) => <div className="flex" style={{ gap: 2, justifyContent: "flex-end" }}><button type="button" className="icon-button" onClick={() => startEdit(row)} aria-label="Edit product"><Pencil size={14} /></button><button type="button" className="icon-button" onClick={() => toggle(row)} aria-label="Toggle availability"><Power size={14} /></button><Link href={`/admin/investment-products/${row.id}`} className="icon-button" aria-label="Open product"><ArrowUpRight size={14} /></Link></div> },
  ];

  return (
    <div className="app-page">
      <PageHeader eyebrow="Investment operations" title="Investment products" description="Configure product terms, risk classification, fees, eligibility and application availability. All financial terms are configurable." actions={<button type="button" className="btn btn-primary" onClick={startCreate}><Plus size={16} /> Create product</button>} />
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Products" value={products.length} detail="Across all categories" icon="package" tone="emerald" />
        <StatCard label="Open" value={products.filter((p) => p.status === "Open").length} detail="Accepting applications" icon="check-circle" tone="forest" />
        <StatCard label="Opening soon" value={products.filter((p) => p.status === "Opening soon").length} detail="Waitlist only" icon="hourglass" tone="sand" />
        <StatCard label="Archived / paused" value={products.filter((p) => !["Open", "Opening soon"].includes(p.status)).length} detail="Not available" icon="archive" tone="sage" />
      </div>
      <DataTable columns={columns} rows={products} searchPlaceholder="Search products…" searchKeys={["name", "category", "risk", "status"]} filters={[{ key: "category", label: "Category", options: ["Fixed income", "Impact", "Managed portfolio", "Liquidity", "Alternatives"] }, { key: "status", label: "Status", options: ["Open", "Opening soon", "Paused", "Draft", "Archived"] }]} exportName="vee-investment-products" footerNote="Demonstration configuration" />
      <div className="info-note" style={{ marginTop: 14 }}>Creating or changing a product does not make it legally available. Approval, disclosure review and backend publication are required.</div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit product" : "Create product"} description="All terms are demonstration configuration and require approval before publication." size="lg" footer={<><button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button type="button" className="btn btn-primary" onClick={save}>{editing ? "Save changes" : "Create draft"}</button></>}>
        <div className="form-grid two">
          <Input className="full" label="Product name" name="productName" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} error={errors.name} required />
          <Select label="Category" name="productCategory" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} options={["Fixed income", "Impact", "Managed portfolio", "Liquidity", "Alternatives"]} />
          <Select label="Risk classification" name="productRisk" value={form.risk} onChange={(event) => setForm((current) => ({ ...current, risk: event.target.value }))} options={["Conservative", "Moderate", "Balanced", "Growth", "Higher risk"]} />
          <Textarea className="full" label="Product summary" name="productSummary" value={form.summary} onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))} error={errors.summary} rows={3} required />
          <Input label="Minimum investment" name="minimum" type="number" prefix="₦" value={form.min} onChange={(event) => setForm((current) => ({ ...current, min: event.target.value }))} error={errors.min} />
          <Input label="Maximum investment" name="maximum" type="number" prefix="₦" value={form.max} onChange={(event) => setForm((current) => ({ ...current, max: event.target.value }))} error={errors.max} />
          <Input label="Duration (months)" name="duration" type="number" value={form.durationMonths} onChange={(event) => setForm((current) => ({ ...current, durationMonths: event.target.value }))} />
          <Input label="Target return (% p.a.)" name="target" type="number" value={form.targetReturn} onChange={(event) => setForm((current) => ({ ...current, targetReturn: event.target.value }))} hint="Not a guaranteed return." />
          <Select label="Availability" name="productStatus" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} options={["Draft", "Open", "Opening soon", "Paused", "Archived"]} />
        </div>
      </Modal>
    </div>
  );
}
