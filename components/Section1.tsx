"use client";

import React, { useRef, useEffect, useState } from 'react';
import SplitText from './SplitText';
import ContactDialog from './ContactDialog';
import { CurtainLink } from './Curtain';

interface Section1Props {
  loadingComplete?: boolean;
}

const Section1 = ({ loadingComplete = false }: Section1Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = (e: Event) => {
      if (rafId !== null) return; // Skip if already scheduled
      
      rafId = requestAnimationFrame(() => {
        const offset = (e as CustomEvent).detail?.offset ?? 0;
        if (!sectionRef.current || !bgRef.current) {
          rafId = null;
          return;
        }

        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // For Section1: use how far the section has scrolled out of view
        const progress = Math.max(0, Math.min(1, -rect.top / vh));
        // Background moves slower: only shift down by 30% of scroll
        const parallaxY = progress * vh * 0.3;
        bgRef.current.style.transform = `translateY(${parallaxY}px)`;
        rafId = null;
      });
    };

    window.addEventListener('drei-scroll', handleScroll);
    return () => {
      window.removeEventListener('drei-scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-screen min-h-[100svh] relative overflow-hidden">
      {/* Background Video (parallax layer) */}
      <div ref={bgRef} className="absolute will-change-transform" style={{ top: '-15%', left: 0, right: 0, height: '130%' }}>
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/yoshinova_hero_poster.jpg"
      >
        <source src="/video/yoshinova_hero.mp4" type="video/mp4" />
      </video>
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content layer */}
      <div className="relative z-10 w-full min-h-[100svh] flex flex-col justify-center py-24 md:py-28">

        {/* YOSHINOVA label — sits above the border line */}
        <p className="text-white text-sm md:text-base lg:text-xl font-bold uppercase tracking-widest mb-3 px-4 sm:px-6 md:px-8 lg:pl-12">
          YOSHINOVA
        </p>

        {/* Main row: headline left, description right */}
        <div className="flex justify-between flex-col xl:flex-row border-t border-white/20">

          {/* Left: Main headline */}
          <div className="flex-2 xl:flex-3 pt-4 flex flex-col justify-start w-full px-4 sm:px-6 md:px-8 lg:pl-12 leading-none">

            {loadingComplete ? (
              <SplitText
                text="Your Energy"
                tag="h1"
                className="text-white text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.1] tracking-tighter uppercase"
                delay={70}
                duration={1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            ) : (
              <h1 className="text-white text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.1] tracking-tight uppercase opacity-0">
                Your Energy
              </h1>
            )}
            {loadingComplete ? (
              <SplitText
                text="Profitability Partner"
                tag="h1"
                className="text-white text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.1] tracking-tighter uppercase -mt-2"
                delay={70}
                duration={1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            ) : (
              <h1 className="text-transparent text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.1] tracking-tighter uppercase opacity-0 -mt-2">
                Profitability Partner
              </h1>
            )}
            <p className="text-white/60 text-xs sm:text-sm md:text-base font-light tracking-wide mt-4 uppercase">
              Energy Audit &nbsp;·&nbsp; MPS Deployment &nbsp;·&nbsp; India
            </p>
          </div>

          {/* Right: description */}
          <div className="flex-1 flex-shrink-0 group">
            <p className="text-white text-[clamp(0.875rem,1.8vw,1.0625rem)] font-light tracking-tight text-left mr-auto my-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-8 xl:border-l xl:border-white/50">
              Advanced modular power systems designed for industrial, commercial, and residential applications. Eliminate diesel dependency, optimize power costs, and create revenue-generating assets through intelligent energy management.
            </p>
          </div>
        </div>

        {/* Hero CTAs — the live site's first screen had no action at all.
            Primary is the audit (the actual ask), then contact, then the
            brochure for the researcher who isn't ready to talk yet. */}
        <div className="mt-6 flex flex-col gap-2.5 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:px-6 md:px-8 lg:pl-12">
          <button
            onClick={() => setDialogOpen(true)}
            className="btn-slide btn-slide--solid inline-flex items-center justify-center bg-[#6A9F30] px-5 py-3 md:px-7 md:py-3.5 text-white text-xs md:text-sm uppercase tracking-widest cursor-pointer"
          >
            Request Free Audit
          </button>

          <CurtainLink
            href="/contact"
            className="btn-slide btn-slide--light inline-flex items-center justify-center border border-white/60 px-5 py-3 md:px-7 md:py-3.5 text-white text-xs md:text-sm uppercase tracking-widest"
          >
            Contact Us
          </CurtainLink>

          <a
            href="/brochure/yoshinova-mps-brochure.pdf"
            download
            className="group inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3 md:px-7 md:py-3.5 text-white/85 text-xs md:text-sm uppercase tracking-widest transition-colors duration-300 hover:border-white/70 hover:text-white"
          >
            Download Brochure
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
          </a>
        </div>
      </div>

      <ContactDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type="energy-audit"
      />
    </section>
  );
};

export default Section1;