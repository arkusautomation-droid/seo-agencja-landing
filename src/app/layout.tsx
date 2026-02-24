import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdAwards — Oferta SEO 2026",
  description:
    "Profesjonalne SEO, które przynosi klientów, nie raporty. Mierzalne efekty, bezterminowa umowa, 1-miesięczne wypowiedzenie.",
  openGraph: {
    title: "AdAwards — Oferta SEO 2026",
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
    <html lang="pl">
      <body
        className={`${dmSans.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
