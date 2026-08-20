"use client";

import { track } from "@/lib/analytics";

const ADDRESS =
  "Ojas Mobility LLP, Part-B, Plot No. 103, Udyog Vihar, Delhi-Rohtak Road, Vill-Sankhol, Bahadurgarh 124507, Haryana";
const QUERY = encodeURIComponent(ADDRESS);
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${QUERY}`;

/**
 * A drawn site plate, not a Google embed.
 *
 * The iframe was ~900 KB, set third-party cookies, and looked like every
 * other contact page on the internet. This is a schematic locator in the
 * site's own drawing language — hairlines, a crosshair, tick marks, tabular
 * figures — which suits a manufacturer better than a screenshot of a map.
 *
 * ⚠️ Distances below are approximate and should be confirmed.
 */
const NEARBY = [
  { k: "From Delhi (Tikri Border)", v: "12 km" },
  { k: "From Bahadurgarh Metro", v: "6 km" },
  { k: "From IGI Airport", v: "48 km" },
  { k: "Coordinates", v: "28.6926° N, 76.9426° E" },
];

export default function LocationMap() {
  return (
    <section className="border border-hair bg-sheet">
      <div className="flex flex-wrap items-center justify-between gap-3 rule-b px-5 py-3.5">
        <span className="t-label">Plate 03 — site location</span>
        <span className="t-label !text-brand-deep">Bahadurgarh, Haryana</span>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        {/* ── the drawing ── */}
        <div className="relative border-b border-hair lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 600 380"
            className="block h-full w-full"
            role="img"
            aria-label="Schematic map: Yoshinova is on the Delhi–Rohtak road at Sankhol, Bahadurgarh"
          >
            <defs>
              <pattern id="loc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0v40" fill="none" stroke="rgba(20,22,15,.07)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="600" height="600" fill="url(#loc-grid)" />

            {/* the highway — the one road that matters here */}
            <path d="M-20 250 L620 150" stroke="#E3E3DC" strokeWidth="26" fill="none" />
            <path
              d="M-20 250 L620 150"
              stroke="rgba(20,22,15,.35)"
              strokeWidth="1.5"
              strokeDasharray="14 12"
              fill="none"
            />
            <text x="44" y="286" className="fill-[#7C8175]" fontSize="11" letterSpacing="2">
              NH-9 · DELHI–ROHTAK ROAD
            </text>

            {/* secondary approach */}
            <path d="M300 380 L318 196" stroke="#E3E3DC" strokeWidth="12" fill="none" />
            <text x="308" y="368" className="fill-[#7C8175]" fontSize="10" letterSpacing="1.5">
              UDYOG VIHAR
            </text>

            {/* neighbours, for orientation */}
            <text x="30" y="60" className="fill-[#7C8175]" fontSize="11" letterSpacing="2">DELHI →</text>
            <text x="497" y="60" className="fill-[#7C8175]" fontSize="11" letterSpacing="2">← ROHTAK</text>

            {/* the site */}
            <g transform="translate(318, 196)">
              <circle r="52" fill="rgba(106,159,48,.09)" />
              <circle r="34" fill="none" stroke="rgba(106,159,48,.35)" strokeWidth="1" />
              <circle r="34" fill="none" stroke="#6A9F30" strokeWidth="1.5"
                strokeDasharray="12 8" className="loc-ring" />
              {/* crosshair */}
              <line x1="-52" y1="0" x2="-40" y2="0" stroke="#4A7519" strokeWidth="1.5" />
              <line x1="40" y1="0" x2="52" y2="0" stroke="#4A7519" strokeWidth="1.5" />
              <line x1="0" y1="-52" x2="0" y2="-40" stroke="#4A7519" strokeWidth="1.5" />
              <line x1="0" y1="40" x2="0" y2="52" stroke="#4A7519" strokeWidth="1.5" />
              <circle r="6" fill="#6A9F30" />
              <rect x="-64" y="-92" width="128" height="26" fill="#14160F" />
              <text x="0" y="-74" textAnchor="middle" fill="#F5F5F2" fontSize="11" letterSpacing="2">
                YOSHINOVA
              </text>
              <line x1="0" y1="-66" x2="0" y2="-40" stroke="#14160F" strokeWidth="1" />
            </g>

            {/* scale bar — it's a drawing, so it gets a scale */}
            <g transform="translate(440, 336)">
              <line x1="0" y1="0" x2="110" y2="0" stroke="rgba(20,22,15,.45)" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(20,22,15,.45)" strokeWidth="1" />
              <line x1="55" y1="-3" x2="55" y2="3" stroke="rgba(20,22,15,.45)" strokeWidth="1" />
              <line x1="110" y1="-4" x2="110" y2="4" stroke="rgba(20,22,15,.45)" strokeWidth="1" />
              <text x="110" y="-10" textAnchor="end" className="fill-[#7C8175]" fontSize="10" letterSpacing="1.5">
                2 KM
              </text>
            </g>
          </svg>
        </div>

        {/* ── the facts ── */}
        <div className="flex flex-col p-6 md:p-8">
          <p className="t-label">Manufacturing facility</p>
          <p className="t-body mt-3 max-w-[34ch] text-[14px]">{ADDRESS}</p>

          <dl className="mt-7 border-t border-hair">
            {NEARBY.map((n) => (
              <div key={n.k} className="flex justify-between gap-4 border-b border-hair py-2.5">
                <dt className="text-[13px] text-ink-2">{n.k}</dt>
                <dd className="tnum shrink-0 text-[13px] text-ink">{n.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-7">
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("call_click", { location: "directions" })}
              className="btn btn--primary w-full"
            >
              Get directions
            </a>
            <p className="t-label mt-3 !tracking-[0.1em] normal-case">
              Opens in your maps app · IMS certified
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
