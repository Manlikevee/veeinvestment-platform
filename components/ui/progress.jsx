export function ProgressBar({ value = 0, tone = "brand" }) {
  return <div className="progress"><span style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: tone === "brand" ? undefined : "var(--warning)" }} /></div>;
}
