"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle, LockKeyhole, ShieldAlert } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { Logo } from "@/components/ui/logo";

export function SessionGuard({ children, allow = [] }) {
  const { session, ready, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready || session) return;
    const next = encodeURIComponent(pathname || "/dashboard");
    router.replace(`/auth/login?next=${next}`);
  }, [ready, session, router, pathname]);

  if (!ready) {
    return (
      <div className="auth-gate-loading" role="status" aria-live="polite">
        <Logo />
        <LoaderCircle size={22} className="spin" />
        <p>Preparing your secure workspace…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="auth-gate-loading">
        <Logo />
        <p>Redirecting you to sign in…</p>
      </div>
    );
  }

  const roleKey = session.user.roleKey;
  const permitted = allow.length === 0 || allow.includes(roleKey);

  if (!permitted) {
    return (
      <div className="access-denied-page">
        <div className="access-denied-card">
          <span className="access-denied-icon"><ShieldAlert size={28} /></span>
          <p className="eyebrow">Access restricted</p>
          <h1>This workspace is not available for your role</h1>
          <p>
            You are signed in as <strong>{session.user.name}</strong> with the{" "}
            <strong>{session.user.role}</strong> role. Front-end access controls are a usability
            layer; every action must also be authorised by the backend.
          </p>
          <div className="access-denied-actions">
            <Link
              href={roleKey === "customer" ? "/dashboard" : "/admin"}
              className="btn btn-primary"
            >
              Go to my workspace
            </Link>
            <button type="button" className="btn btn-outline" onClick={async () => { await logout(); router.push("/auth/login"); }}>
              <LockKeyhole size={16} /> Switch account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
