import { ImageResponse } from "next/og";

export const alt =
  "Yoshinova — energy audits and Modular Power Systems for Indian industry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated rather than a static file, so it can never go stale against the
 * copy. Uses the site's own motif — the flattened load curve — because that
 * is the whole argument in one shape, and it reads at thumbnail size where a
 * photograph would not.
 *
 * next/og runs on the edge runtime and can't use local WOFF2 without fetching
 * it, so this deliberately uses a system stack. At 1200×630 in a share card
 * the difference is invisible; correctness of the composition matters more.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F5F2",
          padding: "64px 72px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* module grid, faint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(20,22,15,.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,22,15,.055) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 34, height: 2, background: "#6A9F30" }} />
            <div
              style={{
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#7C8175",
              }}
            >
              Energy Audit · MPS Deployment · India
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
              fontSize: 78,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#14160F",
              fontWeight: 700,
            }}
          >
            <div>YOUR ENERGY</div>
            <div style={{ color: "#4A7519" }}>PROFITABILITY PARTNER</div>
          </div>
        </div>

        {/* the motif: today's curve vs the same day with an MPS */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <svg width="1056" height="150" viewBox="0 0 1056 150">
            <path
              d="M0 120 L150 114 Q260 108 330 44 T560 20 Q700 14 800 66 T1056 104"
              fill="none"
              stroke="#B23A18"
              strokeWidth="4"
              strokeDasharray="10 8"
            />
            <path
              d="M0 126 L150 122 Q300 118 460 76 T1056 70"
              fill="none"
              stroke="#6A9F30"
              strokeWidth="6"
            />
          </svg>
          <div style={{ display: "flex", gap: 34, marginTop: 12, fontSize: 20 }}>
            <div style={{ color: "#B23A18" }}>— your day today</div>
            <div style={{ color: "#4A7519" }}>— with a right-sized MPS</div>
            <div style={{ color: "#7C8175", marginLeft: "auto" }}>yoshinova.com</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
