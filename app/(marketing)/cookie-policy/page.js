import { LegalDocument } from "@/components/marketing/legal-document";

export const metadata = { title: "Cookie policy", description: "How Vee Investment uses cookies and local preferences. Draft content for legal review." };

export default function CookiePolicyPage() {
  return <LegalDocument documentKey="cookie-policy" />;
}
