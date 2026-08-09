"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ContactDialog from './ContactDialog';

const Section10 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
    <section className="w-screen relative flex items-center justify-center overflow-hidden py-24 md:py-32">
      {/* This section used to sit transparent over the 3D scene. With the
          model gone it needs its own backdrop — a real photograph of the
          thing we're talking about beats a render of it. */}
      <Image
        src="/images/industrial2.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-4 sm:mx-6 md:mx-8 px-6 sm:px-8 md:px-12 lg:px-16 py-10 md:py-12 lg:py-16 max-w-4xl text-center bg-black/40 backdrop-blur-sm border border-white/10">
        <p className="text-white/50 text-xs uppercase tracking-widest mb-4 md:mb-6">Why Yoshinova</p>
        <div className="mb-4 md:mb-6">
          <h2 className="text-white text-[clamp(1.75rem,5.5vw,3.75rem)] font-medium uppercase tracking-tight leading-[1]">
            We audit first.
          </h2>
          <h2 className="text-[#8BC34A] text-[clamp(1.75rem,5.5vw,3.75rem)] font-medium uppercase tracking-tight leading-[1]">
            Then we deploy.
          </h2>
        </div>
        <p className="text-white/80 text-[clamp(0.875rem,1.8vw,1.0625rem)] font-light max-w-2xl mx-auto leading-[1.3] tracking-tight mb-6 md:mb-8">
          Every MPS we deploy is sized on real data from your facility not industry averages or guesswork. That&apos;s how we guarantee ROI, not just promise it.
        </p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="btn-slide btn-slide--ghost inline-block px-5 py-2.5 md:px-6 md:py-3 border border-white/60 text-white text-xs md:text-sm uppercase tracking-widest"
        >
          Start With a Free Audit
        </button>
      </div>
    </section>
    <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
};

export default Section10;
