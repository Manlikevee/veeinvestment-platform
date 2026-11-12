"use client";

import { Download } from "lucide-react";
import { downloadMockPdf } from "@/lib/utils/download";
import { useToast } from "@/providers/toast-provider";
import { cn } from "@/lib/utils/cn";

export function DownloadStatement({ title, lines = [], filename = "vee-demo-statement.pdf", label = "Download PDF", className = "btn btn-outline btn-sm" }) {
  const { toast } = useToast();
  function download() {
    downloadMockPdf({ title, lines, filename });
    toast({ title: "Demonstration PDF downloaded", message: "The file is an illustrative document, not a live statement.", tone: "info" });
  }
  return (
    <button
      type="button"
      className={cn(className)}
      onClick={download}
      aria-label={label || `Download ${title}`}
      title={label || `Download ${title}`}
    >
      <Download size={15} /> {label}
    </button>
  );
}
