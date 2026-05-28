"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  Variants,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FluidRibbon } from "./FluidRibbon";

/* ─── Spring config (Luxury slow/heavy) ─────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 30, mass: 1.8 } as const;

/* ─── Animation variants ─────────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const slideUp: Variants = {
  hidden:  { y: 60, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: spring },
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const scaleIn: Variants = {
  hidden:  { scale: 0.88, opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: { ...spring, delay: 0.4 } },
};

/* ─── Service labels ─────────────────────────────────────────────────────── */
const services = [
  { number: "01", label: "Branding"        },
  { number: "02", label: "Social Media"    },
  { number: "03", label: "Web Development" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* ── 3D Fluid Ribbon Background ────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 opacity-60">
          <FluidRibbon />
        </div>
        {/* Gradient overlay to seamlessly blend the 3D canvas into the background color */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--va-paper)]/50 to-[var(--va-paper)]" />
      </div>

      {/* ── Background rule lines — decorative asymmetry ──────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="absolute right-0 top-0 h-full w-px hidden lg:block z-0"
        style={{ background: "var(--va-rule)", right: "28%" }}
        aria-hidden="true"
      />

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-0 items-center min-h-[80vh] py-16">

        {/* ─── LEFT — Editorial heading ─────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-8 lg:pr-20"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={slideUp}
            className="text-xs tracking-[0.35em] uppercase font-sans font-semibold"
            style={{ color: "var(--va-accent)" }}
          >
            Digital Agency — Est. 2024
          </motion.p>

          {/* Heading — staggered word-by-word */}
          <div className="overflow-hidden" aria-label="Where brands earn their humanity">
            <motion.h1
              variants={slideUp}
              className="leading-[1.05] max-w-2xl text-6xl md:text-8xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: "var(--va-ink)",
                letterSpacing: "-0.04em",
              }}
            >
              Where brands earn{" "}
              <br className="hidden sm:block" />
              their{" "}
              <em
                className="text-editorial text-gradient-neon"
                style={{ fontStyle: "italic" }}
              >
                humanity.
              </em>
            </motion.h1>
          </div>

          {/* Sub-copy */}
          <motion.p
            variants={slideUp}
            className="max-w-md text-lg font-sans leading-relaxed"
            style={{ color: "var(--va-ink-muted)" }}
          >
            We partner with ambitious businesses to craft visual identities, run
            media that converts, and build web experiences that feel hand-made —
            not generated.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#contact"
              id="hero-cta-primary"
              whileHover={{ scale: 1.03, x: 2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-sans font-medium rounded-full shadow-lg group"
              style={{
                background: "var(--va-ink)",
                color: "var(--va-paper)",
                letterSpacing: "0.04em",
              }}
            >
              Start a project
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={spring}
              >
                <ArrowRight size={14} strokeWidth={1.5} />
              </motion.span>
            </motion.a>

            <motion.a
              href="#work"
              id="hero-cta-secondary"
              whileHover={{ x: 2 }}
              transition={spring}
              className="inline-flex items-center gap-2 text-sm font-sans font-medium underline underline-offset-4"
              style={{ color: "var(--va-ink-muted)", textDecorationColor: "var(--va-rule)" }}
            >
              View our work
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT — Decorative panel ─────────────────────────────── */}
        <motion.div
          style={{ y: y2 }}
          variants={scaleIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative hidden lg:flex flex-col justify-between h-[80%] pl-10 py-16 backdrop-blur-sm rounded-3xl"
          style={{ borderLeft: "1px solid var(--va-rule)" }}
        >
          {/* Services list */}
          <div className="flex flex-col gap-8">
            <p
              className="text-[10px] tracking-[0.4em] uppercase font-sans font-semibold"
              style={{ color: "var(--va-ink-muted)" }}
            >
              Our services
            </p>
            {services.map(({ number, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ ...spring, delay: 0.5 + i * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-baseline gap-3 group cursor-default"
              >
                <span
                  className="text-[10px] font-sans font-bold"
                  style={{ color: "var(--va-accent)", fontVariantNumeric: "tabular-nums" }}
                >
                  {number}
                </span>
                <span
                  className="text-xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 500,
                    color: "var(--va-ink)",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s ease",
                  }}
                >
                  {label}
                </span>
                <motion.span
                  className="ml-auto"
                  initial={{ opacity: 0, x: -4 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={spring}
                  style={{ color: "var(--va-accent)" }}
                >
                  →
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Decorative rotated card */}
          <motion.div
            className="relative mt-8"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="surface-card shadow-xl p-6 flex flex-col gap-3 rounded-2xl"
              style={{ background: "var(--va-surface)", border: "1px solid var(--va-rule)" }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-sans font-semibold"
                style={{ color: "var(--va-accent)" }}
              >
                Our ethos
              </p>
              <blockquote
                className="text-base leading-snug"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  color: "var(--va-ink)",
                }}
              >
                &ldquo;Generic design is invisible. We make brands that people
                actually remember.&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom scroll indicator ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ ...spring, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-10"
          style={{ background: "var(--va-rule)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <span
          className="text-[9px] tracking-[0.4em] uppercase font-sans font-bold"
          style={{ color: "var(--va-ink-muted)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
