"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { EmptyState } from "@/components/ui/empty-state";
import { faqCategories } from "@/lib/data/site";

export function FaqExplorer({ faqs }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () =>
      faqCategories.reduce((acc, item) => {
        acc[item] = item === "All" ? faqs.length : faqs.filter((faq) => faq.category === item).length;
        return acc;
      }, {}),
    [faqs],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (faq) =>
        (category === "All" || faq.category === category) &&
        (!q || faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)),
    );
  }, [faqs, category, query]);

  return (
    <div className="faq-page-layout">
      <aside className="faq-categories" aria-label="FAQ categories">
        {faqCategories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? "is-active" : undefined}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}<small>{counts[item]}</small>
          </button>
        ))}
      </aside>
      <div className="faq-content">
        <label className="search-input" style={{ marginBottom: 24 }}>
          <Search size={17} />
          <span className="sr-only">Search FAQs</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions and answers…"
          />
        </label>
        <h2>{category === "All" ? "All questions" : category}</h2>
        <p>{filtered.length} {filtered.length === 1 ? "answer" : "answers"} in this view.</p>
        {filtered.length ? (
          <Accordion items={filtered} defaultOpen={0} />
        ) : (
          <EmptyState
            title="No matching questions"
            description="Try a broader search term or select another category."
            action={<button type="button" className="btn btn-outline btn-sm" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>}
          />
        )}
        <div className="faq-contact-card">
          <div>
            <h3>Still need an answer?</h3>
            <p>Our client team can help with account-specific or technical questions.</p>
          </div>
          <a href="/contact" className="btn btn-primary">Contact support</a>
        </div>
      </div>
    </div>
  );
}
