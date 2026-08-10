import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Services — Energy Audit & Modular Power Systems",
  description: "Two services, in order: a free floor-level energy audit, then a right-sized Modular Power System. Industrial, commercial, residential, telecom, household and solar.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Energy Audit & Modular Power Systems",
    description: "Two services, in order: a free floor-level energy audit, then a right-sized Modular Power System. Industrial, commercial, residential, telecom, household and solar.",
    url: "/services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
