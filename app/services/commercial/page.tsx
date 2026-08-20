"use client";

import Image from 'next/image';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceCTA from '@/components/service/ServiceCTA';
import ServiceFooter from '@/components/service/ServiceFooter';

import CommercialFlow from '@/components/service/sections/CommercialFlow';
import MarketInsight from '@/components/service/sections/MarketInsight';
import UseCaseGrid from '@/components/service/sections/UseCaseGrid';
import HowItWorks from '@/components/service/sections/HowItWorks';
import LiveMetricGraph from '@/components/service/sections/LiveMetricGraph';

import commercialData from '@/data/services/commercial.json';
import Breadcrumbs from '@/components/Breadcrumbs';

const commercialUseCases = [
  {
    number: 'Property 01',
    title: 'Office Towers & IT Parks',
    description:
      'Critical loads — UPS rooms, server racks, lifts, fire systems — get seamless backup. Tenants notice nothing during outages.',
    metric: '0 ms',
    metricLabel: 'tenant-visible flicker',
  },
  {
    number: 'Property 02',
    title: 'Retail Malls & Hypermarkets',
    description:
      'Refrigeration, escalators, billing terminals — all kept live. Slash demand charges that mall ops budgets bleed every month.',
    metric: '-32%',
    metricLabel: 'monthly fixed bill',
  },
  {
    number: 'Property 03',
    title: 'Hotels & Hospitality',
    description:
      'Silent backup vs. clattering DG sets. Guests stay, AC stays, kitchens run. ESG points for the corporate sales pitch.',
    metric: '0 dB',
    metricLabel: 'noise added',
  },
  {
    number: 'Property 04',
    title: 'Hospitals & Diagnostic Centres',
    description:
      'OTs, ICUs, CT/MRI suites can\'t tolerate microsecond gaps. NovaBizGuard sits inline with the UPS — true bridge power.',
    metric: '99.99%',
    metricLabel: 'critical uptime',
  },
  {
    number: 'Property 05',
    title: 'Co-working & F&B Chains',
    description:
      'Multi-site ops with one dashboard. Spot which branch is bleeding kVA and act before the next billing cycle.',
    metric: '1 app',
    metricLabel: 'fleet-wide control',
  },
  {
    number: 'Property 06',
    title: 'EV-charging Hubs',
    description:
      'Buffer fast-charger spikes so you don\'t blow your sanctioned load. Stack MPS + grid + solar to maximise charger utilisation.',
    metric: '+2x',
    metricLabel: 'chargers per connection',
  },
];

const commercialSteps = [
  {
    number: '01',
    title: 'Building Energy Profile',
    description:
      'We pull your last 12 months of utility bills and 30 days of metered load. We map fixed vs. variable charges and identify exactly where your bill bloats.',
  },
  {
    number: '02',
    title: 'Modular MPS Sizing',
    description:
      'NovaBizGuard scales from 50 kWh to 2 MWh in modular cabinets. Sized to your peak window, not your nameplate — pay for what you use.',
  },
  {
    number: '03',
    title: '3–5 Day Discreet Install',
    description:
      'Plant rooms, basements, rooftops — wherever space allows. We schedule cut-over for off-hours so your tenants and operations never notice.',
  },
  {
    number: '04',
    title: 'Tenant-billed Reporting',
    description:
      'Sub-meter integration auto-allocates kWh consumption per tenant. Pass green-power benefits transparently and earn LEED / IGBC credits.',
  },
];

export default function CommercialPage() {
  const service = commercialData;

  return (
    <>
      <div className="absolute inset-x-0 top-0 z-30 mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:px-10 lg:px-14">
        <Breadcrumbs
          tone="paper"
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Commercial' },
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

          {/* INTRO + day/night load curve */}
          <section className="relative w-full bg-white px-6 md:px-14 py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-20">
                <div className="md:col-span-5">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em] mb-4">
                    Commercial MPS — NovaBizGuard
                  </p>
                  <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                    Buy power off-peak. <span className="text-[#6A9F30]">Use it during peak.</span>
                  </h2>
                  <p className="text-black/65 text-base md:text-lg leading-relaxed mb-6">
                    {service.intro.description}
                  </p>
                </div>

                <div className="md:col-span-7 md:pl-8">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Demand charge</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">-35%</p>
                      <p className="text-xs text-black/50 mt-1">avg monthly reduction</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Backup duration</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">2–8 h</p>
                      <p className="text-xs text-black/50 mt-1">on essential loads</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Footprint</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">~9 m²</p>
                      <p className="text-xs text-black/50 mt-1">per 200 kWh module</p>
                    </div>
                    <div className="border-t border-black/15 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-black/50 mb-1">Audible noise</p>
                      <p className="text-3xl md:text-4xl font-medium text-black">&lt; 55 dB</p>
                      <p className="text-xs text-black/50 mt-1">vs. ~95 dB DG</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day/night flow diagram */}
              <div>
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <p className="text-[#6A9F30] text-xs uppercase tracking-[0.3em]">
                    Time-of-Use Arbitrage
                  </p>
                  <p className="text-black/40 text-xs uppercase tracking-widest hidden md:block">
                    24-hour load curve
                  </p>
                </div>
                <div className="bg-[#f8fafc] border border-black/[0.06] p-4 md:p-8">
                  <CommercialFlow />
                </div>
              </div>
            </div>
          </section>

          {/* MARKET INSIGHT */}
          <MarketInsight
            eyebrow="Market Outlook — Commercial"
            title="The C&I storage wave is here"
            intro="With ToD tariffs going live for all C&I consumers ≥ 10 kW from April 2025, the gap between off-peak and peak rates has widened to ₹4–7/kWh in most state DISCOMs. Behind-the-meter storage now beats grid-only economics in nearly every metro."
            marketSize={{
              value: '32 GWh',
              label: 'C&I storage opportunity',
              sub: 'Across India by 2030 — 4× residential, 2× telecom.',
            }}
            growth={{
              value: '52%',
              label: 'CAGR 2024–30',
              sub: 'Driven by ToD tariffs and corporate net-zero pledges.',
            }}
            keyDriver={{
              title: 'Open Access + ToD = the MPS unlock.',
              description:
                'Commercial buildings on Open Access can now arbitrage exchange prices in real time. NovaBizGuard auto-buys at IEX low slots and discharges during DISCOM peaks, capturing both spreads on a single asset.',
            }}
            bullets={[
              'BEE\'s C&I energy benchmarking now penalises high peak demand factor (PDF) — MPS directly improves the score.',
              'Green Building (LEED v4.1, IGBC) credits for resilient, low-emission backup — displaces most DG kWh, with the genset held for extended outages.',
              'Net-metering caps cleared in most states, letting MPS+solar export at peak with full tariff credit.',
            ]}
          />

          {/* LIVE METRIC GRAPH */}
          <LiveMetricGraph
            eyebrow="Time-of-Use savings"
            title="Buy at off-peak. Discharge at peak."
            subtitle="Watch the tariff rise into the evening — then watch NovaBizGuard cap your draw exactly as the meter would have spiked."
            yUnit="₹ / kWh"
            theme="light"
            series={[
              {
                label: 'DISCOM tariff',
                color: '#ef4444',
                dashed: true,
                values: [0.32, 0.3, 0.28, 0.28, 0.3, 0.38, 0.5, 0.6, 0.66, 0.7, 0.72, 0.76, 0.78, 0.78, 0.78, 0.8, 0.86, 0.94, 0.98, 0.94, 0.86, 0.7, 0.5, 0.4, 0.34],
              },
              {
                label: 'Net effective ₹/kWh',
                color: '#7DB840',
                fill: true,
                values: [0.32, 0.3, 0.28, 0.28, 0.3, 0.34, 0.38, 0.42, 0.44, 0.46, 0.48, 0.5, 0.5, 0.48, 0.46, 0.46, 0.5, 0.54, 0.56, 0.54, 0.5, 0.46, 0.42, 0.38, 0.34],
              },
            ]}
            callouts={[
              { label: 'Avg ₹/kWh saved', value: '₹3.4', sub: 'measured arbitrage spread across all slots' },
              { label: 'Demand charge', value: '-35%', sub: 'avg monthly fixed-bill reduction' },
              { label: 'Tenant flicker', value: '0 ms', sub: 'critical loads stay live through every event' },
            ]}
          />

          {/* USE CASES */}
          <UseCaseGrid
            eyebrow="Properties we power"
            title="Where NovaBizGuard pays back fastest"
            description="Commercial buildings rarely run flat — they spike. We sit between your meter and your load, smoothing every kVA spike before it hits your bill."
            cases={commercialUseCases}
            bgClass="bg-white"
            textColor="dark"
          />

          {/* HOW IT WORKS */}
          <HowItWorks
            eyebrow="Process"
            title="Engineered for property managers, not engineers"
            steps={commercialSteps}
          />

          {/* HERO IMAGE BAND */}
          <section className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src="/images/commercial.webp"
              alt="Commercial property"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 md:px-14 pb-12 md:pb-16">
              <div className="max-w-7xl mx-auto">
                <p className="text-[#7DB840] text-xs uppercase tracking-[0.3em] mb-3">
                  Property-grade reliability
                </p>
                <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-medium uppercase max-w-3xl leading-tight">
                  From a single floor to a multi-site portfolio — managed from one screen.
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
