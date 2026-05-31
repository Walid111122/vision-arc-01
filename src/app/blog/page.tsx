"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";
import { blogPosts } from "@/lib/data/blog";
import { blogPostsAr } from "@/lib/data/blog_ar";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";
import { Calendar, Clock, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const spring = { type: "spring", stiffness: 200, damping: 24 } as const;

export default function BlogListingPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const POSTS_PER_PAGE = 3;

  const posts = language === "ar" ? blogPostsAr : blogPosts;

  // Extract unique categories dynamically
  const categories = ["all", ...Array.from(new Set(posts.map((post) => post.category)))];

  // Filter posts based on selection
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      <title>{language === "ar" ? "المدونة | VisionArc" : "Blog | VisionArc"}</title>
      <meta
        name="description"
        content={
          language === "ar"
            ? "استكشف أحدث مقالات وأفكار فريقنا المتخصص في التصميم الفاخر، تطوير الويب المخصص، وإدارة الإعلانات."
            : "Explore the latest insights and thoughts from our team on luxury brand design, custom web development, and digital media buying."
        }
      />
      <meta
        name="keywords"
        content="blog, digital agency insights, custom web development, luxury branding, facebook advertising, ROI optimization"
      />
      <meta property="og:title" content={language === "ar" ? "المدونة | VisionArc" : "Blog | VisionArc"} />
      <meta
        property="og:description"
        content={
          language === "ar"
            ? "استكشف أحدث مقالات وأفكار فريقنا المتخصص في التصميم الفاخر، تطوير الويب المخصص، وإدارة الإعلانات."
            : "Explore the latest insights and thoughts from our team."
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://visionarc.agency/blog" />

      <Nav />
      
      <main className="w-full pt-32 pb-24 relative z-10">
        {/* Hero Header Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16 text-start">
          <p
            className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-4 text-start"
            style={{ color: "var(--va-accent)" }}
          >
            {t("blog.tag")}
          </p>
          
          <h1
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl text-start"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              color: "var(--va-ink)",
              letterSpacing: language === "ar" ? "0" : "-0.02em",
            }}
          >
            {t("blog.title")}{" "}
            <em className="text-editorial text-gradient-neon" style={{ fontStyle: "italic" }}>
              {t("blog.title.italic")}
            </em>
          </h1>
          
          <p
            className="font-sans text-base md:text-lg max-w-2xl leading-relaxed text-start"
            style={{ color: "var(--va-ink-muted)" }}
          >
            {t("blog.desc")}
          </p>
        </section>

        {/* Category Filters */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12 flex flex-wrap gap-2 text-start">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const categoryLabel =
              category === "all"
                ? t("blog.category.all")
                : category;

            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 text-xs font-sans font-medium uppercase tracking-wider rounded-full border transition-all duration-300 relative overflow-hidden cursor-pointer"
                style={{
                  borderColor: isSelected ? "var(--va-accent)" : "var(--va-rule)",
                  color: isSelected ? "var(--va-paper)" : "var(--va-ink-muted)",
                  background: isSelected ? "var(--va-accent)" : "transparent",
                }}
              >
                <span className="relative z-10">{categoryLabel}</span>
              </button>
            );
          })}
        </section>

        {/* Blog Post Grid */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {paginatedPosts.map((post) => (
                <motion.article
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={spring}
                  className="surface-card flex flex-col rounded-xl overflow-hidden border group"
                  style={{
                    borderColor: "var(--va-rule)",
                    background: "var(--va-paper)",
                  }}
                >
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-video cursor-pointer">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  <div className="p-6 flex flex-col flex-1 text-start">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs uppercase tracking-wider font-sans font-semibold"
                        style={{ color: "var(--va-accent)" }}
                      >
                        {post.category}
                      </span>
                      
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--va-ink-muted)" }}>
                        <Clock size={12} />
                        <span>
                          {post.readTime} {language === "ar" ? "دقائق" : t("blog.readTime")}
                        </span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="cursor-pointer group-hover:text-[var(--va-accent)] transition-colors">
                      <h2
                        className="text-xl mb-3 font-serif leading-snug group-hover:underline underline-offset-4 decoration-1 decoration-neutral-400"
                        style={{ color: "var(--va-ink)", fontWeight: 500 }}
                      >
                        {post.title}
                      </h2>
                    </Link>

                    <p
                      className="text-sm font-sans leading-relaxed mb-6 flex-1 text-start"
                      style={{ color: "var(--va-ink-muted)" }}
                    >
                      {post.excerpt}
                    </p>

                    <div
                      className="flex items-center justify-between pt-4 border-t"
                      style={{ borderColor: "var(--va-rule)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800 flex items-center justify-center text-xs font-serif text-white">
                          {post.author.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-sans font-semibold" style={{ color: "var(--va-ink)" }}>
                            {post.author.name}
                          </p>
                          <p className="text-[10px] font-sans" style={{ color: "var(--va-ink-muted)" }}>
                            {post.author.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs" style={{ color: "var(--va-ink-muted)" }}>
                        <Calendar size={12} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-16 flex justify-center items-center gap-3">
            {/* Previous Page Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-full border transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center hover:border-[var(--va-accent)] hover:text-[var(--va-accent)]"
              style={{
                borderColor: "var(--va-rule)",
                color: "var(--va-ink)",
              }}
              aria-label="Previous page"
            >
              {language === "ar" ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10 h-10 rounded-full border text-sm font-sans font-medium transition-all duration-300 cursor-pointer flex items-center justify-center hover:border-[var(--va-accent)]"
                    style={{
                      borderColor: isCurrent ? "var(--va-accent)" : "var(--va-rule)",
                      background: isCurrent ? "var(--va-accent)" : "transparent",
                      color: isCurrent ? "var(--va-paper)" : "var(--va-ink-muted)",
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-full border transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center hover:border-[var(--va-accent)] hover:text-[var(--va-accent)]"
              style={{
                borderColor: "var(--va-rule)",
                color: "var(--va-ink)",
              }}
              aria-label="Next page"
            >
              {language === "ar" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
