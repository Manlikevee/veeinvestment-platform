"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";

export function GlobalSearch({ open, onClose, items = [], context = "workspace" }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 10);
    return items
      .filter((item) =>
        `${item.label} ${item.description || ""} ${item.group || ""}`.toLowerCase().includes(q),
      )
      .slice(0, 14);
  }, [items, query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  function go(href) {
    onClose();
    router.push(href);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Search ${context}`}
      description="Find a person, record, investment or page. This demonstration searches local mock records."
      size="lg"
    >
      <label className="command-search">
        <Search size={18} />
        <span className="sr-only">Search</span>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to search…"
        />
        <kbd>ESC</kbd>
      </label>
      <div className="command-results">
        {filtered.length ? (
          filtered.map((item, index) => (
            <button
              type="button"
              key={`${item.href}-${index}`}
              className="command-result"
              onClick={() => go(item.href)}
            >
              <span className="command-result-copy">
                {item.group ? <small>{item.group}</small> : null}
                <strong>{item.label}</strong>
                {item.description ? <span>{item.description}</span> : null}
              </span>
              <ArrowRight size={16} />
            </button>
          ))
        ) : (
          <EmptyState
            icon="search"
            title="No matches"
            description="Try a customer name, reference, product or page name."
          />
        )}
      </div>
    </Modal>
  );
}
