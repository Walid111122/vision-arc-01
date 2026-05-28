"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Calculator,
  Compass,
  Zap,
  Plus,
  Minus
} from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";
import {
  pricingPackages,
  calculatorOptions,
  pricingFAQs,
  PricingPackage,
  socialMediaPackages,
  SocialMediaPackage
} from "@/lib/data/pricing";

/* ─── Animation presets ────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 28, mass: 1.5 } as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: spring },
};

const scaleIn: Variants = {
  hidden: { scale: 0.94, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: spring },
};

const tabContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.2 }
  }
};

/* ─── Scroll-triggered wrapper ─────────────────────────────────────── */
function RevealSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function PricingPage() {
  /* Active category toggle: 'web' or 'social' */
  const [activeTab, setActiveTab] = useState<'web' | 'social'>('web');

  /* State for the interactive pricing calculator */
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "logo_branding",
    "single_landing"
  ]);

  const toggleCalculatorService = (id: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(id)) {
        // Prevent deselecting everything, keep at least one
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        // Conflict resolution: landing page and multi-page cannot be selected at the same time
        if (id === "single_landing") {
          return [...prev.filter((x) => x !== "multi_pages"), id];
        }
        if (id === "multi_pages") {
          return [...prev.filter((x) => x !== "single_landing"), id];
        }
        // Conflict resolution: logo branding and full identity
        if (id === "logo_branding") {
          return [...prev.filter((x) => x !== "full_identity"), id];
        }
        if (id === "full_identity") {
          return [...prev.filter((x) => x !== "logo_branding"), id];
        }
        return [...prev, id];
      }
    });
  };

  /* Calculate custom pricing dynamically */
  const calculatedTotal = useMemo(() => {
    return selectedServices.reduce((sum, serviceId) => {
      const option = calculatorOptions.find((opt) => opt.id === serviceId);
      return sum + (option ? option.baseCost : 0);
    }, 0);
  }, [selectedServices]);

  return (
    <>
      <Nav />
      <main className="w-full relative z-10 overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-va-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-[60%] right-[-10%] w-[500px] h-[500px] rounded-full bg-va-accent/5 blur-[120px] pointer-events-none" />

        {/* ── HERO SECTION ───────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-6"
              style={{ color: "var(--va-accent)" }}
            >
              Investments
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 max-w-4xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: "var(--va-ink)",
                letterSpacing: "-0.03em",
              }}
            >
              Transparent packages.{" "}
              <em className="text-editorial text-gradient-neon block md:inline" style={{ fontStyle: "italic" }}>
                Built around your growth.
              </em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.35 }}
              className="max-w-xl text-lg font-sans leading-relaxed"
              style={{ color: "var(--va-ink-muted)" }}
            >
              We believe in clear numbers, transparent milestones, and zero hidden costs.
              Select one of our established service plans, or configure a completely bespoke
              stack using our custom estimator below.
            </motion.p>
          </div>
        </section>

        {/* ── PRICING CARDS ──────────────────────────────────────────── */}
        <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
          {/* Category Toggle */}
          <div className="flex justify-center mb-16">
            <div
              className="p-1 rounded-full flex items-center gap-1 border"
              style={{
                background: "var(--va-surface)",
                borderColor: "var(--va-rule)",
              }}
            >
              <button
                onClick={() => setActiveTab("web")}
                className="px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider relative transition-colors"
                style={{
                  color: activeTab === "web" ? "var(--va-paper)" : "var(--va-ink-muted)",
                }}
              >
                {activeTab === "web" && (
                  <motion.div
                    layoutId="activePricingTab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--va-ink)", zIndex: 0 }}
                    transition={spring}
                  />
                )}
                <span className="relative z-10">Web & Branding</span>
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className="px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider relative transition-colors"
                style={{
                  color: activeTab === "social" ? "var(--va-paper)" : "var(--va-ink-muted)",
                }}
              >
                {activeTab === "social" && (
                  <motion.div
                    layoutId="activePricingTab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--va-ink)", zIndex: 0 }}
                    transition={spring}
                  />
                )}
                <span className="relative z-10">Social Media & Ads</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "web" ? (
              <motion.div
                key="web-pricing"
                variants={tabContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
              >
                {pricingPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.name}
                    variants={scaleIn}
                    whileHover={{ y: -6 }}
                    transition={spring}
                    className={`relative flex flex-col p-8 md:p-10 rounded-3xl transition-shadow ${
                      pkg.highlighted ? "shadow-2xl" : "shadow-md"
                    }`}
                    style={{
                      background: pkg.highlighted ? "var(--va-ink)" : "var(--va-surface)",
                      border: pkg.highlighted
                        ? "1px solid var(--va-accent)"
                        : "1px solid var(--va-rule)",
                    }}
                  >
                    {/* Popular badge */}
                    {pkg.highlighted && (
                      <span
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest"
                        style={{
                          background: "var(--va-accent)",
                          color: "var(--va-paper)",
                        }}
                      >
                        <Sparkles size={12} className="animate-pulse" /> Most Popular
                      </span>
                    )}

                    {/* Card Icon Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3
                          className="text-2xl font-serif font-bold"
                          style={{
                            color: pkg.highlighted ? "var(--va-paper)" : "var(--va-ink)",
                          }}
                        >
                          {pkg.name}
                        </h3>
                        <p
                          className="font-sans text-xs tracking-wider uppercase font-semibold mt-1"
                          style={{
                            color: pkg.highlighted ? "var(--va-accent)" : "var(--va-ink-muted)",
                          }}
                        >
                          {idx === 0 ? "Entry Plan" : idx === 1 ? "Expansion Plan" : "Custom Spec"}
                        </p>
                      </div>
                      {idx === 0 && <Compass size={24} className="text-va-accent opacity-60" />}
                      {idx === 1 && <Zap size={24} className="text-va-accent" />}
                      {idx === 2 && <Calculator size={24} className="text-va-accent opacity-60" />}
                    </div>

                    {/* Price Display */}
                    <div className="mb-6">
                      <span
                        className="text-4xl md:text-5xl font-serif font-bold tracking-tight block"
                        style={{
                          color: pkg.highlighted ? "var(--va-paper)" : "var(--va-accent)",
                        }}
                      >
                        {pkg.price}
                      </span>
                      <span
                        className="text-xs font-sans font-medium uppercase tracking-widest mt-1 block"
                        style={{
                          color: pkg.highlighted
                            ? "color-mix(in srgb, var(--va-paper) 50%, transparent)"
                            : "var(--va-ink-muted)",
                        }}
                      >
                        One-time Project Cost
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className="font-sans text-sm leading-relaxed mb-8"
                      style={{
                        color: pkg.highlighted
                          ? "color-mix(in srgb, var(--va-paper) 70%, transparent)"
                          : "var(--va-ink-muted)",
                      }}
                    >
                      {pkg.description}
                    </p>

                    {/* Features List */}
                    <ul className="flex flex-col gap-3.5 mb-10 flex-1">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 font-sans text-sm"
                          style={{
                            color: pkg.highlighted ? "var(--va-paper)" : "var(--va-ink)",
                          }}
                        >
                          <span
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{
                              background: pkg.highlighted
                                ? "color-mix(in srgb, var(--va-accent) 25%, transparent)"
                                : "color-mix(in srgb, var(--va-accent) 12%, transparent)",
                            }}
                          >
                            <Check
                              size={12}
                              strokeWidth={3}
                              style={{ color: "var(--va-accent)" }}
                            />
                          </span>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Link */}
                    <Link
                      href={
                        idx === 2
                          ? "#calculator"
                          : `/#contact?plan=${pkg.name.toLowerCase()}`
                      }
                      className="mt-auto block"
                    >
                      <motion.span
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-sans font-bold rounded-xl"
                        style={{
                          background: pkg.highlighted ? "var(--va-accent)" : "var(--va-paper)",
                          color: pkg.highlighted ? "var(--va-paper)" : "var(--va-ink)",
                          border: pkg.highlighted ? "none" : "1px solid var(--va-rule)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {pkg.ctaText} <ArrowUpRight size={15} />
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="social-pricing"
                variants={tabContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center w-full"
              >
                <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full">
                  {socialMediaPackages.map((pkg, idx) => (
                    <motion.div
                      key={pkg.name}
                      variants={scaleIn}
                      whileHover={{ y: -6 }}
                      transition={spring}
                      className={`relative flex flex-col p-8 md:p-10 rounded-3xl transition-shadow ${
                        pkg.highlighted ? "shadow-2xl" : "shadow-md"
                      }`}
                      style={{
                        background: pkg.highlighted ? "var(--va-ink)" : "var(--va-surface)",
                        border: pkg.highlighted
                          ? "1px solid var(--va-accent)"
                          : "1px solid var(--va-rule)",
                      }}
                    >
                      {/* Popular badge */}
                      {pkg.highlighted && (
                        <span
                          className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest"
                          style={{
                            background: "var(--va-accent)",
                            color: "var(--va-paper)",
                          }}
                        >
                          <Sparkles size={12} className="animate-pulse" /> Most Popular
                        </span>
                      )}

                      {/* Card Icon Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3
                            className="text-2xl font-serif font-bold"
                            style={{
                              color: pkg.highlighted ? "var(--va-paper)" : "var(--va-ink)",
                            }}
                          >
                            {pkg.name}
                          </h3>
                          <p
                            className="font-sans text-xs tracking-wider uppercase font-semibold mt-1"
                            style={{
                              color: pkg.highlighted ? "var(--va-accent)" : "var(--va-ink-muted)",
                            }}
                          >
                            {idx === 0 ? "Starter Tier" : idx === 1 ? "Scaler Tier" : "Enterprise Tier"}
                          </p>
                        </div>
                        {idx === 0 && <Compass size={24} className="text-va-accent opacity-60" />}
                        {idx === 1 && <Zap size={24} className="text-va-accent" />}
                        {idx === 2 && <Calculator size={24} className="text-va-accent opacity-60" />}
                      </div>

                      {/* Price Display (Dual Currency) */}
                      <div className="mb-4">
                        <span
                          className="text-3xl md:text-4xl font-serif font-bold tracking-tight block"
                          style={{
                            color: pkg.highlighted ? "var(--va-paper)" : "var(--va-accent)",
                          }}
                        >
                          {pkg.priceEGP} <span className="text-sm font-sans font-normal opacity-70">/ mo</span>
                        </span>
                        <span
                          className="text-sm font-sans font-medium uppercase tracking-widest mt-1 block"
                          style={{
                            color: pkg.highlighted
                              ? "color-mix(in srgb, var(--va-paper) 60%, transparent)"
                              : "var(--va-ink-muted)",
                          }}
                        >
                          or {pkg.priceUSD} USD / month
                        </span>
                      </div>

                      {/* Target Audience */}
                      <p
                        className="font-sans text-xs leading-relaxed italic mb-6 pb-4 border-b animate-pulse-slow"
                        style={{
                          borderColor: pkg.highlighted
                            ? "color-mix(in srgb, var(--va-paper) 15%, transparent)"
                            : "var(--va-rule)",
                          color: pkg.highlighted
                            ? "color-mix(in srgb, var(--va-paper) 80%, transparent)"
                            : "var(--va-ink-muted)",
                        }}
                      >
                        {pkg.targetAudience}
                      </p>

                      {/* Deliverables List */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p
                            className="text-xs font-sans font-bold uppercase tracking-wider mb-3"
                            style={{
                              color: pkg.highlighted ? "var(--va-accent)" : "var(--va-ink-muted)",
                            }}
                          >
                            Deliverables:
                          </p>
                          <ul className="flex flex-col gap-3 mb-6">
                            {pkg.deliverables.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 font-sans text-xs"
                                style={{
                                  color: pkg.highlighted ? "var(--va-paper)" : "var(--va-ink)",
                                }}
                              >
                                <span
                                  className="mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center"
                                  style={{
                                    background: pkg.highlighted
                                      ? "color-mix(in srgb, var(--va-accent) 25%, transparent)"
                                      : "color-mix(in srgb, var(--va-accent) 12%, transparent)",
                                  }}
                                >
                                  <Check
                                    size={10}
                                    strokeWidth={3}
                                    style={{ color: "var(--va-accent)" }}
                                  />
                                </span>
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Excluded Section */}
                        {pkg.excluded && pkg.excluded.length > 0 && (
                          <div
                            className="mt-4 pt-4 border-t"
                            style={{
                              borderColor: pkg.highlighted
                                ? "color-mix(in srgb, var(--va-paper) 15%, transparent)"
                                : "var(--va-rule)",
                            }}
                          >
                            <p
                              className="text-xs font-sans font-bold uppercase tracking-wider mb-2.5"
                              style={{
                                color: pkg.highlighted ? "color-mix(in srgb, var(--va-paper) 50%, transparent)" : "var(--va-ink-muted)",
                              }}
                            >
                              Excluded:
                            </p>
                            <ul className="flex flex-col gap-2">
                              {pkg.excluded.map((ex) => (
                                <li
                                  key={ex}
                                  className="flex items-start gap-2 font-sans text-[11px]"
                                  style={{
                                    color: pkg.highlighted
                                      ? "color-mix(in srgb, var(--va-paper) 50%, transparent)"
                                      : "var(--va-ink-muted)",
                                  }}
                                >
                                  <span className="text-red-500 font-bold leading-none select-none">×</span>
                                  <span className="leading-snug">{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* CTA Link */}
                      <Link
                        href={`/#contact?package=${pkg.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        className="mt-8 block"
                      >
                        <motion.span
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-sans font-bold rounded-xl"
                          style={{
                            background: pkg.highlighted ? "var(--va-accent)" : "var(--va-paper)",
                            color: pkg.highlighted ? "var(--va-paper)" : "var(--va-ink)",
                            border: pkg.highlighted ? "none" : "1px solid var(--va-rule)",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {pkg.ctaText} <ArrowUpRight size={15} />
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Disclaimer Note */}
                <motion.div
                  className="mt-12 p-6 rounded-2xl border text-center font-sans text-sm max-w-4xl w-full backdrop-blur-md"
                  style={{
                    background: "color-mix(in srgb, var(--va-accent) 4%, var(--va-surface))",
                    borderColor: "var(--va-rule)",
                    color: "var(--va-ink-muted)",
                  }}
                >
                  <span className="text-base mr-1">💡</span>
                  All plans can be invoiced in EGP or equivalent USD values. All listed prices represent Agency Management Fees only. Ad Spend Budgets are paid directly by the client to the advertising platforms.
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </RevealSection>

        {/* ── INTERACTIVE BUDGET CALCULATOR ──────────────────────────── */}
        <RevealSection
          id="calculator"
          className="w-full py-24 md:py-32 border-t"
          style={{ borderColor: "var(--va-rule)", background: "var(--va-surface)" }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
                style={{ color: "var(--va-accent)" }}
              >
                Bespoke Builder
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-6xl mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  color: "var(--va-ink)",
                  letterSpacing: "-0.03em",
                }}
              >
                Build Your Own Stack
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-sans text-base leading-relaxed"
                style={{ color: "var(--va-ink-muted)" }}
              >
                Toggle the creative services, engineering components, and optimization audits below
                to estimate your total launch investment in real-time.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Options selectors (Left - 7 columns) */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Category: Design / Brand */}
                <div>
                  <h3
                    className="text-xs tracking-[0.25em] font-sans font-bold uppercase mb-4"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    Brand & Strategy
                  </h3>
                  <div className="flex flex-col gap-3">
                    {calculatorOptions
                      .filter((o) => o.category === "design")
                      .map((opt) => {
                        const isSelected = selectedServices.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => toggleCalculatorService(opt.id)}
                            className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border select-none hover:shadow-md"
                            style={{
                              background: isSelected ? "var(--va-paper)" : "transparent",
                              borderColor: isSelected ? "var(--va-accent)" : "var(--va-rule)",
                            }}
                          >
                            <div className="pr-4 flex-1">
                              <h4
                                className="font-sans text-sm font-bold"
                                style={{ color: "var(--va-ink)" }}
                              >
                                {opt.name}
                              </h4>
                              <p
                                className="font-sans text-xs mt-1 leading-normal"
                                style={{ color: "var(--va-ink-muted)" }}
                              >
                                {opt.description}
                              </p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                              <span
                                className="font-sans text-sm font-semibold"
                                style={{ color: isSelected ? "var(--va-accent)" : "var(--va-ink)" }}
                              >
                                + EGP {opt.baseCost.toLocaleString()}
                              </span>
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center border transition-all"
                                style={{
                                  borderColor: isSelected ? "var(--va-accent)" : "var(--va-rule)",
                                  background: isSelected ? "var(--va-accent)" : "transparent",
                                }}
                              >
                                {isSelected ? (
                                  <Check size={12} strokeWidth={3} className="text-va-paper" />
                                ) : (
                                  <Plus size={10} style={{ color: "var(--va-ink-muted)" }} />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Category: Web & Engineering */}
                <div>
                  <h3
                    className="text-xs tracking-[0.25em] font-sans font-bold uppercase mb-4"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    Engineering & Development
                  </h3>
                  <div className="flex flex-col gap-3">
                    {calculatorOptions
                      .filter((o) => o.category === "web")
                      .map((opt) => {
                        const isSelected = selectedServices.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => toggleCalculatorService(opt.id)}
                            className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border select-none hover:shadow-md"
                            style={{
                              background: isSelected ? "var(--va-paper)" : "transparent",
                              borderColor: isSelected ? "var(--va-accent)" : "var(--va-rule)",
                            }}
                          >
                            <div className="pr-4 flex-1">
                              <h4
                                className="font-sans text-sm font-bold"
                                style={{ color: "var(--va-ink)" }}
                              >
                                {opt.name}
                              </h4>
                              <p
                                className="font-sans text-xs mt-1 leading-normal"
                                style={{ color: "var(--va-ink-muted)" }}
                              >
                                {opt.description}
                              </p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                              <span
                                className="font-sans text-sm font-semibold"
                                style={{ color: isSelected ? "var(--va-accent)" : "var(--va-ink)" }}
                              >
                                + EGP {opt.baseCost.toLocaleString()}
                              </span>
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center border transition-all"
                                style={{
                                  borderColor: isSelected ? "var(--va-accent)" : "var(--va-rule)",
                                  background: isSelected ? "var(--va-accent)" : "transparent",
                                }}
                              >
                                {isSelected ? (
                                  <Check size={12} strokeWidth={3} className="text-va-paper" />
                                ) : (
                                  <Plus size={10} style={{ color: "var(--va-ink-muted)" }} />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Category: Marketing */}
                <div>
                  <h3
                    className="text-xs tracking-[0.25em] font-sans font-bold uppercase mb-4"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    Optimization & Media Campaigns
                  </h3>
                  <div className="flex flex-col gap-3">
                    {calculatorOptions
                      .filter((o) => o.category === "marketing")
                      .map((opt) => {
                        const isSelected = selectedServices.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => toggleCalculatorService(opt.id)}
                            className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border select-none hover:shadow-md"
                            style={{
                              background: isSelected ? "var(--va-paper)" : "transparent",
                              borderColor: isSelected ? "var(--va-accent)" : "var(--va-rule)",
                            }}
                          >
                            <div className="pr-4 flex-1">
                              <h4
                                className="font-sans text-sm font-bold"
                                style={{ color: "var(--va-ink)" }}
                              >
                                {opt.name}
                              </h4>
                              <p
                                className="font-sans text-xs mt-1 leading-normal"
                                style={{ color: "var(--va-ink-muted)" }}
                              >
                                {opt.description}
                              </p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                              <span
                                className="font-sans text-sm font-semibold"
                                style={{ color: isSelected ? "var(--va-accent)" : "var(--va-ink)" }}
                              >
                                + EGP {opt.baseCost.toLocaleString()}
                              </span>
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center border transition-all"
                                style={{
                                  borderColor: isSelected ? "var(--va-accent)" : "var(--va-rule)",
                                  background: isSelected ? "var(--va-accent)" : "transparent",
                                }}
                              >
                                {isSelected ? (
                                  <Check size={12} strokeWidth={3} className="text-va-paper" />
                                ) : (
                                  <Plus size={10} style={{ color: "var(--va-ink-muted)" }} />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Estimate Summary card (Right - 5 columns) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div
                  className="rounded-3xl p-8 border shadow-xl flex flex-col gap-6"
                  style={{ background: "var(--va-paper)", borderColor: "var(--va-rule)" }}
                >
                  <div className="border-b pb-4" style={{ borderColor: "var(--va-rule)" }}>
                    <h3
                      className="font-serif text-xl font-bold mb-1"
                      style={{ color: "var(--va-ink)" }}
                    >
                      Bespoke Estimate
                    </h3>
                    <p className="font-sans text-xs" style={{ color: "var(--va-ink-muted)" }}>
                      Items list & dynamic billing projection
                    </p>
                  </div>

                  {/* Selected items receipt */}
                  <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                    <AnimatePresence initial={false}>
                      {selectedServices.map((serviceId) => {
                        const opt = calculatorOptions.find((o) => o.id === serviceId);
                        if (!opt) return null;
                        return (
                          <motion.div
                            key={opt.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex justify-between items-start text-xs font-sans leading-normal overflow-hidden"
                          >
                            <span className="flex-1 font-semibold pr-4" style={{ color: "var(--va-ink)" }}>
                              {opt.name}
                            </span>
                            <span className="font-medium text-right flex-shrink-0" style={{ color: "var(--va-ink-muted)" }}>
                              EGP {opt.baseCost.toLocaleString()}
                            </span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Horizontal dividing line */}
                  <div className="border-t pt-4 flex flex-col gap-4" style={{ borderColor: "var(--va-rule)" }}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-sm font-bold" style={{ color: "var(--va-ink)" }}>
                        Estimated Launch:
                      </span>
                      <motion.span
                        key={calculatedTotal}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-serif text-3xl md:text-4xl font-extrabold"
                        style={{ color: "var(--va-accent)" }}
                      >
                        EGP {calculatedTotal.toLocaleString()}
                      </motion.span>
                    </div>

                    <div className="text-[11px] font-sans leading-normal px-4 py-3 rounded-lg" style={{ background: "var(--va-surface)", color: "var(--va-ink-muted)" }}>
                      *Estimates represent ballpark figures based on structural engineering difficulty. Final billing depends on visual scope approval.
                    </div>

                    {/* Book bespoke stack */}
                    <Link
                      href={`/#contact?message=I would like to discuss a custom build with the following options: ${selectedServices.join(", ")}`}
                      className="w-full"
                    >
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-sans font-bold rounded-xl"
                        style={{
                          background: "var(--va-accent)",
                          color: "var(--va-paper)",
                        }}
                      >
                        Book This Estimate <ArrowUpRight size={15} />
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── FAQ SECTION ────────────────────────────────────────────── */}
        <RevealSection className="max-w-[900px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
              style={{ color: "var(--va-accent)" }}
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: "var(--va-ink)",
                letterSpacing: "-0.03em",
              }}
            >
              Pricing Details
            </motion.h2>
          </div>

          <FAQAccordion />
        </RevealSection>

        {/* ── CTA BANNER ────────────────────────────────────────────── */}
        <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
          <motion.div
            variants={scaleIn}
            className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden"
            style={{
              background: "var(--va-ink)",
              border: "1px solid var(--va-rule)",
            }}
          >
            {/* Background Accent Sphere */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background: "var(--va-accent)",
                opacity: 0.08,
                filter: "blur(120px)",
              }}
            />
            <div className="relative z-10">
              <p
                className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-6"
                style={{ color: "var(--va-accent)" }}
              >
                Let&apos;s build it
              </p>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  color: "var(--va-paper)",
                  letterSpacing: "-0.03em",
                }}
              >
                Ready to launch?{" "}
                <em className="text-editorial text-gradient-neon" style={{ fontStyle: "italic" }}>
                  Start today.
                </em>
              </h2>
              <p
                className="font-sans text-lg max-w-xl mx-auto mb-10"
                style={{
                  color: "color-mix(in srgb, var(--va-paper) 60%, transparent)",
                }}
              >
                Secure your project timeline slots. Fill out the contact form on the home page,
                mention your desired pricing plan, and our engineering lead will reach out.
              </p>
              <Link href="/#contact">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-sans font-semibold rounded-lg shadow-2xl"
                  style={{
                    background: "var(--va-accent)",
                    color: "var(--va-paper)",
                    letterSpacing: "0.03em",
                  }}
                >
                  Book a Discovery Call <ArrowUpRight size={18} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </RevealSection>
      </main>
      <Footer />
    </>
  );
}

/* ─── Accordion Component ────────────────────────────────────────── */
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3.5">
      {pricingFAQs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--va-surface)",
              border: "1px solid var(--va-rule)",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span
                className="font-sans font-semibold text-base pr-4"
                style={{ color: "var(--va-ink)" }}
              >
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={spring}
                className="flex-shrink-0"
              >
                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  style={{ color: "var(--va-accent)" }}
                />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-6 pb-6 font-sans text-base leading-relaxed"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
