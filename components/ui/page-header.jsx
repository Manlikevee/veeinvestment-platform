import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {item.href && !last ? <Link href={item.href}>{item.label}</Link> : <span aria-current={last ? "page" : undefined}>{item.label}</span>}
              {!last ? <ChevronRight size={13} aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  className = "",
  compact = false,
}) {
  return (
    <div className={cn("page-header", compact && "page-header-compact", className)}>
      <div className="page-header-copy">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="page-header-description">{description}</p> : null}
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </div>
  );
}
