"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Compass, Cpu, Activity, ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";
import { useLanguage } from "@/lib/context/LanguageContext";

/* ─── Animation presets ────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 90, damping: 28, mass: 1.5 } as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const scaleIn: Variants = {
  hidden: { scale: 0.94, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: spring },
};

/* ─── Scroll-triggered wrapper ─────────────────────────────────────── */
function RevealSection({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
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
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ─── Custom Animated CountUp Component ────────────────────────────── */
function CountUp({ end, duration = 2, language }: { end: number; duration?: number; language: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const endVal = end;
    if (start === endVal) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / endVal), 20);
    const step = endVal / (totalMiliseconds / incrementTime);
    
    let current = start;
    const timer = setInterval(() => {
      current += step;
      if (current >= endVal) {
        setCount(endVal);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  const toArabicNumerals = (num: number, lang: string) => {
    if (lang !== "ar") return num.toString();
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((d) => (d >= "0" && d <= "9" ? arabicDigits[parseInt(d)] : d))
      .join("");
  };

  return <span ref={ref}>{toArabicNumerals(count, language)}</span>;
}

/* ─── Scrolling Marquee Component ─────────────────────────────────── */
function Marquee({ text, direction = "ltr" }: { text: string; direction?: "ltr" | "rtl" }) {
  const animationClass = direction === "rtl" ? "animate-marquee-rtl" : "animate-marquee";
  return (
    <div 
      className="w-full overflow-hidden py-6 md:py-8 border-t border-b bg-va-surface/10 backdrop-blur-sm relative z-10" 
      style={{ borderColor: "var(--va-rule)" }}
    >
      <div className={`${animationClass} flex gap-8 whitespace-nowrap`}>
        <span className="text-xl md:text-3xl font-serif tracking-wider uppercase text-va-accent/90 select-none">
          {text} {text}
        </span>
        <span className="text-xl md:text-3xl font-serif tracking-wider uppercase text-va-accent/90 select-none">
          {text} {text}
        </span>
      </div>
    </div>
  );
}

/* ─── About page content data ──────────────────────────────────────── */
const copy = {
  en: {
    heroTag: "About VisionArc",
    heroTitle: "The Architecture of Growth.",
    heroSubtitle: "Defining Your Strategy. Driving Your Growth.",
    heroBody: [
      "Most companies don’t have a marketing problem. They have a system problem.",
      "They pour premium budgets into front-end traffic while their backend infrastructure leaks revenue through manual follow-ups, fragmented data, and disconnected software.",
      "At VisionArc, we bridge that exact gap. We are a team of strategic engineers, developers, and growth architects. We strip business models down to the studs, eliminate operational chaos, and build high-performance digital engines that turn cold data into predictable commercial revenue pipelines.",
    ],
    secStats: [
      { val: 15, label: "Years of Experience", suffix: "+" },
      { val: 40, label: "Skilled Professionals", suffix: "+" },
      { val: 500, label: "Completed Projects", suffix: "+" }
    ],
    secMarquee: "Software Engineering • CRM Automation • Precision Strategy • Brand Identity • Media Production • Digital Growth • Performance Marketing • ",
    sec2Tag: "Our Approach",
    sec2Title: "How We Architect Scale",
    sec2Cols: [
      {
        title: "Precision Strategy",
        subtitle: "Strategy",
        icon: Compass,
        body: "We don’t chase superficial metrics like 'likes' or 'impressions.' Every campaign we build, funnel we map, and asset we deploy is mathematically aligned to support your high-level commercial strategy, your lifetime value (LTV) targets, and your profit margins.",
      },
      {
        title: "High-End Engineering",
        subtitle: "Engineering",
        icon: Cpu,
        body: "We don’t use heavy, slow, cookie-cutter templates that tank your performance and break under pressure. We build from scratch using a modern, elite stack—Next.js, React, and Tailwind CSS—to deliver lightning-fast loading speeds, rock-solid security, and flawless scalability.",
      },
      {
        title: "Automated Infrastructure",
        subtitle: "Automation",
        icon: Activity,
        body: "We eliminate human error and inbox chaos. By engineering custom, secure multi-tenant CRM systems, ERPs, and localized automation frameworks, we design workflows that run on autopilot so your internal team can focus entirely on closing deals.",
      },
    ],
    sec3Tag: "Our Philosophy",
    sec3Title: "The Humane Design Philosophy",
    sec3Body: [
      "We believe the digital world has grown too cluttered. The internet is flooded with generic, automated templates that feel robotic, compromise data security, and actively frustrate human users.",
      "VisionArc operates on a different standard. We value Humane Design—crafting polished, minimal, and highly purposeful interfaces that respect a user's attention span. Every line of code we write and every layout we ship is built with intentionality, elegance, and extreme attention to detail.",
      "Because software shouldn't just function. It should feel effortless.",
    ],
    secCEO: {
      tag: "Leadership Statement",
      title: "The CEO's Vision",
      role: "Founder & CEO",
      quote: "I can say it simply: nothing is easy, but being always innovative, creative, and on-trend is not only our must, but it's our industry's must. I believe in people, they are the main pillar of our agency. I name them stakeholders, not employees; simply we sell their ideas. Our core values are all to people — they are the creatives, the planners, and the ones who drive us forward."
    },
    secTeam: {
      tag: "Meet Our Team",
      title: "The Foundation of VisionArc",
      body: "The foundation of VisionArc is a merge between Innovation & expertise mindsets, gathering creativity, talent, and knowledge to ensure that we always hit a strategic point.",
      members: [
        { role: "Strategy Architect", name: "Walid Al-Sharif", desc: "Aligns engineering efforts to Lifetime Value (LTV) and profit margins." },
        { role: "Engineering Lead", name: "Ahmed Mostafa", desc: "Builds lightweight, high-performance Next.js systems and CRM backends." },
        { role: "Media Director", name: "Ahmed Kattan", desc: "Runs high-impact, performance-oriented advertising and digital conversion loops." },
        { role: "Creative Lead", name: "Sara El-Gamil", desc: "Drives visual luxury, humane design interfaces, and brand strategy." }
      ]
    },
    sec4Tag: "Regional Focus",
    sec4Title: "Global Engineering. Local Context.",
    sec4Body: [
      "Founded with a vision to revolutionize how ambitious enterprises operate, VisionArc brings world-class software development and data-driven marketing frameworks straight to growing organizations.",
      "Operating right out of Egypt, we uniquely understand the precise operational bottlenecks local and regional businesses face—from integrating custom systems to navigating rapid market shifts. We combine that deep regional insight with elite global technology standards to give our clients an unbeatable competitive advantage.",
    ],
    ctaTitle: "Stop Guessing. Start Engineering.",
    ctaBody: "If you are ready to move away from superficial checklists and build a high-performance growth engine that scales, let's talk.",
    ctaBtn: "Build Your Arc — Let's Connect",
  },
  ar: {
    heroTag: "من نحن",
    heroTitle: "هندسة النمو.",
    heroSubtitle: "تحديد إستراتيجيتك. قيادة نموك.",
    heroBody: [
      "معظم الشركات لا تعاني من مشكلة في التسويق، بل تعاني من مشكلة في الأنظمة والعمليات.",
      "إنهم يضخون ميزانيات ضخمة في زيادة حركة الزوار والواجهة الأمامية بينما تسرب بنيتهم التحتية الخلفية الإيرادات بسبب المتابعات اليدوية، والبيانات المجزأة، والبرمجيات غير المترابطة.",
      "في VisionArc، نحن نسد هذه الفجوة تماماً. نحن فريق من المهندسين الإستراتيجيين، والمطورين، ومهندسي النمو. نقوم بتفكيك نماذج الأعمال إلى أساسياتها، ونقضي على الفوضى التشغيلية، ونبني محركات رقمية عالية الأداء تحول البيانات الصامتة إلى قنوات إيرادات تجارية متوقعة.",
    ],
    secStats: [
      { val: 15, label: "سنة من الخبرة", suffix: "+" },
      { val: 40, label: "من المحترفين المهرة", suffix: "+" },
      { val: 500, label: "مشروع مكتمل", suffix: "+" }
    ],
    secMarquee: "الهندسة البرمجية • أتمتة الأنظمة • الإستراتيجية الدقيقة • الهوية البصرية • الإنتاج الإعلامي • النمو الرقمي • التسويق القائم على الأداء • ",
    sec2Tag: "نهجنا",
    sec2Title: "كيف نهندس التوسع والنمو",
    sec2Cols: [
      {
        title: "الإستراتيجية الدقيقة",
        subtitle: "الإستراتيجية",
        icon: Compass,
        body: "نحن لا نلهث وراء مؤشرات شكلية غير مجدية مثل 'الإعجابات' أو 'الظهور'. كل حملة نبنيها، وكل قمع تسويقي نخططه، وكل أصل نطلقه يتماشى رياضياً وعلمياً لدعم إستراتيجيتك التجارية عالية المستوى، ومستهدفات القيمة الحياتية للعميل (LTV)، وهوامش أرباحك الحقيقية.",
      },
      {
        title: "الهندسة البرمجية الراقية",
        subtitle: "الهندسة",
        icon: Cpu,
        body: "نحن لا نستخدم قوالب جاهزة ثقيلة وبطيئة تدمر أداء موقعك وتتعطل تحت ضغط العمل. نحن نبني من الصفر باستخدام تقنيات حديثة ونخبوية - Next.js و React و Tailwind CSS - لنقدم سرعات تحميل خاطفة، وأماناً برمجياً صلباً، وتوسعاً سلساً لا تشوبه شائبة.",
      },
      {
        title: "البنية التحتية المؤتمتة",
        subtitle: "الأتمتة",
        icon: Activity,
        body: "نحن نقضي تماماً على الخطأ البشري وفوضى صندوق الوارد. من خلال هندسة أنظمة إدارة علاقات العملاء (CRM) المخصصة والآمنة، وأنظمة التخطيط (ERP)، وأطر الأتمتة المحلية، نصمم تدفقات عمل تعمل بالكامل على الطيار الآلي لتتمكن فرق عملك الداخلية من التركيز الكلي على إتمام الصفقات وتطوير العمل.",
      },
    ],
    sec3Tag: "فلسفتنا",
    sec3Title: "فلسفة التصميم الإنساني المريح",
    sec3Body: [
      "نحن نؤمن بأن العالم الرقمي أصبح مزدحماً للغاية. الإنترنت اليوم غارق بالقوالب الجاهزة والأتمتة العشوائية التي تبدو باردة وبلا روح، وتهدد أمن البيانات، وتسبب الإحباط للمستخدمين.",
      "تعمل وكالة VisionArc وفقاً لمعيار مختلف. نحن نقدر 'التصميم الإنساني المريح' (Humane Design) - عبر صياغة واجهات مصقولة وبسيطة وذات غرض واضح تحترم انتباه وقت المستخدم. كل سطر برمجي نكتبه وكل واجهة نشحنها تُبنى بقصدية تامة، وأناقة فائقة، واهتمام متناهٍ بأدق التفاصيل.",
      "لأن البرمجيات لا ينبغي أن تؤدي وظيفتها فحسب، بل يجب أن تُشعر المستخدم بالسهولة المطلقة وبلا جهد.",
    ],
    secCEO: {
      tag: "كلمة القيادة",
      title: "رؤية الرئيس التنفيذي",
      role: "المؤسس والرئيس التنفيذي",
      quote: "يمكنني قولها ببساطة: لا شيء سهل، ولكن أن نكون دائماً مبتكرين ومبدعين ومواكبين لأحدث الاتجاهات ليس مجرد واجب علينا، بل هو واجب صناعتنا بأكملها. أنا أؤمن بالناس، فهم الركيزة الأساسية لوكالتنا؛ أسميهم شركاء نجاح وليسوا مجرد موظفين، فنحن ببساطة نستثمر في أفكارهم، وقيمنا الأساسية موجهة بالكامل نحو الأشخاص، فهم المبدعون والمخططون ومن يدفعوننا دائماً للأمام."
    },
    secTeam: {
      tag: "قابل فريقنا",
      title: "أساس VisionArc",
      body: "تأسس كيان VisionArc كمزيج بين عقليات الابتكار والخبرة، حيث يجمع بين الإبداع والموهبة والمعرفة لضمان تحقيق الأهداف الإستراتيجية دائماً.",
      members: [
        { role: "إخصائي إستراتيجية النمو", name: "وليد الشريف", desc: "يربط الجهود البرمجية بالقيمة الحياتية للعميل (LTV) وهوامش الأرباح." },
        { role: "رئيس الفريق الهندسي", name: "أحمد مصطفى", desc: "يبني أنظمة Next.js خفيفة الوزن وعالية الكفاءة وخلفيات CRM." },
        { role: "مدير الإنتاج الإعلامي", name: "أحمد قطان", desc: "يدير الحملات الإعلانية فائقة الأداء وحلقات التحويل الرقمي." },
        { role: "المدير الإبداعي", name: "سارة الجميل", desc: "تقود الفخامة البصرية، واجهات التصميم الإنساني، وإستراتيجية الهوية." }
      ]
    },
    sec4Tag: "التركيز الإقليمي",
    sec4Title: "هندسة عالمية بمفهوم محلي.",
    sec4Body: [
      "تأسست وكالة VisionArc برؤية واضحة لإحداث ثورة في طريقة عمل المؤسسات الطموحة، ونحن نجلب تطوير البرمجيات ذات المستوى العالمي وأطر التسويق القائمة على البيانات مباشرة إلى الشركات النامية.",
      "من قلب مصر، نتفهم بشكل فريد الاختناقات التشغيلية الدقيقة التي تواجهها الشركات المحلية والإقليمية - بدءاً من ربط الأنظمة المخصصة ووصولاً إلى مواكبة التغيرات السريعة في السوق. نحن نجمع بين هذه الرؤى الإقليمية العميقة ومعايير التكنولوجيا العالمية النخبوية لنمنح عملائنا ميزة ترويجية لا تضاهى.",
    ],
    ctaTitle: "توقف عن التخمين. وابدأ في الهندسة.",
    ctaBody: "إذا كنت مستعداً للتخلي عن قوائم المهام السطحية وبناء محرك نمو عالي الكفاءة وقابل للتوسع، فلنتحدث الآن.",
    ctaBtn: "ابنِ قوسك الخاص — دعنا نتواصل",
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = copy[language];

  const seoTitle = language === "ar" ? "من نحن | VisionArc — هندسة النمو" : "About Us | VisionArc — The Architecture of Growth";
  const seoDesc = language === "ar"
    ? "تعرف على VisionArc - وكالة برمجية وإستراتيجية نمو متكاملة في مصر. نقضي على الفوضى التشغيلية ونبني محركات رقمية عالية الأداء."
    : "Learn about VisionArc - a team of strategic engineers, developers, and growth architects building high-performance digital engines.";
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": seoTitle,
    "description": seoDesc,
    "publisher": {
      "@type": "Organization",
      "name": "VisionArc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://visionarc.agency/og-image.png"
      }
    }
  };

  return (
    <>
      {/* ── SEO Metadata ──────────────────────────────────────────────── */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      <meta name="keywords" content={language === "ar" ? "من نحن، هندسة النمو، تطوير ويب مخصص، تصميم إنساني، أتمتة، مصر" : "about us, growth engineering, custom next.js, humane design, CRM automation, Egypt"} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDesc} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <Nav />

      <main className="w-full relative z-10 overflow-hidden">
        {/* Ambient background decorative glow lights */}
        <div className="fixed top-[20%] left-[-10%] w-[500px] h-[500px] bg-va-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-va-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* ── HERO SECTION ───────────────────────────────────────────── */}
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-6"
              style={{ color: "var(--va-accent)" }}
            >
              {t.heroTag}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 max-w-4xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: "var(--va-ink)",
                letterSpacing: language === "ar" ? "0" : "-0.03em",
              }}
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.3 }}
              className="text-xl md:text-2xl font-sans font-semibold mb-10 max-w-2xl"
              style={{ color: "var(--va-accent)" }}
            >
              {t.heroSubtitle}
            </motion.p>
            <div className="flex flex-col gap-6 max-w-3xl">
              {t.heroBody.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.4 + i * 0.1 }}
                  className="text-lg font-sans leading-relaxed"
                  style={{ color: "var(--va-ink-muted)" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* ── DYNAMIC COUNTERS SECTION ───────────────────────────────── */}
        <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16 border-b" style={{ borderColor: "var(--va-rule)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.secStats.map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={scaleIn}
                className="relative p-8 rounded-3xl border flex flex-col justify-center items-center text-center overflow-hidden surface-card"
                style={{ borderColor: "var(--va-rule)" }}
              >
                <div className="absolute -bottom-10 w-32 h-32 bg-va-accent/5 blur-3xl rounded-full" />
                <h3 className="text-5xl md:text-7xl font-serif font-bold text-va-accent mb-3 tracking-tight flex items-center gap-1 justify-center">
                  <CountUp end={stat.val} language={language} />
                  <span>{stat.suffix}</span>
                </h3>
                <p className="text-xs md:text-sm font-sans tracking-widest uppercase text-va-ink-muted font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* ── HOW WE ARCHITECT SCALE ──────────────────────────────────── */}
        <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="text-start mb-16">
            <p
              className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
              style={{ color: "var(--va-accent)" }}
            >
              {t.sec2Tag}
            </p>
            <h2
              className="text-4xl md:text-6xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: "var(--va-ink)",
                letterSpacing: language === "ar" ? "0" : "-0.03em",
              }}
            >
              {t.sec2Title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {t.sec2Cols.map((col, idx) => {
              const IconComp = col.icon;
              return (
                <motion.div
                  key={col.title}
                  variants={scaleIn}
                  whileHover={{ y: -6 }}
                  transition={spring}
                  className="relative p-8 md:p-10 rounded-3xl border flex flex-col justify-between surface-card"
                  style={{ borderColor: "var(--va-rule)" }}
                >
                  <div className="text-start">
                    {/* Icon Badge */}
                    <div
                      className="p-3.5 rounded-full inline-flex mb-6"
                      style={{
                        background: "var(--va-paper)",
                        border: "1px solid var(--va-rule)",
                      }}
                    >
                      <IconComp size={24} className="text-va-accent" strokeWidth={1.5} />
                    </div>
                    <span
                      className="block text-xs font-sans font-semibold uppercase tracking-widest mb-3"
                      style={{ color: "var(--va-accent)" }}
                    >
                      {col.subtitle}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-serif font-bold mb-4"
                      style={{ color: "var(--va-ink)" }}
                    >
                      {col.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--va-ink-muted)" }}>
                      {col.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </RevealSection>

        {/* ── INFINITE MARQUEE LOOP ──────────────────────────────────── */}
        <Marquee text={t.secMarquee} direction={language === "ar" ? "rtl" : "ltr"} />

        {/* ── THE HUMANE DESIGN PHILOSOPHY ────────────────────────────── */}
        <RevealSection
          className="w-full py-24 md:py-32 border-t border-b"
          style={{
            borderColor: "var(--va-rule)",
            background: "var(--va-surface)",
          }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column (Heading - 5 cols) */}
              <div className="lg:col-span-5 text-start">
                <p
                  className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4"
                  style={{ color: "var(--va-accent)" }}
                >
                  {t.sec3Tag}
                </p>
                <h2
                  className="text-4xl md:text-6xl leading-[1.1]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 500,
                    color: "var(--va-ink)",
                    letterSpacing: language === "ar" ? "0" : "-0.03em",
                  }}
                >
                  {t.sec3Title}
                </h2>
              </div>
              {/* Right Column (Body - 7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-start">
                {t.sec3Body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-lg font-sans leading-relaxed"
                    style={{
                      color: i === 0 ? "var(--va-ink)" : "var(--va-ink-muted)",
                      fontWeight: i === 0 ? 500 : 400,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── CEO STATEMENT SECTION ───────────────────────────────────── */}
        <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 border-b" style={{ borderColor: "var(--va-rule)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* CEO Image Container */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-va-accent to-pink-600 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000 pointer-events-none" />
              <div 
                className="relative overflow-hidden rounded-3xl border surface-card aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
                style={{ borderColor: "var(--va-rule)" }}
              >
                <img 
                  src="/images/ceo_vision_concept.png" 
                  alt="CEO Vision Concept"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition duration-700 ease-out"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-start">
                  <p className="text-xs tracking-[0.2em] uppercase font-bold text-va-accent mb-1">{t.secCEO.tag}</p>
                  <h3 className="text-lg font-serif font-semibold text-white">{t.secCEO.role}</h3>
                </div>
              </div>
            </div>

            {/* CEO Vision Copy */}
            <div className="lg:col-span-7 text-start flex flex-col justify-center">
              <span className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4" style={{ color: "var(--va-accent)" }}>
                {t.secCEO.tag}
              </span>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  color: "var(--va-ink)",
                  letterSpacing: language === "ar" ? "0" : "-0.03em"
                }}
              >
                {t.secCEO.title}
              </h2>
              
              <div className="relative pl-6 md:pl-10 ltr:pl-6 ltr:md:pl-10 rtl:pr-6 rtl:md:pr-10 ltr:border-l-2 rtl:border-r-2 ltr:border-r-0 rtl:border-l-0" style={{ borderColor: "var(--va-accent)" }}>
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed"
                  style={{ 
                    color: "var(--va-ink)",
                    direction: language === "ar" ? "rtl" : "ltr"
                  }}
                >
                  &ldquo;{t.secCEO.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── MEET OUR TEAM / DISCIPLINES SECTION ──────────────────────── */}
        <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 border-b" style={{ borderColor: "var(--va-rule)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
            <div className="lg:col-span-5 text-start">
              <p className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4" style={{ color: "var(--va-accent)" }}>
                {t.secTeam.tag}
              </p>
              <h2 
                className="text-4xl md:text-6xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  color: "var(--va-ink)",
                  letterSpacing: language === "ar" ? "0" : "-0.03em"
                }}
              >
                {t.secTeam.title}
              </h2>
            </div>
            <div className="lg:col-span-7 text-start flex flex-col justify-end h-full">
              <p className="text-lg font-sans leading-relaxed text-va-ink-muted">
                {t.secTeam.body}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.secTeam.members.map((member) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                transition={spring}
                className="p-8 rounded-3xl border flex flex-col justify-between surface-card text-start group hover:border-va-accent/40 transition-colors duration-500"
                style={{ borderColor: "var(--va-rule)" }}
              >
                <div>
                  <span className="block text-xs font-sans font-semibold uppercase tracking-widest mb-3 text-va-accent">
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-va-accent transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-va-ink-muted">
                    {member.desc}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-va-rule flex justify-between items-center group-hover:border-va-accent/20 transition-colors duration-500">
                  <span className="text-[10px] uppercase tracking-widest text-va-ink-muted/50 group-hover:text-va-accent/60 transition-colors">VisionArc Collective</span>
                  <ArrowUpRight size={14} className="text-va-ink-muted/30 group-hover:text-va-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* ── GLOBAL ENGINEERING. LOCAL CONTEXT. ──────────────────────── */}
        <RevealSection className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div
            className="relative rounded-3xl p-8 md:p-16 overflow-hidden border"
            style={{
              background: "var(--va-paper)",
              borderColor: "var(--va-rule)",
            }}
          >
            <div
              className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                background: "var(--va-accent)",
                opacity: 0.04,
                filter: "blur(100px)",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-4 text-start">
                <span
                  className="block text-xs font-sans font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "var(--va-accent)" }}
                >
                  {t.sec4Tag}
                </span>
                <h2
                  className="text-3xl md:text-5xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 500,
                    color: "var(--va-ink)",
                    letterSpacing: language === "ar" ? "0" : "-0.02em",
                  }}
                >
                  {t.sec4Title}
                </h2>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-5 text-start">
                {t.sec4Body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base font-sans leading-relaxed"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
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
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background: "var(--va-accent)",
                opacity: 0.08,
                filter: "blur(120px)",
              }}
            />
            <div className="relative z-10">
              <h2
                className="text-4xl md:text-6xl lg:text-7xl mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  color: "var(--va-paper)",
                  letterSpacing: language === "ar" ? "0" : "-0.03em",
                }}
              >
                {t.ctaTitle}
              </h2>
              <p
                className="font-sans text-lg max-w-xl mx-auto mb-10 text-center"
                style={{
                  color: "color-mix(in srgb, var(--va-paper) 60%, transparent)",
                }}
              >
                {t.ctaBody}
              </p>
              <Link href="/#contact">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-sans font-semibold rounded-lg shadow-2xl"
                  style={{
                    background: "var(--va-accent)",
                    color: "var(--va-paper)",
                    letterSpacing: language === "ar" ? "0" : "0.03em",
                  }}
                >
                  {t.ctaBtn}{" "}
                  {language === "ar" ? (
                    <ArrowLeft size={18} className="rotate-45" />
                  ) : (
                    <ArrowUpRight size={18} />
                  )}
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
