import Link from "next/link";
import { CheckCircle2, Info, ShieldCheck } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export function AuthIntro({ eyebrow, title, description }) {
  return (
    <div className="auth-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function AuthAlert({ tone = "error", children }) {
  const IconComponent = tone === "success" ? CheckCircle2 : tone === "info" ? Info : ShieldCheck;
  return (
    <div className={`auth-alert auth-alert-${tone}`} role={tone === "error" ? "alert" : "status"}>
      <IconComponent size={18} />
      <div>{children}</div>
    </div>
  );
}

export function AuthSuccess({ icon = "mail", title, description, children }) {
  return (
    <div className="auth-success">
      <span className="auth-success-icon"><Icon name={icon} size={26} /></span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
}

export function AuthFooterLink({ prompt, linkLabel, href }) {
  return (
    <p className="auth-footer-link">
      {prompt} <Link href={href}>{linkLabel}</Link>
    </p>
  );
}
