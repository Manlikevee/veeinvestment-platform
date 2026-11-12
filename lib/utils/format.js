const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const nairaPrecise = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const number = new Intl.NumberFormat("en-NG");

export function formatCurrency(value, { precise = false, signed = false } = {}) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const amount = Number(value);
  const formatted = precise ? nairaPrecise.format(Math.abs(amount)) : naira.format(Math.abs(amount));
  if (signed) return `${amount < 0 ? "−" : "+"}${formatted}`;
  return amount < 0 ? `−${formatted}` : formatted;
}

export function formatCompactCurrency(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const amount = Number(value);
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(1)}bn`;
  if (abs >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}m`;
  if (abs >= 1_000) return `₦${(amount / 1_000).toFixed(0)}k`;
  return formatCurrency(amount);
}

export function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  return number.format(Number(value));
}

export function formatPercent(value, { includeSign = false } = {}) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const n = Number(value);
  return `${includeSign && n > 0 ? "+" : ""}${n.toFixed(1)}%`;
}

export function formatDate(value, pattern = "d MMM yyyy") {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export function maskAccount(account = "") {
  const clean = String(account).replace(/\s/g, "");
  return clean.length > 4 ? `•••••••${clean.slice(-4)}` : clean;
}

export function getDaysBetween(start, end) {
  const a = new Date(start);
  const b = new Date(end);
  return Math.max(0, Math.ceil((b - a) / (1000 * 60 * 60 * 24)));
}

export function calculateIndicativeReturn({ amount, rate, months }) {
  const principal = Number(amount) || 0;
  const annualRate = Number(rate) || 0;
  const term = Number(months) || 0;
  const interest = principal * (annualRate / 100) * (term / 12);
  return { interest, total: principal + interest };
}

export function truncate(value, limit = 120) {
  if (!value) return "";
  return value.length > limit ? `${value.slice(0, limit).trim()}…` : value;
}
