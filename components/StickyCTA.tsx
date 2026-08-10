"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import ContactDialog from "./ContactDialog";

const PHONE = "+919718204687";
const WHATSAPP = "https://wa.me/919718204687";
const BROCHURE = "/brochure/yoshinova-mps-brochure.pdf";

/**
 * Persistent contact affordances.
 *
 * Mobile (<md): a fixed bottom bar — WhatsApp, Call, Brochure. Always
 * present rather than appearing after the hero, because on a phone the
 * moment someone wants to call is unpredictable, and a bar that comes and
 * goes is a bar you can't rely on. `body` carries matching bottom padding so
 * it never covers the footer.
 *
 * Desktop (≥md): a floating stack bottom-right. Icon-only at rest, with the
 * label sliding out on hover — two circles are enough of a footprint on a
 * page that already has CTAs in every section.
 *
 * Both are outside the curtain so they survive route transitions.
 */

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.23-8.25 8.23z" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

export default function StickyCTA() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* ══ mobile: one capsule, four segments ══
          This used to be three separate pills with gaps between them, which
          read as three unrelated objects fighting over the same corner. One
          capsule reads as one control offering four ways in.

          The wide segment is the audit request, not WhatsApp. WhatsApp was
          carrying a two-line label only to fill the leftover width, which
          spent the most valuable real estate on the bar describing a channel
          rather than asking for the conversion. The three contact channels
          are self-evident from their glyphs, so they shrink to icons and the
          freed width goes to the actual ask.

          `overflow-hidden` on the rounded container is what lets the green
          segment run flush into the capsule's left end without carrying its
          own radius. The dividers are the container's own background showing
          through 1px gaps — borders on the children would double up against
          the outer edge. */}
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-3 bottom-3 z-[80] flex overflow-hidden rounded-full bg-hair shadow-[0_12px_34px_-10px_rgba(20,22,15,.5)] md:hidden"
        style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={() => {
            track("audit_request", { location: "mobile_bar" });
            setDialogOpen(true);
          }}
          className="flex min-h-[3.4rem] min-w-0 flex-1 items-center justify-center bg-brand px-3 text-white transition-[filter] duration-200 active:brightness-95"
        >
          {/* 20 uppercase characters at 0.18em tracking is a wide label for
              the ~190px this segment gets on a 360px phone, so the size is
              fluid rather than fixed — it eases down to 9px on the narrowest
              handsets instead of wrapping to two lines. */}
          <span
            className="t-label whitespace-nowrap !text-white"
            style={{ fontSize: "clamp(9px, 2.6vw, 10.5px)" }}
          >
            Request Energy Audit
          </span>
        </button>

        <span className="w-px shrink-0" aria-hidden />

        {/* the glyph stays brand-green on paper so it still reads as
            WhatsApp without a word next to it */}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "mobile_bar" })}
          aria-label="Message Yoshinova on WhatsApp"
          className="flex w-[3.1rem] shrink-0 items-center justify-center bg-paper text-brand-deep transition-colors duration-200 active:bg-paper-2"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>

        <span className="w-px shrink-0" aria-hidden />

        <a
          href={`tel:${PHONE}`}
          onClick={() => track("call_click", { location: "mobile_bar" })}
          aria-label="Call Yoshinova"
          className="flex w-[3.1rem] shrink-0 items-center justify-center bg-paper text-ink transition-colors duration-200 active:bg-paper-2"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>

        <span className="w-px shrink-0" aria-hidden />

        <a
          href={BROCHURE}
          download
          onClick={() => track("brochure_download", { location: "mobile_bar" })}
          aria-label="Download the MPS brochure"
          className="flex w-[3.1rem] shrink-0 items-center justify-center bg-paper pr-1 text-ink transition-colors duration-200 active:bg-paper-2"
        >
          <DownloadIcon className="h-5 w-5" />
        </a>
      </nav>

      {/* ══ desktop: floating stack, bottom-right ══ */}
      <div className="fixed bottom-6 right-6 z-[80] hidden flex-col items-end gap-3 md:flex">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "float" })}
          className="group flex items-center gap-0 overflow-hidden rounded-full bg-brand text-white shadow-[0_6px_24px_-8px_rgba(20,22,15,.5)] transition-[gap,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-2 hover:pr-5"
          aria-label="Message Yoshinova on WhatsApp"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
          <span className="t-label max-w-0 overflow-hidden whitespace-nowrap !text-white transition-[max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[9rem]">
            WhatsApp us
          </span>
        </a>

        <a
          href={`tel:${PHONE}`}
          onClick={() => track("call_click", { location: "float" })}
          className="group flex items-center gap-0 overflow-hidden rounded-full border border-hair bg-paper text-ink shadow-[0_6px_24px_-10px_rgba(20,22,15,.4)] transition-[gap,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-2 hover:pr-5"
          aria-label="Call Yoshinova"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className="t-label max-w-0 overflow-hidden whitespace-nowrap !text-ink transition-[max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[11rem]">
            +91 97182 04687
          </span>
        </a>
      </div>

      <ContactDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type="energy-audit"
      />
    </>
  );
}
