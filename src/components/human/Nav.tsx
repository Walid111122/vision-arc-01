"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Magnetic } from "@/components/human/Magnetic";
import { ThemeToggle } from "@/components/human/ThemeToggle";
import { useLanguage } from "@/lib/context/LanguageContext";
import Link from "next/link";
import { Menu, X } from "lucide-react";

/* ─── Spring config ─────────────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 220, damping: 24, mass: 1 } as const;

const navLinks = [
  { labelKey: "nav.work",     href: "/#work"     },
  { labelKey: "nav.services", href: "/services"  },
  { labelKey: "nav.pricing",  href: "/pricing"   },
  { labelKey: "nav.blog",     href: "/blog"      },
  { labelKey: "nav.about",    href: "/about"     },
  { labelKey: "nav.contact",  href: "/#contact"  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { language, setLanguage, t, dir } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        id="site-nav"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16"
        style={{
          backdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--va-paper) 82%, transparent)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--va-rule)"
            : "1px solid transparent",
          transition: "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* ── Wordmark ───────────────────────────────────────────────── */}
        <Link
          href="/"
          id="nav-logo"
          className="flex items-baseline gap-0 select-none"
          aria-label="VisionArc home"
        >
          <span
            className="text-xl leading-none tracking-tight animate-fade-in"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--va-ink)" }}
          >
            Vision
          </span>
          <span
            className="text-xl leading-none tracking-tight italic"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--va-accent)" }}
          >
            Arc
          </span>
        </Link>

        {/* ── Desktop nav links ───────────────────────────────────────── */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map(({ labelKey, href }) => (
            <NavLink key={labelKey} href={href}>{t(labelKey)}</NavLink>
          ))}
          <Magnetic strength={0.4}>
            <Link href="/#contact" id="nav-cta">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
                className="px-4 py-1.5 text-sm font-sans font-medium rounded-sm inline-block"
                style={{
                  background: "var(--va-accent)",
                  color: "var(--va-paper)",
                  letterSpacing: language === "ar" ? "0" : "0.04em",
                }}
              >
                {t("nav.cta")}
              </motion.span>
            </Link>
          </Magnetic>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="text-xs font-semibold py-1 px-2 border border-[var(--va-rule)] rounded-sm hover:border-[var(--va-accent)] hover:text-[var(--va-accent)] transition-colors uppercase tracking-widest text-[var(--va-ink)] opacity-80 hover:opacity-100"
              style={{ minWidth: "48px" }}
              suppressHydrationWarning
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
          </div>
        </nav>

        {/* ── Mobile hamburger ────────────────────────────────────────── */}
        <button
          id="nav-menu-toggle"
          className="md:hidden flex items-center justify-center w-9 h-9"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <motion.span
            key={String(menuOpen)}
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={spring}
          >
            {menuOpen
              ? <X size={18} strokeWidth={1.5} style={{ color: "var(--va-ink)" }} />
              : <Menu size={18} strokeWidth={1.5} style={{ color: "var(--va-ink)" }} />
            }
          </motion.span>
        </button>
      </motion.header>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <motion.div
        id="mobile-nav-drawer"
        initial={false}
        animate={menuOpen ? { x: 0, opacity: 1 } : { x: dir === "rtl" ? "-100%" : "100%", opacity: 0 }}
        transition={spring}
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-10 md:hidden"
        style={{ background: "var(--va-paper)" }}
        aria-hidden={!menuOpen}
      >
        {navLinks.map(({ labelKey, href }, i) => (
          <motion.div
            key={labelKey}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ ...spring, delay: menuOpen ? i * 0.06 : 0 }}
          >
            <Link
              href={href}
              className="text-4xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                color: "var(--va-ink)",
                letterSpacing: "-0.01em",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t(labelKey)}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...spring, delay: menuOpen ? navLinks.length * 0.06 : 0 }}
          className="flex items-center gap-6 mt-4"
        >
          <ThemeToggle />
          <button
            onClick={() => {
              setLanguage(language === "en" ? "ar" : "en");
              setMenuOpen(false);
            }}
            className="text-sm font-semibold py-1.5 px-3 border border-[var(--va-rule)] rounded-sm hover:border-[var(--va-accent)] hover:text-[var(--va-accent)] transition-colors uppercase tracking-widest text-[var(--va-ink)]"
            suppressHydrationWarning
          >
            {language === "en" ? "عربي" : "EN"}
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ─── Desktop nav link with underline spring animation ──────────────────── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="relative text-sm font-sans font-medium py-1"
      style={{ color: "var(--va-ink-muted)", letterSpacing: "0.01em" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px w-full origin-left"
        style={{ background: "var(--va-accent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={spring}
      />
    </Link>
  );
}
