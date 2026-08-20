"use client";

import { CurtainLink } from '@/components/Curtain';

export default function ServiceFooter() {
  return (
    <footer className="mobile-bar-clearance w-full bg-[#0a0a0a] px-6 sm:px-8 md:px-10 lg:px-14 py-12 md:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12">
          <div className="sm:col-span-2 md:col-span-2">
            <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-tight mb-3 md:mb-4">YOSHINOVA</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4 md:mb-6 max-w-md">
              India's MSME Energy Profitability Partner. We audit first, then deploy cutting-edge Machine Protection Systems tailored for your business.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><CurtainLink href="/" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Home</CurtainLink></li>
              <li><CurtainLink href="/services" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Services</CurtainLink></li>
              <li><CurtainLink href="/services/energy-audit" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Energy Audit</CurtainLink></li>
              <li><CurtainLink href="/contact" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Contact</CurtainLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2">
              <li><CurtainLink href="/services/residential" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Residential</CurtainLink></li>
              <li><CurtainLink href="/services/commercial" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Commercial</CurtainLink></li>
              <li><CurtainLink href="/services/industrial" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Industrial</CurtainLink></li>
              <li><CurtainLink href="/services/solar" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Solar</CurtainLink></li>
              <li><CurtainLink href="/services/telecom" className="text-white/60 hover:text-[#6A9F30] transition-colors text-sm">Telecom</CurtainLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/40 text-xs text-center">
            2026 YOSHINOVA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
