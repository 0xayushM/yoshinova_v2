"use client";

import Image from 'next/image';
import { CurtainLink } from '@/components/Curtain';
import { services } from '@/utils/services';
import PageNavbar from '@/components/PageNavbar';

export default function AllServicesPage() {
  return (
    <>
      <PageNavbar isDark />
      <main className="relative min-h-screen bg-[#e8e6e1]">
      <div className="pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 max-w-[1600px] mx-auto">
        <h1 className="text-center text-gray-600 text-[clamp(1.125rem,2.4vw,1.5rem)] font-bold uppercase tracking-tight mb-8 md:mb-12">
          All Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mx-auto">
          {services.map((service) => (
            <CurtainLink
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative block w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[16/10] xl:aspect-[16/10] overflow-hidden shadow-sm"
            >
              <Image
                src={service.image}
                alt={service.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

              <div className="absolute inset-0 pb-6 md:pb-8 lg:pb-10 flex flex-col items-center justify-end z-10">
                <h2 className="text-white text-xl sm:text-[clamp(1.25rem,2.6vw,1.625rem)] lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-center px-3 drop-shadow-lg">
                  {service.label}
                </h2>
              </div>
            </CurtainLink>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
