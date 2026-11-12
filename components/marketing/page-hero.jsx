import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({ eyebrow, title, description, actions, breadcrumbs = [], aside }) {
  return (
    <section className="page-hero">
      <div className="container">
        {breadcrumbs.length ? (
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              {breadcrumbs.map((item, index) => (
                <li key={item.label}>
                  <ChevronRight size={12} aria-hidden="true" />
                  {item.href && index < breadcrumbs.length - 1 ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}>{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="page-hero-grid">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1>{title}</h1>
            {description ? <p className="page-hero-lede">{description}</p> : null}
            {actions ? <div className="page-hero-actions">{actions}</div> : null}
          </div>
          {aside ? <aside className="page-hero-aside">{aside}</aside> : null}
        </div>
      </div>
    </section>
  );
}
