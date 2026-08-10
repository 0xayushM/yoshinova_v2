"use client";

import Image from "next/image";

interface ZoneCardProps {
  zoneNumber: string;
  title: string;
  description: string;
  imagePath: string;
  onClick?: () => void;
}

/**
 * Zone card with a slide-over reveal: the plate sits greyscale until you
 * approach it, then a paper panel slides up from the bottom edge carrying
 * the description while the image regains colour.
 */
export default function ZoneCard({
  zoneNumber,
  title,
  description,
  imagePath,
  onClick,
}: ZoneCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative block h-full w-full overflow-hidden bg-paper-2 text-left"
    >
      <Image
        src={imagePath}
        alt={title}
        fill
        sizes="(max-width: 1024px) 50vw, 25vw"
        className="object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
        loading="lazy"
      />
      {/* legibility scrim, lighter than the old solid black */}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

      <span className="absolute left-4 top-4 t-label !text-white/70">
        Zone {zoneNumber}
      </span>

      {/* the slide-over panel */}
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block text-white text-lg leading-tight md:text-xl">
          {title}
        </span>
        <span className="mt-1 grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
          <span className="overflow-hidden">
            <span className="block pt-1.5 text-[13px] leading-snug text-white/80">
              {description}
            </span>
          </span>
        </span>
        <span className="mt-2 block h-px w-0 bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
      </span>
    </button>
  );
}
