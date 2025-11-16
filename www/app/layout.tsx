import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Mea_Culpa } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const meaCulpa = Mea_Culpa({
  variable: "--font-mea-culpa",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Beautiful Shader Experiences",
  description: "Create stunning visual experiences with advanced shader technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${meaCulpa.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
