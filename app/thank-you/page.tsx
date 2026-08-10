import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you — your audit request is in",
  description: "We've received your request. Here's what happens next.",
  // A conversion landing page has no business in search results.
  robots: { index: false, follow: false },
};

const NEXT = [
  {
    n: "01",
    t: "We call you back",
    d: "Within one working day, on the number you gave us. Usually the same day if you asked before 4pm.",
  },
  {
    n: "02",
    t: "A 15-minute qualifying call",
    d: "Your tariff category, your DISCOM, roughly what you pay and how often the genset runs. Enough to know whether an audit is worth anyone's time.",
  },
  {
    n: "03",
    t: "The audit is scheduled",
    d: "Our Chief Energy Advisor walks your floor. We pull 30 days of interval data and leave with everything we need.",
  },
  {
    n: "04",
    t: "You get the report",
    d: "Every finding priced per month, with the instrument reading behind it — yours whether or not you buy anything from us.",
  },
];

/**
 * A real route rather than an inline "thanks!" — a conversion needs a URL to
 * fire against, and this is where GA and Ads goals point.
 */
export default function ThankYou() {
  return (
    <main className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-paper">
      <div className="sheet-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-8 md:px-10 lg:px-14">
        <p className="t-label flex items-center gap-3">
          <span className="h-px w-8 bg-brand" />
          Request received
        </p>

        <h1 className="mt-6 t-display uppercase">
          <span className="block">Thank you.</span>
          <span className="block text-brand-deep">We&apos;ll call you.</span>
        </h1>

        <p className="t-lede mt-6 max-w-[48ch]">
          One of our team will be in touch <b className="text-ink">within one
          working day</b>. If it&apos;s urgent, WhatsApp is faster than waiting
          for us.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <a
            href="https://wa.me/919718204687"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Message us on WhatsApp
          </a>
          <a href="tel:+919718204687" className="btn btn--outline">
            Call +91 97182 04687
          </a>
        </div>

        <ol className="mt-14 grid gap-px border-y border-hair bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {NEXT.map((s) => (
            <li key={s.n} className="flex flex-col bg-paper p-6">
              <span className="t-label !text-brand-deep">{s.n}</span>
              <span className="t-h3 mt-3 block text-[1.05rem] leading-snug">{s.t}</span>
              <span className="t-body mt-2.5 block text-[13.5px]">{s.d}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link href="/" className="btn btn--outline">
            Back to home
          </Link>
          <Link
            href="/services/energy-audit"
            className="t-label !text-ink underline underline-offset-4 hover:!text-brand-deep"
          >
            Read what an audit involves →
          </Link>
        </div>
      </div>
    </main>
  );
}
