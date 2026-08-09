"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactDialog from './ContactDialog';
import { CurtainLink } from './Curtain';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  {
    no: '01',
    title: 'Chief Energy Advisor',
    description: 'Every audit personally led. No juniors, no guesswork.',
    metric: '1:1',
    metricLabel: 'Senior-led audits',
  },
  {
    no: '02',
    title: 'Data-Driven Deployment',
    description: 'MPS sized on your real load curve. ROI guaranteed, not estimated.',
    metric: '100%',
    metricLabel: 'Real-data sizing',
  },
  {
    no: '03',
    title: 'MSME-First Approach',
    description: "Built for India's industrial backbone — accessible, practical, proven.",
    metric: '50K+',
    metricLabel: 'sq.ft factory',
  },
];

const Section11 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Animate the headline letters from below
      const lines = titleRef.current?.querySelectorAll('.line-anim');
      if (lines) {
        gsap.from(lines, {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stagger pillars in
      gsap.from('.trust-pillar', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Subtle parallax / float on hero image
      gsap.fromTo('.trust-hero-image',
        { y: 30, scale: 1.05 },
        {
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full relative overflow-hidden bg-white"
      >
        {/* TOP HALF — headline + image */}
        <div className="grid grid-cols-1 xl:grid-cols-12">
          {/* Left content */}
          <div className="xl:col-span-6 px-6 sm:px-10 md:px-14 lg:px-20 pt-24 md:pt-28 pb-10 md:pb-20 flex flex-col justify-between bg-white relative">
            {/* Decorative grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
              <div className="absolute inset-y-0 left-1/3 w-px bg-black" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-black" />
            </div>

            {/* Eyebrow / badge */}
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#6A9F30] animate-pulse" />
              <span className="text-black/60 text-[10px] md:text-xs uppercase tracking-[0.25em]">
                Who We Are
              </span>
            </div>

            {/* Headline */}
            <div ref={titleRef} className="relative z-10">
              <div className="overflow-hidden">
                <h1 className="line-anim text-black text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.9] font-medium uppercase tracking-tight">
                  Built On
                </h1>
              </div>
              <div className="overflow-hidden mt-2">
                <h1 className="line-anim text-black text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.9] font-medium uppercase tracking-tight">
                  Trust<span className="text-[#6A9F30]">.</span>
                </h1>
              </div>
            </div>

            {/* Tablet/mobile inline image (hidden at xl when right column shows) */}
            <div className="xl:hidden relative w-full aspect-[16/8] md:aspect-[16/6] lg:aspect-[16/5] mt-8 mb-2 overflow-hidden bg-slate-100">
              <Image
                src="/images/residential2.webp"
                alt="Yoshinova expertise"
                fill
                sizes="100vw"
                className="trust-hero-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2">
                <p className="text-[10px] uppercase tracking-widest text-black/60">
                  Manufacturing
                </p>
                <p className="text-xs font-semibold text-black">Kundli, Haryana</p>
              </div>
            </div>

            {/* Lead copy + CTA */}
            <div className="mt-8 md:mt-12 max-w-xl">
              <p className="text-black/60 text-[10px] md:text-xs uppercase tracking-[0.25em] mb-3">
                What we do
              </p>
              <h2 className="text-black text-xl sm:text-[clamp(1.25rem,2.8vw,1.875rem)] font-normal leading-snug mb-6">
                India's MSME Energy Profitability Partner — turning power bills into{' '}
                <span className="text-[#6A9F30] font-medium">profit margins</span>.
              </h2>

              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="btn-slide btn-slide--solid group inline-flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 bg-[#6A9F30] text-white text-xs md:text-sm font-semibold uppercase tracking-widest cursor-pointer"
                >
                  Talk to our advisor
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <CurtainLink
                  href="/about"
                  className="btn-slide btn-slide--dark inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 border border-black/20 text-black text-xs md:text-sm uppercase tracking-widest"
                >
                  About Yoshinova
                </CurtainLink>
              </div>

              {/* Trust badges row — visible on all sizes, fills mobile vertical space */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-black/10">
                <div>
                  <p className="text-[clamp(1.25rem,2.6vw,1.625rem)] font-medium text-black">IMS</p>
                  <p className="text-[10px] md:text-xs text-black/50 uppercase tracking-wider mt-1">Certified</p>
                </div>
                <div>
                  <p className="text-[clamp(1.25rem,2.6vw,1.625rem)] font-medium text-black">R&D</p>
                  <p className="text-[10px] md:text-xs text-black/50 uppercase tracking-wider mt-1">Govt. Recognised</p>
                </div>
                <div>
                  <p className="text-[clamp(1.25rem,2.6vw,1.625rem)] font-medium text-black">LFP</p>
                  <p className="text-[10px] md:text-xs text-black/50 uppercase tracking-wider mt-1">Chemistry</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right image — only at xl (desktop) */}
          <div className="hidden xl:block xl:col-span-6 relative overflow-hidden bg-slate-200">
            <Image
              src="/images/residential2.webp"
              alt="Yoshinova expertise"
              fill
              sizes="42vw"
              className="trust-hero-image object-cover"
              priority={false}
            />
            {/* gradient overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Floating data card */}
            <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-5 py-4 max-w-[220px]">
              <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">
                Live Site Status
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-[#6A9F30] animate-pulse" />
                <p className="text-sm font-semibold text-black">Operational</p>
              </div>
              <p className="text-xs text-black/60 leading-snug">
                50,000 sq.ft IMS-certified facility — Kundli, Haryana
              </p>
            </div>

            {/* Bottom annotation */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1">
                Manufacturing
              </p>
              <p className="text-lg font-semibold leading-tight">
                Lithium-ion MPS engineered<br />and assembled in-house
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM — three pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 border-t border-black/10">
          {PILLARS.map((p, i) => {
            const bg = i === 0 ? 'bg-[#f1f5f9]' : i === 1 ? 'bg-[#6A9F30]' : 'bg-[#0f172a]';
            const numColor = i === 0 ? 'text-black/40' : i === 1 ? 'text-white/70' : 'text-white/40';
            const titleColor = i === 0 ? 'text-black' : 'text-white';
            const descColor = i === 0 ? 'text-black/60' : i === 1 ? 'text-white/85' : 'text-white/60';
            const metricBoxBorder =
              i === 0 ? 'border-black/15' : i === 1 ? 'border-white/30' : 'border-white/15';

            return (
              <div
                key={p.no}
                className={`trust-pillar relative ${bg} px-6 sm:px-8 md:px-10 py-10 md:py-14 ${
                  i < 2 ? 'md:border-r border-black/5' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <p className={`${numColor} text-xs uppercase tracking-[0.3em]`}>{p.no}</p>
                  <div className={`hidden md:flex flex-col items-end border-l ${metricBoxBorder} pl-4`}>
                    <p className={`${titleColor} text-2xl font-medium leading-none`}>{p.metric}</p>
                    <p className={`${descColor} text-[10px] uppercase tracking-widest mt-1`}>
                      {p.metricLabel}
                    </p>
                  </div>
                </div>

                <h3 className={`${titleColor} text-[clamp(1.25rem,2.8vw,1.875rem)] font-light leading-tight mb-3`}>
                  {p.title}
                </h3>

                <p className={`${descColor} text-sm md:text-base leading-relaxed`}>
                  {p.description}
                </p>

                {/* Mobile metric */}
                <div className={`md:hidden flex items-baseline gap-3 mt-5 pt-4 border-t ${metricBoxBorder}`}>
                  <p className={`${titleColor} text-3xl font-medium leading-none`}>{p.metric}</p>
                  <p className={`${descColor} text-[10px] uppercase tracking-widest`}>
                    {p.metricLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
};

export default Section11;
