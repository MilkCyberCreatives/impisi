import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = `${SITE_NAME} social preview`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(140deg, #020814 0%, #031f3e 48%, #000000 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            opacity: 0.75,
          }}
        >
          Integrated Mining and Commodity Solutions
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 940,
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 32, opacity: 0.9, lineHeight: 1.3 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    size
  );
}
