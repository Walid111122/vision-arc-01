# System Architecture & Tech Stack
## Core Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Radix UI (via Shadcn/ui)
- **Animation:** Framer Motion (for organic transitions)
- **Icons:** Lucide React (thin-stroke, minimalist)
- **Forms:** React Hook Form + Zod

## Design System
- **Components:** Custom "Human" wrapper around Shadcn/ui.
- **Layout:** Next.js Dynamic segments for project showcases.
- **Performance:** 100% Static Site Generation (SSG) where possible for instant delivery.

## Project Structure
- `/src/components/human`: Custom-designed components with texture and physics.
- `/src/components/ui`: Base Shadcn primitives.
- `/src/app`: File-based routing for services and portfolio.
- `/src/styles`: Global CSS containing grain/noise filters.