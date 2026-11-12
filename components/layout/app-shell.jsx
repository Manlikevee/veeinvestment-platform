"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GlobalSearch } from "./global-search";
import { useAuth } from "@/providers/auth-provider";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { cn } from "@/lib/utils/cn";

export function AppShell({
  navigation,
  variant = "customer",
  contextLabel,
  searchItems = [],
  notificationHref,
  notificationCount = 0,
  badges = {},
  children,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useScrollLock(mobileOpen);

  const navItems = navigation.flatMap((group) => group.items);
  const current =
    [...navItems].sort((a, b) => b.href.length - a.href.length).find((item) =>
      item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`),
    ) || navItems[0];

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!profileOpen) return undefined;
    const onClick = (event) => {
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, [profileOpen]);

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

  async function handleLogout() {
    await logout();
    router.push("/auth/login");
  }

  const sidebar = (
    <div className="app-sidebar-inner">
      <div className="sidebar-brand">
        <Logo compact={collapsed} inverse={variant === "admin"} />
        <button
          type="button"
          className="sidebar-collapse"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
        </button>
        <button
          type="button"
          className="sidebar-close-mobile"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>

      <div className={cn("sidebar-context", collapsed && "is-collapsed")}>
        <span>{variant === "admin" ? "Operations" : "Client portal"}</span>
        {variant === "admin" ? <span className="system-dot">Live</span> : null}
      </div>

      <nav className="app-nav" aria-label={variant === "admin" ? "Administration navigation" : "Client portal navigation"}>
        {navigation.map((group) => (
          <div className="nav-group" key={group.label}>
            <p className="nav-group-label">{group.label}</p>
            {group.items.map((item) => {
              const active = isActive(item);
              const badge = item.badgeKey ? badges[item.badgeKey] : null;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("app-nav-link", active && "is-active")}
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="nav-label">{item.label}</span>
                  {badge ? <span className="nav-badge">{badge}</span> : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className={cn("sidebar-status-card", collapsed && "is-collapsed")}>
          <span className="status-pulse" aria-hidden="true" />
          <div>
            <strong>{variant === "admin" ? "All systems operational" : "Your data is protected"}</strong>
            <p>{variant === "admin" ? "Last checked 08:42 WAT" : "Session secured · Demo mode"}</p>
          </div>
        </div>
        <Link href={variant === "admin" ? "/help" : "/dashboard/support"} className="sidebar-help">
          <Icon name="life-buoy" size={17} />
          <span>{variant === "admin" ? "Operations help" : "Need help?"}</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={cn("app-shell", `app-shell-${variant}`, collapsed && "is-collapsed")}>
      <aside className="app-sidebar app-sidebar-desktop">{sidebar}</aside>

      {mobileOpen ? (
        <div className="app-sidebar-mobile-layer">
          <div className="app-sidebar-backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <aside className="app-sidebar app-sidebar-mobile" aria-label="Mobile navigation">
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="app-workspace">
        <header className="app-topbar">
          <div className="app-topbar-left">
            <button
              type="button"
              className="icon-button mobile-nav-trigger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <div className="topbar-breadcrumb">
              <span>{contextLabel}</span>
              <ChevronRight size={13} className="breadcrumb-sep" aria-hidden="true" />
              <strong>{current?.label || "Workspace"}</strong>
            </div>
          </div>

          <div className="app-topbar-actions">
            <button type="button" className="topbar-search" onClick={() => setSearchOpen(true)}>
              <Search size={16} />
              <span>Search…</span>
              <kbd>⌘K</kbd>
            </button>
            <ThemeToggle />
            {notificationHref ? (
              <Link href={notificationHref} className="icon-button topbar-notification" aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}>
                <Bell size={18} />
                {notificationCount ? <span className="notification-dot">{notificationCount}</span> : null}
              </Link>
            ) : null}
            <div className="topbar-profile" ref={profileRef}>
              <button
                type="button"
                className="profile-trigger"
                onClick={() => setProfileOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                <Avatar name={user?.name} initials={user?.initials} size="sm" />
                <span className="profile-trigger-copy">
                  <strong>{user?.name || "Demo user"}</strong>
                  <small>{user?.role || "Client"}</small>
                </span>
                <ChevronDown size={14} />
              </button>
              {profileOpen ? (
                <div className="profile-menu" role="menu">
                  <div className="profile-menu-head">
                    <p>{user?.email}</p>
                    <span className="badge badge-emerald">{variant === "admin" ? "Staff access" : "Verified"}</span>
                  </div>
                  <Link href={variant === "admin" ? "/admin/settings" : "/dashboard/profile"} role="menuitem">
                    <User size={16} /> Profile
                  </Link>
                  <Link href={variant === "admin" ? "/admin/settings" : "/dashboard/settings"} role="menuitem">
                    <Settings size={16} /> Settings
                  </Link>
                  <button type="button" role="menuitem" onClick={handleLogout}>
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main id="main" className="app-content">
          {children}
        </main>
        <footer className="app-footer">
          <span>Vee Investment · {variant === "admin" ? "Administration" : "Client portal"}</span>
          <span className="demo-pill">Demonstration data</span>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <span>v2.0</span>
        </footer>
      </div>

      <GlobalSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={searchItems}
        context={variant === "admin" ? "operations" : "your account"}
      />
    </div>
  );
}
