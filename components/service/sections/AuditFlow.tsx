"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Energy audit pipeline — a clear left-to-right narrative:
 *   1. POWER ANALYSER plugged into the panel
 *   2. → 30-day LOAD CURVE captured
 *   3. → IDENTIFIED LEAKS broken down
 *   4. ↓ PROJECTED SAVINGS bar chart at the bottom (full width)
 */
export default function AuditFlow() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Sweep marker on load curve
      gsap.to('.audit-sweep', {
        attr: { x1: 380, x2: 380 },
        duration: 6,
        repeat: -1,
        ease: 'none',
      });

      // Pulsing leak severity dots
      gsap.to('.leak-dot', {
        opacity: 0.5,
        scale: 1.2,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        stagger: 0.25,
        transformOrigin: 'center',
        ease: 'sine.inOut',
      });

      // Bar fill animation (loop)
      gsap.fromTo(
        '.savings-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          stagger: 0.18,
          transformOrigin: 'bottom',
          repeat: -1,
          repeatDelay: 2.5,
          ease: 'power2.out',
        }
      );

      // Meter LED blink
      gsap.to('.meter-blink', {
        opacity: 0.3,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Flowing dashes on connection wire
      gsap.to('.audit-dash', {
        strokeDashoffset: -160,
        duration: 2.4,
        repeat: -1,
        ease: 'none',
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 692"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="audit-curve-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="audit-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DB840" />
          <stop offset="100%" stopColor="#4f7a1f" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <pattern id="aud-grid-bg" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      </pattern>
      <rect width="900" height="660" fill="url(#aud-grid-bg)" opacity="0.4" />

      {/* ╔════════════════ TOP ROW LABEL ════════════════╗ */}
      <g>
        <text x="60" y="36" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="3" fontWeight="bold">STEP 1</text>
        <text x="60" y="52" fontSize="10" fill="#94a3b8" fontFamily="monospace">DEPLOY ANALYSER</text>

        <text x="340" y="36" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="3" fontWeight="bold">STEP 2</text>
        <text x="340" y="52" fontSize="10" fill="#94a3b8" fontFamily="monospace">CAPTURE 30-DAY CURVE</text>

        <text x="640" y="36" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="3" fontWeight="bold">STEP 3</text>
        <text x="640" y="52" fontSize="10" fill="#94a3b8" fontFamily="monospace">ISOLATE LEAKS</text>
      </g>

      {/* ━━━━ ZONE 1 — Power Analyser ━━━━ */}
      <g transform="translate(60, 80)">
        <rect x="0" y="0" width="220" height="240" rx="8" fill="white" stroke="#475569" strokeWidth="1.5" />

        {/* Display */}
        <rect x="20" y="20" width="180" height="80" rx="4" fill="#0f172a" />
        <text x="32" y="42" fontSize="10" fill="#7DB840" fontFamily="monospace">LIVE • PHASE A</text>
        <text x="110" y="74" textAnchor="middle" fontSize="32" fill="white" fontFamily="monospace" fontWeight="bold">428 kW</text>
        <text x="32" y="92" fontSize="9" fill="#94a3b8" fontFamily="monospace">PF 0.78  •  THD 6.4%</text>

        {/* Status LED */}
        <circle className="meter-blink" cx="188" cy="32" r="4" fill="#7DB840" />

        {/* Buttons */}
        <rect x="20" y="116" width="50" height="22" rx="3" fill="#e2e8f0" />
        <text x="45" y="131" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">MENU</text>
        <rect x="76" y="116" width="50" height="22" rx="3" fill="#e2e8f0" />
        <text x="101" y="131" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">VIEW</text>
        <rect x="132" y="116" width="68" height="22" rx="3" fill="#7DB840" />
        <text x="166" y="131" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">● REC</text>

        {/* Phase indicator row */}
        <g transform="translate(20, 154)">
          <text x="0" y="0" fontSize="9" fill="#475569" fontFamily="monospace">PHASE</text>
          <circle cx="60" cy="-3" r="5" fill="#ef4444" />
          <text x="69" y="0" fontSize="9" fill="#475569" fontFamily="monospace">A</text>
          <circle cx="100" cy="-3" r="5" fill="#fbbf24" />
          <text x="109" y="0" fontSize="9" fill="#475569" fontFamily="monospace">B</text>
          <circle cx="140" cy="-3" r="5" fill="#3b82f6" />
          <text x="149" y="0" fontSize="9" fill="#475569" fontFamily="monospace">C</text>
        </g>

        {/* Probe leads */}
        <g transform="translate(20, 178)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="0" x2="22" y2="40" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <line x1="44" y1="0" x2="44" y2="40" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          <line x1="66" y1="0" x2="66" y2="40" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
          <text x="0" y="56" fontSize="9" fill="#94a3b8" fontFamily="monospace">L1   L2   L3   N</text>
        </g>

        <text x="110" y="266" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">POWER ANALYSER</text>
      </g>

      {/* Connection wire from analyser → load curve */}
      <path
        className="audit-dash"
        d="M 280 200 L 340 200"
        fill="none"
        stroke="#7DB840"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />

      {/* ━━━━ ZONE 2 — 30-day Load Curve ━━━━ */}
      <g transform="translate(340, 80)">
        <rect x="0" y="0" width="280" height="240" rx="6" fill="white" stroke="#cbd5e1" strokeWidth="1" />

        {/* Inner padding */}
        <text x="14" y="22" fontSize="9" fill="#94a3b8" fontFamily="monospace">kW (×100)</text>

        {/* Y-axis */}
        <line x1="20" y1="36" x2="20" y2="200" stroke="#cbd5e1" strokeWidth="1" />
        {/* X-axis */}
        <line x1="20" y1="200" x2="270" y2="200" stroke="#cbd5e1" strokeWidth="1" />

        {/* Y ticks */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1="17" y1={200 - i * 40} x2="20" y2={200 - i * 40} stroke="#94a3b8" strokeWidth="1" />
            <text x="14" y={203 - i * 40} fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">{i * 2}</text>
          </g>
        ))}

        {/* Avg baseline */}
        <line x1="20" y1="135" x2="270" y2="135" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 3" />
        <text x="22" y="132" fontSize="7" fill="#94a3b8" fontFamily="monospace">avg load</text>

        {/* Demand curve (red, area-fill) */}
        <path
          d="M 20 180 Q 50 175 70 165 Q 90 145 110 130 Q 130 120 150 145 Q 170 165 195 95 Q 215 60 235 110 Q 255 140 270 145 L 270 200 L 20 200 Z"
          fill="url(#audit-curve-fill)"
          stroke="#ef4444"
          strokeWidth="2"
        />

        {/* Spike annotation */}
        <circle cx="195" cy="95" r="6" fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="195" y1="89" x2="195" y2="60" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 2" />
        <text x="195" y="55" textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="monospace" fontWeight="bold">SPIKE</text>
        <text x="195" y="44" textAnchor="middle" fontSize="7" fill="#dc2626" fontFamily="monospace">11:42 AM</text>

        {/* Sweep marker */}
        <line className="audit-sweep" x1="20" y1="36" x2="20" y2="200" stroke="#0f172a" strokeWidth="1.5" />

        {/* X labels */}
        <text x="20" y="216" fontSize="8" fill="#94a3b8" fontFamily="monospace">D-30</text>
        <text x="145" y="216" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">D-15</text>
        <text x="270" y="216" textAnchor="end" fontSize="8" fill="#94a3b8" fontFamily="monospace">TODAY</text>

        <text x="140" y="266" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">30-DAY LOAD CURVE</text>
      </g>

      {/* Connection arrow → leaks */}
      <path
        className="audit-dash"
        d="M 620 200 L 660 200"
        fill="none"
        stroke="#dc2626"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />

      {/* ━━━━ ZONE 3 — Identified Leaks ━━━━ */}
      <g transform="translate(660, 80)">
        {[
          { y: 0, label: 'Inefficient motors', percent: '32%', color: '#dc2626' },
          { y: 56, label: 'Poor power factor', percent: '24%', color: '#f97316' },
          { y: 112, label: 'Idle equipment draw', percent: '18%', color: '#fbbf24' },
          { y: 168, label: 'Reactive penalties', percent: '14%', color: '#a3a3a3' },
        ].map((leak, i) => (
          <g key={i} transform={`translate(0, ${leak.y})`}>
            <rect x="0" y="0" width="180" height="44" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
            <circle className="leak-dot" cx="18" cy="22" r="7" fill={leak.color} />
            <text x="34" y="20" fontSize="10" fill="#0f172a" fontFamily="monospace" fontWeight="bold">{leak.label}</text>
            <text x="34" y="34" fontSize="8" fill="#94a3b8" fontFamily="monospace">of total waste</text>
            <text x="170" y="28" textAnchor="end" fontSize="14" fill={leak.color} fontFamily="monospace" fontWeight="bold">{leak.percent}</text>
          </g>
        ))}

        <text x="90" y="266" textAnchor="middle" fontSize="11" fill="#dc2626" fontFamily="monospace" letterSpacing="2" fontWeight="bold">IDENTIFIED LEAKS</text>
      </g>

      {/* Down-arrow connector to projected savings */}
      <g>
        <path
          className="audit-dash"
          d="M 450 360 L 450 400"
          fill="none"
          stroke="#7DB840"
          strokeWidth="2.5"
          strokeDasharray="10 8"
        />
        <polygon points="445,398 455,398 450,408" fill="#7DB840" />
      </g>

      {/* ╔════════════════ STEP 4 LABEL ════════════════╗ */}
      <g>
        <text x="60" y="396" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="3" fontWeight="bold">STEP 4</text>
        <text x="60" y="412" fontSize="10" fill="#94a3b8" fontFamily="monospace">RANK SAVINGS BY ROI — QUICK FIXES FIRST, MPS LAST</text>
      </g>

      {/* ━━━━ ZONE 4 — Projected Savings (full width) ━━━━ */}
      <g transform="translate(60, 440)">
        <rect x="0" y="0" width="780" height="180" rx="6" fill="white" stroke="#cbd5e1" strokeWidth="1" />

        {/* Bars */}
        {(() => {
          const bars = [
            { label: 'Quick fixes', val: 4, h: 30, color: '#a3e635' },
            { label: 'PF correction', val: 7, h: 52, color: '#84cc16' },
            { label: 'Variable-speed drives', val: 10, h: 75, color: '#65a30d' },
            { label: 'MPS deployment', val: 14, h: 105, color: '#4f7a1f' },
            { label: 'Behavioural', val: 3, h: 22, color: '#a3a3a3' },
          ];
          const baseY = 150;
          return bars.map((b, i) => {
            const x = 30 + i * 90;
            return (
              <g key={i}>
                {/* Value above bar */}
                <text x={x + 30} y={baseY - b.h - 12} textAnchor="middle" fontSize="14" fill="#0f172a" fontFamily="monospace" fontWeight="bold">-{b.val}%</text>
                {/* Bar */}
                <rect className="savings-bar" x={x} y={baseY - b.h} width="60" height={b.h} fill={i === 3 ? 'url(#audit-bar)' : b.color} rx="2" />
                {/* X label */}
                <text x={x + 30} y={baseY + 16} textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">{b.label}</text>
              </g>
            );
          });
        })()}

        {/* Baseline */}
        <line x1="20" y1="150" x2="500" y2="150" stroke="#cbd5e1" strokeWidth="1" />

        {/* Cumulative callout (dark) */}
        <g transform="translate(530, 12)">
          <rect x="0" y="0" width="230" height="156" rx="6" fill="#0f172a" />
          <text x="115" y="26" textAnchor="middle" fontSize="9" fill="#7DB840" fontFamily="monospace" letterSpacing="3" fontWeight="bold">CUMULATIVE</text>
          <text x="115" y="86" textAnchor="middle" fontSize="56" fill="white" fontFamily="monospace" fontWeight="bold">-38%</text>
          <text x="115" y="108" textAnchor="middle" fontSize="10" fill="white" opacity="0.7" fontFamily="monospace">on monthly utility bill</text>
          <line x1="40" y1="120" x2="190" y2="120" stroke="#7DB840" strokeWidth="0.5" opacity="0.4" />
          <text x="115" y="140" textAnchor="middle" fontSize="9" fill="#7DB840" fontFamily="monospace" opacity="0.85">audited. quantified. guaranteed.</text>
        </g>
      </g>

      {/* Footnote */}
      <text x="60" y="644" fontSize="9" fill="#94a3b8" fontFamily="monospace">indicative breakdown — your audit returns site-specific values</text>
    </svg>
  );
}
