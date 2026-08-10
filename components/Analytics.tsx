"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_ID, analyticsEnabled } from "@/lib/analytics";

/**
 * GA4, hand-rolled rather than pulling in @next/third-parties for two script
 * tags. Renders nothing at all unless NEXT_PUBLIC_GA_ID is set, so local dev
 * and preview builds never touch the property.
 *
 * `send_page_view: false` plus the manual page_view below: this is a client-
 * side routed app, so gtag's automatic page view would only ever fire on the
 * first load and every subsequent navigation would go uncounted.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!analyticsEnabled() || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!analyticsEnabled()) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
