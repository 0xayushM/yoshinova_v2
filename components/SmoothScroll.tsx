"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    // Set up GSAP smooth scroll
    const smoothness = 0.08;
    let current = 0;
    let target = 0;
    let rafId: number;

    const updateBodyHeight = () => {
      document.body.style.height = `${content.scrollHeight}px`;
    };

    const smoothScroll = () => {
      target = window.scrollY;
      current += (target - current) * smoothness;
      content.style.transform = `translateY(${-current}px)`;
      rafId = requestAnimationFrame(smoothScroll);
    };

    // Delay initialization to ensure content is rendered
    const initTimeout = setTimeout(() => {
      updateBodyHeight();
      rafId = requestAnimationFrame(smoothScroll);

      // Update ScrollTrigger after initialization
      ScrollTrigger.refresh();
    }, 100);

    // Update body height on resize
    const resizeObserver = new ResizeObserver(updateBodyHeight);
    resizeObserver.observe(content);

    return () => {
      clearTimeout(initTimeout);
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      document.body.style.height = '';
      content.style.transform = '';
    };
  }, [children]);

  return (
    <div ref={wrapperRef} className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[1]">
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
