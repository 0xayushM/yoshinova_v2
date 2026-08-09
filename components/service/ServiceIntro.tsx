"use client";

import { useState } from 'react';
import Image from 'next/image';
import ContactDialog from '@/components/ContactDialog';

interface ServiceIntroProps {
  title: string;
  description: string;
  bessImage: string;
  brochureUrl?: string;
}

export default function ServiceIntro({ title, description, bessImage }: ServiceIntroProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="relative w-full bg-white px-6 sm:px-8 md:px-10 lg:px-14 py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-black text-[clamp(1.375rem,3.2vw,2rem)] xl:text-5xl font-bold leading-tight mb-4 md:mb-6">
              {title}
            </h2>

            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
              {description}
            </p>

            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-[#6A9F30] text-white text-xs md:text-sm font-semibold uppercase tracking-wide hover:bg-[#5a8f20] transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>

        {/* Right Column - MPS Image */}
        <div className="relative w-full aspect-square lg:aspect-[4/3] flex items-center justify-center">
          <Image
            src={bessImage}
            alt="Modular Power System"
            fill
            className="object-contain"
          />
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
