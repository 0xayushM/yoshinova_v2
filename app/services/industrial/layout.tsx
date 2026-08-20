import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Industrial MPS — Cut Factory Demand Charges up to 40%",
  description: "Machine Protection Systems for Indian factories. Shave machinery peaks, replace diesel at ₹25–28/unit, unlock demand-response revenue. Sized on your measured load curve, 250 kWh–2 MWh.",
  alternates: { canonical: "/services/industrial" },
  openGraph: {
    title: "Industrial MPS — Cut Factory Demand Charges up to 40%",
    description: "Machine Protection Systems for Indian factories. Shave machinery peaks, replace diesel at ₹25–28/unit, unlock demand-response revenue. Sized on your measured load curve, 250 kWh–2 MWh.",
    url: "/services/industrial",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
