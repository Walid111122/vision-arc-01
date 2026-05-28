"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";
import { useLanguage } from "@/lib/context/LanguageContext";

const spring = { type: "spring", stiffness: 90, damping: 28, mass: 1.5 } as const;

export default function PrivacyPage() {
  const { t, language } = useLanguage();

  const sections = [
    { id: "info-collect", label: language === "ar" ? "١. المعلومات التي نجمعها" : "1. Information We Collect" },
    { id: "info-use", label: language === "ar" ? "٢. كيف نستخدم معلوماتك" : "2. How We Use Your Information" },
    { id: "info-disclose", label: language === "ar" ? "٣. الكشف عن معلوماتك" : "3. Disclosure of Your Information" },
    { id: "cookies-pixels", label: language === "ar" ? "٤. تقنيات التتبع (الكوكيز والبكسل)" : "4. Tracking Technologies (Cookies & Pixels)" },
    { id: "security", label: language === "ar" ? "٥. أمن معلوماتك" : "5. Security of Your Information" },
    { id: "children", label: language === "ar" ? "٦. سياسة الأطفال" : "6. Policy for Children" },
    { id: "rights", label: language === "ar" ? "٧. حقوق الخصوصية الخاصة بك" : "7. Your Privacy Rights" },
    { id: "contact", label: language === "ar" ? "٨. اتصل بنا" : "8. Contact Us" },
  ];

  return (
    <>
      <Nav />
      <main className="w-full relative z-10 overflow-hidden bg-va-paper text-start">
        {/* Ambient background glows */}
        <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-va-accent/3 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full bg-va-accent/3 blur-[140px] pointer-events-none" />

        {/* ── HERO HEADER ────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 border-b border-va-rule text-start">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-start">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? 15 : -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring}
              className="mb-8 text-start"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase transition-colors hover:text-[var(--va-accent)]"
                style={{ color: "var(--va-ink-muted)" }}
              >
                {language === "ar" ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {t("privacy.back")}
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-medium mb-4 text-start"
              style={{
                color: "var(--va-ink)",
                letterSpacing: language === "ar" ? "0" : "-0.03em"
              }}
            >
              {t("privacy.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-start"
              style={{ color: "var(--va-ink-muted)" }}
            >
              {t("privacy.updated")}
            </motion.p>
          </div>
        </section>

        {/* ── CONTENT GRID ───────────────────────────────────────────── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start text-start">
            
            {/* Left Column: Sticky Navigator (Desktop only) */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 text-start">
              <nav className="flex flex-col gap-3.5 border-s ps-6 text-start" style={{ borderColor: "var(--va-rule)" }}>
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-3 block text-start" style={{ color: "var(--va-ink-muted)" }}>
                  {t("privacy.sections")}
                </span>
                {sections.map((sec) => (
                  <Link
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-sm font-sans font-medium transition-colors hover:text-[var(--va-accent)] text-start"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    {sec.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Right Column: Scrollable Document Body */}
            <div className="lg:col-span-8 flex flex-col gap-14 max-w-3xl text-start">
              {/* Introduction */}
              <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                {language === "ar" ? (
                  <>
                    <p>
                      مرحبًا بك في وكالة Vision Arc ("نحن" أو "نص ضمير المتكلم"). نحن ملتزمون بحماية بياناتك الشخصية واحترام خصوصيتك. توضح سياسة الخصوصية هذه كيف نقوم بجمع معلوماتك واستخدامها والكشف عنها وحمايتها عندما تزور موقعنا الإلكتروني، أو تستخدم خدماتنا، أو تتفاعل معنا في كل ما يتعلق بخدمات إدارة مواقع التواصل الاجتماعي والإعلانات.
                    </p>
                    <p>
                      يرجى قراءة سياسة الخصوصية هذه بعناية. إذا كنت لا توافق على شروط سياسة الخصوصية هذه، يرجى عدم الدخول إلى الموقع أو استخدام خدماتنا.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Welcome to Vision Arc (“we,” “our,” or “us”). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us in relation to our social media management and advertising services.
                    </p>
                    <p>
                      Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
                    </p>
                  </>
                )}
              </div>

              {/* Section 1 */}
              <article id="info-collect" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "١. المعلومات التي نجمعها" : "1. Information We Collect"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "قد نجمع معلومات عنك بطرق مختلفة. تشمل المعلومات التي قد نجمعها على الموقع ما يلي:"
                      : "We may collect information about you in a variety of ways. The information we may collect on the Site includes:"}
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-2 text-start">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "البيانات الشخصية" : "Personal Data"}
                      </h3>
                      <p className="text-start">
                        {language === "ar"
                          ? "معلومات تحديد الهوية الشخصية، مثل اسمك، وعنوان البريد الإلكتروني، ورقم هاتفك، والمعلومات الديموغرافية التي تقدمها لنا طواعية عندما تختار المشاركة في الأنشطة المختلفة المتعلقة بالموقع، مثل الاتصال بنا من خلال نماذجنا أو الاشتراك في النشرات الإخبارية."
                          : "Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us when you choose to participate in various activities related to the Site, such as contacting us through our forms or subscribing to newsletters."}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "بيانات الأعمال" : "Business Data"}
                      </h3>
                      <p className="text-start">
                        {language === "ar"
                          ? "المعلومات المتعلقة بنشاطك التجاري، وحسابات وسائل التواصل الاجتماعي، وحسابات الإعلانات، وأصول العلامة التجارية التي تقدمها لنا لتنفيذ خدمات الإدارة والتسويق الخاصة بنا."
                          : "Information related to your business, social media handles, ad accounts, and brand assets that you provide to us to execute our management and marketing services."}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "البيانات المشتقة" : "Derivative Data"}
                      </h3>
                      <p className="text-start">
                        {language === "ar"
                          ? "المعلومات التي تجمعها خوادمنا تلقائيًا عند وصولك إلى الموقع، مثل عنوان IP الخاص بك، ونوع متصفحك، ونظام تشغيلك، وأوقات وصولك، والصفحات التي شاهدتها مباشرة قبل وبعد الوصول إلى الموقع."
                          : "Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site."}
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 2 */}
              <article id="info-use" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٢. كيف نستخدم معلوماتك" : "2. How We Use Your Information"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "يسمح لنا الحصول على معلومات دقيقة عنك بتقديم تجربة سلسة وفعالة ومخصصة لك. على وجه التحديد، قد نستخدم المعلومات التي نجمعها عنك عبر الموقع أو أثناء بدء تقديم الخدمة من أجل:"
                      : "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site or during service onboarding to:"}
                  </p>
                  <ul className="list-none flex flex-col gap-3.5 ps-2 mt-2 text-start">
                    {(language === "ar" ? [
                      "تنفيذ وإدارة وتحسين شبكات التواصل الاجتماعي وحملاتك الإعلانية.",
                      "تقديم إعلانات مستهدفة، كوبونات، نشرات إخبارية، ومعلومات أخرى تتعلق بالعروض والموقع إليك.",
                      "إرسال رسائل بريد إلكتروني أو رسائل نصية بخصوص حسابك، التحديثات، أو تقارير الأداء الشهرية.",
                      "إنشاء ملف تعريف خاص بك لجعل زياراتك المستقبلية للموقع أكثر تخصيصاً.",
                      "زيادة كفاءة وتشغيل الموقع.",
                      "مراقبة وتحليل الاستخدام والاتجاهات لتحسين تجربتك مع الموقع.",
                      "الاستجابة لطلبات خدمة العملاء والمنتجات."
                    ] : [
                      "Fulfill, manage, and optimize your social media and ad campaigns.",
                      "Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.",
                      "Email or message you regarding your account, updates, or monthly performance reports.",
                      "Generate a profile about you to make your future visits to the Site more personalized.",
                      "Increase the efficiency and operation of the Site.",
                      "Monitor and analyze usage and trends to improve your experience with the Site.",
                      "Respond to product and customer service requests."
                    ]).map((item, i) => (
                      <li key={i} className="flex gap-3 items-start text-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-va-accent" />
                        <span className="text-start">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 3 */}
              <article id="info-disclose" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٣. الكشف عن معلوماتك" : "3. Disclosure of Your Information"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "قد نشارك المعلومات التي جمعناها عنك في مواقف معينة. قد يتم الكشف عن معلوماتك على النحو التالي:"
                      : "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:"}
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-2 text-start">
                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "بموجب القانون أو لحماية الحقوق" : "By Law or to Protect Rights"}
                      </strong>
                      {language === "ar"
                        ? "إذا كنا نعتقد أن الكشف عن معلوماتك ضروري للاستجابة للإجراءات القانونية، أو للتحقيق في الانتهاكات المحتملة لسياساتنا ومعالجتها، أو لحماية حقوق وممتلكات وسلامة الآخرين."
                        : "If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others."}
                    </p>

                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "مقدمو الخدمات من الطرف الثالث" : "Third-Party Service Providers"}
                      </strong>
                      {language === "ar"
                        ? "قد نشارك معلوماتك مع جهات خارجية تؤدي خدمات لنا أو بالنيابة عنا، بما في ذلك تحليل البيانات، وتوصيل البريد الإلكتروني، وخدمات الاستضافة، وخدمة العملاء، والمساعدة التسويقية (مثل منصات إعلانات Meta، وGoogle Analytics، وإعلانات TikTok)."
                        : "We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance (such as Meta Ads, Google Analytics, and TikTok Ads platforms)."}
                    </p>

                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "بموافقتك" : "With Your Consent"}
                      </strong>
                      {language === "ar"
                        ? "يجوز لنا الكشف عن معلوماتك الشخصية لأي غرض آخر بموافقتك الصريحة."
                        : "We may disclose your personal information for any other purpose with your explicit consent."}
                    </p>
                  </div>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 4 */}
              <article id="cookies-pixels" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٤. تقنيات التتبع (ملفات تعريف الارتباط والبكسل)" : "4. Tracking Technologies (Cookies and Pixels)"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  {language === "ar" ? (
                    <>
                      <p className="text-start">
                        قد نستخدم ملفات تعريف الارتباط، إشارات الويب، بكسلات التتبع، وتقنيات التتبع الأخرى على الموقع للمساعدة في تخصيص الموقع وتحسين تجربتك.
                      </p>
                      <p className="text-start">
                        عند وصولك إلى الموقع، لا يتم جمع معلوماتك الشخصية من خلال استخدام تكنولوجيا التتبع. ومع ذلك، يرجى العلم بأننا نستخدم بكسلات تحسين الأداء (مثل Meta Pixel) لتتبع تحويلات الموقع وبناء جماهير مشابهة لحملاتنا التسويقية الخاصة. تم ضبط معظم المتصفحات لقبول ملفات تعريف الارتباط افتراضياً. يمكنك إزالة ملفات تعريف الارتباط أو رفضها، ولكن اعلم أن هذا الإجراء قد يؤثر على توفر الموقع ووظائفه.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-start">
                        We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience.
                      </p>
                      <p className="text-start">
                        When you access the Site, your personal information is not collected through the use of tracking technology. However, please be aware that we utilize optimization pixels (such as the Meta Pixel) to track website conversions and build lookalike audiences for our own marketing campaigns. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
                      </p>
                    </>
                  )}
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 5 */}
              <article id="security" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٥. أمن معلوماتك" : "5. Security of Your Information"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "نحن نستخدم تدابير أمنية إدارية وفنية ومادية للمساعدة في حماية معلوماتك الشخصية. على الرغم من أننا اتخذنا خطوات معقولة لتأمين المعلومات الشخصية التي تقدمها لنا، يرجى العلم أنه على الرغم من جهودنا، لا توجد تدابير أمنية مثالية أو غير قابلة للاختراق، ولا يمكن ضمان عدم اعتراض أي طريقة لنقل البيانات أو إساءة استخدامها."
                      : "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse."}
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 6 */}
              <article id="children" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٦. سياسة الأطفال" : "6. Policy for Children"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "نحن لا نطلب معلومات عن قصد من الأطفال دون سن ١٣ عاماً أو نسوق لهم. إذا علمت بأي بيانات جمعناها من أطفال دون سن ١٣ عاماً، يرجى الاتصال بنا باستخدام معلومات الاتصال المقدمة أدناه."
                      : "We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below."}
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 7 */}
              <article id="rights" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٧. حقوق الخصوصية الخاصة بك" : "7. Your Privacy Rights"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "اعتماداً على موقعك الجغرافي، قد يكون لديك الحق في طلب الوصول إلى البيانات الشخصية التي نجمعها منك، أو تغييرها، أو حذفها في بعض الحالات. لطلب مراجعة معلوماتك الشخصية أو تحديثها أو حذفها، يرجى إرسال طلب إلى البريد الإلكتروني المحدد أدناه."
                      : "Depending on your location, you may have the right to request access to the personal data we collect from you, change that data, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request to the email specified below."}
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 8 */}
              <article id="contact" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٨. اتصل بنا" : "8. Contact Us"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "إذا كانت لديك أسئلة أو تعليقات حول سياسة الخصوصية هذه، يرجى الاتصال بـ Vision Arc على:"
                      : "If you have questions or comments about this Privacy Policy, please contact Vision Arc at:"}
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-2 text-start">
                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                      </strong>
                      <a href="mailto:hello@visionarc.com" className="transition-colors hover:text-[var(--va-accent)] underline text-start">
                        hello@visionarc.com
                      </a>
                    </p>
                    
                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "الهاتف" : "Phone"}
                      </strong>
                      <span className="text-start" style={{ color: "var(--va-ink)", direction: "ltr", display: "inline-block" }}>+20 10 1234 5678</span>
                    </p>

                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "الموقع الإلكتروني" : "Website"}
                      </strong>
                      <Link href="/" className="transition-colors hover:text-[var(--va-accent)] underline text-start">
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
