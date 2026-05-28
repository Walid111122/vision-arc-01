# VisionArc

> A human-centric digital agency platform — Branding, Social Media & Web Development.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Shadcn/ui (Radix) |
| Animation | Framer Motion (spring physics) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |

## Directory Structure

```
src/
├── app/                   # File-based routing (App Router)
├── components/
│   ├── human/             # Custom "Human" design components
│   └── ui/                # Base Shadcn/ui primitives
├── styles/                # Grain/noise filters, global CSS
├── lib/                   # Utilities (cn, etc.)
└── types/                 # Shared TypeScript types
system design/             # Project context and architecture docs
```

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design Philosophy

VisionArc deliberately avoids the generic "AI-generated" look by using:
- **Analog Textures** — Noise/grain SVG filters, paper-like borders
- **Editorial Typography** — Cormorant Garamond serif paired with Inter sans
- **Spring Physics** — Framer Motion spring animations, never linear fades
- **Intentional Asymmetry** — Hand-crafted layouts, not perfect grids
