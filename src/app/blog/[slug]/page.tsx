"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/data/blog";
import { blogPostsAr } from "@/lib/data/blog_ar";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();

  const postsList = language === "ar" ? blogPostsAr : blogPosts;
  const post = postsList.find((p) => p.slug === slug);

  // Prev / Next post navigation calculations
  const currentIndex = postsList.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? postsList[currentIndex - 1] : null;
  const nextPost = currentIndex < postsList.length - 1 ? postsList[currentIndex + 1] : null;

  if (!post) {
    notFound();
  }

  // Schema Markup (JSON-LD) for Google Rich Snippets
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://visionarc.agency${post.image}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "VisionArc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://visionarc.agency/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://visionarc.agency/blog/${post.slug}`
    }
  };

  return (
    <>
      <title>{`${post.title} | VisionArc Blog`}</title>
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={post.keywords.join(", ")} />
      
      {/* OpenGraph */}
      <meta property="og:title" content={`${post.title} | VisionArc`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.image} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://visionarc.agency/blog/${post.slug}`} />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={post.author.name} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${post.title} | VisionArc`} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={post.image} />
      
      {/* Structured Data */}
      <Script
        id={`schema-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <Nav />

      {/* Sticky Back Button */}
      <div
        className={`fixed z-30 transition-all duration-300 bottom-6 lg:bottom-auto lg:top-32 ${
          language === "ar"
            ? "right-6 lg:right-8 xl:right-16"
            : "left-6 lg:left-8 xl:left-16"
        }`}
      >
        <Link
          href="/blog"
          className="flex items-center justify-center w-12 h-12 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[var(--va-accent)] hover:text-[var(--va-accent)] cursor-pointer group"
          style={{
            borderColor: "var(--va-rule)",
            background: "color-mix(in srgb, var(--va-paper) 85%, transparent)",
            color: "var(--va-ink)",
          }}
          aria-label={t("blog.back")}
          title={t("blog.back")}
        >
          {language === "ar" ? (
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          )}
        </Link>
      </div>

      <main className="w-full pt-32 pb-24 relative z-10">
        {/* Back navigation & Header */}
        <section className="max-w-[900px] mx-auto px-6 md:px-8 mb-12 text-start">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium mb-10 transition-colors hover:text-[var(--va-accent)] cursor-pointer"
            style={{ color: "var(--va-ink-muted)" }}
          >
            {language === "ar" ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {t("blog.back")}
          </Link>

          <p
            className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4 text-start"
            style={{ color: "var(--va-accent)" }}
          >
            {post.category}
          </p>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl leading-[1.15] mb-8 text-start"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              color: "var(--va-ink)",
              letterSpacing: language === "ar" ? "0" : "-0.015em",
            }}
          >
            {post.title}
          </h1>

          {/* Author metadata panel */}
          <div
            className="flex flex-wrap items-center justify-between gap-6 py-6 border-y text-start"
            style={{ borderColor: "var(--va-rule)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800 flex items-center justify-center text-sm font-serif text-white">
                {post.author.name.charAt(0)}
              </div>
              <div className="text-start">
                <p className="text-xs font-sans" style={{ color: "var(--va-ink-muted)" }}>
                  {t("blog.author")}
                </p>
                <p className="text-sm font-sans font-semibold" style={{ color: "var(--va-ink)" }}>
                  {post.author.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-start">
              <div className="flex flex-col text-start">
                <span className="text-[10px] uppercase tracking-wider font-sans" style={{ color: "var(--va-ink-muted)" }}>
                  {language === "ar" ? "تاريخ النشر" : "Published"}
                </span>
                <div className="flex items-center gap-1.5 text-sm font-medium mt-0.5" style={{ color: "var(--va-ink)" }}>
                  <Calendar size={14} className="opacity-75" />
                  <span>{post.date}</span>
                </div>
              </div>

              <div className="flex flex-col text-start">
                <span className="text-[10px] uppercase tracking-wider font-sans" style={{ color: "var(--va-ink-muted)" }}>
                  {language === "ar" ? "زمن القراءة" : "Read Time"}
                </span>
                <div className="flex items-center gap-1.5 text-sm font-medium mt-0.5" style={{ color: "var(--va-ink)" }}>
                  <Clock size={14} className="opacity-75" />
                  <span>
                    {post.readTime} {language === "ar" ? "دقائق" : t("blog.readTime")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Banner Image */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 mb-16">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative aspect-[21/9]" style={{ background: "var(--va-ink)" }}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover opacity-90 block"
            />
          </div>
        </section>

        {/* Article Body Content */}
        <section className="max-w-[760px] mx-auto px-6 md:px-8 text-start">
          <div className="flex flex-col gap-6 font-sans text-[17px] leading-[1.75] text-start">
            {post.content.map((block, idx) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p
                      key={idx}
                      className="text-start"
                      style={{ color: "var(--va-ink-muted)" }}
                    >
                      {block.text}
                    </p>
                  );
                case "heading":
                  if (block.level === 3) {
                    return (
                      <h3
                        key={idx}
                        className="text-2xl mt-8 mb-2 font-serif font-semibold text-start"
                        style={{ color: "var(--va-ink)" }}
                      >
                        {block.text}
                      </h3>
                    );
                  }
                  return (
                    <h2
                      key={idx}
                      className="text-3xl mt-12 mb-4 font-serif font-semibold text-start"
                      style={{ color: "var(--va-ink)" }}
                    >
                      {block.text}
                    </h2>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={idx}
                      className={`my-10 pl-6 border-l-4 pr-6 ${language === "ar" ? "border-r-4 border-l-0" : ""}`}
                      style={{ borderColor: "var(--va-accent)" }}
                    >
                      <p
                        className="font-serif italic text-xl mb-3 text-start"
                        style={{ color: "var(--va-ink)" }}
                      >
                        “{block.text}”
                      </p>
                      {block.author && (
                        <cite
                          className="not-italic text-sm font-sans font-semibold tracking-wide uppercase text-start block"
                          style={{ color: "var(--va-ink-muted)" }}
                        >
                          — {block.author}
                        </cite>
                      )}
                    </blockquote>
                  );
                case "list":
                  return (
                    <ul key={idx} className="list-none flex flex-col gap-3 my-4 text-start">
                      {block.items?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-start">
                          <span
                            className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "var(--va-accent)" }}
                          />
                          <span style={{ color: "var(--va-ink-muted)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Previous / Next Article Navigation */}
          {(prevPost || nextPost) && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-20 pt-10 border-t"
              style={{ borderColor: "var(--va-rule)" }}
            >
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="flex flex-col gap-2 p-5 rounded-lg border hover:border-[var(--va-accent)] transition-all duration-300 group cursor-pointer text-start justify-between"
                  style={{ borderColor: "var(--va-rule)", background: "var(--va-paper)" }}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-sans" style={{ color: "var(--va-ink-muted)" }}>
                      {language === "ar" ? "المقال السابق ←" : "← Previous Article"}
                    </span>
                    <h4 className="font-serif text-base leading-snug mt-1.5 group-hover:underline" style={{ color: "var(--va-ink)", fontWeight: 500 }}>
                      {prevPost.title}
                    </h4>
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex flex-col gap-2 p-5 rounded-lg border hover:border-[var(--va-accent)] transition-all duration-300 group cursor-pointer text-end justify-between"
                  style={{ borderColor: "var(--va-rule)", background: "var(--va-paper)" }}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-sans" style={{ color: "var(--va-ink-muted)" }}>
                      {language === "ar" ? "← المقال التالي" : "Next Article →"}
                    </span>
                    <h4 className="font-serif text-base leading-snug mt-1.5 group-hover:underline" style={{ color: "var(--va-ink)", fontWeight: 500 }}>
                      {nextPost.title}
                    </h4>
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
