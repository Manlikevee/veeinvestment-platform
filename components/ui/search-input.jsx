import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
  className = "",
}) {
  return (
    <label className={cn("search-input", className)}>
      <Search size={17} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search">
          <X size={15} />
        </button>
      ) : null}
    </label>
  );
}
