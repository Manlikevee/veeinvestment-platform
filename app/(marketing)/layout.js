import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="public-shell">
      <PublicHeader />
      <main id="main" className="public-main">{children}</main>
      <PublicFooter />
    </div>
  );
}
