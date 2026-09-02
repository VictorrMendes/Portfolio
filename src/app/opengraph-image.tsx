import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = "Portfólio de Victor Mendes de Souza";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09030f",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(138,43,226,0.2), transparent 45%)",
          color: "white",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "4px solid #a855f7",
            borderRadius: 12,
            padding: "56px 88px",
            backgroundColor: "rgba(21,10,33,0.65)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            VICTOR MENDES DE SOUZA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#c77dff",
              marginTop: 24,
              textAlign: "center",
            }}
          >
            {SITE.jobTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#8b8b9e",
              marginTop: 40,
            }}
          >
            {SITE.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
