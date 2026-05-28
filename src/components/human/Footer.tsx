"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full border-t"
      style={{
        borderColor: "var(--va-rule)",
        backgroundColor: "var(--va-paper)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          
          {/* Logo & Ethos */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-baseline gap-0 select-none w-fit"
              aria-label="VisionArc home"
            >
              <span
                className="text-3xl leading-none tracking-tight"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--va-ink)" }}
              >
                Vision
              </span>
              <span
                className="text-3xl leading-none tracking-tight italic"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--va-accent)" }}
              >
                Arc
              </span>
            </Link>
            <p className="max-w-sm text-sm font-sans" style={{ color: "var(--va-ink-muted)" }}>
              A multi-disciplinary digital agency focused on branding, media buying, 
              and bespoke web experiences. Hand-crafted, never generated.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "var(--va-ink)" }}>
              Navigation
            </h4>
            {[
              { label: "Work", href: "/#work" },
              { label: "Services", href: "/services" },
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/#about" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-sans w-fit hover:opacity-70 transition-opacity"
                style={{ color: "var(--va-ink-muted)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social / External Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "var(--va-ink)" }}>
              Socials
            </h4>
            {[
              { label: "Twitter / X", href: "#" },
              { label: "LinkedIn", href: "#" },
              { label: "Instagram", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans flex items-center gap-1 w-fit group"
                style={{ color: "var(--va-ink-muted)" }}
              >
                <span className="group-hover:underline underline-offset-4 decoration-1 decoration-neutral-400">
                  {link.label}
                </span>
                <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t"
          style={{ borderColor: "var(--va-rule)" }}
        >
          <p className="text-xs font-sans" style={{ color: "var(--va-ink-muted)" }}>
            &copy; {currentYear} VisionArc Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs font-sans hover:underline" style={{ color: "var(--va-ink-muted)" }}>
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs font-sans hover:underline" style={{ color: "var(--va-ink-muted)" }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
