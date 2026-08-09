"use client";

import React from 'react';
import Image from 'next/image';

interface ZoneCardProps {
  zoneNumber: string;
  title: string;
  description: string;
  imagePath: string;
  onClick?: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zoneNumber, title, description, imagePath, onClick }) => {
  return (
    <div
      className="relative overflow-hidden p-4 md:p-5 lg:p-6 flex flex-col justify-between group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <Image
          src={imagePath}
          alt={title}
          fill
          loading="lazy"
          className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300 ease-out"
          sizes="(max-width: 768px) 50vw, 25vw"
          quality={75}
        />
      </div>
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300 ease-out" />
      <div className="relative z-10">
        <p className="text-[#6A9F30] text-[10px] md:text-xs uppercase tracking-wider mb-1 md:mb-2">ZONE {zoneNumber}</p>
        <h3 className="text-white text-lg md:text-xl lg:text-2xl uppercase font-medium mb-1 md:mb-2">
          {title}
        </h3>
        <p className="text-white/70 text-xs md:text-sm leading-snug">{description}</p>
      </div>
    </div>
  );
};

export default ZoneCard;
