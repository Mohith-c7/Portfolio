import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/seo"

export const runtime = "edge"
export const alt = "Mohith Kumar Chadalawada - Software Engineer portfolio"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

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
          background: "#050505",
          color: "#f8fafc",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#93c5fd",
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          <span>{siteConfig.name}</span>
          <span>{siteConfig.domain}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 92,
              lineHeight: 0.95,
              fontWeight: 500,
              maxWidth: 980,
            }}
          >
            {siteConfig.displayName}
          </h1>
          <p
            style={{
              margin: 0,
              color: "#cbd5e1",
              fontSize: 34,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Software Engineer building production-grade full-stack, backend, and product systems.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#e2e8f0",
            fontSize: 26,
          }}
        >
          <span>Next.js</span>
          <span>/</span>
          <span>FastAPI</span>
          <span>/</span>
          <span>React Native</span>
          <span>/</span>
          <span>PostgreSQL</span>
        </div>
      </div>
    ),
    size,
  )
}
