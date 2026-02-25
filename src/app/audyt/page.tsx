import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ScrollReveal from "@/components/ScrollReveal";
import AuditTool from "@/components/AuditTool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bezpłatny audyt SEO — AD Awards",
  description: "Wpisz adres swojej strony — przeanalizujemy ją w kilka sekund i pokażemy co poprawić.",
};

export default function AuditPage() {
  return (
    <>
      <NetworkBackground />
      <div className="bg-noise" />
      <Topbar />
      <main style={{ paddingTop: 80 }}>
        <AuditTool />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
