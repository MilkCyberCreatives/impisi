import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import NextTopLoader from "nextjs-toploader";
import JsonLd from "@/components/seo/JsonLd";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/structured-data";
import {
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Mining, Beneficiation & Commodity Solutions`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  category: "business",
  keywords: [
    "Impisi Resources",
    "mining operations",
    "beneficiation",
    "commodity trading",
    "exploration",
    "project development",
    "South Africa",
  ],
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Mining, Beneficiation & Commodity Solutions`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Mining & Beneficiation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Mining, Beneficiation & Commodity Solutions`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "ZA",
    "geo.placename": "South Africa",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        {/* Premium loading indicator (makes navigation feel instant) */}
        <NextTopLoader
          showSpinner={false}
          height={2}
          easing="ease"
          speed={220}
        />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />

        <SiteHeader />

        {/* Space for fixed header */}
        <div className="pt-[116px] sm:pt-[124px]">{children}</div>
      </body>
    </html>
  );
}
