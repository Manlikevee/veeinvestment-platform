"use client";

import { useState } from "react";
import { Check, Copy, Linkedin, Mail } from "lucide-react";
import { useToast } from "@/providers/toast-provider";

export function ArticleShare({ title, url }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      toast({ title: "Link copied", message: "The article link is on your clipboard.", tone: "success" });
    } catch {
      toast({ title: "Could not copy", message: "Copy the address from your browser.", tone: "error" });
    }
  }

  return (
    <div className="article-share" aria-label="Share this article">
      <button type="button" onClick={copyLink} aria-label="Copy article link">
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} aria-label="Share by email">
        <Mail size={15} />
      </a>
    </div>
  );
}
