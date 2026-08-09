"use client";

import React from 'react';

interface MarketInsightProps {
  eyebrow: string;
  title: string;
  intro: string;
  marketSize: { value: string; label: string; sub: string };
  growth: { value: string; label: string; sub: string };
  keyDriver: { title: string; description: string };
  bullets: string[];
  // Optional theme override
  accent?: string;
}

export default function MarketInsight({
  eyebrow,
  title,
  intro,
  marketSize,
  growth,
  keyDriver,
  bullets,
  accent = '#6A9F30',
}: MarketInsightProps) {
  return (
    <section
      className="w-full bg-[#0a0a0a] text-white px-6 md:px-14 py-24 md:py-32 relative overflow-hidden"
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="mi-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mi-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          {/* Left: heading */}
          <div className="md:col-span-5">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: accent }}
            >
              {eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium uppercase leading-tight tracking-tight">
              {title}
            </h2>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
              {intro}
            </p>
          </div>

          {/* Right: stats + bullets */}
          <div className="md:col-span-7">
            {/* Two big stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">
              <div className="mi-stat border-t border-white/15 pt-5">
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  {marketSize.label}
                </p>
                <p
                  className="text-3xl md:text-5xl font-medium leading-none mb-2"
                  style={{ color: accent }}
                >
                  {marketSize.value}
                </p>
                <p className="text-white/55 text-xs md:text-sm leading-relaxed">
                  {marketSize.sub}
                </p>
              </div>
              <div className="mi-stat border-t border-white/15 pt-5">
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  {growth.label}
                </p>
                <p
                  className="text-3xl md:text-5xl font-medium leading-none mb-2"
                  style={{ color: accent }}
                >
                  {growth.value}
                </p>
                <p className="text-white/55 text-xs md:text-sm leading-relaxed">
                  {growth.sub}
                </p>
              </div>
            </div>

            {/* Key driver block */}
            <div className="mi-stat bg-white/[0.03] border border-white/10 px-6 py-6 md:px-8 md:py-7 mb-8 md:mb-10">
              <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
                Why now
              </p>
              <h3 className="text-xl md:text-2xl font-light mb-2">
                {keyDriver.title}
              </h3>
              <p className="text-white/65 text-sm md:text-base leading-relaxed">
                {keyDriver.description}
              </p>
            </div>

            {/* Bullets */}
            <ul className="space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="mi-bullet flex items-start gap-3 text-white/75 text-sm md:text-base leading-relaxed">
                  <span
                    className="inline-block flex-shrink-0 mt-2 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
