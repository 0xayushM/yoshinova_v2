'use client';

import { CurtainLink } from './Curtain';
import SplitText from './SplitText';

export default function AboutSection() {
  return (
    <section className="w-screen relative bg-black flex items-center justify-center overflow-hidden py-20 md:py-28">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/about.mp4" type="video/mp4" />
        </video>
        {/* Scrim: the raw video met the hero with a hard seam and left the
            copy sitting on near-black with no separation. */}
        <div className="about-scrim absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/85" />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.3"/>
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <SplitText
          text="We take a power-first, innovation-driven approach to developing, commercializing, and operating the critical infrastructure that underpins the breakthrough technologies of today and tomorrow."
          tag="h2"
          className="text-white text-[clamp(1.25rem,3.2vw,2.25rem)] font-light leading-[1.15] mb-10 md:mb-14"
          delay={30}
          duration={0.8}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="0px"
          textAlign="left"
        />

        {/* Learn More Section */}
        <div className="space-y-4">
          <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest">
            Learn More
          </p>
          
          <CurtainLink 
            href="/about" 
            className="group inline-flex items-center gap-4 pb-2 border-b-2 border-[#6A9F30] hover:border-[#5a8f20] transition-colors duration-300"
          >
            <span className="text-white text-base md:text-lg font-normal">
              Our Platform
            </span>
            <svg 
              className="w-5 h-5 text-[#6A9F30] group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </CurtainLink>
        </div>
      </div>
    </section>
  );
}
