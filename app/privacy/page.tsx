import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Yoshinova collects when you submit a form or browse this site, where it goes, how long it's kept, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * ⚠️ NOT LEGAL ADVICE AND NOT FINAL.
 *
 * This is drafted from what the code actually does — I traced the two form
 * handlers and the visitor tracker rather than pasting a template, so the
 * data-flow section is accurate as of this build. But it has not been
 * reviewed by a lawyer, and India's DPDP Act 2023 has consent and
 * grievance-officer requirements that need someone qualified to sign off.
 *
 * Specifically unresolved:
 *   · a named Grievance Officer is required under the DPDP Act — needs a real
 *     person and contact
 *   · retention periods below are placeholders
 *   · VisitorTracker collects IP and user-agent without prior consent, which
 *     is the part most likely to need changing rather than just documenting
 */

const UPDATED = "August 2026";

const SECTIONS = [
  {
    h: "What we collect",
    body: [
      "**When you submit a form.** Your name, company name and phone number. On the contact page we also ask for your approximate monthly power bill band and any message you write. We do not ask for your email address.",
      "**When you browse.** Our analytics records pages viewed and actions taken, such as opening the audit form or tapping through to WhatsApp. Separately, our own visitor tracker records your IP address, browser user-agent, language and referring page.",
    ],
  },
  {
    h: "Why we collect it",
    body: [
      "To call you back about an energy audit you asked for, and to understand which parts of this site lead people to ask. We do not sell your data, and we do not send marketing to people who have not asked to hear from us.",
    ],
  },
  {
    h: "Where it goes",
    body: [
      "Form submissions are written to a Google Sheet controlled by Yoshinova and forwarded to BrewMyAgent, the dashboard our sales team works from. Analytics data goes to Google Analytics. Visitor tracking data goes to BrewMyAgent.",
      "These are processors acting on our instructions. Google may process data outside India under its own terms.",
    ],
  },
  {
    h: "How long we keep it",
    body: [
      "Enquiry records are kept for as long as we have an active or reasonably foreseeable business relationship, and then deleted. Analytics data is retained per Google Analytics' configured retention period.",
      "_These periods are being finalised and will be stated precisely here._",
    ],
  },
  {
    h: "Your rights",
    body: [
      "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email **projecthead@ojasmobility.com** or call **+91 97182 04687** and we will action it.",
      "If you are unhappy with how we have handled a request, you can escalate to the Data Protection Board of India.",
    ],
  },
  {
    h: "Cookies and similar",
    body: [
      "Google Analytics sets cookies to distinguish visitors across sessions. The embedded map on our contact page is click-to-load, so Google sets nothing there unless you choose to load it. You can block cookies in your browser; the site works without them.",
    ],
  },
  {
    h: "Contact",
    body: [
      "Yoshinova (Ojas Mobility LLP), Part-B, Plot No. 103, Udyog Vihar, Delhi-Rohtak Road, Vill-Sankhol, Bahadurgarh 124507, Haryana, India.",
      "**projecthead@ojasmobility.com** · **+91 97182 04687**",
    ],
  },
];

/** Renders **bold** and _italic_ without pulling in a markdown dependency. */
function render(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return <b key={i} className="font-bold text-ink">{p.slice(2, -2)}</b>;
    if (p.startsWith("_") && p.endsWith("_"))
      return <i key={i} className="text-ink-3">{p.slice(1, -1)}</i>;
    return <span key={i}>{p}</span>;
  });
}

export default function Privacy() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-paper pb-24 pt-32">
      <div className="sheet-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
        <p className="t-label flex items-center gap-3">
          <span className="h-px w-8 bg-brand" />
          Last updated {UPDATED}
        </p>

        <h1 className="mt-6 t-h2 uppercase">Privacy Policy</h1>

        <p className="t-lede mt-6 max-w-[58ch]">
          Plain version: we collect your name, company and phone when you ask
          for an audit, so we can call you back. We measure which pages lead
          people to ask. We don&apos;t sell anything to anyone.
        </p>

        <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="t-h3 rule-t pt-5">{s.h}</h2>
              {s.body.map((b, i) => (
                <p key={i} className="t-body mt-4 max-w-[62ch] text-[14px]">
                  {render(b)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
