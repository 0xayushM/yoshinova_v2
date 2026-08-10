import type { Metadata } from "next";

/* Page-level metadata. The page itself is a client component, so this lives
   in a layout — client components cannot export `metadata`. */
export const metadata: Metadata = {
  title: "Solar + MPS — Bridge the Midday-to-Evening Gap",
  description: "Your array generates at noon; your peak starts at seven. Storage sized to your array turns exported units into evening savings. 80%+ self-consumption.",
  alternates: { canonical: "/services/solar" },
  openGraph: {
    title: "Solar + MPS — Bridge the Midday-to-Evening Gap",
    description: "Your array generates at noon; your peak starts at seven. Storage sized to your array turns exported units into evening savings. 80%+ self-consumption.",
    url: "/services/solar",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
