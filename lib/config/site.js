export const siteConfig = {
  name: "Vee Investment",
  shortName: "VEE",
  description:
    "A considered investment and wealth management platform for individuals, families and enterprises.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_NG",
  currency: "NGN",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
  dataProvider: process.env.NEXT_PUBLIC_DATA_PROVIDER || "mock",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
};
