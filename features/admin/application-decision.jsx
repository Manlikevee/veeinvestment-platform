"use client";

import { useState } from "react";
import { Check, CircleHelp, Clock, X } from "lucide-react";
import { Textarea } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";
import { useAuth } from "@/providers/auth-provider";

export function ApplicationDecision({ initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState("");
  const { toast } = useToast();
  const { can } = useAuth();
  const allowed = can("applications.approve");
  function decide(next) {
    if (!allowed) return;
    if (note.trim().length < 10) { toast({ title: "Add a decision note", message: "A reason is required for the audit trail.", tone: "warning" }); return; }
    setStatus(next);
    toast({ title: `Application marked ${next.toLowerCase()} in this demonstration`, message: "No transaction, portfolio record or payment was created. Approval does not settle an investment.", tone: "info" });
  }
  return (
    <div className="stack">
      <div className="flex-between"><span className="otp-label">Current status</span><StatusBadge status={status} /></div>
      <Textarea label="Decision note *" name="decisionNote" value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Record the rationale, conditions and any next actions." />
      <div className="review-actions">
        <button type="button" className="btn btn-primary" onClick={() => decide("Approved")} disabled={!allowed}><Check size={15} /> Approve</button>
        <button type="button" className="btn btn-outline" onClick={() => decide("Information requested")} disabled={!allowed}><CircleHelp size={15} /> Request information</button>
        <button type="button" className="btn btn-danger" onClick={() => decide("Rejected")} disabled={!allowed}><X size={15} /> Reject</button>
        <button type="button" className="btn btn-ghost" onClick={() => decide("Pending review")} disabled={!allowed}><Clock size={15} /> Keep pending</button>
      </div>
      {!allowed ? <span className="badge badge-neutral">Your role cannot approve applications</span> : null}
      <div className="info-note is-warning"><Check size={15} /><span>Approval does not create an investment or transaction. Funding must be requested and reconciled separately.</span></div>
    </div>
  );
}
