import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AD Awards — Oferta SEO + GEO 2026",
  description:
    "Profesjonalne SEO, które przynosi klientów, nie raporty. Mierzalne efekty, bezterminowa umowa, 1-miesięczne wypowiedzenie.",
  openGraph: {
    title: "AD Awards — Oferta SEO + GEO 2026",
    description:
      "SEO, które przynosi klientów, nie raporty. Mierzalne efekty, bezterminowa umowa.",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" style={{ overflowX: "hidden" }}>
      <body className={`${inter.variable} antialiased`} style={{ overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
