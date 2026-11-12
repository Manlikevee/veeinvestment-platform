export const company = {
  name: "Vee Investment",
  legalName: "Vee Investment & Wealth Management Limited",
  shortName: "VEE",
  tagline: "Build wealth with clarity.",
  description:
    "A considered approach to investing — combining disciplined portfolio management, transparent products and human guidance.",
  founded: 2016,
  email: "hello@veeinvestment.com",
  supportEmail: "support@veeinvestment.com",
  complianceEmail: "compliance@veeinvestment.com",
  phone: "+234 (0) 700 833 4683",
  internationalPhone: "+44 20 7946 0831",
  address: "12C Akin Adesola Street, Victoria Island, Lagos, Nigeria",
  registeredOffice: "12C Akin Adesola Street, Victoria Island, Lagos, 101241, Nigeria",
  hours: "Monday–Friday, 08:00–17:00 WAT",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    { label: "X", href: "https://x.com", icon: "x" },
    { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
  ],
  stats: [
    { value: "10+", label: "Years of stewardship", detail: "Founded in 2016" },
    { value: "1,240+", label: "Investor relationships", detail: "Illustrative platform data" },
    { value: "₦18.4bn", label: "Assets under review", detail: "Demonstration figure" },
    { value: "24/5", label: "Client support", detail: "Weekdays, WAT" },
  ],
  demoNotice:
    "Demonstration platform. Company details, financial figures, people and performance data are illustrative and must be replaced with approved information before launch.",
};

export const publicNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Investments", href: "/investments" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const products = [
  {
    id: "PRD-001",
    slug: "vee-prime-fixed-income",
    name: "VEE Prime Fixed Income",
    shortName: "Prime Fixed Income",
    category: "Fixed income",
    categorySlug: "fixed-income",
    icon: "landmark",
    color: "emerald",
    summary:
      "A medium-term allocation to a diversified portfolio of high-quality naira fixed-income instruments, managed with a focus on capital preservation.",
    description:
      "VEE Prime Fixed Income is designed for investors seeking a defined investment term and a clear view of the return terms attached to their allocation. The strategy allocates across government and high-quality corporate instruments, with active duration and liquidity management by the VEE investment team.",
    min: 500000,
    max: 50000000,
    durationMonths: 12,
    durationLabel: "12 months",
    targetReturn: 14.25,
    returnLabel: "Target annual return",
    risk: "Moderate",
    riskLevel: 2,
    status: "Open",
    featured: true,
    badge: "Most selected",
    objectives: [
      "Preserve capital across the investment term",
      "Generate a competitive naira income stream",
      "Maintain a diversified, liquid fixed-income exposure",
    ],
    eligibility: [
      "Individual or joint account holders aged 18 or above",
      "Completed identity and address verification",
      "Minimum investment of ₦500,000",
      "Resident in a supported jurisdiction",
    ],
    fees: [
      { label: "Management fee", value: "1.00% per annum" },
      { label: "Early withdrawal", value: "Subject to product terms and 30 days' notice" },
      { label: "Application fee", value: "None" },
    ],
    withdrawal:
      "Early withdrawal may be available at the discretion of the investment manager and is subject to the product terms, notice periods and any applicable adjustment. Availability is not guaranteed.",
    documents: ["Product term sheet", "Risk disclosure", "Investment agreement"],
    faqs: [
      {
        q: "Is the target return guaranteed?",
        a: "No. The target return is an illustrative objective, not a promise. Returns depend on the performance of the underlying instruments and the terms confirmed in your final agreement.",
      },
      {
        q: "How is my money invested?",
        a: "The portfolio is allocated across a diversified set of fixed-income instruments in line with the product mandate and prevailing market conditions.",
      },
      {
        q: "When can I withdraw?",
        a: "Withdrawals at maturity follow the standard settlement process. Early withdrawals are subject to the terms of your agreement and manager approval.",
      },
    ],
    updatedAt: "2026-10-28",
  },
  {
    id: "PRD-002",
    slug: "green-infrastructure-note",
    name: "Green Infrastructure Note",
    shortName: "Green Infrastructure",
    category: "Impact",
    categorySlug: "impact",
    icon: "leaf",
    color: "forest",
    summary:
      "Participate in the transition to resilient infrastructure through a professionally managed allocation to selected green projects.",
    description:
      "The Green Infrastructure Note provides exposure to a curated pipeline of infrastructure and transition projects. Each opportunity is assessed for financial viability, governance and environmental impact before inclusion. Capital is committed for a longer horizon and should be considered illiquid.",
    min: 1000000,
    max: 75000000,
    durationMonths: 24,
    durationLabel: "24 months",
    targetReturn: 11.5,
    returnLabel: "Indicative annual yield",
    risk: "Balanced",
    riskLevel: 3,
    status: "Open",
    featured: true,
    badge: "Impact series",
    objectives: [
      "Support measurable environmental outcomes",
      "Access longer-duration infrastructure exposure",
      "Diversify away from short-term market cycles",
    ],
    eligibility: [
      "Completed onboarding and suitability assessment",
      "Minimum investment of ₦1,000,000",
      "Ability to commit capital for the full term",
      "Qualified investor declaration where required",
    ],
    fees: [
      { label: "Management fee", value: "1.25% per annum" },
      { label: "Performance fee", value: "10% of returns above the stated hurdle" },
      { label: "Early withdrawal", value: "Not available during the lock-in period" },
    ],
    withdrawal:
      "This product is intended as a longer-term commitment. Early exit is generally not available and any secondary transfer is subject to manager approval and applicable law.",
    documents: ["Impact framework", "Product term sheet", "Risk disclosure"],
    faqs: [
      {
        q: "What makes a project green?",
        a: "Projects are screened against our impact framework, which considers environmental outcomes, governance and measurement. Inclusion is not an endorsement by any regulator.",
      },
      {
        q: "Can I exit early?",
        a: "The note is designed for a 24-month commitment. Early exit is generally unavailable; please review the risk disclosure carefully.",
      },
    ],
    updatedAt: "2026-10-19",
  },
  {
    id: "PRD-003",
    slug: "balanced-growth-portfolio",
    name: "Balanced Growth Portfolio",
    shortName: "Balanced Growth",
    category: "Managed portfolio",
    categorySlug: "managed",
    icon: "chart",
    color: "sage",
    summary:
      "A diversified multi-asset portfolio built for investors with a medium-to-long horizon and a balanced appetite for market movement.",
    description:
      "The Balanced Growth Portfolio combines equities, fixed income and selected alternatives in a risk-aware allocation. The portfolio is periodically rebalanced within mandate limits, with the objective of compounding capital over time rather than chasing short-term outcomes.",
    min: 250000,
    max: 100000000,
    durationMonths: 36,
    durationLabel: "36 months (recommended)",
    targetReturn: 9.8,
    returnLabel: "Long-term return objective",
    risk: "Balanced",
    riskLevel: 3,
    status: "Open",
    featured: true,
    badge: "Core portfolio",
    objectives: [
      "Grow capital over a multi-year horizon",
      "Balance growth assets with defensive income",
      "Maintain disciplined diversification and rebalancing",
    ],
    eligibility: [
      "Completed investor profile and risk questionnaire",
      "Minimum investment of ₦250,000",
      "Investment horizon of at least three years recommended",
      "Accepted risk disclosure",
    ],
    fees: [
      { label: "Management fee", value: "1.50% per annum" },
      { label: "Fund expenses", value: "Estimated at 0.35% per annum" },
      { label: "Early withdrawal", value: "Monthly liquidity window, subject to notice" },
    ],
    withdrawal:
      "Monthly liquidity windows may be available subject to notice and the portfolio's dealing terms. The value of the portfolio can fall as well as rise.",
    documents: ["Portfolio mandate", "Risk disclosure", "Fees schedule"],
    faqs: [
      {
        q: "Will the portfolio value move?",
        a: "Yes. The portfolio holds market-linked assets and its value can fluctuate. It is not a savings account and capital is at risk.",
      },
      {
        q: "How often is it rebalanced?",
        a: "The investment team reviews allocations regularly and rebalances within the mandate's tolerance bands.",
      },
    ],
    updatedAt: "2026-11-02",
  },
  {
    id: "PRD-004",
    slug: "money-market-plus",
    name: "Money Market Plus",
    shortName: "Money Market Plus",
    category: "Liquidity",
    categorySlug: "liquidity",
    icon: "coins",
    color: "sand",
    summary:
      "A lower-volatility cash management option offering a professionally managed route to short-term money market instruments.",
    description:
      "Money Market Plus is intended for capital that may be needed in the near term. It invests in short-dated money market instruments and aims to provide a stable, transparent home for cash while preserving access to funds through scheduled liquidity windows.",
    min: 100000,
    max: 25000000,
    durationMonths: 6,
    durationLabel: "6 months",
    targetReturn: 8.6,
    returnLabel: "Target annual return",
    risk: "Conservative",
    riskLevel: 1,
    status: "Open",
    featured: false,
    badge: "Short term",
    objectives: [
      "Provide a liquid home for near-term capital",
      "Reduce exposure to market volatility",
      "Deliver a transparent income objective",
    ],
    eligibility: [
      "Completed onboarding and bank verification",
      "Minimum investment of ₦100,000",
      "Accepted money market risk disclosure",
    ],
    fees: [
      { label: "Management fee", value: "0.65% per annum" },
      { label: "Liquidity window", value: "Monthly, subject to notice" },
      { label: "Application fee", value: "None" },
    ],
    withdrawal:
      "While the strategy targets lower volatility, it is not a bank deposit and is not covered by deposit insurance. Liquidity windows and settlement timelines apply.",
    documents: ["Product summary", "Risk disclosure"],
    faqs: [
      {
        q: "Is this a bank account?",
        a: "No. Money Market Plus is a managed investment product and is not a deposit account. Capital is at risk.",
      },
      {
        q: "How quickly can I access funds?",
        a: "Subject to the liquidity window and settlement cycle described in the product terms.",
      },
    ],
    updatedAt: "2026-09-30",
  },
  {
    id: "PRD-005",
    slug: "real-estate-income-fund",
    name: "Real Estate Income Fund",
    shortName: "Real Estate Income",
    category: "Alternatives",
    categorySlug: "alternatives",
    icon: "building",
    color: "clay",
    summary:
      "Access professionally managed real estate income opportunities with a focus on quality assets and contractual cash flows.",
    description:
      "The Real Estate Income Fund targets selected income-producing commercial and mixed-use assets. Investments are underpinned by asset-level due diligence, conservative leverage and active property management. Real estate is illiquid and valuations may change over time.",
    min: 1500000,
    max: 65000000,
    durationMonths: 24,
    durationLabel: "24–36 months",
    targetReturn: 12,
    returnLabel: "Distribution objective",
    risk: "Balanced",
    riskLevel: 3,
    status: "Open",
    featured: false,
    badge: "Real assets",
    objectives: [
      "Generate periodic income from real assets",
      "Add diversification to a multi-asset portfolio",
      "Participate in high-quality property cash flows",
    ],
    eligibility: [
      "Minimum investment of ₦1,500,000",
      "Completed suitability assessment",
      "Longer-term investment horizon",
      "Accepted real estate risk disclosure",
    ],
    fees: [
      { label: "Management fee", value: "1.60% per annum" },
      { label: "Transaction costs", value: "Disclosed per opportunity" },
      { label: "Early withdrawal", value: "Subject to asset liquidity and approval" },
    ],
    withdrawal:
      "Real estate can take time to sell. Withdrawals depend on available liquidity and are subject to valuation and manager approval. The value of the underlying assets may fall.",
    documents: ["Fund overview", "Property risk disclosure", "Terms"],
    faqs: [
      {
        q: "Are distributions guaranteed?",
        a: "No. Distributions depend on asset performance and underlying lease cash flows.",
      },
      {
        q: "Why is the term longer?",
        a: "Real estate transactions and exits take time. A longer horizon better matches the asset class.",
      },
    ],
    updatedAt: "2026-08-21",
  },
  {
    id: "PRD-006",
    slug: "sme-impact-note",
    name: "SME Impact Note",
    shortName: "SME Impact Note",
    category: "Impact",
    categorySlug: "impact",
    icon: "sprout",
    color: "lime",
    summary:
      "A professionally screened allocation to established small and medium enterprises, structured around clear impact and repayment discipline.",
    description:
      "The SME Impact Note supports established businesses with working capital through a diversified, managed structure. Every borrower is assessed on cash flow, governance and repayment capacity. The strategy is subject to credit risk and is intended for investors who can tolerate a higher level of uncertainty.",
    min: 250000,
    max: 30000000,
    durationMonths: 18,
    durationLabel: "18 months",
    targetReturn: 13.4,
    returnLabel: "Target annual return",
    risk: "Balanced",
    riskLevel: 3,
    status: "Opening soon",
    featured: false,
    badge: "Waitlist",
    objectives: [
      "Support the growth of established local enterprises",
      "Diversify across a managed borrower pool",
      "Target income with credit-aware structuring",
    ],
    eligibility: [
      "Completed onboarding and suitability assessment",
      "Minimum investment of ₦250,000",
      "High-risk tolerance acknowledgement",
      "Availability of the next funding window",
    ],
    fees: [
      { label: "Management fee", value: "1.75% per annum" },
      { label: "Credit monitoring", value: "Included" },
      { label: "Early withdrawal", value: "Not available; wait for maturity" },
    ],
    withdrawal:
      "The note is intended to be held to maturity. Early withdrawal is not available because underlying credit exposures cannot be readily liquidated. Credit losses may reduce capital.",
    documents: ["Credit methodology", "Risk disclosure", "Impact report"],
    faqs: [
      {
        q: "When is the next window?",
        a: "The product is currently opening soon. Join the interest list and we will share approved dates.",
      },
      {
        q: "What happens if a borrower defaults?",
        a: "The manager follows a defined recovery process. A default can reduce returns and, in severe cases, capital.",
      },
    ],
    updatedAt: "2026-11-04",
  },
];

export const services = [
  {
    slug: "investment-management",
    title: "Investment management",
    icon: "chart",
    summary:
      "Disciplined management of fixed income, multi-asset and alternative allocations.",
    description:
      "We build and manage portfolios around clear mandates, documented risk limits and regular review. Every strategy is explained in plain language, with fees and risks visible before you commit.",
    features: [
      "Outcome-led portfolio mandates",
      "Active risk and liquidity oversight",
      "Documented investment decision process",
      "Accessible performance reporting",
    ],
  },
  {
    slug: "portfolio-management",
    title: "Portfolio management",
    icon: "layers",
    summary:
      "A consolidated view of your allocations, maturities and distribution of capital.",
    description:
      "Our portfolio service brings your investments together in one place, helping you see how capital is allocated and when commitments mature. Rebalancing and liquidity planning are handled within the agreed mandate.",
    features: [
      "Consolidated allocation view",
      "Maturity and liquidity planning",
      "Mandate-aware rebalancing",
      "Quarterly portfolio reviews",
    ],
  },
  {
    slug: "advisory",
    title: "Investment advisory",
    icon: "compass",
    summary:
      "Structured guidance to help you frame goals, constraints and investment decisions.",
    description:
      "Advisory is a conversation, not a product pitch. We help you clarify objectives, understand trade-offs and prepare for a decision. Advice is limited to our approved scope and written terms.",
    features: [
      "Goal and horizon discovery",
      "Risk and liquidity assessment",
      "Product suitability discussions",
      "Clear, documented next steps",
    ],
  },
  {
    slug: "loan-services",
    title: "Loan services",
    icon: "hand-coins",
    summary:
      "Structured borrowing options for eligible customers, with transparent repayment schedules.",
    description:
      "We offer selected asset-backed and enterprise facilities to eligible customers. Applications are assessed on affordability and documentation, and every approved offer includes a complete repayment schedule.",
    features: [
      "Eligibility-led application",
      "Transparent repayment schedule",
      "Digital document collection",
      "Repayment tracking in your dashboard",
    ],
  },
  {
    slug: "wealth-planning",
    title: "Wealth planning",
    icon: "target",
    summary:
      "A practical framework for aligning capital with near- and long-term priorities.",
    description:
      "Wealth planning considers the whole picture: liquidity needs, time horizons, family priorities and the role of different assets. It is a planning service and does not promise a particular outcome.",
    features: [
      "Cash-flow and liquidity mapping",
      "Goal prioritisation",
      "Investment policy alignment",
      "Periodic plan review",
    ],
  },
  {
    slug: "client-support",
    title: "Client support",
    icon: "life-buoy",
    summary:
      "Human help when it matters, with a documented path for questions, requests and complaints.",
    description:
      "Our client team supports onboarding, payments, documents and account questions. Every request receives a reference, a status and a clear owner.",
    features: [
      "Secure support tickets",
      "Document and verification help",
      "Payment and statement assistance",
      "Formal complaints process",
    ],
  },
];

export const team = [
  {
    slug: "tolu-adebayo",
    name: "Tolu Adebayo",
    role: "Chief Executive Officer",
    group: "Executive",
    image: "/images/team/team-1.jpg",
    bio: "Tolu leads VEE's strategy and operating discipline. She has spent two decades across investment banking, asset management and financial inclusion, and is focused on making considered investing easier to understand.",
    focus: "Strategy · Client outcomes · Governance",
  },
  {
    slug: "ifeoma-nwosu",
    name: "Ifeoma Nwosu",
    role: "Chief Investment Officer",
    group: "Executive",
    image: "/images/team/team-2.jpg",
    bio: "Ifeoma oversees investment strategy, portfolio construction and risk. Her background spans fixed income, multi-asset mandates and institutional research across African markets.",
    focus: "Portfolio strategy · Risk · Research",
  },
  {
    slug: "michael-osei",
    name: "Michael Osei",
    role: "Chief Financial Officer",
    group: "Executive",
    image: "/images/team/team-3.jpg",
    bio: "Michael is responsible for financial control, reporting and capital stewardship. He brings experience in audit, treasury and regulated financial services.",
    focus: "Finance · Controls · Reporting",
  },
  {
    slug: "zainab-bello",
    name: "Zainab Bello",
    role: "Chief Operating Officer",
    group: "Executive",
    image: "/images/team/team-4.jpg",
    bio: "Zainab leads operations, client experience and delivery. She specialises in building reliable processes for regulated products and high-trust client relationships.",
    focus: "Operations · Client experience · Delivery",
  },
  {
    slug: "amara-eze",
    name: "Dr. Amara Eze",
    role: "Chair of the Board",
    group: "Board",
    image: "/images/team/team-6.jpg",
    bio: "Amara chairs the board and guides VEE's long-term stewardship. She has held senior governance and risk roles across financial services and development finance.",
    focus: "Governance · Stewardship · Risk",
  },
  {
    slug: "david-mensah",
    name: "Sir David Mensah",
    role: "Non-Executive Director",
    group: "Board",
    image: "/images/team/team-5.jpg",
    bio: "David brings deep experience in capital markets and institutional client service. He chairs the audit and risk committee and supports VEE's control environment.",
    focus: "Audit · Capital markets · Controls",
  },
  {
    slug: "chinedu-okoro",
    name: "Chinedu Okoro",
    role: "Head of Risk & Compliance",
    group: "Management",
    image: "/images/team/team-7.jpg",
    bio: "Chinedu leads risk, compliance and financial crime controls. He works closely with product and operations teams to keep client outcomes and regulatory obligations aligned.",
    focus: "Compliance · Financial crime · Risk",
  },
  {
    slug: "grace-adeleke",
    name: "Grace Adeleke",
    role: "Head of Client Experience",
    group: "Management",
    image: "/images/team/team-8.jpg",
    bio: "Grace leads the client team and the design of VEE's service experience. She is passionate about clear communication, accessible digital journeys and responsible support.",
    focus: "Client service · Accessibility · Design",
  },
];

export const testimonials = [
  {
    quote:
      "The clarity is what stands out. I can see what I own, what it is for and when it matures — without needing a finance degree.",
    name: "Adaeze M.",
    role: "Business owner · Lagos",
    detail: "Illustrative client story",
  },
  {
    quote:
      "Onboarding was considered and thorough. The team explained why each document was needed and what would happen next.",
    name: "Kwame A.",
    role: "Technology executive · Accra",
    detail: "Illustrative client story",
  },
  {
    quote:
      "I value the restraint. VEE did not promise me a number. They explained the trade-offs and let me make an informed decision.",
    name: "Fatima B.",
    role: "Medical consultant · Abuja",
    detail: "Illustrative client story",
  },
];

export const milestones = [
  { year: "2016", title: "VEE is founded", body: "A small team begins advising families and founders on long-term capital allocation." },
  { year: "2018", title: "First managed mandate", body: "The firm launches its first discretionary fixed-income portfolio for individual investors." },
  { year: "2020", title: "Digital client access", body: "Portfolio visibility and document workflows move online, with a focus on clarity and control." },
  { year: "2022", title: "Impact series", body: "The investment team formalises its impact screening and infrastructure research framework." },
  { year: "2024", title: "Enterprise operations", body: "A dedicated operations and compliance platform is introduced for regulated workflows." },
  { year: "2026", title: "A clearer platform", body: "VEE's next-generation client and administration experience is designed around transparency, security and service." },
];

export const faqs = [
  {
    category: "General",
    q: "What is Vee Investment?",
    a: "Vee Investment is an investment and wealth management platform. The public site describes our approach and products; the client portal provides account, investment, document and support tools. This build is a demonstration.",
  },
  {
    category: "General",
    q: "Is Vee Investment a bank?",
    a: "No. VEE is not presented as a bank or deposit-taking institution. Investment products are not bank deposits and are not covered by deposit insurance unless expressly stated.",
  },
  {
    category: "General",
    q: "Which countries do you serve?",
    a: "Supported jurisdictions are configured by the business and subject to legal and regulatory review. Do not assume availability in your country until it appears in the onboarding flow.",
  },
  {
    category: "Registration",
    q: "How do I create an account?",
    a: "Select Get started, complete your basic account details and verify your email. You will then be guided through onboarding and, where required, identity verification.",
  },
  {
    category: "Registration",
    q: "Can I register on behalf of a company?",
    a: "The current demonstration supports individual onboarding. Corporate and institutional onboarding requires additional checks, authorised signatories and entity documents.",
  },
  {
    category: "Verification",
    q: "How long does verification take?",
    a: "Verification timelines depend on document quality and review queues. A submitted application remains pending until an authorised reviewer records a decision. This demo does not claim approval.",
  },
  {
    category: "Verification",
    q: "Why do you need my identity document?",
    a: "Identity verification is a core financial-crime control. We request only the information required by our policies and applicable law, and access is restricted.",
  },
  {
    category: "Investments",
    q: "Are returns guaranteed?",
    a: "No. Unless a product term sheet expressly states otherwise, returns are targets or objectives, not promises. The value of investments can fall and you may get back less than you invested.",
  },
  {
    category: "Investments",
    q: "How do I choose a product?",
    a: "Start with your objective, time horizon and ability to tolerate loss. Product pages explain minimums, terms and risks. Suitability is assessed during application, not by a marketing page.",
  },
  {
    category: "Payments",
    q: "How do I fund an investment?",
    a: "Once an application is approved, you will receive payment instructions through an authenticated channel. Always confirm details in the portal before transferring funds.",
  },
  {
    category: "Payments",
    q: "What payment methods are supported?",
    a: "Payment methods depend on jurisdiction and product. The demonstration interface does not initiate live payments and never presents a simulated transfer as a completed transaction.",
  },
  {
    category: "Withdrawals",
    q: "When can I withdraw my investment?",
    a: "Withdrawal terms are product-specific. Some products have lock-in periods or notice requirements. Review the product terms and your final agreement before investing.",
  },
  {
    category: "Loans",
    q: "Are loans available to everyone?",
    a: "No. Loans are subject to eligibility, affordability assessment, documentation and approval. An application or pre-qualification indicator is not an offer of credit.",
  },
  {
    category: "Loans",
    q: "How are repayments calculated?",
    a: "Each offer includes a repayment schedule with principal, interest and fees where applicable. The schedule is illustrative until an approved facility is issued.",
  },
  {
    category: "Security",
    q: "How is my data protected?",
    a: "Access controls, encrypted transport, session management and audit trails are part of the intended design. No online system is completely secure; report suspicious activity immediately.",
  },
  {
    category: "Security",
    q: "Will Vee ever ask for my password?",
    a: "No. VEE will not ask for your password or one-time code by email, phone or message. Use the authenticated portal and contact support through published channels if in doubt.",
  },
  {
    category: "Support",
    q: "How do I contact support?",
    a: "Signed-in clients can create a secure ticket from Support in the dashboard. Public enquiries can use the contact form. Include a reference where possible.",
  },
  {
    category: "Support",
    q: "How do I make a complaint?",
    a: "Use the formal complaints process so the request is logged and tracked. You will receive a reference and an expected response timeline.",
  },
];

export const insights = [
  {
    slug: "building-a-portfolio-that-can-wait",
    title: "Building a portfolio that can wait",
    category: "Portfolio thinking",
    date: "2026-10-24",
    readTime: "6 min read",
    author: "Ifeoma Nwosu",
    image: "/images/insights/insight-1.jpg",
    excerpt:
      "Patient capital is not passive capital. A practical look at time horizon, liquidity and the discipline of doing less.",
    featured: true,
    sections: [
      { heading: "Start with the job the money has to do", body: "A portfolio is not a scoreboard. It is a structure designed to fund something: a business transition, a family commitment, an income need or simply a reserve against uncertainty. Before selecting a product, define the job the capital has to do and when it will be needed." },
      { heading: "Time is a risk control", body: "A longer horizon gives a portfolio room to absorb normal market movement, but it does not remove risk. It simply changes which risks matter. The right question is not 'how long can I wait?' in isolation, but 'what would force me to sell at the wrong time?'" },
      { heading: "Liquidity deserves a line item", body: "Investors often treat liquidity as an afterthought. It should be an explicit allocation. Keeping near-term needs outside volatile or illiquid investments is one of the simplest ways to avoid making a permanent decision during a temporary market event." },
      { heading: "Doing less, deliberately", body: "Activity can feel like progress. Yet frequent changes add cost, taxes and behavioural risk. A documented mandate and a small number of review points can create more value than a busy portfolio." },
    ],
    takeaways: [
      "Match the investment horizon to a real cash-flow need.",
      "Keep near-term liquidity outside illiquid allocations.",
      "Write down the conditions that would justify a change.",
    ],
    disclaimer: "This article is educational and does not constitute personal investment advice.",
  },
  {
    slug: "reading-risk-before-chasing-yield",
    title: "Reading risk before chasing yield",
    category: "Risk",
    date: "2026-10-12",
    readTime: "7 min read",
    author: "Chinedu Okoro",
    image: "/images/insights/insight-2.jpg",
    excerpt:
      "A higher headline return is not a free lunch. Five questions to ask before comparing investment products.",
    featured: true,
    sections: [
      { heading: "Return is compensation, not a promise", body: "A target return tells you what a strategy is trying to achieve. It does not tell you what will happen. Compare the conditions, the time horizon and the possibility of loss alongside the number." },
      { heading: "Ask what can go wrong", body: "Credit risk, duration risk, liquidity risk, valuation risk and operational risk are different exposures. Two products with the same headline return can carry very different paths to that outcome." },
      { heading: "Look at the exit, not just the entry", body: "The terms that govern withdrawal, notice periods and valuation at exit matter as much as the entry yield. A product that cannot be sold when you need cash is not liquid because it is labelled short term." },
      { heading: "Fees compound too", body: "A fee is a certain cost against an uncertain return. Ask for the total cost picture, including underlying fund expenses and any transaction or early-exit costs." },
    ],
    takeaways: [
      "Read the risk disclosure before the return headline.",
      "Compare liquidity and fees on a like-for-like basis.",
      "Ask what happens in a stress scenario.",
    ],
    disclaimer: "This article is educational and does not constitute personal investment advice.",
  },
  {
    slug: "the-quiet-case-for-infrastructure",
    title: "The quiet case for infrastructure",
    category: "Market perspectives",
    date: "2026-09-30",
    readTime: "5 min read",
    author: "Tolu Adebayo",
    image: "/images/insights/insight-3.jpg",
    excerpt:
      "Why long-duration real assets can play a role in a diversified portfolio — and where the risks hide.",
    featured: false,
    sections: [
      { heading: "Long duration is not the same as low risk", body: "Infrastructure assets can offer long-dated cash flows, but they also bring construction, regulatory, demand and refinancing risks. The asset class is a tool, not a guarantee." },
      { heading: "Governance is part of the investment case", body: "The quality of the sponsor, the contract structure and the approach to environmental and social outcomes can influence whether a project delivers. Diligence has to go beyond the financial model." },
      { heading: "A role, not the whole portfolio", body: "Because infrastructure is illiquid and sensitive to assumptions, it generally belongs alongside more liquid assets. Position sizing and liquidity planning matter more than the headline opportunity." },
    ],
    takeaways: [
      "Assess construction, regulatory and refinancing risk.",
      "Do not use illiquid assets for near-term needs.",
      "Demand evidence behind impact claims.",
    ],
    disclaimer: "This article is educational and does not constitute personal investment advice.",
  },
  {
    slug: "the-anatomy-of-a-good-financial-plan",
    title: "The anatomy of a good financial plan",
    category: "Planning",
    date: "2026-09-18",
    readTime: "8 min read",
    author: "Grace Adeleke",
    image: "/images/insights/insight-5.jpg",
    excerpt:
      "A plan is more than a projection. It is a set of decisions that still make sense when the projection is wrong.",
    featured: false,
    sections: [
      { heading: "Begin with commitments, not products", body: "A useful plan starts with obligations and intentions: school fees, a home deposit, a business reserve or retirement income. Products are selected to serve those commitments, not the other way around." },
      { heading: "Build in resilience", body: "The best plan is not the one with the highest projected return. It is the one that can survive a lost job, a market drawdown or an unexpected expense without forcing a bad sale." },
      { heading: "Review less, but review honestly", body: "A calendar of meaningful reviews — rather than constant checking — creates space for considered decisions. When conditions change, document what changed and why the plan should too." },
      { heading: "Make it understandable", body: "If you cannot explain the plan in a page, it may be too complicated. Simplicity is not a lack of sophistication; it is a form of risk control." },
    ],
    takeaways: [
      "Anchor the plan to real commitments.",
      "Stress-test the plan, not just the projections.",
      "Document the assumptions behind every recommendation.",
    ],
    disclaimer: "This article is educational and does not constitute personal investment advice.",
  },
  {
    slug: "what-investors-should-know-about-liquidity",
    title: "What investors should know about liquidity",
    category: "Risk",
    date: "2026-08-29",
    readTime: "4 min read",
    author: "Ifeoma Nwosu",
    image: "/images/insights/insight-4.jpg",
    excerpt:
      "Access to your money is a feature of an investment, not a footnote. A short guide to liquidity terms.",
    featured: false,
    sections: [
      { heading: "Liquidity is conditional", body: "An investment is liquid if it can be converted to cash quickly, at a predictable value, when you choose. Many products that look liquid in normal conditions become less so under stress." },
      { heading: "Read the mechanics", body: "Notice periods, dealing dates, valuation frequency and gate provisions all affect access. Ask how long a withdrawal actually takes, not just whether it is 'available'." },
      { heading: "Match access to need", body: "Cash you may need for an emergency should not depend on a monthly dealing window or a buyer appearing. Keep a separate buffer." },
    ],
    takeaways: [
      "Distinguish liquidity from volatility.",
      "Ask for settlement timelines in writing.",
      "Keep an emergency buffer outside investment products.",
    ],
    disclaimer: "This article is educational and does not constitute personal investment advice.",
  },
  {
    slug: "behaviour-is-part-of-the-portfolio",
    title: "Behaviour is part of the portfolio",
    category: "Investor behaviour",
    date: "2026-08-11",
    readTime: "5 min read",
    author: "Zainab Bello",
    image: "/images/insights/insight-6.jpg",
    excerpt:
      "The gap between a portfolio's return and an investor's experience is often behaviour. Here is how to narrow it.",
    featured: false,
    sections: [
      { heading: "The decision is the risk", body: "Market volatility is visible; the cost of reacting to it is often invisible. Selling after a fall or buying after a rise converts temporary movement into a permanent outcome." },
      { heading: "Create a decision rule", body: "Pre-commit to how you will respond to drawdowns, windfalls and liquidity events. A written rule is harder to abandon in the moment." },
      { heading: "Measure what you can control", body: "Fees, diversification, liquidity and the quality of your assumptions are within your control. Short-term returns are not. Focus where effort changes the outcome." },
    ],
    takeaways: [
      "Write down your response to a 20% drawdown.",
      "Automate contributions where appropriate.",
      "Review decisions, not just performance.",
    ],
    disclaimer: "This article is educational and does not constitute personal investment advice.",
  },
];

export const insightCategories = [...new Set(insights.map((article) => article.category))];
export const productCategories = ["All", ...new Set(products.map((product) => product.category))];
export const faqCategories = ["All", ...new Set(faqs.map((item) => item.category))];

export const footerLinks = [
  {
    heading: "Invest",
    links: [
      { label: "Investment products", href: "/investments" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Services", href: "/services" },
      { label: "Investor login", href: "/auth/login" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About VEE", href: "/about" },
      { label: "Our team", href: "/team" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Complaints", href: "/complaints" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of use", href: "/terms" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Risk disclosure", href: "/risk-disclosure" },
      { label: "Cookie policy", href: "/cookie-policy" },
    ],
  },
];
