"use client";

import React from 'react';

interface UseCase {
  number: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

interface UseCaseGridProps {
  eyebrow: string;
  title: string;
  description?: string;
  cases: UseCase[];
  bgClass?: string;
  textColor?: 'light' | 'dark';
}

export default function UseCaseGrid({
  eyebrow,
  title,
  description,
  cases,
  bgClass = 'bg-white',
  textColor = 'dark',
}: UseCaseGridProps) {
  const isDark = textColor === 'light';
  const headColor = isDark ? 'text-white' : 'text-black';
  const subColor = isDark ? 'text-white/65' : 'text-black/60';
  const cardBg = isDark
    ? 'bg-white/[0.04] border border-white/10 hover:border-[#6A9F30]/40'
    : 'bg-white border border-black/[0.08] hover:border-[#6A9F30]/40';

  return (
    <section
      className={`w-full ${bgClass} px-6 md:px-14 py-24 md:py-32`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-end md:justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
              {eyebrow}
            </p>
            <h2 className={`${headColor} text-3xl md:text-5xl font-medium uppercase tracking-tight leading-tight`}>
              {title}
            </h2>
          </div>
          {description && (
            <p className={`${subColor} text-base md:text-lg leading-relaxed max-w-md mt-4 md:mt-0`}>
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className={`uc-card ${cardBg} p-6 md:p-8 transition-all duration-300 group cursor-default`}
            >
              <div className="flex items-start justify-between mb-5">
                <p className={`${subColor} text-xs uppercase tracking-[0.3em]`}>
                  {c.number}
                </p>
                <span className="inline-block w-8 h-px bg-[#6A9F30] group-hover:w-14 transition-all duration-300" />
              </div>

              <h3 className={`${headColor} text-xl md:text-2xl font-medium leading-tight mb-3`}>
                {c.title}
              </h3>
              <p className={`${subColor} text-sm md:text-base leading-relaxed`}>
                {c.description}
              </p>

              {c.metric && (
                <div className={`mt-6 pt-5 border-t ${isDark ? 'border-white/10' : 'border-black/10'} flex items-baseline gap-2`}>
                  <p className="text-[clamp(1.25rem,2.6vw,1.625rem)] font-medium text-[#6A9F30] leading-none">
                    {c.metric}
                  </p>
                  <p className={`${subColor} text-[10px] md:text-xs uppercase tracking-widest`}>
                    {c.metricLabel}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
