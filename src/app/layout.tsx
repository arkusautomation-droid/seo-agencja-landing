import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AD Awards — Oferta SEO 2026",
  description:
    "Profesjonalne SEO, które przynosi klientów, nie raporty. Mierzalne efekty, bezterminowa umowa, 1-miesięczne wypowiedzenie.",
  openGraph: {
    title: "AD Awards — Oferta SEO 2026",
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
        className={`${poppins.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
