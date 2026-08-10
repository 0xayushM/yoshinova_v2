import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "About Yoshinova — India's MSME Energy Profitability Partner",
  description: "IMS-certified, govt-recognised R&D, LFP chemistry, 50,000 sq.ft facility in Kundli, Haryana. Meet the team that audits your floor before proposing anything.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Yoshinova — India's MSME Energy Profitability Partner",
    description: "IMS-certified, govt-recognised R&D, LFP chemistry, 50,000 sq.ft facility in Kundli, Haryana. Meet the team that audits your floor before proposing anything.",
    url: "/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
