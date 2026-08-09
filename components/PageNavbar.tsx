"use client";

import Image from 'next/image';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { services } from '@/utils/services';
import { useCurtainRouter } from './Curtain';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import ContactDialog from './ContactDialog';

interface PageNavbarProps {
  isDark?: boolean; // true = black text/logo (for light backgrounds), false = white (for dark backgrounds)
}

const PageNavbar = ({ isDark = false }: PageNavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const { navigate } = useCurtainRouter();
  const pathname = usePathname();
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
    setNavVisible(true);
  }, [pathname]);

  // Animate mobile menu items with split text
  useEffect(() => {
    if (mobileMenuOpen && menuItemsRef.current.length > 0) {
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          const split = new SplitType(item, { types: 'chars' });
          gsap.fromTo(
            split.chars,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              delay: 0.3 + index * 0.1,
              ease: 'power2.out',
            }
          );
        }
      });
    }
  }, [mobileMenuOpen]);

  const handleMouseEnterTop = useCallback(() => {
    setNavVisible(true);
  }, []);

  const goHome = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const hasHover = hoveredService !== null;
  const logoSize = 50;

  return (
    <>
      {/* Hover zone at top of screen to reveal navbar — pointer-events only when nav is hidden */}
      <div
        onMouseEnter={handleMouseEnterTop}
        className="fixed top-0 left-0 w-full h-16 z-[9991]"
        style={{ pointerEvents: navVisible ? 'none' : 'auto' }}
      />

      <nav
        className="fixed top-0 left-0 w-full z-[9990] pointer-events-none transition-transform duration-500 ease-in-out"
        style={{ transform: (navVisible || menuOpen) ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <div className="relative flex items-center justify-between w-full p-4 md:px-6 lg:px-10 xl:px-14 pt-4">
          <button onClick={goHome} className="p-4 flex items-center cursor-pointer pointer-events-auto">
            <Image
              src="/logo_white.webp"
              alt="Yoshinova logo"
              width={160}
              height={100}
              className="object-contain transition-[filter] duration-300"
              style={{
                height: `${logoSize}px`,
                width: 'auto',
                filter: (mobileMenuOpen || menuOpen ? (hasHover ? 'none' : 'invert(1)') : (isDark ? 'invert(1)' : 'none')),
              }}
              priority
            />
          </button>

          {/* Brand name — absolutely centered, clickable to go home. Hidden at md/lg to avoid overlap with nav links on iPad widths. */}
          <button
            onClick={goHome}
            className="hidden xl:block absolute left-1/2 -translate-x-1/2 text-2xl font-bold uppercase tracking-tight transition-colors duration-300 cursor-pointer pointer-events-auto"
            style={{ color: (mobileMenuOpen || menuOpen ? (hasHover ? 'white' : 'black') : (isDark ? 'black' : 'white')) }}
          >
            Yoshinova
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 pointer-events-auto">
            {/* Services button: hover opens menu, click goes to /services */}
            <button
              onMouseEnter={() => setMenuOpen(true)}
              onClick={() => { setMenuOpen(false); navigate('/services'); }}
              className="text-sm lg:text-base font-light uppercase tracking-tight transition-colors duration-300 cursor-pointer"
            >
              <div className="flex font-light items-center justify-between" style={{ color: (menuOpen ? (hasHover ? 'white' : 'black') : (isDark ? 'black' : 'white')) }}>
                <span>Services</span>
              </div>
            </button>

            {/* About button */}
            <button
              onClick={() => { setMenuOpen(false); navigate('/about'); }}
              className="text-sm lg:text-base font-light uppercase tracking-tight transition-colors duration-300 cursor-pointer"
              style={{ color: (menuOpen ? (hasHover ? 'white' : 'black') : (isDark ? 'black' : 'white')) }}
            >
              About
            </button>

            {/* Contact button */}
            <button
              onClick={() => { setMenuOpen(false); navigate('/contact'); }}
              className="text-sm lg:text-base font-light uppercase tracking-tight transition-colors duration-300 cursor-pointer"
              style={{ color: (menuOpen ? (hasHover ? 'white' : 'black') : (isDark ? 'black' : 'white')) }}
            >
              Contact
            </button>

            {/* Energy Audit CTA — inherits isDark so it's black on light pages, white on dark. */}
            <button
              onClick={() => { setMenuOpen(false); setMobileMenuOpen(false); setIsDialogOpen(true); }}
              className={`inline-block px-4 py-2 lg:px-6 lg:py-3 border text-xs lg:text-sm uppercase tracking-widest hover:bg-[#6A9F30] hover:text-white hover:border-[#6A9F30] transition-colors duration-300 ${
                (menuOpen && !hasHover) || isDark
                  ? 'border-black/60 text-black'
                  : 'border-white/60 text-white'
              }`}
            >
              Request Audit
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden pointer-events-auto flex flex-col gap-1.5 w-10 h-10 justify-center items-center z-[10000] relative"
            aria-label="Toggle menu"
          >
            <span
              className="w-6 h-0.5 transition-all duration-300 ease-in-out absolute"
              style={{
                backgroundColor: (mobileMenuOpen ? 'black' : (isDark ? 'black' : 'white')),
                transform: mobileMenuOpen ? 'rotate(45deg)' : 'translateY(-4px)',
              }}
            />
            <span
              className="w-6 h-0.5 transition-all duration-300 ease-in-out absolute"
              style={{
                backgroundColor: (mobileMenuOpen ? 'black' : (isDark ? 'black' : 'white')),
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="w-6 h-0.5 transition-all duration-300 ease-in-out absolute"
              style={{
                backgroundColor: (mobileMenuOpen ? 'black' : (isDark ? 'black' : 'white')),
                transform: mobileMenuOpen ? 'rotate(-45deg)' : 'translateY(4px)',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay (hover preview) */}
      <div
        onClick={() => { setMenuOpen(false); setHoveredService(null); }}
        className={`fixed inset-0 z-[9980] transition-all duration-500 ease-in-out ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Default background */}
        <div className={`absolute inset-0 bg-[#e8e6e1] pointer-events-none transition-transform duration-500 ease-in-out origin-top ${
          menuOpen ? 'scale-y-100' : 'scale-y-0'
        }`} />

        {/* Service background images */}
        {services.map((service, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
            style={{ opacity: hoveredService === i ? 1 : 0 }}
          >
            <Image
              src={service.image}
              alt={service.label}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Services list */}
        <div className={`absolute inset-0 z-10 flex items-center transition-opacity duration-300 delay-200 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="p-6 md:p-10 lg:p-14 lg:px-64" onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-1 md:space-y-2">
              {services.map((service, i) => (
                <li key={i}>
                  <button
                    onMouseEnter={() => setHoveredService(i)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(`/services/${service.slug}`);
                    }}
                    className={`text-left text-xl lg:text-4xl font-bold uppercase tracking-tight transition-all duration-300 cursor-pointer ${
                      hasHover
                        ? hoveredService === i
                          ? 'text-white'
                          : 'text-white/40'
                        : 'text-black'
                    }`}
                    style={{
                      transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                      opacity: menuOpen ? 1 : 0,
                      transition: `transform 0.5s ease ${0.2 + i * 0.06}s, opacity 0.5s ease ${0.2 + i * 0.06}s, color 0.3s ease`,
                    }}
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-0 z-[9985] transition-all duration-700 ease-in-out origin-top ${
          mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
        style={{
          backgroundColor: '#e8e6e1',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full px-8">
          <nav className="space-y-8 w-full">
            <button
              ref={(el) => { menuItemsRef.current[0] = el; }}
              onClick={() => handleMobileNavClick('/services')}
              className="block w-full text-left text-4xl font-bold uppercase tracking-tight text-black"
            >
              Services
            </button>
            <button
              ref={(el) => { menuItemsRef.current[1] = el; }}
              onClick={() => handleMobileNavClick('/about')}
              className="block w-full text-left text-4xl font-bold uppercase tracking-tight text-black"
            >
              About
            </button>
            <button
              ref={(el) => { menuItemsRef.current[2] = el; }}
              onClick={() => handleMobileNavClick('/contact')}
              className="block w-full text-left text-4xl font-bold uppercase tracking-tight text-black"
            >
              Contact
            </button>
            <button
              ref={(el) => { menuItemsRef.current[3] = el; }}
              onClick={() => { setMobileMenuOpen(false); setIsDialogOpen(true); }}
              className="block w-full text-left text-xl font-bold uppercase tracking-tight text-white bg-[#6A9F30] px-6 py-4 mt-4"
            >
              Request Energy Audit
            </button>
          </nav>
        </div>
      </div>
      <ContactDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        type="energy-audit"
      />
    </>
  );
};

export default PageNavbar;
