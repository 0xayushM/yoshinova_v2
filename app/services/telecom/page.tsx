"use client";

import Image from 'next/image';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceCTA from '@/components/service/ServiceCTA';
import ServiceFooter from '@/components/service/ServiceFooter';

import TelecomFlow from '@/components/service/sections/TelecomFlow';
import MarketInsight from '@/components/service/sections/MarketInsight';
import UseCaseGrid from '@/components/service/sections/UseCaseGrid';
import HowItWorks from '@/components/service/sections/HowItWorks';
import LiveMetricGraph from '@/components/service/sections/LiveMetricGraph';

import telecomData from '@/data/services/telecom.json';
import Breadcrumbs from '@/components/Breadcrumbs';

const telecomUseCases = [
  {
    number: 'Site 01',
    title: 'Macro Sites — Urban',
    description:
      'Dense city loads, frequent micro-cuts, no room for noisy DG. Replace the genset entirely with NovaConnect — silent, always on.',
    metric: '0 dB',
    metricLabel: 'noise emitted',
  },
  {
    number: 'Site 02',
    title: 'Greenfield Rural Towers',
    description:
      'Long grid distances, weak feeders. Solar + NovaConnect runs 18+ hours daily on renewables, cutting diesel runs to seasonal-only.',
    metric: '-85%',
    metricLabel: 'diesel litres',
  },
  {
    number: 'Site 03',
    title: '5G Densification Cells',
    description:
      'Massive MIMO radios pull bursty kW. NovaConnect smooths spikes so the existing genset / grid isn\'t over-stressed.',
    metric: '+30%',
    metricLabel: 'load headroom',
  },
  {
    number: 'Site 04',
    title: 'Lithium-ion Replacement',
    description:
      'Replace ageing VRLA banks 1:1 with NovaConnect — same footprint, 4× cycle life, half the weight, full IoT visibility.',
    metric: '4×',
    metricLabel: 'cycle life vs VRLA',
  },
  {
    number: 'Site 05',
    title: 'Fiber & Edge Datacentres',
    description:
      'PoP rooms, edge MEC sites and central offices. Bridges the 60 sec UPS-to-DG gap with zero gap, 5–8× longer.',
    metric: '8 h',
    metricLabel: 'extended ride-through',
  },
  {
    number: 'Site 06',
    title: 'Tower Co. Fleets',
    description:
      'Manage 1000s of sites with a single dashboard. Spot a failing battery before the SLA breach — predictive, not reactive.',
    metric: 'fleet',
    metricLabel: 'managed in one view',
  },
];

const telecomSteps = [
  {
    number: '01',
    title: 'Site Survey & Load Profile',
    description:
      'We collect 30 days of OPEX (diesel litres, AMC, downtime) and current battery health. Site-by-site or fleet-wide — both supported.',
  },
  {
    number: '02',
    title: 'NovaConnect Configuration',
    description:
      'Each site gets a custom kWh / kW config. Outdoor cabinets are IP55, -10 °C to +55 °C rated. Solar-ready out of the box.',
  },
  {
    number: '03',
    title: '3–5 Day Site-Level Cutover',
    description:
      'Existing rectifier interface preserved — no changes to BTS or DC distribution. Field crews trained; no ops disruption.',
  },
  {
    number: '04',
    title: 'NOC Integration',
    description:
      'Native SNMP / TL1 / REST API integration with your NOC. Dashboards for SOC, alarm aging, MTTR — fed straight to your ops team.',
  },
];

export default function TelecomPage() {
  const service = telecomData;

  return (
    <>
      <div className="absolute inset-x-0 top-0 z-30 mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:px-10 lg:px-14">
        <Breadcrumbs
          tone="paper"
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Telecom' },
          ]}
        />
      </div>
      <main className="relative min-h-screen bg-[#0a0a0a]">

          <ServiceHero
            title={service.title}
            heroImage={service.heroImage}
            heroDescription={service.heroDescription}
            serviceNumber={service.serviceNumber}
          />

          {/* INTRO + tower flow diagram */}
          <section className="relative w-full bg-white px-6 md:px-14 py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-20">
                <div className="md:col-span-5">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
                    Telecom MPS — NovaConnect
                  </p>
                  <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                    Replace diesel with <span className="text-[#6A9F30]">silent, always-on power.</span>
                  </h2>
                  <p className="text-black/65 text-base md:text-lg leading-relaxed mb-6">
                    {service.intro.description}
                  </p>
                </div>

                <div className="md:col-span-7 md:pl-8">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Network uptime</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">99.9%</p>
                      <p className="text-xs text-black/50 mt-1">SLA-verified</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">OPEX vs DG</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">-70%</p>
                      <p className="text-xs text-black/50 mt-1">fuel + AMC + theft</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Footprint</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">-60%</p>
                      <p className="text-xs text-black/50 mt-1">vs. lead-acid bank</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Failover</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">&lt; 20 ms</p>
                      <p className="text-xs text-black/50 mt-1">no warm-up</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telecom flow diagram */}
              <div>
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em]">
                    Tower Power Flow
                  </p>
                  <p className="text-black/40 text-xs uppercase tracking-widest hidden md:block">
                    Diesel out — MPS in — 24/7 signal
                  </p>
                </div>
                <div className="bg-[#f8fafc] border border-black/[0.06] p-4 md:p-8">
                  <TelecomFlow />
                </div>
              </div>
            </div>
          </section>

          {/* MARKET INSIGHT */}
          <MarketInsight
            eyebrow="Market Outlook — Telecom"
            title="The diesel-to-storage shift is no longer optional"
            intro="Indian telecom towers consumed roughly 250 crore litres of diesel annually until 2024. With diesel near ₹95/L and 5G densification adding 30–40% load to existing sites, the OPEX math has flipped permanently in favour of lithium-ion MPS."
            marketSize={{
              value: '₹14,000 Cr',
              label: 'India telecom MPS by 2030',
              sub: 'Tower-co fleets are the fastest-converting segment.',
            }}
            growth={{
              value: '38%',
              label: 'CAGR 2024–30',
              sub: 'Driven by 5G load, diesel cost and DOT green-tower mandates.',
            }}
            keyDriver={{
              title: 'DoT mandate: 50% of towers green by 2027.',
              description:
                'India\'s Department of Telecommunications has set firm targets — 50% of mobile towers running on renewable energy by 2027, 75% by 2030. Solar alone won\'t hit it; storage is the compulsory second leg.',
            }}
            bullets={[
              'TRAI consultation papers (Mar 2025) explicitly call out lithium-ion MPS as the preferred replacement for VRLA + DG hybrids.',
              'Tower OPEX models show payback under 4 years across most rural sites — even faster where pilferage of diesel is a known cost.',
              'NovaConnect supports OCP / OpenBMS protocols — slots into existing tower-co NOCs without a forklift upgrade.',
            ]}
          />

          {/* LIVE METRIC GRAPH */}
          <LiveMetricGraph
            eyebrow="Tower OPEX vs. uptime"
            title="Diesel costs climb. Uptime stays at 99.9%."
            subtitle="Old hybrid: diesel runs hard during outages, OPEX climbs every grid event. NovaConnect: silent battery rides through, OPEX stays flat."
            yUnit="₹ / hr"
            theme="light"
            series={[
              {
                label: 'Diesel-hybrid OPEX',
                color: '#ef4444',
                dashed: true,
                values: [0.4, 0.42, 0.46, 0.5, 0.6, 0.74, 0.6, 0.5, 0.46, 0.5, 0.62, 0.78, 0.86, 0.78, 0.66, 0.6, 0.7, 0.84, 0.94, 0.9, 0.78, 0.6, 0.5, 0.44, 0.42],
              },
              {
                label: 'NovaConnect OPEX',
                color: '#7DB840',
                fill: true,
                values: [0.18, 0.18, 0.18, 0.2, 0.22, 0.24, 0.22, 0.2, 0.2, 0.22, 0.24, 0.26, 0.28, 0.26, 0.24, 0.24, 0.26, 0.3, 0.32, 0.3, 0.26, 0.22, 0.2, 0.18, 0.18],
              },
            ]}
            callouts={[
              { label: 'OPEX vs DG', value: '-70%', sub: 'fuel + AMC + theft' },
              { label: 'Uptime today', value: '99.99%', sub: 'across the active fleet' },
              { label: 'Diesel litres saved', value: '12,450', sub: 'cumulative this quarter' },
            ]}
          />

          {/* USE CASES */}
          <UseCaseGrid
            eyebrow="Sites we power"
            title="From metro macro to remote rural"
            description="Every tower has a different load, climate and grid story. NovaConnect is configured site-by-site — but managed fleet-wide from a single dashboard."
            cases={telecomUseCases}
            bgClass="bg-white"
            textColor="dark"
          />

          {/* HOW IT WORKS */}
          <HowItWorks
            eyebrow="Process"
            title="Site-by-site rollout, fleet-grade visibility"
            steps={telecomSteps}
          />

          {/* HERO IMAGE BAND */}
          <section className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src="/images/telecom.webp"
              alt="Telecom tower"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 md:px-14 pb-12 md:pb-16">
              <div className="max-w-7xl mx-auto">
                <p className="text-[#7DB840] text-xs uppercase tracking-[0.3em] mb-3">
                  Mission-critical infrastructure
                </p>
                <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-medium uppercase max-w-3xl leading-tight">
                  Silent power that keeps networks live, even when the grid isn't.
                </h3>
              </div>
            </div>
          </section>

          <ServiceCTA
            label={service.cta.label}
            heading={service.cta.heading}
            description={service.cta.description}
            primaryButton={service.cta.primaryButton}
            secondaryButton={service.cta.secondaryButton}
          />

          <ServiceFooter />

      </main>
    </>
  );
}
