import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";
import { siteConfig } from "@/lib/config/site";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Vee Investment — Build wealth with clarity",
    template: "%s | Vee Investment",
  },
  description: siteConfig.description,
  applicationName: "Vee Investment",
  keywords: ["investment management", "wealth management", "portfolio", "Nigeria", "Vee Investment"],
  openGraph: {
    title: "Vee Investment — Build wealth with clarity",
    description: siteConfig.description,
    url: "/",
    siteName: "Vee Investment",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vee Investment — Build wealth with clarity",
    description: siteConfig.description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8faf9" },
    { media: "(prefers-color-scheme: dark)", color: "#08110d" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('vee-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=d?'dark':'light';document.documentElement.dataset.theme=r;document.documentElement.style.colorScheme=r;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${manrope.variable} ${instrumentSerif.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
