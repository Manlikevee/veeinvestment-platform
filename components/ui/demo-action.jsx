"use client";

import { useState } from "react";
import { Modal } from "./modal";
import { useToast } from "@/providers/toast-provider";
import { cn } from "@/lib/utils/cn";

export function DemoActionButton({
  children,
  className = "btn btn-outline",
  toastTitle = "Action recorded",
  toastMessage = "This is a demonstration action. No server-side change was made.",
  tone = "info",
  modalTitle,
  modalDescription,
  modalBody,
  modalConfirmLabel = "Record demo action",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  function run() {
    if (modalTitle) {
      setOpen(true);
      return;
    }
    toast({ title: toastTitle, message: toastMessage, tone });
  }

  return (
    <>
      <button type="button" className={cn(className)} onClick={run} disabled={disabled}>
        {children}
      </button>
      {modalTitle ? (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={modalTitle}
          description={modalDescription}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setOpen(false);
                  toast({ title: toastTitle, message: `${toastMessage} No backend change was made.`, tone });
                }}
              >
                {modalConfirmLabel}
              </button>
            </>
          }
        >
          {modalBody}
        </Modal>
      ) : null}
    </>
  );
}
