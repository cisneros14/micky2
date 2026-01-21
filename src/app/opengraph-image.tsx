import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Easy Closers - We Buy Houses For Cash";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Fonts
  // In a real app, you might fetch a custom font here

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #00517d, #002d4f)",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        We Buy Houses For Cash
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          opacity: 0.8,
        }}
      >
        No Repairs • No Commissions • Easy Closers
      </div>

      {/* Decorative Element */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          display: "flex",
          fontSize: 20,
          opacity: 0.5,
        }}
      >
        easyclosers.com
      </div>
    </div>,
    {
      ...size,
    },
  );
}
