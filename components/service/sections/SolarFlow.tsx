"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Solar pipeline + 24-hr energy profile.
 * Top zone (≤ 320): Sun → Panels → NovaGrid → Home with animated dash flows.
 * Bottom zone (320..640): Full-width 24-hr profile graph with sweep + curves.
 */
export default function SolarFlow() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Sun rays rotate in place around the sun's centre.
      // The sun-rays <g> lives inside a parent <g transform="translate(60, 60)">,
      // so we use GSAP's `svgOrigin` (absolute SVG coordinates) instead of
      // `transformOrigin` — the absolute centre of the sun is (150, 152),
      // i.e. translate(60,60) + local (90, 92).
      gsap.to('.sun-rays', {
        rotation: 360,
        duration: 24,
        repeat: -1,
        svgOrigin: '150 152',
        ease: 'none',
      });

      // Sun glow pulse
      gsap.to('.sun-glow', {
        opacity: 0.55,
        scale: 1.06,
        transformOrigin: 'center',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Flowing dashes on connectors
      gsap.to('.solar-flow', {
        strokeDashoffset: -200,
        duration: 2.4,
        repeat: -1,
        ease: 'none',
      });

      // 24-hr time-of-day marker
      gsap.fromTo(
        '.daynight-marker',
        { attr: { x1: 80, x2: 80 } },
        {
          attr: { x1: 860, x2: 860 },
          duration: 14,
          ease: 'none',
          repeat: -1,
        }
      );

      // Inverter readout pulse
      gsap.to('.inverter-led', {
        opacity: 0.4,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Appliance activation sequence (Light → WiFi → AC → Fridge → Fan)
      const appliances = [
        '.sf-app-light',
        '.sf-app-wifi',
        '.sf-app-ac',
        '.sf-app-fridge',
        '.sf-app-fan',
      ];
      gsap.set(appliances, { opacity: 0.18 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      appliances.forEach((cls, i) => {
        tl.to(
          cls,
          { opacity: 1, duration: 0.4, ease: 'power2.out' },
          i * 0.45
        );
      });
      tl.to({}, { duration: 1.4 });
      tl.to(appliances, { opacity: 0.18, duration: 0.5, ease: 'power2.in' });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 672"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sf-sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-panel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="sf-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
        <linearGradient id="sf-solar-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sf-bess-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DB840" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7DB840" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Subtle grid background */}
      <pattern id="sf-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      </pattern>
      <rect width="900" height="640" fill="url(#sf-grid)" opacity="0.4" />

      {/* ╔══════════ TOP — Pipeline ══════════╗ */}

      {/* Step labels */}
      <g>
        <text x="60" y="36" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="3" fontWeight="bold">SOURCE</text>
        <text x="280" y="36" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="3" fontWeight="bold">CAPTURE</text>
        <text x="490" y="36" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="3" fontWeight="bold">STORE</text>
        <text x="720" y="36" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="3" fontWeight="bold">CONSUME</text>
      </g>

      {/* SUN */}
      <g transform="translate(60, 60)">
        <rect x="0" y="0" width="180" height="220" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />

        <circle className="sun-glow" cx="90" cy="92" r="60" fill="url(#sf-sun-glow)" />
        <g className="sun-rays">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="90"
              y1="56"
              x2="90"
              y2="46"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${i * 30}, 90, 92)`}
            />
          ))}
        </g>
        <circle cx="90" cy="92" r="22" fill="#fbbf24" />
        <circle cx="90" cy="92" r="14" fill="#fde68a" />

        <text x="90" y="174" textAnchor="middle" fontSize="11" fill="#a16207" fontFamily="monospace" letterSpacing="2" fontWeight="bold">THE SUN</text>
        <text x="90" y="190" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">06:00 — 18:00</text>
        <text x="90" y="204" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">~5.5 kWh / m²</text>
      </g>

      {/* Connector — Sun → Panels */}
      <path
        className="solar-flow"
        d="M 240 170 L 280 170"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />

      {/* SOLAR PV */}
      <g transform="translate(280, 60)">
        <rect x="0" y="0" width="180" height="220" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />

        {/* Panel array (3 staggered) */}
        <g transform="translate(20, 70)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 38}, ${i * 6})`}>
              <path d="M 0 0 L 56 0 L 64 32 L 8 32 Z" fill="url(#sf-panel)" stroke="#0f172a" strokeWidth="1" />
              <line x1="2" y1="11" x2="62" y2="11" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
              <line x1="4" y1="22" x2="64" y2="22" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
              <line x1="22" y1="0" x2="24" y2="32" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
              <line x1="44" y1="0" x2="46" y2="32" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
            </g>
          ))}
        </g>

        {/* Specs strip */}
        <line x1="20" y1="160" x2="160" y2="160" stroke="#e2e8f0" strokeWidth="1" />
        <text x="20" y="178" fontSize="9" fill="#475569" fontFamily="monospace">Capacity</text>
        <text x="160" y="178" textAnchor="end" fontSize="10" fill="#0f172a" fontFamily="monospace" fontWeight="bold">12 kWp</text>
        <text x="20" y="194" fontSize="9" fill="#475569" fontFamily="monospace">DC string</text>
        <text x="160" y="194" textAnchor="end" fontSize="10" fill="#0f172a" fontFamily="monospace" fontWeight="bold">600 V</text>

        <text x="90" y="218" textAnchor="middle" fontSize="11" fill="#1e40af" fontFamily="monospace" letterSpacing="2" fontWeight="bold">SOLAR PV</text>
      </g>

      {/* Connector — Panels → MPS */}
      <path
        className="solar-flow"
        d="M 460 170 L 500 170"
        fill="none"
        stroke="#7DB840"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />

      {/* NOVAGRID MPS */}
      <g transform="translate(500, 60)">
        <rect x="0" y="0" width="180" height="220" rx="6" fill="white" stroke="#7DB840" strokeWidth="2" />

        {/* Top strip */}
        <rect x="0" y="0" width="180" height="22" fill="#7DB840" />
        <text x="90" y="15" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" letterSpacing="2" fontWeight="bold">● NOVAGRID</text>

        {/* Battery cells */}
        <rect x="20" y="40" width="44" height="44" rx="3" fill="#7DB840" opacity="0.85" />
        <rect x="68" y="40" width="44" height="44" rx="3" fill="#7DB840" opacity="0.7" />
        <rect x="116" y="40" width="44" height="44" rx="3" fill="#7DB840" opacity="0.55" />

        {/* Display */}
        <rect x="20" y="98" width="140" height="60" rx="3" fill="#0f172a" />
        <text x="32" y="116" fontSize="9" fill="#fbbf24" fontFamily="monospace">SOLAR INPUT</text>
        <text x="90" y="138" textAnchor="middle" fontSize="20" fill="white" fontFamily="monospace" fontWeight="bold">12.4 kW</text>
        <text x="32" y="152" fontSize="8" fill="#94a3b8" fontFamily="monospace">SOC 78%  •  DC-coupled</text>

        {/* Status LED */}
        <circle className="inverter-led" cx="148" cy="110" r="4" fill="#7DB840" />

        {/* Specs strip */}
        <text x="20" y="178" fontSize="9" fill="#475569" fontFamily="monospace">Round-trip</text>
        <text x="160" y="178" textAnchor="end" fontSize="10" fill="#0f172a" fontFamily="monospace" fontWeight="bold">94%</text>
        <text x="20" y="194" fontSize="9" fill="#475569" fontFamily="monospace">Cycle warranty</text>
        <text x="160" y="194" textAnchor="end" fontSize="10" fill="#0f172a" fontFamily="monospace" fontWeight="bold">10 yr</text>

        <text x="90" y="218" textAnchor="middle" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="2" fontWeight="bold">BATTERY STORAGE</text>
      </g>

      {/* Connector — MPS → Home */}
      <path
        className="solar-flow"
        d="M 680 170 L 720 170"
        fill="none"
        stroke="#7DB840"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />

      {/* HOME / SITE */}
      <g transform="translate(720, 60)">
        <rect x="0" y="0" width="120" height="220" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />

        {/* Roof */}
        <path d="M 18 110 L 60 50 L 102 110 Z" fill="url(#sf-roof)" />
        {/* Body */}
        <rect x="24" y="110" width="72" height="60" fill="#fef3c7" stroke="#92400e" strokeWidth="1" />
        {/* Door */}
        <rect x="50" y="138" width="20" height="32" fill="#7c2d12" />
        {/* Windows */}
        <rect x="32" y="120" width="14" height="14" fill="#fde68a" stroke="#92400e" strokeWidth="0.5" />
        <rect x="74" y="120" width="14" height="14" fill="#fde68a" stroke="#92400e" strokeWidth="0.5" />

        {/* Appliance activation strip — Light → WiFi → AC → Fridge → Fan */}
        <g transform="translate(10, 176)">
          <rect x="0" y="0" width="100" height="22" rx="3" fill="#0f172a" opacity="0.04" />
          {/* Cell width 20 → 5 cells across 100px */}
          {/* 1. LIGHT */}
          <g className="sf-app-light" transform="translate(10, 11)">
            <circle cx="0" cy="0" r="7" fill="url(#sf-bess-fill)" />
            <circle cx="0" cy="-1.5" r="3" fill="#fde68a" stroke="#92400e" strokeWidth="0.5" />
            <rect x="-1.5" y="1.5" width="3" height="1.5" fill="#92400e" />
          </g>
          {/* 2. WIFI */}
          <g className="sf-app-wifi" transform="translate(30, 11)">
            <circle cx="0" cy="0" r="7" fill="url(#sf-bess-fill)" />
            <circle cx="0" cy="3" r="0.9" fill="#4f7a1f" />
            <path d="M -2 1 Q 0 -0.5 2 1" stroke="#4f7a1f" strokeWidth="0.7" fill="none" strokeLinecap="round" />
            <path d="M -3.5 -0.5 Q 0 -3.5 3.5 -0.5" stroke="#4f7a1f" strokeWidth="0.7" fill="none" strokeLinecap="round" />
          </g>
          {/* 3. AC */}
          <g className="sf-app-ac" transform="translate(50, 11)">
            <circle cx="0" cy="0" r="7" fill="url(#sf-bess-fill)" />
            <rect x="-5" y="-2.5" width="10" height="5" rx="0.5" fill="white" stroke="#4f7a1f" strokeWidth="0.5" />
            <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#4f7a1f" strokeWidth="0.3" />
            <line x1="-4" y1="0" x2="4" y2="0" stroke="#4f7a1f" strokeWidth="0.3" />
            <line x1="-4" y1="1" x2="4" y2="1" stroke="#4f7a1f" strokeWidth="0.3" />
          </g>
          {/* 4. FRIDGE */}
          <g className="sf-app-fridge" transform="translate(70, 11)">
            <circle cx="0" cy="0" r="7" fill="url(#sf-bess-fill)" />
            <rect x="-3" y="-5" width="6" height="10" rx="0.5" fill="white" stroke="#4f7a1f" strokeWidth="0.5" />
            <line x1="-3" y1="-1.5" x2="3" y2="-1.5" stroke="#4f7a1f" strokeWidth="0.4" />
            <rect x="1.6" y="-3.5" width="0.4" height="1.4" fill="#4f7a1f" />
            <rect x="1.6" y="-0.5" width="0.4" height="2.5" fill="#4f7a1f" />
          </g>
          {/* 5. FAN */}
          <g className="sf-app-fan" transform="translate(90, 11)">
            <circle cx="0" cy="0" r="7" fill="url(#sf-bess-fill)" />
            <circle cx="0" cy="0" r="5" fill="white" stroke="#4f7a1f" strokeWidth="0.5" />
            <ellipse cx="0" cy="-2.4" rx="0.7" ry="1.7" fill="#4f7a1f" opacity="0.85" />
            <ellipse cx="0" cy="2.4" rx="0.7" ry="1.7" fill="#4f7a1f" opacity="0.85" />
            <ellipse cx="-2.4" cy="0" rx="1.7" ry="0.7" fill="#4f7a1f" opacity="0.85" />
            <ellipse cx="2.4" cy="0" rx="1.7" ry="0.7" fill="#4f7a1f" opacity="0.85" />
            <circle cx="0" cy="0" r="0.7" fill="#0f172a" />
          </g>
        </g>
        <text x="60" y="218" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">HOME / SITE</text>
      </g>

      {/* ──────────── SEPARATOR + Bottom Title ──────────── */}
      <line x1="60" y1="320" x2="840" y2="320" stroke="#e2e8f0" strokeWidth="1" />
      <text x="60" y="354" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="3" fontWeight="bold">24-HOUR ENERGY PROFILE</text>
      <text x="60" y="370" fontSize="9" fill="#94a3b8" fontFamily="monospace">solar generation in yellow • battery delivery in green</text>

      {/* Live pill (right) */}
      <g transform="translate(770, 340)">
        <rect x="0" y="0" width="68" height="20" rx="10" fill="#7DB840" />
        <circle cx="11" cy="10" r="3.5" fill="white">
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="40" y="14" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="2">LIVE</text>
      </g>

      {/* ╔══════════ BOTTOM — 24-hr Profile ══════════╗ */}
      <g transform="translate(60, 400)">
        <rect x="0" y="0" width="780" height="200" rx="4" fill="white" stroke="#cbd5e1" strokeWidth="1" />

        {/* Inner padding */}
        {/* Y-axis */}
        <line x1="40" y1="20" x2="40" y2="160" stroke="#cbd5e1" strokeWidth="1" />
        {/* Y ticks */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = 160 - t * 140;
          return (
            <g key={i}>
              <line x1={37} y1={y} x2={40} y2={y} stroke="#94a3b8" strokeWidth="1" />
              <text x="34" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">{Math.round(t * 12)}</text>
              {i > 0 && (
                <line x1="40" y1={y} x2="760" y2={y} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 4" />
              )}
            </g>
          );
        })}
        <text x="34" y="14" textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">kW</text>

        {/* X-axis */}
        <line x1="40" y1="160" x2="760" y2="160" stroke="#cbd5e1" strokeWidth="1" />

        {/* Daytime band (day shading) */}
        <rect x="220" y="20" width="360" height="140" fill="#fef3c7" opacity="0.45" />
        <text x="400" y="34" textAnchor="middle" fontSize="9" fill="#a16207" fontFamily="monospace">DAYTIME</text>

        {/* Evening peak band */}
        <rect x="540" y="20" width="160" height="140" fill="#7DB840" opacity="0.07" />
        <text x="620" y="34" textAnchor="middle" fontSize="9" fill="#4f7a1f" fontFamily="monospace">EVENING — discharge stored</text>

        {/* Solar generation curve (yellow, area filled) */}
        <path
          d="M 40 160 L 200 160 Q 260 160 300 90 Q 380 40 460 50 Q 520 60 560 130 Q 600 160 760 160 L 40 160 Z"
          fill="url(#sf-solar-fill)"
        />
        <path
          d="M 40 160 L 200 160 Q 260 160 300 90 Q 380 40 460 50 Q 520 60 560 130 Q 600 160 760 160"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2.5"
        />

        {/* Battery delivery curve (green) */}
        <path
          d="M 40 124 Q 100 124 160 116 Q 220 110 300 96 Q 380 84 460 78 Q 540 78 600 90 Q 660 110 760 116"
          fill="none"
          stroke="#7DB840"
          strokeWidth="2.5"
        />

        {/* Hour ticks */}
        {[0, 6, 12, 18, 24].map((h) => {
          const x = 40 + (h / 24) * 720;
          return (
            <g key={h}>
              <line x1={x} y1="160" x2={x} y2="164" stroke="#94a3b8" strokeWidth="0.8" />
              <text x={x} y="178" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                {h.toString().padStart(2, '0')}:00
              </text>
            </g>
          );
        })}
        <text x="400" y="194" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace" letterSpacing="2">HOUR OF DAY</text>

        {/* Daynight sweep marker */}
        <line className="daynight-marker" x1="40" y1="20" x2="40" y2="160" stroke="#0f172a" strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Legend (bottom) */}
      <g transform="translate(60, 622)">
        <line x1="0" y1="0" x2="22" y2="0" stroke="#fbbf24" strokeWidth="2.5" />
        <text x="28" y="3" fontSize="10" fill="#475569" fontFamily="monospace">SOLAR GEN</text>

        <line x1="170" y1="0" x2="192" y2="0" stroke="#7DB840" strokeWidth="2.5" />
        <text x="198" y="3" fontSize="10" fill="#475569" fontFamily="monospace">BATTERY DELIVERY</text>

        <text x="780" y="3" textAnchor="end" fontSize="11" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">85% SELF-CONSUMPTION</text>
      </g>
    </svg>
  );
}
