import type { MetadataRoute } from "next";

const SITE = "https://www.yoshinova.com";

/**
 * Derived from one list so it can't drift.
 *
 * The previous version hardcoded a single entry, so nine of ten routes were
 * invisible to crawlers while robots.txt happily pointed at it — worse than
 * an obviously missing sitemap, because it looked handled.
 */
const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, freq: "monthly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/services/energy-audit", priority: 0.9, freq: "monthly" },
  { path: "/services/industrial", priority: 0.8, freq: "monthly" },
  { path: "/services/commercial", priority: 0.8, freq: "monthly" },
  { path: "/services/residential", priority: 0.8, freq: "monthly" },
  { path: "/services/telecom", priority: 0.8, freq: "monthly" },
  { path: "/services/solar", priority: 0.8, freq: "monthly" },
  { path: "/about", priority: 0.7, freq: "yearly" },
  { path: "/contact", priority: 0.8, freq: "yearly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
