import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * A 404 that still sells. Dead ends are traffic you already paid for, so this
 * offers the three things a lost visitor most plausibly wanted, plus the
 * phone number — the fastest route out of a dead end is a person.
 */
const LINKS = [
  { href: "/services/energy-audit", label: "Energy Audit", note: "What we do first" },
  { href: "/services", label: "MPS Deployment", note: "All six deployment zones" },
  { href: "/about", label: "About Yoshinova", note: "The factory, the certifications, the team" },
  { href: "/contact", label: "Contact", note: "Reply within one working day" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-paper">
      <div className="sheet-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-8 md:px-10 lg:px-14">
        <p className="t-label flex items-center gap-3">
          <span className="h-px w-8 bg-rust" />
          Error 404
        </p>

        <h1 className="mt-6 t-display uppercase">
          <span className="block">This page</span>
          <span className="block text-rust">drew no load.</span>
        </h1>

        <p className="t-lede mt-6 max-w-[46ch]">
          The address you followed doesn&apos;t exist any more, or never did.
          Nothing lost — here&apos;s where most people were heading.
        </p>

        <ul className="mt-12 grid gap-px border-y border-hair bg-hair sm:grid-cols-2">
          {LINKS.map((l) => (
            <li key={l.href} className="bg-paper">
              <Link
                href={l.href}
                className="group flex h-full flex-col justify-between p-6 transition-colors duration-300 hover:bg-sheet"
              >
                <span className="t-h3">{l.label}</span>
                <span className="t-body mt-2 text-[13.5px]">{l.note}</span>
                <span className="mt-5 block h-px w-8 bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          <Link href="/" className="btn btn--primary">
            Back to home
          </Link>
          <a href="tel:+919718204687" className="btn btn--outline">
            Call +91 97182 04687
          </a>
        </div>
      </div>
    </main>
  );
}
