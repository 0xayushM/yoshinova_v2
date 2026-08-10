"use client";

import Image from 'next/image';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceCTA from '@/components/service/ServiceCTA';
import ServiceFooter from '@/components/service/ServiceFooter';

import IndustrialFlow from '@/components/service/sections/IndustrialFlow';
import MarketInsight from '@/components/service/sections/MarketInsight';
import UseCaseGrid from '@/components/service/sections/UseCaseGrid';
import HowItWorks from '@/components/service/sections/HowItWorks';
import LiveMetricGraph from '@/components/service/sections/LiveMetricGraph';

import industrialData from '@/data/services/industrial.json';
import Breadcrumbs from '@/components/Breadcrumbs';

const industrialUseCases = [
  {
    number: 'Sector 01',
    title: 'Steel & Metal Processing',
    description:
      'Furnaces, rolling mills and electric arc loads need stable voltage. NovaMax flattens sharp current draws and protects sensitive control systems.',
    metric: '-38%',
    metricLabel: 'demand charge',
  },
  {
    number: 'Sector 02',
    title: 'Textiles & Garments',
    description:
      'Continuous shifts and motor-heavy floors. Avoid line stops during DG switchover and run looms straight through grid dips.',
    metric: '0 sec',
    metricLabel: 'switchover gap',
  },
  {
    number: 'Sector 03',
    title: 'Food & Beverage',
    description:
      'Cold storage, packaging and CIP cycles can\'t tolerate outages. MPS rides through brownouts and protects spoilage risk.',
    metric: '24/7',
    metricLabel: 'cold chain',
  },
  {
    number: 'Sector 04',
    title: 'Chemicals & Pharma',
    description:
      'GMP-grade facilities demand clean, stable power. Eliminate harmonics and voltage spikes that compromise batch quality.',
    metric: '±0.5%',
    metricLabel: 'voltage stability',
  },
  {
    number: 'Sector 05',
    title: 'Plastics & Moulding',
    description:
      'Injection cycles spike at start. Shave peak draw without oversizing your sanctioned load — keep contract demand low.',
    metric: '-42%',
    metricLabel: 'peak kVA',
  },
  {
    number: 'Sector 06',
    title: 'Auto Components',
    description:
      'Tier-1 and Tier-2 suppliers facing OEM uptime SLAs. Pair MPS with rooftop solar to lower your green-supply ratio.',
    metric: '6 yr',
    metricLabel: 'avg payback',
  },
];

const industrialSteps = [
  {
    number: '01',
    title: 'Floor-level Energy Audit',
    description:
      'Our Chief Energy Advisor walks the plant — meter by meter. We pull 30-day load data, isolate motor inefficiencies, harmonics and contracted-demand exposure.',
  },
  {
    number: '02',
    title: 'Right-Sized MPS Design',
    description:
      'NovaMax modules are sized to your real load curve, not nameplate ratings. We engineer for the kVA you actually pull, not what you fear pulling.',
  },
  {
    number: '03',
    title: 'Commissioning in 5–7 Days',
    description:
      'Pre-fabricated containers ship ready-to-connect. Switchgear cut-overs scheduled around your shifts — most lines never see the change.',
  },
  {
    number: '04',
    title: 'Live ROI Dashboard',
    description:
      'BMS + IoT push real-time SOC, kWh discharged, ₹ saved and CO₂e offset to your phone. Verify your payback as it accrues, not at year-end.',
  },
];

export default function IndustrialPage() {
  const service = industrialData;

  return (
    <>
      <div className="absolute inset-x-0 top-0 z-30 mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:px-10 lg:px-14">
        <Breadcrumbs
          tone="paper"
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Industrial' },
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

          {/* INTRO + Flow diagram */}
          <section className="relative w-full bg-white px-6 md:px-14 py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-20">
                <div className="md:col-span-5">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
                    Industrial MPS — NovaMax
                  </p>
                  <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                    Cut your contract demand <span className="text-[#6A9F30]">without cutting production.</span>
                  </h2>
                  <p className="text-black/65 text-base md:text-lg leading-relaxed mb-6">
                    {service.intro.description}
                  </p>
                </div>

                <div className="md:col-span-7 md:pl-8">
                  {/* KPI strip */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Peak shaving</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">-40%</p>
                      <p className="text-xs text-black/50 mt-1">vs. unmanaged factory load</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Switchover</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">&lt; 20 ms</p>
                      <p className="text-xs text-black/50 mt-1">PLC- and VFD-safe</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Cycle life</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">6,000+</p>
                      <p className="text-xs text-black/50 mt-1">LFP chemistry</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Footprint</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">-70%</p>
                      <p className="text-xs text-black/50 mt-1">vs. lead-acid bank</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flow diagram */}
              <div>
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em]">
                    Live Power Flow
                  </p>
                  <p className="text-black/40 text-xs uppercase tracking-widest hidden md:block">
                    Grid → Storage → Load
                  </p>
                </div>
                <div className="bg-[#f8fafc] border border-black/[0.06] p-4 md:p-8">
                  <IndustrialFlow />
                </div>
              </div>
            </div>
          </section>

          {/* MARKET INSIGHT */}
          <MarketInsight
            eyebrow="Market Outlook — India"
            title="Industrial MPS isn't optional anymore"
            intro="Demand charges in industrial tariffs across Maharashtra, Gujarat and Tamil Nadu now exceed ₹450/kVA. Diesel hit ₹95/L. The economic case for behind-the-meter storage flipped in 2024 — and 2026 is the catch-up year."
            marketSize={{
              value: '₹48,000 Cr',
              label: 'India MPS by 2030',
              sub: 'Industrial + C&I lead the segment, ahead of utility-scale.',
            }}
            growth={{
              value: '46%',
              label: 'CAGR 2024–30',
              sub: 'Driven by demand charges, peak tariffs and renewable mandates.',
            }}
            keyDriver={{
              title: 'Time-of-Day tariffs are reshaping factory economics.',
              description:
                'CERC mandates ToD pricing across all India C&I consumers ≥ 10 kW from Apr 2025. Off-peak charging and peak discharge can shift 30–50% of monthly energy spend — but only with deployed storage.',
            }}
            bullets={[
              'Captive solar penetration grew 2.4× in MSME industrial belts (2022–25). MPS unlocks the unused evening/night fraction.',
              'BIS-IS 16270 / IEC 62619 certifications now mandatory — Yoshinova is compliant out of the box.',
              'PLI and MNRE incentives apply to integrated MPS+RE projects above 500 kWh capacity.',
            ]}
          />

          {/* LIVE METRIC GRAPH */}
          <LiveMetricGraph
            eyebrow="Live load profile"
            title="Peak shaving in real time"
            subtitle="The grid pulls a sharp daytime spike. NovaMax discharges through the peak window, leaving only a flat, low-cost load on your meter."
            yUnit="kW"
            theme="light"
            series={[
              {
                label: 'Without MPS',
                color: '#ef4444',
                dashed: true,
                values: [0.18, 0.16, 0.14, 0.16, 0.22, 0.34, 0.48, 0.62, 0.74, 0.82, 0.86, 0.92, 0.95, 0.9, 0.84, 0.78, 0.7, 0.62, 0.55, 0.48, 0.4, 0.32, 0.26, 0.22, 0.2],
              },
              {
                label: 'With NovaMax',
                color: '#7DB840',
                fill: true,
                values: [0.22, 0.22, 0.22, 0.22, 0.24, 0.28, 0.34, 0.4, 0.46, 0.5, 0.52, 0.56, 0.58, 0.56, 0.54, 0.52, 0.5, 0.46, 0.42, 0.4, 0.38, 0.34, 0.3, 0.26, 0.24],
              },
            ]}
            callouts={[
              { label: 'Peak shaved', value: '-40%', sub: 'measured peak vs. unmanaged contract demand' },
              { label: 'Today\'s saving', value: '₹14,280', sub: 'across all three phases, across all shifts' },
              { label: 'Carbon offset', value: '184 kg', sub: 'CO₂e displaced from grid coal' },
            ]}
          />

          {/* USE CASES */}
          <UseCaseGrid
            eyebrow="Sectors we power"
            title="Industries running on NovaMax"
            description="Every floor is different. We've shipped industrial-grade MPS across heavy and light manufacturing — here's where the ROI lands fastest."
            cases={industrialUseCases}
            bgClass="bg-white"
            textColor="dark"
          />

          {/* HOW IT WORKS */}
          <HowItWorks
            eyebrow="Process"
            title="From audit to live ROI in under 30 days"
            steps={industrialSteps}
          />

          {/* HERO IMAGE BAND */}
          <section className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src="/images/industrial2.webp"
              alt="Industrial floor"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 md:px-14 pb-12 md:pb-16">
              <div className="max-w-7xl mx-auto">
                <p className="text-[#7DB840] text-xs uppercase tracking-[0.3em] mb-3">
                  Built for India's industrial backbone
                </p>
                <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-medium uppercase max-w-3xl leading-tight">
                  Engineered in Kundli. Proven on factory floors from Pune to Pithampur.
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
