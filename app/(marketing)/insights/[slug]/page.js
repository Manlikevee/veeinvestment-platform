import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ArticleShare } from "@/components/marketing/article-share";
import { ArticleCard } from "@/components/marketing/article-card";
import { insights } from "@/lib/data/site";
import { formatDate } from "@/lib/utils/format";

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [article.image] },
  };
}

export default async function InsightDetailPage({ params }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = insights.filter((item) => item.slug !== article.slug).slice(0, 3);
  const articleUrl = `https://veeinvestment.com/insights/${article.slug}`;

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        breadcrumbs={[{ label: "Insights", href: "/insights" }, { label: article.category }]}
        actions={
          <>
            <Link href="/insights" className="btn btn-outline"><ArrowLeft size={15} /> All insights</Link>
            <span className="badge badge-neutral">{article.readTime}</span>
          </>
        }
        aside={
          <div className="hero-aside-card">
            <h3>Article details</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Author</span><strong>{article.author}</strong></div>
              <div className="hero-aside-row"><span>Published</span><strong>{formatDate(article.date)}</strong></div>
              <div className="hero-aside-row"><span>Category</span><strong>{article.category}</strong></div>
              <div className="hero-aside-row"><span>Reading time</span><strong>{article.readTime}</strong></div>
            </div>
          </div>
        }
      />
      <div className="container">
        <div className="article-cover">
          <Image src={article.image} alt="" fill sizes="(max-width: 1000px) 100vw, 980px" priority />
        </div>
      </div>

      <section className="section">
        <div className="container article-layout">
          <article className="article-body">
            {article.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            ))}
            <div className="article-takeaways">
              <h3>Key takeaways</h3>
              <ul>
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway}><Check size={15} /> {takeaway}</li>
                ))}
              </ul>
            </div>
            <p className="article-disclaimer">{article.disclaimer} This article is illustrative demonstration content and should be reviewed by qualified professionals before publication.</p>
            <ArticleShare title={article.title} url={articleUrl} />
          </article>
          <aside className="article-sidebar">
            <h3>Related reading</h3>
            <div className="related-list">
              {related.map((item) => (
                <Link href={`/insights/${item.slug}`} className="related-item" key={item.slug}>
                  <h4>{item.title}</h4>
                  <span>{item.category} · {item.readTime}</span>
                </Link>
              ))}
            </div>
            <div className="sidebar-card" style={{ marginTop: 20 }}>
              <h3>Need help applying this?</h3>
              <p>Our team can explain how the ideas relate to your circumstances, within the scope of any advisory agreement.</p>
              <Link href="/contact" className="btn btn-primary">Talk to us</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="eyebrow">Continue reading</p>
              <h2>More considered thinking.</h2>
            </div>
            <Link href="/insights" className="link-arrow">All insights <span><ArrowRight size={15} /></span></Link>
          </div>
          <div className="insights-grid">
            {related.map((item) => <ArticleCard key={item.slug} article={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
