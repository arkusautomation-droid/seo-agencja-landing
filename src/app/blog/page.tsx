import { articles, getCoverUrl } from "@/data/articles";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog SEO + GEO — AD Awards",
  description: "Nowoczesne SEO, AI i widoczność w wyszukiwarkach. Artykuły eksperckie od AD Awards.",
};

export default function BlogPage() {
  return (
    <>
      <NetworkBackground />
      <div className="bg-noise" />
      <Topbar />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ position: "relative", padding: "48px 0 32px", textAlign: "center" }}>
          <div className="container reveal">
            <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: "auto", marginRight: "auto", marginBottom: 24 }}>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="currentColor" />
              </svg>
              Blog
            </div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 12 }}>
              {"Blog "}
              <span className="text-gradient">{"SEO + GEO"}</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--color-text-dim)", lineHeight: 1.6, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
              {"Nowoczesne SEO, AI i widoczność w wyszukiwarkach"}
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section style={{ position: "relative", padding: "0 0 64px" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap: 24 }}>
              {articles.map((article) => (
                <a
                  key={article.slug}
                  href={`/blog/${article.slug}/`}
                  className="glass-card reveal"
                  style={{
                    display: "block",
                    padding: 0,
                    borderRadius: 16,
                    textDecoration: "none",
                    color: "inherit",
                    overflow: "hidden",
                  }}
                >
                  {getCoverUrl(article.slug) && (
                    <div style={{ width: "100%", height: 200, overflow: "hidden" }}>
                      <img
                        src={getCoverUrl(article.slug)}
                        alt={`${article.title} — grafika ilustracyjna`}
                        width={1200}
                        height={630}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "24px 28px 32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, fontSize: 13, color: "var(--color-text-muted)" }}>
                    <time>{new Date(article.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}</time>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-text-muted)", flexShrink: 0 }} />
                    <span>{article.readingTime} min czytania</span>
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 12, color: "var(--color-text)" }}>
                    {article.title}
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-text-dim)", marginBottom: 20 }}>
                    {article.lead}
                  </p>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-accent-light)" }}>
                    {"Czytaj więcej →"}
                  </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
