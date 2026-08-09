"use client";

import React from 'react';
import ZoneCard from './ZoneCard';
import { useCurtainRouter } from './Curtain';
import { CurtainLink } from './Curtain';

const zones = [
  {
    zoneNumber: "01",
    title: "Residential",
    description: "Shared storage for elevators, pumps & EV charging",
    imagePath: "/images/residential.webp"
  },
  {
    zoneNumber: "02",
    title: "Commercial",
    description: "Flatten HVAC spikes and arbitrage ToU rates",
    imagePath: "/images/commercial.webp"
  },
  {
    zoneNumber: "03",
    title: "Industrial",
    description: "Shave machinery peaks and unlock demand-response revenue",
    imagePath: "/images/industrial.webp"
  },
  {
    zoneNumber: "04",
    title: "Telecom",
    description: "Replace diesel backup with zero-downtime battery power",
    imagePath: "/images/telecom.webp"
  },
  {
    zoneNumber: "05",
    title: "Household",
    description: "Store daytime solar, power your evenings",
    imagePath: "/images/residential2.webp"
  },
  {
    zoneNumber: "06",
    title: "Solar",
    description: "Bridge the midday-to-evening gap",
    imagePath: "/images/solar.webp"
  }
];

const Section3_2 = () => {
  const { navigate } = useCurtainRouter();
  // Map zone titles to service slugs
  const getSlugFromTitle = (title: string): string => {
    const slugMap: Record<string, string> = {
      'Residential': 'residential',
      'Commercial': 'commercial',
      'Industrial': 'industrial',
      'Telecom': 'telecom',
      'Solar': 'solar',
      'Household': 'residential' // Map Household to residential service
    };
    return slugMap[title] || 'residential';
  };

  const handleZoneClick = (title: string) => {
    const slug = getSlugFromTitle(title);
    // This component is ordinary DOM, not inside a Canvas — the original
    // comment claiming otherwise cost every zone click a full page reload.
    navigate(`/services/${slug}`);
  };

  return (
    <section className="w-screen relative overflow-hidden bg-[#6A9F30]/90 backdrop-blur-sm py-16 md:py-24">
      {/* Main content - reversed layout */}
      <div className="relative z-10 w-full flex flex-col xl:flex-row items-start xl:items-center gap-10 xl:gap-14 px-6 sm:px-8 md:px-12 lg:px-16 xl:pl-12 xl:pr-0">

        {/* Left side - Large headline and description */}
        <div className="max-w-2xl xl:max-w-md shrink-0">
          <div className="pb-2">
            <h1 className="text-white text-[clamp(1.75rem,5.5vw,3.75rem)] font-medium tracking-tight uppercase leading-[0.95] text-balance">
              MPS Deployment
            </h1>
          </div>

          <div className="space-y-4 md:space-y-5 lg:space-y-6 max-w-md">
            <h2 className="text-[#111827] text-[clamp(0.9375rem,1.8vw,1.0625rem)] font-normal border-t-2 border-[#111827] pt-1">
              Asset Creation & Revenue Generation
            </h2>
            <p className="text-white/80 text-sm md:text-base lg:text-base leading-relaxed">
              We deploy a custom-sized Modular Power System tailored to your facility's exact needs. Replace diesel generators, bypass peak Time-of-Day tariffs, and transform your energy infrastructure into a revenue-generating asset — a permanent solution to energy cost challenges.
            </p>
            <CurtainLink
              href="/services/"
              className="btn-slide btn-slide--light inline-block mt-4 px-5 py-2.5 md:px-6 md:py-3 border border-white/60 text-white text-xs md:text-sm uppercase tracking-widest"
            >
              Learn More
            </CurtainLink>
          </div>
        </div>

        {/* Right side - 3-row grid of deployment zones (only at xl) */}
        <div className="hidden xl:grid flex-1 grid-rows-3 gap-0 min-h-[34rem]">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-0">
            <ZoneCard {...zones[0]} onClick={() => handleZoneClick(zones[0].title)} />
            <ZoneCard {...zones[1]} onClick={() => handleZoneClick(zones[1].title)} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-0">
            <ZoneCard {...zones[2]} onClick={() => handleZoneClick(zones[2].title)} />
            <ZoneCard {...zones[3]} onClick={() => handleZoneClick(zones[3].title)} />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-0">
            <ZoneCard {...zones[4]} onClick={() => handleZoneClick(zones[4].title)} />
            <ZoneCard {...zones[5]} onClick={() => handleZoneClick(zones[5].title)} />
          </div>
        </div>

        {/* Tablet zone grid (md/lg) - 3 cols × 2 rows so titles fit */}
        <div className="hidden md:grid xl:hidden grid-cols-3 grid-rows-2 gap-2 w-full max-w-3xl h-[40vh]">
          {zones.map((zone) => (
            <ZoneCard
              key={zone.zoneNumber}
              {...zone}
              onClick={() => handleZoneClick(zone.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3_2;
