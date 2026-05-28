# Agent Skills: Creative Intelligence & Front-End Execution

This file serves as the instruction set for AI agents working within this project to ensure a cohesive, human-centric output.

## 1. Skill: Humanized Copywriting
- **Task:** Convert technical service features into human-centric benefits[cite: 1].
- **Style:** Avoid corporate buzzwords like "innovative," "synergy," or "cutting-edge." Use conversational, empathetic, and direct language[cite: 1].

## 2. Skill: Design Auditor (Human-Centric UI/UX)
- **Task:** Review design proposals and layouts to eliminate "AI-isms" (e.g., over-saturated primary color buttons, excessive glowing borders, and generic bento grids)[cite: 1].
- **Rules for a Unique, Human Design:**
  * **Asymmetric Breathing Room:** Enforce intentional white space. Instead of a standard 3-column service grid, introduce unexpected column spans (e.g., `md:col-span-2` for a flagship service followed by a narrower card).
  * **Sophisticated Editorial Typography:** Pair an elegant, high-contrast serif font (e.g., Playfair Display or Cormorant Garamond) for headers with a clean, low-contrast sans-serif (e.g., Inter or Plus Jakarta Sans) for body copy.
  * **Analog Textures:** Inject organic imperfection. Utilize noise/grain SVG filters and fine border treatments (`border-neutral-200/40`) to make elements feel like physical print material rather than flat digital vectors.
  * **Authentic Imagery Framing:** Reject glossy stock photography. Use raw, editorial-style imagery cropped using organic shapes, intentional offsets, or slight rotational angles (`-rotate-1`).

## 3. Skill: Front-End Architecture & Micro-Interactions (Next.js 15 & Tailwind)
- **Task:** Generate highly optimized, accessible component code that matches the UI/UX vision.
- **Rules for Front-End Execution:**
  * **Tactile Physics Over Linear Fades:** When implementing interactions with Framer Motion, completely ban linear or basic ease-in-out transitions. Always utilize spring physics (e.g., `type: "spring", stiffness: 200, damping: 20`) to give animations weight and tactile resistance.
  * **Shadcn/ui Customization Layer:** Treat base Shadcn primitives (`/components/ui/*`) as functional wireframes only. Wrap them or style them with unique border-radius combinations (e.g., sharp corners on buttons but ultra-rounded shapes on interactive cards), subtle box-shadows modeled after real-world paper depth, and organic hover states.
  * **Performance & Accessibility Hierarchy:** Write clean React Server Components (RSC) by default. Keep client-side interactions (`"use client"`) scoped tightly to small leaf components (like interactive buttons or forms) to maintain raw loading speeds. Enforce semantic HTML elements (`<main>`, `<section>`, `<article>`) instead of nested generic `<div>` wrappers.

## 4. Skill: Local Web Auditor
- **Task:** Use local Puppeteer scripts to audit potential client websites[cite: 1].
- **Output:** Generate a markdown report focusing on user experience gaps and technical performance issues[cite: 1].

## 5. Skill: Brand Strategist
- **Task:** Analyze competitor ad accounts and social presence[cite: 1].
- **Input:** Competitor URL[cite: 1].
- **Output:** A tactical "White Space" analysis showing where the client can stand out[cite: 1].