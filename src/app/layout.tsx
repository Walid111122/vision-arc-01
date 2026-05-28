import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/human/SmoothScroll";
import { CustomCursor } from "@/components/human/CustomCursor";
import { ThemeProvider } from "@/components/human/ThemeProvider";
import "./globals.css";

/* ─── Typography ────────────────────────────────────────────────────────── */
const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/* ─── SEO Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // TODO: Change to production URL on deployment
  title: "VisionArc — Human-Centric Digital Agency",
  description: "We partner with ambitious businesses to craft visual identities, run media that converts, and build web experiences that feel hand-made. We reject the ordinary. We design for impact.",
  keywords: ["Digital Agency", "Luxury Branding", "Awwwards Web Design", "Media Buying", "Creative Agency"],
  authors: [{ name: "VisionArc" }],
  openGraph: {
    title: "VisionArc — Branding, Media & Web Development",
    description: "A human-centric digital agency — where craft meets strategy.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VisionArc Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisionArc — Premium Digital Agency",
    description: "A human-centric digital agency — where craft meets strategy.",
    images: ["/og-image.png"],
  },
};

/* ─── Root Layout ───────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontSerif.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col bg-va-paper text-va-ink font-sans selection:bg-[var(--va-accent)] selection:text-white overflow-x-hidden transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {/* Ambient Red-Orange Glow */}
        <div className="fixed top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-va-accent/15 blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-va-accent/10 blur-[150px] rounded-full pointer-events-none z-0" />
        
        {/* Grain overlay */}
        <div aria-hidden="true" className="grain-overlay" />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
