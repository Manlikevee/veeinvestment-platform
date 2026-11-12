export const adminProfile = {
  name: "Ngozi Eze",
  initials: "NE",
  role: "Super Administrator",
  email: "admin@demo.veeinvestment.com",
  department: "Executive Office",
  lastLogin: "2026-11-12T07:58:00Z",
};

export const adminStats = [
  { label: "Total customers", value: "1,248", change: "+48", trend: "up", detail: "Registered accounts", icon: "users", tone: "emerald" },
  { label: "Active customers", value: "986", change: "+3.2%", trend: "up", detail: "79.0% of base", icon: "user-check", tone: "forest" },
  { label: "Pending onboarding", value: "74", change: "+12", trend: "up", detail: "Requires review", icon: "clipboard", tone: "sand" },
  { label: "Pending KYC", value: "38", change: "-6", trend: "down", detail: "Average 1.8 days", icon: "scan-face", tone: "amber" },
  { label: "Assets under management", value: "₦18.4bn", change: "+2.7%", trend: "up", detail: "Demonstration data", icon: "landmark", tone: "emerald" },
  { label: "Active investments", value: "342", change: "+18", trend: "up", detail: "Across 6 products", icon: "chart", tone: "forest" },
  { label: "Pending applications", value: "27", change: "+5", trend: "up", detail: "Investment review", icon: "hourglass", tone: "sand" },
  { label: "Loan book", value: "₦642.8m", change: "+1.1%", trend: "up", detail: "Outstanding principal", icon: "hand-coins", tone: "emerald" },
];

export const customerGrowth = [
  { month: "Dec", customers: 1024, active: 812 },
  { month: "Jan", customers: 1052, active: 834 },
  { month: "Feb", customers: 1088, active: 856 },
  { month: "Mar", customers: 1117, active: 874 },
  { month: "Apr", customers: 1140, active: 889 },
  { month: "May", customers: 1164, active: 905 },
  { month: "Jun", customers: 1180, active: 918 },
  { month: "Jul", customers: 1196, active: 936 },
  { month: "Aug", customers: 1208, active: 949 },
  { month: "Sep", customers: 1221, active: 961 },
  { month: "Oct", customers: 1236, active: 974 },
  { month: "Nov", customers: 1248, active: 986 },
];

export const investmentActivity = [
  { month: "Jun", applications: 21, approved: 14, value: 142 },
  { month: "Jul", applications: 26, approved: 18, value: 168 },
  { month: "Aug", applications: 24, approved: 16, value: 151 },
  { month: "Sep", applications: 31, approved: 22, value: 204 },
  { month: "Oct", applications: 28, approved: 19, value: 186 },
  { month: "Nov", applications: 27, approved: 12, value: 123 },
];

export const aumAllocation = [
  { name: "Fixed income", value: 48, color: "#007146" },
  { name: "Impact", value: 22, color: "#3f9c76" },
  { name: "Liquidity", value: 14, color: "#c9a96b" },
  { name: "Real assets", value: 16, color: "#8fb9a3" },
];

export const revenueTrend = [
  { month: "Jun", revenue: 82, cost: 41 },
  { month: "Jul", revenue: 88, cost: 43 },
  { month: "Aug", revenue: 84, cost: 42 },
  { month: "Sep", revenue: 96, cost: 47 },
  { month: "Oct", revenue: 103, cost: 49 },
  { month: "Nov", revenue: 112, cost: 52 },
];

export const pendingTasks = [
  { id: "TSK-01", title: "Review 12 KYC documents", meta: "Oldest waiting 2 days", priority: "High", href: "/admin/documents", icon: "file-check" },
  { id: "TSK-02", title: "Approve pending investments", meta: "8 applications above threshold", priority: "High", href: "/admin/investments", icon: "chart" },
  { id: "TSK-03", title: "Reconcile 3 payments", meta: "Exception queue", priority: "Medium", href: "/admin/payments", icon: "receipt" },
  { id: "TSK-04", title: "Publish November insight", meta: "Draft awaiting approval", priority: "Low", href: "/admin/cms", icon: "newspaper" },
];

export const customers = [
  {
    id: "CUS-1042", name: "Bayo Adeyemi", initials: "BA", email: "bayo.adeyemi@demo.veeinvestment.com", phone: "+234 803 555 0184",
    accountType: "Individual", status: "Active", kyc: "Verified", onboarding: "Complete", joined: "2024-03-12", portfolio: 14285600, invested: 16000000,
    country: "Nigeria", city: "Lagos", risk: "Balanced", manager: "Grace Adeleke", lastActive: "2026-11-12T08:42:00Z", flags: 0,
    occupation: "Managing Director", employer: "Northstar Logistics Limited", sourceOfFunds: "Business income", profileComplete: 92,
  },
  {
    id: "CUS-1068", name: "Adaeze Nwankwo", initials: "AN", email: "adaeze.n@example.com", phone: "+234 806 555 0120",
    accountType: "Individual", status: "Active", kyc: "Verified", onboarding: "Complete", joined: "2024-06-08", portfolio: 8420000, invested: 9000000,
    country: "Nigeria", city: "Enugu", risk: "Growth", manager: "Grace Adeleke", lastActive: "2026-11-11T17:30:00Z", flags: 0,
    occupation: "Pharmacist", employer: "Wellcare Pharmacy", sourceOfFunds: "Professional income", profileComplete: 100,
  },
  {
    id: "CUS-1119", name: "Kwame Asante", initials: "KA", email: "kwame.asante@example.com", phone: "+233 24 555 0112",
    accountType: "Individual", status: "Active", kyc: "Under review", onboarding: "Submitted", joined: "2026-10-21", portfolio: 0, invested: 0,
    country: "Ghana", city: "Accra", risk: "Balanced", manager: "Unassigned", lastActive: "2026-11-10T12:14:00Z", flags: 1,
    occupation: "Technology executive", employer: "Accra Cloud Systems", sourceOfFunds: "Salary", profileComplete: 84,
  },
  {
    id: "CUS-1124", name: "Fatima Bello", initials: "FB", email: "fatima.bello@example.com", phone: "+234 809 555 0177",
    accountType: "Individual", status: "Active", kyc: "Verified", onboarding: "Complete", joined: "2025-01-19", portfolio: 4650000, invested: 5000000,
    country: "Nigeria", city: "Abuja", risk: "Conservative", manager: "Grace Adeleke", lastActive: "2026-11-09T10:20:00Z", flags: 0,
    occupation: "Medical consultant", employer: "Cedar Clinic", sourceOfFunds: "Professional income", profileComplete: 96,
  },
  {
    id: "CUS-1131", name: "Chidi Okafor", initials: "CO", email: "chidi.okafor@example.com", phone: "+234 703 555 0106",
    accountType: "Individual", status: "Suspended", kyc: "Verified", onboarding: "Complete", joined: "2024-11-04", portfolio: 2100000, invested: 2500000,
    country: "Nigeria", city: "Port Harcourt", risk: "Balanced", manager: "Unassigned", lastActive: "2026-10-18T08:31:00Z", flags: 2,
    occupation: "Logistics entrepreneur", employer: "Riverline Haulage", sourceOfFunds: "Business income", profileComplete: 100,
  },
  {
    id: "CUS-1136", name: "Zara Ogunleye", initials: "ZO", email: "zara.ogunleye@example.com", phone: "+234 802 555 0144",
    accountType: "Individual", status: "Active", kyc: "Pending documents", onboarding: "Additional info", joined: "2026-09-30", portfolio: 0, invested: 0,
    country: "Nigeria", city: "Ibadan", risk: "Balanced", manager: "Unassigned", lastActive: "2026-11-07T16:48:00Z", flags: 0,
    occupation: "Architect", employer: "Form Studio", sourceOfFunds: "Salary", profileComplete: 68,
  },
  {
    id: "CUS-1141", name: "Daniel Mwangi", initials: "DM", email: "daniel.mwangi@example.com", phone: "+254 72 555 0198",
    accountType: "Individual", status: "Active", kyc: "Verified", onboarding: "Complete", joined: "2025-04-22", portfolio: 18800000, invested: 20000000,
    country: "Kenya", city: "Nairobi", risk: "Growth", manager: "Tolu Adebayo", lastActive: "2026-11-12T06:10:00Z", flags: 0,
    occupation: "Company director", employer: "Mwangi Holdings", sourceOfFunds: "Business ownership", profileComplete: 100,
  },
  {
    id: "CUS-1149", name: "Laila Ibrahim", initials: "LI", email: "laila.ibrahim@example.com", phone: "+234 815 555 0152",
    accountType: "Individual", status: "Active", kyc: "Under review", onboarding: "Submitted", joined: "2026-11-01", portfolio: 0, invested: 0,
    country: "Nigeria", city: "Kano", risk: "Conservative", manager: "Unassigned", lastActive: "2026-11-08T14:02:00Z", flags: 0,
    occupation: "University lecturer", employer: "Bayero University", sourceOfFunds: "Salary", profileComplete: 78,
  },
  {
    id: "CUS-1152", name: "Sipho Dlamini", initials: "SD", email: "sipho.dlamini@example.com", phone: "+27 82 555 0141",
    accountType: "Individual", status: "Pending", kyc: "Not started", onboarding: "In progress", joined: "2026-11-06", portfolio: 0, invested: 0,
    country: "South Africa", city: "Johannesburg", risk: "Not assessed", manager: "Unassigned", lastActive: "2026-11-11T09:10:00Z", flags: 0,
    occupation: "Product designer", employer: "Freelance", sourceOfFunds: "Professional income", profileComplete: 32,
  },
  {
    id: "CUS-1155", name: "Amaka Obi", initials: "AO", email: "amaka.obi@example.com", phone: "+234 807 555 0163",
    accountType: "Individual", status: "Active", kyc: "Verified", onboarding: "Complete", joined: "2025-08-14", portfolio: 7200000, invested: 7500000,
    country: "Nigeria", city: "Lagos", risk: "Balanced", manager: "Grace Adeleke", lastActive: "2026-11-10T11:24:00Z", flags: 0,
    occupation: "Brand strategist", employer: "The Fold Agency", sourceOfFunds: "Business income", profileComplete: 100,
  },
  {
    id: "CUS-1160", name: "Tunde Bakare", initials: "TB", email: "tunde.bakare@example.com", phone: "+234 811 555 0188",
    accountType: "Individual", status: "Closed", kyc: "Verified", onboarding: "Complete", joined: "2023-12-02", portfolio: 0, invested: 0,
    country: "Nigeria", city: "Lagos", risk: "Conservative", manager: "Unassigned", lastActive: "2026-08-15T12:00:00Z", flags: 0,
    occupation: "Consultant", employer: "Independent", sourceOfFunds: "Professional income", profileComplete: 100,
  },
  {
    id: "CUS-1163", name: "Halima Yusuf", initials: "HY", email: "halima.yusuf@example.com", phone: "+234 813 555 0193",
    accountType: "Individual", status: "Active", kyc: "Verified", onboarding: "Complete", joined: "2025-10-11", portfolio: 3250000, invested: 3500000,
    country: "Nigeria", city: "Abuja", risk: "Growth", manager: "Grace Adeleke", lastActive: "2026-11-12T07:20:00Z", flags: 0,
    occupation: "Renewable energy analyst", employer: "Sahel Power", sourceOfFunds: "Salary", profileComplete: 94,
  },
];

export const onboardingApplications = [
  { id: "ONB-3041", customerId: "CUS-1152", name: "Sipho Dlamini", email: "sipho.dlamini@example.com", stage: "In progress", completion: 32, submitted: null, updated: "2026-11-11T09:10:00Z", reviewer: "Unassigned", docs: 1, risk: "Not assessed" },
  { id: "ONB-3038", customerId: "CUS-1149", name: "Laila Ibrahim", email: "laila.ibrahim@example.com", stage: "Submitted", completion: 100, submitted: "2026-11-08T14:02:00Z", updated: "2026-11-08T14:02:00Z", reviewer: "Chinedu Okoro", docs: 4, risk: "Conservative" },
  { id: "ONB-3035", customerId: "CUS-1136", name: "Zara Ogunleye", email: "zara.ogunleye@example.com", stage: "Additional information", completion: 68, submitted: "2026-10-22T10:15:00Z", updated: "2026-11-07T16:48:00Z", reviewer: "Chinedu Okoro", docs: 2, risk: "Balanced" },
  { id: "ONB-3031", customerId: "CUS-1119", name: "Kwame Asante", email: "kwame.asante@example.com", stage: "Pending review", completion: 84, submitted: "2026-10-21T13:44:00Z", updated: "2026-11-10T12:14:00Z", reviewer: "Unassigned", docs: 3, risk: "Balanced" },
  { id: "ONB-3028", customerId: "CUS-1141", name: "Daniel Mwangi", email: "daniel.mwangi@example.com", stage: "Approved", completion: 100, submitted: "2026-10-14T09:20:00Z", updated: "2026-10-18T11:05:00Z", reviewer: "Chinedu Okoro", docs: 5, risk: "Growth" },
  { id: "ONB-3021", customerId: "CUS-1155", name: "Amaka Obi", email: "amaka.obi@example.com", stage: "Approved", completion: 100, submitted: "2026-10-02T17:18:00Z", updated: "2026-10-04T10:40:00Z", reviewer: "Compliance team", docs: 4, risk: "Balanced" },
  { id: "ONB-3016", customerId: "CUS-1160", name: "Tunde Bakare", email: "tunde.bakare@example.com", stage: "Rejected", completion: 100, submitted: "2026-09-21T08:32:00Z", updated: "2026-09-24T15:30:00Z", reviewer: "Chinedu Okoro", docs: 3, risk: "Conservative" },
];

export const documentQueue = [
  { id: "DOC-7401", customerId: "CUS-1119", customer: "Kwame Asante", document: "International passport", category: "Identity", type: "Passport", uploaded: "2026-10-21", expires: "2029-04-12", status: "Under review", reviewer: "Unassigned", priority: "High", size: "2.8 MB" },
  { id: "DOC-7408", customerId: "CUS-1136", customer: "Zara Ogunleye", document: "Utility bill — September 2026", category: "Address", type: "Utility bill", uploaded: "2026-10-22", expires: "2026-12-22", status: "Replacement requested", reviewer: "Chinedu Okoro", priority: "High", size: "1.2 MB" },
  { id: "DOC-7412", customerId: "CUS-1149", customer: "Laila Ibrahim", document: "National identity card", category: "Identity", type: "National ID", uploaded: "2026-11-01", expires: "2031-08-30", status: "Under review", reviewer: "Unassigned", priority: "Normal", size: "1.9 MB" },
  { id: "DOC-7415", customerId: "CUS-1042", customer: "Bayo Adeyemi", document: "Bank statement — Q3 2026", category: "Bank", type: "Bank statement", uploaded: "2026-11-01", expires: "2027-02-01", status: "Under review", reviewer: "Unassigned", priority: "Normal", size: "3.8 MB" },
  { id: "DOC-7419", customerId: "CUS-1152", customer: "Sipho Dlamini", document: "Driving licence", category: "Identity", type: "Driving licence", uploaded: "2026-11-06", expires: "2029-11-06", status: "Pending upload", reviewer: "Unassigned", priority: "Low", size: "—" },
  { id: "DOC-7422", customerId: "CUS-1119", customer: "Kwame Asante", document: "Bank verification letter", category: "Bank", type: "Bank letter", uploaded: "2026-10-22", expires: "2027-04-22", status: "Approved", reviewer: "Compliance team", priority: "Normal", size: "610 KB" },
  { id: "DOC-7426", customerId: "CUS-1131", customer: "Chidi Okafor", document: "Source of funds declaration", category: "Compliance", type: "Supporting document", uploaded: "2026-09-14", expires: null, status: "Rejected", reviewer: "Chinedu Okoro", priority: "High", size: "840 KB" },
  { id: "DOC-7429", customerId: "CUS-1163", customer: "Halima Yusuf", document: "Utility bill — October 2026", category: "Address", type: "Utility bill", uploaded: "2026-10-29", expires: "2027-01-29", status: "Approved", reviewer: "Compliance team", priority: "Normal", size: "1.0 MB" },
  { id: "DOC-7432", customerId: "CUS-1141", customer: "Daniel Mwangi", document: "Passport", category: "Identity", type: "Passport", uploaded: "2026-10-14", expires: "2030-02-18", status: "Approved", reviewer: "Compliance team", priority: "Normal", size: "2.1 MB" },
  { id: "DOC-7436", customerId: "CUS-1155", customer: "Amaka Obi", document: "Investment agreement — INV-23867", category: "Investment", type: "Agreement", uploaded: "2026-11-04", expires: null, status: "Under review", reviewer: "Operations", priority: "Low", size: "920 KB" },
];

export const applications = [
  { id: "APP-6082", customerId: "CUS-1042", customer: "Bayo Adeyemi", product: "Balanced Growth Portfolio", amount: 1000000, status: "Pending review", stage: "Suitability review", submitted: "2026-11-02", payment: "Not required yet", reviewer: "Unassigned", risk: "Balanced", decisionHistory: [] },
  { id: "APP-6079", customerId: "CUS-1141", customer: "Daniel Mwangi", product: "Green Infrastructure Note", amount: 5000000, status: "Approved", stage: "Documentation", submitted: "2026-10-28", payment: "Awaiting funding", reviewer: "Ifeoma Nwosu", risk: "Growth", decisionHistory: [{ date: "2026-11-01", actor: "Ifeoma Nwosu", decision: "Approved", note: "Suitability and source of funds confirmed. Funding instructions issued." }] },
  { id: "APP-6075", customerId: "CUS-1068", customer: "Adaeze Nwankwo", product: "VEE Prime Fixed Income", amount: 4500000, status: "Active", stage: "Funded", submitted: "2026-10-18", payment: "Reconciled", reviewer: "Operations", risk: "Balanced", decisionHistory: [{ date: "2026-10-20", actor: "Ifeoma Nwosu", decision: "Approved", note: "Within mandate. Terms confirmed." }, { date: "2026-10-22", actor: "Finance", decision: "Funds reconciled", note: "Bank transfer matched to application." }] },
  { id: "APP-6072", customerId: "CUS-1124", customer: "Fatima Bello", product: "Money Market Plus", amount: 1800000, status: "Pending review", stage: "Eligibility", submitted: "2026-10-30", payment: "Not required yet", reviewer: "Unassigned", risk: "Conservative", decisionHistory: [] },
  { id: "APP-6068", customerId: "CUS-1163", customer: "Halima Yusuf", product: "VEE Prime Fixed Income", amount: 3500000, status: "Approved", stage: "Awaiting funding", submitted: "2026-10-26", payment: "Awaiting payment", reviewer: "Ifeoma Nwosu", risk: "Growth", decisionHistory: [{ date: "2026-10-29", actor: "Ifeoma Nwosu", decision: "Approved", note: "Approved subject to receipt of funds by 12 November 2026." }] },
  { id: "APP-6062", customerId: "CUS-1155", customer: "Amaka Obi", product: "Real Estate Income Fund", amount: 2500000, status: "Rejected", stage: "Closed", submitted: "2026-10-12", payment: "Not applicable", reviewer: "Ifeoma Nwosu", risk: "Balanced", decisionHistory: [{ date: "2026-10-16", actor: "Ifeoma Nwosu", decision: "Rejected", note: "Liquidity horizon did not align with the product term. Client invited to discuss alternatives." }] },
  { id: "APP-6059", customerId: "CUS-1131", customer: "Chidi Okafor", product: "SME Impact Note", amount: 1200000, status: "On hold", stage: "Account review", submitted: "2026-10-05", payment: "Not required yet", reviewer: "Compliance", risk: "Balanced", decisionHistory: [{ date: "2026-10-06", actor: "Compliance", decision: "On hold", note: "Account suspended pending review. Application cannot progress until resolved." }] },
  { id: "APP-6051", customerId: "CUS-1068", customer: "Adaeze Nwankwo", product: "Money Market Plus", amount: 900000, status: "Matured", stage: "Completed", submitted: "2026-04-02", payment: "Reconciled", reviewer: "Operations", risk: "Balanced", decisionHistory: [{ date: "2026-04-03", actor: "Ifeoma Nwosu", decision: "Approved", note: "Approved." }, { date: "2026-10-02", actor: "Operations", decision: "Matured", note: "Principal and return settled." }] },
  { id: "APP-6048", customerId: "CUS-1141", customer: "Daniel Mwangi", product: "VEE Prime Fixed Income", amount: 8000000, status: "Active", stage: "Active", submitted: "2026-09-12", payment: "Reconciled", reviewer: "Operations", risk: "Growth", decisionHistory: [{ date: "2026-09-15", actor: "Ifeoma Nwosu", decision: "Approved", note: "Approved." }] },
  { id: "APP-6044", customerId: "CUS-1119", customer: "Kwame Asante", product: "VEE Prime Fixed Income", amount: 2000000, status: "Information requested", stage: "Awaiting customer", submitted: "2026-09-30", payment: "Not required yet", reviewer: "Chinedu Okoro", risk: "Balanced", decisionHistory: [{ date: "2026-10-03", actor: "Chinedu Okoro", decision: "Information requested", note: "Source of funds evidence is incomplete. Requested bank confirmation." }] },
];

export const adminLoans = [
  { id: "LN-8841", customerId: "CUS-1042", customer: "Bayo Adeyemi", product: "Asset-Backed Facility", amount: 4500000, outstanding: 2150000, rate: 18.5, term: "18 months", status: "Active", submitted: "2026-04-20", approved: "2026-04-28", nextDue: "2026-11-28", repayment: 412500, overdue: false, purpose: "Working capital" },
  { id: "LN-8872", customerId: "CUS-1068", customer: "Adaeze Nwankwo", product: "SME Working Capital", amount: 3000000, outstanding: 1850000, rate: 17, term: "12 months", status: "Active", submitted: "2026-06-02", approved: "2026-06-10", nextDue: "2026-11-15", repayment: 292500, overdue: false, purpose: "Inventory" },
  { id: "LN-8898", customerId: "CUS-1131", customer: "Chidi Okafor", product: "Asset-Backed Facility", amount: 6000000, outstanding: 4725000, rate: 19, term: "18 months", status: "Overdue", submitted: "2026-03-14", approved: "2026-03-25", nextDue: "2026-10-25", repayment: 548000, overdue: true, purpose: "Fleet expansion" },
  { id: "LN-8904", customerId: "CUS-1155", customer: "Amaka Obi", product: "Personal Liquidity Loan", amount: 1500000, outstanding: 1500000, rate: 20, term: "9 months", status: "Pending review", submitted: "2026-11-05", approved: null, nextDue: null, repayment: 191667, overdue: false, purpose: "Home renovation" },
  { id: "LN-8910", customerId: "CUS-1163", customer: "Halima Yusuf", product: "Asset-Backed Facility", amount: 2000000, outstanding: 2000000, rate: 18, term: "12 months", status: "Approved", submitted: "2026-10-22", approved: "2026-11-08", nextDue: "2026-12-08", repayment: 183333, overdue: false, purpose: "Business equipment" },
  { id: "LN-8914", customerId: "CUS-1119", customer: "Kwame Asante", product: "SME Working Capital", amount: 4000000, outstanding: 0, rate: 17.5, term: "12 months", status: "Rejected", submitted: "2026-09-28", approved: null, nextDue: null, repayment: 0, overdue: false, purpose: "Office fit-out" },
  { id: "LN-8620", customerId: "CUS-1042", customer: "Bayo Adeyemi", product: "SME Working Capital", amount: 2000000, outstanding: 0, rate: 16, term: "9 months", status: "Completed", submitted: "2025-06-01", approved: "2025-06-15", nextDue: null, repayment: 235000, overdue: false, purpose: "Inventory financing" },
  { id: "LN-8921", customerId: "CUS-1141", customer: "Daniel Mwangi", product: "Asset-Backed Facility", amount: 7500000, outstanding: 6800000, rate: 17.8, term: "24 months", status: "Active", submitted: "2026-01-11", approved: "2026-01-22", nextDue: "2026-12-01", repayment: 382400, overdue: false, purpose: "Property works" },
];

export const adminTransactions = [
  { id: "TXN-98241", reference: "VEE-TXN-98241", customerId: "CUS-1042", customer: "Bayo Adeyemi", type: "Investment payment", amount: 1000000, direction: "in", date: "2026-11-02", status: "Pending", method: "Wallet", paymentRef: "PAY-77120", reconciled: false, receipt: true },
  { id: "TXN-98218", reference: "VEE-TXN-98218", customerId: "CUS-1042", customer: "Bayo Adeyemi", type: "Return", amount: 92000, direction: "out", date: "2026-11-01", status: "Completed", method: "Bank transfer", paymentRef: "PAY-77108", reconciled: true, receipt: true },
  { id: "TXN-98215", reference: "VEE-TXN-98215", customerId: "CUS-1068", customer: "Adaeze Nwankwo", type: "Deposit", amount: 2500000, direction: "in", date: "2026-11-01", status: "Completed", method: "Bank transfer", paymentRef: "PAY-77101", reconciled: true, receipt: true },
  { id: "TXN-98198", reference: "VEE-TXN-98198", customerId: "CUS-1141", customer: "Daniel Mwangi", type: "Investment payment", amount: 5000000, direction: "in", date: "2026-10-31", status: "Completed", method: "Bank transfer", paymentRef: "PAY-77088", reconciled: true, receipt: true },
  { id: "TXN-98190", reference: "VEE-TXN-98190", customerId: "CUS-1163", customer: "Halima Yusuf", type: "Deposit", amount: 3500000, direction: "in", date: "2026-10-30", status: "Awaiting verification", method: "Bank transfer", paymentRef: "PAY-77077", reconciled: false, receipt: true },
  { id: "TXN-98176", reference: "VEE-TXN-98176", customerId: "CUS-1042", customer: "Bayo Adeyemi", type: "Loan repayment", amount: 412500, direction: "in", date: "2026-10-28", status: "Completed", method: "Direct debit", paymentRef: "PAY-77041", reconciled: true, receipt: true },
  { id: "TXN-98164", reference: "VEE-TXN-98164", customerId: "CUS-1124", customer: "Fatima Bello", type: "Withdrawal", amount: 750000, direction: "out", date: "2026-10-26", status: "Under review", method: "Bank transfer", paymentRef: "PAY-77019", reconciled: false, receipt: false },
  { id: "TXN-98142", reference: "VEE-TXN-98142", customerId: "CUS-1042", customer: "Bayo Adeyemi", type: "Return", amount: 14700, direction: "out", date: "2026-10-25", status: "Completed", method: "Wallet", paymentRef: "PAY-76998", reconciled: true, receipt: true },
  { id: "TXN-98120", reference: "VEE-TXN-98120", customerId: "CUS-1042", customer: "Bayo Adeyemi", type: "Maturity", amount: 2650000, direction: "out", date: "2026-10-31", status: "Completed", method: "Bank transfer", paymentRef: "PAY-77055", reconciled: true, receipt: true },
  { id: "TXN-98104", reference: "VEE-TXN-98104", customerId: "CUS-1068", customer: "Adaeze Nwankwo", type: "Fee", amount: 18750, direction: "in", date: "2026-10-15", status: "Completed", method: "Wallet", paymentRef: "PAY-76882", reconciled: true, receipt: true },
  { id: "TXN-98088", reference: "VEE-TXN-98088", customerId: "CUS-1119", customer: "Kwame Asante", type: "Deposit", amount: 1200000, direction: "in", date: "2026-10-12", status: "Failed", method: "Card", paymentRef: "PAY-76840", reconciled: false, receipt: false },
  { id: "TXN-98061", reference: "VEE-TXN-98061", customerId: "CUS-1042", customer: "Bayo Adeyemi", type: "Deposit", amount: 500000, direction: "in", date: "2026-10-04", status: "Completed", method: "Card", paymentRef: "PAY-76710", reconciled: true, receipt: true },
  { id: "TXN-98032", reference: "VEE-TXN-98032", customerId: "CUS-1042", customer: "Bayo Adeyemi", type: "Withdrawal", amount: 250000, direction: "out", date: "2026-09-22", status: "Completed", method: "Bank transfer", paymentRef: "PAY-76533", reconciled: true, receipt: true },
  { id: "TXN-98001", reference: "VEE-TXN-98001", customerId: "CUS-1155", customer: "Amaka Obi", type: "Deposit", amount: 900000, direction: "in", date: "2026-09-18", status: "Reversed", method: "Card", paymentRef: "PAY-76490", reconciled: true, receipt: true },
];

export const payments = [
  { id: "PAY-77120", reference: "PAY-77120", customer: "Bayo Adeyemi", purpose: "Investment funding", amount: 1000000, date: "2026-11-02", status: "Pending verification", gateway: "Bank transfer", gatewayRef: "GTB-99281724", reconciled: false },
  { id: "PAY-77108", reference: "PAY-77108", customer: "VEE operations", purpose: "Distribution", amount: 92000, date: "2026-11-01", status: "Settled", gateway: "Internal", gatewayRef: "INT-12091", reconciled: true },
  { id: "PAY-77101", reference: "PAY-77101", customer: "Adaeze Nwankwo", purpose: "Wallet funding", amount: 2500000, date: "2026-11-01", status: "Settled", gateway: "Bank transfer", gatewayRef: "GTB-99271880", reconciled: true },
  { id: "PAY-77088", reference: "PAY-77088", customer: "Daniel Mwangi", purpose: "Investment funding", amount: 5000000, date: "2026-10-31", status: "Settled", gateway: "Bank transfer", gatewayRef: "GTB-99270411", reconciled: true },
  { id: "PAY-77077", reference: "PAY-77077", customer: "Halima Yusuf", purpose: "Investment funding", amount: 3500000, date: "2026-10-30", status: "Pending verification", gateway: "Bank transfer", gatewayRef: "GTB-99269918", reconciled: false },
  { id: "PAY-77041", reference: "PAY-77041", customer: "Bayo Adeyemi", purpose: "Loan repayment", amount: 412500, date: "2026-10-28", status: "Settled", gateway: "Direct debit", gatewayRef: "DD-881247", reconciled: true },
  { id: "PAY-77019", reference: "PAY-77019", customer: "Fatima Bello", purpose: "Withdrawal", amount: 750000, date: "2026-10-26", status: "Held", gateway: "Bank transfer", gatewayRef: "GTB-99267102", reconciled: false },
  { id: "PAY-76882", reference: "PAY-76882", customer: "Adaeze Nwankwo", purpose: "Fee", amount: 18750, date: "2026-10-15", status: "Settled", gateway: "Internal", gatewayRef: "INT-11988", reconciled: true },
  { id: "PAY-76840", reference: "PAY-76840", customer: "Kwame Asante", purpose: "Wallet funding", amount: 1200000, date: "2026-10-12", status: "Failed", gateway: "Card", gatewayRef: "CARD-66102", reconciled: false },
  { id: "PAY-76710", reference: "PAY-76710", customer: "Bayo Adeyemi", purpose: "Wallet funding", amount: 500000, date: "2026-10-04", status: "Settled", gateway: "Card", gatewayRef: "CARD-65941", reconciled: true },
];

export const staff = [
  { id: "STF-001", name: "Ngozi Eze", initials: "NE", email: "admin@demo.veeinvestment.com", role: "Super Administrator", department: "Executive Office", status: "Active", lastActive: "2026-11-12T07:58:00Z", joined: "2023-01-10", mfa: true },
  { id: "STF-002", name: "Chinedu Okoro", initials: "CO", email: "compliance@demo.veeinvestment.com", role: "Compliance Officer", department: "Risk & Compliance", status: "Active", lastActive: "2026-11-11T17:21:00Z", joined: "2023-04-18", mfa: true },
  { id: "STF-003", name: "Ifeoma Nwosu", initials: "IN", email: "ifeoma.nwosu@veeinvestment.com", role: "Investment Manager", department: "Investments", status: "Active", lastActive: "2026-11-12T08:10:00Z", joined: "2023-02-02", mfa: true },
  { id: "STF-004", name: "Michael Osei", initials: "MO", email: "michael.osei@veeinvestment.com", role: "Finance Officer", department: "Finance", status: "Active", lastActive: "2026-11-11T13:12:00Z", joined: "2023-06-15", mfa: true },
  { id: "STF-005", name: "Grace Adeleke", initials: "GA", email: "grace.adeleke@veeinvestment.com", role: "Customer Support", department: "Client Experience", status: "Active", lastActive: "2026-11-12T08:22:00Z", joined: "2024-01-08", mfa: true },
  { id: "STF-006", name: "Yusuf Danladi", initials: "YD", email: "yusuf.danladi@veeinvestment.com", role: "KYC Reviewer", department: "Risk & Compliance", status: "Invited", lastActive: null, joined: null, mfa: false },
  { id: "STF-007", name: "Elena Mensah", initials: "EM", email: "elena.mensah@veeinvestment.com", role: "Read-only Auditor", department: "Internal Audit", status: "Suspended", lastActive: "2026-09-30T10:04:00Z", joined: "2025-05-12", mfa: true },
];

export const roles = [
  { id: "ROLE-01", name: "Super Administrator", members: 1, description: "Full platform access, including staff, roles and settings.", system: true, permissions: 22 },
  { id: "ROLE-02", name: "Administrator", members: 2, description: "Broad operational access without system-level role changes.", system: true, permissions: 19 },
  { id: "ROLE-03", name: "Compliance Officer", members: 2, description: "KYC, onboarding, documents and audit access.", system: true, permissions: 12 },
  { id: "ROLE-04", name: "Investment Manager", members: 1, description: "Products, applications and portfolio oversight.", system: true, permissions: 11 },
  { id: "ROLE-05", name: "Finance Officer", members: 1, description: "Payments, reconciliation and financial reporting.", system: true, permissions: 9 },
  { id: "ROLE-06", name: "Customer Support", members: 1, description: "Customer service, tickets and limited profile visibility.", system: true, permissions: 7 },
  { id: "ROLE-07", name: "Read-only Auditor", members: 1, description: "View-only access to records and reports. No mutations.", system: true, permissions: 8 },
];

export const permissionGroups = [
  { module: "Customers", color: "emerald", permissions: [{ key: "customers.view", label: "View" }, { key: "customers.edit", label: "Edit" }, { key: "customers.suspend", label: "Suspend" }] },
  { module: "Onboarding & KYC", color: "forest", permissions: [{ key: "kyc.view", label: "View" }, { key: "kyc.review", label: "Review" }, { key: "kyc.approve", label: "Approve" }] },
  { module: "Investments", color: "sage", permissions: [{ key: "products.manage", label: "Products" }, { key: "applications.view", label: "View applications" }, { key: "applications.approve", label: "Approve applications" }] },
  { module: "Portfolio", color: "sand", permissions: [{ key: "portfolio.view", label: "View" }, { key: "portfolio.export", label: "Export" }] },
  { module: "Loans", color: "clay", permissions: [{ key: "loans.view", label: "View" }, { key: "loans.manage", label: "Manage" }, { key: "loans.approve", label: "Approve" }] },
  { module: "Finance", color: "amber", permissions: [{ key: "transactions.view", label: "Transactions" }, { key: "payments.reconcile", label: "Reconcile" }, { key: "reports.export", label: "Export reports" }] },
  { module: "Administration", color: "emerald", permissions: [{ key: "staff.manage", label: "Staff" }, { key: "roles.manage", label: "Roles" }, { key: "settings.manage", label: "Settings" }] },
  { module: "Content & Support", color: "forest", permissions: [{ key: "cms.manage", label: "CMS" }, { key: "support.manage", label: "Support" }, { key: "notifications.send", label: "Notifications" }] },
];

export const rolePermissionMap = {
  "Super Administrator": permissionGroups.flatMap((group) => group.permissions.map((permission) => permission.key)),
  Administrator: permissionGroups.flatMap((group) => group.permissions.map((permission) => permission.key)).filter((key) => !["roles.manage", "settings.manage", "staff.manage"].includes(key)),
  "Compliance Officer": ["customers.view", "customers.suspend", "kyc.view", "kyc.review", "kyc.approve", "applications.view", "loans.view", "transactions.view", "reports.export", "support.manage"],
  "Investment Manager": ["customers.view", "products.manage", "applications.view", "applications.approve", "portfolio.view", "portfolio.export", "loans.view", "reports.export", "cms.manage"],
  "Finance Officer": ["customers.view", "applications.view", "portfolio.view", "loans.view", "transactions.view", "payments.reconcile", "reports.export"],
  "Customer Support": ["customers.view", "customers.edit", "kyc.view", "applications.view", "loans.view", "support.manage", "notifications.send"],
  "Read-only Auditor": ["customers.view", "kyc.view", "applications.view", "portfolio.view", "loans.view", "transactions.view", "reports.export"],
};

export const reportCards = [
  { title: "Customer report", description: "Acquisition, activation, verification and account status across the customer base.", icon: "users", formats: ["CSV", "PDF"], updated: "Today, 07:30" },
  { title: "Investment report", description: "Applications, approvals, funded investments and product-level distribution.", icon: "chart", formats: ["CSV", "PDF"], updated: "Today, 07:30" },
  { title: "Portfolio report", description: "Portfolio value, allocation, maturities and movement in assets under management.", icon: "pie-chart", formats: ["CSV", "PDF"], updated: "Yesterday, 18:00" },
  { title: "Transaction report", description: "Deposits, withdrawals, returns, fees and reconciliation status.", icon: "receipt", formats: ["CSV", "PDF"], updated: "Today, 07:30" },
  { title: "Loan report", description: "Facility approvals, outstanding principal, arrears and repayment performance.", icon: "hand-coins", formats: ["CSV", "PDF"], updated: "Today, 06:00" },
  { title: "KYC report", description: "Verification queues, document outcomes, ageing and reviewer activity.", icon: "shield-check", formats: ["CSV", "PDF"], updated: "Today, 07:30" },
  { title: "Operational report", description: "Support volume, response times, pending tasks and audit exceptions.", icon: "activity", formats: ["CSV", "PDF"], updated: "Yesterday, 20:15" },
  { title: "Revenue report", description: "Fee revenue, product economics and period-on-period movement.", icon: "wallet", formats: ["CSV", "PDF"], updated: "1 Nov 2026, 09:00" },
];

export const cmsPages = [
  { id: "CMS-01", title: "Homepage", type: "Landing page", slug: "/", status: "Published", updated: "2026-11-10", author: "Grace Adeleke", sections: 11 },
  { id: "CMS-02", title: "About VEE", type: "Page", slug: "/about", status: "Published", updated: "2026-10-28", author: "Tolu Adebayo", sections: 7 },
  { id: "CMS-03", title: "Investment opportunities", type: "Catalogue", slug: "/investments", status: "Published", updated: "2026-11-04", author: "Ifeoma Nwosu", sections: 4 },
  { id: "CMS-04", title: "Our team", type: "Page", slug: "/team", status: "Published", updated: "2026-10-20", author: "Grace Adeleke", sections: 3 },
  { id: "CMS-05", title: "How it works", type: "Page", slug: "/how-it-works", status: "Published", updated: "2026-09-12", author: "Grace Adeleke", sections: 2 },
  { id: "CMS-06", title: "November market note", type: "Insight", slug: "/insights", status: "Draft", updated: "2026-11-11", author: "Ifeoma Nwosu", sections: 6 },
  { id: "CMS-07", title: "Risk disclosure", type: "Legal", slug: "/risk-disclosure", status: "Published", updated: "2026-08-01", author: "Chinedu Okoro", sections: 8 },
  { id: "CMS-08", title: "Careers", type: "Page", slug: "/careers", status: "Published", updated: "2026-10-02", author: "Grace Adeleke", sections: 4 },
  { id: "CMS-09", title: "Homepage testimonial set", type: "Component", slug: "homepage", status: "Scheduled", updated: "2026-11-09", author: "Grace Adeleke", sections: 3 },
];

export const announcements = [
  { id: "ANN-204", title: "November maturity and distribution schedule", audience: "All active clients", channel: "Email · In-app", sent: "2026-11-01T09:00:00Z", delivered: "986", opened: "61%", status: "Sent" },
  { id: "ANN-203", title: "Scheduled maintenance: Sunday 02:00–04:00 WAT", audience: "All customers", channel: "Email · In-app", sent: "2026-10-28T14:00:00Z", delivered: "1,248", opened: "72%", status: "Sent" },
  { id: "ANN-202", title: "New product: Green Infrastructure Note", audience: "Verified, balanced+", channel: "Email · In-app", sent: "2026-10-19T10:30:00Z", delivered: "412", opened: "58%", status: "Sent" },
  { id: "ANN-201", title: "Action required: refresh expired identification", audience: "Documents expiring ≤30 days", channel: "Email · SMS", sent: "2026-10-12T08:15:00Z", delivered: "38", opened: "82%", status: "Sent" },
  { id: "ANN-205", title: "Year-end portfolio review invitations", audience: "Portfolio ≥ ₦5m", channel: "Email · In-app", sent: null, delivered: "—", opened: "—", status: "Scheduled" },
  { id: "ANN-206", title: "SME Impact Note — next funding window", audience: "Waitlist", channel: "Email", sent: null, delivered: "—", opened: "—", status: "Draft" },
];

export const auditLogs = [
  { id: "AUD-88301", actor: "Chinedu Okoro", role: "Compliance Officer", action: "Document approved", record: "DOC-7422 · Kwame Asante", ip: "102.89.41.12", time: "2026-11-12T08:42:11Z", severity: "info", before: "Under review", after: "Approved" },
  { id: "AUD-88300", actor: "Ifeoma Nwosu", role: "Investment Manager", action: "Investment application approved", record: "APP-6079 · Daniel Mwangi", ip: "102.89.41.18", time: "2026-11-12T08:31:04Z", severity: "high", before: "Pending review", after: "Approved" },
  { id: "AUD-88296", actor: "Ngozi Eze", role: "Super Administrator", action: "Role permissions updated", record: "ROLE-03 · Compliance Officer", ip: "102.89.41.10", time: "2026-11-11T19:12:52Z", severity: "critical", before: "11 permissions", after: "12 permissions" },
  { id: "AUD-88289", actor: "Michael Osei", role: "Finance Officer", action: "Payment reconciled", record: "PAY-77101 · Adaeze Nwankwo", ip: "102.89.42.09", time: "2026-11-11T17:44:25Z", severity: "medium", before: "Unreconciled", after: "Reconciled" },
  { id: "AUD-88283", actor: "Grace Adeleke", role: "Customer Support", action: "Customer note added", record: "CUS-1136 · Zara Ogunleye", ip: "102.89.42.21", time: "2026-11-11T15:02:10Z", severity: "info", before: null, after: "Note added" },
  { id: "AUD-88276", actor: "Chinedu Okoro", role: "Compliance Officer", action: "Document replacement requested", record: "DOC-7408 · Zara Ogunleye", ip: "102.89.41.12", time: "2026-11-11T12:20:07Z", severity: "medium", before: "Under review", after: "Replacement requested" },
  { id: "AUD-88268", actor: "Ifeoma Nwosu", role: "Investment Manager", action: "Product terms updated", record: "PRD-001 · VEE Prime Fixed Income", ip: "102.89.41.18", time: "2026-11-10T16:10:44Z", severity: "high", before: "Target return 14.00%", after: "Target return 14.25%" },
  { id: "AUD-88259", actor: "Ngozi Eze", role: "Super Administrator", action: "Staff member invited", record: "Yusuf Danladi · KYC Reviewer", ip: "102.89.41.10", time: "2026-11-10T11:42:03Z", severity: "high", before: null, after: "Invitation sent" },
  { id: "AUD-88251", actor: "Michael Osei", role: "Finance Officer", action: "Withdrawal placed on hold", record: "PAY-77019 · Fatima Bello", ip: "102.89.42.09", time: "2026-11-09T18:25:30Z", severity: "critical", before: "Pending", after: "Held" },
  { id: "AUD-88244", actor: "Grace Adeleke", role: "Customer Support", action: "Support ticket updated", record: "TKT-4482 · Bayo Adeyemi", ip: "102.89.42.21", time: "2026-11-09T12:00:04Z", severity: "info", before: "Open", after: "In progress" },
  { id: "AUD-88231", actor: "System", role: "Scheduled job", action: "Annual KYC review flagged", record: "38 customer records", ip: "system", time: "2026-11-08T02:00:00Z", severity: "medium", before: null, after: "Review queue created" },
  { id: "AUD-88220", actor: "Chinedu Okoro", role: "Compliance Officer", action: "Customer account suspended", record: "CUS-1131 · Chidi Okafor", ip: "102.89.41.12", time: "2026-11-07T10:44:16Z", severity: "critical", before: "Active", after: "Suspended" },
];

export const systemSettings = [
  { id: "company", label: "Company information", description: "Legal name, registration details, registered office and public contact channels.", icon: "building" },
  { id: "brand", label: "Brand & appearance", description: "Logo, colour tokens, typography and public-site metadata.", icon: "palette" },
  { id: "currency", label: "Currency & countries", description: "Base currency, supported markets and jurisdiction controls.", icon: "globe" },
  { id: "investment", label: "Investment configuration", description: "Product defaults, approval thresholds and maturity handling.", icon: "chart" },
  { id: "loans", label: "Loan configuration", description: "Eligibility rules, interest defaults, fees and repayment policies.", icon: "hand-coins" },
  { id: "documents", label: "Document requirements", description: "Required documents by market, expiry rules and review SLAs.", icon: "files" },
  { id: "onboarding", label: "Onboarding", description: "Steps, consent versions, save-and-resume and review routing.", icon: "list-checks" },
  { id: "notifications", label: "Notifications", description: "Email, SMS and in-app templates and delivery controls.", icon: "bell" },
  { id: "payments", label: "Payment integration", description: "Gateway configuration references and webhook health. Secrets are server-side only.", icon: "credit-card" },
  { id: "security", label: "Security", description: "Session policy, two-factor requirements and IP restrictions.", icon: "shield" },
  { id: "maintenance", label: "Maintenance mode", description: "Control public and authenticated access during maintenance windows.", icon: "wrench" },
];
