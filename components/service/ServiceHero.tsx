"use client";

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import ContactDialog from '../ContactDialog';

interface ServiceHeroProps {
  title: string;
  heroImage: string;
  heroDescription: string;
  serviceNumber: string;
}

export default function ServiceHero({ title, heroImage, heroDescription, serviceNumber }: ServiceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(100);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const resize = () => {
      if (!containerRef.current || !textRef.current) return;
      const container = containerRef.current;
      const text = textRef.current;
      const style = getComputedStyle(container);
      const availableWidth = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);

      let low = 10;
      let high = 500;
      while (high - low > 1) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;
        if (text.scrollWidth > availableWidth) {
          high = mid;
        } else {
          low = mid;
        }
      }
      setFontSize(low);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [title]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src={heroImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/55" />

      <div
        ref={containerRef}
        className="absolute inset-x-0 top-32 sm:top-40 md:top-48 z-10 px-4 sm:px-6 pb-8 md:pb-16"
      >
        <h1
          ref={textRef}
          className="font-bold uppercase tracking-tighter leading-none whitespace-nowrap w-full pt-8 sm:pt-10 md:pt-12"
          style={{
            fontSize: `${fontSize}px`,
            background: 'linear-gradient(to top, transparent 10%, white 50%, white 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            paddingBottom: 0,
            marginBottom: 0,
          }}
        >
          {title}
        </h1>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-4 sm:left-6 md:left-10 lg:left-14 right-4 md:right-auto z-10 max-w-lg">
        <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed border-t border-white/20 pt-3 md:pt-4">
          {heroDescription}
        </p>

        {/* Every service page used to open with a hero and no action at all.
            The audit is the ask on all of them. */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <button onClick={() => setDialogOpen(true)} className="btn btn--primary">
            Request Free Audit
          </button>
          <a
            href="https://wa.me/919718204687"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--onInk"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <ContactDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type="energy-audit"
      />
    </section>
  );
}
