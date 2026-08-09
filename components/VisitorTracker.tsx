"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mounts once at the layout level and:
 *   1. Posts a one-time `visitor` snapshot to /api/track on first visit
 *      per browser session (deduped via sessionStorage).
 *   2. Posts a `pageview` event for every Next.js client-side route change.
 *
 * Both events are forwarded to BrewMyAgent server-side. Anything we can
 * read from the browser without a permission prompt is included.
 */
export default function VisitorTracker() {
  const pathname = usePathname();

  // One-time visitor snapshot per session.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const KEY = 'ynv_visitor_sent';
    if (sessionStorage.getItem(KEY)) return;

    const nav = navigator as Navigator & {
      // Non-standard but widely available.
      deviceMemory?: number;
      connection?: {
        effectiveType?: string;
        type?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
      };
      userAgentData?: {
        brands?: { brand: string; version: string }[];
        mobile?: boolean;
        platform?: string;
      };
    };

    const conn = nav.connection;

    const payload = {
      event: 'visitor',
      url: window.location.href,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      referrer: document.referrer || undefined,
      title: document.title,

      // UA / platform
      user_agent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      ua_brands: nav.userAgentData?.brands,
      ua_mobile: nav.userAgentData?.mobile,
      ua_platform: nav.userAgentData?.platform,

      // Locale
      language: navigator.language,
      languages: navigator.languages,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezone_offset_minutes: new Date().getTimezoneOffset(),

      // Display
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_pixel_ratio: window.devicePixelRatio,
      color_depth: window.screen.colorDepth,
      orientation:
        typeof window.screen.orientation !== 'undefined'
          ? window.screen.orientation.type
          : undefined,

      // Hardware
      hardware_concurrency: navigator.hardwareConcurrency,
      device_memory_gb: nav.deviceMemory,
      max_touch_points: navigator.maxTouchPoints,

      // Network (Network Information API — Chromium only)
      connection_effective_type: conn?.effectiveType,
      connection_type: conn?.type,
      connection_downlink_mbps: conn?.downlink,
      connection_rtt_ms: conn?.rtt,
      connection_save_data: conn?.saveData,

      // Misc
      cookie_enabled: navigator.cookieEnabled,
      do_not_track: navigator.doNotTrack,
      online: navigator.onLine,
    };

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then(() => sessionStorage.setItem(KEY, '1'))
      .catch(() => {
        /* swallow — never break UX over analytics */
      });
  }, []);

  // Lightweight pageview ping on every route change.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'pageview',
        url: window.location.href,
        pathname,
        title: document.title,
        referrer: document.referrer || undefined,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
