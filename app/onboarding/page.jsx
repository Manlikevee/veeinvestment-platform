import { OnboardingWizard } from "@/features/onboarding/onboarding-wizard";

export const metadata = {
  title: "Client onboarding",
  description: "Complete your Vee Investment onboarding application.",
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
