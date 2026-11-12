import Link from "next/link";
import { Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "@/components/marketing/contact-form";
import { company } from "@/lib/data/site";
import { SocialIcon } from "@/components/ui/social-icon";

export const metadata = {
  title: "Contact",
  description: "Speak with the Vee Investment team about investments, onboarding, verification or support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s start with a <em>conversation.</em></>}
        description="Whether you are exploring an investment, need help with your account or want to discuss a partnership, our team will route your enquiry to the right person."
        breadcrumbs={[{ label: "Contact" }]}
        aside={
          <div className="hero-aside-card">
            <h3>Response expectations</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>General enquiries</span><strong>1 business day</strong></div>
              <div className="hero-aside-row"><span>Client support</span><strong>Same day</strong></div>
              <div className="hero-aside-row"><span>Complaints</span><strong>Acknowledged promptly</strong></div>
              <div className="hero-aside-row"><span>Hours</span><strong>Mon–Fri, WAT</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <p className="eyebrow">Speak with us</p>
            <h2>Human help, clear next steps.</h2>
            <p>
              Do not send passwords, one-time codes or full card details through this form.
              For account-specific requests, use the secure support centre in your client portal.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <span className="contact-detail-icon"><Mail size={17} /></span>
                <div><strong>Email</strong><a href={`mailto:${company.email}`}>{company.email}</a><br /><a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a></div>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-icon"><Phone size={17} /></span>
                <div><strong>Phone</strong><a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}>{company.phone}</a><br /><span style={{ color: "var(--text-tertiary)", fontSize: "0.7rem" }}>International: {company.internationalPhone}</span></div>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-icon"><MapPin size={17} /></span>
                <div><strong>Office</strong><p>{company.address}</p></div>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-icon"><Clock3 size={17} /></span>
                <div><strong>Business hours</strong><p>{company.hours}</p></div>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-icon"><ShieldCheck size={17} /></span>
                <div><strong>Security concern</strong><p>Email <a href="mailto:security@veeinvestment.com">security@veeinvestment.com</a>. Do not include your password.</p></div>
              </div>
            </div>
            <div className="footer-socials" style={{ marginTop: 22 }}>
              {company.socials.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
            <div className="map-placeholder" aria-label="Map placeholder showing the Lagos office location">
              <div className="map-pin"><span><MapPin size={18} /></span>Victoria Island, Lagos</div>
            </div>
            <p style={{ marginTop: 9, color: "var(--text-tertiary)", fontSize: "0.6rem" }}>
              Map placeholder. A production deployment should use an approved mapping provider.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="newsletter-panel">
            <div>
              <p className="eyebrow">Existing client?</p>
              <h2>Use the secure support centre.</h2>
              <p>Account-specific requests are handled in the client portal with a reference, owner and full conversation history.</p>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <Link href="/auth/login" className="btn btn-primary">Sign in</Link>
              <Link href="/help" className="btn btn-outline">Visit help centre</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
