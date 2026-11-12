"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "./product-card";
import { productCategories } from "@/lib/data/site";
import { EmptyState } from "@/components/ui/empty-state";

export function ProductCatalogue({ products }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (!q ||
          product.name.toLowerCase().includes(q) ||
          product.summary.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)),
    );
  }, [products, category, query]);

  return (
    <>
      <div className="catalogue-toolbar">
        <div className="chip-row" role="group" aria-label="Filter by category">
          {productCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${category === item ? " is-active" : ""}`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search-input catalogue-search">
          <Search size={16} />
          <span className="sr-only">Search products</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search opportunities…" />
        </label>
      </div>
      <p className="catalogue-count">{filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"} · Illustrative terms</p>
      {filtered.length ? (
        <div className="product-grid-catalogue">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No opportunities match"
          description="Try a different category or search term."
          action={<button type="button" className="btn btn-outline btn-sm" onClick={() => { setCategory("All"); setQuery(""); }}>Clear filters</button>}
        />
      )}
    </>
  );
}
