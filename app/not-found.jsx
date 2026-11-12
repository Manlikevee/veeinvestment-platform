import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Logo } from "@/components/ui/logo";
export default function NotFound() {
  return <div className="auth-gate-loading" style={{ minHeight: "100vh" }}><Logo /><p className="eyebrow" style={{ marginTop: 18 }}>404</p><h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.6rem", fontWeight: 400 }}>We could not find that page.</h1><p style={{ maxWidth: 440 }}>The link may be outdated, or the record may not exist. Return to the website or contact support if you followed a valid link.</p><div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}><Link href="/" className="btn btn-primary"><ArrowLeft size={16} /> Back home</Link><Link href="/investments" className="btn btn-outline"><Search size={16} /> Explore investments</Link><Link href="/contact" className="btn btn-ghost">Contact support</Link></div></div>;
}
