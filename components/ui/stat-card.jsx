import { Icon } from "./icon";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function StatCard({ label, value, change, detail, icon, tone = "emerald", trend = "up", className = "" }) {
  return (
    <article className={cn("stat-card", className)}>
      <div className="stat-card-top">
        <span className={`stat-icon stat-icon-${tone}`}>
          <Icon name={icon} size={19} />
        </span>
        {change ? (
          <span className={cn("stat-change", trend === "down" ? "is-down" : "is-up")}>
            {trend === "down" ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
            {change}
          </span>
        ) : null}
      </div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {detail ? <p className="stat-detail">{detail}</p> : null}
    </article>
  );
}
