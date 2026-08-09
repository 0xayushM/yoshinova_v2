"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import ContactDialog from './ContactDialog';

const Section2 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
    <section className="w-screen relative overflow-hidden bg-slate-300/90 py-16 md:py-24">
      <div className="w-full flex flex-col">
        {/* Title Section */}
      <div className="w-full mb-10 md:mb-14 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col">
        <p className="text-black/40 text-xs uppercase tracking-widest mb-3 leading-[0.9]">The Problem We Solve</p>
        <h1 className="text-black uppercase text-[clamp(1.75rem,5.5vw,3.75rem)] font-light text-left leading-[1] tracking-tighter">
          The dual bleed
        </h1>
        <h1 className="text-black uppercase text-[clamp(1.75rem,5.5vw,3.75rem)] font-normal text-left leading-[1] tracking-tighter">
          in power costs
        </h1>
      </div>

      {/* Grid Layout - 4 columns */}
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-4">
        {/* Column 1: Image */}
        <div className="hidden xl:block bg-slate-400 relative overflow-hidden min-h-[22rem]">
          <Image
            src="/images/industrial2.webp"
            alt="Industrial facility"
            className="w-full h-full object-cover"
            fill
            sizes="25vw"
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Column 2: Inside Bleed */}
        <div className="bg-slate-200 flex flex-col justify-center p-4 md:p-6 lg:p-8 xl:p-12">
          <div>
            <h2 className="text-black text-[clamp(1.125rem,2.4vw,1.5rem)] font-normal mb-0 md:mb-4 lg:mb-6">
              Inside Bleed
            </h2>
            <p className="text-black text-xs md:text-sm lg:text-base leading-relaxed mb-2 md:mb-4 lg:mb-8">
              Inefficient motors, poor power factors, and hidden energy leaks on your production floor silently drain margins.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <svg className="w-16 h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="50" cy="50" r="30" />
              <path d="M50 20 L50 35 M50 65 L50 80 M20 50 L35 50 M65 50 L80 50" />
              <circle cx="50" cy="50" r="8" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Column 3: Outside Bleed */}
        <div className="bg-slate-100 flex flex-col justify-center p-4 md:p-6 lg:p-8 xl:p-12">
          <div>
            <h2 className="text-black text-[clamp(1.125rem,2.4vw,1.5rem)] font-normal mb-4 md:mb-4 lg:mb-6">
              Outside Bleed
            </h2>
            <p className="text-black text-xs md:text-sm lg:text-base leading-relaxed mb-2 md:mb-4 lg:mb-8">
              Grid outages and peak Time-of-Day tariffs force you to burn cash on diesel generators at ₹25+ per unit.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <svg className="w-16 h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M50 20 L65 40 L55 40 L55 60 L70 60 L50 90 L50 65 L35 65 L50 20 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Column 4: The Solution */}
        <div className="bg-[#6A9F30] flex flex-col justify-center p-4 md:p-6 lg:p-8 xl:p-12 md:col-span-2 xl:col-span-1">
          <div>
            <h2 className="text-white text-[clamp(1.125rem,2.4vw,1.5rem)] font-normal mb-4 md:mb-4 lg:mb-6">
              Our Approach
            </h2>
            <p className="text-white text-xs md:text-sm lg:text-base leading-relaxed mb-2 md:mb-4 lg:mb-8">
              We begin with a deep Energy Audit to uncover every hidden cost on your floor — then deploy a right-sized MPS to eliminate diesel dependency and arbitrage peak tariffs. Authority earned first, solution delivered second.
            </p>
          </div>
          <button
              onClick={() => setIsDialogOpen(true)}
              className="hidden md:inline-block self-start px-5 py-2.5 lg:px-6 lg:py-3 mt-4 border border-white/60 text-white text-xs lg:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
            >
              Get a Free Audit
            </button>
        </div>
      </div>
      </div>
    </section>
    <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
};

export default Section2;