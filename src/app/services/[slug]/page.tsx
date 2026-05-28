"use client";

import { useRef, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  Variants,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Check,
  Sparkles,
} from "lucide-react";
import { services, iconMap } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";

/* ─── Animation presets ────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 28, mass: 1.5 } as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: spring },
};

const scaleIn: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: spring },
};

/* ─── Reusable scroll-triggered section wrapper ───────────────────── */
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

/* ═══════════════════════════════════════════════════════════════════════
   SERVICE DETAIL PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.iconName];
  const relatedProjects = projects.filter((p) =>
    service.caseStudySlugs.includes(p.slug)
  );

  return (
    <>
      <Nav />
      <main className="w-full relative z-10">
        {/* ── HERO ───────────────────────────────────────────────────── */}
        <HeroSection service={service} IconComponent={IconComponent} />

        {/* ── STATS ──────────────────────────────────────────────────── */}
        <StatsSection stats={service.stats} />

        {/* ── OVERVIEW ───────────────────────────────────────────────── */}
        <OverviewSection description={service.longDescription} />

        {/* ── PROCESS ────────────────────────────────────────────────── */}
        <ProcessSection steps={service.process} />

        {/* ── DELIVERABLES ───────────────────────────────────────────── */}
        <DeliverablesSection deliverables={service.deliverables} />

        {/* ── TOOLS ──────────────────────────────────────────────────── */}
        <ToolsSection tools={service.tools} />

        {/* ── PRICING ────────────────────────────────────────────────── */}
        <PricingSection tiers={service.pricingTiers} />

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <FAQSection faq={service.faq} />

        {/* ── RELATED WORK ───────────────────────────────────────────── */}
        {relatedProjects.length > 0 && (
          <RelatedWorkSection projects={relatedProjects} />
        )}

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── Hero ─────────────────────────────────────────────────────────── */
function HeroSection({
  service,
  IconComponent,
}: {
  service: (typeof services)[0];
  IconComponent: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}) {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-15 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-va-paper/60 via-va-paper/90 to-va-paper" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium mb-12 transition-colors hover:text-[var(--va-accent)]"
            style={{ color: "var(--va-ink-muted)" }}
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>
        </motion.div>

        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.15 }}
          className="p-4 rounded-full shadow-lg inline-flex mb-8"
          style={{
            background: "var(--va-surface)",
            border: "1px solid var(--va-rule)",
          }}
        >
          <IconComponent size={32} strokeWidth={1.5} className="text-va-accent" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 max-w-5xl"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            color: "var(--va-ink)",
            letterSpacing: "-0.03em",
          }}
        >
          {service.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
          className="text-xl md:text-2xl font-sans font-medium max-w-2xl"
          style={{ color: "var(--va-ink-muted)" }}
        >
          {service.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.45 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link href="/#contact">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-sans font-semibold rounded-lg shadow-xl"
              style={{
                background: "var(--va-accent)",
                color: "var(--va-paper)",
                letterSpacing: "0.03em",
              }}
            >
              Start a Project <ArrowUpRight size={16} />
            </motion.span>
          </Link>
          <Link href="#pricing">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-sans font-semibold rounded-lg"
              style={{
                background: "var(--va-surface)",
                color: "var(--va-ink)",
                border: "1px solid var(--va-rule)",
                letterSpacing: "0.03em",
              }}
            >
              View Pricing
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats bar ────────────────────────────────────────────────────── */
function StatsSection({ stats }: { stats: { label: string; value: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="w-full border-y"
      style={{ borderColor: "var(--va-rule)", background: "var(--va-surface)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ ...spring, delay: i * 0.1 }}
            className="text-center"
          >
            <p
              className="text-4xl md:text-5xl mb-2"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                color: "var(--va-accent)",
              }}
            >
              {stat.value}
            </p>
            <p
              className="text-xs font-sans font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--va-ink-muted)" }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Overview ─────────────────────────────────────────────────────── */
function OverviewSection({ description }: { description: string }) {
  return (
    <RevealSection className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <motion.p
        variants={fadeUp}
        className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-6"
        style={{ color: "var(--va-accent)" }}
      >
        Overview
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-2xl md:text-3xl font-sans leading-[1.6] font-medium"
        style={{ color: "var(--va-ink)" }}
      >
        {description}
      </motion.p>
    </RevealSection>
  );
}

/* ─── Process ──────────────────────────────────────────────────────── */
function ProcessSection({
  steps,
}: {
  steps: { step: string; title: string; description: string }[];
}) {
  return (
    <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
      <motion.p
        variants={fadeUp}
        className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
        style={{ color: "var(--va-accent)" }}
      >
        Our Process
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-6xl mb-16"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          color: "var(--va-ink)",
          letterSpacing: "-0.03em",
        }}
      >
        How we work
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            variants={scaleIn}
            className="group relative p-8 md:p-10 rounded-2xl overflow-hidden"
            style={{
              background: "var(--va-surface)",
              border: "1px solid var(--va-rule)",
            }}
          >
            {/* Step number watermark */}
            <span
              className="absolute top-4 right-6 text-[6rem] md:text-[8rem] leading-none font-serif font-bold select-none pointer-events-none"
              style={{
                color: "var(--va-accent)",
                opacity: 0.06,
              }}
            >
              {step.step}
            </span>

            <div className="relative z-10">
              <span
                className="inline-block text-sm font-sans font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
                style={{
                  background: "color-mix(in srgb, var(--va-accent) 12%, transparent)",
                  color: "var(--va-accent)",
                }}
              >
                Step {step.step}
              </span>
              <h3
                className="text-2xl md:text-3xl mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 600,
                  color: "var(--va-ink)",
                }}
              >
                {step.title}
              </h3>
              <p
                className="font-sans text-base leading-relaxed"
                style={{ color: "var(--va-ink-muted)" }}
              >
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </RevealSection>
  );
}

/* ─── Deliverables ─────────────────────────────────────────────────── */
function DeliverablesSection({ deliverables }: { deliverables: string[] }) {
  return (
    <RevealSection
      className="w-full py-24 md:py-32"
      id="deliverables"
    >
      <div
        className="w-full py-20"
        style={{
          background: "var(--va-surface)",
          borderTop: "1px solid var(--va-rule)",
          borderBottom: "1px solid var(--va-rule)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
            style={{ color: "var(--va-accent)" }}
          >
            What You Get
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl mb-16"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              color: "var(--va-ink)",
              letterSpacing: "-0.03em",
            }}
          >
            Deliverables
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverables.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 p-5 rounded-xl group transition-colors"
                style={{
                  background: "var(--va-paper)",
                  border: "1px solid var(--va-rule)",
                }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: "color-mix(in srgb, var(--va-accent) 15%, transparent)",
                  }}
                >
                  <Check size={14} strokeWidth={2.5} className="text-va-accent" />
                </span>
                <span
                  className="font-sans font-medium text-sm"
                  style={{ color: "var(--va-ink)" }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Tools ────────────────────────────────────────────────────────── */
function ToolsSection({
  tools,
}: {
  tools: { name: string; category: string }[];
}) {
  return (
    <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <motion.p
        variants={fadeUp}
        className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
        style={{ color: "var(--va-accent)" }}
      >
        Tech Stack
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-6xl mb-16"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          color: "var(--va-ink)",
          letterSpacing: "-0.03em",
        }}
      >
        Tools & Technologies
      </motion.h2>

      <div className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <motion.div
            key={tool.name}
            variants={fadeUp}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-5 py-3 rounded-xl flex flex-col transition-shadow hover:shadow-lg"
            style={{
              background: "var(--va-surface)",
              border: "1px solid var(--va-rule)",
            }}
          >
            <span
              className="font-sans font-semibold text-sm"
              style={{ color: "var(--va-ink)" }}
            >
              {tool.name}
            </span>
            <span
              className="font-sans text-xs mt-0.5"
              style={{ color: "var(--va-ink-muted)" }}
            >
              {tool.category}
            </span>
          </motion.div>
        ))}
      </div>
    </RevealSection>
  );
}

/* ─── Pricing ──────────────────────────────────────────────────────── */
function PricingSection({
  tiers,
}: {
  tiers: {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }[];
}) {
  return (
    <RevealSection
      className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32"
      id="pricing"
    >
      <motion.p
        variants={fadeUp}
        className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
        style={{ color: "var(--va-accent)" }}
      >
        Investment
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
        Pricing
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="font-sans text-lg max-w-xl mb-16"
        style={{ color: "var(--va-ink-muted)" }}
      >
        Transparent pricing. No hidden fees. Choose the tier that fits your goals.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={scaleIn}
            whileHover={{ y: -6 }}
            transition={spring}
            className={`relative flex flex-col p-8 md:p-10 rounded-2xl transition-shadow ${
              tier.highlighted ? "shadow-2xl" : "shadow-md"
            }`}
            style={{
              background: tier.highlighted
                ? "var(--va-ink)"
                : "var(--va-surface)",
              border: tier.highlighted
                ? "1px solid var(--va-accent)"
                : "1px solid var(--va-rule)",
            }}
          >
            {/* Popular badge */}
            {tier.highlighted && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-widest"
                style={{
                  background: "var(--va-accent)",
                  color: "var(--va-paper)",
                }}
              >
                <Sparkles size={12} /> Most Popular
              </span>
            )}

            <h3
              className="text-lg font-sans font-bold uppercase tracking-widest mb-2"
              style={{
                color: tier.highlighted ? "var(--va-paper)" : "var(--va-ink-muted)",
              }}
            >
              {tier.name}
            </h3>

            <p
              className="text-4xl md:text-5xl mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                color: tier.highlighted ? "var(--va-paper)" : "var(--va-accent)",
              }}
            >
              {tier.price}
            </p>

            <p
              className="font-sans text-sm leading-relaxed mb-8"
              style={{
                color: tier.highlighted
                  ? "color-mix(in srgb, var(--va-paper) 70%, transparent)"
                  : "var(--va-ink-muted)",
              }}
            >
              {tier.description}
            </p>

            <ul className="flex flex-col gap-3 mb-10 flex-1">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 font-sans text-sm"
                  style={{
                    color: tier.highlighted ? "var(--va-paper)" : "var(--va-ink)",
                  }}
                >
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "var(--va-accent)" }}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/#contact" className="mt-auto">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-sans font-semibold rounded-lg"
                style={{
                  background: tier.highlighted
                    ? "var(--va-accent)"
                    : "var(--va-paper)",
                  color: tier.highlighted
                    ? "var(--va-paper)"
                    : "var(--va-ink)",
                  border: tier.highlighted
                    ? "none"
                    : "1px solid var(--va-rule)",
                  letterSpacing: "0.03em",
                }}
              >
                Get Started <ArrowUpRight size={14} />
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </div>
    </RevealSection>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────────── */
function FAQSection({ faq }: { faq: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <RevealSection className="max-w-[900px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <motion.p
        variants={fadeUp}
        className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
        style={{ color: "var(--va-accent)" }}
      >
        Common Questions
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-6xl mb-16"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          color: "var(--va-ink)",
          letterSpacing: "-0.03em",
        }}
      >
        FAQ
      </motion.h2>

      <div className="flex flex-col gap-3">
        {faq.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl overflow-hidden"
              style={{
                background: "var(--va-surface)",
                border: "1px solid var(--va-rule)",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span
                  className="font-sans font-semibold text-base pr-4"
                  style={{ color: "var(--va-ink)" }}
                >
                  {item.question}
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
              <AnimatePresence>
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
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </RevealSection>
  );
}

/* ─── Related Work ─────────────────────────────────────────────────── */
function RelatedWorkSection({
  projects: relatedProjects,
}: {
  projects: typeof projects;
}) {
  return (
    <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <motion.p
        variants={fadeUp}
        className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
        style={{ color: "var(--va-accent)" }}
      >
        See It In Action
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-6xl mb-16"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          color: "var(--va-ink)",
          letterSpacing: "-0.03em",
        }}
      >
        Related Work
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedProjects.map((project) => (
          <motion.div key={project.slug} variants={scaleIn}>
            <Link href={`/work/${project.slug}`}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={spring}
                className="relative rounded-2xl overflow-hidden group shadow-lg"
                style={{
                  background: "var(--va-surface)",
                  border: "1px solid var(--va-rule)",
                }}
              >
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-va-paper via-transparent to-transparent opacity-80" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-sans font-bold mb-2 block"
                    style={{ color: "var(--va-accent)" }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="text-2xl md:text-3xl flex items-center gap-3"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 600,
                      color: "var(--va-ink)",
                    }}
                  >
                    {project.title}
                    <ArrowUpRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--va-accent)" }}
                    />
                  </h3>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </RevealSection>
  );
}

/* ─── CTA ──────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <RevealSection className="w-full py-24 md:py-32">
      <div
        className="max-w-[1400px] mx-auto px-6 md:px-10"
      >
        <motion.div
          variants={scaleIn}
          className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden"
          style={{
            background: "var(--va-ink)",
            border: "1px solid var(--va-rule)",
          }}
        >
          {/* Glow effect */}
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
              Ready to start?
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
              Let&apos;s build something{" "}
              <em className="text-editorial text-gradient-neon" style={{ fontStyle: "italic" }}>
                extraordinary.
              </em>
            </h2>
            <p
              className="font-sans text-lg max-w-xl mx-auto mb-10"
              style={{ color: "color-mix(in srgb, var(--va-paper) 60%, transparent)" }}
            >
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
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
                Start a Project <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </RevealSection>
  );
}
