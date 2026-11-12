"use client";

import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { useToast } from "@/providers/toast-provider";

export function CustomerNote() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    { author: "Grace Adeleke", date: "11 Nov 2026, 15:02", body: "Client called about source-of-funds request. Explained the document requirement and the secure upload route." },
  ]);
  const { toast } = useToast();
  function add() {
    if (note.trim().length < 5) return;
    setNotes((current) => [{ author: "Ngozi Eze", date: "Now", body: note.trim() }, ...current]);
    setNote("");
    toast({ title: "Internal note added to this demonstration", message: "A live note would be permission-controlled and written to the audit trail.", tone: "info" });
  }
  return (
    <div>
      <div className="stack" style={{ gap: 10 }}>
        {notes.map((item, index) => <div className="ticket-message" key={`${item.date}-${index}`} style={{ maxWidth: "100%" }}><div className="ticket-message-head"><strong>{item.author}</strong><span>{item.date}</span></div><p>{item.body}</p></div>)}
      </div>
      <div className="ticket-composer">
        <textarea className="textarea" rows={3} aria-label="Internal customer note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note…" />
        <button type="button" className="btn btn-outline btn-sm" onClick={add} disabled={note.trim().length < 5}><MessageSquarePlus size={14} /> Add note</button>
      </div>
    </div>
  );
}
