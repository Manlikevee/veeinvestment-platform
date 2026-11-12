"use client";

import { cn } from "@/lib/utils/cn";

export function Tabs({ items, active, onChange, ariaLabel = "Sections", className = "" }) {
  return (
    <div className={cn("tabs", className)} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const value = typeof item === "string" ? item : item.value;
        const label = typeof item === "string" ? item : item.label;
        const count = typeof item === "string" ? null : item.count;
        const selected = active === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cn("tab", selected && "is-active")}
            onClick={() => onChange(value)}
          >
            {label}
            {count !== undefined && count !== null ? <span className="tab-count">{count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
