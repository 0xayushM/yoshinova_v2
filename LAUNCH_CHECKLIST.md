# Launch checklist — audit + plan

Audited against the 20-point checklist by grepping the v2 codebase, not by
assumption. Status is what's actually in the repo today.

## Where we stand

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Custom 404 | **Missing** | No `app/not-found.tsx` — visitors get the Next.js default |
| 2 | CTA above the fold | **Partial** | Homepage has three. Service pages and `/contact` have none in the first screen |
| 3 | Internal links | **Good** | Every route reachable in ≤2 clicks. The fabricated `/case-studies` did not get ported to v2 |
| 4 | Thank-you page | **Missing** | Forms show an inline message; no route to fire a conversion on |
| 5 | Breadcrumbs | **Missing** | Six service pages sit two levels deep with no trail |
| 6 | Case studies | **Blocked** | Needs a real client. Do not invent — the old site's six fake ones were a liability |
| 7 | FAQs | **Missing** | Nothing anywhere on the site |
| 8 | Response-time promise | **Partial** | "within 24hrs" on `/contact` only. Absent from the audit dialog and the estimator, which is where most submits will happen |
| 9 | Sticky mobile CTA | **Missing** | Existed in an earlier pass, lost when the original site was ported in |
| 10 | robots.txt | **Done** | `app/robots.ts`, points at the sitemap |
| 10b | sitemap.xml | **Partial** | **Lists only the homepage.** Nine other routes are absent |
| 11 | Unique page titles | **Missing** | Only the root layout exports metadata. Template is in place, no page uses it |
| 12 | Meta descriptions | **Missing** | Same — one description for all ten routes |
| 13 | Social share image | **Missing** | OG tags exist but reference no image. WhatsApp and LinkedIn render a grey box |
| 14 | Map + directions | **Missing** | Address is text-only on `/contact` and in the footer |
| 15 | Real reviews | **Blocked** | Needs named customers |
| 16 | Alt text | **Done** | 29 images, 0 missing an `alt`; the 2 empty ones are decorative and `aria-hidden` |
| 17 | Local schema | **Partial** | `Organization` JSON-LD present. Not `LocalBusiness`; no hours, no geo |
| 18 | Privacy policy | **Missing** | Two forms collect name + phone. This is the compliance gap |
| 19 | Analytics | **Missing** | No GA, no GTM. `VisitorTracker` posts to your own endpoint, which is not conversion measurement |
| 20 | Team photos | **Done** | Four real photos in `public/team`, rendered on `/about` |

**7 done or good · 5 partial · 6 missing · 2 blocked**

---

## Plan

Ordered by leverage, not by list order.

### Round 1 — SEO foundations (half a day, no client input)

These are the cheapest wins on the list and every one of them is currently
costing traffic on every page.

1. **Per-page `metadata`** on all ten routes — title + description written for
   a human deciding whether to click. The template is already in
   `app/layout.tsx`; each page just needs its own export. *(#11, #12)*
2. **Fix the sitemap** — it lists one URL out of ten. Generate from the route
   list so it can't drift again. *(#10b)*
3. **OG image** at `app/opengraph-image.tsx`, generated rather than static so
   it can't go stale. Prompt is already written in `ASSET_PROMPTS.md`. *(#13)*
4. **Custom 404** — on the paper theme, with links to Services, the audit CTA,
   and the phone number. *(#1)*

### Round 2 — conversion plumbing (half a day)

5. **Thank-you page** at `/thank-you`, `noindex`, with what-happens-next and
   the response-time promise. Redirect both forms there instead of showing an
   inline message. This is the prerequisite for measuring anything. *(#4)*
6. **Analytics** via `@next/third-parties/google`, with conversion events on:
   audit dialog submit, contact form submit, WhatsApp click, brochure
   download, estimator interaction. *(#19)*
7. **Sticky mobile CTA** — `[Call] [WhatsApp] [Free audit]`, appearing after
   the hero. Rebuild the one lost in the port. *(#9)*
8. **Response-time promise everywhere** — one line beside every submit button,
   not just `/contact`. *(#8)*
9. **CTA above the fold on service pages** — each of the six opens with the
   hero and no action. Add the audit CTA to `ServiceHero`. *(#2)*

### Round 3 — trust and local (one day)

10. **FAQ section** with `FAQPage` schema — this is where the objections your
    sales team actually hears should live: *what does the audit cost, how long
    does it take, what if I don't buy, what's the payback, do you handle DISCOM
    approvals*. I'd want your input on the real answers. *(#7)*
11. **Breadcrumbs** on the six service pages with `BreadcrumbList` schema. *(#5)*
12. **Upgrade schema to `LocalBusiness`** — add geo coordinates, opening hours,
    `areaServed`. Bahadurgarh is a real address and this is what puts you in
    map results. *(#17)*
13. **Map + directions** on `/contact` — a lazy-loaded embed plus a "Get
    directions" deep link. *(#14)*
14. **Privacy policy** — I'll draft the structure and the data-handling
    specifics (name, phone, facility type; Google Sheets + BrewMyAgent; IP and
    UA via `VisitorTracker`). **A lawyer should review it before publishing** —
    I won't present generated legal text as final. *(#18)*

### Blocked on you

| Item | What I need |
|---|---|
| Case studies *(#6)* | One client willing to be named, with before/after bill figures |
| Real reviews *(#15)* | Two or three attributed quotes — name, company, ideally a photo |
| Analytics *(#19)* | The GA4 measurement ID |
| Local schema *(#17)* | Opening hours, and confirmation the Bahadurgarh address is the public one |
| FAQs *(#7)* | The real answers — especially audit duration and DISCOM approval handling |

Until a real case study exists, the Proof section stays as the honest empty
state it is now. Six invented case studies is what the old site did, and one
prospect asking "which client was that?" costs more than the page earns.

---

## Not on the list, but found while auditing

- **`VisitorTracker` collects IP and user-agent** and forwards them to a third
  party. That needs to be disclosed in the privacy policy, and is worth a
  second look on consent grounds.
- **`/services/industrial` says ToD applies to C&I from Apr 2025.** It's Apr
  **2024** — 2025 is the date for everyone else. Still unfixed.
- **The estimator's figures** in `lib/segments.ts` and `lib/zones.ts` are
  conservative placeholders and still need engineering sign-off.
