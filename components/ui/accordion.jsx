"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Accordion({ items, defaultOpen = 0, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("accordion", className)}>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div className={cn("accordion-item", expanded && "is-open")} key={`${item.q}-${index}`}>
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                <span>{item.q}</span>
                <ChevronDown size={19} aria-hidden="true" />
              </button>
            </h3>
            <div
              className="accordion-panel"
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              hidden={!expanded}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
