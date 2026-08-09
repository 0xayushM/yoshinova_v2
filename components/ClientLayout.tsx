"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurtainTransitionProvider } from "./Curtain";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import SmoothScrollProvider from "./SmoothScrollProvider";
import VisitorTracker from "./VisitorTracker";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Re-measure triggers after a route change so animations don't stay stuck
  // in their initial state after client-side navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <LoadingScreen />
      <VisitorTracker />
      {/* Navbar must live INSIDE the provider — it calls useCurtainRouter(),
          and when it was mounted outside, every nav link resolved to the
          context default and silently did nothing. */}
      <SmoothScrollProvider>
        <CurtainTransitionProvider>
          {isHome && <Navbar />}
          {children}
        </CurtainTransitionProvider>
      </SmoothScrollProvider>
    </>
  );
}
