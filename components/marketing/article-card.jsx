import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

export function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <Link href={`/insights/${article.slug}`} className="article-image" aria-label={article.title}>
        <Image src={article.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
      </Link>
      <div className="article-copy">
        <div className="insight-meta">
          <span>{article.category}</span>
          <span className="dot" />
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className="dot" />
          <span>{article.readTime}</span>
        </div>
        <Link href={`/insights/${article.slug}`}><h3>{article.title}</h3></Link>
        <p>{article.excerpt}</p>
        <Link href={`/insights/${article.slug}`} className="link-arrow">
          Read article <span><ArrowRight size={14} /></span>
        </Link>
      </div>
    </article>
  );
}
