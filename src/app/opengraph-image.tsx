import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "radial-gradient(circle at 85% 20%, rgba(184,242,74,0.18), transparent 45%), #070c17",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="9" fill="#b8f24a" />
          <path
            d="M16 5.8 7.8 8.9v6.8c0 5.1 3.4 9.1 8.2 10.9 4.8-1.8 8.2-5.8 8.2-10.9V8.9L16 5.8Z"
            stroke="#070c17"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          <path
            d="M13.4 15.2l-2-1.1M13.2 17.6h-2.2M13.4 19.9l-2 1.2M18.6 15.2l2-1.1M18.8 17.6h2.2M18.6 19.9l2 1.2M15.3 11.6l-1.2-1.6M16.7 11.6l1.2-1.6"
            stroke="#070c17"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <circle cx="16" cy="12.6" r="1.55" fill="#070c17" />
          <ellipse cx="16" cy="17.4" rx="3.1" ry="4" fill="#070c17" />
        </svg>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          Derat<span style={{ color: "#b8f24a" }}>Pro</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
          Protecție profesională împotriva dăunătorilor.
        </div>
        <div style={{ fontSize: 30, color: "#94a3b8" }}>Deratizare · Dezinsecție · Dezinfecție</div>
      </div>
    </div>,
    size,
  );
}
