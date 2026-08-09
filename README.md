# Yoshinova v2

The live site, ported intact, with the 3D layer removed and the six zone
sections replaced by the energy audit. Next.js 16 (Turbopack) + Tailwind v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## What stayed the same

Theme, colours (`#6A9F30`), fonts (Armstrong + Helvetica Neue), all six
service pages, the contact page, the about page, the API routes, and most of
the homepage. If it wasn't about the 3D model, it wasn't touched.

## What changed

**Homepage sections 4–9 are gone.** Household, Residential, Telecom,
Industrial, Commercial and Solar each had a full-screen section whose only
structural job was to park the GLB in frame at a given scroll position — and
they duplicated the zone grid in `Section3_2`, which already covers all six
segments and links to each service page.

In their place, two sections about the thing you're actually asking people to
buy:

- **`AuditWalkthrough`** — a 24-hour load curve you can scrub, in three steps:
  your day today → what the audit finds (findings pin onto the curve with the
  instrument that produced each one) → what a right-sized MPS does to it.
- **`AuditReport`** — what you physically receive, plus a savings estimator
  that doubles as the lead capture.

**The 3D stack is gone.** `three`, `@react-three/fiber`, `@react-three/drei`,
`ogl` and `leva` are out of `package.json`, along with `animejs`,
`framer-motion`, `motion`, `locomotive-scroll` and `gsap-trial` — which were
either unused or duplicated something already installed. The 39 MB
`yoshinova-compressed.glb` is not in this repo.

**The loading screen is gone.** It ran a fake progress bar to 90%, then waited
on the real model download before revealing the hero. `CurtainIntro` replaces
it: a fixed ~1.1 s panel reveal that plays once per session, with the page
fully rendered underneath the whole time. Nothing is gated on an asset.

**Curtain page transitions.** `CurtainTransitionProvider` sweeps five panels
down to cover, changes route behind them, then lifts. Navigation goes through
`useCurtainRouter()` so the cover finishes before the push. `CurtainLink`
renders a real `<a href>`, so cmd-click and crawlers still work.

**BESS → MPS** across all copy, data files and components (297 occurrences).
"BESS" and "battery energy storage" stay in the metadata keywords — buyers
who've been quoted by competitors still search the old term.

## Bugs fixed on the way through

These were all live on the current site:

- **The logo click did nothing.** `goHome()` looked for `document.querySelector('.scroll')`, an element that doesn't exist anywhere in the codebase.
- **Zone cards forced a full page reload.** `Section3_2` used `window.location.href` with a comment claiming the router wasn't available "in Three.js context" — that component is ordinary DOM.
- **`ScrollBroadcaster` was never mounted,** so the `drei-scroll` event it dispatched never fired, so the navbar's hide logic and the hero parallax were both dead code.
- **Sections 10 and 13 were transparent onto the 3D scene** and would have rendered over white. Section 10 now has a real photographic backdrop; Section 13's panels are solid.
- **No visible focus states anywhere** — Tailwind's defaults were overridden with nothing. Restored.
- **One `metadata` export for the whole site** ("Yoshinova" / "Excellence, Happiness, Dharma"). Now a proper default plus a title template, OG tags, `sitemap.ts`, `robots.ts` and `Organization` JSON-LD.

## Verified

`npm run build` passes. 14 routes, all returning 200. Homepage 13.7 KB
gzipped. All JS 329 KB gzipped. Zero `.glb` files. Audit-section contrast:
green 8.45:1, amber 8.26:1, red 4.71:1 — all pass WCAG AA.

## Before production

1. **Replace the estimator's numbers.** `ECONOMICS` in `lib/segments.ts` is
   conservative placeholders from published ranges. Needs engineering sign-off.
2. **Wire the audit CTAs to the real endpoint.** `ContactDialog` already posts
   to `/api/submit-contact`; add the bill band and diesel share to the payload
   — they qualify deal size for free.
3. **Per-page `metadata`** on each service page. The template is in place.
4. **`/services/industrial` says ToD applies to C&I from Apr 2025.** It's Apr
   **2024**; 2025 is the date for everyone else.
5. **Add an OG image** at `app/opengraph-image.tsx`.

See `ASSETS_AND_NEXT_STEPS.md` for the photography and 3D shortlist.
