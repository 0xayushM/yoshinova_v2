"use client";

import React from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  eyebrow: string;
  title: string;
  steps: Step[];
}

export default function HowItWorks({ eyebrow, title, steps }: HowItWorksProps) {
  return (
    <section
      className="w-full bg-[#e8e6e1] px-6 md:px-14 py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
            {eyebrow}
          </p>
          <h2 className="text-black text-3xl md:text-5xl font-medium uppercase tracking-tight leading-tight">
            {title}
          </h2>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="hiw-line hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/15 -translate-x-1/2"
            aria-hidden
          />

          {steps.map((step, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={step.number}
                className={`hiw-step relative grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-10 md:mb-20 last:mb-0`}
              >
                {/* Number badge in middle on desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full bg-[#6A9F30] text-white items-center justify-center font-medium text-sm shadow-lg">
                  {step.number}
                </div>

                {/* Mobile horizontal layout */}
                <div className="md:hidden flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6A9F30] text-white flex items-center justify-center font-medium text-sm">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-medium text-black leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Desktop content */}
                <div className={`hidden md:block ${flipped ? 'md:order-2 md:pl-16' : 'md:pr-16 md:text-right'}`}>
                  <h3 className="text-[clamp(1.25rem,2.6vw,1.625rem)] font-medium text-black leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-black/65 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className={`hidden md:block ${flipped ? 'md:order-1' : ''}`} />

                {/* Mobile description below */}
                <div className="md:hidden pl-16">
                  <p className="text-black/65 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
