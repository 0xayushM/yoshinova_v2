"use client";

import Image from 'next/image';
import { useState } from 'react';
import ContactDialog from '@/components/ContactDialog';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceFooter from '@/components/service/ServiceFooter';

import AuditFlow from '@/components/service/sections/AuditFlow';
import MarketInsight from '@/components/service/sections/MarketInsight';
import UseCaseGrid from '@/components/service/sections/UseCaseGrid';
import HowItWorks from '@/components/service/sections/HowItWorks';
import LiveMetricGraph from '@/components/service/sections/LiveMetricGraph';
import Breadcrumbs from '@/components/Breadcrumbs';

const auditUseCases = [
  {
    number: 'Audit 01',
    title: 'MSME Manufacturing Units',
    description:
      "Older motors, sub-optimal layouts, contracted-load drift. We find the 18–25% of bill that's leaking through equipment you've stopped looking at.",
    metric: '-22%',
    metricLabel: 'avg bill cut',
  },
  {
    number: 'Audit 02',
    title: 'Commercial Buildings',
    description:
      'HVAC oversizing, lighting waste, lift cycling, idle UPS. We map every kVA and rank fixes by ROI — not by capex.',
    metric: '-18%',
    metricLabel: 'avg bill cut',
  },
  {
    number: 'Audit 03',
    title: 'Telecom & Data Sites',
    description:
      'Cooling efficiency, rectifier losses, idle radios. We benchmark you against best-in-class fleets and show the gap.',
    metric: 'PUE 1.4',
    metricLabel: 'achievable target',
  },
  {
    number: 'Audit 04',
    title: 'Pre-MPS Sizing Audit',
    description:
      "Before you buy a kWh of storage — we measure 30 days of real load. The difference between guessed and audited sizing is usually 30–40%.",
    metric: '30 days',
    metricLabel: 'load logged',
  },
  {
    number: 'Audit 05',
    title: 'Power-quality Forensics',
    description:
      'Tripping VFDs, cooked PCBs, mystery downtime. We chase harmonics, voltage sags, and earth leakage to root cause.',
    metric: '±0.5%',
    metricLabel: 'voltage tolerance',
  },
  {
    number: 'Audit 06',
    title: 'BEE / PAT Compliance',
    description:
      "Designated consumers under BEE\'s Perform-Achieve-Trade scheme. We deliver compliance-ready audit reports and ESCert pathways.",
    metric: 'BEE',
    metricLabel: 'accredited format',
  },
];

const auditSteps = [
  {
    number: '01',
    title: 'On-Site Walkthrough',
    description:
      'Our Chief Energy Advisor visits your facility — meter rooms, motors, panels, HVAC. No template — every site gets a fresh read by senior engineers.',
  },
  {
    number: '02',
    title: 'Power-Quality Logging',
    description:
      'Class-A power analysers logged for 7–30 days. We capture real load, harmonics, voltage events, peak demand profile and reactive draw across phases.',
  },
  {
    number: '03',
    title: 'Loss Identification',
    description:
      "We isolate every loss — motor inefficiency, transformer copper/iron, idle phantom load, reactive penalties — and quantify each one in ₹/month.",
  },
  {
    number: '04',
    title: 'Optimisation Roadmap',
    description:
      "You receive a prioritised, ROI-ranked action plan. Quick wins first, capex projects costed and timed. MPS sizing — if relevant — is data-driven, not guessed.",
  },
];

export default function EnergyAuditPage() {
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false);

  return (
    <>
      <div className="absolute inset-x-0 top-0 z-30 mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:px-10 lg:px-14">
        <Breadcrumbs
          tone="paper"
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Energy Audit' },
          ]}
        />
      </div>
      <main className="relative min-h-screen bg-[#0a0a0a]">

        <ServiceHero
          title="ENERGY AUDIT"
          heroImage="/images/energy-audit.webp"
          heroDescription="We uncover what your energy bill is hiding. A comprehensive floor audit that delivers real savings — fast."
          serviceNumber="01"
        />

        {/* INTRO + Audit flow diagram */}
        <section className="relative w-full bg-white px-6 md:px-14 py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-20">
              <div className="md:col-span-5">
                <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
                  Energy Audit — Yoshinova
                </p>
                <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                  Your floor is bleeding money. <span className="text-[#6A9F30]">We find exactly where.</span>
                </h2>
                <p className="text-black/65 text-base md:text-lg leading-relaxed mb-6">
                  Most facilities lose 10–25% of their energy to inefficiencies they can&apos;t see — poor power factor, oversized motors at partial load, phantom draws, and reactive penalties silently inflating the bill. Our audit gives you a precise, data-backed map of every leak. Before you invest in any solution — MPS, solar, retrofit — you know exactly what it will save.
                </p>
              </div>

              <div className="md:col-span-7 md:pl-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Typical bill cut</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">10–25%</p>
                    <p className="text-xs text-black/50 mt-1">post-audit, no capex needed</p>
                  </div>
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Logging window</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">7–30 d</p>
                    <p className="text-xs text-black/50 mt-1">class-A analysers</p>
                  </div>
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Time to first ₹ saved</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">~30 d</p>
                    <p className="text-xs text-black/50 mt-1">from audit kickoff</p>
                  </div>
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Sizing accuracy</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">±5%</p>
                    <p className="text-xs text-black/50 mt-1">vs. nameplate-based ±35%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit flow diagram */}
            <div>
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em]">
                  Measure → Map → Quantify
                </p>
                <p className="text-black/40 text-xs uppercase tracking-widest hidden md:block">
                  Live audit dashboard
                </p>
              </div>
              <div className="bg-[#f8fafc] border border-black/[0.06] p-4 md:p-8">
                <AuditFlow />
              </div>
            </div>
          </div>
        </section>

        {/* MARKET INSIGHT */}
        <MarketInsight
          eyebrow="Why an audit first"
          title="An un-audited MPS purchase is a guess"
          intro="The single largest reason MPS projects underperform in India is wrong sizing. Most installers quote based on connected load, sanctioned demand or nameplate ratings — which over-state real consumption by 25–40%. An audit first makes every rupee of subsequent capex defensible."
          marketSize={{
            value: '10–25%',
            label: 'Typical waste in MSME bills',
            sub: 'Recoverable through audit + low-capex fixes alone.',
          }}
          growth={{
            value: '±5%',
            label: 'MPS sizing accuracy',
            sub: 'Audit-driven sizing vs. ±35% on nameplate-based.',
          }}
          keyDriver={{
            title: 'BEE PAT-VIII (2025–28) makes audits compulsory.',
            description:
              "Designated consumers under BEE\'s Perform-Achieve-Trade scheme must now log a third-party energy audit each cycle. Yoshinova\'s audit format is BEE-aligned — your audit doubles as compliance and as an action plan.",
          }}
          bullets={[
            'India\'s Energy Conservation (Amendment) Act, 2022 expanded mandatory audit coverage to mid-tier industries — most MSMEs don\'t know they\'re in scope.',
            'PAT-VIII targets demand 1–4% energy intensity reduction over 3 years — un-audited facilities miss targets and pay through ESCert deficit.',
            'Pre-MPS audits return their own cost in <60 days through low-capex fixes — long before any storage is deployed.',
          ]}
        />

        {/* LIVE METRIC GRAPH */}
        <LiveMetricGraph
          eyebrow="Live audit overlay"
          title="Where exactly your bill leaks."
          subtitle="Red is your raw metered draw. Green is what your floor actually needs. The gap — every hour — is wasted rupees we can recover."
          yUnit="kW"
          theme="light"
          series={[
            {
              label: 'Metered draw',
              color: '#ef4444',
              dashed: true,
              values: [0.32, 0.32, 0.34, 0.36, 0.42, 0.62, 0.78, 0.86, 0.9, 0.86, 0.84, 0.94, 0.98, 0.92, 0.86, 0.84, 0.82, 0.7, 0.58, 0.5, 0.46, 0.42, 0.38, 0.34, 0.32],
            },
            {
              label: 'Productive load',
              color: '#7DB840',
              fill: true,
              values: [0.18, 0.18, 0.18, 0.2, 0.28, 0.46, 0.6, 0.66, 0.7, 0.68, 0.66, 0.74, 0.78, 0.74, 0.7, 0.68, 0.64, 0.54, 0.42, 0.34, 0.3, 0.26, 0.22, 0.2, 0.18],
            },
          ]}
          callouts={[
            { label: 'Recoverable waste', value: '23%', sub: 'of monthly kWh on this floor' },
            { label: 'Power factor', value: '0.78', sub: 'reactive penalty zone — fixable' },
            { label: 'ROI on audit', value: '< 60 d', sub: 'before any capex investment' },
          ]}
        />

        {/* USE CASES */}
        <UseCaseGrid
          eyebrow="Where audits land hardest"
          title="Audit-first across every vertical"
          description="We do not start with a product — we start with your meter. Here\'s where our audits typically uncover the biggest deltas, by sector."
          cases={auditUseCases}
          bgClass="bg-white"
          textColor="dark"
        />

        {/* HOW IT WORKS */}
        <HowItWorks
          eyebrow="Process"
          title="From meter to a costed roadmap"
          steps={auditSteps}
        />

        {/* HERO IMAGE BAND */}
        <section className="relative w-full h-[60vh] overflow-hidden">
          <Image
            src="/images/industrial2.webp"
            alt="Audit on factory floor"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 md:px-14 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto">
              <p className="text-[#7DB840] text-xs uppercase tracking-[0.3em] mb-3">
                Audit-first, always
              </p>
              <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-medium uppercase max-w-3xl leading-tight">
                Personally led by our Chief Energy Advisor — no juniors, no guesswork.
              </h3>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-black px-6 md:px-14 py-24 md:py-32 text-center">
          <p className="text-[#6A9F30] text-xs uppercase tracking-widest mb-4">
            Get Started
          </p>
          <h2 className="text-white text-3xl md:text-6xl font-bold uppercase tracking-tight mb-6">
            Ready to stop the bleed?
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10">
            Book a no-obligation energy audit and find out exactly how much your facility is leaving on the table.
          </p>
          <button
            onClick={() => setIsAuditDialogOpen(true)}
            className="btn btn--primary"
          >
            Book Your Audit
          </button>
        </section>

        <ServiceFooter />

      </main>

      <ContactDialog
        isOpen={isAuditDialogOpen}
        onClose={() => setIsAuditDialogOpen(false)}
        type="energy-audit"
      />
    </>
  );
}
