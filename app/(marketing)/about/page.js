import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Compass, HeartHandshake, Scale } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { company, milestones, team } from "@/lib/data/site";
import { Avatar } from "@/components/ui/avatar";

export const metadata = {
  title: "About VEE",
  description:
    "Learn about Vee Investment's history, mission, values and the team responsible for its stewardship.",
};

const coreValues = [
  { icon: Scale, title: "Integrity", body: "We say what we mean, document what we decide and hold ourselves to the same standard when no one is watching." },
  { icon: Compass, title: "Clarity", body: "Complex financial ideas should be explained, not hidden. Plain language is a form of respect." },
  { icon: HeartHandshake, title: "Stewardship", body: "We treat client capital as a responsibility, not a sales opportunity." },
  { icon: Building2, title: "Discipline", body: "A repeatable process is more reliable than a compelling story. We choose process." },
];

export default function AboutPage() {
  const leaders = team.filter((person) => person.group === "Executive").slice(0, 4);
  return (
    <>
      <PageHero
        eyebrow="About Vee Investment"
        title={<>Built for capital that has a <em>purpose.</em></>}
        description="Vee Investment is an investment and wealth management platform built around a simple belief: people make better financial decisions when the terms, risks and trade-offs are clear."
        breadcrumbs={[{ label: "About" }]}
        actions={
          <>
            <Link href="/team" className="btn btn-primary">Meet our team <ArrowRight size={16} /></Link>
            <Link href="/careers" className="btn btn-outline">Work with us</Link>
          </>
        }
        aside={
          <div className="hero-aside-card">
            <h3>At a glance</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Founded</span><strong>{company.founded}</strong></div>
              <div className="hero-aside-row"><span>Headquarters</span><strong>Lagos, Nigeria</strong></div>
              <div className="hero-aside-row"><span>Focus</span><strong>Long-term stewardship</strong></div>
              <div className="hero-aside-row"><span>Model</span><strong>Advised & managed</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container about-intro-grid">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>We started with a question about trust.</h2>
          </div>
          <div>
            <p>
              VEE was founded in 2016 by a small team who had spent years inside large
              financial institutions and saw the same gap repeatedly: clients were often
              shown the product, but rarely the full picture. The fee that mattered, the
              liquidity constraint, the risk that was not on the first page — these were
              left for later.
            </p>
            <p>
              We built VEE to close that gap. The firm began with advisory work for
              families and founders, then developed managed fixed-income and multi-asset
              mandates. Over time, the same principles extended into onboarding, document
              review and the digital client experience.
            </p>
            <p>
              Today the platform is designed around one connected journey: a clear public
              introduction, a considered onboarding process, a private client workspace
              and a disciplined operations layer behind it. This demonstration represents
              the next stage of that work.
            </p>
            <span className="badge badge-sand">Demonstration history · sample content</span>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="What guides us"
            title="Values that survive pressure."
            description="These are the standards we use to test a decision when the commercial answer and the right answer are not the same."
          />
          <div className="about-values">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <article className="about-value" key={value.title}>
                  <span><Icon size={18} /></span>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              );
            })}
          </div>
          <div className="about-stat-band" style={{ marginTop: 38 }}>
            {company.stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mission-panel">
            <div className="mission-copy">
              <p className="eyebrow">Mission</p>
              <h2>Make considered investing <em>understandable.</em></h2>
              <p>
                We exist to give individuals and enterprises the clarity, tools and discipline
                to make financial decisions they can stand behind — with full visibility of
                the trade-offs.
              </p>
            </div>
            <div className="mission-copy">
              <p className="eyebrow">Vision</p>
              <h2>A higher standard of <em>financial trust.</em></h2>
              <p>
                We are working toward a wealth management experience where transparency,
                documented decisions and human service are the baseline — not premium features.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container editorial-split">
          <div className="editorial-image">
            <Image src="/images/site/site-1.jpg" alt="The VEE team in a working session" fill sizes="(max-width: 960px) 100vw, 50vw" />
            <div className="editorial-image-card">
              <p>“We measure success by whether a client would make the same decision again with the same information.”</p>
              <span>Amara Eze · Chair of the Board</span>
            </div>
          </div>
          <div className="editorial-copy">
            <p className="eyebrow">Business philosophy</p>
            <h2>Advice first. <em>Product second.</em></h2>
            <p>
              Products are tools. They only make sense in the context of a goal, a time
              horizon and an ability to tolerate loss. That is why our process starts with
              a conversation and a documented understanding, not a recommendation.
            </p>
            <div className="editorial-points">
              <div className="editorial-point">
                <span><ArrowRight size={13} /></span>
                <div><strong>No guaranteed outcomes</strong><p>We explain what can go wrong as clearly as what we are trying to achieve.</p></div>
              </div>
              <div className="editorial-point">
                <span><ArrowRight size={13} /></span>
                <div><strong>No hidden incentives</strong><p>Fees and conflicts should be visible before a decision, not discovered afterwards.</p></div>
              </div>
              <div className="editorial-point">
                <span><ArrowRight size={13} /></span>
                <div><strong>No silent changes</strong><p>Sensitive records and financial history are changed through auditable workflows.</p></div>
              </div>
            </div>
            <Link href="/risk-disclosure" className="btn btn-outline">Read our risk disclosure</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Milestones"
            title="A decade of building the foundation."
            action={{ label: "Work with us", href: "/careers" }}
          />
          <div className="milestones">
            {milestones.map((milestone) => (
              <div className="milestone" key={milestone.year}>
                <span className="milestone-year">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title="Accountable at the top."
            description="A leadership team with experience across investment management, audit, operations and regulated client service."
            action={{ label: "Meet everyone", href: "/team" }}
          />
          <div className="team-grid">
            {leaders.map((person) => (
              <article className="team-card" key={person.slug}>
                <div className="team-photo">
                  <Image src={person.image} alt={`Portrait of ${person.name}`} fill sizes="(max-width: 720px) 100vw, 25vw" />
                </div>
                <div className="team-copy">
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                  <div className="team-focus">{person.focus}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="newsletter-panel">
            <div>
              <p className="eyebrow">A conversation</p>
              <h2>Want to understand how we think?</h2>
              <p>Start with our insights, or speak to the client team about your circumstances.</p>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <Link href="/insights" className="btn btn-primary">Read our insights <ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn btn-outline">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
