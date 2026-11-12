import { customer } from "@/lib/data/customer";

export const DRAFT_KEY = "vee-onboarding-draft";

export const onboardingSteps = [
  { title: "Account information", short: "Account", group: "Account", description: "Your basic account and contact details." },
  { title: "Personal information", short: "Personal", group: "Account", description: "A few details to help us understand your circumstances." },
  { title: "Residential address", short: "Address", group: "Account", description: "Where you currently live." },
  { title: "Next of kin", short: "Next of kin", group: "Account", description: "Someone we can contact in an emergency." },
  { title: "Employment & finances", short: "Employment", group: "Profile", description: "Your employment and source of funds." },
  { title: "Identity verification", short: "Identity", group: "Verification", description: "Upload a valid identity document." },
  { title: "Address verification", short: "Address proof", group: "Verification", description: "Upload a recent proof of address." },
  { title: "Bank information", short: "Bank", group: "Verification", description: "The account used for settlements and withdrawals." },
  { title: "Investment preferences", short: "Preferences", group: "Profile", description: "Your objectives, horizon and risk perspective." },
  { title: "Document review", short: "Documents", group: "Review", description: "Check everything before you submit." },
  { title: "Agreements", short: "Agreements", group: "Review", description: "Review and record your consent." },
  { title: "Final submission", short: "Submit", group: "Review", description: "Confirm your application." },
];

export const stepGroups = ["Account", "Profile", "Verification", "Review"];

export const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "Canada", "Other"];
export const identityTypes = ["International passport", "National identity card", "Driving licence"];
export const addressDocTypes = ["Utility bill", "Bank statement", "Government-issued letter"];
export const objectiveOptions = ["Long-term growth", "Regular income", "Capital preservation", "Inflation protection", "Impact investing", "Liquidity"];
export const categoryOptions = ["Fixed income", "Impact", "Managed portfolio", "Liquidity", "Alternatives"];

export const initialOnboardingData = {
  account: {
    firstName: customer.firstName, middleName: customer.middleName, lastName: customer.lastName,
    email: customer.email, phone: customer.phone, preferredContact: "Email", password: "", confirmPassword: "",
  },
  personal: {
    dob: customer.dob, gender: customer.gender, maritalStatus: customer.maritalStatus,
    nationality: customer.nationality, country: customer.country, employmentStatus: customer.employmentStatus,
    occupation: customer.occupation,
  },
  address: {
    country: customer.country, state: customer.state, city: customer.city, street: customer.address,
    postalCode: customer.postalCode, residentialStatus: customer.residentialStatus,
  },
  kin: {
    name: customer.nextOfKin.name, relationship: customer.nextOfKin.relationship, phone: customer.nextOfKin.phone,
    email: customer.nextOfKin.email, address: customer.nextOfKin.address,
  },
  financial: {
    employmentType: customer.employmentStatus, employer: customer.employer, occupation: customer.occupation,
    sourceFunds: customer.sourceOfFunds, sourceWealth: customer.sourceOfWealth, income: customer.incomeRange,
    experience: customer.investmentExperience,
  },
  identity: {
    documentType: "International passport", documentNumber: "", issuingCountry: customer.country,
    expiry: "2028-09-18",
    file: { name: "bayo-passport-2024.pdf", size: "2.4 MB", type: "PDF", status: "Ready", progress: 100, demo: true },
  },
  addressVerification: {
    documentType: "Utility bill",
    file: { name: "lekki-utility-oct-2026.pdf", size: "1.1 MB", type: "PDF", status: "Ready", progress: 100, demo: true },
  },
  bank: {
    bankName: customer.bank.bankName, accountName: customer.bank.accountName, accountNumber: "0123456789",
    accountType: customer.bank.accountType, country: customer.bank.country, sortCode: customer.bank.sortCode,
  },
  preferences: {
    objectives: ["Long-term growth", "Regular income"], horizon: "3–5 years", categories: ["Fixed income", "Impact"],
    riskAnswers: { tolerance: "balanced", reaction: "hold", experience: "comfortable" }, communication: "Email",
  },
  agreements: { terms: false, privacy: false, risk: false, declaration: false },
};

export function hydrateDraft(value) {
  if (!value) return structuredClone(initialOnboardingData);
  return {
    account: { ...initialOnboardingData.account, ...(value.account || {}), password: "", confirmPassword: "" },
    personal: { ...initialOnboardingData.personal, ...(value.personal || {}) },
    address: { ...initialOnboardingData.address, ...(value.address || {}) },
    kin: { ...initialOnboardingData.kin, ...(value.kin || {}) },
    financial: { ...initialOnboardingData.financial, ...(value.financial || {}) },
    identity: { ...initialOnboardingData.identity, ...(value.identity || {}) },
    addressVerification: { ...initialOnboardingData.addressVerification, ...(value.addressVerification || {}) },
    bank: { ...initialOnboardingData.bank, ...(value.bank || {}) },
    preferences: {
      ...initialOnboardingData.preferences,
      ...(value.preferences || {}),
      riskAnswers: { ...initialOnboardingData.preferences.riskAnswers, ...(value.preferences?.riskAnswers || {}) },
    },
    agreements: { ...initialOnboardingData.agreements, ...(value.agreements || {}) },
  };
}

export function safeDraft(data) {
  return { ...data, account: { ...data.account, password: "", confirmPassword: "" } };
}
