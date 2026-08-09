"use client";

import Image from 'next/image';
import PageNavbar from '@/components/PageNavbar';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceCTA from '@/components/service/ServiceCTA';
import ServiceFooter from '@/components/service/ServiceFooter';

import SolarFlow from '@/components/service/sections/SolarFlow';
import MarketInsight from '@/components/service/sections/MarketInsight';
import UseCaseGrid from '@/components/service/sections/UseCaseGrid';
import HowItWorks from '@/components/service/sections/HowItWorks';
import LiveMetricGraph from '@/components/service/sections/LiveMetricGraph';

import solarData from '@/data/services/solar.json';

const solarUseCases = [
  {
    number: 'Profile 01',
    title: 'Rooftop Solar — Homes',
    description:
      'Your panels generate at noon. You consume at 8 PM. NovaGrid bridges the gap so 100% of your kWh comes from sunshine.',
    metric: '85%',
    metricLabel: 'self-consumption',
  },
  {
    number: 'Profile 02',
    title: 'C&I Captive Solar',
    description:
      'Stop paying export tariffs at ₹2/kWh and re-buying at ₹9/kWh. Store the noon surplus, discharge it through evening shift.',
    metric: '-₹7/kWh',
    metricLabel: 'arbitrage spread',
  },
  {
    number: 'Profile 03',
    title: 'Off-grid & Microgrid',
    description:
      'Remote sites, eco-resorts, telecom huts. Solar + NovaGrid replaces diesel completely with a 24/7 silent power loop.',
    metric: '0 L',
    metricLabel: 'diesel/year',
  },
  {
    number: 'Profile 04',
    title: 'Hybrid Solar + DG',
    description:
      'Existing diesel hybrid? Slot in MPS to handle short outages so the DG only fires for sustained events. Cuts run-hours by 70%.',
    metric: '-70%',
    metricLabel: 'DG run-hours',
  },
  {
    number: 'Profile 05',
    title: 'EV-charging + PV',
    description:
      'Charge your EV from your own solar — even after sunset. NovaGrid bridges generation and charging windows seamlessly.',
    metric: '100%',
    metricLabel: 'green miles',
  },
  {
    number: 'Profile 06',
    title: 'Agri & Cold Storage',
    description:
      'Pumps, drip irrigation, cold rooms. Run them off stored solar instead of unreliable rural feeders or noisy diesel sets.',
    metric: '24/7',
    metricLabel: 'reliable supply',
  },
];

const solarSteps = [
  {
    number: '01',
    title: 'Generation × Consumption Mapping',
    description:
      'We model your roof\'s irradiance against your hourly consumption. The mismatch is your real MPS opportunity — usually larger than you expect.',
  },
  {
    number: '02',
    title: 'Right-Sized Hybrid Sizing',
    description:
      'NovaGrid is a single-conversion DC-coupled platform — fewer losses, smaller inverter footprint. We pick capacity to match your evening curve.',
  },
  {
    number: '03',
    title: '2–4 Day Hybrid Commissioning',
    description:
      'Whether new installation or retrofit on existing solar, our engineers integrate panels, inverter, BMS and grid handshake on site.',
  },
  {
    number: '04',
    title: 'Monitor Sun → Storage → Spend',
    description:
      'See live solar generation, battery state of charge, and rupees displaced from the DISCOM bill — in one app.',
  },
];

export default function SolarPage() {
  const service = solarData;

  return (
    <>
      <PageNavbar />
      <main className="relative min-h-screen bg-[#0a0a0a]">

          <ServiceHero
            title={service.title}
            heroImage={service.heroImage}
            heroDescription={service.heroDescription}
            serviceNumber={service.serviceNumber}
          />

          {/* INTRO + Solar flow diagram */}
          <section className="relative w-full bg-white px-6 md:px-14 py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-20">
                <div className="md:col-span-5">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
                    Solar + Storage — NovaGrid
                  </p>
                  <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                    Don't sell your solar back. <span className="text-[#6A9F30]">Use it after sunset.</span>
                  </h2>
                  <p className="text-black/65 text-base md:text-lg leading-relaxed mb-6">
                    {service.intro.description}
                  </p>
                </div>

                <div className="md:col-span-7 md:pl-8">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Self-consumption</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">85%</p>
                      <p className="text-xs text-black/50 mt-1">vs. 35% solar-only</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Round-trip eff.</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">94%</p>
                      <p className="text-xs text-black/50 mt-1">DC-coupled topology</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Cycle warranty</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">10 yr</p>
                      <p className="text-xs text-black/50 mt-1">at 80% retention</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Solar uplift ROI</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">+2.5 yr</p>
                      <p className="text-xs text-black/50 mt-1">added to PV payback</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar flow diagram */}
              <div>
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em]">
                    Sun → Storage → 24/7 Power
                  </p>
                  <p className="text-black/40 text-xs uppercase tracking-widest hidden md:block">
                    DC-coupled solar + MPS
                  </p>
                </div>
                <div className="bg-[#f8fafc] border border-black/[0.06] p-4 md:p-8">
                  <SolarFlow />
                </div>
              </div>
            </div>
          </section>

          {/* MARKET INSIGHT */}
          <MarketInsight
            eyebrow="Market Outlook — Solar+Storage"
            title="Solar without storage is half a system"
            intro="India crossed 100 GW of solar capacity in 2025, but feeders curtail solar during peak generation hours. Net-metering tariffs are tightening, and gross-metering rates rarely beat ₹3/kWh. The economic centre of gravity is moving from generation to storage."
            marketSize={{
              value: '47 GW',
              label: 'Solar+Storage by 2030',
              sub: 'Coupled storage projected to grow 6× faster than standalone solar.',
            }}
            growth={{
              value: '63%',
              label: 'CAGR 2024–30',
              sub: 'Largest segment growth across all renewable categories.',
            }}
            keyDriver={{
              title: 'Net-metering compression is forcing storage adoption.',
              description:
                'Most state DISCOMs now cap net-metering rebates at 1:1 only for systems below 10 kW. Above that, you export at ₹2.5/kWh and re-import at ₹8–11/kWh. Storage closes that arbitrage entirely — and pays back in ~5 years.',
            }}
            bullets={[
              'PM Surya Ghar scheme (Feb 2024) launched a parallel subsidy for residential solar — pairs naturally with NovaGrid sizing.',
              'MNRE\'s "Renewable Generation Obligation" forces large consumers (≥ 100 kW) to source ≥ 30% green by 2026 — storage makes 24/7 RE feasible.',
              'Gross-metering tariffs in 7 states have fallen below grid retail — only storage recovers the lost value.',
            ]}
          />

          {/* LIVE METRIC GRAPH */}
          <LiveMetricGraph
            eyebrow="Solar self-consumption"
            title="Generated at noon. Spent at night."
            subtitle="Yellow shows what your panels generate hour by hour. Green shows what NovaGrid actually delivers to your loads — including after sunset."
            yUnit="kWh"
            theme="light"
            series={[
              {
                label: 'Solar generation',
                color: '#fbbf24',
                fill: true,
                values: [0, 0, 0, 0, 0, 0.04, 0.18, 0.4, 0.62, 0.78, 0.9, 0.96, 0.98, 0.94, 0.84, 0.7, 0.5, 0.28, 0.1, 0.02, 0, 0, 0, 0, 0],
              },
              {
                label: 'Battery delivery',
                color: '#7DB840',
                values: [0.32, 0.3, 0.28, 0.26, 0.26, 0.28, 0.3, 0.34, 0.4, 0.46, 0.5, 0.54, 0.56, 0.58, 0.6, 0.66, 0.74, 0.82, 0.86, 0.84, 0.78, 0.7, 0.6, 0.5, 0.4],
              },
            ]}
            callouts={[
              { label: 'Self-consumption', value: '85%', sub: 'vs. ~35% solar-only' },
              { label: 'Round-trip eff.', value: '94%', sub: 'DC-coupled NovaGrid topology' },
              { label: 'Grid kWh imported', value: '-72%', sub: 'against the same site, pre-storage' },
            ]}
          />

          {/* USE CASES */}
          <UseCaseGrid
            eyebrow="Solar profiles we power"
            title="Where adding NovaGrid changes the math"
            description="A standalone solar system gives you ~35% self-consumption. Add storage and you cross 80%. We design hybrid configurations across every solar profile."
            cases={solarUseCases}
            bgClass="bg-white"
            textColor="dark"
          />

          {/* HOW IT WORKS */}
          <HowItWorks
            eyebrow="Process"
            title="From PV mismatch to 24/7 clean energy"
            steps={solarSteps}
          />

          {/* HERO IMAGE BAND */}
          <section className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src="/images/solar.webp"
              alt="Solar installation"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 md:px-14 pb-12 md:pb-16">
              <div className="max-w-7xl mx-auto">
                <p className="text-[#7DB840] text-xs uppercase tracking-[0.3em] mb-3">
                  Solar made dispatchable
                </p>
                <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-medium uppercase max-w-3xl leading-tight">
                  Generate at noon. Spend at night. Pay the grid as little as possible.
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
