import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({ eyebrow, title, description, action, align = "left", serif = false }) {
  return (
    <div className={`section-heading${align === "center" ? " is-center" : ""}`}>
      <div className="section-heading-copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className={serif ? "display" : undefined}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? (
        <div className="section-heading-aside">
          <Link className="link-arrow" href={action.href}>
            {action.label} <span><ArrowRight size={15} /></span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
