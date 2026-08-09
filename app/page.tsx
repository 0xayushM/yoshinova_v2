'use client';

import Section1 from "@/components/Section1";
import AboutSection from "@/components/AboutSection";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section3_2 from "@/components/Section3_2";
import AuditWalkthrough from "@/components/AuditWalkthrough";
import AuditReport from "@/components/AuditReport";
import Section10 from "@/components/Section10";
import Section11 from "@/components/Section11";
import Section13 from "@/components/Section13";

/**
 * Homepage — same structure as the live site, minus the 3D layer.
 *
 *  · Sections 4–9 (the six zone deep-dives) are gone. They existed to park
 *    the GLB in frame at six scroll positions and duplicated the zone grid in
 *    Section3_2, which already links to every service page. In their place:
 *    the audit walkthrough and the audit report/estimator.
 *  · <ModelViewer> went with them. Nothing waits on a downloaded asset.
 *  · No wrapper <section> heights. Each component owns its own height —
 *    wrapping an h-screen component inside an h-screen div was forcing a
 *    second viewport of blank space on short screens.
 */
export default function Home() {
  return (
    <main className="relative">
      <Section1 loadingComplete />
      <AboutSection />
      <Section2 />
      <Section3 />
      <Section3_2 />

      {/* ── replaces the six 3D zone sections ── */}
      <AuditWalkthrough />
      <AuditReport />

      <Section10 />
      <Section11 />
      <Section13 />
    </main>
  );
}
