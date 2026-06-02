"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/* ─── TRANSLATION DICTIONARIES ─────────────────────────────────────────── */
const dictionary: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.work": "Work",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Start a project",

    // Blog Landing Page & Detail Page
    "blog.tag": "Insights & News",
    "blog.title": "Our latest thinking.",
    "blog.title.italic": "Crafted ideas.",
    "blog.desc": "Exploring the boundaries of technology, design, and conversion optimization. Read our latest articles written by our specialized crew.",
    "blog.readTime": "min read",
    "blog.back": "Back to Blog",
    "blog.author": "Written by",
    "blog.category.all": "All Articles",

    // Hero Section
    "hero.eyebrow": "Digital Agency — Est. 2024",
    "hero.title1": "Where brands earn ",
    "hero.title2": "their humanity.",
    "hero.desc": "We partner with ambitious businesses to craft visual identities, run media that converts, and build web experiences that feel hand-made — not generated.",
    "hero.cta.work": "View our work",
    "hero.cta.talk": "Start a project",
    "hero.tagline.services": "Our services",
    "hero.ethos.title": "Our ethos",
    "hero.ethos.quote": "Generic design is invisible. We make brands that people actually remember.",

    // Work Section
    "work.tag": "Selected Cases",
    "work.title": "Work that leaves a mark.",
    "work.explore": "View Case Study",
    "work.archive": "View full archive",

    // Services Section
    "services.tag": "What We Do",
    "services.title": "Our capabilities",
    "services.title1": "We don't do everything. ",
    "services.title2": "We do four things, exceptionally well.",
    "services.desc": "Our approach is intentionally narrow. By focusing our craft, we deliver results that feel considered, native, and undeniably human.",
    "services.accordion.cta": "Explore Service",
    "services.deliverables": "Deliverables",
    "services.engagement": "Engagement",

    // About Section
    "about.tag": "Our Ethos",
    "about.title": "Crafted, not generated.",
    "about.manifesto": "The Manifesto",
    "about.title1": "We reject the",
    "about.title2": "ordinary.",
    "about.title3": "We design for",
    "about.title4": "impact.",
    "about.desc1": "In a sea of templates and soulless corporate websites, VisionArc stands for craftsmanship, performance, and aesthetic luxury.",
    "about.desc2": "We are a collective of designers, engineers, and strategists. We believe that true digital luxury isn't just about how it looks—it's about how it feels. Every interaction, every pixel, and every animation is engineered to create a deep, lasting connection with your audience.",
    "about.stat1.val": "48+",
    "about.stat1.lbl": "Awards Won",
    "about.stat2.val": "12y",
    "about.stat2.lbl": "Experience",

    // Contact Section
    "contact.tag": "Start a project",
    "contact.title": "Let's talk about",
    "contact.title.italic": "what's next.",
    "contact.desc": "Fill out the form below to give us a sense of your project. We review every inquiry and aim to respond within 48 hours.",
    "contact.step.progress": "Step {step} of 3",
    "contact.step1.header": "First, who are we speaking with?",
    "contact.step1.name": "Full Name",
    "contact.step1.name.placeholder": "Jane Doe",
    "contact.step1.email": "Email Address",
    "contact.step1.email.placeholder": "jane@example.com",
    "contact.step2.header": "What are you looking for?",
    "contact.step2.service": "Primary Service",
    "contact.step2.svc.branding": "Branding",
    "contact.step2.svc.social": "Social Media",
    "contact.step2.svc.web": "Web Development",
    "contact.step2.svc.other": "Other",
    "contact.step2.budget": "Estimated Budget",
    "contact.step2.budget.small": "< $5k",
    "contact.step2.budget.medium": "$5k - $15k",
    "contact.step2.budget.large": "$15k+",
    "contact.step3.header": "Tell us about the project.",
    "contact.step3.details": "Project Details",
    "contact.step3.placeholder": "Describe your goals, current challenges, and any deadlines...",
    "contact.btn.next": "Next Step",
    "contact.btn.back": "Back",
    "contact.btn.submit": "Submit Inquiry",
    "contact.btn.submitting": "Sending...",
    "contact.success.header": "Inquiry received.",
    "contact.success.desc": "Thank you for reaching out. We will review your details and be in touch within 48 hours.",
    "contact.error.header": "Something went wrong.",
    "contact.error.btn": "Try Again",
    "contact.address": "Maadi, Cairo, Egypt",

    // Footer
    "footer.desc": "A multi-disciplinary digital agency focused on branding, media buying, and bespoke web experiences. Hand-crafted, never generated.",
    "footer.nav.header": "Navigation",
    "footer.social.header": "Socials",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "VisionArc Agency. All rights reserved.",

    // Pricing Page
    "pricing.tag": "Investments",
    "pricing.title": "Transparent packages.",
    "pricing.title.italic": "Built around your growth.",
    "pricing.desc": "We believe in clear numbers, transparent milestones, and zero hidden costs. Select one of our established service plans, or configure a completely bespoke stack using our custom estimator below.",
    "pricing.toggle.web": "Web & Branding",
    "pricing.toggle.social": "Social Media & Ads",
    "pricing.tier.entry": "Entry Plan",
    "pricing.tier.growth": "Expansion Plan",
    "pricing.tier.custom": "Custom Spec",
    "pricing.cost.onetime": "One-time Project Cost",
    "pricing.cost.monthly": "monthly retainer fee",
    "pricing.disclaimer": "All plans can be invoiced in EGP or equivalent USD values. All listed prices represent Agency Management Fees only. Ad Spend Budgets are paid directly by the client to the advertising platforms.",
    "pricing.cta.tag": "Let's build it",
    "pricing.cta.title": "Ready to launch? ",
    "pricing.cta.title.italic": "Start today.",
    "pricing.cta.desc": "Secure your project timeline slots. Fill out the contact form on the home page, mention your desired pricing plan, and our engineering lead will reach out.",
    "pricing.cta.btn": "Book a Discovery Call",

    // Interactive Calculator
    "calc.tag": "Bespoke Builder",
    "calc.title": "Build Your Own Stack",
    "calc.desc": "Toggle the creative services, engineering components, and optimization audits below to estimate your total launch investment in real-time.",
    "calc.header.brand": "Brand & Strategy",
    "calc.header.web": "Engineering & Development",
    "calc.header.marketing": "Optimization & Media Campaigns",
    "calc.receipt.title": "Bespoke Estimate",
    "calc.receipt.subtitle": "Items list & dynamic billing projection",
    "calc.receipt.total": "Estimated Launch:",
    "calc.receipt.disclaimer": "*Estimates represent ballpark figures based on structural engineering difficulty. Final billing depends on visual scope approval.",
    "calc.receipt.btn": "Book This Estimate",

    // FAQ Section
    "faq.tag": "FAQ",
    "faq.title": "Pricing Details",
    "faq.common": "Common Questions",

    // Privacy Policy
    "privacy.back": "Back to Home",
    "privacy.tag": "Legal Documentation",
    "privacy.title": "Privacy Policy",
    "privacy.updated": "Last Updated: May 28, 2026",
    "privacy.sections": "Document Sections",
  },
  ar: {
    // Navigation
    "nav.work": "أعمالنا",
    "nav.services": "خدماتنا",
    "nav.pricing": "الأسعار",
    "nav.blog": "المدونة",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.cta": "ابدأ مشروعك",

    // Blog Landing Page & Detail Page
    "blog.tag": "مقالات وأفكار",
    "blog.title": "أحدث مقالاتنا",
    "blog.title.italic": "وأفكارنا الإبداعية.",
    "blog.desc": "نستكشف حدود التكنولوجيا، والتصميم، وتحسين معدلات التحويل. اقرأ مقالاتنا المكتوبة بأيدي فريقنا المتخصص.",
    "blog.readTime": "دقائق قراءة",
    "blog.back": "العودة للمدونة",
    "blog.author": "بقلم",
    "blog.category.all": "جميع المقالات",

    // Hero Section
    "hero.eyebrow": "وكالة رقمية — تأسست عام ٢٠٢٤",
    "hero.title1": "حيث تكتسب العلامات ",
    "hero.title2": "طابعها الإنساني.",
    "hero.desc": "نشارك الشركات الطموحة لبناء هويات بصرية استثنائية، وإدارة حملات إعلانية تحقق التحويل، وتطوير تجارب ويب فائقة السرعة تُصنع يدوياً لا عبر التوليد التلقائي.",
    "hero.cta.work": "تصفح أعمالنا",
    "hero.cta.talk": "ابدأ مشروعك",
    "hero.tagline.services": "خدماتنا",
    "hero.ethos.title": "فلسفتنا",
    "hero.ethos.quote": "التصميم المكرر لا يراه أحد. نحن نصنع علامات تجارية يتذكرها الناس بالفعل.",

    // Work Section
    "work.tag": "مشاريع مختارة",
    "work.title": "أعمال تترك أثراً وعلامة فارقة.",
    "work.explore": "عرض تفاصيل المشروع",
    "work.archive": "عرض الأرشيف الكامل",

    // Services Section
    "services.tag": "ماذا نقدم",
    "services.title": "مجالات خبرتنا",
    "services.title1": "نحن لا نقدم كل شيء. ",
    "services.title2": "بل نقدم أربعة أشياء، بتميز استثنائي.",
    "services.desc": "نهجنا ضيق ومحدد عن قصد. من خلال تركيز خبرتنا، نقدم نتائج مدروسة وفعالة وملموسة للغاية.",
    "services.accordion.cta": "اكتشف الخدمة",
    "services.deliverables": "مخرجات العمل",
    "services.engagement": "طبيعة التعاقد",

    // About Section
    "about.tag": "فلسفتنا",
    "about.title": "مُصمم ومبرمج يدوياً، وليس مولداً.",
    "about.manifesto": "البيان الإبداعي",
    "about.title1": "نحن نرفض",
    "about.title2": "المألوف.",
    "about.title3": "ونصمم من أجل",
    "about.title4": "التأثير.",
    "about.desc1": "في بحر من القوالب الجاهزة ومواقع الشركات التقليدية الخالية من الروح، تبرز وكالة VisionArc لتقدم الحرفية العالية، والأداء الاستثنائي، والرفاهية البصرية.",
    "about.desc2": "نحن مجموعة متكاملة من المصممين والمهندسين والإستراتيجيين. نؤمن بأن الفخامة الرقمية الحقيقية لا تكمن فقط في المظهر، بل في كيفية عيش التجربة وتجربتها. كل تفاعل وكل رسوم متحركة مهندسة خصيصاً لتخلق رابطاً عميقاً ودائماً مع جمهورك.",
    "about.stat1.val": "٤٨+",
    "about.stat1.lbl": "جوائز من الفئة",
    "about.stat2.val": "١٢ عاماً",
    "about.stat2.lbl": "من الخبرة",

    // Contact Section
    "contact.tag": "ابدأ مشروعك",
    "contact.title": "دعنا نتحدث عن",
    "contact.title.italic": "خطوتك القادمة.",
    "contact.desc": "املأ النموذج أدناه لنأخذ فكرة عن تفاصيل مشروعك. نراجع جميع الطلبات ونجيب عليها في غضون ٤٨ ساعة.",
    "contact.step.progress": "الخطوة {step} من ٣",
    "contact.step1.header": "أولاً، مع من نتحدث؟",
    "contact.step1.name": "الاسم الكامل",
    "contact.step1.name.placeholder": "مثال: أحمد محمد",
    "contact.step1.email": "البريد الإلكتروني",
    "contact.step1.email.placeholder": "ahmed@example.com",
    "contact.step2.header": "ما الذي تبحث عنه؟",
    "contact.step2.service": "الخدمة الأساسية",
    "contact.step2.svc.branding": "هوية بصرية وتصميم",
    "contact.step2.svc.social": "إدارة شبكات التواصل الاجتماعي",
    "contact.step2.svc.web": "تطوير مواقع الويب",
    "contact.step2.svc.other": "غير ذلك",
    "contact.step2.budget": "الميزانية التقديرية",
    "contact.step2.budget.small": "أقل من ٥ آلاف $",
    "contact.step2.budget.medium": "٥ آلاف - ١٥ ألف $",
    "contact.step2.budget.large": "أكثر من ١٥ ألف $",
    "contact.step3.header": "أخبرنا عن تفاصيل مشروعك.",
    "contact.step3.details": "تفاصيل المشروع",
    "contact.step3.placeholder": "صف أهدافك، التحديات الحالية، والمواعيد النهائية المطلوبة...",
    "contact.btn.next": "الخطوة التالية",
    "contact.btn.back": "رجوع",
    "contact.btn.submit": "إرسال الطلب",
    "contact.btn.submitting": "جاري الإرسال...",
    "contact.success.header": "تم استلام طلبك بنجاح.",
    "contact.success.desc": "نشكرك على تواصلك معنا. سنقوم بمراجعة التفاصيل والتواصل معك خلال ٤٨ ساعة.",
    "contact.error.header": "حدث خطأ ما.",
    "contact.error.btn": "حاول مرة أخرى",
    "contact.address": "المعادي، القاهرة، مصر",

    // Footer
    "footer.desc": "وكالة رقمية متكاملة متخصصة في الهويات البصرية، إدارة الحملات الإعلانية، وتطوير مواقع الويب المخصصة. أعمالنا يدوية بالكامل وخالية من التكرار.",
    "footer.nav.header": "روابط سريعة",
    "footer.social.header": "حساباتنا",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.rights": "وكالة VisionArc. جميع الحقوق محفوظة.",

    // Pricing Page
    "pricing.tag": "الاستثمار",
    "pricing.title": "باقات واضحة وعادلة.",
    "pricing.title.italic": "مصممة لدعم نموك المالي.",
    "pricing.desc": "نحن نؤمن بالأرقام الواضحة والمراحل الشفافة، دون أي تكاليف خفية. اختر إحدى باقاتنا المعتمدة، أو قم بتركيب سلة خدمات مخصصة لمشروعك عبر أداة التقييم التفاعلية بالأسفل.",
    "pricing.toggle.web": "الويب والهويات البصرية",
    "pricing.toggle.social": "التواصل الاجتماعي والإعلانات",
    "pricing.tier.entry": "باقة المبتدئين",
    "pricing.tier.growth": "باقة النمو",
    "pricing.tier.custom": "باقة النخبة",
    "pricing.cost.onetime": "تكلفة تدفع مرة واحدة",
    "pricing.cost.monthly": "تكلفة شهرية للمتابعة",
    "pricing.disclaimer": "💡 يمكن فوترة جميع الباقات بالجنيه المصري أو ما يعادله بالدولار الأمريكي. جميع الأسعار المذكورة تشمل رسوم إدارة الوكالة فقط، ويتم دفع ميزانية الإعلانات مباشرة من قبل العميل للمنصات الإعلانية.",
    "pricing.cta.tag": "دعنا نبني مشروعك",
    "pricing.cta.title": "جاهز للإطلاق؟ ",
    "pricing.cta.title.italic": "ابدأ اليوم.",
    "pricing.cta.desc": "احجز مكانك في جدول مشاريعنا. املأ نموذج الاتصال في الصفحة الرئيسية، وحدد باقة الأسعار المطلوبة، وسيتواصل معك رئيس الفريق الهندسي لمناقشة التفاصيل.",
    "pricing.cta.btn": "احجز مكالمة استكشافية",

    // Interactive Calculator
    "calc.tag": "حاسبة التكلفة المخصصة",
    "calc.title": "صمم باقة خدماتك بنفسك",
    "calc.desc": "قم بتفعيل وتعديل الخدمات الإبداعية، والبرمجية، والحملات التسويقية بالأسفل لتقدير قيمة الاستثمار الإجمالي لمشروعك في الوقت الفعلي.",
    "calc.header.brand": "الهوية الإبداعية والإستراتيجية",
    "calc.header.web": "الهندسة البرمجية والتطوير",
    "calc.header.marketing": "إدارة الإعلانات وتطوير المبيعات",
    "calc.receipt.title": "فاتورة تقديرية مخصصة",
    "calc.receipt.subtitle": "قائمة الخدمات المحددة وحساب التكلفة ديناميكياً",
    "calc.receipt.total": "الاستثمار التقديري:",
    "calc.receipt.disclaimer": "*التقديرات تمثل أرقاماً أولية تعتمد على الصعوبة الهندسية والوقت المطلوب للتنفيذ. الفوترة النهائية تتم بناءً على الموافقة الرسمية لنطاق العمل.",
    "calc.receipt.btn": "احجز هذه الفاتورة التقديرية",

    // FAQ Section
    "faq.tag": "الأسئلة الشائعة",
    "faq.title": "تفاصيل استثمارك",
    "faq.common": "أسئلة مكررة",

    // Privacy Policy
    "privacy.back": "العودة للرئيسية",
    "privacy.tag": "الوثائق القانونية",
    "privacy.title": "سياسة الخصوصية",
    "privacy.updated": "آخر تحديث: ٢٨ مايو ٢٠٢٦",
    "privacy.sections": "أقسام الوثيقة",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load saved language or detect from browser on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("vision_arc_lang") as Language;
    if (savedLang === "en" || savedLang === "ar") {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "ar") {
        setLanguageState("ar");
      }
    }
    setMounted(true);
  }, []);

  // Update HTML attributes dynamically when language switches
  useEffect(() => {
    if (!mounted) return;
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem("vision_arc_lang", language);
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  const t = (key: string): string => {
    return dictionary[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
