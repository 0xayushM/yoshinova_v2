"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Animated SVG diagram showing energy flow:
 * GRID (peak hours) → MPS → Factory floor (stable supply)
 *
 * Conveys load-shifting + demand charge reduction visually.
 */
export default function IndustrialFlow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      // Animate the flowing dashes along the path
      gsap.to('.flow-dash', {
        strokeDashoffset: -200,
        duration: 2.5,
        repeat: -1,
        ease: 'none',
      });

      // Pulsing factory glow
      gsap.to('.factory-glow', {
        opacity: 0.85,
        scale: 1.04,
        transformOrigin: 'center',
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // MPS pulse
      gsap.to('.bess-pulse', {
        opacity: 0.4,
        scale: 1.08,
        transformOrigin: 'center',
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 900 402"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bessGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DB840" />
            <stop offset="100%" stopColor="#4f7a1f" />
          </linearGradient>
          <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="factoryGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="factoryGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#7DB840" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7DB840" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bessGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#7DB840" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7DB840" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background grid */}
        <pattern id="bgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        </pattern>
        <rect width="900" height="380" fill="url(#bgGrid)" opacity="0.4" />

        {/* GRID tower (left) */}
        <g transform="translate(70, 110)">
          <text x="40" y="-10" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2">GRID</text>
          {/* Pylon */}
          <path d="M 20 20 L 60 20 L 70 160 L 10 160 Z" fill="none" stroke="url(#gridGradient)" strokeWidth="1.5" />
          <line x1="20" y1="60" x2="60" y2="60" stroke="url(#gridGradient)" strokeWidth="1.5" />
          <line x1="18" y1="100" x2="62" y2="100" stroke="url(#gridGradient)" strokeWidth="1.5" />
          <line x1="14" y1="140" x2="66" y2="140" stroke="url(#gridGradient)" strokeWidth="1.5" />
          {/* Cross-arms */}
          <line x1="0" y1="40" x2="80" y2="40" stroke="url(#gridGradient)" strokeWidth="2" />
          <circle cx="0" cy="40" r="3" fill="#475569" />
          <circle cx="80" cy="40" r="3" fill="#475569" />
          <text x="40" y="180" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">PEAK ₹/kWh</text>
        </g>

        {/* MPS unit (center) */}
        <g transform="translate(380, 110)">
          {/* Glow pulse behind */}
          <circle className="bess-pulse" cx="70" cy="80" r="100" fill="url(#bessGlow)" />

          <text x="70" y="-10" textAnchor="middle" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="2" fontWeight="bold">NOVAMAX MPS</text>

          {/* Container outline */}
          <rect x="0" y="10" width="140" height="140" rx="6" fill="white" stroke="url(#bessGradient)" strokeWidth="2" />

          {/* Battery cells */}
          <rect x="14" y="26" width="38" height="50" rx="2" fill="#7DB840" opacity="0.85" />
          <rect x="56" y="26" width="38" height="50" rx="2" fill="#7DB840" opacity="0.7" />
          <rect x="98" y="26" width="28" height="50" rx="2" fill="#7DB840" opacity="0.55" />

          {/* Display */}
          <rect x="14" y="86" width="112" height="50" rx="3" fill="#0f172a" />
          <text x="70" y="104" textAnchor="middle" fontSize="9" fill="#7DB840" fontFamily="monospace">●  CHARGING</text>
          <text x="70" y="122" textAnchor="middle" fontSize="14" fill="white" fontFamily="monospace" fontWeight="bold">87%</text>

          {/* Status LEDs */}
          <circle cx="125" cy="20" r="3" fill="#7DB840">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </circle>

          <text x="70" y="170" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">STORE → DISCHARGE</text>
        </g>

        {/* Factory (right) */}
        <g transform="translate(680, 100)">
          {/* Glow */}
          <circle className="factory-glow" cx="90" cy="90" r="110" fill="url(#factoryGlow)" />

          <text x="90" y="-5" textAnchor="middle" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="2" fontWeight="bold">YOUR FACTORY</text>

          {/* Factory body */}
          <rect x="10" y="80" width="160" height="80" fill="url(#factoryGradient)" />

          {/* Sawtooth roof */}
          <path d="M 10 80 L 30 50 L 50 80 L 70 50 L 90 80 L 110 50 L 130 80 L 150 50 L 170 80 Z" fill="#64748b" />

          {/* Windows on roof */}
          <line x1="20" y1="65" x2="40" y2="65" stroke="#7DB840" strokeWidth="2" opacity="0.9" />
          <line x1="60" y1="65" x2="80" y2="65" stroke="#7DB840" strokeWidth="2" opacity="0.9" />
          <line x1="100" y1="65" x2="120" y2="65" stroke="#7DB840" strokeWidth="2" opacity="0.9" />
          <line x1="140" y1="65" x2="160" y2="65" stroke="#7DB840" strokeWidth="2" opacity="0.9" />

          {/* Smokestack */}
          <rect x="135" y="20" width="14" height="60" fill="#475569" />
          <rect x="133" y="18" width="18" height="6" fill="#334155" />

          {/* Door */}
          <rect x="80" y="125" width="20" height="35" fill="#1e293b" />
          {/* Windows */}
          <rect x="20" y="105" width="14" height="14" fill="#fde68a" opacity="0.9" />
          <rect x="40" y="105" width="14" height="14" fill="#fde68a" opacity="0.9" />
          <rect x="120" y="105" width="14" height="14" fill="#fde68a" opacity="0.9" />
          <rect x="140" y="105" width="14" height="14" fill="#fde68a" opacity="0.9" />

          <text x="90" y="180" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">STABLE 24/7 LOAD</text>
        </g>

        {/* Flow path: GRID -> MPS */}
        <path
          d="M 170 170 Q 270 170 380 190"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />
        <path
          className="flow-dash"
          d="M 170 170 Q 270 170 380 190"
          fill="none"
          stroke="#7DB840"
          strokeWidth="2.5"
          strokeDasharray="14 14"
          opacity="0.9"
        />

        {/* Flow path: MPS -> Factory */}
        <path
          d="M 520 190 Q 600 190 680 190"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />
        <path
          className="flow-dash"
          d="M 520 190 Q 600 190 680 190"
          fill="none"
          stroke="#7DB840"
          strokeWidth="2.5"
          strokeDasharray="14 14"
          opacity="0.9"
        />

        {/* Data labels above flows */}
        <g>
          <rect x="220" y="125" width="100" height="30" rx="4" fill="white" stroke="#e2e8f0" />
          <text x="270" y="142" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">↓ -40% peak</text>
          <text x="270" y="152" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">demand charge</text>
        </g>

        <g>
          <rect x="555" y="125" width="100" height="30" rx="4" fill="white" stroke="#e2e8f0" />
          <text x="605" y="142" textAnchor="middle" fontSize="10" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">⚡ STABLE</text>
          <text x="605" y="152" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">+/- 0.5% Vrms</text>
        </g>

        {/* Bottom legend */}
        <g transform="translate(50, 340)">
          <circle cx="0" cy="0" r="4" fill="#7DB840" />
          <text x="12" y="4" fontSize="10" fill="#475569" fontFamily="monospace">CLEAN POWER</text>

          <line x1="180" y1="0" x2="200" y2="0" stroke="#7DB840" strokeWidth="2" strokeDasharray="6 4" />
          <text x="210" y="4" fontSize="10" fill="#475569" fontFamily="monospace">ACTIVE FLOW</text>

          <text x="700" y="4" fontSize="10" fill="#94a3b8" fontFamily="monospace" textAnchor="end" letterSpacing="2">LIVE LOAD MAP</text>
          <circle cx="710" cy="0" r="3" fill="#7DB840">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
