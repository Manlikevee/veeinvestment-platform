import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { LoaderCircle } from "lucide-react";

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
  outline: "btn btn-outline",
  danger: "btn btn-danger",
  dark: "btn btn-dark",
};

export function Button({
  as,
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  icon: IconComponent,
  iconRight: IconRight,
  ...props
}) {
  const classes = cn(
    variants[variant] || variants.primary,
    size === "sm" && "btn-sm",
    size === "lg" && "btn-lg",
    size === "icon" && "btn-icon",
    className,
  );
  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...props}>
        {IconComponent ? <IconComponent size={17} aria-hidden="true" /> : null}
        {children}
        {IconRight ? <IconRight size={17} aria-hidden="true" /> : null}
      </Link>
    );
  }
  const Tag = as || "button";
  return (
    <Tag className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <LoaderCircle size={17} className="spin" aria-hidden="true" />
      ) : IconComponent ? (
        <IconComponent size={17} aria-hidden="true" />
      ) : null}
      {children}
      {IconRight ? <IconRight size={17} aria-hidden="true" /> : null}
    </Tag>
  );
}
