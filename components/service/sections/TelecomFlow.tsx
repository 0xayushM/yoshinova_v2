"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Telecom tower with MPS at base. Diesel generator crossed out, MPS pulses.
 * Signal waves emanate from tower top.
 */
export default function TelecomFlow() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.signal-wave',
        { opacity: 0.8, scale: 0.6 },
        {
          opacity: 0,
          scale: 1.6,
          duration: 2.5,
          repeat: -1,
          stagger: 0.8,
          transformOrigin: '420px 80px',
          ease: 'sine.out',
        }
      );

      gsap.to('.tower-blink', {
        opacity: 0.3,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to('.power-flow', {
        strokeDashoffset: -120,
        duration: 1.8,
        repeat: -1,
        ease: 'none',
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 422"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="towerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Signal waves */}
      <g>
        {Array.from({ length: 4 }).map((_, i) => (
          <circle
            key={i}
            className="signal-wave"
            cx="420"
            cy="80"
            r="40"
            fill="none"
            stroke="#7DB840"
            strokeWidth="2"
            opacity="0.7"
          />
        ))}
      </g>

      {/* Diesel generator (crossed out) */}
      <g transform="translate(80, 170)" opacity="0.55">
        <text x="60" y="-12" textAnchor="middle" fontSize="11" fill="#dc2626" fontFamily="monospace" letterSpacing="2" fontWeight="bold">DIESEL GEN</text>
        <rect x="0" y="0" width="120" height="80" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <rect x="10" y="14" width="100" height="40" rx="2" fill="#fca5a5" />
        <circle cx="30" cy="34" r="8" fill="#7f1d1d" />
        <circle cx="30" cy="34" r="3" fill="#fca5a5" />
        <rect x="50" y="22" width="50" height="6" fill="#7f1d1d" />
        <rect x="50" y="34" width="50" height="6" fill="#7f1d1d" />
        {/* Smokestack */}
        <rect x="92" y="-12" width="10" height="14" fill="#374151" />
        {/* X mark */}
        <line x1="-10" y1="-10" x2="130" y2="90" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="130" y1="-10" x2="-10" y2="90" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
        <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="monospace">noisy. polluting. costly.</text>
      </g>

      {/* MPS unit (replaces diesel) */}
      <g transform="translate(260, 170)">
        <text x="60" y="-12" textAnchor="middle" fontSize="11" fill="#4f7a1f" fontFamily="monospace" letterSpacing="2" fontWeight="bold">NOVACONNECT</text>
        <rect x="0" y="0" width="120" height="80" rx="4" fill="white" stroke="#7DB840" strokeWidth="2" />
        <rect x="8" y="12" width="32" height="32" rx="2" fill="#7DB840" opacity="0.85" />
        <rect x="44" y="12" width="32" height="32" rx="2" fill="#7DB840" opacity="0.7" />
        <rect x="80" y="12" width="32" height="32" rx="2" fill="#7DB840" opacity="0.55" />
        <rect x="8" y="50" width="104" height="22" rx="2" fill="#0f172a" />
        <text x="60" y="64" textAnchor="middle" fontSize="9" fill="#7DB840" fontFamily="monospace">●  STANDBY READY</text>
        <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">silent. clean. instant.</text>
      </g>

      {/* Cell tower */}
      <g transform="translate(380, 60)">
        {/* Antennas at top */}
        <rect x="35" y="0" width="2" height="20" fill="url(#towerGrad)" />
        <rect x="40" y="0" width="2" height="20" fill="url(#towerGrad)" />
        <rect x="45" y="0" width="2" height="20" fill="url(#towerGrad)" />
        <rect x="22" y="20" width="42" height="6" fill="#475569" />

        {/* Tower struts */}
        <path d="M 30 28 L 14 240 L 70 240 L 54 28 Z" fill="none" stroke="url(#towerGrad)" strokeWidth="1.5" />
        {/* Cross bracing */}
        {Array.from({ length: 8 }).map((_, i) => {
          const y1 = 28 + i * 26;
          const y2 = y1 + 13;
          const xLeft1 = 30 - i * 1.6;
          const xLeft2 = 30 - (i + 0.5) * 1.6;
          const xRight1 = 54 + i * 1.6;
          const xRight2 = 54 + (i + 0.5) * 1.6;
          return (
            <g key={i}>
              <line x1={xLeft1} y1={y1} x2={xRight1} y2={y1} stroke="url(#towerGrad)" strokeWidth="1" />
              <line x1={xLeft1} y1={y1} x2={xRight2} y2={y2} stroke="url(#towerGrad)" strokeWidth="1" />
              <line x1={xRight1} y1={y1} x2={xLeft2} y2={y2} stroke="url(#towerGrad)" strokeWidth="1" />
            </g>
          );
        })}

        {/* Equipment box mid */}
        <rect x="22" y="120" width="40" height="22" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <circle className="tower-blink" cx="32" cy="131" r="2.5" fill="#7DB840" />
        <circle className="tower-blink" cx="42" cy="131" r="2.5" fill="#fbbf24" />
        <circle className="tower-blink" cx="52" cy="131" r="2.5" fill="#3b82f6" />

        {/* Base */}
        <rect x="6" y="240" width="72" height="8" fill="#475569" />

        <text x="42" y="270" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">CELL TOWER</text>
        <text x="42" y="284" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">99.9% UPTIME</text>
      </g>

      {/* Power flow MPS -> Tower */}
      <path
        className="power-flow"
        d="M 380 220 L 410 200"
        fill="none"
        stroke="#7DB840"
        strokeWidth="3"
        strokeDasharray="8 6"
      />

      {/* Network grid (right) — connected sites */}
      <g transform="translate(540, 80)">
        <text x="120" y="-10" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace" letterSpacing="2" fontWeight="bold">REMOTE FLEET</text>
        <text x="120" y="6" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">monitored 24/7</text>

        {/* Site grid */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => {
            const x = col * 42;
            const y = 24 + row * 36;
            const status = (row + col) % 5;
            const color =
              status === 0 ? '#dc2626' : status === 1 ? '#fbbf24' : '#7DB840';
            return (
              <g key={`${row}-${col}`}>
                <rect x={x} y={y} width={32} height={28} rx="3" fill="white" stroke={color} strokeWidth="1.2" />
                <circle cx={x + 8} cy={y + 8} r="2" fill={color} />
                <line x1={x + 6} y1={y + 16} x2={x + 26} y2={y + 16} stroke={color} strokeWidth="0.8" opacity="0.5" />
                <line x1={x + 6} y1={y + 20} x2={x + 22} y2={y + 20} stroke={color} strokeWidth="0.8" opacity="0.5" />
              </g>
            );
          })
        )}

        {/* Legend */}
        <g transform="translate(0, 200)">
          <circle cx="6" cy="0" r="4" fill="#7DB840" />
          <text x="14" y="4" fontSize="9" fill="#475569" fontFamily="monospace">ONLINE</text>
          <circle cx="86" cy="0" r="4" fill="#fbbf24" />
          <text x="94" y="4" fontSize="9" fill="#475569" fontFamily="monospace">CHARGING</text>
          <circle cx="186" cy="0" r="4" fill="#dc2626" />
          <text x="194" y="4" fontSize="9" fill="#475569" fontFamily="monospace">ATTENTION</text>
        </g>
      </g>

      {/* Bottom KPI strip */}
      <g transform="translate(60, 360)">
        <text x="0" y="0" fontSize="20" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">99.9%</text>
        <text x="0" y="14" fontSize="9" fill="#94a3b8" fontFamily="monospace">UPTIME</text>

        <text x="180" y="0" fontSize="20" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">-70%</text>
        <text x="180" y="14" fontSize="9" fill="#94a3b8" fontFamily="monospace">OPEX vs DIESEL</text>

        <text x="380" y="0" fontSize="20" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">0 dB</text>
        <text x="380" y="14" fontSize="9" fill="#94a3b8" fontFamily="monospace">NOISE EMITTED</text>

        <text x="560" y="0" fontSize="20" fill="#4f7a1f" fontFamily="monospace" fontWeight="bold">&lt; 20 ms</text>
        <text x="560" y="14" fontSize="9" fill="#94a3b8" fontFamily="monospace">FAILOVER</text>
      </g>
    </svg>
  );
}
