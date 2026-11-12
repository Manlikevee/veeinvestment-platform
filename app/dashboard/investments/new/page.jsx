import { NewInvestmentWizard } from "@/features/investments/new-investment-wizard";

export const metadata = { title: "New investment" };

export default async function NewInvestmentPage({ searchParams }) {
  const params = await searchParams;
  return <NewInvestmentWizard initialProduct={params?.product || ""} />;
}
