import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Energy Audit — Find Every Leak on Your Floor, Free",
  description: "30 days of interval data from your own meter, plotted against your DISCOM's ToD windows. Every finding priced per month, with the instrument reading behind it. The report is yours either way.",
  alternates: { canonical: "/services/energy-audit" },
  openGraph: {
    title: "Energy Audit — Find Every Leak on Your Floor, Free",
    description: "30 days of interval data from your own meter, plotted against your DISCOM's ToD windows. Every finding priced per month, with the instrument reading behind it. The report is yours either way.",
    url: "/services/energy-audit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
