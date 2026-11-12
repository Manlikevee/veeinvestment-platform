import { insights, products } from "@/lib/data/site";
import { siteConfig } from "@/lib/config/site";

const staticRoutes = [
  "", "/about", "/services", "/investments", "/team", "/contact", "/faq",
  "/insights", "/how-it-works", "/careers", "/help", "/privacy-policy", "/terms",
  "/risk-disclosure", "/cookie-policy", "/security", "/complaints",
];

export default function sitemap() {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}/investments/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...insights.map((article) => ({
      url: `${siteConfig.url}/insights/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
