"use client";

import React, { useState } from 'react';
import ContactDialog from './ContactDialog';

const Section13 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-screen flex flex-col">
      {/* Top area: left form + right transparent */}
      <div className="flex flex-1 min-h-0">
        {/* Left side — dark background with form */}
        <div className="w-full xl:w-[55%] bg-[#0a0a0a] flex flex-col justify-between px-6 md:px-10 lg:px-16 xl:px-16 py-8 md:py-12 pt-20">
          {/* Company info row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white text-xs tracking-[0.15em] uppercase md:pt-12">
            <div className="space-y-1">
              <p className="font-bold text-white/90">Yoshinova</p>
              <p className="text-white/50 normal-case tracking-normal text-[11px] leading-relaxed">
                Your Energy Profitability Partner
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-white/40 mb-1">General Enquiries</p>
                <a href="mailto:projecthead@ojasmobility.com" className="text-white/80 normal-case tracking-normal underline underline-offset-2 hover:text-white transition-colors">
                  projecthead@ojasmobility.com
                </a>
              </div>
              <div>
                <p className="text-white/40 mb-1">New Projects</p>
                <a href="mailto:projecthead@ojasmobility.com" className="text-white/80 normal-case tracking-normal underline underline-offset-2 hover:text-white transition-colors">
                  projecthead@ojasmobility.com
                </a>
              </div>
              <div>
                <p className="text-white/40 mb-1">Phone</p>
                <a href="tel:+919718204687" className="text-white/80 normal-case tracking-normal underline underline-offset-2 hover:text-white transition-colors block">
                  +91 97182 04687
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-white/40 mb-1">Address</p>
                <p className="text-white/80 normal-case tracking-normal text-[11px] leading-relaxed">
                  Ojas Mobility LLP, Part-B, Plot No. 103, Udyog Vihar, Delhi-Rohtak Road, Vill-Sankhol, Bahadurgarh -124507, Haryana
                </p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Follow</p>
                <a href="https://www.linkedin.com/company/yoshinova/" target="_blank" rel="noopener noreferrer" className="text-white/80 normal-case tracking-normal underline underline-offset-2 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Energy Audit CTA */}
          <div className="space-y-4 md:space-y-6 mt-8 p-5 md:p-6 lg:p-8 bg-white/5 border border-white/20 backdrop-blur-sm">
            <h3 className="text-white text-[clamp(1.125rem,2.4vw,1.5rem)] helvetica font-light tracking-wide mb-2">
              Start With a Free Energy Audit
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">We find your hidden savings first. Then we talk MPS.</p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="btn-slide btn-slide--light inline-block px-5 py-2.5 md:px-6 md:py-3 border border-white/60 text-white text-xs md:text-sm uppercase tracking-widest"
            >
              Request Energy Audit
            </button>
          </div>

          {/* Bottom tagline */}
          <p className="text-white text-sm md:text-base lg:text-lg tracking-wide leading-relaxed max-w-2xl mt-8 font-light">
            Energy Audit &rarr; Right-sized MPS &rarr; Permanent cost reduction.
          </p>
        </div>

        {/* Right side — transparent to show 3D model */}
        {/* Was transparent onto the 3D scene; now solid so the footer reads
            as one dark block instead of fading into white. */}
        <div className="hidden xl:block xl:w-[45%] bg-[#0a0a0a]" />
      </div>

      {/* Bottom — giant YOSHINOVA text */}
      {/* `height: 35%` resolved against a parent that is no longer full-height,
          which collapsed this to nothing. It sizes to its own content now.
          `hidden lg:block` also fought the `flex` on the same element. */}
      <div className="hidden lg:flex w-full bg-[#0a0a0a] items-end overflow-hidden relative pt-14">
        <h1
          className="font-bold leading-[2] w-full text-center select-none"
          style={{
            fontSize: 'clamp(2.75rem, 12vw, 9rem)',
            letterSpacing: '-0.02em',
            marginBottom: '-0.05em',
            background: 'linear-gradient(to bottom, #ffffff, #453f3fff, #000000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          YOSHINOVA
        </h1>
        
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute top-8 right-1/2 translate-x-1/2 px-6 py-3 border border-white/60 bg-white/5 backdrop-blur-sm text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
          aria-label="Scroll to top"
        >
          <span>Back to Top</span>
          <svg 
            className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      <ContactDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        type="energy-audit"
      />
    </section>
  );
};

export default Section13;
