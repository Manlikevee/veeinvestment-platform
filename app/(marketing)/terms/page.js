import { LegalDocument } from "@/components/marketing/legal-document";

export const metadata = { title: "Terms of use", description: "The terms governing use of the Vee Investment platform. Draft content for legal review." };

export default function TermsPage() {
  return <LegalDocument documentKey="terms" />;
}
