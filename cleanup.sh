#!/usr/bin/env bash
#
# Removes dead code and unreferenced assets from yoshinova_v2.
#
# Everything listed here was verified unreferenced by scanning every .ts/.tsx/
# .json/.css file in app/, components/, lib/, utils/ and data/ — not guessed
# from filenames. Run from the project root:
#
#   bash cleanup.sh
#
# Then: rm -rf .next && npm run build
#
set -euo pipefail
cd "$(dirname "$0")"

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }
gone=0
kill_it() { for f in "$@"; do [ -e "$f" ] && rm -rf "$f" && gone=$((gone+1)) && echo "  - $f"; done; return 0; }

say "1. Stub modules (emptied when the 3D layer and the v1 scaffolding went)"
kill_it \
  components/Chrome.tsx components/Sections.tsx components/Estimator.tsx \
  components/TwentyFourHourStory.tsx components/SegmentProvider.tsx \
  components/PageNavbar.tsx components/PageTransition.tsx \
  components/HomeScrollSnap.tsx components/motion/DirectionalButtons.tsx \
  components/ModelViewer.tsx components/SceneRig.tsx components/GltfModel.tsx \
  components/ScrollBroadcaster.tsx \
  components/Section4.tsx components/Section5.tsx components/Section6.tsx \
  components/Section7.tsx components/Section8.tsx components/Section9.tsx \
  utils/modelLoader.ts utils/rigHelpers.tsx

say "2. Components nothing imports any more"
# ZoneSection/ZoneCard were the old homepage zone sections, replaced by ZoneRail.
# The Service* blocks below are not used by any of the six service pages —
# those render ServiceHero / ServiceCTA / ServiceFooter / *Flow / MarketInsight
# / UseCaseGrid / HowItWorks / LiveMetricGraph instead.
kill_it \
  components/ZoneSection.tsx components/ZoneCard.tsx \
  components/CaseStudies.tsx components/SmoothScroll.tsx \
  components/ServiceWorkerRegistration.tsx \
  components/PeakShavingChart.tsx components/BESSComparisonChart.tsx \
  components/service/ServiceIntro.tsx components/service/ServiceFeatures.tsx \
  components/service/ServiceStats.tsx components/service/ServiceInstallation.tsx \
  components/product/FloorMountedESSTable.tsx \
  components/product/WallMountedESSTable.tsx \
  components/product/LeadAcidReplacementTable.tsx \
  data/products \
  utils/bessData.ts

say "3. app/fonts — fully superseded"
# globals.css declares @font-face against /fonts/*.woff2, which resolves to
# public/fonts/. layout.tsx no longer uses next/font/local, so this entire
# directory (originals AND the woff2 copies) is dead weight.
kill_it app/fonts

say "4. create-next-app leftovers"
kill_it public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg

say "5. Unreferenced images + macOS cruft"
kill_it \
  public/images/hero_video.webp \
  public/logo.webp public/logo_name.webp \
  public/team/shourya.webp
find . -name '.DS_Store' -not -path './node_modules/*' -delete 2>/dev/null || true
echo "  - .DS_Store files"

say "Kept deliberately"
cat <<'EOF'
  public/images/placeholder/*.svg   referenced by ASSET_PROMPTS.md, not by code.
                                    Delete once the real photography lands.
  public/brochure/*.pdf             placeholder — replace with the real file.
  components/MPSComparisonChart.tsx used by utils/mpsData.ts.
EOF

say "Done — $gone paths removed"
echo "Next:  rm -rf .next && npm run build"
