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
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Connexion — Welkom Home",
  description:
    "Connecte-toi à ton espace Welkom Home avec un simple lien envoyé par email. Pas de mot de passe.",
};

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; email?: string }>;
}) {
  const { error, email } = await searchParams;

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[1.1fr_1fr]">
      {/* ─── LEFT — editorial panel with photo ─── */}
      <aside
        className="relative hidden overflow-hidden lg:flex lg:min-h-screen lg:flex-col lg:justify-between lg:p-14"
      >
        {/* Edge-to-edge background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/owners-villa.jpg"
          alt="Villa Welkom Home sur la Côte d'Azur"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        {/* Dark scrim so cream text reads on any photo */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,12,5,0.35) 0%, rgba(20,12,5,0.55) 70%, rgba(20,12,5,0.7) 100%)",
          }}
        />

        {/* Top — brand mark + tagline */}
        <header className="flex items-center justify-between">
          <a
            href="/"
            aria-label="Welkom Home — accueil"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <WhLogo className="h-12 w-auto" fill={CREAM} />
            <span
              className="text-base uppercase"
              style={{ letterSpacing: "0.35em", color: CREAM }}
            >
              Welkom Home
            </span>
          </a>
          <span
            aria-hidden
            className="font-mono text-[10px] uppercase opacity-80"
            style={{ letterSpacing: "0.34em", color: CREAM }}
          >
            Den Haag · Riviera
          </span>
        </header>

        {/* Middle — editorial headline */}
        <div className="relative max-w-xl">
          <p
            className="flex items-center gap-3 text-[11px] uppercase"
            style={{ letterSpacing: "0.34em", color: CREAM, opacity: 0.9 }}
          >
            <Sparkle size={10} />
            Connexion
          </p>
          <h1
            className="mt-5 text-4xl leading-[1.05] xl:text-[3.4rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: CREAM,
            }}
          >
            On t&apos;<Mark color="rgba(232, 214, 183, 0.85)">attend</Mark>.
          </h1>
          <p
            className="mt-6 max-w-md text-[15px] leading-[1.7]"
            style={{ color: CREAM, opacity: 0.88 }}
          >
            Reçois un lien magique par email — pas de mot de passe à retenir.
            Valable 15 minutes, usable une seule fois.
          </p>

          <div
            aria-hidden
            className="mt-10 flex items-center gap-4"
            style={{ color: CREAM, opacity: 0.6 }}
          >
            <WaveLine width={70} />
            <Sparkle size={11} />
            <WaveLine width={70} reverse />
          </div>
        </div>

        {/* Bottom — meta */}
        <footer
          className="flex items-center justify-between text-[11px] uppercase"
          style={{ letterSpacing: "0.3em", color: CREAM, opacity: 0.72 }}
        >
          <span>Côte d&apos;Azur · MMXXVI</span>
          <span className="flex items-center gap-2">
            <Diamond size={5} />
            Saint-Tropez → Les Issambres
          </span>
        </footer>

        {/* Decorative corner ornaments */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-10 top-32"
          style={{ color: CREAM, opacity: 0.25 }}
        >
          <PalmFrond />
        </div>
      </aside>

      {/* ─── RIGHT — form panel ─── */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:px-12"
        style={{ background: CREAM }}
      >
        {/* Back arrow — sticky top-left, takes user back to home */}
        <Link
          href="/"
          aria-label="Retour à l'accueil"
          className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 text-[10px] uppercase transition-opacity hover:opacity-70 sm:left-8 sm:top-8 lg:left-12 lg:top-12"
          style={{ color: INK_WARM, letterSpacing: "0.28em" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          <span className="hidden sm:inline">Retour</span>
        </Link>

        {/* Decorative corner ornaments */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-10 sm:right-8 sm:top-12"
          style={{ color: CLAY, opacity: 0.4 }}
        >
          <SunCompass size={48} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 bottom-0 hidden lg:block"
          style={{ color: CLAY, opacity: 0.3 }}
        >
          <ArcMark size={140} />
        </div>

        <div className="relative w-full max-w-md">
          {/* Mobile-only brand mark */}
          <div className="mb-12 flex items-center gap-3 lg:hidden">
            <WhLogo className="h-10 w-auto" fill={INK_WARM} />
            <span
              className="text-sm uppercase"
              style={{ letterSpacing: "0.35em", color: INK_WARM }}
            >
              Welkom Home
            </span>
          </div>

          <p
            className="flex items-center gap-3 text-[11px] uppercase"
            style={{ letterSpacing: "0.34em", color: CLAY }}
          >
            <Sparkle size={10} />
            Bienvenue
          </p>
          <h2
            className="mt-5 text-4xl leading-[1.05] md:text-5xl"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: INK_WARM,
            }}
          >
            Reçois ton lien <Mark>magique</Mark>.
          </h2>
          <p className="mt-5 text-[14px] leading-[1.65] text-zinc-700">
            Saisis ton email — on t&apos;envoie un lien de connexion à usage
            unique, valable 15 minutes. Aucun mot de passe à retenir.
          </p>

          {error && (
            <div
              className="mt-7 flex items-start gap-3 border px-4 py-3 text-sm"
              style={{
                background: "#fbe8e7",
                borderColor: "#f0b8b3",
                color: "#7a2419",
                borderRadius: 2,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8">
            <LoginForm defaultEmail={email ?? ""} />
          </div>

          {/* Olive branch separator */}
          <div
            aria-hidden
            className="mt-12"
            style={{ color: CLAY, opacity: 0.5 }}
          >
            <OliveBranch />
          </div>

          <p
            className="mt-6 text-[12px] leading-[1.6] italic"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              color: INK_WARM,
              opacity: 0.8,
            }}
          >
            « Votre confiance, nous savons la mériter. »
          </p>

          <div
            className="mt-10 border-t pt-6 text-[11px] leading-[1.55] text-zinc-600"
            style={{ borderColor: HAIRLINE }}
          >
            Pas encore de compte&nbsp;? Écris-nous à{" "}
            <a
              href="mailto:contact@welkomhome.eu"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: INK_WARM }}
            >
              contact@welkomhome.eu
            </a>
            {" "}— on revient sous 24h.
          </div>
        </div>
      </section>
    </main>
  );
}
