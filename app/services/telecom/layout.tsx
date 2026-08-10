import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Telecom MPS — Replace Diesel Backup at Tower Sites",
  description: "Six hours of genset a day at ₹26 a unit, gone. Silent, zero-downtime battery backup for tower sites. 10–40 kWh, LFP chemistry, sub-20 ms switchover.",
  alternates: { canonical: "/services/telecom" },
  openGraph: {
    title: "Telecom MPS — Replace Diesel Backup at Tower Sites",
    description: "Six hours of genset a day at ₹26 a unit, gone. Silent, zero-downtime battery backup for tower sites. 10–40 kWh, LFP chemistry, sub-20 ms switchover.",
    url: "/services/telecom",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
