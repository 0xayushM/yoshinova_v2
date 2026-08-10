/**
 * Conversion events.
 *
 * Traffic numbers are not measurement. These are the five things worth
 * counting on this site, and every one of them corresponds to a real step
 * toward an audit booking.
 *
 * Set NEXT_PUBLIC_GA_ID to switch analytics on. With it unset — local dev,
 * previews — every call here is a no-op, so nothing pollutes the property and
 * nothing breaks.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const analyticsEnabled = () => GA_ID.length > 0;

export type ConversionEvent =
  /** audit dialog submitted — the primary conversion */
  | "audit_request"
  /** long-form contact page submitted */
  | "contact_submit"
  /** tapped through to WhatsApp */
  | "whatsapp_click"
  /** tapped a tel: link */
  | "call_click"
  /** downloaded the brochure — softer intent, still worth a number */
  | "brochure_download"
  /** moved a slider on the savings estimator */
  | "estimator_used";

export function track(
  event: ConversionEvent,
  params: Record<string, string | number | undefined> = {},
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

/**
 * Fires at most once per page view. The estimator has two sliders and a
 * handful of band buttons; without this, one visitor idly dragging would
 * report as dozens of conversions.
 */
const fired = new Set<string>();
export function trackOnce(
  event: ConversionEvent,
  params: Record<string, string | number | undefined> = {},
) {
  if (fired.has(event)) return;
  fired.add(event);
  track(event, params);
}
