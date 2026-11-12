"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { EmptyState } from "@/components/ui/empty-state";

export function HelpExplorer({ categories }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return categories;
    return categories
      .map((category) => ({
        ...category,
        articles: category.articles.filter((article) =>
          `${category.title} ${category.description} ${article}`.toLowerCase().includes(normalized),
        ),
      }))
      .filter((category) =>
        category.title.toLowerCase().includes(normalized) ||
        category.description.toLowerCase().includes(normalized) ||
        category.articles.length > 0,
      );
  }, [categories, query]);

  return (
    <>
      <label className="search-input" style={{ maxWidth: 620, marginBottom: 16 }}>
        <Search size={17} />
        <span className="sr-only">Search help topics</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search help topics, e.g. withdrawal, verification…"
        />
      </label>
      <p className="catalogue-count">
        {query ? `${filtered.reduce((total, category) => total + category.articles.length, 0)} matching article(s)` : "Browse by topic"}
      </p>
      {filtered.length ? (
        <div className="help-grid">
          {filtered.map((category) => (
            <article className="help-card" key={category.title}>
              <span className="help-card-icon"><Icon name={category.icon} size={19} /></span>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <ul>
                {category.articles.map((article) => (
                  <li key={article}><Link href="/faq">{article} <ChevronRight size={13} /></Link></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No help topics match"
          description="Try a broader search term, or browse the FAQ for answers."
          action={<Link href="/faq" className="btn btn-outline btn-sm">Browse FAQs</Link>}
        />
      )}
    </>
  );
}
