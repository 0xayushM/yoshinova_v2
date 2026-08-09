"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Residential energy flow:
 * NovaVault dispatches → Home appliances activate in sequence
 * (Light → WiFi → AC → Fridge → Fan).
 * Includes a compact rooftop solar nod + 24-hr load profile.
 */
export default function ResidentialFlow() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Sun rays — slow rotation, kept low-key.
      gsap.to('.res-sun', {
        rotation: 360,
        duration: 40,
        repeat: -1,
        svgOrigin: '90 80',
        ease: 'none',
      });

      // MPS pulsing glow.
      gsap.to('.res-mps-glow', {
        opacity: 0.55,
        scale: 1.06,
        transformOrigin: 'center',
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Always-on dash flow on the sun→roof line (subtle, narrow).
      gsap.to('.res-solar-flow', {
        strokeDashoffset: -120,
        duration: 3.6,
        repeat: -1,
        ease: 'none',
      });

      // Spinning fan blades — slow, only fully visible when fan is on.
      gsap.to('.res-fan-blades', {
        rotation: 360,
        duration: 2.4,
        repeat: -1,
        svgOrigin: '0 0',
        ease: 'none',
      });

      // ── Master appliance-activation timeline ──
      // Story: MPS surges → appliances light up one by one
      // (Light → WiFi → AC → Fridge → Fan), hold, then reset.
      const appliances = [
        '.app-light',
        '.app-wifi',
        '.app-ac',
        '.app-fridge',
        '.app-fan',
      ];

      gsap.set(appliances, { opacity: 0 });
      gsap.set('.res-bess-flow', { strokeDashoffset: 0 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });

      // MPS surge — power line pulses from MPS to home
      tl.to('.res-bess-flow', {
        strokeDashoffset: -80,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Sequence appliances on
      appliances.forEach((cls, i) => {
        tl.to(
          cls,
          { opacity: 1, duration: 0.4, ease: 'power2.out' },
          0.6 + i * 0.45
        );
      });

      // Hold everything on
      tl.to({}, { duration: 1.6 });

      // Fade off all appliances together (cycle reset)
      tl.to(appliances, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 520"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="res-sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="res-mps-glow-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#7DB840" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7DB840" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="res-app-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#7DB840" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7DB840" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="res-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
        <linearGradient id="res-panel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>

      {/* Sun (top-left, low-key) */}
      <g opacity="0.85">
        <circle cx="90" cy="80" r="42" fill="url(#res-sun-glow)" />
        <g className="res-sun">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="90"
              y1="50"
              x2="90"
              y2="44"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${i * 30}, 90, 80)`}
            />
          ))}
        </g>
        <circle cx="90" cy="80" r="14" fill="#fbbf24" />
        <circle cx="90" cy="80" r="9" fill="#fde68a" />
      </g>

      {/* Home with rooftop panels — panels tightened into a single compact cluster */}
      <g transform="translate(180, 60)">
        <text x="170" y="-15" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">YOUR HOME</text>

        {/* Roof */}
        <path d="M 30 100 L 170 30 L 310 100 Z" fill="url(#res-roof)" />

        {/* Rooftop solar — single compact cluster, deliberately understated */}
        <g transform="translate(140, 62)" opacity="0.85">
          <g transform="skewX(-30)">
            <rect x="0" y="0" width="60" height="28" fill="url(#res-panel)" stroke="#0f172a" strokeWidth="0.6" />
            <line x1="0" y1="9" x2="60" y2="9" stroke="#3b82f6" strokeWidth="0.4" opacity="0.5" />
            <line x1="0" y1="19" x2="60" y2="19" stroke="#3b82f6" strokeWidth="0.4" opacity="0.5" />
            <line x1="20" y1="0" x2="20" y2="28" stroke="#3b82f6" strokeWidth="0.4" opacity="0.5" />
            <line x1="40" y1="0" x2="40" y2="28" stroke="#3b82f6" strokeWidth="0.4" opacity="0.5" />
          </g>
        </g>

        {/* Body (cutaway view) */}
        <rect x="40" y="100" width="260" height="140" fill="#fef3c7" stroke="#92400e" strokeWidth="1.2" />

        {/* Interior floor line */}
        <line x1="40" y1="170" x2="300" y2="170" stroke="#92400e" strokeWidth="0.5" opacity="0.4" />

        {/* ─────────── APPLIANCE ROW (cutaway interior) ─────────── */}
        {/* 5 cells of 50w + 2px gaps, starting at x=42 → ends at x=300 */}
        <g>
          {/* 1. LIGHT */}
          <g transform="translate(42, 108)">
            <rect width="50" height="56" fill="#fffbeb" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* OFF (always visible, dim) */}
            <g transform="translate(25, 22)" opacity="0.55">
              <circle cx="0" cy="-3" r="6" fill="none" stroke="#94a3b8" strokeWidth="1" />
              <rect x="-3" y="3" width="6" height="3" fill="#94a3b8" />
              <rect x="-2" y="6" width="4" height="2" fill="#475569" />
            </g>
            {/* ON overlay */}
            <g className="app-light">
              <circle cx="25" cy="22" r="18" fill="url(#res-app-glow)" />
              <g transform="translate(25, 22)">
                <circle cx="0" cy="-3" r="6" fill="#fde68a" stroke="#92400e" strokeWidth="1" />
                <rect x="-3" y="3" width="6" height="3" fill="#92400e" />
                <rect x="-2" y="6" width="4" height="2" fill="#0f172a" />
                {/* glow rays */}
                <line x1="0" y1="-12" x2="0" y2="-15" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
                <line x1="-9" y1="-3" x2="-12" y2="-3" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
                <line x1="9" y1="-3" x2="12" y2="-3" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
                <line x1="-6" y1="-9" x2="-9" y2="-12" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
                <line x1="6" y1="-9" x2="9" y2="-12" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
              </g>
            </g>
            <text x="25" y="50" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="monospace" letterSpacing="1" fontWeight="bold">LIGHT</text>
          </g>

          {/* 2. WIFI */}
          <g transform="translate(94, 108)">
            <rect width="50" height="56" fill="#fffbeb" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* OFF */}
            <g transform="translate(25, 24)" opacity="0.55">
              <circle cx="0" cy="6" r="1.4" fill="#94a3b8" />
              <path d="M -4 2 Q 0 -1 4 2" stroke="#94a3b8" strokeWidth="1.1" fill="none" strokeLinecap="round" />
              <path d="M -7 -1 Q 0 -7 7 -1" stroke="#94a3b8" strokeWidth="1.1" fill="none" strokeLinecap="round" />
              <path d="M -10 -4 Q 0 -13 10 -4" stroke="#94a3b8" strokeWidth="1.1" fill="none" strokeLinecap="round" />
            </g>
            {/* ON */}
            <g className="app-wifi">
              <circle cx="25" cy="22" r="18" fill="url(#res-app-glow)" />
              <g transform="translate(25, 24)">
                <circle cx="0" cy="6" r="1.6" fill="#4f7a1f" />
                <path d="M -4 2 Q 0 -1 4 2" stroke="#4f7a1f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <path d="M -7 -1 Q 0 -7 7 -1" stroke="#4f7a1f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <path d="M -10 -4 Q 0 -13 10 -4" stroke="#4f7a1f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </g>
            </g>
            <text x="25" y="50" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="monospace" letterSpacing="1" fontWeight="bold">WIFI</text>
          </g>

          {/* 3. AC */}
          <g transform="translate(146, 108)">
            <rect width="50" height="56" fill="#fffbeb" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* OFF */}
            <g transform="translate(25, 22)" opacity="0.55">
              <rect x="-12" y="-7" width="24" height="14" rx="1.5" fill="white" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="-10" y1="-3" x2="10" y2="-3" stroke="#94a3b8" strokeWidth="0.5" />
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="0.5" />
              <line x1="-10" y1="3" x2="10" y2="3" stroke="#94a3b8" strokeWidth="0.5" />
            </g>
            {/* ON */}
            <g className="app-ac">
              <circle cx="25" cy="22" r="20" fill="url(#res-app-glow)" />
              <g transform="translate(25, 22)">
                <rect x="-12" y="-7" width="24" height="14" rx="1.5" fill="white" stroke="#4f7a1f" strokeWidth="1" />
                <line x1="-10" y1="-3" x2="10" y2="-3" stroke="#4f7a1f" strokeWidth="0.7" />
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#4f7a1f" strokeWidth="0.7" />
                <line x1="-10" y1="3" x2="10" y2="3" stroke="#4f7a1f" strokeWidth="0.7" />
                {/* cool air puff */}
                <path d="M -8 9 Q -6 12 -4 9" stroke="#7DB840" strokeWidth="0.8" fill="none" opacity="0.7" />
                <path d="M -2 11 Q 0 14 2 11" stroke="#7DB840" strokeWidth="0.8" fill="none" opacity="0.7" />
                <path d="M 4 9 Q 6 12 8 9" stroke="#7DB840" strokeWidth="0.8" fill="none" opacity="0.7" />
              </g>
            </g>
            <text x="25" y="50" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="monospace" letterSpacing="1" fontWeight="bold">AC</text>
          </g>

          {/* 4. FRIDGE */}
          <g transform="translate(198, 108)">
            <rect width="50" height="56" fill="#fffbeb" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* OFF */}
            <g transform="translate(25, 22)" opacity="0.55">
              <rect x="-7" y="-11" width="14" height="22" rx="1" fill="white" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="-7" y1="-4" x2="7" y2="-4" stroke="#94a3b8" strokeWidth="0.6" />
              <rect x="4" y="-9" width="0.8" height="3" fill="#94a3b8" />
              <rect x="4" y="-1" width="0.8" height="6" fill="#94a3b8" />
            </g>
            {/* ON */}
            <g className="app-fridge">
              <circle cx="25" cy="22" r="20" fill="url(#res-app-glow)" />
              <g transform="translate(25, 22)">
                <rect x="-7" y="-11" width="14" height="22" rx="1" fill="white" stroke="#4f7a1f" strokeWidth="1" />
                <line x1="-7" y1="-4" x2="7" y2="-4" stroke="#4f7a1f" strokeWidth="0.7" />
                <rect x="4" y="-9" width="0.8" height="3" fill="#4f7a1f" />
                <rect x="4" y="-1" width="0.8" height="6" fill="#4f7a1f" />
                {/* tiny indicator LED */}
                <circle cx="-3" cy="-7" r="0.7" fill="#7DB840" />
              </g>
            </g>
            <text x="25" y="50" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="monospace" letterSpacing="1" fontWeight="bold">FRIDGE</text>
          </g>

          {/* 5. FAN */}
          <g transform="translate(250, 108)">
            <rect width="50" height="56" fill="#fffbeb" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* OFF */}
            <g transform="translate(25, 22)" opacity="0.55">
              <circle cx="0" cy="0" r="11" fill="white" stroke="#94a3b8" strokeWidth="0.8" />
              <ellipse cx="0" cy="-5" rx="1.4" ry="3.5" fill="#94a3b8" />
              <ellipse cx="0" cy="5" rx="1.4" ry="3.5" fill="#94a3b8" />
              <ellipse cx="-5" cy="0" rx="3.5" ry="1.4" fill="#94a3b8" />
              <ellipse cx="5" cy="0" rx="3.5" ry="1.4" fill="#94a3b8" />
              <circle cx="0" cy="0" r="1.4" fill="#475569" />
            </g>
            {/* ON */}
            <g className="app-fan">
              <circle cx="25" cy="22" r="20" fill="url(#res-app-glow)" />
              <g transform="translate(25, 22)">
                <circle cx="0" cy="0" r="11" fill="white" stroke="#4f7a1f" strokeWidth="1" />
                <g className="res-fan-blades">
                  <ellipse cx="0" cy="-5" rx="1.6" ry="3.8" fill="#4f7a1f" opacity="0.85" />
                  <ellipse cx="0" cy="5" rx="1.6" ry="3.8" fill="#4f7a1f" opacity="0.85" />
                  <ellipse cx="-5" cy="0" rx="3.8" ry="1.6" fill="#4f7a1f" opacity="0.85" />
                  <ellipse cx="5" cy="0" rx="3.8" ry="1.6" fill="#4f7a1f" opacity="0.85" />
                </g>
                <circle cx="0" cy="0" r="1.6" fill="#0f172a" />
              </g>
            </g>
            <text x="25" y="50" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="monospace" letterSpacing="1" fontWeight="bold">FAN</text>
          </g>
        </g>

        {/* Door */}
        <rect x="155" y="180" width="30" height="60" fill="#7c2d12" />
        <circle cx="178" cy="210" r="1.5" fill="#fbbf24" />

        {/* "POWERED BY NOVAVAULT" stamp */}
        <text x="170" y="258" textAnchor="middle" fontSize="8" fill="#4f7a1f" fontFamily="monospace" letterSpacing="2" fontWeight="bold">
          ● POWERED BY NOVAVAULT
        </text>

        {/* Yard */}
        <line x1="0" y1="240" x2="340" y2="240" stroke="#475569" strokeWidth="1" />
        {/* Tree */}
        <circle cx="20" cy="220" r="14" fill="#16a34a" />
        <rect x="18" y="228" width="3" height="12" fill="#7c2d12" />

        {/* EV in driveway */}
        <g transform="translate(260, 220)">
          <rect x="0" y="0" width="44" height="14" rx="3" fill="#0f172a" />
          <rect x="6" y="-8" width="32" height="10" rx="2" fill="#1e293b" />
          <circle cx="10" cy="14" r="4" fill="#1e293b" />
          <circle cx="34" cy="14" r="4" fill="#1e293b" />
          <text x="22" y="-12" textAnchor="middle" fontSize="6" fill="#7DB840" fontFamily="monospace">EV</text>
        </g>
      </g>

      {/* NovaVault MPS unit (right of home, garage-style) */}
      <g transform="translate(620, 130)">
        <circle className="res-mps-glow" cx="60" cy="55" r="80" fill="url(#res-mps-glow-grad)" />
        <text x="60" y="-12" textAnchor="middle" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="2" fontWeight="bold">NOVAVAULT</text>

        {/* Wall-mounted unit */}
        <rect x="0" y="0" width="120" height="110" rx="10" fill="white" stroke="#7DB840" strokeWidth="2" />

        {/* Top status bar */}
        <rect x="10" y="10" width="100" height="6" rx="2" fill="#e2e8f0" />
        <rect x="10" y="10" width="78" height="6" rx="2" fill="#7DB840" />

        {/* Battery cells */}
        <rect x="14" y="24" width="28" height="40" rx="2" fill="#7DB840" opacity="0.85" />
        <rect x="46" y="24" width="28" height="40" rx="2" fill="#7DB840" opacity="0.7" />
        <rect x="78" y="24" width="28" height="40" rx="2" fill="#7DB840" opacity="0.55" />

        {/* Display */}
        <rect x="14" y="72" width="92" height="28" rx="2" fill="#0f172a" />
        <text x="60" y="86" textAnchor="middle" fontSize="9" fill="#7DB840" fontFamily="monospace">●  HOME MODE</text>
        <text x="60" y="96" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">78% • 9.4 kWh</text>

        <text x="60" y="130" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">wall-mounted • silent</text>
      </g>

      {/* Flow paths */}
      {/* Sun → roof panels (subtle background flow) */}
      <path
        className="res-solar-flow"
        d="M 130 90 L 280 105"
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        fill="none"
        opacity="0.45"
      />

      {/* MPS → Home — primary power delivery line, animated by master timeline */}
      <path
        className="res-bess-flow"
        d="M 620 200 Q 560 200 480 200"
        stroke="#7DB840"
        strokeWidth="3"
        strokeDasharray="10 6"
        fill="none"
      />

      {/* Bottom 24-hr profile */}
      <g transform="translate(60, 372)">
        <text x="0" y="-10" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">A DAY IN YOUR HOME</text>

        {/* Axes */}
        <line x1="0" y1="80" x2="780" y2="80" stroke="#cbd5e1" strokeWidth="1" />

        {/* Day band */}
        <rect x="160" y="0" width="380" height="80" fill="#fef3c7" opacity="0.4" />
        <text x="350" y="14" fontSize="9" fill="#a16207" textAnchor="middle" fontFamily="monospace">SOLAR ACTIVE — STORE EXCESS</text>

        {/* Evening peak band */}
        <rect x="540" y="0" width="200" height="80" fill="#7DB840" opacity="0.06" />
        <text x="640" y="14" fontSize="9" fill="#4f7a1f" textAnchor="middle" fontFamily="monospace">EVENING — DISCHARGE STORED</text>

        {/* Solar gen curve */}
        <path
          d="M 0 80 L 130 80 Q 200 80 240 35 Q 350 0 470 35 Q 530 80 600 80 L 780 80"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2.5"
        />

        {/* Home consumption curve */}
        <path
          d="M 0 60 Q 80 70 160 55 Q 240 50 320 60 Q 400 65 500 50 Q 580 25 650 30 Q 720 50 780 60"
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.7"
        />

        {/* Hour labels */}
        <text x="0" y="95" fontSize="8" fill="#94a3b8" fontFamily="monospace">00</text>
        <text x="195" y="95" fontSize="8" fill="#94a3b8" fontFamily="monospace">06</text>
        <text x="390" y="95" fontSize="8" fill="#94a3b8" fontFamily="monospace">12</text>
        <text x="585" y="95" fontSize="8" fill="#94a3b8" fontFamily="monospace">18</text>
        <text x="775" y="95" fontSize="8" fill="#94a3b8" fontFamily="monospace">24</text>

        {/* Legend */}
        <g transform="translate(0, 110)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#fbbf24" strokeWidth="2.5" />
          <text x="26" y="4" fontSize="10" fill="#475569" fontFamily="monospace">SOLAR GEN</text>

          <line x1="160" y1="0" x2="180" y2="0" stroke="#0f172a" strokeWidth="2" strokeDasharray="3 3" />
          <text x="186" y="4" fontSize="10" fill="#475569" fontFamily="monospace">HOME LOAD</text>

          <text x="780" y="4" fontSize="11" fill="#4f7a1f" textAnchor="end" fontFamily="monospace" fontWeight="bold">~50% BILL REDUCTION</text>
        </g>
      </g>
    </svg>
  );
}
