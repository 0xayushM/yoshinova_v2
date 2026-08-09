"use client";

import React, { useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ChartDataPoint } from './MPSComparisonChart';
import LiveMetricChart from './service/sections/LiveMetricChart';
import SplitText from './SplitText';

interface ZoneSectionProps {
  title: string;
  description: string;
  alignment: 'left' | 'right';
  gradientDirection: 'left' | 'right';
  chartData: ChartDataPoint[];
  yAxisLabel: string;
  maxY: number;
  accentHex: string;
  accentRgb: string;
  ctaLabel?: string;
  onCTAClick?: () => void;
}

const ZoneSection: React.FC<ZoneSectionProps> = ({
  title,
  description,
  alignment,
  gradientDirection,
  chartData,
  yAxisLabel,
  maxY,
  accentHex,
  accentRgb,
  ctaLabel,
  onCTAClick
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isLeft = alignment === 'left';
  const gradientClass = gradientDirection === 'left' 
    ? 'bg-gradient-to-tl from-transparent via-transparent to-[#111827]'
    : 'bg-gradient-to-tr from-transparent via-transparent to-[#111827]';

  // Convert {hour, withoutMPS, withMPS} into two 0..1 normalised series for
  // <LiveMetricChart>. Use `maxY` so the visual scale matches the original
  // peak-shaving chart for each zone.
  const liveSeries = useMemo(() => {
    const norm = (n: number) => Math.max(0, Math.min(1, n / maxY));
    return [
      {
        label: 'Without MPS',
        color: '#ef4444',
        dashed: true,
        values: chartData.map((d) => norm(d.withoutMPS)),
      },
      {
        label: 'With MPS',
        color: accentHex,
        fill: true,
        values: chartData.map((d) => norm(d.withMPS)),
      },
    ];
  }, [chartData, maxY, accentHex]);

  const toggleContent = () => {
    const contentRef = document.getElementById(`zone-content-${title}`);
    
    if (!contentRef) return;

    if (isOpen) {
      // Close animation
      gsap.to(contentRef, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => setIsOpen(false)
      });
    } else {
      // Open animation
      setIsOpen(true);
      gsap.fromTo(contentRef, 
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.inOut' }
      );
    }
  };

  return (
    <section className={`w-screen min-h-[100svh] relative overflow-hidden ${gradientClass} flex items-center justify-center`}>
      <div className={`w-full flex flex-col items-${isLeft ? 'start' : 'end'}`}>
        {/* Clickable Header with border */}
        <div 
          className='w-full cursor-pointer hover:bg-white/5 transition-colors border-b border-white/50'
          onClick={toggleContent}
        >
          <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'} gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 py-4 `}>
            {!isLeft && (
              <div className={`text-white text-xl md:text-3xl lg:text-4xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} flex items-center`}>
                ▼
              </div>
            )}
            <SplitText
              text={title}
              tag="h1"
              className={`text-white text-[clamp(1.75rem,5.5vw,3.75rem)] font-medium tracking-tight uppercase`}
              delay={70}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.5}
              rootMargin="0px"
              textAlign={isLeft ? 'left' : 'right'}
            />
            {isLeft && (
              <div className={`text-white text-xl md:text-3xl lg:text-4xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} flex items-center`}>
                ▼
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Content */}
        <div 
          id={`zone-content-${title}`}
          className="w-full overflow-hidden"
          style={{ height: 'auto', opacity: 1 }}
        >
          <div className={`pt-6 md:pt-8 pb-6 md:pb-8 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col ${isLeft ? 'items-start' : 'items-end'}`}>
            {isOpen && (
              <SplitText
                text={description}
                tag="p"
                className={`text-white text-sm md:text-base lg:text-lg xl:text-xl font-medium tracking-tight ${isLeft ? 'text-left' : 'text-right'} md:max-w-[60%] lg:max-w-[50%] mb-4 md:mb-6`}
                delay={0}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0}
                rootMargin="0px"
                textAlign={isLeft ? 'left' : 'right'}
              />
            )}
            <div className="w-[90vw] sm:w-[88vw] md:w-[80vw] lg:w-[70vw] xl:w-[44vw] h-[26vh] md:h-[30vh] lg:h-[32vh] xl:h-[34vh] rounded-xl p-3 md:p-4 bg-white border border-white/10 backdrop-blur-sm shadow-lg">
              <div className="relative z-10 h-full w-full overflow-hidden">
                <LiveMetricChart
                  series={liveSeries}
                  yUnit={yAxisLabel}
                  theme="dark"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZoneSection;
