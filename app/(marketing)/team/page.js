import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { team } from "@/lib/data/site";

export const metadata = {
  title: "Our team",
  description:
    "Meet the board, executives and management team responsible for Vee Investment's stewardship and client service.",
};

const groups = ["Executive", "Board", "Management"];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={<>People who take <em>stewardship seriously.</em></>}
        description="Investment management is a human responsibility. Our team combines investment, finance, risk and client-service experience — with clear accountability for the decisions that affect you."
        breadcrumbs={[{ label: "Team" }]}
        actions={
          <>
            <Link href="/careers" className="btn btn-primary">Join the team <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn btn-outline">Contact us</Link>
          </>
        }
        aside={
          <div className="hero-aside-card">
            <h3>How we work</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Decisions</span><strong>Committee-led</strong></div>
              <div className="hero-aside-row"><span>Risk</span><strong>Independent oversight</strong></div>
              <div className="hero-aside-row"><span>Client care</span><strong>Named teams</strong></div>
              <div className="hero-aside-row"><span>Accountability</span><strong>Audit trails</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <p className="eyebrow">Leadership with context</p>
              <h2>Different disciplines. One standard.</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8 }}>
              A good investment decision is only part of the work. It must be recorded, explained,
              reviewed and supported. Our structure places investment judgement, risk oversight and
              client service in distinct roles, with governance that keeps them connected.
            </p>
          </div>

          {groups.map((group) => {
            const members = team.filter((person) => person.group === group);
            if (!members.length) return null;
            return (
              <div key={group}>
                <div className="team-group-head">
                  <h2>{group === "Board" ? "Board of directors" : group === "Executive" ? "Executive team" : "Management"}</h2>
                  <span>{members.length} {members.length === 1 ? "person" : "people"}</span>
                </div>
                <div className="team-grid">
                  {members.map((person) => (
                    <article className="team-card" key={person.slug}>
                      <div className="team-photo">
                        <Image
                          src={person.image}
                          alt={`Portrait of ${person.name}`}
                          fill
                          sizes="(max-width: 720px) 100vw, (max-width: 1180px) 33vw, 25vw"
                        />
                      </div>
                      <div className="team-copy">
                        <div className="flex-between" style={{ alignItems: "flex-start" }}>
                          <div>
                            <h3>{person.name}</h3>
                            <p>{person.role}</p>
                          </div>
                          <span className="icon-button" aria-hidden="true"><Linkedin size={15} /></span>
                        </div>
                        <p style={{ marginTop: 10, color: "var(--text-secondary)", fontSize: "0.72rem", lineHeight: 1.65, fontWeight: 400 }}>{person.bio}</p>
                        <div className="team-focus">{person.focus}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="info-note" style={{ marginTop: 32 }}>
            Team names, biographies and photographs are illustrative demonstration content and must be replaced with approved profiles before launch.
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="newsletter-panel">
            <div>
              <p className="eyebrow">Careers</p>
              <h2>Do your best work here.</h2>
              <p>We are building a financial platform where clarity and rigorous execution matter. Explore open roles.</p>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <Link href="/careers" className="btn btn-primary">View open roles <ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn btn-outline">General enquiry</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
