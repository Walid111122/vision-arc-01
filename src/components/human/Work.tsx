"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";

/* ─── Spring config ─────────────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 30, mass: 1.8 } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 120, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: spring },
};

// The projects array is now imported from @/lib/data/projects

export function Work() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="work"
      ref={ref}
      className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32"
      aria-label="Selected Work"
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
            Selected Cases
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
            Work that leaves a mark.
          </motion.h2>
        </motion.div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...spring, delay: 0.3 }}
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 text-sm font-sans font-medium uppercase tracking-widest border-b pb-1 transition-colors hover:text-[var(--va-accent)] hover:border-[var(--va-accent)]"
          style={{ color: "var(--va-ink-muted)", borderColor: "var(--va-rule)" }}
        >
          View full archive <ArrowUpRight size={16} />
        </motion.a>
      </div>

      {/* ── Portfolio Grid ────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
      >
        {projects.map((project) => (
          <Link href={`/work/${project.slug}`} key={project.slug} className={`${project.colSpan}`}>
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={spring}
              className={`w-full ${project.height} surface-card relative overflow-hidden group rounded-2xl cursor-pointer shadow-paper`}
              style={{ border: "1px solid var(--va-rule)" }}
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-60 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-va-paper via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Hover overlay data */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold mb-3"
                  style={{ color: "var(--va-accent)" }}
                >
                  {project.category}
                </p>
                <div className="flex items-center justify-between">
                  <h3
                    className="text-4xl"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--va-ink)" }}
                  >
                    {project.title}
                  </h3>
                  <div
                    className="p-4 rounded-full bg-va-paper shadow-xl"
                    style={{ color: "var(--va-accent)" }}
                  >
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
