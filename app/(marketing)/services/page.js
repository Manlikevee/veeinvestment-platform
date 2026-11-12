import Link from "next/link";
import { ArrowRight, Check, Clock3, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/ui/icon";
import { services } from "@/lib/data/site";

export const metadata = {
  title: "Services",
  description:
    "Investment management, portfolio oversight, advisory, loan services, wealth planning and client support from Vee Investment.",
};

const serviceFaqs = [
  { q: "Are all services available in every market?", a: "No. Availability depends on your jurisdiction, eligibility and the permissions of the relevant entity. The platform displays only services that are configured as available. Contact us to confirm your market." },
  { q: "Is advisory included automatically?", a: "No. Advisory is a separate service with its own scope and terms. Access to the client portal or an investment product does not by itself create an advisory relationship." },
  { q: "How are service fees disclosed?", a: "Fees are disclosed in the relevant product or service terms before you commit. Where a fee depends on your circumstances, we explain the basis before engagement." },
  { q: "Can I use more than one service?", a: "Yes, where eligible. Many clients combine a managed portfolio with document support or a lending facility. Each service is governed by its own terms." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>One standard of care. <em>Several ways to work together.</em></>}
        description="From managing a portfolio to arranging a facility or simply getting a clear answer, our services are designed around the same principles: documented terms, visible risks and accountable service."
        breadcrumbs={[{ label: "Services" }]}
        actions={
          <>
            <Link href="/contact" className="btn btn-primary">Speak with our team <ArrowRight size={16} /></Link>
            <Link href="/investments" className="btn btn-outline">View opportunities</Link>
          </>
        }
        aside={
          <div className="hero-aside-card">
            <h3>Service principles</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Scope</span><strong>Written & agreed</strong></div>
              <div className="hero-aside-row"><span>Fees</span><strong>Disclosed upfront</strong></div>
              <div className="hero-aside-row"><span>Records</span><strong>Auditable</strong></div>
              <div className="hero-aside-row"><span>Support</span><strong>Named team</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <p className="eyebrow">What we offer</p>
              <h2>Services that connect to a wider plan.</h2>
            </div>
            <div>
              <p>
                Financial life is rarely organised into neat categories. A portfolio, a
                property decision and a short-term cash need can all affect one another.
                Our services are designed to be considered together, with clear boundaries
                between advice, execution and product provision.
              </p>
              <div className="info-note" style={{ marginTop: 18 }}>
                <ShieldCheck size={17} />
                <span>Availability is configuration-led. Services not approved for your jurisdiction or eligibility profile will not be offered.</span>
              </div>
            </div>
          </div>

          <div className="services-detail-list">
            {services.map((service, index) => (
              <article className="service-detail-card" id={service.slug} key={service.slug}>
                <div className="service-detail-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="service-detail-main">
                  <span className="service-icon"><Icon name={service.icon} size={20} /></span>
                  <div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>
                </div>
                <div className="service-detail-side">
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}><Check size={13} /> {feature}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="text-link">Discuss this service <ArrowRight size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Built around the relationship"
            title="What you can expect."
            description="These commitments are written into how we design the platform, not just what we say on a website."
          />
          <div className="about-values">
            <article className="about-value"><span><Clock3 size={18} /></span><h3>Timely responses</h3><p>Support requests receive a reference, an owner and a response target.</p></article>
            <article className="about-value"><span><ShieldCheck size={18} /></span><h3>Clear risk language</h3><p>We explain the downside before the potential upside.</p></article>
            <article className="about-value"><span><Check size={18} /></span><h3>Documented decisions</h3><p>Applications, reviews and changes are recorded with reasons.</p></article>
            <article className="about-value"><span><Icon name="life-buoy" size={18} /></span><h3>Accountable support</h3><p>Escalation paths are visible, including formal complaints.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-cta-layout">
          <div className="faq-cta-intro">
            <p className="eyebrow">Common questions</p>
            <h2>Before we begin.</h2>
            <p>If your question is not covered, the client team is one message away.</p>
            <Link href="/faq" className="btn btn-outline">See all FAQs</Link>
          </div>
          <Accordion items={serviceFaqs} />
        </div>
      </section>
    </>
  );
}
