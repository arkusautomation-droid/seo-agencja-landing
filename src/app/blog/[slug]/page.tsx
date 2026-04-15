import { articles, getCoverUrl } from "@/data/articles";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Artykuł nie znaleziony" };
  const coverUrl = getCoverUrl(slug);
  return {
    title: `${article.title} — Blog AD Awards`,
    description: article.lead,
    openGraph: coverUrl ? {
      images: [{ url: `https://mastermarketing.io${coverUrl}`, width: 1200, height: 630 }],
    } : undefined,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <NetworkBackground />
      <div className="bg-noise" />
      <Topbar />
      <main style={{ paddingTop: 80 }}>
        <article style={{ position: "relative", padding: "32px 0 64px" }}>
          <div className="container" style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            {/* Back link */}
            <a
              href="/blog/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "var(--color-text-muted)",
                textDecoration: "none",
                marginBottom: 32,
              }}
            >
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
                <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {"Powrót do bloga"}
            </a>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, fontSize: 13, color: "var(--color-text-muted)" }}>
              <time>{new Date(article.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-text-muted)", flexShrink: 0 }} />
              <span>{article.readingTime} min czytania</span>
            </div>

            {/* Cover image */}
            {getCoverUrl(article.slug) && (
              <div style={{ width: "100%", maxHeight: 400, overflow: "hidden", borderRadius: 12, marginBottom: 32 }}>
                <img
                  src={getCoverUrl(article.slug)}
                  alt={`${article.title} — grafika ilustracyjna`}
                  width={1200}
                  height={630}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Title */}
            <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 32 }}>
              {article.title}
            </h1>

            {/* Content */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
