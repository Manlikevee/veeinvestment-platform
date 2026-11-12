import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPin, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { careerOpenings } from "@/lib/data/content";
import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata = {
  title: "Careers",
  description: "Explore career opportunities at Vee Investment across product, investments and compliance.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Do your best work <em>with purpose.</em></>}
        description="We are building a financial platform where clarity, rigorous execution and respect for clients are part of the product. If that sounds like your standard, we should talk."
        breadcrumbs={[{ label: "Careers" }]}
        actions={<a href="mailto:careers@veeinvestment.com?subject=General%20career%20enquiry" className="btn btn-primary">Send a speculative application <ArrowRight size={16} /></a>}
        aside={
          <div className="hero-aside-card">
            <h3>Working at VEE</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Location</span><strong>Lagos / Hybrid</strong></div>
              <div className="hero-aside-row"><span>Focus</span><strong>Outcomes, not activity</strong></div>
              <div className="hero-aside-row"><span>Learning</span><strong>Supported</strong></div>
              <div className="hero-aside-row"><span>Hiring</span><strong>Merit-led</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <p className="eyebrow">Why VEE</p>
              <h2>Complex work, done with care.</h2>
            </div>
            <div>
              <p>
                Financial products affect real lives. That reality should show up in how we design,
                write, review and support. We value people who ask good questions, document their
                reasoning and take ownership of the last mile.
              </p>
              <div className="about-values" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 24 }}>
                <article className="about-value"><span><Users size={18} /></span><h3>Small, accountable teams</h3><p>Clear ownership beats diffuse responsibility.</p></article>
                <article className="about-value"><span><HeartHandshake size={18} /></span><h3>Client respect</h3><p>We explain, we do not obscure.</p></article>
                <article className="about-value"><span><Sparkles size={18} /></span><h3>Craft</h3><p>Detail is not decoration; it is how trust is built.</p></article>
                <article className="about-value"><span><MapPin size={18} /></span><h3>Flexible working</h3><p>Hybrid by default, with meaningful in-person time.</p></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Open roles"
            title="Current opportunities."
            description="All roles are illustrative demonstration listings. Applications should not include sensitive personal information."
          />
          <div className="jobs-list">
            {careerOpenings.map((job) => (
              <article className="job-card" key={job.id}>
                <div>
                  <h2>{job.title}</h2>
                  <p>{job.summary}</p>
                  <div className="job-meta"><span><Users size={13} /> {job.team}</span><span><MapPin size={13} /> {job.location}</span><span>{job.type}</span></div>
                </div>
                <div className="job-facts">
                  <div><strong>{job.team}</strong></div>
                  <div>{job.location}</div>
                  <div>{job.type}</div>
                </div>
                <a href={`mailto:careers@veeinvestment.com?subject=${encodeURIComponent(job.title)}%20application`} className="btn btn-outline">
                  Apply <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
          <div className="info-note" style={{ marginTop: 24 }}>
            These are demonstration roles. The application links open your email client; no applicant data is collected by this frontend.
          </div>
        </div>
      </section>
    </>
  );
}
