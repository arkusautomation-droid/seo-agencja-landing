export default function VideoSection() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 32 }}>
      {/* Mobile: portrait 9:16 */}
      <div
        className="container reveal md:hidden"
        style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          className="video-avatar"
        >
          <source src="/video/avatar-ada-seo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Desktop: landscape 16:9 */}
      <div
        className="container reveal hidden md:block"
        style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          className="video-avatar"
        >
          <source src="/video/avatar-ada-seo-16x9.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
