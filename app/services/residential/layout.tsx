import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Residential MPS — Shared Storage for Societies",
  description: "Lifts, pumps and EV charging on one system. Cut common-area electricity 30–40%, keep backup through outages, no genset noise. 50–150 kWh.",
  alternates: { canonical: "/services/residential" },
  openGraph: {
    title: "Residential MPS — Shared Storage for Societies",
    description: "Lifts, pumps and EV charging on one system. Cut common-area electricity 30–40%, keep backup through outages, no genset noise. 50–150 kWh.",
    url: "/services/residential",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
