import { AppShell } from "@/components/layout/app-shell";
import { SessionGuard } from "@/components/layout/session-guard";
import { customerNavigation } from "@/lib/constants/navigation";
import { customer, documents, investments, notifications, tickets, transactions } from "@/lib/data/customer";

export const metadata = {
  title: { default: "Client portal", template: "%s | Vee Investment" },
  description: "Your Vee Investment portfolio, investments, documents and account settings.",
};

const searchItems = [
  ...customerNavigation.flatMap((group) =>
    group.items.map((item) => ({ label: item.label, href: item.href, group: "Workspace", description: group.label })),
  ),
  ...investments.map((investment) => ({
    label: investment.product,
    href: `/dashboard/investments/${investment.id}`,
    group: "Investment",
    description: `${investment.reference} · ${investment.status}`,
  })),
  ...documents.map((document) => ({
    label: document.name,
    href: "/dashboard/documents",
    group: "Document",
    description: `${document.category} · ${document.status}`,
  })),
  ...transactions.slice(0, 6).map((transaction) => ({
    label: transaction.description,
    href: "/dashboard/transactions",
    group: "Transaction",
    description: `${transaction.reference} · ${transaction.status}`,
  })),
  ...tickets.map((ticket) => ({
    label: ticket.subject,
    href: "/dashboard/support",
    group: "Support",
    description: `${ticket.reference} · ${ticket.status}`,
  })),
];

export default function DashboardLayout({ children }) {
  return (
    <SessionGuard allow={["customer"]}>
      <AppShell
        navigation={customerNavigation}
        variant="customer"
        contextLabel="Client portal"
        searchItems={searchItems}
        notificationHref="/dashboard/notifications"
        notificationCount={notifications.filter((item) => !item.read).length}
        badges={{ documents: documents.filter((item) => item.status === "Action required").length, notifications: notifications.filter((item) => !item.read).length }}
      >
        {children}
      </AppShell>
    </SessionGuard>
  );
}
