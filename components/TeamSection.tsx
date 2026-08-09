'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    id: 'sandeep',
    index: '01',
    name: 'Sandeep Agarwal',
    role: 'Founder & CEO',
    quote: 'No facility owner should buy a MPS on a promise. Buy it on data — your data, from your facility.',
    image: '/team/sandeep_agarwal.webp',
    bio: 'Sandeep brings over 21 years of hands-on experience in precision engineering as CEO of Vinayak Technoplast — a Tier-1 manufacturing partner to Maruti Suzuki, Hyundai, RR Kabel, and leading OEMs across the automotive, pharma, kitchenware, and electrical sectors. At Vinayak, he built the company\'s reputation not on the cheapest price, but on the lowest failure rate — diagnosing root causes of failure and engineering reliability into every tool, every part, and every cycle. He brings the same engineering-first discipline to Yoshinova: every MPS deployment is sized from real facility data, every component specified for reliability, and every commitment backed by measurable performance — never projection.',
    featured: true,
  },
  {
    id: 'sunny',
    index: '02',
    name: 'Sunny Kalra',
    role: 'Chief Growth Strategist',
    quote: 'Growth that doesn\'t create retention isn\'t growth worth having.',
    image: '/team/sunny_kalra.webp',
    bio: 'Sunny is the CEO of KBrushes and serves as Chief Growth Strategist at both Vinayak Technoplast and Yoshinova. Over the last decade he has driven strategic expansion and business development across the automotive, medical, electrical, and consumer goods sectors — establishing the key OEM partnerships that have positioned Vinayak Technoplast as a preferred Tier-1 partner in each of those industries. At Yoshinova, he shapes how the business grows: which clients we pursue, how we position our offering, and how we build relationships that generate long-term value rather than single transactions.',
    featured: true,
  },
  {
    id: 'mohit',
    index: '03',
    name: 'Mohit Bansal',
    role: 'CFO',
    quote: 'Good financial engineering should make the right decision easier, not harder.',
    image: '/team/mohit_bansal.webp',
    bio: 'Mohit is a qualified Chartered Accountant with 15 years of experience as CFO of LFC PowerCab, where he has overseen financial strategy alongside the development of battery systems and wire harnessing for industrial applications. His rare combination of deep financial discipline and ground-level familiarity with battery and power-component manufacturing makes him uniquely positioned to structure MPS deployments that work financially for the facility owner — not just the installer. At Yoshinova, Mohit ensures every project is structured so clients can fund their installations from the savings the system generates, turning energy storage from a capital expense into an operating return.',
    featured: true,
  },
  {
    id: 'sambhav',
    index: '04',
    name: 'Sambhav Chadha',
    role: 'COO',
    quote: 'Every timeline and quality commitment Yoshinova makes is ultimately mine to deliver.',
    image: '/team/sambhav_chadda.webp',
    bio: 'Sambhav brings nearly a decade of OEM-grade quality and manufacturing operations experience from Stellantis and FCA Fiat Chrysler at the Warren Truck Assembly Plant, where he served as Lead Product Quality Engineer. He led a team of nine engineers through the launch of the Jeep Grand Wagoneer and owned product quality across chassis, electrical, propulsions, and ADAS systems for the RAM 1500 — which earned Motor Trend Truck of the Year and a 1st-Quartile JD Power ranking on his watch. His career has been built on FMEA, root-cause analysis, lean manufacturing, and serving as the Voice of the Customer on the assembly line. He now brings that same OEM-grade discipline to Yoshinova — every audit, every installation, and every post-deployment SLA held to the standards a vehicle is signed off on.',
    featured: true,
  },
  {
    id: 'shourya',
    index: '05',
    name: 'Shourya K. Chirania',
    role: 'CTO',
    quote: 'If the system isn\'t performing exactly as the audit predicted, the audit wasn\'t done properly.',
    image: '/team/shourya_k_chirania.webp',
    bio: 'Shourya brings 2.5 years of engineering experience at JPMorgan Chase, where he worked on mission-critical systems where uptime, accuracy, and data integrity were non-negotiable. He brings the same standards to Yoshinova as CTO — overseeing system integration, hardware selection, deployment quality, and the real-time monitoring platform that gives clients live visibility into savings capture. He developed the proprietary load analysis methodology behind Yoshinova\'s data-driven sizing process, ensuring every system performs exactly as the audit predicted — measured, not promised.',
    featured: true,
  },

];

export default function TeamSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-[#080808] relative overflow-hidden">

      {/* ── Section header ── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-10 lg:px-14 pt-16 md:pt-24 lg:pt-28">
        <p className="text-[#6A9F30] text-[11px] font-semibold uppercase tracking-[0.22em] mb-4 md:mb-5">
          The Team
        </p>
        <h2 className="text-white font-light leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)' }}>
          Every person here has stood on a factory floor<br className="hidden md:block" />
          <span className="text-[#6A9F30]"> and fixed real problems.</span>
        </h2>
      </div>

      {/* ── Roster ── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-10 lg:px-14 mt-12 md:mt-16 pb-16 md:pb-24">

        {/* ─────────── ALL TEAM MEMBERS ─────────── */}
        {teamMembers.map(member => {
          const active = hoveredId === member.id;
          return (
            <div
              key={member.id}
              className="border-t border-white/10 pt-10 md:pt-14 lg:pt-16 pb-12 md:pb-16 lg:pb-20"
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_340px] gap-8 md:gap-10 lg:gap-12 items-end">

                {/* Left — all the text */}
                <div>
                  {/* Role label */}
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.25em] font-semibold mb-4">
                    {member.index} &nbsp;·&nbsp; {member.role}
                  </p>

                  {/* Giant name — split for visual weight */}
                  <div className="mb-8">
                    <h3
                      className="text-white font-light tracking-tight leading-none uppercase"
                      style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                    >
                      {member.name.split(' ')[0]}
                    </h3>
                    <h3
                      className="font-light tracking-tight leading-none uppercase"
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {member.name.split(' ').slice(1).join(' ')}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 mb-8" />

                  {/* Bio */}
                  <p className="text-white/55 leading-[1.8] mb-8"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', maxWidth: '60ch' }}>
                    {member.bio}
                  </p>

                  {/* Pull quote */}
                  <blockquote className="border-l-[3px] border-[#6A9F30] pl-6">
                    <p className="text-white/80 font-light italic leading-snug"
                      style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}>
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* Right — portrait */}
                <div className="relative self-end">
                  <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 42vw, 480px)' }}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      loading="lazy"
                      className="object-contain object-bottom"
                      style={{
                        filter: 'grayscale(0%)',
                        transition: 'filter 0.6s ease, transform 0.6s ease',
                        transform: active ? 'scale(1.03)' : 'scale(1)',
                      }}
                      sizes="340px"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}


        {/* Bottom rule */}
        <div className="border-t border-white/10" />
      </div>
    </section>
  );
}
