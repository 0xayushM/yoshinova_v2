# Asset brief — placeholders in place, prompts to fill them

Every item below already has a labelled placeholder at
`public/images/placeholder/<slug>.svg`, sized to the exact ratio the layout
expects. Swap the file, keep the slug, nothing in the code changes.

**House style for everything on this list** — it is what makes the set hang
together:

> Warm greyish-white environment (#F5F5F2). Soft, even, slightly cool daylight,
> no hard flash. Muted palette, desaturated — the only saturated thing in frame
> is the Yoshinova green (#6A9F30) on the equipment. Straight-on or gentle
> three-quarter angle, architectural rather than dynamic. Real depth of field,
> nothing plastic. Leave clean negative space in the upper third for type.

If you're shooting rather than generating: 35mm or 50mm, f/4–f/5.6, tripod,
available light, white-balance to daylight. Don't over-light the floor.

---

## 1. `factory-floor` — 3:2 — Section 11, "Built on Trust"

Highest priority. The section claims a 50,000 sq.ft IMS-certified facility and
currently shows a stock apartment block.

> Wide interior of a modern Indian battery-assembly plant, 50,000 sq ft, high
> ceilings with exposed white trusses and daylight panels. Clean epoxy floor
> with painted walkway lines. Two technicians in grey coveralls mid-task at a
> workbench, seen from behind, unposed. Rows of pale equipment cabinets
> receding into soft depth. Desaturated, warm greyish-white, single green
> accent on the machinery. Architectural photography, straight-on, tripod,
> 35mm, f/5.6, natural light. Negative space in the upper third.

## 2. `mps-installed` — 3:2 — audit report + service pages

The single most persuasive image you don't have: a unit doing its job.

> A modular battery energy storage cabinet installed against the wall of a
> working Indian factory, cable trays and conduit entering from above, a small
> illuminated status display showing green. Concrete floor, painted equipment
> plinth, a fire extinguisher and signage nearby — evidence it is commissioned,
> not staged. Slightly worn, real, not a render. Desaturated greyish-white
> daylight, green accent only on the unit. 35mm, f/5.6, eye level.

## 3. `advisor-at-panel` — 3:2 — audit walkthrough

The audit is the product but is never shown.

> An engineer in a grey shirt and safety glasses holding a power-quality
> analyser against an open industrial electrical panel, reading the display.
> Clamp meter leads on the busbars. Focus on hands and instrument, face
> partially out of frame. Clean, safe, methodical — not dramatic. Muted
> greyish-white light, shallow depth of field, 50mm, f/2.8.

## 4. `assembly-line` — 3:2 — About page

> Sequence view along a battery module assembly bench: prismatic LFP cells at
> the near end, stacked modules mid-frame, a finished cabinet at the far end.
> Anti-static mats, torque tools on hooks, parts bins. Two workers in the
> middle distance, soft focus. Greyish-white, desaturated, green accents.
> Slight wide angle down the length of the bench, 35mm, f/5.6.

## 5. `cell-detail` — 1:1 — service pages

> Macro of prismatic LFP battery cells in a module, aluminium cases with laser-
> etched markings, copper busbars bolted across the terminals, a BMS ribbon
> cable entering frame. Cool metal, warm neutral background. Extremely sharp,
> raking light to pick out the machining. 100mm macro, f/8, focus-stacked.

## 6. `audit-report` — 3:2 — audit report section

Makes the deliverable concrete. Cheapest shot on this list.

> A printed energy audit report open on a desk, showing a load-curve chart and
> an itemised savings table. A pair of glasses, a mechanical pencil, and a
> laptop edge just in frame. Warm greyish-white daylight from the left. Shot
> from directly above, slight angle to the page. 50mm, f/4. Client name blurred
> or blanked.

## 7. `mps-cabinet-studio` — 1:1 — hero / product

The one that most needs to be right, and the one you can control fully.

> Studio product shot of a single modular power system cabinet, matte
> off-white steel body with a dark vented front panel and a green status strip.
> Isolated on a seamless warm grey backdrop (#EDEDE8), soft large-source
> lighting from the upper left, soft contact shadow beneath. Straight-on
> elevation, no perspective distortion. Clean, catalogue-grade, no props.

## 8. `og-cover` — 1.91:1 — link previews

Currently a bare grey link on WhatsApp and LinkedIn, which is how this market
actually shares things.

> Composition on warm greyish-white: the Yoshinova wordmark upper left, a
> single clean line-chart of a flattened 24-hour load curve in green across the
> lower two thirds, thin technical grid in the background. No photography.
> Generous margins. Reads at thumbnail size.

Build this as `app/opengraph-image.tsx` rather than a static file so the
metadata already in `app/layout.tsx` picks it up automatically.

---

## Video

`public/video/` is 8 MB across two files and is now the heaviest thing on the
site. Both play as light-treated watermarks (greyscale, 42% opacity), so they
do not need to be beautiful — they need to be short and calm.

> 20–30 second silent loop, locked-off tripod. Slow pans across the assembly
> line, cells moving on a conveyor, a cabinet door closing, a status light
> blinking. No people looking at camera, no fast cuts. Graded flat and light —
> it will be desaturated and screened back to 42% anyway.

Re-encode both at a lower bitrate: `-crf 30 -vf scale=1280:-2`, target under
1.5 MB each. Keep the poster frames.

---

## 3D — one focused model, not a scene

Still the recommendation from the earlier brief, unchanged: a single cabinet
the visitor can rotate, open, and scale 1/2/4 units. Lazy-loaded behind a
poster on the service pages, never on the homepage above the fold.

Hard limits — these are what the old 39 MB model broke:

| | Target | Old model |
|---|---|---|
| File size | ≤ 3 MB | 39.1 MB |
| Triangles | ≤ 150k | 1.98 M |
| Materials | ≤ 12 | 400 |
| Textures | ≤ 6 @ 1024², KTX2 | 82, 31.8 MB uncompressed |

```bash
npx @gltf-transform/cli optimize in.glb out.glb \
  --compress draco --texture-compress ktx2 --texture-size 1024
```

Brief for the modeller: one cabinet on a neutral ground plane, real-world
scale in metres, Y-up, materials named for the parts they cover. No
environment, no buildings, no terrain — that is exactly what made the last one
39 MB.

---

## Hero mosaic — four more clips

The hero is a scroll-driven mosaic (`components/HeroMosaic.tsx`): one
full-bleed tile that shrinks as five more slide in to form a grid of the six
deployment zones. Tiles 0 and 4 use the two videos you already have. The other
four are stills today and read fine, but the effect lands properly when all six
move.

Each is a **6–10 second silent loop, locked-off or very slow push, no cuts**.
They play at roughly a third of the screen, so composition matters more than
detail. Same house style as above: desaturated, greyish-white, one green accent.

| Tile | File to add | Prompt |
|---|---|---|
| Industrial | `/video/zone_industrial.mp4` | Slow push down a working factory aisle — motor-driven machinery, conduit overhead, an MPS cabinet with a green status light in the mid-ground. Locked-off tripod, no people looking at camera. |
| Commercial | `/video/zone_commercial.mp4` | Static wide of a commercial building's rooftop plant — chiller units running, ducting, city haze behind. Very slow drift. Cool neutral grade. |
| Residential | `/video/zone_residential.mp4` | A society basement plant room: lift machinery, pump sets, and a wall-mounted MPS unit with its display lit. Slow lateral dolly. |
| Telecom | `/video/zone_telecom.mp4` | A telecom tower base station at dusk — equipment cabinet open, green status LEDs, silent (the point being the genset is *off*). Locked-off, long lens. |

Swapping one in is a single line in `MEDIA` inside `HeroMosaic.tsx`:

```ts
{ kind: "image", src: "/images/industrial.webp", label: "Industrial" }
// becomes
{ kind: "video", src: "/video/zone_industrial.mp4", poster: "/images/industrial.webp", label: "Industrial" }
```

Keep every clip under 1.5 MB (`-crf 30 -vf scale=960:-2`). Six autoplaying
videos is the one place this page could get heavy, so the tiles preload
`metadata` only — the hero is the sole `preload="auto"`.
