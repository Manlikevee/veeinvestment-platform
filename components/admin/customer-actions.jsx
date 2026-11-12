"use client";

import { useState } from "react";
import { LockKeyhole, UnlockKeyhole, ShieldAlert } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/providers/toast-provider";
import { useAuth } from "@/providers/auth-provider";

export function CustomerActions({ customerId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const { toast } = useToast();
  const { can } = useAuth();
  const permitted = can("customers.suspend");

  function submit() {
    if (note.trim().length < 10) {
      toast({ title: "Add an internal note", message: "A reason of at least 10 characters is required.", tone: "warning" });
      return;
    }
    const next = status === "Suspended" ? "Active" : "Suspended";
    setStatus(next);
    setOpen(false);
    toast({ title: `Customer ${next === "Suspended" ? "suspended" : "reactivated"} in this demonstration`, message: "No backend change was made. A live audit trail would record actor, reason and timestamp.", tone: "info" });
  }

  return (
    <div className="flex-center">
      <StatusBadge status={status} />
      {status !== "Closed" ? (
        <button type="button" className="btn btn-outline" onClick={() => setOpen(true)} disabled={!permitted}>
          {status === "Suspended" ? <UnlockKeyhole size={15} /> : <LockKeyhole size={15} />}
          {status === "Suspended" ? "Reactivate" : "Suspend"}
        </button>
      ) : null}
      {!permitted ? <span className="badge badge-neutral">Permission required</span> : null}
      <Modal open={open} onClose={() => setOpen(false)} title={status === "Suspended" ? "Reactivate customer" : "Suspend customer"} description={`Customer ${customerId}. This demonstration requires a reason and changes only local state.`} footer={<><button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button type="button" className={status === "Suspended" ? "btn btn-primary" : "btn btn-danger"} onClick={submit}>{status === "Suspended" ? "Reactivate" : "Suspend account"}</button></>}>
        <div className="stack">
          <div className="info-note is-warning"><ShieldAlert size={16} /><span>{status === "Suspended" ? "Reactivation restores access but does not change verification outcomes." : "Suspension may prevent transactions and new applications. Open positions still require review."}</span></div>
          <Textarea label="Internal note *" name="note" value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Reason for the action, visible to authorised staff only." />
        </div>
      </Modal>
    </div>
  );
}
