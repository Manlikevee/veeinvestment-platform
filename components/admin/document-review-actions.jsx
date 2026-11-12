"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Textarea } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";

export function DocumentReviewActions({ initialStatus = "Under review" }) {
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  function decide(next) {
    if (note.trim().length < 8) {
      toast({ title: "Add a review note", message: "Record a reason before changing the document status.", tone: "warning" });
      return;
    }
    setStatus(next);
    toast({ title: `Document marked ${next} in this demonstration`, message: "No file, customer record or verification result was changed on a server.", tone: "info" });
  }

  return (
    <div className="stack">
      <div className="flex-between"><span className="otp-label">Current status</span><StatusBadge status={status} /></div>
      <Textarea label="Review note *" name="reviewNote" value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Describe what you checked and why the document meets or fails the requirement." />
      <div className="review-actions">
        <button type="button" className="btn btn-primary" onClick={() => decide("Approved")}><Check size={15} /> Approve</button>
        <button type="button" className="btn btn-outline" onClick={() => decide("Replacement requested")}><RotateCcw size={15} /> Request replacement</button>
        <button type="button" className="btn btn-danger" onClick={() => decide("Rejected")}><X size={15} /> Reject</button>
        <button type="button" className="btn btn-ghost" onClick={() => decide("Under review")}>Save for later</button>
      </div>
      <div className="info-note"><ShieldCheckIcon /><span>Decisions are demonstration-only and would require role permission, reviewer identity and an immutable audit record.</span></div>
    </div>
  );
}

function ShieldCheckIcon() {
  return <span aria-hidden="true" style={{ color: "var(--brand-700)", flexShrink: 0 }}>✓</span>;
}
