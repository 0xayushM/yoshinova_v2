"use client";

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { services } from '@/utils/services';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import ContactDialog from './ContactDialog';
import { useCurtainRouter } from './Curtain';

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const router = useRouter();
  const { navigate } = useCurtainRouter();
  const [isMobile, setIsMobile] = useState(false);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  useEffect(() => {
    const handleDreiScroll = (e: Event) => {
      const offset = (e as CustomEvent).detail?.offset ?? 0;
      setScrollProgress(offset);
    };

    window.addEventListener('drei-scroll', handleDreiScroll);
    return () => window.removeEventListener('drei-scroll', handleDreiScroll);
  }, []);

  const goHome = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  // Logo: constant size
  const logoSize = 50;

  // Hide navbar from Section4 (4/14) to Section10 (10/14)
  const hideStartThreshold = 4 / 14;
  const hideEndThreshold = 11 / 14;
  const isHidden = scrollProgress >= hideStartThreshold && scrollProgress < hideEndThreshold;

  const hasHover = hoveredService !== null;

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const content = (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[9990] pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHidden ? 0 : 1 }}
      >
        <div className="relative flex items-center justify-between w-full p-4 md:px-6 lg:px-10 xl:px-14 pt-4">
          <button onClick={goHome} className="flex items-center cursor-pointer pointer-events-auto">
            <Image
              src="/logo_white.webp"
              alt="Yoshinova logo"
              width={160}
              height={100}
              className="object-contain transition-[filter] duration-300"
              style={{
                height: `${logoSize}px`,
                width: 'auto',
                filter: (mobileMenuOpen || menuOpen ? (hasHover ? 'none' : 'invert(1)') : 'none'),
              }}
              priority
            />
          </button>

          {/* Brand name — absolutely centered, clickable to go home
          <button
            onClick={goHome}
            className="absolute left-1/2 -translate-x-1/2 text-base md:text-xl lg:text-2xl font-bold uppercase tracking-tight transition-colors duration-300 cursor-pointer pointer-events-auto"
            style={{ color: (menuOpen ? (hasHover ? 'white' : 'black') : (isDark ? 'black' : 'white')) }}
          >
            Yoshinova
          </button> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 pointer-events-auto">
            {/* Services button: hover opens menu, click goes to /services */}
            <button
              onMouseEnter={() => setMenuOpen(true)}
              onClick={() => { setMenuOpen(false); navigate('/services'); }}
              className="text-sm lg:text-base font-light uppercase tracking-tight transition-colors duration-300 cursor-pointer"
            >
              <div className="flex font-light items-center justify-between" style={{ color: (menuOpen ? (hasHover ? 'white' : 'black') : 'white') }}>
                <span>Services</span>
              </div>
            </button>

            {/* About button */}
            <button
              onClick={() => { setMenuOpen(false); navigate('/about'); }}
              className="text-sm lg:text-base font-light uppercase tracking-tight transition-colors duration-300 cursor-pointer"
              style={{ color: (menuOpen ? (hasHover ? 'white' : 'black') : 'white') }}
            >
              About
            </button>

            {/* Contact button */}
            <button
              onClick={() => { setMenuOpen(false); navigate('/contact'); }}
              className="text-sm lg:text-base font-light uppercase tracking-tight transition-colors duration-300 cursor-pointer"
              style={{ color: (menuOpen ? (hasHover ? 'white' : 'black') : 'white') }}
            >
              Contact
            </button>

            {/* Energy Audit CTA */}
            <button
              onClick={() => { setMenuOpen(false); setMobileMenuOpen(false); setIsDialogOpen(true); }}
              className="btn-slide btn-slide--light inline-block px-4 py-2 lg:px-6 lg:py-3 border border-white/60 text-white text-xs lg:text-sm uppercase tracking-widest"
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
                transform: mobileMenuOpen ? 'rotate(45deg)' : 'translateY(-4px)',
                backgroundColor: mobileMenuOpen ? 'black' : 'white',
              }}
            />
            <span
              className="w-6 h-0.5 transition-all duration-300 ease-in-out absolute"
              style={{
                opacity: mobileMenuOpen ? 0 : 1,
                backgroundColor: mobileMenuOpen ? 'black' : 'white',
              }}
            />
            <span
              className="w-6 h-0.5 transition-all duration-300 ease-in-out absolute"
              style={{
                transform: mobileMenuOpen ? 'rotate(-45deg)' : 'translateY(4px)',
                backgroundColor: mobileMenuOpen ? 'black' : 'white',
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

        {/* Close button */}
        <button
          onClick={() => { setMenuOpen(false); setHoveredService(null); }}
          className={`absolute top-6 right-6 md:top-10 md:right-10 lg:top-14 lg:right-14 z-20 w-12 h-12 flex items-center justify-center transition-all duration-300 cursor-pointer ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Close menu"
        >
          <div className="relative w-8 h-8">
            <span
              className={`absolute top-1/2 left-0 w-full h-0.5 transition-colors duration-300 ${
                hasHover ? 'bg-white' : 'bg-black'
              }`}
              style={{ transform: 'translateY(-50%) rotate(45deg)' }}
            />
            <span
              className={`absolute top-1/2 left-0 w-full h-0.5 transition-colors duration-300 ${
                hasHover ? 'bg-white' : 'bg-black'
              }`}
              style={{ transform: 'translateY(-50%) rotate(-45deg)' }}
            />
          </div>
        </button>

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
          <nav className="space-y-4 w-full">
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
              className="block w-full items-center flex text-left text-xl font-bold uppercase tracking-tight text-white bg-[#6A9F30] px-6 py-4 mt-4"
            >
              <span>Request</span> <span className="ml-2">Energy Audit</span>
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

  if (!mounted) return null;
  return createPortal(content, document.body);
};

export default Navbar;
