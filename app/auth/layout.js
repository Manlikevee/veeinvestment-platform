import { AuthShell } from "@/components/layout/auth-shell";

export const metadata = {
  title: "Account access",
  description: "Sign in or create your Vee Investment account.",
};

export default function AuthLayout({ children }) {
  return <AuthShell>{children}</AuthShell>;
}
