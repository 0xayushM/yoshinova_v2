"use client";

import Image from 'next/image';
import PageNavbar from '@/components/PageNavbar';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceCTA from '@/components/service/ServiceCTA';
import ServiceFooter from '@/components/service/ServiceFooter';

import ResidentialFlow from '@/components/service/sections/ResidentialFlow';
import MarketInsight from '@/components/service/sections/MarketInsight';
import UseCaseGrid from '@/components/service/sections/UseCaseGrid';
import HowItWorks from '@/components/service/sections/HowItWorks';
import LiveMetricGraph from '@/components/service/sections/LiveMetricGraph';

import residentialData from '@/data/services/residential.json';

const residentialUseCases = [
  {
    number: 'Home 01',
    title: 'Solar-equipped Households',
    description:
      "You generate at noon, you consume at 8 PM. NovaVault stores your daytime surplus and pushes it back when the sun goes down — no exporting at low tariffs.",
    metric: '85%',
    metricLabel: 'self-consumption',
  },
  {
    number: 'Home 02',
    title: 'Outage-prone Localities',
    description:
      'Tier-2 cities, semi-urban suburbs, gated colonies. Replace UPS+inverter+lead-acid with a single silent unit that lasts 4× longer.',
    metric: '< 20 ms',
    metricLabel: 'switch to backup',
  },
  {
    number: 'Home 03',
    title: 'Time-of-Day Tariff Homes',
    description:
      'Maharashtra, Karnataka and Delhi residential ToD slabs reward off-peak charging. NovaVault auto-buys cheap, sells dear.',
    metric: '-45%',
    metricLabel: 'monthly bill',
  },
  {
    number: 'Home 04',
    title: 'EV-charging at Home',
    description:
      'Wall-charge your EV from your stored solar — even after sunset. NovaVault is EV-ready, no second wallbox upgrade needed.',
    metric: '100%',
    metricLabel: 'green charging',
  },
  {
    number: 'Home 05',
    title: 'Villa & Farmhouse Loads',
    description:
      'Farmhouses, weekend retreats, off-grid holiday homes. Run pumps, A/C, geysers, fridges purely on solar + storage.',
    metric: '24/7',
    metricLabel: 'off-grid power',
  },
  {
    number: 'Home 06',
    title: 'Apartment Communities',
    description:
      'Common-area MPS for societies — lift backup, water pumps, security. ESG-compliant, reduces society opex meaningfully.',
    metric: '-60%',
    metricLabel: 'common-area DG',
  },
];

const residentialSteps = [
  {
    number: '01',
    title: 'Home Energy Profile',
    description:
      'We analyse 12 months of bills, your evening peak load, and existing solar (if any). Sizing is based on your household — not a generic spec.',
  },
  {
    number: '02',
    title: 'NovaVault Selection',
    description:
      'Pick from wall-mounted (5–10 kWh) or floor-standing (10–15 kWh) units — sized to your actual load, typically 2–5 kW. LFP chemistry, 6,000-cycle warranty, IP65 outdoor or indoor versions.',
  },
  {
    number: '03',
    title: '2–3 Day Install',
    description:
      'Single visit. We handle DISCOM intimation, AC/DC wiring, BMS commissioning and app onboarding. Your day stays normal.',
  },
  {
    number: '04',
    title: 'See Every Watt You Save',
    description:
      'NovaVault app shows live SOC, kWh shifted, ₹ saved and CO₂e offset. Family-friendly dashboard — no electrical engineering required.',
  },
];

export default function ResidentialPage() {
  const service = residentialData;

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

        {/* INTRO + Residential flow diagram */}
        <section className="relative w-full bg-white px-6 md:px-14 py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-20">
              <div className="md:col-span-5">
                <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
                  Residential MPS — NovaVault
                </p>
                <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                  Your home, on <span className="text-[#6A9F30]">your own power.</span>
                </h2>
                <p className="text-black/65 text-base md:text-lg leading-relaxed mb-6">
                  {service.intro.description}
                </p>
              </div>

              <div className="md:col-span-7 md:pl-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Bill reduction</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">-45%</p>
                    <p className="text-xs text-black/50 mt-1">on residential ToD slabs</p>
                  </div>
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Backup time</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">3–6 h</p>
                    <p className="text-xs text-black/50 mt-1">on typical 2–5 kW home loads</p>
                  </div>
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Cycle life</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">6,000+</p>
                    <p className="text-xs text-black/50 mt-1">LFP — 4× lead-acid</p>
                  </div>
                  <div className="border-t border-black/15 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Footprint</p>
                    <p className="text-3xl md:text-4xl font-medium text-black">~0.4 m²</p>
                    <p className="text-xs text-black/50 mt-1">wall-mounted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Residential flow diagram */}
            <div>
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em]">
                  Sun → Storage → Home
                </p>
                <p className="text-black/40 text-xs uppercase tracking-widest hidden md:block">
                  A day in your home
                </p>
              </div>
              <div className="bg-[#f8fafc] border border-black/[0.06] p-4 md:p-8">
                <ResidentialFlow />
              </div>
            </div>
          </div>
        </section>

        {/* MARKET INSIGHT */}
        <MarketInsight
          eyebrow="Market Outlook — Residential"
          title="Indian homes are switching from inverters to MPS"
          intro="Lead-acid inverter homes are crossing 80 million across India, and 25% of that base is due for replacement in the next 24 months. With residential ToD tariffs and PM Surya Ghar incentives stacking up, homes that retrofit MPS today recover their cost in 4–5 years — and gain 3–6 hours of silent, clean backup on a typical 2–5 kW home load."
          marketSize={{
            value: '11 GWh',
            label: 'Residential MPS by 2030',
            sub: 'Standalone + solar-coupled installations across India.',
          }}
          growth={{
            value: '41%',
            label: 'CAGR 2024–30',
            sub: 'Driven by ToD tariffs, solar adoption and EV-at-home charging.',
          }}
          keyDriver={{
            title: 'PM Surya Ghar + ToD = the residential unlock.',
            description:
              "PM Surya Ghar Muft Bijli Yojana subsidises rooftop solar up to 3 kW. Pair it with a NovaVault, and you neutralise both the day's surplus export problem and the evening peak tariff — most homes never pay a positive bill again.",
          }}
          bullets={[
            'Maharashtra, Delhi and Karnataka have notified residential ToD tariffs as of 2025 — making evening discharge directly profitable.',
            'BIS-IS 16270 and IEC 62619 certified residential MPS now eligible under MNRE subsidies.',
            'Lead-acid replacement market alone is ~₹14,000 cr/yr in India — NovaVault wins on lifecycle cost in <5 yr.',
          ]}
        />

        {/* LIVE METRIC GRAPH */}
        <LiveMetricGraph
          eyebrow="A day in your home"
          title="Your bill before NovaVault — and after."
          subtitle="Red dashed shows what you'd have paid hour by hour. Green shows what NovaVault actually charges you — flatter, lower, mostly your own solar."
          yUnit="₹ / hr"
          theme="light"
          series={[
            {
              label: 'Without storage',
              color: '#ef4444',
              dashed: true,
              values: [0.36, 0.34, 0.3, 0.3, 0.3, 0.32, 0.4, 0.5, 0.6, 0.66, 0.7, 0.74, 0.78, 0.78, 0.78, 0.82, 0.9, 0.96, 0.94, 0.86, 0.7, 0.56, 0.46, 0.4, 0.36],
            },
            {
              label: 'With NovaVault',
              color: '#7DB840',
              fill: true,
              values: [0.22, 0.22, 0.22, 0.22, 0.24, 0.24, 0.26, 0.28, 0.3, 0.3, 0.32, 0.32, 0.32, 0.34, 0.34, 0.36, 0.4, 0.42, 0.44, 0.42, 0.38, 0.32, 0.26, 0.24, 0.22],
            },
          ]}
          callouts={[
            { label: 'Bill reduction', value: '-45%', sub: 'on residential ToD slabs' },
            { label: 'Backup time', value: '4–6 hr', sub: 'on typical 2–3 kW home loads' },
            { label: 'CO₂e avoided', value: '2.4 kg', sub: 'today, this household' },
          ]}
        />

        {/* USE CASES */}
        <UseCaseGrid
          eyebrow="Homes we power"
          title="Where NovaVault fits perfectly"
          description="Homes are not factories. NovaVault is engineered for the load patterns, climates and tariff structures of Indian households — not industrial spec sheets retrofitted to homes."
          cases={residentialUseCases}
          bgClass="bg-white"
          textColor="dark"
        />

        {/* HOW IT WORKS */}
        <HowItWorks
          eyebrow="Process"
          title="From bill audit to a self-powered home"
          steps={residentialSteps}
        />

        {/* HERO IMAGE BAND */}
        <section className="relative w-full h-[60vh] overflow-hidden">
          <Image
            src="/images/residential2.webp"
            alt="Residential home"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 md:px-14 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto">
              <p className="text-[#7DB840] text-xs uppercase tracking-[0.3em] mb-3">
                Engineered for Indian homes
              </p>
              <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-medium uppercase max-w-3xl leading-tight">
                Silent. Smart. Sized for your life — not a spec sheet.
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
