export const customerNavigation = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", href: "/dashboard", icon: "layout-dashboard", exact: true },
      { label: "My investments", href: "/dashboard/investments", icon: "chart" },
      { label: "Opportunities", href: "/investments", icon: "sparkles" },
      { label: "Portfolio", href: "/dashboard/portfolio", icon: "pie-chart" },
      { label: "Transactions", href: "/dashboard/transactions", icon: "arrow-left-right" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Loans", href: "/dashboard/loans", icon: "hand-coins" },
      { label: "Documents", href: "/dashboard/documents", icon: "files", badgeKey: "documents" },
      { label: "Statements", href: "/dashboard/statements", icon: "file-text" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Notifications", href: "/dashboard/notifications", icon: "bell", badgeKey: "notifications" },
      { label: "Support", href: "/dashboard/support", icon: "life-buoy" },
      { label: "Profile", href: "/dashboard/profile", icon: "user" },
      { label: "Settings", href: "/dashboard/settings", icon: "settings" },
    ],
  },
];

export const adminNavigation = [
  {
    label: "Command",
    items: [
      { label: "Overview", href: "/admin", icon: "layout-dashboard", exact: true },
      { label: "Reports", href: "/admin/reports", icon: "bar-chart" },
    ],
  },
  {
    label: "Clients",
    items: [
      { label: "Customers", href: "/admin/customers", icon: "users" },
      { label: "Onboarding", href: "/admin/onboarding", icon: "clipboard" },
      { label: "Documents & KYC", href: "/admin/documents", icon: "scan-face", badgeKey: "documents" },
      { label: "Support", href: "/admin/support", icon: "life-buoy" },
    ],
  },
  {
    label: "Investing",
    items: [
      { label: "Products", href: "/admin/investment-products", icon: "package" },
      { label: "Applications", href: "/admin/investments", icon: "file-check" },
      { label: "Portfolios", href: "/admin/portfolio", icon: "pie-chart" },
      { label: "Loans", href: "/admin/loans", icon: "hand-coins" },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Transactions", href: "/admin/transactions", icon: "arrow-left-right" },
      { label: "Payments", href: "/admin/payments", icon: "credit-card" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Staff", href: "/admin/staff", icon: "briefcase" },
      { label: "Roles & permissions", href: "/admin/roles", icon: "key-round" },
      { label: "Content (CMS)", href: "/admin/cms", icon: "newspaper" },
      { label: "Notifications", href: "/admin/notifications", icon: "send" },
      { label: "Audit logs", href: "/admin/audit-logs", icon: "scroll-text" },
      { label: "Settings", href: "/admin/settings", icon: "settings" },
    ],
  },
];

export const adminTitles = [
  { match: "/admin/customers", title: "Customer management" },
  { match: "/admin/onboarding", title: "Onboarding" },
  { match: "/admin/documents", title: "Document review" },
  { match: "/admin/investment-products", title: "Investment products" },
  { match: "/admin/investments", title: "Investment applications" },
  { match: "/admin/portfolio", title: "Portfolio management" },
  { match: "/admin/loans", title: "Loan management" },
  { match: "/admin/transactions", title: "Transactions" },
  { match: "/admin/payments", title: "Payments" },
  { match: "/admin/staff", title: "Staff" },
  { match: "/admin/roles", title: "Roles & permissions" },
  { match: "/admin/reports", title: "Reports" },
  { match: "/admin/support", title: "Support management" },
  { match: "/admin/cms", title: "Content management" },
  { match: "/admin/notifications", title: "Notifications" },
  { match: "/admin/audit-logs", title: "Audit logs" },
  { match: "/admin/settings", title: "System settings" },
];
