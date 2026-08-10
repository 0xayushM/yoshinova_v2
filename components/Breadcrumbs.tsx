"use client";

import { CurtainLink } from "./Curtain";

const SITE = "https://www.yoshinova.com";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumbs + BreadcrumbList schema.
 *
 * The six service pages sit two levels deep and had no trail — so a visitor
 * landing from search had no way up, and Google had no path to display in the
 * result. Emitted from one array so the visible trail and the schema agree.
 */
export default function Breadcrumbs({
  crumbs,
  tone = "ink",
}: {
  crumbs: Crumb[];
  /** `paper` for use over dark heroes */
  tone?: "ink" | "paper";
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  };

  const muted = tone === "paper" ? "!text-white/60" : "";
  const active = tone === "paper" ? "!text-white" : "!text-ink";

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.label} className="flex items-center gap-2">
                {c.href && !last ? (
                  <CurtainLink
                    href={c.href}
                    className={`t-label ${muted} transition-colors hover:${active}`}
                  >
                    {c.label}
                  </CurtainLink>
                ) : (
                  <span className={`t-label ${last ? active : muted}`} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
                {!last && (
                  <span className={`t-label ${muted}`} aria-hidden>
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
