import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Impisi Resources";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Mining, Beneficiation & Commodity Solutions`,
    template: `%s | ${siteName}`,
  },
  description:
    "Impisi Resources is a vertically integrated mining, mineral processing, and commodities group focused on development, operation, and optimisation of mining assets.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | Mining, Beneficiation & Commodity Solutions`,
    description:
      "Integrated mining operations, exploration, beneficiation, commodity trading, and project development.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: `${siteName} - Mining & Beneficiation` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Mining, Beneficiation & Commodity Solutions`,
    description:
      "Integrated mining operations, exploration, beneficiation, commodity trading, and project development.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <div className="pt-[116px] sm:pt-[124px]">{children}</div>
      </body>
    </html>
  );
}
