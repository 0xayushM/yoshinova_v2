"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import ContactDialog from './ContactDialog';
import { CurtainLink } from './Curtain';

const Section3 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
    <section className="w-screen relative overflow-hidden bg-black py-20 md:py-28">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/video/about_poster.jpg"
      >
        <source src="/video/about.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col xl:flex-row items-center justify-center xl:justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-12 gap-10 xl:gap-14">
        {/* Left side - image (only show side-by-side at xl) */}
        <div className="hidden xl:flex flex-1 max-w-3xl items-center justify-center">
          <Image
            src="/images/energy-audit.webp"
            alt="Energy Audit"
            className="w-full h-auto max-h-[26rem] object-cover"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
            width={600}
            height={450}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            quality={80}
          />
        </div>

        {/* Right side - content */}
        <div className="max-w-xl w-full xl:w-auto">
          <div className="mb-2">
            <h1 className="text-white text-[clamp(1.75rem,5.5vw,3.75rem)] font-medium tracking-tight uppercase">
              Energy Audit
            </h1>
          </div>

          <div className="space-y-4 md:space-y-6 max-w-md">
            <h2 className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] text-[#6A9F30] font-normal border-t-2 border-[#6A9F30] pt-1">
              Optimize Your Operations
            </h2>
            <p className="text-white/80 text-sm md:text-sm lg:text-base leading-relaxed">
              Our Chief Energy Advisor conducts a comprehensive floor audit to uncover hidden savings — identifying inefficient motors, poor power factors, and energy leaks. We deliver actionable insights that immediately cut your operating costs and establish a data-driven foundation for smarter energy decisions.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-4">
              <CurtainLink
                href="/services/energy-audit"
                className="btn-slide btn-slide--light inline-block px-5 py-2.5 md:px-6 md:py-3 border border-white/60 text-white text-xs md:text-sm uppercase tracking-widest"
              >
                Learn More
              </CurtainLink>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="btn-slide btn-slide--solid inline-block px-5 py-2.5 md:px-6 md:py-3 bg-[#6A9F30] text-white text-xs md:text-sm uppercase tracking-widest cursor-pointer"
              >
                Request Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
};

export default Section3;
