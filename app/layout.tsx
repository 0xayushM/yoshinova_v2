import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const SITE = "https://www.yoshinova.com";

/* The live site ships one title ("Yoshinova") and one description
   ("Excellence, Happiness, Dharma") for every page, which gives Google
   nothing to rank and a searcher no reason to click. Service pages should
   each export their own `metadata`; this is the default and the template. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Yoshinova — Energy Audits & Modular Power Systems for Indian Industry",
    template: "%s | Yoshinova",
  },
  description:
    "Free floor-level energy audit, then a right-sized Modular Power System (MPS). Cut peak demand charges, replace diesel at ₹25–28/unit, and size storage on your real load curve. Kundli, Haryana.",
  /* MPS is the brand term now, but buyers who've been quoted by competitors
     still search "BESS" and "battery energy storage". Keeping both here
     costs nothing and protects the search traffic through the rename. */
  keywords: [
    "energy audit India",
    "modular power system",
    "MPS",
    "battery energy storage system",
    "BESS India",
    "peak demand charge reduction",
    "ToD tariff",
    "diesel generator replacement",
    "MSME energy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Yoshinova",
    locale: "en_IN",
    title: "We don't estimate your bill. We measure it.",
    description:
      "A free energy audit finds every leak on your floor — then we size a Modular Power System against your real load curve.",
  },
  twitter: {
    card: "summary_large_image",
    title: "We don't estimate your bill. We measure it.",
    description:
      "Free energy audit, then a right-sized Modular Power System, sized on your real load curve.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo_white.ico", apple: "/logo_white.webp" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yoshinova",
  url: SITE,
  logo: `${SITE}/logo_white.webp`,
  description:
    "Energy audits and Modular Power Systems (MPS) for Indian industrial, commercial and residential facilities.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Ojas Mobility LLP, Part-B, Plot No. 103, Udyog Vihar, Delhi-Rohtak Road, Vill-Sankhol",
    addressLocality: "Bahadurgarh",
    postalCode: "124507",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  telephone: "+91-97182-04687",
  sameAs: ["https://www.linkedin.com/company/yoshinova/"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
