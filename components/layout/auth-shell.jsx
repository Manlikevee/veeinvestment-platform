import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const assurances = [
  "Secure, role-aware account access",
  "Clear verification steps — no surprises",
  "Human support when you need it",
];

export function AuthShell({ children, context = "Client portal" }) {
  return (
    <div className="auth-layout">
      <header className="auth-topbar">
        <Logo />
        <div className="auth-topbar-actions">
          <Link href="/" className="auth-back-link"><ArrowLeft size={15} /> Back to website</Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="auth-grid">
        <main id="main" className="auth-main">
          <div className="auth-main-inner">{children}</div>
          <footer className="auth-footer">
            <span>© 2026 Vee Investment</span>
            <div>
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/security">Security</Link>
            </div>
          </footer>
        </main>

        <aside className="auth-aside" aria-label="Platform assurances">
          <div className="auth-aside-pattern" aria-hidden="true" />
          <div className="auth-aside-content">
            <p className="eyebrow light">{context}</p>
            <h2>Clarity is the beginning of good stewardship.</h2>
            <p className="auth-aside-lede">
              Your investments, documents and decisions — held together in one considered workspace.
            </p>

            <div className="auth-preview-card">
              <div className="auth-preview-head">
                <div>
                  <span>Portfolio overview</span>
                  <strong>₦14,285,600</strong>
                </div>
                <span className="auth-preview-badge">Illustrative</span>
              </div>
              <div className="auth-preview-chart" aria-hidden="true">
                {[42, 55, 49, 66, 62, 81, 74, 90, 84, 96].map((height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="auth-preview-foot">
                <span><i className="dot-emerald" /> Active allocations</span>
                <span>+7.4% YTD</span>
              </div>
            </div>

            <ul className="auth-assurances">
              {assurances.map((item) => (
                <li key={item}><span><Check size={13} /></span>{item}</li>
              ))}
            </ul>

            <div className="auth-aside-note">
              <ShieldCheck size={17} />
              <p>Demonstration environment. Never enter real credentials or sensitive financial information.</p>
            </div>
          </div>
          <div className="auth-aside-bottom">
            <span><LockKeyhole size={14} /> Secure session design</span>
            <span>Powered by VEE</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
