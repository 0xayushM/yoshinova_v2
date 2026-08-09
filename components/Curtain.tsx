"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

const PANELS = 5;
const REDUCED = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------
   Curtain intro
   ------------------------------------------------------------------
   The old LoadingScreen ran a fake progress bar to 90%, then waited on
   the real 38 MB model load before letting anyone see the hero. With
   the model gone there is nothing to wait for, so this is a fixed
   ~1.1s brand moment that never blocks content: the page is fully
   rendered underneath the whole time.
   ------------------------------------------------------------------ */

export function CurtainIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only play once per session — a curtain on every visit becomes a toll.
    if (sessionStorage.getItem("yn-intro")) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("yn-intro", "1");

    if (REDUCED()) {
      setDone(true);
      return;
    }

    const panels = rootRef.current?.querySelectorAll(".curtain-panel");
    if (!panels) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    tl.to(sweepRef.current, {
      xPercent: 200,
      duration: 0.75,
      ease: "power2.inOut",
    })
      .to(markRef.current, { opacity: 0, duration: 0.25 }, "-=0.2")
      .to(
        panels,
        {
          scaleY: 0,
          duration: 0.65,
          ease: "power3.inOut",
          stagger: { each: 0.06, from: "start" },
        },
        "-=0.1",
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <>
      <div
        ref={rootRef}
        className="curtain-root"
        style={{ ["--curtain-panels" as string]: PANELS }}
        aria-hidden
      >
        {Array.from({ length: PANELS }).map((_, i) => (
          <div key={i} className="curtain-panel" />
        ))}
      </div>
      <div ref={markRef} className="curtain-mark" aria-hidden>
        <div className="relative overflow-hidden px-6">
          <Image
            src="/logo_white.webp"
            alt=""
            width={220}
            height={120}
            priority
            className="h-20 w-auto object-contain md:h-28"
          />
          <div ref={sweepRef} className="curtain-sweep" />
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------
   Curtain route transitions
   ------------------------------------------------------------------
   Replaces the framer-motion opacity fade. Panels sweep down to cover,
   the route changes behind them, then they lift. Navigation is routed
   through useCurtainRouter so the cover animation finishes before the
   push — otherwise you see the new page appear mid-wipe.
   ------------------------------------------------------------------ */

interface CurtainNav {
  navigate: (href: string) => void;
}

/**
 * The fallback does a real navigation rather than nothing.
 *
 * A no-op default is how the nav links silently died: <Navbar> was mounted
 * outside the provider, so every click resolved to `() => {}` and the site
 * looked broken with no error anywhere. If the provider is ever missing
 * again, links still work — they just skip the curtain.
 */
const CurtainCtx = createContext<CurtainNav>({
  navigate: (href) => {
    if (typeof window !== "undefined") window.location.href = href;
  },
});

export function useCurtainRouter() {
  return useContext(CurtainCtx);
}

export function CurtainTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const [covering, setCovering] = useState(false);
  const pendingRef = useRef<string | null>(null);

  /* cover → route change → uncover */
  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;

      if (REDUCED()) {
        router.push(href);
        return;
      }

      const panels = rootRef.current?.querySelectorAll(".curtain-panel");
      if (!panels) {
        router.push(href);
        return;
      }

      pendingRef.current = href;
      setCovering(true);

      gsap.fromTo(
        panels,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 0.5,
          ease: "power3.inOut",
          stagger: { each: 0.05, from: "start" },
          onComplete: () => {
            router.push(href);
          },
        },
      );
    },
    [pathname, router],
  );

  /* when the new route has painted, lift the panels */
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = null;

    const panels = rootRef.current?.querySelectorAll(".curtain-panel");
    if (!panels) {
      setCovering(false);
      return;
    }

    window.scrollTo(0, 0);
    const tl = gsap.to(panels, {
      scaleY: 0,
      duration: 0.55,
      ease: "power3.inOut",
      stagger: { each: 0.05, from: "end" },
      delay: 0.05,
      onComplete: () => setCovering(false),
    });
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <CurtainCtx.Provider value={{ navigate }}>
      <div
        ref={rootRef}
        className="curtain-root"
        style={{
          ["--curtain-panels" as string]: PANELS,
          visibility: covering ? "visible" : "hidden",
        }}
        aria-hidden
      >
        {Array.from({ length: PANELS }).map((_, i) => (
          <div
            key={i}
            className="curtain-panel"
            style={{ transform: "scaleY(0)" }}
          />
        ))}
      </div>
      {children}
    </CurtainCtx.Provider>
  );
}

/**
 * Drop-in replacement for next/link that runs the curtain first.
 * Still renders a real <a href>, so middle-click, cmd-click and
 * crawlers all behave normally.
 */
export function CurtainLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const { navigate } = useCurtainRouter();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
