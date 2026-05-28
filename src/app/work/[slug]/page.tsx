import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { Nav } from "@/components/human/Nav";
import { Footer } from "@/components/human/Footer";

// Generate static params so the pages are built statically during build time
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="w-full pt-32 pb-24 relative z-10">
        {/* Header Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium mb-12 transition-colors hover:text-[var(--va-accent)]"
            style={{ color: "var(--va-ink-muted)" }}
          >
            <ArrowLeft size={16} /> Back to Work
          </Link>

          <p
            className="text-xs tracking-[0.35em] uppercase font-sans font-bold mb-6"
            style={{ color: "var(--va-accent)" }}
          >
            {project.category}
          </p>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-12 max-w-4xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              color: "var(--va-ink)",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y" style={{ borderColor: "var(--va-rule)" }}>
            <div>
              <p className="text-sm font-sans font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--va-ink-muted)" }}>Client</p>
              <p className="font-serif text-xl" style={{ color: "var(--va-ink)" }}>{project.client}</p>
            </div>
            <div>
              <p className="text-sm font-sans font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--va-ink-muted)" }}>Year</p>
              <p className="font-serif text-xl" style={{ color: "var(--va-ink)" }}>{project.year}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-sans font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--va-ink-muted)" }}>Role</p>
              <p className="font-serif text-xl" style={{ color: "var(--va-ink)" }}>{project.role}</p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-24">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: "var(--va-ink)" }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto opacity-90 block"
            />
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-[1000px] mx-auto px-6 md:px-10 mb-32 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-serif mb-6" style={{ color: "var(--va-ink)" }}>The Challenge</h2>
            <p className="font-sans text-lg leading-relaxed" style={{ color: "var(--va-ink-muted)" }}>{project.challenge}</p>
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-6" style={{ color: "var(--va-ink)" }}>Our Solution</h2>
            <p className="font-sans text-lg leading-relaxed font-medium" style={{ color: "var(--va-ink)" }}>{project.solution}</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 grid gap-8">
          {project.gallery.map((img, idx) => (
            <div key={idx} className="w-full rounded-2xl overflow-hidden shadow-2xl">
               <img
                 src={img}
                 alt={`${project.title} gallery image ${idx}`}
                 className="w-full h-auto block"
               />
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
