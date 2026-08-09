"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Day/night load profile + commercial building flow.
 * Shows time-of-use arbitrage: charge off-peak, discharge during peak.
 */
export default function CommercialFlow() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.tof-marker', {
        cx: 770,
        duration: 8,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.flow-arrow', {
        strokeDashoffset: -160,
        duration: 2.4,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.window-light', {
        opacity: 0.4,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.15, from: 'random' },
        ease: 'sine.inOut',
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 442"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cmBuildingGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="cmCurveFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DB840" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7DB840" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cmGridFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Building (left) */}
      <g transform="translate(50, 60)">
        <text x="80" y="-15" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">YOUR BUILDING</text>
        {/* Body */}
        <rect x="20" y="0" width="160" height="240" fill="url(#cmBuildingGrad)" />
        {/* Top edge */}
        <rect x="14" y="-6" width="172" height="8" fill="#475569" />
        {/* HVAC unit on roof */}
        <rect x="60" y="-22" width="30" height="16" fill="#334155" />
        <rect x="100" y="-22" width="30" height="16" fill="#334155" />
        {/* Window grid */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              className="window-light"
              x={32 + col * 28}
              y={14 + row * 36}
              width={20}
              height={22}
              fill="#fde68a"
              opacity={0.85}
            />
          ))
        )}
        {/* Lobby */}
        <rect x="70" y="220" width="60" height="20" fill="#1e293b" />
        <rect x="80" y="226" width="14" height="14" fill="#fde68a" opacity="0.9" />
        <rect x="106" y="226" width="14" height="14" fill="#fde68a" opacity="0.9" />
      </g>

      {/* MPS unit (mid-right) */}
      <g transform="translate(280, 200)">
        <text x="60" y="-12" textAnchor="middle" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="2" fontWeight="bold">NOVABIZGUARD</text>
        <rect x="0" y="0" width="120" height="100" rx="6" fill="white" stroke="#7DB840" strokeWidth="2" />
        <rect x="10" y="12" width="32" height="34" rx="2" fill="#7DB840" opacity="0.85" />
        <rect x="46" y="12" width="32" height="34" rx="2" fill="#7DB840" opacity="0.7" />
        <rect x="82" y="12" width="28" height="34" rx="2" fill="#7DB840" opacity="0.55" />
        <rect x="10" y="56" width="100" height="36" rx="3" fill="#0f172a" />
        <text x="60" y="72" textAnchor="middle" fontSize="9" fill="#7DB840" fontFamily="monospace">TIME-OF-USE</text>
        <text x="60" y="86" textAnchor="middle" fontSize="11" fill="white" fontFamily="monospace" fontWeight="bold">ARBITRAGE</text>
      </g>

      {/* Flow arrow building <-> bess */}
      <path
        className="flow-arrow"
        d="M 230 220 Q 260 240 280 250"
        fill="none"
        stroke="#7DB840"
        strokeWidth="2.5"
        strokeDasharray="10 10"
        opacity="0.9"
      />

      {/* Time-of-use chart (right) */}
      <g transform="translate(440, 60)">
        <text x="0" y="-10" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">24-HR LOAD CURVE</text>

        {/* Axes */}
        <line x1="0" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="180" stroke="#cbd5e1" strokeWidth="1" />

        {/* Y label */}
        <text x="-8" y="10" fontSize="8" fill="#94a3b8" fontFamily="monospace" textAnchor="end">kW</text>

        {/* X labels */}
        <text x="0" y="195" fontSize="8" fill="#94a3b8" fontFamily="monospace">00</text>
        <text x="95" y="195" fontSize="8" fill="#94a3b8" fontFamily="monospace">06</text>
        <text x="190" y="195" fontSize="8" fill="#94a3b8" fontFamily="monospace">12</text>
        <text x="285" y="195" fontSize="8" fill="#94a3b8" fontFamily="monospace">18</text>
        <text x="372" y="195" fontSize="8" fill="#94a3b8" fontFamily="monospace">24</text>

        {/* Tariff bands */}
        <rect x="0" y="0" width="100" height="180" fill="#7DB840" opacity="0.06" />
        <text x="50" y="14" fontSize="8" fill="#4f7a1f" textAnchor="middle" fontFamily="monospace">OFF-PEAK</text>

        <rect x="240" y="0" width="100" height="180" fill="#ef4444" opacity="0.08" />
        <text x="290" y="14" fontSize="8" fill="#b91c1c" textAnchor="middle" fontFamily="monospace">PEAK ₹₹₹</text>

        {/* Grid demand curve (dashed red) */}
        <path
          d="M 0 150 Q 30 145 60 130 T 120 80 T 200 50 T 280 30 T 340 50 T 380 90"
          fill="url(#cmGridFill)"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <text x="200" y="38" fontSize="9" fill="#ef4444" textAnchor="middle" fontFamily="monospace">without MPS</text>

        {/* Smoothed curve (solid green) */}
        <path
          d="M 0 110 Q 60 100 120 90 T 240 88 T 380 95"
          fill="url(#cmCurveFill)"
          stroke="#7DB840"
          strokeWidth="2.5"
        />
        <text x="200" y="78" fontSize="9" fill="#4f7a1f" textAnchor="middle" fontFamily="monospace" fontWeight="bold">with NovaBizGuard</text>

        {/* Charge / discharge markers */}
        <g>
          <rect x="20" y="120" width="20" height="60" fill="#7DB840" opacity="0.4" />
          <text x="30" y="115" fontSize="7" textAnchor="middle" fill="#4f7a1f" fontFamily="monospace">CHARGE</text>
        </g>
        <g>
          <rect x="240" y="40" width="80" height="40" fill="#7DB840" opacity="0.5" />
          <text x="280" y="35" fontSize="7" textAnchor="middle" fill="#4f7a1f" fontFamily="monospace">DISCHARGE</text>
        </g>

        {/* Animated time-of-day marker */}
        <line className="tof-marker" x1="0" y1="0" x2="0" y2="180" stroke="#0f172a" strokeWidth="1.5" />
      </g>

      {/* Bottom KPI strip */}
      <g transform="translate(50, 360)">
        <text x="0" y="0" fontSize="10" fill="#475569" fontFamily="monospace">SAVINGS DELTA</text>
        <text x="0" y="22" fontSize="22" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">-35%</text>
        <text x="60" y="22" fontSize="10" fill="#94a3b8" fontFamily="monospace">peak demand charge</text>

        <text x="280" y="0" fontSize="10" fill="#475569" fontFamily="monospace">UPTIME</text>
        <text x="280" y="22" fontSize="22" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">99.99%</text>
        <text x="360" y="22" fontSize="10" fill="#94a3b8" fontFamily="monospace">elevators / HVAC backed</text>

        <text x="600" y="0" fontSize="10" fill="#475569" fontFamily="monospace">PAYBACK</text>
        <text x="600" y="22" fontSize="22" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">4–6 yrs</text>
      </g>
    </svg>
  );
}
