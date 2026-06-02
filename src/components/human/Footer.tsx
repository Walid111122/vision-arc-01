"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Briefcase, Layers, Tag, BookOpen, Info, Mail, Shield, FileText, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const FacebookIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

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
              {t("footer.desc")}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "var(--va-ink)" }}>
              {t("footer.nav.header")}
            </h4>
            {[
              { labelKey: "nav.work", href: "/#work", icon: Briefcase },
              { labelKey: "nav.services", href: "/services", icon: Layers },
              { labelKey: "nav.pricing", href: "/pricing", icon: Tag },
              { labelKey: "nav.blog", href: "/blog", icon: BookOpen },
              { labelKey: "nav.about", href: "/about", icon: Info },
              { labelKey: "nav.contact", href: "/#contact", icon: Mail },
            ].map((item) => {
              const LinkIcon = item.icon;
              return (
                <Link
                  key={item.labelKey}
                  href={item.href}
                  className="text-sm font-sans w-fit hover:opacity-70 transition-opacity flex items-center gap-2"
                  style={{ color: "var(--va-ink-muted)" }}
                >
                  <LinkIcon size={14} className="text-[var(--va-accent)] opacity-80" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </div>

          {/* Social / External Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "var(--va-ink)" }}>
              {t("footer.social.header")}
            </h4>
            {[
              { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584695491534", external: true, icon: FacebookIcon },
              { label: "Instagram", href: "https://www.instagram.com/visionarcagency/", external: true, icon: InstagramIcon },
              { label: "+20 10 94366342", href: "tel:+201094366342", external: false, icon: Phone },
              { label: t("contact.address"), href: "https://maps.google.com/?q=Maadi,+Cairo,+Egypt", external: true, icon: MapPin },
            ].map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm font-sans flex items-center gap-2.5 w-fit group"
                  style={{ color: "var(--va-ink-muted)" }}
                >
                  <IconComponent size={15} className="text-[var(--va-accent)] opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:underline underline-offset-4 decoration-1 decoration-neutral-400" dir={link.href.startsWith("tel:") ? "ltr" : undefined}>
                    {link.label}
                  </span>
                  <ArrowUpRight size={13} className={`opacity-0 ${language === "ar" ? "translate-x-1" : "-translate-x-1"} translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300`} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t"
          style={{ borderColor: "var(--va-rule)" }}
        >
          <p className="text-xs font-sans" style={{ color: "var(--va-ink-muted)" }}>
            &copy; {currentYear} {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs font-sans hover:underline flex items-center gap-1.5" style={{ color: "var(--va-ink-muted)" }}>
              <Shield size={12} className="text-[var(--va-accent)] opacity-80" />
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="text-xs font-sans hover:underline flex items-center gap-1.5" style={{ color: "var(--va-ink-muted)" }}>
              <FileText size={12} className="text-[var(--va-accent)] opacity-80" />
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
