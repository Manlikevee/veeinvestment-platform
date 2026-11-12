import { TransactionsManager } from "@/features/admin/transactions-manager";

export const metadata = { title: "Transactions" };

export default function AdminTransactionsPage() {
  return <TransactionsManager />;
}
