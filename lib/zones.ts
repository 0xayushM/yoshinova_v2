/**
 * The six deployment zones.
 *
 * The old grid gave each zone a photo and one line. On a rail the card has
 * room to earn its place, so each one now carries the two numbers a buyer
 * actually asks for — what size system, and what it does to the bill — plus
 * the specific pain it removes.
 *
 * NOTE FOR ENGINEERING: `size` and `headline` are indicative ranges from the
 * service pages. Confirm before launch.
 */

export interface Zone {
  n: string;
  title: string;
  slug: string;
  /** the one-liner, unchanged from the live site */
  description: string;
  image: string;
  /** what it removes */
  pain: string;
  /** typical deployed capacity */
  size: string;
  /** the headline result */
  headline: string;
  headlineLabel: string;
}

export const ZONES: Zone[] = [
  {
    n: "01",
    title: "Residential",
    slug: "residential",
    description: "Shared storage for elevators, pumps & EV charging",
    image: "/images/residential.webp",
    pain: "Lifts, pumps and the DG, all night, every night.",
    size: "50–150 kWh",
    headline: "−35%",
    headlineLabel: "common-area cost",
  },
  {
    n: "02",
    title: "Commercial",
    slug: "commercial",
    description: "Flatten HVAC spikes and arbitrage ToU rates",
    image: "/images/commercial.webp",
    pain: "Three chillers starting together set your whole month.",
    size: "100–400 kWh",
    headline: "−50%",
    headlineLabel: "peak demand charge",
  },
  {
    n: "03",
    title: "Industrial",
    slug: "industrial",
    description: "Shave machinery peaks and unlock demand-response revenue",
    image: "/images/industrial.webp",
    pain: "Priced on a spike you hit for twenty minutes a day.",
    size: "250 kWh–2 MWh",
    headline: "−40%",
    headlineLabel: "vs unmanaged load",
  },
  {
    n: "04",
    title: "Telecom",
    slug: "telecom",
    description: "Replace diesel backup with zero-downtime battery power",
    image: "/images/telecom.webp",
    pain: "Six hours of genset a day at ₹26 a unit.",
    size: "10–40 kWh",
    headline: "99.99%",
    headlineLabel: "uptime, silent",
  },
  {
    n: "05",
    title: "Household",
    slug: "residential",
    description: "Store daytime solar, power your evenings",
    image: "/images/residential2.webp",
    pain: "Solar peaks at noon. Your bill starts at seven.",
    size: "5–15 kWh",
    headline: "−40%",
    headlineLabel: "monthly bill",
  },
  {
    n: "06",
    title: "Solar",
    slug: "solar",
    description: "Bridge the midday-to-evening gap",
    image: "/images/solar.webp",
    pain: "Midday export earns a fraction of peak-hour cost.",
    size: "Sized to array",
    headline: "80%+",
    headlineLabel: "self-consumption",
  },
];
