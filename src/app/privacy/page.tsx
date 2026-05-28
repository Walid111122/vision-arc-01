"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";

const spring = { type: "spring", stiffness: 90, damping: 28, mass: 1.5 } as const;

const sections = [
  { id: "info-collect", label: "1. Information We Collect" },
  { id: "info-use", label: "2. How We Use Your Information" },
  { id: "info-disclose", label: "3. Disclosure of Your Information" },
  { id: "cookies-pixels", label: "4. Tracking Technologies (Cookies & Pixels)" },
  { id: "security", label: "5. Security of Your Information" },
  { id: "children", label: "6. Policy for Children" },
  { id: "rights", label: "7. Your Privacy Rights" },
  { id: "contact", label: "8. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="w-full relative z-10 overflow-hidden bg-va-paper">
        {/* Ambient background glows */}
        <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-va-accent/3 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full bg-va-accent/3 blur-[140px] pointer-events-none" />

        {/* ── HERO HEADER ────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 border-b border-va-rule">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase transition-colors hover:text-[var(--va-accent)]"
                style={{ color: "var(--va-ink-muted)" }}
              >
                <ArrowLeft size={14} /> Back to Home
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-medium mb-4"
              style={{ color: "var(--va-ink)", letterSpacing: "-0.03em" }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-xs font-sans font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--va-ink-muted)" }}
            >
              Last Updated: May 28, 2026
            </motion.p>
          </div>
        </section>

        {/* ── CONTENT GRID ───────────────────────────────────────────── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Sticky Navigator (Desktop only) */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
              <nav className="flex flex-col gap-3.5 border-l pl-6" style={{ borderColor: "var(--va-rule)" }}>
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-3 block" style={{ color: "var(--va-ink-muted)" }}>
                  Document Sections
                </span>
                {sections.map((sec) => (
                  <Link
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-sm font-sans font-medium transition-colors hover:text-[var(--va-accent)]"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    {sec.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Right Column: Scrollable Document Body */}
            <div className="lg:col-span-8 flex flex-col gap-14 max-w-3xl">
              {/* Introduction */}
              <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                <p>
                  Welcome to Vision Arc (“we,” “our,” or “us”). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us in relation to our social media management and advertising services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
                </p>
              </div>

              {/* Section 1 */}
              <article id="info-collect" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  1. Information We Collect
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-2">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1" style={{ color: "var(--va-ink)" }}>
                        Personal Data
                      </h3>
                      <p>
                        Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us when you choose to participate in various activities related to the Site, such as contacting us through our forms or subscribing to newsletters.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1" style={{ color: "var(--va-ink)" }}>
                        Business Data
                      </h3>
                      <p>
                        Information related to your business, social media handles, ad accounts, and brand assets that you provide to us to execute our management and marketing services.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1" style={{ color: "var(--va-ink)" }}>
                        Derivative Data
                      </h3>
                      <p>
                        Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 2 */}
              <article id="info-use" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  2. How We Use Your Information
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site or during service onboarding to:
                  </p>
                  <ul className="list-none flex flex-col gap-3.5 pl-2 mt-2">
                    {[
                      "Fulfill, manage, and optimize your social media and ad campaigns.",
                      "Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.",
                      "Email or message you regarding your account, updates, or monthly performance reports.",
                      "Generate a profile about you to make your future visits to the Site more personalized.",
                      "Increase the efficiency and operation of the Site.",
                      "Monitor and analyze usage and trends to improve your experience with the Site.",
                      "Respond to product and customer service requests."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-va-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 3 */}
              <article id="info-disclose" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  3. Disclosure of Your Information
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-2">
                    <p>
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1" style={{ color: "var(--va-ink)" }}>
                        By Law or to Protect Rights
                      </strong>
                      If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.
                    </p>

                    <p>
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1" style={{ color: "var(--va-ink)" }}>
                        Third-Party Service Providers
                      </strong>
                      We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance (such as Meta Ads, Google Analytics, and TikTok Ads platforms).
                    </p>

                    <p>
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1" style={{ color: "var(--va-ink)" }}>
                        With Your Consent
                      </strong>
                      We may disclose your personal information for any other purpose with your explicit consent.
                    </p>
                  </div>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 4 */}
              <article id="cookies-pixels" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  4. Tracking Technologies (Cookies and Pixels)
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience.
                  </p>
                  <p>
                    When you access the Site, your personal information is not collected through the use of tracking technology. However, please be aware that we utilize optimization pixels (such as the Meta Pixel) to track website conversions and build lookalike audiences for our own marketing campaigns. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 5 */}
              <article id="security" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  5. Security of Your Information
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 6 */}
              <article id="children" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  6. Policy for Children
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 7 */}
              <article id="rights" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  7. Your Privacy Rights
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    Depending on your location, you may have the right to request access to the personal data we collect from you, change that data, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request to the email specified below.
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 8 */}
              <article id="contact" className="scroll-mt-28 flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--va-ink)" }}>
                  8. Contact Us
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4" style={{ color: "var(--va-ink-muted)" }}>
                  <p>
                    If you have questions or comments about this Privacy Policy, please contact Vision Arc at:
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    <p>
                      <strong className="text-sm font-sans uppercase tracking-wider block" style={{ color: "var(--va-ink)" }}>
                        Email
                      </strong>
                      <a href="mailto:hello@visionarc.com" className="transition-colors hover:text-[var(--va-accent)] underline">
                        hello@visionarc.com
                      </a>
                    </p>
                    
                    <p>
                      <strong className="text-sm font-sans uppercase tracking-wider block" style={{ color: "var(--va-ink)" }}>
                        Phone
                      </strong>
                      <span style={{ color: "var(--va-ink)" }}>+20 10 1234 5678</span>
                    </p>

                    <p>
                      <strong className="text-sm font-sans uppercase tracking-wider block" style={{ color: "var(--va-ink)" }}>
                        Website
                      </strong>
                      <Link href="/" className="transition-colors hover:text-[var(--va-accent)] underline">
                        https://vision-arc.com
                      </Link>
                    </p>
                  </div>
                </div>
              </article>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
