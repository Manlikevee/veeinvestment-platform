import { siteConfig } from "@/lib/config/site";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/dashboard", "/auth", "/onboarding"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
