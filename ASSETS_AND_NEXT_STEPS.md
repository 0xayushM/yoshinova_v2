# Assets to shoot / model, and where they go

You asked what to add to make this more interactive. This is the shortlist, in
order of how much each one earns relative to what it costs to produce.

---

## 1. Photography — cheapest, highest return

Nothing on this list beats a real photograph of your own work. The site
currently reuses `residential2.webp` three times, including as the hero image
for "Built on Trust," which is a stock-looking building rather than your
factory.

**Shoot at Kundli, half a day, one photographer:**

| Shot | Where it goes | Why |
|---|---|---|
| The 50,000 sq.ft floor, wide, people working | Section 11 "Built on Trust" | You claim it in text and show a stock building. Show the actual place. |
| An MPS cabinet installed on a customer floor | Audit report section, service pages | A photo of a *deployed* unit beats any render. This is the single most persuasive image you don't have. |
| Chief Energy Advisor with a clamp meter / power analyser on a live panel | Audit walkthrough section | The audit is the product. Right now it's described but never shown. |
| Assembly line: cells → module → cabinet | About page | Backs "engineered and assembled in-house". |
| Close-up: LFP cells, BMS board, terminals | Service pages | Technical detail signals a manufacturer, not a reseller. |
| A real audit report, open, on a desk | Audit report section | Makes the deliverable concrete. Blur the client name. |

**Video worth shooting:** a 20–30 second silent loop of the assembly line, to
replace `about.mp4`. Keep it under 2 MB, H.264, and give it a poster frame.

---

## 2. 3D — one focused model, not a scene

The 38 MB GLB failed because it was a whole world rendering behind everything
at all times. The version that works is the opposite: **one object, one job,
loaded only when asked for.**

### The MPS cabinet configurator (recommended)

A single Yoshinova cabinet the visitor can rotate, with three interactions:

- **Open the doors** → see racks, BMS, inverter, cell modules
- **Scale it** → 1 / 2 / 4 cabinets, with the kWh and footprint figures updating
- **Hotspots** → tap a component, get a spec card

Where it goes: the top of each service page, and `/services/energy-audit` as
the "what gets installed" answer. Never on the homepage above the fold.

**Budget — hard limits, these are what the old model broke:**

| | Target |
|---|---|
| File size | ≤ 3 MB, Draco geometry **and** KTX2/Basis textures |
| Triangles | ≤ 150k (old model: 1.98 M) |
| Materials | ≤ 12 (old model: 400) |
| Textures | ≤ 6 at 1024², KTX2 (old model: 82, 31.8 MB uncompressed) |
| Loading | Lazy — poster image + "View in 3D" button, `next/dynamic` with `ssr:false` |
| Mobile | Poster only below 768px unless tapped |

Export from Blender, then run it through `gltf-transform`:

```bash
npx @gltf-transform/cli optimize in.glb out.glb \
  --compress draco --texture-compress ktx2 --texture-size 1024
```

Ask whoever models it for a **single cabinet on a neutral ground plane**, real
world scale in metres, Y-up, materials named for the parts they cover. No
environment, no buildings, no terrain — that's what made the last one 39 MB.

### Cheaper alternative that gets 80% of the effect

An **exploded-view diagram** as layered SVG or a 30-frame PNG sequence, scrubbed
on scroll. Roughly 200 KB, works everywhere, no 3D pipeline, no WebGL. If the
cabinet model is more than a couple of weeks out, do this first.

---

## 3. Interactive additions already scoped

Things the current build sets up but doesn't ship yet:

- **Live ROI counter on service pages.** The data model in `lib/segments.ts`
  already computes everything needed.
- **Segment-aware audit walkthrough.** `LoadCurve` takes a curve as data — if
  you later want the walkthrough to change with facility type, it's one prop.
- **Sample audit report, as a real downloadable PDF.** Gate it behind name +
  WhatsApp. This is the strongest lead magnet available to you, and it costs
  one anonymised report.
- **Before/after bill photograph** — an actual DISCOM bill, two months apart,
  numbers circled. Nothing on this list converts better, and it's free the day
  a client agrees.

---

## Housekeeping in this repo

- `app/fonts/` still holds the original `.otf`/`.ttf` alongside the `.woff2`
  set. Only WOFF2 is referenced; the originals can go.
- `public/` still has `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`,
  `window.svg` from create-next-app. Delete.
- Files marked `REMOVED in v2` are empty modules kept so a stale import can't
  silently resurrect the 3D layer. Safe to delete once you've reviewed.
- `components/BESSComparisonChart.tsx` and `utils/bessData.ts` are now
  re-export shims pointing at the MPS-named files. Delete once nothing
  references them.
- `public/video/` is 8 MB across two files — the largest thing left. Both are
  background loops; re-encode at a lower bitrate or drop `about.mp4`.
