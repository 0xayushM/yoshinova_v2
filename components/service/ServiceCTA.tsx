"use client";

import { useState } from 'react';
import { CurtainLink } from '@/components/Curtain';
import ContactDialog from '@/components/ContactDialog';

interface CTAButton {
  text: string;
  link: string;
}

interface ServiceCTAProps {
  label: string;
  heading: string;
  description: string;
  primaryButton: CTAButton;
  secondaryButton: CTAButton;
}

export default function ServiceCTA({ label, heading, description, primaryButton, secondaryButton }: ServiceCTAProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="w-full bg-black px-6 sm:px-8 md:px-10 lg:px-14 py-16 md:py-24 lg:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#6A9F30] text-xs uppercase tracking-widest mb-3 md:mb-4">
            {label}
          </p>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight mb-4 md:mb-6">
            {heading}
          </h2>
          <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="btn btn--primary"
            >
              {primaryButton.text}
            </button>
            <CurtainLink
              href={secondaryButton.link}
              className="btn btn--onInk"
            >
              {secondaryButton.text}
            </CurtainLink>
          </div>
        </div>
      </section>

      <ContactDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        type="contact"
      />
    </>
  );
}
