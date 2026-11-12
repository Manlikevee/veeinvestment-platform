import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Check, CheckCircle2,
  ChevronRight, CircleDollarSign, Clock3, FileCheck2, Fingerprint, LockKeyhole,
  ShieldCheck, Sparkles, Users, Wallet,
} from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProductCard } from "@/components/marketing/product-card";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { ArticleCard } from "@/components/marketing/article-card";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { faqs, insights, milestones, products, services, testimonials } from "@/lib/data/site";

const processSteps = [
  { title: "Create your account", body: "Start with the essentials. Your details are captured securely and you can save your progress.", tag: "2 minutes" },
  { title: "Complete onboarding", body: "Tell us about your goals, horizon and experience so we can assess suitability properly.", tag: "Guided" },
  { title: "Verify your identity", body: "Upload the required identity and address documents. A human reviewer considers the evidence.", tag: "Secure" },
  { title: "Explore opportunities", body: "Compare products by term, minimum, risk classification and liquidity terms.", tag: "Transparent" },
  { title: "Apply with clarity", body: "Review the full terms, fees and risks before making an application. No pressure, no hidden steps.", tag: "Informed" },
  { title: "Fund and monitor", body: "Once approved, follow authenticated payment instructions and track your portfolio in one place.", tag: "Ongoing" },
];

const values = [
  {
    icon: "shield-check",
    title: "Stewardship before sales",
    body: "We would rather explain a trade-off clearly than promise an outcome we cannot control.",
  },
  {
    icon: "eye",
    title: "Transparency by default",
    body: "Fees, risks and terms are visible before you commit — not buried in a footnote.",
  },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);
  const featuredArticles = insights.slice(0, 3);
  const homeFaqs = faqs.filter((item) => ["General", "Investments", "Verification"].includes(item.category)).slice(0, 5);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span><Sparkles size={11} /> VEE 2.0</span>
              Considered investing, made visible
            </div>
            <h1>
              Build wealth
              <br />
              with <em>clarity.</em>
            </h1>
            <p className="hero-lede">
              A disciplined approach to investment and wealth management — combining
              institutional thinking, transparent products and human guidance.
            </p>
            <div className="hero-actions">
              <Link href="/auth/register" className="btn btn-primary btn-lg">
                Start your journey <ArrowRight size={17} />
              </Link>
              <Link href="/investments" className="btn btn-outline btn-lg">
                Explore investments
              </Link>
            </div>
            <p className="hero-note">
              <ShieldCheck size={15} />
              <strong>Your terms, explained.</strong> Risk and fees disclosed before you commit.
            </p>
          </div>

          <div className="hero-visual" aria-label="Illustrative portfolio dashboard preview">
            <div className="hero-dashboard">
              <div className="dashboard-topline">
                <span>Portfolio overview</span>
                <span className="dashboard-live"><i /> Illustrative</span>
              </div>
              <p className="hero-balance-label">Total portfolio value</p>
              <p className="hero-balance">₦14,285,600</p>
              <div className="hero-balance-row">
                <span>+7.4%</span>
                <span>since inception · demo data</span>
              </div>
              <div className="hero-chart" aria-hidden="true">
                <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#007146" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#007146" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 88 C24 86 30 72 55 74 S90 91 115 67 S150 58 175 62 S209 75 236 52 S270 38 296 46 S330 31 355 24 S385 18 400 12 L400 120 L0 120 Z" fill="url(#heroArea)" />
                  <path d="M0 88 C24 86 30 72 55 74 S90 91 115 67 S150 58 175 62 S209 75 236 52 S270 38 296 46 S330 31 355 24 S385 18 400 12" fill="none" stroke="#007146" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M0 102 C30 100 50 103 80 96 S130 99 160 88 S210 94 240 82 S300 86 330 72 S370 78 400 66" fill="none" stroke="#c4a46e" strokeWidth="1.3" strokeDasharray="4 5" opacity="0.8" />
                </svg>
              </div>
              <div className="hero-chart-labels" aria-hidden="true">
                <span>Dec</span><span>Feb</span><span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span><span>Nov</span>
              </div>
              <div className="hero-allocation">
                <div className="hero-allocation-title"><span>Allocation</span><span>Current</span></div>
                <div className="hero-allocation-row"><i style={{ background: "#007146" }} /><span>Fixed income</span><span>48%</span></div>
                <div className="hero-allocation-row"><i style={{ background: "#3f9c76" }} /><span>Impact</span><span>22%</span></div>
                <div className="hero-allocation-row"><i style={{ background: "#c4a46e" }} /><span>Liquidity</span><span>14%</span></div>
                <div className="hero-allocation-row"><i style={{ background: "#8fb9a3" }} /><span>Alternatives</span><span>16%</span></div>
              </div>
            </div>
            <div className="floating-note">
              <span className="floating-note-icon"><FileCheck2 size={17} /></span>
              <div>
                <strong>KYC review complete</strong>
                <span>Document decision recorded</span>
              </div>
              <span className="badge badge-emerald">Demo</span>
            </div>
            <span className="visual-caption">Illustrative interface · not live financial data</span>
          </div>
        </div>

        <div className="container hero-stats">
          <div className="hero-stat"><strong>10+</strong><span>Years of stewardship</span><small>Founded 2016</small></div>
          <div className="hero-stat"><strong>1,240+</strong><span>Investor relationships</span><small>Illustrative platform data</small></div>
          <div className="hero-stat"><strong>₦18.4bn</strong><span>Assets under review</span><small>Demonstration figure</small></div>
          <div className="hero-stat"><strong>24/5</strong><span>Client support</span><small>Weekdays, WAT</small></div>
        </div>
      </section>

      <div className="trust-strip">
        <span><BadgeCheck size={15} /> Disciplined investment process</span>
        <span><Fingerprint size={15} /> Identity-led onboarding</span>
        <span><LockKeyhole size={15} /> Role-based access controls</span>
        <span><Users size={15} /> Human client support</span>
      </div>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why VEE"
            title={<>A financial partner that values <em>restraint.</em></>}
            serif
            description="Trust is built in the details: what we disclose, how we decide and what we refuse to promise. We bring institutional discipline to personal capital."
            action={{ label: "About Vee Investment", href: "/about" }}
          />
          <div className="value-grid">
            <div className="value-lead">
              <div>
                <p className="eyebrow light">Our operating belief</p>
                <h2>Good stewardship starts with <em>honest questions.</em></h2>
              </div>
              <div>
                <p>
                  What is this capital for? When will it be needed? What happens if the
                  market moves against us? We begin with those questions — not a product.
                </p>
                <div className="value-lead-stat">
                  <strong>1:1</strong>
                  <span>Every client relationship is supported by a named service team.</span>
                </div>
              </div>
            </div>
            <div className="value-side">
              {values.map((value) => (
                <article className="value-card" key={value.title}>
                  <div>
                    <span className="value-card-icon"><Icon name={value.icon} size={19} /></span>
                    <h3>{value.title}</h3>
                    <p>{value.body}</p>
                  </div>
                  <Link href="/about" className="text-link">Our approach <ArrowRight size={14} /></Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Investment opportunities"
            title={<>Considered ways to <em>put capital to work.</em></>}
            serif
            description="A configurable range of fixed income, multi-asset and real-asset strategies. Each opportunity carries its own terms, liquidity profile and risk classification."
            action={{ label: "View all opportunities", href: "/investments" }}
          />
          <div className="product-grid">
            {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <p className="auth-demo-note" style={{ marginTop: 18 }}>
            All product terms, target returns and availability are demonstration data. They are not an offer to invest.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container steps-layout">
          <div className="steps-intro">
            <p className="eyebrow">How it works</p>
            <h2>From first question to a considered portfolio.</h2>
            <p>
              A deliberate path with clear checkpoints. You control each step, we explain
              what is needed and nothing moves forward without your authority.
            </p>
            <Link href="/how-it-works" className="btn btn-outline">See the full process</Link>
          </div>
          <div className="step-list">
            {processSteps.map((step, index) => (
              <div className="step-row" key={step.title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                <span className="badge badge-neutral">{step.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container editorial-split">
          <div className="editorial-image">
            <Image src="/images/site/site-1.jpg" alt="A team in discussion around a table" fill sizes="(max-width: 960px) 100vw, 50vw" />
            <div className="editorial-image-card">
              <p>
                “Products change. Markets move. The quality of the decision — and the
                clarity behind it — is what compounds over time.”
              </p>
              <span>Tolu Adebayo · Chief Executive Officer</span>
            </div>
          </div>
          <div className="editorial-copy">
            <p className="eyebrow">The VEE approach</p>
            <h2>Institutional thinking. <em>Human context.</em></h2>
            <p>
              We combine a documented investment process with the patience to understand
              the life behind the capital. That means less noise, clearer choices and a
              portfolio built around your actual horizon.
            </p>
            <div className="editorial-points">
              <div className="editorial-point">
                <span><Check size={13} /></span>
                <div><strong>Mandate-led portfolios</strong><p>Clear objectives and risk limits guide every allocation decision.</p></div>
              </div>
              <div className="editorial-point">
                <span><Check size={13} /></span>
                <div><strong>Liquidity in the conversation</strong><p>Near-term needs are planned for before long-term capital is committed.</p></div>
              </div>
              <div className="editorial-point">
                <span><Check size={13} /></span>
                <div><strong>Decisions you can trace</strong><p>Approvals, document reviews and changes are recorded in an audit trail.</p></div>
              </div>
            </div>
            <Link href="/team" className="btn btn-primary">Meet the team <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="A connected set of services."
            description="From investment management to borrowing and support, each service is designed to work within one clear view of your financial life."
            action={{ label: "Explore services", href: "/services" }}
          />
          <div className="services-bento">
            {services.slice(0, 5).map((service, index) => (
              <article className={`service-card${index === 0 ? " featured" : ""}${index === 4 ? " dark" : ""}`} key={service.slug}>
                <div>
                  <span className="service-icon"><Icon name={service.icon} size={20} /></span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-card-footer">
                  <Link className="link-arrow" href={`/services#${service.slug}`}>
                    Learn more <span><ArrowRight size={14} /></span>
                  </Link>
                </div>
                <span className="service-watermark" aria-hidden="true"><Icon name={service.icon} size={110} /></span>
              </article>
            ))}
            <article className="service-card">
              <div>
                <span className="service-icon"><Icon name="life-buoy" size={20} /></span>
                <h3>Client support</h3>
                <p>Secure tickets, documented responses and a named team when you need help.</p>
              </div>
              <div className="service-card-footer">
                <Link className="link-arrow" href="/contact">Contact us <span><ArrowRight size={14} /></span></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="mission-panel">
            <div className="mission-copy">
              <p className="eyebrow">Mission & vision</p>
              <h2>Make considered investing <em>understandable.</em></h2>
              <p>
                Our mission is to give individuals and enterprises the clarity, tools and
                discipline to make financial decisions they can stand behind. Our vision is
                a wealth management experience where transparency is the default, not a feature.
              </p>
              <Link href="/about" className="btn btn-light" style={{ marginTop: 24 }}>
                Read our story <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mission-stats">
              <div className="mission-stat"><strong>2016</strong><span>Year founded</span></div>
              <div className="mission-stat"><strong>6</strong><span>Investment strategies in the demonstration</span></div>
              <div className="mission-stat"><strong>12</strong><span>Onboarding steps designed for completeness</span></div>
              <div className="mission-stat"><strong>100%</strong><span>Illustrative data labelled across the platform</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionHeading eyebrow="Milestones" title="A decade of building discipline." action={{ label: "About our history", href: "/about" }} />
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
            eyebrow="Client perspective"
            title="Calm, considered relationships."
            description="Illustrative client stories. Real client outcomes depend on individual circumstances and are never guaranteed."
          />
          <div className="testimonial-grid">
            <article className="testimonial-lead">
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>{testimonials[0].quote}</blockquote>
              <div className="testimonial-person">
                <Avatar name={testimonials[0].name} size="md" tone="emerald" />
                <div><strong>{testimonials[0].name}</strong><span>{testimonials[0].role} · {testimonials[0].detail}</span></div>
              </div>
            </article>
            <div className="testimonial-side">
              {testimonials.slice(1).map((testimonial) => (
                <article className="testimonial-small" key={testimonial.name}>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <div className="testimonial-person">
                    <Avatar name={testimonial.name} size="sm" tone="sage" />
                    <div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Insights"
            title="Thinking before acting."
            description="Research and education on portfolio construction, risk, liquidity and the behaviour that connects them."
            action={{ label: "All insights", href: "/insights" }}
          />
          <div className="insight-grid">
            <article className="insight-feature">
              <Image src={insights[0].image} alt="" fill sizes="(max-width: 960px) 100vw, 55vw" />
              <div className="insight-feature-content">
                <div className="insight-meta">
                  <span>{insights[0].category}</span><span className="dot" />
                  <span>{insights[0].readTime}</span>
                </div>
                <h3>{insights[0].title}</h3>
                <p>{insights[0].excerpt}</p>
                <Link href={`/insights/${insights[0].slug}`} className="btn btn-light btn-sm" style={{ marginTop: 16 }}>
                  Read the article <ArrowRight size={15} />
                </Link>
              </div>
            </article>
            <div className="insight-list">
              {featuredArticles.slice(1).map((article) => (
                <article className="insight-list-item" key={article.slug}>
                  <div className="insight-meta">
                    <span>{article.category}</span><span className="dot" />
                    <span>{article.readTime}</span>
                  </div>
                  <Link href={`/insights/${article.slug}`}><h3>{article.title}</h3></Link>
                  <p>{article.excerpt}</p>
                  <Link href={`/insights/${article.slug}`} className="text-link">Read more <ChevronRight size={13} /></Link>
                </article>
              ))}
              <article className="insight-list-item">
                <div className="insight-meta"><span>Market perspectives</span><span className="dot" /><span>5 min read</span></div>
                <Link href={`/insights/${insights[2].slug}`}><h3>{insights[2].title}</h3></Link>
                <p>{insights[2].excerpt}</p>
                <Link href={`/insights/${insights[2].slug}`} className="text-link">Read more <ChevronRight size={13} /></Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container faq-cta-layout">
          <div className="faq-cta-intro">
            <p className="eyebrow">Questions, answered</p>
            <h2>A clearer place to start.</h2>
            <p>
              If something is not covered here, our client team can help. No jargon,
              no pressure — just a straight answer.
            </p>
            <Link href="/faq" className="btn btn-outline">Visit the full FAQ</Link>
          </div>
          <Accordion items={homeFaqs} defaultOpen={0} />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="newsletter-panel">
            <div>
              <p className="eyebrow">VEE notes</p>
              <h2>Considered thinking, occasionally in your inbox.</h2>
              <p>Research notes, product updates and practical explainers. You can unsubscribe at any time.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="editorial-split" style={{ alignItems: "center" }}>
            <div>
              <p className="eyebrow">Ready when you are</p>
              <h2 className="display" style={{ fontSize: "clamp(2.4rem, 4.4vw, 4rem)" }}>
                Let&apos;s build a clearer <em>financial future.</em>
              </h2>
              <p style={{ maxWidth: 520, marginTop: 18, color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                Open an account to preview the onboarding and client portal. Or speak with
                our team first. Either way, you decide what happens next.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 25 }}>
                <Link href="/auth/register" className="btn btn-primary btn-lg">Create an account <ArrowRight size={17} /></Link>
                <Link href="/contact" className="btn btn-outline btn-lg">Talk to us</Link>
              </div>
            </div>
            <div className="value-side" style={{ display: "grid", gridTemplateRows: "auto auto" }}>
              <article className="value-card">
                <div>
                  <span className="value-card-icon"><Clock3 size={18} /></span>
                  <h3>Start in minutes</h3>
                  <p>Save your onboarding progress and return when it suits you.</p>
                </div>
              </article>
              <article className="value-card">
                <div>
                  <span className="value-card-icon"><LockKeyhole size={18} /></span>
                  <h3>Your access, controlled</h3>
                  <p>Role-based tools, session management and a record of sensitive actions.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
