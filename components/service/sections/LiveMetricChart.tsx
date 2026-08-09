"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface LiveMetricSeries {
  label: string;
  color: string;
  /** Normalised values in 0..1. Any length >= 2. */
  values: number[];
  dashed?: boolean;
  fill?: boolean;
}

interface LiveMetricChartProps {
  /** Two-three series to plot. First series drives the sweep dot. */
  series: LiveMetricSeries[];
  /** Axis units label (e.g. "kW"). */
  yUnit?: string;
  /** Light or dark surface — controls axis / legend ink. */
  theme?: 'light' | 'dark';
  /** Optional className applied to the <svg>. */
  className?: string;
}

/**
 * Pure SVG chart used by both:
 *   - <LiveMetricGraph> (full section on service pages)
 *   - <ZoneSection> on the homepage (compact card)
 *
 * Renders a 24-hour two-series plot with:
 *   - looped draw-on stroke animation
 *   - vertical sweep marker
 *   - sweep dot riding the primary series
 *   - "LIVE" pill
 */
export default function LiveMetricChart({
  series,
  yUnit = 'kW',
  theme = 'light',
  className,
}: LiveMetricChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  // Plot bounds (in viewBox units)
  const W = 900;
  const H = 460;
  const PADDING = { top: 40, right: 40, bottom: 60, left: 60 };
  const plotW = W - PADDING.left - PADDING.right;
  const plotH = H - PADDING.top - PADDING.bottom;

  const seriesPath = (vals: number[]) => {
    const stepX = plotW / (vals.length - 1);
    return vals
      .map((v, i) => {
        const x = PADDING.left + i * stepX;
        const y = PADDING.top + plotH - v * plotH;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const seriesAreaPath = (vals: number[]) => {
    const top = seriesPath(vals);
    const stepX = plotW / (vals.length - 1);
    const lastX = PADDING.left + (vals.length - 1) * stepX;
    const baseY = PADDING.top + plotH;
    return `${top} L ${lastX.toFixed(1)} ${baseY} L ${PADDING.left} ${baseY} Z`;
  };

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Looped draw-on for each line.
      const lines = ref.current?.querySelectorAll('.lmg-line');
      lines?.forEach((line) => {
        const path = line as SVGPathElement;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        gsap.fromTo(
          path,
          { strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: 'power2.out',
            repeat: -1,
            repeatDelay: 4,
          }
        );
      });

      // Looped fade-in for area fills.
      gsap.fromTo(
        '.lmg-area',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.6,
          delay: 0.4,
          ease: 'power1.out',
          repeat: -1,
          repeatDelay: 4.8,
        }
      );

      // Vertical sweep marker.
      gsap.fromTo(
        '.lmg-sweep',
        { attr: { x1: PADDING.left, x2: PADDING.left } },
        {
          attr: { x1: PADDING.left + plotW, x2: PADDING.left + plotW },
          duration: 12,
          ease: 'none',
          repeat: -1,
        }
      );

      // Sweep dot following the primary series.
      const sweepDot = ref.current?.querySelector('.lmg-sweep-dot') as SVGCircleElement | null;
      const primary = series[0];
      if (sweepDot && primary && primary.values.length > 1) {
        const proxy = { t: 0 };
        gsap.to(proxy, {
          t: 1,
          duration: 12,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            const idx = proxy.t * (primary.values.length - 1);
            const i0 = Math.floor(idx);
            const i1 = Math.min(i0 + 1, primary.values.length - 1);
            const frac = idx - i0;
            const v = primary.values[i0] * (1 - frac) + primary.values[i1] * frac;
            const stepX = plotW / (primary.values.length - 1);
            const x = PADDING.left + idx * stepX;
            const y = PADDING.top + plotH - v * plotH;
            sweepDot.setAttribute('cx', String(x));
            sweepDot.setAttribute('cy', String(y));
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [series, plotH, plotW]);

  // Theme tokens.
  const isDark = theme === 'dark';
  const axisColor = isDark ? '#334155' : '#cbd5e1';
  const axisLabelColor = isDark ? '#64748b' : '#94a3b8';
  const legendInk = isDark ? '#cbd5e1' : '#475569';
  const sweepColor = isDark ? '#7DB840' : '#0f172a';

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={className ?? 'w-full h-auto'}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {series.map((s, i) =>
          s.fill ? (
            <linearGradient key={i} id={`lmg-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.45" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ) : null
        )}
      </defs>

      {/* Horizontal grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = PADDING.top + plotH - t * plotH;
        return (
          <g key={i}>
            <line
              x1={PADDING.left}
              y1={y}
              x2={PADDING.left + plotW}
              y2={y}
              stroke={axisColor}
              strokeWidth="0.5"
              strokeDasharray={i === 0 ? '0' : '3 4'}
              opacity={i === 0 ? 0.6 : 0.4}
            />
            <text x={PADDING.left - 10} y={y + 3} textAnchor="end" fontSize="10" fill={axisLabelColor} fontFamily="monospace">
              {Math.round(t * 100)}
            </text>
          </g>
        );
      })}

      {/* Y unit */}
      <text x={PADDING.left - 10} y={PADDING.top - 12} textAnchor="end" fontSize="9" fill={axisLabelColor} fontFamily="monospace">
        {yUnit}
      </text>

      {/* X axis ticks (24h) */}
      {[0, 6, 12, 18, 24].map((h) => {
        const stepX = plotW / 24;
        const x = PADDING.left + h * stepX;
        return (
          <g key={h}>
            <line
              x1={x}
              y1={PADDING.top + plotH}
              x2={x}
              y2={PADDING.top + plotH + 4}
              stroke={axisColor}
              strokeWidth="0.6"
            />
            <text x={x} y={PADDING.top + plotH + 18} textAnchor="middle" fontSize="10" fill={axisLabelColor} fontFamily="monospace">
              {h.toString().padStart(2, '0')}:00
            </text>
          </g>
        );
      })}
      <text
        x={PADDING.left + plotW / 2}
        y={H - 14}
        textAnchor="middle"
        fontSize="9"
        fill={axisLabelColor}
        fontFamily="monospace"
        letterSpacing="2"
      >
        HOUR OF DAY
      </text>

      {/* Areas (rendered behind lines) */}
      {series.map((s, i) =>
        s.fill ? (
          <path
            key={`area-${i}`}
            className="lmg-area"
            d={seriesAreaPath(s.values)}
            fill={`url(#lmg-grad-${i})`}
            opacity="0.001"
          />
        ) : null
      )}

      {/* Lines */}
      {series.map((s, i) => (
        <path
          key={`line-${i}`}
          className="lmg-line"
          d={seriesPath(s.values)}
          fill="none"
          stroke={s.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={s.dashed ? '6 6' : '0'}
        />
      ))}

      {/* Vertical sweep marker */}
      <line
        className="lmg-sweep"
        x1={PADDING.left}
        y1={PADDING.top}
        x2={PADDING.left}
        y2={PADDING.top + plotH}
        stroke={sweepColor}
        strokeWidth="1.5"
        opacity="0.65"
      />

      {/* Dot riding primary series */}
      <circle
        className="lmg-sweep-dot"
        cx={PADDING.left}
        cy={PADDING.top + plotH}
        r="5"
        fill={series[0]?.color || '#7DB840'}
      >
        <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
      </circle>

      {/* Legend */}
      <g transform={`translate(${PADDING.left + 12}, ${PADDING.top + 8})`}>
        {series.map((s, i) => (
          <g key={i} transform={`translate(${i * 180}, 0)`}>
            <line
              x1="0"
              y1="6"
              x2="22"
              y2="6"
              stroke={s.color}
              strokeWidth="2.5"
              strokeDasharray={s.dashed ? '5 5' : '0'}
            />
            <text x="28" y="9" fontSize="10" fill={legendInk} fontFamily="monospace">
              {s.label}
            </text>
          </g>
        ))}
      </g>

      {/* "LIVE" pill */}
      <g transform={`translate(${PADDING.left + plotW - 60}, ${PADDING.top + 4})`}>
        <rect x="0" y="0" width="56" height="18" rx="9" fill="#7DB840" />
        <circle cx="9" cy="9" r="3" fill="white">
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="32" y="12" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
          LIVE
        </text>
      </g>
    </svg>
  );
}
