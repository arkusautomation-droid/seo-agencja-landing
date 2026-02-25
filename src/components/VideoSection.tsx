"use client";

export default function VideoSection() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 32 }}>
      <div className="container reveal" style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          style={{
            width: "100%",
            borderRadius: 20,
            border: "1px solid rgba(155,98,255,0.20)",
            boxShadow: "0 0 60px rgba(155,98,255,0.12), 0 8px 32px rgba(0,0,0,0.4)",
            display: "block",
          }}
        >
          <source src="/video/avatar-ada-seo.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
