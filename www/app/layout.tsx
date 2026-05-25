import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif used for display headings (south-paradise vibe). Italic
// carries the brand voice on highlighted words like “Côte d’Azur”.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Welkom Home — Agence hollandaise sur la Côte d'Azur",
  description:
    "Agence basée à Den Haag, spécialisée dans la location de villas privées sur la Côte d'Azur pour les voyageurs néerlandais et belges. Accueil en français, néerlandais et anglais — devis sous 24h.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-zinc-900" style={{ background: "#f3ecd9" }}>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
