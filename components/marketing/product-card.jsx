import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { formatCompactCurrency } from "@/lib/utils/format";
import { RiskMeter } from "./risk-meter";

export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card-top">
        <span className={`product-icon ${product.color}`}><Icon name={product.icon} size={20} /></span>
        {product.badge ? <span className="badge badge-forest">{product.badge}</span> : null}
      </div>
      <h3>{product.name}</h3>
      <div className="product-category">
        <span>{product.category}</span>
        <span className="dot" />
        <span>{product.status}</span>
      </div>
      <p className="product-summary">{product.summary}</p>

      <div className="product-return">
        <div>
          <span>{product.returnLabel}</span>
          <strong>{product.targetReturn}%</strong>
        </div>
        <span>Illustrative term<br />Not guaranteed</span>
      </div>

      <div className="product-metrics">
        <div className="product-metric">
          <span>Minimum</span>
          <strong>{formatCompactCurrency(product.min)}</strong>
        </div>
        <div className="product-metric">
          <span>Duration</span>
          <strong>{product.durationLabel}</strong>
        </div>
        <div className="product-metric">
          <span>Risk</span>
          <strong>{product.risk}</strong>
        </div>
      </div>

      <div className="product-card-footer">
        <RiskMeter level={product.riskLevel} label={product.risk} />
        <Link className="link-arrow" href={`/investments/${product.slug}`}>
          Learn more <span><ArrowRight size={14} /></span>
        </Link>
      </div>
    </article>
  );
}

export function ProductFeatureList({ items }) {
  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}><Check size={14} /> {item}</li>
      ))}
    </ul>
  );
}
