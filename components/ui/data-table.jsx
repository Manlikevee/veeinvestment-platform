"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
} from "lucide-react";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils/cn";

function toCsv(columns, rows) {
  const headers = columns.filter((column) => column.exportable !== false).map((column) => column.header);
  const keys = columns.filter((column) => column.exportable !== false).map((column) => column.key);
  const escape = (value) => {
    const text = value === null || value === undefined ? "" : String(value);
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  const lines = [headers.map(escape).join(",")];
  rows.forEach((row) => {
    lines.push(
      keys
        .map((key) => {
          const column = columns.find((item) => item.key === key);
          const raw = column?.csvValue ? column.csvValue(row) : row[key];
          return escape(raw);
        })
        .join(","),
    );
  });
  return lines.join("\n");
}

export function DataTable({
  columns,
  rows,
  searchPlaceholder = "Search…",
  searchKeys,
  filters = [],
  pageSize = 8,
  exportName,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your search or filters.",
  loading = false,
  toolbar,
  initialSort,
  className = "",
  footerNote,
  pageSizeOptions = [8, 16, 32],
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  getRowId = (row) => row.id,
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeFilters, setActiveFilters] = useState({});
  const [sort, setSort] = useState(initialSort || null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(pageSize);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !q ||
        (searchKeys?.length ? searchKeys : Object.keys(row)).some((key) =>
          String(row[key] ?? "").toLowerCase().includes(q),
        );
      const matchesFilters = filters.every((filter) => {
        const value = activeFilters[filter.key];
        return !value || String(row[filter.key]) === String(value);
      });
      return matchesQuery && matchesFilters;
    });
  }, [rows, deferredQuery, searchKeys, filters, activeFilters]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((item) => item.key === sort.key);
    const accessor = column?.sortValue || ((row) => row[sort.key]);
    return [...filtered].sort((a, b) => {
      const av = accessor(a);
      const bv = accessor(b);
      if (av === bv) return 0;
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return sort.direction === "asc" ? av - bv : bv - av;
      }
      const result = String(av).localeCompare(String(bv), "en", { numeric: true });
      return sort.direction === "asc" ? result : -result;
    });
  }, [filtered, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / limit));
  const currentPage = Math.min(page, pageCount);
  const visible = sorted.slice((currentPage - 1) * limit, currentPage * limit);
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  function setFilter(key, value) {
    setActiveFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function clearAll() {
    setQuery("");
    setActiveFilters({});
    setPage(1);
  }

  function toggleSort(key) {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  }

  function exportCsv() {
    const csv = toCsv(columns, sorted);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${exportName || "vee-export"}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  const allSelected = selectable && visible.length > 0 && visible.every((row) => selectedIds.includes(getRowId(row)));
  function toggleAll() {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange(selectedIds.filter((id) => !visible.some((row) => getRowId(row) === id)));
    } else {
      onSelectionChange([...new Set([...selectedIds, ...visible.map(getRowId)])]);
    }
  }
  function toggleOne(id) {
    if (!onSelectionChange) return;
    onSelectionChange(
      selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id],
    );
  }

  return (
    <div className={cn("data-table-card", className)}>
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          <label className="table-search">
            <span className="sr-only">Search table</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
            />
          </label>
          {filters.length ? (
            <button
              type="button"
              className={cn("btn btn-outline btn-sm filter-toggle", activeFilterCount > 0 && "has-filters")}
              onClick={() => setShowFilters((value) => !value)}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount ? <span className="filter-count">{activeFilterCount}</span> : null}
            </button>
          ) : null}
        </div>
        <div className="table-toolbar-right">
          {toolbar}
          {exportName ? (
            <button type="button" className="btn btn-outline btn-sm" onClick={exportCsv}>
              <Download size={15} /> Export CSV
            </button>
          ) : null}
        </div>
      </div>

      {filters.length && showFilters ? (
        <div className="table-filters">
          {filters.map((filter) => (
            <label key={filter.key} className="table-filter">
              <span>{filter.label}</span>
              <select
                value={activeFilters[filter.key] || ""}
                onChange={(event) => setFilter(filter.key, event.target.value)}
              >
                <option value="">All</option>
                {filter.options.map((option) => {
                  const value = typeof option === "string" ? option : option.value;
                  const label = typeof option === "string" ? option : option.label;
                  return <option key={value} value={value}>{label}</option>;
                })}
              </select>
            </label>
          ))}
          {(activeFilterCount > 0 || query) && (
            <button type="button" className="text-button table-clear" onClick={clearAll}>
              Clear all
            </button>
          )}
        </div>
      ) : null}

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {selectable ? (
                <th className="select-cell">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Select all visible rows" />
                </th>
              ) : null}
              {columns.map((column) => {
                const isSorted = sort?.key === column.key;
                return (
                  <th
                    key={column.key}
                    className={cn(
                      column.align === "right" && "align-right",
                      column.hideOnMobile && "hide-mobile",
                      column.className,
                    )}
                    scope="col"
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className={cn("sort-button", isSorted && "is-sorted")}
                        onClick={() => toggleSort(column.key)}
                        aria-label={`Sort by ${column.header}`}
                      >
                        {column.header}
                        {isSorted ? (
                          sort.direction === "asc" ? <ArrowUp size={13} /> : <ArrowDown size={13} />
                        ) : (
                          <ArrowUpDown size={13} className="sort-idle" />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: Math.min(limit, 5) }).map((_, index) => (
                <tr key={`skeleton-${index}`}>
                  {selectable ? <td className="select-cell"><span className="skeleton" /></td> : null}
                  {columns.map((column) => (
                    <td key={column.key} className={cn(column.hideOnMobile && "hide-mobile")}>
                      <span className="skeleton skeleton-line" />
                    </td>
                  ))}
                </tr>
              ))
            ) : visible.length ? (
              visible.map((row) => {
                const id = getRowId(row);
                return (
                  <tr key={id} className={selectedIds.includes(id) ? "is-selected" : undefined}>
                    {selectable ? (
                      <td className="select-cell">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(id)}
                          onChange={() => toggleOne(id)}
                          aria-label={`Select ${row.name || row.id}`}
                        />
                      </td>
                    ) : null}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          column.align === "right" && "align-right",
                          column.hideOnMobile && "hide-mobile",
                          column.cellClassName,
                        )}
                      >
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>
          {sorted.length ? (
            <>
              Showing <strong>{(currentPage - 1) * limit + 1}–{Math.min(currentPage * limit, sorted.length)}</strong> of{" "}
              <strong>{sorted.length}</strong>
              {selectedIds.length ? <span className="table-selected"> · {selectedIds.length} selected</span> : null}
            </>
          ) : (
            "No matching records"
          )}
          {footerNote ? <span className="table-footer-note"> · {footerNote}</span> : null}
        </p>
        <div className="table-pagination">
          <label className="page-size">
            <span className="sr-only">Rows per page</span>
            <select value={limit} onChange={(event) => { setLimit(Number(event.target.value)); setPage(1); }}>
              {pageSizeOptions.map((size) => <option key={size} value={size}>{size} / page</option>)}
            </select>
          </label>
          <button
            type="button"
            className="icon-button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={17} />
          </button>
          <span className="page-indicator">{currentPage} / {pageCount}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            disabled={currentPage >= pageCount}
            aria-label="Next page"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
