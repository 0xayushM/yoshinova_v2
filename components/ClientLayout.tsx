"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurtainTransitionProvider } from "./Curtain";
import Analytics from "./Analytics";
import LoadingScreen from "./LoadingScreen";
import StickyCTA from "./StickyCTA";
import Navbar from "./Navbar";
import SmoothScrollProvider from "./SmoothScrollProvider";
import VisitorTracker from "./VisitorTracker";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Re-measure triggers after a route change so animations don't stay stuck
  // in their initial state after client-side navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <Analytics />
      <LoadingScreen />
      <VisitorTracker />
      {/* The navbar is rendered here, once, for every route — it used to be
          dropped into each page individually, so anything added later
          (privacy, thank-you, 404) silently shipped without one.
          It must stay INSIDE the provider: it calls useCurtainRouter(), and
          mounted outside, every nav link resolved to the context default and
          did nothing. */}
      <SmoothScrollProvider>
        <CurtainTransitionProvider>
          <Navbar />
          {children}
        </CurtainTransitionProvider>
      </SmoothScrollProvider>
      <StickyCTA />
    </>
  );
}
