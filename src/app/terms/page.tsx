"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";
import { useLanguage } from "@/lib/context/LanguageContext";

const spring = { type: "spring", stiffness: 90, damping: 28, mass: 1.5 } as const;

export default function TermsPage() {
  const { t, language } = useLanguage();

  const sections = [
    { id: "intellectual-property", label: language === "ar" ? "١. حقوق الملكية الفكرية" : "1. Intellectual Property" },
    { id: "user-representations", label: language === "ar" ? "٢. إقرارات المستخدم" : "2. User Representations" },
    { id: "service-scope", label: language === "ar" ? "٣. نطاق الخدمة والموافقات" : "3. Service Scope & Approvals" },
    { id: "fees-payment", label: language === "ar" ? "٤. الرسوم والدفع والميزانيات" : "4. Fees, Payment, & Ad Spend" },
    { id: "prohibited-activities", label: language === "ar" ? "٥. الأنشطة المحظورة" : "5. Prohibited Activities" },
    { id: "limitation-liability", label: language === "ar" ? "٦. تحديد المسؤولية" : "6. Limitation of Liability" },
    { id: "governing-law", label: language === "ar" ? "٧. القانون الحاكم" : "7. Governing Law" },
    { id: "modifications-interruptions", label: language === "ar" ? "٨. التعديلات والانقطاعات" : "8. Modifications & Interruptions" },
    { id: "contact-us", label: language === "ar" ? "٩. اتصل بنا" : "9. Contact Us" },
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
                {language === "ar" ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {t("terms.back")}
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
              {t("terms.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-start"
              style={{ color: "var(--va-ink-muted)" }}
            >
              {t("terms.updated")}
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
                  {t("terms.sections")}
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
                      مرحبًا بك في Vision Arc ("الشركة" أو "نحن" أو "نص ضمير المتكلم"). تشكل شروط الاستخدام هذه اتفاقية ملزمة قانونًا مبرمة بينك، سواء شخصيًا أو نيابة عن كيان ("أنت") وبين Vision Arc، فيما يتعلق بوصولك إلى واستخدامك لموقعنا الإلكتروني، بالإضافة إلى أي شكل إعلامي آخر أو قناة إعلامية أو موقع ويب للهاتف المحمول أو تطبيق جوال ذي صلة أو مرتبط أو متصل به خلاف ذلك (إجمالاً، "الموقع")، وخدمات إدارة وسائل التواصل الاجتماعي والإعلانات الخاصة بنا ("الخدمات").
                    </p>
                    <p>
                      من خلال الوصول إلى الموقع و/أو الاستعانة بخدماتنا، فإنك توافق على أنك قد قرأت وفهمت ووافقت على الالتزام بجميع شروط الاستخدام هذه. إذا كنت لا توافق على جميع هذه الشروط، فإنك ممنوع صراحة من استخدام الموقع أو الخدمات ويجب عليك التوقف عن الاستخدام فورًا.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Welcome to Vision Arc (“Company,” “we,” “us,” or “our”). These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Vision Arc, concerning your access to and use of our website, as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”), and our social media management and advertising services (the "Services").
                    </p>
                    <p>
                      By accessing the Site and/or engaging our Services, you agree that you have read, understood, and agreed to be bound by all of these Terms of Use. If you do not agree with all of these terms, then you are expressly prohibited from using the Site or Services and you must discontinue use immediately.
                    </p>
                  </>
                )}
              </div>

              {/* Section 1 */}
              <article id="intellectual-property" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "١. حقوق الملكية الفكرية" : "1. Intellectual Property Rights"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "ما لم يُذكر خلاف ذلك، فإن الموقع والخدمات، بما في ذلك الكود المصدري وقواعد البيانات والوظائف والبرمجيات وتصميمات مواقع الويب والصوت والفيديو والنصوص والصور والرسومات الموجودة على الموقع (إجمالاً، \"المحتوى\") والعلامات التجارية وعلامات الخدمة والشعارات الواردة فيه (\"العلامات\") هي مملوكة لنا أو خاضعة لسيطرتنا أو مرخصة لنا، ومحمية بموجب قوانين حقوق النشر والعلامات التجارية."
                      : "Unless otherwise indicated, the Site and Services, including source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws."}
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-2 text-start">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "أصولنا" : "Our Assets"}
                      </h3>
                      <p className="text-start">
                        {language === "ar"
                          ? "يتم تقديم المحتوى والعلامات على الموقع \"كما هي\" لمعلوماتك واستخدامك الشخصي فقط. لا يجوز نسخ أي جزء من الموقع أو المحتوى أو إعادة إنتاجه أو تجميعه أو إعادة نشره أو استغلاله لأي غرض تجاري على الإطلاق دون إذن كتابي صريح ومسبق منا."
                          : "The Content and Marks are provided on the Site “AS IS” for your information and personal use only. No part of the Site or Content may be copied, reproduced, aggregated, republished, or exploited for any commercial purpose whatsoever without our express prior written permission."}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "أصول العميل" : "Client Assets"}
                      </h3>
                      <p className="text-start">
                        {language === "ar"
                          ? "تظل أي أصول للعلامة التجارية والشعارات والمواد التي تقدمها إلى Vision Arc لإنشاء محتوى وسائل التواصل الاجتماعي ملكًا حصريًا لك. من خلال تعييننا، فإنك تمنحنا ترخيصًا غير حصري، وعالمي، وخالي من حقوق الملكية لاستخدام وتعديل وعرض هذه الأصول فقط لتنفيذ حملاتك التسويقية."
                          : "Any brand assets, logos, and materials you provide to Vision Arc for social media content creation remain your exclusive property. By hiring us, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and display these assets solely for the execution of your marketing campaigns."}
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 2 */}
              <article id="user-representations" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٢. إقرارات المستخدم" : "2. User Representations"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "باستخدام الموقع أو الاشتراك في خدماتنا، فإنك تقر وتضمن ما يلي:"
                      : "By using the Site or subscribing to our Services, you represent and warrant that:"}
                  </p>
                  <ul className="list-none flex flex-col gap-3.5 ps-2 mt-2 text-start">
                    {(language === "ar" ? [
                      "أن تكون جميع معلومات التسجيل والتهيئة التي تقدمها صحيحة ودقيقة وحالية وكاملة.",
                      "ستحافظ على دقة هذه المعلومات وتحديثها على الفور عند الضرورة.",
                      "لديك الأهلية القانونية وتوافق على الالتزام بشروط الاستخدام هذه.",
                      "أنت لست قاصرًا في الولاية القضائية التي تقيم فيها.",
                      "لن تتمكن من الوصول إلى الموقع من خلال وسائل مؤتمتة أو غير بشرية، سواء من خلال برنامج روبوت (bot) أو نص برمجى (script) أو غير ذلك.",
                      "لن يمثل استخدامك لخدماتنا انتهاكاً لأي قانون أو لائحة معيارية معمول بها."
                    ] : [
                      "All registration and onboarding information you submit will be true, accurate, current, and complete.",
                      "You will maintain the accuracy of such information and promptly update it as necessary.",
                      "You have the legal capacity and you agree to comply with these Terms of Use.",
                      "You are not a minor in the jurisdiction in which you reside.",
                      "You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.",
                      "Your use of our Services will not violate any applicable law or regulation."
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
              <article id="service-scope" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٣. نطاق الخدمة والموافقات" : "3. Service Scope & Approvals"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "بالنسبة للعملاء الذين يستعينون بـ Vision Arc لخدمات إدارة وسائل التواصل الاجتماعي والإعلانات:"
                      : "For clients engaging Vision Arc for Social Media Management and Advertising Services:"}
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-2 text-start">
                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "الموافقات على المحتوى" : "Content Approvals"}
                      </strong>
                      {language === "ar"
                        ? "سنقوم بتقديم جداول المحتوى وتصميمات الإعلانات لمراجعتها. إذا لم يتم تلقي أي ملاحظات أو رفض خلال الإطار الزمن المعتاد قبل تاريخ النشر المحدد، فسيتم اعتبار المحتوى معتمدًا ومجدولاً للنشر."
                        : "We will submit content calendars and ad designs for your review. If no feedback or rejection is received within the agreed-upon timeframe prior to the scheduled post date, the content will be deemed approved and scheduled for publication."}
                    </p>

                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "الامتثال للمنصات" : "Platform Compliance"}
                      </strong>
                      {language === "ar"
                        ? "نحن ندير الحملات بما يتوافق تمامًا مع شروط وإرشادات منصات الطرف الثالث (مثل Meta وTikTok وGoogle). لا تعد Vision Arc مسؤولة أو خاضعة للمساءلة عن أي قيود على الحساب، أو رفض الإعلانات، أو تعليق الصفحات المفروضة من قبل هذه الشبكات الخارجية."
                        : "We manage campaigns in strict accordance with the terms and guidelines of third-party platforms (e.g., Meta, TikTok, Google). Vision Arc is not responsible or liable for any account restrictions, ad rejections, or page suspensions imposed by these external networks."}
                    </p>
                  </div>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 4 */}
              <article id="fees-payment" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٤. الرسوم والدفع والميزانيات الإعلانية" : "4. Fees, Payment, & Ad Spend"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <div className="flex flex-col gap-4 mt-2 text-start">
                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "الرسوم الشهرية" : "Retainer Fees"}
                      </strong>
                      {language === "ar"
                        ? "تمثل جميع خطط الخدمة رسوم إدارة وكالة Vision Arc ويتم فوترتها على أساس شهري متكرر، وتكون مستحقة الدفع مقدمًا قبل بدء شهر الخدمة."
                        : "All service plans represent Vision Arc’s agency management fees and are billed on a recurring monthly retainer basis, payable in advance of the service month."}
                    </p>

                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "ميزانيات الإعلانات منفصلة" : "Ad Budgets Separate"}
                      </strong>
                      {language === "ar"
                        ? "أنت تقر صراحةً بأن جميع ميزانيات الإعلانات (الإنفاق الإعلاني) تدفعها أنت مباشرةً إلى منصات الإعلانات المعنية (مثل Meta Ads Manager) وهي منفصلة تمامًا عن رسوم إدارة Vision Arc."
                        : "You explicitly acknowledge that all advertising budgets (ad spend) are paid directly by you to the respective advertising platforms (e.g., Meta Ads Manager) and are entirely separate from Vision Arc's management fees."}
                    </p>

                    <p className="text-start">
                      <strong className="text-sm font-sans uppercase tracking-wider block mb-1 text-start" style={{ color: "var(--va-ink)" }}>
                        {language === "ar" ? "لا توجد مستردات" : "No Refunds"}
                      </strong>
                      {language === "ar"
                        ? "نظراً للطبيعة الرقمية والمكثفة لخدمات التسويق، فإن جميع المدفوعات المقدمة لـ Vision Arc مقابل الخدمات الشهرية المكتملة أو الجارية غير قابلة للاسترداد."
                        : "Due to the digital and time-intensive nature of marketing services, all payments made to Vision Arc for completed or in-progress monthly services are non-refundable."}
                    </p>
                  </div>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 5 */}
              <article id="prohibited-activities" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٥. الأنشطة المحظورة" : "5. Prohibited Activities"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "لا يجوز لك الوصول إلى الموقع أو استخدامه لأي غرض آخر غير الذي نجعل الموقع متاحًا من أجله. لا يجوز استخدام الموقع في أي مساعٍ تجارية باستثناء تلك المعتمدة أو المقرة صراحة من قبلنا."
                      : "You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us."}
                  </p>
                  <p className="text-start">
                    {language === "ar"
                      ? "بصفتك مستخدمًا لهذا الموقع، فإنك توافق على عدم القيام بما يلي:"
                      : "As a user of this Site, you agree not to:"}
                  </p>
                  <ul className="list-none flex flex-col gap-3.5 ps-2 mt-2 text-start">
                    {(language === "ar" ? [
                      "استرداد البيانات أو المحتويات الأخرى بشكل منهجي من الموقع لإنشاء أو تجميع، بشكل مباشر أو غير مباشر، مجموعة أو مصنف أو قاعدة بيانات أو دليل دون إذن كتابي منا.",
                      "خداعنا أو تضليلنا أو الاحتيال علينا وعلى المستخدمين الآخرين، خاصة في أي محاولة لمعرفة معلومات الحساب الحساسة مثل كلمات مرور المستخدمين.",
                      "التحايل على الميزات المتعلقة بالأمان في الموقع أو تعطيلها أو التدخل فيها بأي شكل آخر.",
                      "استخدام الموقع أو علامتنا التجارية بطريقة تتعارض مع أي قوانين أو لوائح معمول بها."
                    ] : [
                      "Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
                      "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.",
                      "Circumvent, disable, or otherwise interfere with security-related features of the Site.",
                      "Use the Site or our branding in a manner inconsistent with any applicable laws or regulations."
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

              {/* Section 6 */}
              <article id="limitation-liability" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٦. تحديد المسؤولية" : "6. Limitation of Liability"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "لا نتحمل نحن ولا مدرائنا أو موظفينا أو وكلائنا في أي حال من الأحوال المسؤولية تجاهك أو تجاه أي طرف ثالث عن أي أضرار مباشرة أو غير مباشرة أو تبعية أو تحذيرية أو عرضية أو خاصة أو عقابية، بما في ذلك خسارة الأرباح أو خسارة الإيرادات، أو فقدان البيانات، أو الأضرار الأخرى الناشئة عن استخدامك للموقع أو خدماتنا التسويقية، حتى لو تم إخطارنا بإمكانية حدوث مثل هذه الأضرار."
                      : "In no event will Vision Arc or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site or our marketing Services, even if we have been advised of the possibility of such damages."}
                  </p>
                  <p className="text-start">
                    {language === "ar"
                      ? "بينما نستخدم استراتيجيات مهنية وقائمة على البيانات، فإن Vision Arc لا تضمن أحجام مبيعات محددة، أو أعداد متابعين، أو عائدًا دقيقًا على الإنفاق الإعلاني (ROAS)، حيث أن ظروف السوق وتحديثات الخوارزميات وسلوك المستهلك هي أمور خارجة عن سيطرتنا المباشرة."
                      : "While we employ professional, data-driven strategies, Vision Arc does not guarantee specific sales volumes, follower counts, or exact Return on Ad Spend (ROAS), as market conditions, algorithm updates, and consumer behavior are beyond our direct control."}
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 7 */}
              <article id="governing-law" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٧. القانون الحاكم" : "7. Governing Law"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "تخضع شروط الاستخدام هذه واستخدامك للموقع والخدمات وتفسر وفقًا للقوانين المحلية السارية في الولاية القضائية التي تعمل فيها Vision Arc، دون النظر إلى مبادئ تنازع القوانين."
                      : "These Terms of Use and your use of the Site and Services are governed by and construed in accordance with the local laws applicable to the jurisdiction where Vision Arc operates, without regard to its conflict of law principles."}
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 8 */}
              <article id="modifications-interruptions" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٨. التعديلات والانقطاعات" : "8. Modifications and Interruptions"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "نحتفظ بالحق في تغيير محتويات الموقع أو تعديلها أو إزالتها في أي وقت أو لأي سبب وفقًا لتقديرنا الخاص ودون إشعار مسبق. ونحتفظ أيضًا بالحق في تعديل الخدمات أو إيقافها كليًا أو جزئيًا دون إشعار في أي وقت. لن نكون مسؤولين تجاهك أو تجاه أي طرف ثالث عن أي تعديل أو تغيير في الأسعار أو تعليق أو إيقاف للموقع أو الخدمات."
                      : "We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of our Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site or Services."}
                  </p>
                </div>
              </article>

              <hr className="border-va-rule" />

              {/* Section 9 */}
              <article id="contact-us" className="scroll-mt-28 flex flex-col gap-5 text-start">
                <h2 className="text-2xl font-serif font-semibold text-start" style={{ color: "var(--va-ink)" }}>
                  {language === "ar" ? "٩. اتصل بنا" : "9. Contact Us"}
                </h2>
                <div className="font-sans text-base leading-relaxed flex flex-col gap-4 text-start" style={{ color: "var(--va-ink-muted)" }}>
                  <p className="text-start">
                    {language === "ar"
                      ? "من أجل حل شكوى تتعلق بالموقع أو الخدمات، أو للحصول على مزيد من المعلومات المتعلقة باستخدام الموقع، يرجى الاتصال بـ Vision Arc على:"
                      : "In order to resolve a complaint regarding the Site or Services, or to receive further information regarding use of the Site, please contact Vision Arc at:"}
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
                      <span className="text-start" style={{ color: "var(--va-ink)", direction: "ltr", display: "inline-block" }}>+20 10 94366342</span>
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
