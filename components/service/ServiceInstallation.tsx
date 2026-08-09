"use client";

import Image from 'next/image';

interface ServiceInstallationProps {
  label: string;
  heading: string;
  description: string;
  benefits: string[];
  images: string[];
  title: string;
}

export default function ServiceInstallation({ label, heading, description, benefits, images, title }: ServiceInstallationProps) {
  return (
    <section className="w-full bg-[#e8e6e1] px-6 sm:px-8 md:px-10 lg:px-14 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center mb-16 md:mb-20 lg:mb-24">
          <div>
            <p className="text-[#6A9F30] text-xs uppercase tracking-widest mb-3 md:mb-4">
              {label}
            </p>
            <h2 className="text-black text-[clamp(1.375rem,3.2vw,2rem)] font-bold uppercase tracking-tight mb-4 md:mb-6">
              {heading}
            </h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
              {description}
            </p>
            <div className="space-y-3">
              {benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-center">
                  <span className="text-[#6A9F30] mr-3 text-xl">✓</span>
                  <span className="text-gray-700 text-sm md:text-base font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="col-span-2 relative aspect-[16/10] overflow-hidden">
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={images[1]}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={images[2]}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
