import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Contact — Book an Energy Audit",
  description: "Talk to our Chief Energy Advisor. Floor-level energy audit across India, typical reply within 24 hours. Bahadurgarh, Haryana.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Book an Energy Audit",
    description: "Talk to our Chief Energy Advisor. Floor-level energy audit across India, typical reply within 24 hours. Bahadurgarh, Haryana.",
    url: "/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
