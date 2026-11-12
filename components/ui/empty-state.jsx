import { Icon } from "./icon";
import { cn } from "@/lib/utils/cn";

export function EmptyState({
  icon = "search",
  title = "Nothing here yet",
  description,
  action,
  className = "",
}) {
  return (
    <div className={cn("empty-state", className)}>
      <span className="empty-icon"><Icon name={icon} size={23} /></span>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action ? <div className="empty-action">{action}</div> : null}
    </div>
  );
}
