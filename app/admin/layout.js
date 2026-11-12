import { AppShell } from "@/components/layout/app-shell";
import { SessionGuard } from "@/components/layout/session-guard";
import { adminNavigation } from "@/lib/constants/navigation";
import {
  applications, auditLogs, customers, documentQueue, adminLoans, adminTransactions,
} from "@/lib/data/admin";

export const metadata = {
  title: { default: "Administration", template: "%s | Vee Investment" },
  description: "Vee Investment operations, KYC, investment management and administration portal.",
};

const searchItems = [
  ...adminNavigation.flatMap((group) =>
    group.items.map((item) => ({ label: item.label, href: item.href, group: "Navigation", description: group.label })),
  ),
  ...customers.map((customer) => ({
    label: customer.name,
    href: `/admin/customers/${customer.id}`,
    group: "Customer",
    description: `${customer.id} · ${customer.email}`,
  })),
  ...applications.map((application) => ({
    label: `${application.customer} — ${application.product}`,
    href: `/admin/investments/${application.id}`,
    group: "Application",
    description: `${application.reference || application.id} · ${application.status}`,
  })),
  ...documentQueue.map((document) => ({
    label: `${document.customer} — ${document.document}`,
    href: `/admin/documents/${document.id}`,
    group: "Document",
    description: `${document.id} · ${document.status}`,
  })),
  ...adminLoans.map((loan) => ({
    label: `${loan.customer} — ${loan.product}`,
    href: `/admin/loans/${loan.id}`,
    group: "Loan",
    description: `${loan.id} · ${loan.status}`,
  })),
  ...adminTransactions.slice(0, 8).map((transaction) => ({
    label: transaction.reference,
    href: "/admin/transactions",
    group: "Transaction",
    description: `${transaction.customer} · ${transaction.status}`,
  })),
  ...auditLogs.slice(0, 4).map((log) => ({
    label: log.action,
    href: "/admin/audit-logs",
    group: "Audit",
    description: `${log.actor} · ${log.record}`,
  })),
];

export default function AdminLayout({ children }) {
  return (
    <SessionGuard allow={["admin", "compliance"]}>
      <AppShell
        navigation={adminNavigation}
        variant="admin"
        contextLabel="Administration"
        searchItems={searchItems}
        notificationHref="/admin/notifications"
        notificationCount={3}
        badges={{ documents: documentQueue.filter((item) => ["Under review", "Replacement requested"].includes(item.status)).length }}
      >
        {children}
      </AppShell>
    </SessionGuard>
  );
}
