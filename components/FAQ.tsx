"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faq";
import { Reveal, RevealLine } from "./motion/Reveal";

/**
 * FAQ with FAQPage schema.
 *
 * Native <details> rather than a JS accordion: it works before hydration, is
 * keyboard accessible for free, and Ctrl+F finds text inside collapsed items
 * — which a div-based accordion silently breaks.
 *
 * The schema is emitted from the same array that renders the list, so the
 * markup and the structured data can never disagree.
 */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      className="slide-over relative overflow-hidden bg-paper py-20 md:py-28"
    >
      <div className="sheet-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Reveal dir="none">
              <p className="t-label tick-row">Before you ask</p>
            </Reveal>
            <h2 className="t-h2 uppercase">
              <RevealLine as="span" className="font-light">Straight</RevealLine>
              <RevealLine as="span" delay={100} className="text-brand-deep">answers.</RevealLine>
            </h2>
            <Reveal delay={140}>
              <p className="t-body mt-5 max-w-[38ch]">
                Still unsure? Ask on WhatsApp — you&apos;ll get a person, not a
                form reply.
              </p>
              <a
                href="https://wa.me/919718204687"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline mt-6"
              >
                Ask a question
              </a>
            </Reveal>
          </div>

          <ul className="border-t border-hair">
            {FAQS.map((f, i) => (
              <li key={f.q} className="border-b border-hair">
                <details
                  open={open === i}
                  onToggle={(e) =>
                    setOpen((e.currentTarget as HTMLDetailsElement).open ? i : null)
                  }
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 marker:hidden">
                    <span className="t-h3 text-[1.05rem] leading-snug">{f.q}</span>
                    <span
                      className={`mt-1 shrink-0 text-ink-3 transition-transform duration-300 ${
                        open === i ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="t-body max-w-[62ch] pb-6 text-[14px]">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
