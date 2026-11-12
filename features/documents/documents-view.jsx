"use client";

import { useMemo, useState } from "react";
import { Download, Eye, FileText, Plus, RefreshCw, Search, ShieldCheck, UploadCloud } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/form-field";
import { FileUpload } from "@/components/forms/file-upload";
import { DownloadStatement } from "@/components/ui/download-statement";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/providers/toast-provider";
import { documents as seedDocuments } from "@/lib/data/customer";
import { formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const categories = ["All", "Identity", "Address", "Bank", "Investment", "Loan", "Compliance"];

export function DocumentsView() {
  const [documents, setDocuments] = useState(seedDocuments);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [replacing, setReplacing] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Identity", type: "Passport" });
  const [error, setError] = useState("");
  const { toast } = useToast();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return documents.filter((document) =>
      (category === "All" || document.category === category) &&
      (!q || document.name.toLowerCase().includes(q) || document.fileName.toLowerCase().includes(q)),
    );
  }, [documents, category, query]);

  function openUpload(document = null) {
    setReplacing(document);
    setFile(null);
    setError("");
    setForm(document ? { name: document.name, category: document.category, type: document.type } : { name: "", category: "Identity", type: "Passport" });
    setUploadOpen(true);
  }

  function submitUpload() {
    if (!file) { setError("Choose a file before uploading."); return; }
    if (!form.name.trim()) { setError("Give the document a clear name."); return; }
    if (replacing) {
      setDocuments((current) => current.map((item) => item.id === replacing.id ? { ...item, fileName: file.name, size: file.size, status: "Under review", uploadedAt: new Date().toISOString().slice(0, 10), reviewer: "Unassigned", notes: "Replacement uploaded in demonstration mode." } : item));
      toast({ title: "Replacement prepared", message: "The document is now marked Under review in this demonstration.", tone: "success" });
    } else {
      setDocuments((current) => [
        {
          id: `DOC-${Math.floor(6000 + Math.random() * 900)}`, name: form.name, category: form.category, type: form.type,
          fileName: file.name, fileType: file.type, size: file.size, uploadedAt: new Date().toISOString().slice(0, 10),
          expiresAt: null, status: "Under review", reviewer: "Unassigned", notes: "Uploaded in demonstration mode. No file was transmitted.", required: false,
        },
        ...current,
      ]);
      toast({ title: "Document added for demonstration", message: "No file was uploaded to a server.", tone: "info" });
    }
    setUploadOpen(false);
    setReplacing(null);
  }

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Verification"
        title="Documents"
        description="Upload, review and replace the documents attached to your account. Status changes are made by authorised reviewers."
        actions={<button type="button" className="btn btn-primary" onClick={() => openUpload()}><Plus size={16} /> Upload document</button>}
      />

      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard label="Verified documents" value={documents.filter((item) => item.status === "Verified").length} detail="Accepted by review" icon="file-check" tone="emerald" />
        <StatCard label="Under review" value={documents.filter((item) => item.status === "Under review").length} detail="Awaiting a reviewer" icon="hourglass" tone="sand" />
        <StatCard label="Action required" value={documents.filter((item) => item.status === "Action required").length} detail="Replacement requested" icon="warning" tone="clay" />
        <StatCard label="Expiring soon" value={0} detail="No documents expiring in 30 days" icon="calendar" tone="sage" />
      </div>

      <div className="catalogue-toolbar">
        <div className="chip-row">
          {categories.map((item) => <button type="button" key={item} className={cn("chip", category === item && "is-active")} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
        </div>
        <label className="search-input" style={{ minWidth: 250 }}>
          <Search size={16} /><span className="sr-only">Search documents</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents…" />
        </label>
      </div>

      {filtered.length ? (
        <div className="document-grid">
          {filtered.map((document) => (
            <article className="document-card" key={document.id}>
              <div className="document-card-top">
                <span className="document-icon"><FileText size={18} /></span>
                <StatusBadge status={document.status} />
              </div>
              <h3>{document.name}</h3>
              <p className="document-card-meta">{document.category} · {document.fileType} · {document.size}<br />Uploaded {formatDate(document.uploadedAt)}{document.expiresAt ? ` · Expires ${formatDate(document.expiresAt)}` : ""}</p>
              {document.status === "Action required" ? <div className="auth-alert" style={{ marginTop: 10, padding: "8px 9px", fontSize: "0.65rem" }}><ShieldCheck size={14} /><span>{document.notes}</span></div> : null}
              <div className="document-card-footer">
                <button type="button" className="text-button" onClick={() => setSelected(document)}><Eye size={14} /> View</button>
                <div className="doc-actions">
                  <DownloadStatement title={document.name} filename={document.fileName.replace(/\.(pdf|jpg|png)$/i, "") + ".pdf"} label="" className="icon-button" lines={[`Document: ${document.name}`, `Category: ${document.category}`, `Status: ${document.status}`, `Uploaded: ${formatDate(document.uploadedAt)}`]} />
                  <button type="button" className="icon-button" onClick={() => openUpload(document)} aria-label={`Replace ${document.name}`}><RefreshCw size={14} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState icon="files" title="No documents match" description="Try another category or search term." action={<button type="button" className="btn btn-outline btn-sm" onClick={() => { setCategory("All"); setQuery(""); }}>Clear filters</button>} />
      )}

      <div className="info-note" style={{ marginTop: 18 }}>
        <ShieldCheck size={16} />
        <span>Document review is access-controlled. In this demonstration nothing is uploaded, downloaded from a server, verified or rejected by a real reviewer.</span>
      </div>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title={replacing ? "Replace document" : "Upload a document"} description="PDF, JPG or PNG up to 10 MB. Demonstration only — the file stays in your browser." footer={<><button type="button" className="btn btn-ghost" onClick={() => setUploadOpen(false)}>Cancel</button><button type="button" className="btn btn-primary" onClick={submitUpload}><UploadCloud size={16} /> {replacing ? "Replace document" : "Add document"}</button></>}>
        <div className="stack">
          <Input label="Document name" name="docName" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Passport — November 2026" required />
          <div className="form-grid two">
            <Select label="Category" name="category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} options={["Identity", "Address", "Bank", "Investment", "Loan", "Compliance"]} required />
            <Select label="Document type" name="docType" value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} options={["Passport", "National ID", "Driving licence", "Utility bill", "Bank statement", "Agreement", "Supporting document"]} required />
          </div>
          <FileUpload id="document-upload" label={replacing ? "Replacement file" : "Document file"} value={file} onChange={setFile} required />
          {error ? <p className="field-error" role="alert">{error}</p> : null}
        </div>
      </Modal>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.name} description={`${selected?.category} · ${selected?.fileType} · ${selected?.size}`} footer={<button type="button" className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>}>
        {selected ? (
          <div className="stack">
            <div className="detail-banner" style={{ padding: 15 }}>
              <div><p className="detail-banner-label">Verification status</p><p className="detail-banner-value" style={{ fontSize: "1.2rem" }}><StatusBadge status={selected.status} /></p><p className="detail-banner-meta">Reviewer: {selected.reviewer}</p></div>
              <span className="document-icon"><FileText size={18} /></span>
            </div>
            <div className="info-grid">
              <div className="info-row"><span>Uploaded</span><strong>{formatDate(selected.uploadedAt)}</strong></div>
              <div className="info-row"><span>Expiry</span><strong>{formatDate(selected.expiresAt)}</strong></div>
              <div className="info-row"><span>File name</span><strong className="mono">{selected.fileName}</strong></div>
              <div className="info-row"><span>Required</span><strong>{selected.required ? "Yes" : "No"}</strong></div>
              <div className="info-row full"><span>Review note</span><strong>{selected.notes || "No note recorded."}</strong></div>
            </div>
            <div className="info-note"><ShieldCheck size={16} /><span>This preview is a metadata demonstration; no actual document viewer is connected.</span></div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              <DownloadStatement title={selected.name} filename={`${selected.id}.pdf`} lines={[`Document: ${selected.name}`, `Status: ${selected.status}`, `Reviewer: ${selected.reviewer}`]} label="Download copy" />
              <button type="button" className="btn btn-outline" onClick={() => { setSelected(null); openUpload(selected); }}><RefreshCw size={15} /> Replace document</button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
