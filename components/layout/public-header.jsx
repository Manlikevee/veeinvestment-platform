"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { publicNav } from "@/lib/data/site";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { cn } from "@/lib/utils/cn";

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="demo-strip">
        <span>Demonstration environment</span>
        <span className="demo-strip-divider" aria-hidden="true" />
        <span>Company, product and financial data are illustrative only.</span>
      </div>
      <header className={cn("public-header", scrolled && "is-scrolled")}>
        <div className="public-header-inner">
          <Logo />
          <nav className="public-nav" aria-label="Primary navigation">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("public-nav-link", isActive(item.href) && "is-active")}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="public-header-actions">
            <ThemeToggle />
            <Link href="/auth/login" className="header-login">Login</Link>
            <Link href="/auth/register" className="btn btn-primary btn-sm header-cta">
              Get started <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              className="icon-button mobile-menu-button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="mobile-nav-layer" id="mobile-navigation">
          <div className="mobile-nav-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
            <div className="mobile-nav-top">
              <Logo />
              <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close navigation menu">
                <X size={21} />
              </button>
            </div>
            <nav className="mobile-nav-links" aria-label="Mobile primary navigation">
              {publicNav.map((item, index) => (
                <Link key={item.href} href={item.href} className={cn(isActive(item.href) && "is-active")}>
                  <span className="mobile-nav-index">{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                  <ArrowRight size={17} />
                </Link>
              ))}
            </nav>
            <div className="mobile-nav-footer">
              <ThemeToggle />
              <div className="mobile-nav-actions">
                <Link href="/auth/login" className="btn btn-secondary">Login</Link>
                <Link href="/auth/register" className="btn btn-primary">Get started</Link>
              </div>
              <p>Questions? <Link href="/contact">Speak with our team</Link></p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
