import { LegalDocument } from "@/components/marketing/legal-document";

export const metadata = { title: "Privacy policy", description: "How Vee Investment collects, uses and protects personal information. Draft content for legal review." };

export default function PrivacyPolicyPage() {
  return <LegalDocument documentKey="privacy-policy" />;
}
