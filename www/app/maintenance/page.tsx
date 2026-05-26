import type { Metadata } from "next";
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
  title: "Even geduld — Welkom Home",
  description:
    "Onze website is even in onderhoud. We werken aan iets nieuws — binnenkort weer online.",
  robots: { index: false, follow: false },
};

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";

// Editorial maintenance page — Dutch copy, brand palette. Served via
// middleware to every public route while MAINTENANCE_MODE is on.
export default function MaintenancePage() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-6 py-14 lg:py-20"
      style={{ background: CREAM }}
    >
      {/* ─── Decorative corner ornaments ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-12 hidden md:block"
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
        <WhLogo className="h-11 w-auto" fill={INK_WARM} />
        <span
          className="text-base uppercase"
          style={{ letterSpacing: "0.35em", color: INK_WARM }}
        >
          Welkom Home
        </span>
      </header>

      {/* ─── MIDDLE — message ─── */}
      <section className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <div
          aria-hidden
          className="mb-8 flex items-center gap-4"
          style={{ color: CLAY, opacity: 0.6 }}
        >
          <WaveLine width={60} />
          <Sparkle size={11} />
          <WaveLine width={60} reverse />
        </div>

        <p
          className="text-[11px] uppercase"
          style={{ letterSpacing: "0.36em", color: CLAY }}
        >
          Onderhoud
        </p>

        <h1
          className="mt-6 text-5xl leading-[1.02] md:text-6xl lg:text-[5rem]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            color: INK_WARM,
          }}
        >
          Even <Mark>geduld</Mark>,
          <br />
          alstublieft.
        </h1>

        <p
          className="mt-10 max-w-xl text-[17px] leading-[1.7]"
          style={{ color: INK_WARM, opacity: 0.88 }}
        >
          We werken aan iets nieuws. Onze website is even offline en komt
          binnenkort weer terug — mooier dan ooit.
        </p>

        {/* Olive branch separator */}
        <div className="mt-10" style={{ color: CLAY, opacity: 0.6 }}>
          <OliveBranch />
        </div>

        {/* CTA contact */}
        <p className="mt-10 text-[14px]" style={{ color: INK_WARM }}>
          Direct contact opnemen ?
        </p>
        <a
          href="mailto:contact@welkomhome.eu"
          className="mt-4 inline-flex items-center gap-3 border px-8 py-3.5 text-[11px] uppercase text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
          style={{
            borderColor: INK_WARM,
            letterSpacing: "0.32em",
            borderRadius: 2,
          }}
        >
          contact@welkomhome.eu
        </a>

        <div
          className="mt-12 border-t pt-6"
          style={{
            borderColor: "rgba(91, 58, 31, 0.16)",
            color: INK_WARM,
            opacity: 0.75,
          }}
        >
          <p
            className="font-mono text-[11px] uppercase"
            style={{ letterSpacing: "0.34em" }}
          >
            +31&nbsp;6&nbsp;90&nbsp;90&nbsp;90&nbsp;90{" "}
            <span style={{ color: CLAY, opacity: 0.7 }}>· NL</span>
          </p>
        </div>
      </section>

      {/* ─── BOTTOM — signature ─── */}
      <footer
        className="relative z-10 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] uppercase"
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

      {/* Background wordmark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none italic"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          fontSize: "clamp(8rem, 18vw, 22rem)",
          color: CREAM_SOFT,
          opacity: 0.55,
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        Welkom
      </span>
    </main>
  );
}
