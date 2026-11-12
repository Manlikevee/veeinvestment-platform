"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { ArticleCard } from "./article-card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils/format";

export function InsightsExplorer({ articles, categories }) {
  const featured = articles.find((article) => article.featured) || articles[0];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (article) =>
        (category === "All" || article.category === category) &&
        (!q || article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q)),
    );
  }, [articles, category, query]);

  return (
    <>
      <div className="featured-article-layout" style={{ marginBottom: 40 }}>
        <Link href={`/insights/${featured.slug}`} className="featured-article-image" aria-label={featured.title}>
          <Image src={featured.image} alt="" fill sizes="(max-width: 960px) 100vw, 55vw" />
        </Link>
        <div className="featured-article-copy">
          <div className="insight-meta">
            <span className="badge badge-forest">Featured</span>
            <span>{featured.category}</span><span className="dot" />
            <time dateTime={featured.date}>{formatDate(featured.date)}</time>
          </div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <div className="insight-meta" style={{ marginTop: 15 }}>
            <span>{featured.author}</span><span className="dot" /><span>{featured.readTime}</span>
          </div>
          <Link href={`/insights/${featured.slug}`} className="link-arrow">Read article <span><ArrowRight size={14} /></span></Link>
        </div>
      </div>

      <div className="insights-toolbar">
        <div className="chip-row" role="group" aria-label="Filter insights by category">
          {["All", ...categories].map((item) => (
            <button key={item} type="button" className={`chip${category === item ? " is-active" : ""}`} onClick={() => setCategory(item)} aria-pressed={category === item}>
              {item}
            </button>
          ))}
        </div>
        <label className="search-input" style={{ minWidth: 250 }}>
          <Search size={16} />
          <span className="sr-only">Search insights</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search insights…" />
        </label>
      </div>

      {filtered.length ? (
        <div className="insights-grid">
          {filtered.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      ) : (
        <EmptyState
          title="No articles match"
          description="Try another category or a broader search."
          action={<button type="button" className="btn btn-outline btn-sm" onClick={() => { setCategory("All"); setQuery(""); }}>Clear filters</button>}
        />
      )}
    </>
  );
}
