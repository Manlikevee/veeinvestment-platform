"use client";

import { useRef, useState } from "react";
import { FileText, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];

export function FileUpload({
  id,
  label = "Upload a document",
  hint = "PDF, JPG or PNG · Maximum 10 MB",
  value,
  onChange,
  disabled = false,
  required = false,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  function handleFile(file) {
    setError("");
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("Use a PDF, JPG or PNG file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("The file is larger than 10 MB.");
      return;
    }
    const meta = {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type === "application/pdf" ? "PDF" : "Image",
      status: "Uploading",
      progress: 0,
      demo: true,
    };
    onChange(meta);
    let progress = 0;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      progress += Math.floor(Math.random() * 18) + 8;
      if (progress >= 100) {
        window.clearInterval(timerRef.current);
        onChange({ ...meta, status: "Ready", progress: 100 });
      } else {
        onChange({ ...meta, progress });
      }
    }, 220);
  }

  function remove() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    onChange(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  if (value) {
    return (
      <div className="upload-card">
        <div className="upload-card-head">
          <div>
            <strong>{label}</strong>
            <span>{hint}</span>
          </div>
          <span className={`status-badge ${value.status === "Ready" ? "status-success" : "status-info"}`}>
            {value.status}
          </span>
        </div>
        <div className="uploaded-file">
          <span className="uploaded-file-icon"><FileText size={15} /></span>
          <div className="uploaded-file-copy">
            <strong>{value.name}</strong>
            <span>{value.type} · {value.size} · Demonstration file</span>
            {value.status === "Uploading" ? (
              <div className="file-progress"><span style={{ width: `${value.progress}%` }} /></div>
            ) : null}
          </div>
          <div className="uploaded-file-actions">
            <button type="button" className="icon-button" onClick={() => inputRef.current?.click()} aria-label={`Replace ${label}`} disabled={disabled}>
              <RefreshCw size={14} />
            </button>
            <button type="button" className="icon-button" onClick={remove} aria-label={`Remove ${label}`} disabled={disabled}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
          disabled={disabled}
        />
        <p className="field-hint" style={{ marginTop: 8 }}>The file stays in your browser. No real upload occurs in this demonstration.</p>
        {error ? <p className="field-error" role="alert">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="upload-card">
      <div className="upload-card-head">
        <div>
          <strong>{label}{required ? <span className="field-required"> *</span> : null}</strong>
          <span>{hint}</span>
        </div>
      </div>
      <label
        className={cn("file-drop", dragging && "is-dragging")}
        onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(event) => handleFile(event.target.files?.[0])}
          disabled={disabled}
        />
        <span className="file-drop-icon"><UploadCloud size={19} /></span>
        <strong>Drop a file here or choose a file</strong>
        <p>{hint} · Demonstration only</p>
      </label>
      {error ? <p className="field-error" role="alert">{error}</p> : null}
    </div>
  );
}
