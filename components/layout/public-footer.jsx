import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { company, footerLinks } from "@/lib/data/site";
import { SocialIcon } from "@/components/ui/social-icon";

export function PublicFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo inverse />
          <p>
            A considered approach to investment and wealth management.
            Built around clarity, stewardship and human service.
          </p>
          <div className="footer-socials" aria-label="Social links">
            {company.socials.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                <SocialIcon name={social.icon} size={16} />
              </a>
            ))}
          </div>
          <p className="footer-contact">
            {company.address}
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <br />
            <a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}>{company.phone}</a>
          </p>
        </div>
        <div className="footer-links">
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h2>{group.heading}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-cta">
        <div>
          <p className="eyebrow light">Start a conversation</p>
          <h2>Ready to invest with more clarity?</h2>
        </div>
        <Link href="/auth/register" className="btn btn-light btn-lg">
          Create your account <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="container footer-disclosure">
        <p>
          <strong>Important:</strong> This is a demonstration platform. Investment values can fall as well as rise.
          Target returns are not guaranteed, and you may get back less than you invest. Product terms, company
          details and regulatory information are illustrative and require approval before launch. Nothing on this
          site constitutes personal financial advice. Read the <Link href="/risk-disclosure">risk disclosure</Link>.
        </p>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 {company.legalName}. All rights reserved.</p>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookie-policy">Cookies</Link>
          <Link href="/security">Security</Link>
        </div>
      </div>
    </footer>
  );
}
