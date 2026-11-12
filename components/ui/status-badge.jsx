import { statusTone } from "@/lib/utils/status";
import { cn } from "@/lib/utils/cn";

export function StatusBadge({ status, dot = true, className = "" }) {
  const tone = statusTone(status);
  return (
    <span className={cn("status-badge", `status-${tone}`, className)}>
      {dot ? <span className="status-dot" aria-hidden="true" /> : null}
      {status}
    </span>
  );
}

export function Badge({ children, tone = "neutral", className = "" }) {
  return <span className={cn("badge", `badge-${tone}`, className)}>{children}</span>;
}
