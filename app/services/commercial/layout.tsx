import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Commercial MPS — Flatten HVAC Peaks, Arbitrage ToD",
  description: "Offices, retail and hotels: stop three chillers starting together from setting your demand charge for the month. 100–400 kWh systems, typical 50% peak reduction.",
  alternates: { canonical: "/services/commercial" },
  openGraph: {
    title: "Commercial MPS — Flatten HVAC Peaks, Arbitrage ToD",
    description: "Offices, retail and hotels: stop three chillers starting together from setting your demand charge for the month. 100–400 kWh systems, typical 50% peak reduction.",
    url: "/services/commercial",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
