"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { cn } from "@/lib/utils/cn";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className = "",
  closeLabel = "Close dialog",
}) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  useScrollLock(open);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previousActive = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current?.();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector("button, input, select, textarea")?.focus();
    }, 50);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
      previousActive?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="modal-layer" role="presentation">
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className={cn("modal-panel", `modal-${size}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        ref={panelRef}
      >
        <div className="modal-header">
          <div>
            {title ? <h2 id={titleId}>{title}</h2> : null}
            {description ? <p id={descId}>{description}</p> : null}
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label={closeLabel}>
            <X size={19} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
