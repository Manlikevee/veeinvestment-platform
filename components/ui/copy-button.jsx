"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ value, label = "Copy", className = "" }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return (
    <button type="button" className={`copy-button ${className}`} onClick={copy} aria-label={`${label} ${value}`}>
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}
