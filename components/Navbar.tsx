"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { services } from "@/utils/services";
import ContactDialog from "./ContactDialog";
import { useCurtainRouter } from "./Curtain";

/**
 * The one navbar.
 *
 * There used to be two — `Navbar` for home and `PageNavbar` for everything
 * else — which is why tone was inconsistent and why "Request Audit" went
 * invisible on some pages: two components, two sets of colour rules, drifting
 * apart. This is a single component with one explicit tone state.
 *
 * Tone is derived, never passed in per page:
 *
 *   menu open   → the mega-menu owns the screen; nav sits on it
 *   scrolled    → paper bar, ink text, hairline underneath
 *   dark hero   → transparent, white text (service pages, contact, about)
 *   light hero  → transparent, ink text (home, services listing, privacy…)
 *
 * The audit button is never a bare outline: it is a filled pill in every
 * state, so it cannot disappear into whatever is behind it.
 */

/** Routes whose first screen is a dark image or a dark background. */
function hasDarkHero(pathname: string) {
  return (
    /^\/services\/[^/]+$/.test(pathname) || // the six service pages
    pathname === "/contact" ||
    pathname === "/about"
  );
}

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { navigate } = useCurtainRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
    setHovered(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const overlayOpen = menuOpen || mobileOpen;
  const hoveringPlate = hovered !== null;

  /* one decision, used everywhere below */
  const light =
    overlayOpen
      ? hoveringPlate // menu open: plate images are dark, the sheet is light
      : scrolled
        ? false
        : hasDarkHero(pathname);

  const ink = light ? "#FFFFFF" : "#14160F";
  const go = (href: string) => {
    setMenuOpen(false);
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[9990] transition-colors duration-500 ${
          scrolled && !overlayOpen
            ? "border-b border-hair bg-paper/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 md:px-10 lg:px-14">
          <button
            onClick={() => (pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : go("/"))}
            className="flex items-center"
            aria-label="Yoshinova home"
          >
            <Image
              src="/logo_white.webp"
              alt="Yoshinova"
              width={140}
              height={44}
              priority
              className="h-9 w-auto object-contain transition-[filter] duration-500 md:h-10"
              // the mark is white artwork; invert it when the bar is light
              style={{ filter: light ? "none" : "invert(1)" }}
            />
          </button>

          {/* desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onMouseEnter={() => l.href === "/services" && setMenuOpen(true)}
                onClick={() => go(l.href)}
                className="text-sm uppercase tracking-tight transition-colors duration-500"
                style={{ color: ink }}
              >
                {l.label}
              </button>
            ))}

            {/* Always filled — an outline button vanished against dark heroes
                and against the mega-menu plates. */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setDialogOpen(true);
              }}
              className="btn btn--primary !py-3"
            >
              Request Audit
            </button>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-[10000] flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="relative block h-4 w-6">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-0 block h-0.5 w-6 transition-all duration-300"
                  style={{
                    backgroundColor: mobileOpen ? "#14160F" : ink,
                    top: mobileOpen ? "7px" : `${i * 7}px`,
                    transform: mobileOpen
                      ? i === 0
                        ? "rotate(45deg)"
                        : i === 2
                          ? "rotate(-45deg)"
                          : "scaleX(0)"
                      : "none",
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </nav>

      {/* ── desktop mega-menu ── */}
      <div
        onMouseLeave={() => {
          setMenuOpen(false);
          setHovered(null);
        }}
        className={`fixed inset-0 z-[9980] hidden transition-opacity duration-500 md:block ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 origin-top bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "scale-y-100" : "scale-y-0"
          }`}
        />
        {services.map((s, i) => (
          <div
            key={s.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: hovered === i ? 1 : 0 }}
          >
            <Image src={s.image} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-ink/45" />
          </div>
        ))}

        <div className="relative flex h-full items-center px-5 sm:px-8 md:px-10 lg:px-14">
          <ul className="space-y-2">
            {services.map((s, i) => (
              <li key={s.slug}>
                <button
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => go(`/services/${s.slug}`)}
                  className="t-display block text-left uppercase transition-colors duration-300"
                  style={{
                    color: hoveringPlate
                      ? hovered === i
                        ? "#FFFFFF"
                        : "rgba(255,255,255,.45)"
                      : "#14160F",
                    fontSize: "clamp(1.8rem, 4.6vw, 3.4rem)",
                  }}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── mobile sheet ── */}
      <div
        className={`fixed inset-0 z-[9985] origin-top bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          mobileOpen ? "scale-y-100" : "pointer-events-none scale-y-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-6 pb-28">
          <ul className="space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <button
                  onClick={() => go(`/services/${s.slug}`)}
                  className="t-h3 block w-full py-2 text-left uppercase !text-ink"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-1 border-t border-hair pt-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className="t-label block w-full py-2 text-left !text-ink-2"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              setMobileOpen(false);
              setDialogOpen(true);
            }}
            className="btn btn--primary mt-8 w-full"
          >
            Request Free Audit
          </button>
        </div>
      </div>

      <ContactDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} type="energy-audit" />
    </>
  );
}
