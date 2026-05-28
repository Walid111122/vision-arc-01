"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Globe, Diamond, BarChart3, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";

/* ─── Animation presets ────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 28, mass: 1.5 } as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: spring },
};

const scaleIn: Variants = {
  hidden: { scale: 0.94, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: spring },
};

/* ─── Service data ─────────────────────────────────────────────────── */
const servicesList = [
  {
    slug: "web",
    title: "Bespoke Web Development",
    subtitle: "Engineered to be felt, not just seen.",
    desc: "We build fast, tactile digital experiences. No templates, no bloat. Just custom Next.js architecture paired with nuanced motion design that respects your user's time and attention.",
    deliverables: ["Next.js Architecture", "WebGL / Three.js", "Framer Motion", "Headless CMS Integration"],
    price: "Starting at $8,000",
    icon: Globe,
    image: "/images/studio_desk.png",
    stats: [
      { label: "Lighthouse Score", value: "97+" },
      { label: "Projects Delivered", value: "40+" },
    ],
  },
  {
    slug: "brand",
    title: "Identity & Branding",
    subtitle: "Iconic systems built to last decades.",
    desc: "Visual systems that speak louder than words. We create iconic, minimalist identities rooted in timeless design principles.",
    deliverables: ["Brand Strategy", "Logo & Typography", "Color Systems", "Brand Guidelines"],
    price: "Starting at $5,000",
    icon: Diamond,
    image: "/images/work_branding.png",
    stats: [
      { label: "Brands Created", value: "65+" },
      { label: "Industry Awards", value: "12" },
    ],
  },
  {
    slug: "media",
    title: "Media Buying & Strategy",
    subtitle: "Performance marketing that actually performs.",
    desc: "We don't just design; we distribute. Our performance team scales your brand through highly targeted, high-converting ad campaigns across Meta and Google.",
    deliverables: ["Meta Ads Management", "Google Ads", "Creative Testing", "Conversion Rate Optimization"],
    price: "Starting at $3,000/mo",
    icon: BarChart3,
    image: "/images/work_ecommerce.png",
    stats: [
      { label: "Ad Spend Managed", value: "$4M+" },
      { label: "Average ROAS", value: "5.2x" },
    ],
  },
];

/* ─── Scroll-triggered wrapper ─────────────────────────────────────── */
function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SERVICES LISTING PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="w-full relative z-10">
        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-6"
              style={{ color: "var(--va-accent)" }}
            >
              Our Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 max-w-5xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: "var(--va-ink)",
                letterSpacing: "-0.03em",
              }}
            >
              We don&apos;t do everything.{" "}
              <em
                className="text-editorial text-gradient-neon block md:inline"
                style={{ fontStyle: "italic" }}
              >
                We do three things, exceptionally well.
              </em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.35 }}
              className="max-w-xl text-lg font-sans leading-relaxed"
              style={{ color: "var(--va-ink-muted)" }}
            >
              Our approach is intentionally narrow. By focusing our craft, we
              deliver results that feel considered, native, and undeniably human.
              Click any service below to explore the full details.
            </motion.p>
          </div>
        </section>

        {/* ── SERVICE CARDS ──────────────────────────────────────────── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
          <div className="flex flex-col gap-8">
            {servicesList.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <RevealSection key={service.slug}>
                  <motion.div variants={scaleIn}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group block no-underline"
                    >
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={spring}
                        className="relative overflow-hidden rounded-3xl shadow-xl"
                        style={{
                          background: "var(--va-surface)",
                          border: "1px solid var(--va-rule)",
                        }}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                          {/* ── Image Side ──────────────────────────── */}
                          <div
                            className={`relative h-[300px] lg:h-auto overflow-hidden ${
                              i % 2 === 1 ? "lg:order-2" : ""
                            }`}
                          >
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-va-surface via-va-surface/60 to-transparent" />

                            {/* Stats overlay */}
                            <div className="absolute bottom-6 left-6 flex gap-6">
                              {service.stats.map((stat) => (
                                <div key={stat.label}>
                                  <p
                                    className="text-3xl font-serif font-bold"
                                    style={{ color: "var(--va-accent)" }}
                                  >
                                    {stat.value}
                                  </p>
                                  <p
                                    className="text-xs font-sans font-semibold uppercase tracking-widest"
                                    style={{ color: "var(--va-ink-muted)" }}
                                  >
                                    {stat.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ── Content Side ────────────────────────── */}
                          <div
                            className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${
                              i % 2 === 1 ? "lg:order-1" : ""
                            }`}
                          >
                            {/* Icon */}
                            <div
                              className="p-3.5 rounded-full shadow-md inline-flex w-fit mb-6"
                              style={{
                                background: "var(--va-paper)",
                                border: "1px solid var(--va-rule)",
                              }}
                            >
                              <IconComponent
                                size={24}
                                strokeWidth={1.5}
                                className="text-va-accent"
                              />
                            </div>

                            {/* Title */}
                            <h2
                              className="text-3xl md:text-4xl lg:text-5xl mb-3"
                              style={{
                                fontFamily: "var(--font-serif)",
                                fontWeight: 600,
                                color: "var(--va-ink)",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {service.title}
                            </h2>

                            {/* Subtitle */}
                            <p
                              className="font-sans text-base font-semibold mb-4"
                              style={{ color: "var(--va-accent)" }}
                            >
                              {service.subtitle}
                            </p>

                            {/* Description */}
                            <p
                              className="font-sans text-base leading-relaxed mb-8 max-w-md"
                              style={{ color: "var(--va-ink-muted)" }}
                            >
                              {service.desc}
                            </p>

                            {/* Deliverables pills */}
                            <div className="flex flex-wrap gap-2 mb-8">
                              {service.deliverables.map((item) => (
                                <span
                                  key={item}
                                  className="px-3 py-1.5 rounded-full font-sans text-xs font-semibold"
                                  style={{
                                    background:
                                      "color-mix(in srgb, var(--va-accent) 10%, transparent)",
                                    color: "var(--va-accent)",
                                    border: "1px solid color-mix(in srgb, var(--va-accent) 20%, transparent)",
                                  }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>

                            {/* Price & CTA */}
                            <div className="flex items-center justify-between">
                              <span
                                className="font-serif text-xl"
                                style={{ color: "var(--va-ink)" }}
                              >
                                {service.price}
                              </span>
                              <span
                                className="inline-flex items-center gap-2 font-sans text-sm font-semibold transition-transform group-hover:translate-x-1"
                                style={{ color: "var(--va-accent)" }}
                              >
                                Explore Service
                                <ArrowUpRight
                                  size={16}
                                  strokeWidth={2.5}
                                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                </RevealSection>
              );
            })}
          </div>
        </section>

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
            {/* Glow */}
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
                Not sure which service fits?{" "}
                <em
                  className="text-editorial text-gradient-neon"
                  style={{ fontStyle: "italic" }}
                >
                  Let&apos;s talk.
                </em>
              </h2>
              <p
                className="font-sans text-lg max-w-xl mx-auto mb-10"
                style={{
                  color: "color-mix(in srgb, var(--va-paper) 60%, transparent)",
                }}
              >
                Tell us about your project and we&apos;ll recommend the right
                approach — no obligation, no pitch deck, just a real conversation.
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
        </RevealSection>
      </main>
      <Footer />
    </>
  );
}
