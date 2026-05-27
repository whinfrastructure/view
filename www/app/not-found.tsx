import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/mark";
import {
  ArcMark,
  Diamond,
  OliveBranch,
  PalmFrond,
  Sparkle,
  SunCompass,
  WaveLine,
} from "@/components/ornaments";
import { WhLogo } from "@/components/wh-logo";

export const metadata: Metadata = {
  title: "Page introuvable — Welkom Home",
  description:
    "La page que vous cherchez n'existe pas ou a été déplacée. Retrouvez nos villas sur la Côte d'Azur ou écrivez-nous à contact@welkomhome.eu.",
  robots: { index: false, follow: false },
};

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";

export default function NotFoundPage() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-5 py-12 sm:px-6 sm:py-14 lg:py-20"
      style={{ background: CREAM }}
    >
      {/* ─── Decorative corner ornaments ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-10 hidden md:right-8 md:top-12 md:block"
        style={{ color: CLAY, opacity: 0.45 }}
      >
        <SunCompass size={68} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-0 hidden lg:block"
        style={{ color: CLAY, opacity: 0.3 }}
      >
        <PalmFrond />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -bottom-6 hidden lg:block"
        style={{ color: CLAY, opacity: 0.32 }}
      >
        <ArcMark size={160} />
      </div>

      {/* ─── TOP — brand mark ─── */}
      <header className="relative z-10 flex items-center gap-3">
        <Link href="/" aria-label="Welkom Home — accueil" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <WhLogo className="h-10 w-auto md:h-11" fill={INK_WARM} />
          <span
            className="text-sm uppercase md:text-base"
            style={{ letterSpacing: "0.35em", color: INK_WARM }}
          >
            Welkom Home
          </span>
        </Link>
      </header>

      {/* ─── MIDDLE — message ─── */}
      <section className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <div
          aria-hidden
          className="mb-7 flex items-center gap-4 sm:mb-8"
          style={{ color: CLAY, opacity: 0.6 }}
        >
          <WaveLine width={60} />
          <Sparkle size={11} />
          <WaveLine width={60} reverse />
        </div>

        <p
          className="font-mono text-[11px] uppercase"
          style={{ letterSpacing: "0.36em", color: CLAY }}
        >
          Erreur · 404
        </p>

        <h1
          className="mt-5 text-[3rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[5rem]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            color: INK_WARM,
          }}
        >
          Cette villa s&apos;est <Mark>évaporée</Mark>,
          <br />
          comme un mirage.
        </h1>

        <p
          className="mt-8 max-w-xl text-[15px] leading-[1.7] sm:mt-10 sm:text-[17px]"
          style={{ color: INK_WARM, opacity: 0.88 }}
        >
          La page que vous cherchez n&apos;existe pas — peut-être déplacée,
          peut-être jamais publiée. Reprenons depuis le rivage&nbsp;:
        </p>

        {/* Olive branch separator */}
        <div className="mt-8 sm:mt-10" style={{ color: CLAY, opacity: 0.6 }}>
          <OliveBranch />
        </div>

        {/* CTA pair */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] uppercase transition-opacity hover:opacity-90 sm:px-9 sm:py-4"
            style={{
              background: "#3a2415",
              color: CREAM,
              letterSpacing: "0.32em",
              borderRadius: 2,
            }}
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/listing"
            className="inline-flex items-center gap-3 border px-7 py-3.5 text-[11px] uppercase text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9] sm:px-9 sm:py-4"
            style={{
              borderColor: INK_WARM,
              letterSpacing: "0.32em",
              borderRadius: 2,
            }}
          >
            Voir les villas
          </Link>
        </div>

        <div
          className="mt-10 border-t pt-6 sm:mt-12"
          style={{
            borderColor: "rgba(91, 58, 31, 0.16)",
            color: INK_WARM,
            opacity: 0.75,
          }}
        >
          <p className="text-[13px] leading-[1.5] italic" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            Une question, un projet&nbsp;? Écris-nous —
            <br className="sm:hidden" />{" "}
            <a
              href="mailto:contact@welkomhome.eu"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: CLAY, textUnderlineOffset: 3 }}
            >
              contact@welkomhome.eu
            </a>
          </p>
        </div>
      </section>

      {/* ─── BOTTOM — signature ─── */}
      <footer
        className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] uppercase sm:mt-0"
        style={{
          letterSpacing: "0.34em",
          color: CLAY,
          opacity: 0.75,
        }}
      >
        <span>Welkom Home</span>
        <Diamond size={5} />
        <span>Den Haag</span>
        <Diamond size={5} />
        <span>Côte d&apos;Azur</span>
        <Diamond size={5} />
        <span>MMXXVI</span>
      </footer>

      {/* Subtle radial gradient overlay for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(91,58,31,0.06) 100%)",
          zIndex: 0,
        }}
      />

      {/* Background wordmark — gigantic 404 */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none italic"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(10rem, 32vw, 28rem)",
          color: CREAM_SOFT,
          opacity: 0.55,
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        404
      </span>
    </main>
  );
}
