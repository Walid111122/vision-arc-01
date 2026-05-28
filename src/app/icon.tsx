import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#050000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff3b00",
          fontWeight: 900,
          borderRadius: "6px",
          fontFamily: "system-ui",
          border: "1px solid rgba(255,59,0,0.3)"
        }}
      >
        V
      </div>
    ),
    { ...size }
  );
}
