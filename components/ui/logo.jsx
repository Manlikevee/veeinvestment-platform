import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({ href = "/", inverse = false, compact = false, className = "" }) {
  return (
    <Link
      href={href}
      className={cn("logo", inverse && "logo-inverse", compact && "logo-compact", className)}
      aria-label="Vee Investment home"
    >
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="presentation">
          <path d="M10 10.5h7.2L20 22.8l2.8-12.3H30L23.5 31h-7L10 10.5Z" fill="currentColor" />
          <circle cx="31.2" cy="8.8" r="3.2" fill="var(--accent)" />
        </svg>
      </span>
      {!compact ? (
        <span className="logo-wordmark">
          <span className="logo-name">Vee</span>
          <span className="logo-sub">Investment</span>
        </span>
      ) : null}
    </Link>
  );
}
