"use client";

import Image from "next/image";
import React, { useState } from "react";
import ContactDialog from "./ContactDialog";
import { CurtainLink } from "./Curtain";
import { Reveal, RevealLine } from "./motion/Reveal";

/**
 * Energy Audit. Copy unchanged; the skewed clip-path image is replaced with
 * a plain plate and a caption, because a technical service sells better on
 * a straight edge than a dynamic one.
 */
export default function Section3() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="slide-over relative overflow-hidden bg-sheet section-y">
        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal dir="left" className="order-2 lg:order-1">
              <figure className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
                  <Image
                    src="/images/energy-audit.webp"
                    alt="Energy Audit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                  />
                </div>
                <figcaption className="t-label mt-3 flex items-center justify-between">
                  <span>Plate 01 — floor audit</span>
                  <span className="text-brand-deep">30-day interval data</span>
                </figcaption>
              </figure>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal dir="none">
                <p className="t-label tick-row">Service 01</p>
              </Reveal>

              <h2 className="t-h2 uppercase">
                <RevealLine as="span">Energy Audit</RevealLine>
              </h2>

              <Reveal delay={120}>
                <p className="mt-6 rule-t pt-5 text-lg text-brand-deep">
                  Optimize Your Operations
                </p>
                <p className="t-body mt-5 max-w-[46ch]">
                  Our Chief Energy Advisor walks your floor and prices every
                  leak he finds. Free, and the report is yours either way.
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  <CurtainLink href="/services/energy-audit" className="btn btn--outline">
                    Learn More
                  </CurtainLink>
                  <button onClick={() => setIsDialogOpen(true)} className="btn btn--primary">
                    Request Audit
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
}
