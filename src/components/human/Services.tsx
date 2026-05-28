"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Globe, Diamond, BarChart3, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";

/* ─── Spring config ─────────────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 30, mass: 1.8 } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 120, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: spring },
};

const servicesList = [
  {
    id: "web",
    title: "Bespoke Web Development",
    desc: "We build fast, tactile digital experiences. No templates, no bloat. Just custom Next.js architecture paired with nuanced motion design that respects your user's time and attention.",
    deliverables: ["Next.js Architecture", "WebGL / Three.js", "Framer Motion", "Headless CMS Integration"],
    price: "Starting at $8,000",
    colSpan: "md:col-span-2",
    icon: Globe,
    image: "/images/studio_desk.png",
  },
  {
    id: "brand",
    title: "Identity & Branding",
    desc: "Visual systems that speak louder than words. We create iconic, minimalist identities rooted in timeless design principles.",
    deliverables: ["Brand Strategy", "Logo & Typography", "Color Systems", "Brand Guidelines"],
    price: "Starting at $5,000",
    colSpan: "md:col-span-1",
    icon: Diamond,
    image: "/images/work_branding.png",
  },
  {
    id: "media",
    title: "Media Buying & Strategy",
    desc: "We don't just design; we distribute. Our performance team scales your brand through highly targeted, high-converting ad campaigns across Meta and Google.",
    deliverables: ["Meta Ads Management", "Google Ads", "Creative Testing", "Conversion Rate Optimization"],
    price: "Starting at $3,000/mo",
    colSpan: "md:col-span-3",
    icon: BarChart3,
    image: "/images/work_ecommerce.png",
  },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32"
      aria-label="Our Services"
    >
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-2xl"
        >
          <motion.p
            variants={cardVariants}
            className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
            style={{ color: "var(--va-accent)" }}
          >
            What we do
          </motion.p>
          <motion.h2
            variants={cardVariants}
            className="text-5xl md:text-7xl leading-[1.05]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              color: "var(--va-ink)",
              letterSpacing: "-0.03em",
            }}
          >
            We don't do everything. <br className="hidden md:block" />
            <em className="text-editorial text-gradient-neon" style={{ fontStyle: "italic" }}>
              We do three things, exceptionally well.
            </em>
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...spring, delay: 0.4 }}
          className="max-w-xs text-base font-sans"
          style={{ color: "var(--va-ink-muted)" }}
        >
          Our approach is intentionally narrow. By focusing our craft, we deliver
          results that feel considered, native, and undeniably human.
        </motion.p>
      </div>

      {/* ── Asymmetric Bento Grid / Accordion ─────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[auto] gap-4 md:gap-6 relative z-10"
      >
        {servicesList.map((service) => {
          const isExpanded = expandedId === service.id;
          const IconComponent = service.icon;

          return (
            <motion.div
              layout
              key={service.id}
              variants={cardVariants}
              onClick={() => toggleExpand(service.id)}
              className={`${service.colSpan} bg-va-surface shadow-xl relative overflow-hidden group flex flex-col justify-between p-8 md:p-12 min-h-[300px] rounded-2xl cursor-pointer`}
              style={{ border: "1px solid var(--va-rule)" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-20 dark:mix-blend-luminosity mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-va-paper via-va-paper/90 to-va-paper/40" />
              </div>

              {/* Icon & Toggle */}
              <motion.div layout className="flex justify-between items-start mb-8 relative z-10">
                <motion.div
                  className="p-4 rounded-full shadow-md bg-va-paper"
                  style={{ border: "1px solid var(--va-rule)" }}
                >
                  <IconComponent size={28} strokeWidth={1.5} className="text-va-ink" />
                </motion.div>
                <motion.div
                  className="p-3 rounded-full transition-colors shadow-lg"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  style={{ background: "var(--va-accent)" }}
                >
                  <ChevronDown size={24} strokeWidth={2} style={{ color: "var(--va-paper)" }} />
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <motion.div layout className="relative z-10 max-w-lg">
                <motion.h3
                  layout
                  className="text-3xl md:text-4xl mb-4"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: "var(--va-ink)" }}
                >
                  {service.title}
                </motion.h3>
                <motion.p layout className="font-sans text-lg leading-relaxed font-medium mb-4" style={{ color: "var(--va-ink-muted)" }}>
                  {service.desc}
                </motion.p>

                {/* Expanded Accordion Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t" style={{ borderColor: "var(--va-rule)" }}>
                        <h4 className="text-sm font-sans font-bold uppercase tracking-widest mb-4" style={{ color: "var(--va-accent)" }}>
                          Deliverables
                        </h4>
                        <ul className="flex flex-col gap-2 mb-6">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 font-sans font-medium" style={{ color: "var(--va-ink)" }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--va-accent)" }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-va-paper" style={{ border: "1px solid var(--va-rule)" }}>
                          <span className="font-sans text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--va-ink-muted)" }}>Engagement</span>
                          <span className="font-serif text-xl" style={{ color: "var(--va-ink)" }}>{service.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
