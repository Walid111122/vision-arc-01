"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";

/* ─── Spring config ─────────────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 30, mass: 1.8 } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const textVariants: Variants = {
  hidden: { y: 120, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: spring },
};

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { t, language } = useLanguage();

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 py-32 md:py-48"
      aria-label="About the Agency"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center"
      >
        {/* ── Left Side: Massive Typography Manifesto ───────────────────── */}
        <div className="flex-1">
          <motion.p
            variants={textVariants}
            className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-8"
            style={{ color: "var(--va-accent)" }}
          >
            {t("about.manifesto")}
          </motion.p>
          <h2
            className="text-5xl md:text-6xl lg:text-8xl leading-[1.05]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              color: "var(--va-ink)",
              letterSpacing: language === "ar" ? "0" : "-0.03em",
            }}
          >
            <motion.div variants={textVariants} className="overflow-hidden pb-2">
              {t("about.title1")}
            </motion.div>
            <motion.div variants={textVariants} className="overflow-hidden pb-2 text-gradient-neon">
              {t("about.title2")}
            </motion.div>
            <motion.div variants={textVariants} className="overflow-hidden pb-2">
              {t("about.title3")}
            </motion.div>
            <motion.div variants={textVariants} className="overflow-hidden pb-2 text-gradient-neon" style={{ fontStyle: "italic" }}>
              {t("about.title4")}
            </motion.div>
          </h2>
        </div>

        {/* ── Right Side: Ethos Details ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-12 lg:max-w-md">
          <motion.div variants={textVariants}>
            <p className="font-sans text-xl leading-relaxed font-medium mb-6" style={{ color: "var(--va-ink)" }}>
              {t("about.desc1")}
            </p>
            <p className="font-sans text-lg leading-relaxed" style={{ color: "var(--va-ink-muted)" }}>
              {t("about.desc2")}
            </p>
          </motion.div>

          <motion.div variants={textVariants} className="grid grid-cols-2 gap-8 pt-8 border-t" style={{ borderColor: "var(--va-rule)" }}>
            <div>
              <p className="text-5xl mb-2 font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--va-accent)" }}>
                {t("about.stat1.val")}
              </p>
              <p className="text-sm font-sans uppercase tracking-widest font-semibold" style={{ color: "var(--va-ink-muted)" }}>
                {t("about.stat1.lbl")}
              </p>
            </div>
            <div>
              <p className="text-5xl mb-2 font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--va-accent)" }}>
                {t("about.stat2.val")}
              </p>
              <p className="text-sm font-sans uppercase tracking-widest font-semibold" style={{ color: "var(--va-ink-muted)" }}>
                {t("about.stat2.lbl")}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
