'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import SplitText from '@/components/SplitText';
import TeamSection from '@/components/TeamSection';
import ServiceFooter from '@/components/service/ServiceFooter';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const resize = () => {
      if (!containerRef.current || !textRef.current) return;
      const container = containerRef.current;
      const text = textRef.current;
      const style = getComputedStyle(container);
      const availableWidth = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);

      let low = 10;
      let high = 280; // Reduced max size from 500 to 300
      while (high - low > 1) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;
        if (text.scrollWidth > availableWidth) {
          high = mid;
        } else {
          low = mid;
        }
      }
      // same width-only fit problem as ServiceHero: cap against height so a
      // short word on a wide-short laptop can't fill the whole screen
      setFontSize(Math.min(low, Math.round(window.innerHeight * 0.3)));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(containerRef.current);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
        <main className="relative min-h-screen bg-black">
          
          {/* Hero Section with Background Image */}
          <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] xl:h-screen overflow-hidden">
            <Image
              src="/images/about.webp"
              alt="About Yoshinova"
              fill
              className="object-cover xl:object-contain"
              priority
            />
            <div className="absolute inset-0 bg-black/30 xl:bg-transparent" />
            <div
              ref={containerRef}
              className="absolute inset-x-0 top-1/4 md:top-1/3 -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8"
            >
              <h1
                ref={textRef}
                className="font-bold uppercase tracking-tighter leading-none whitespace-nowrap w-full pt-12"
                style={{
                  fontSize: `${fontSize}px`,
                  background: 'linear-gradient(to top, transparent 0%, white 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
                ABOUT US
              </h1>
            </div>

            <div className="absolute bottom-8 md:bottom-12 left-4 sm:left-6 md:left-10 lg:left-14 right-4 md:right-auto z-10 max-w-lg">
              <p className="text-white/70 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed border-t border-white/20 pt-4">
                We take a power-first, innovation-driven approach to developing, commercializing, and operating the critical infrastructure that underpins the breakthrough technologies of today and tomorrow.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="relative py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-10 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
                <div>
                  <p className="text-[#6A9F30] text-sm uppercase tracking-widest mb-4 md:mb-6">Our Mission</p>
                  <SplitText
                    text="Powering the Future"
                    tag="h2"
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8"
                    delay={40}
                    duration={0.8}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="left"
                  />
                  <p className="text-white/70 text-base md:text-base lg:text-lg leading-relaxed">
                    At Yoshinova, we believe that energy is the foundation of progress. Our mission is to deliver
                    cutting-edge energy storage solutions that empower businesses, communities, and individuals to
                    achieve energy independence and sustainability.
                  </p>
                </div>
                <div>
                  <p className="text-[#6A9F30] text-sm uppercase tracking-widest mb-4 md:mb-6">Our Vision</p>
                  <SplitText
                    text="Sustainable Energy for All"
                    tag="h2"
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8"
                    delay={40}
                    duration={0.8}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="left"
                  />
                  <p className="text-white/70 text-base md:text-base lg:text-lg leading-relaxed">
                    We envision a world where clean, reliable energy is accessible to everyone. Through innovation
                    and dedication, we're building the infrastructure that will power tomorrow's breakthrough
                    technologies and sustainable solutions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="relative py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-10 lg:px-12 bg-white/5">
            <div className="max-w-7xl mx-auto">
              <p className="text-[#6A9F30] text-sm uppercase tracking-widest mb-4 md:mb-6 text-center">Our Values</p>
              <SplitText
                text="What Drives Us"
                tag="h2"
                className="text-white text-3xl md:text-5xl lg:text-6xl font-normal mb-12 md:mb-16 lg:mb-20 text-center"
                delay={40}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
              />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-[#6A9F30] rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-normal mb-3 md:mb-4">Innovation</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    We constantly push the boundaries of what's possible in energy storage technology.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-[#6A9F30] rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-normal mb-3 md:mb-4">Sustainability</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    Environmental responsibility is at the core of everything we do.
                  </p>
                </div>

                <div className="text-center sm:col-span-2 lg:col-span-1">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-[#6A9F30] rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-normal mb-3 md:mb-4">Reliability</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    We deliver solutions you can depend on, backed by world-class support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <TeamSection />

          {/* CTA Section */}
          <section className="relative py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-10 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <SplitText
                text="Ready to Transform Your Energy Future?"
                tag="h2"
                className="text-white text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8"
                delay={40}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
              />
              <p className="text-white/70 text-base md:text-lg mb-8 md:mb-12">
                Let's discuss how Yoshinova can power your vision for a sustainable tomorrow.
              </p>
              <a
                href="/contact"
                className="btn btn--primary"
              >
                Get in Touch
              </a>
            </div>
          </section>
          <ServiceFooter />
        </main>
    </>
  );
}
