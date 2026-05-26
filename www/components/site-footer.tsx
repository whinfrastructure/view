import Link from "next/link";
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

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const CREAM_DARK = "#dfcb9d";  // sand — used as ornament tone on white variant
const INK_DEEP = "#2a1810";    // very deep cocoa — bottom bar
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE_CREAM = "rgba(91, 58, 31, 0.16)";
const HAIRLINE_WHITE = "rgba(180, 150, 80, 0.22)";

// Editorial 4-column footer with stacked depth:
//   1. Atmospheric radial gradient for warmth
//   2. Oversized Cormorant wordmark behind content (low opacity)
//   3. Scattered SVG ornaments at varying depths
//   4. Main column grid (z-10)
//   5. Dark cocoa "ground" bar at the bottom — gives the page a base
//
// `variant`:
//   "cream" (default) — bg cream, ornaments clay. Used on home.
//   "white" — bg white, ornaments cream-sand. Used on contact / listing pages
//             so the footer reads as a calmer surface after busy content.
export function SiteFooter({
  variant = "cream",
}: {
  variant?: "cream" | "white";
}) {
  const year = new Date().getFullYear();
  const isWhite = variant === "white";
  const ornamentColor = isWhite ? CREAM_DARK : CLAY;
  const hairline = isWhite ? HAIRLINE_WHITE : HAIRLINE_CREAM;
  const gradient = isWhite
    ? "radial-gradient(ellipse 110% 85% at 50% 0%, #ffffff 0%, #fbf8ef 60%, #f5edd8 100%)"
    : "radial-gradient(ellipse 110% 85% at 50% 0%, #f7f0db 0%, #f3ecd9 45%, #ece1c2 100%)";

  return (
    <footer className="relative overflow-hidden border-t" style={{ borderColor: hairline }}>
      {/* ─── Depth layer 1: atmospheric radial gradient ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: gradient }}
      />

      {/* ─── Depth layer 2: huge background wordmark ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-24 flex items-end justify-center overflow-hidden lg:bottom-32"
      >
        <span
          className="select-none text-[22vw] leading-[0.78] italic"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            color: ornamentColor,
            opacity: isWhite ? 0.18 : 0.07,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          Welkom Home
        </span>
      </div>

      {/* ─── Depth layer 3: scattered ornaments ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-12 top-16 hidden lg:block"
        style={{ color: ornamentColor, opacity: isWhite ? 0.6 : 0.4 }}
      >
        <SunCompass size={56} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-12 top-24 hidden lg:block"
        style={{ color: ornamentColor, opacity: isWhite ? 0.5 : 0.3 }}
      >
        <PalmFrond />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-16 bottom-40 hidden lg:block"
        style={{ color: ornamentColor, opacity: isWhite ? 0.7 : 0.5 }}
      >
        <ArcMark size={70} />
      </div>

      {/* ─── Layer 4: main content grid (z-10) ─── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 py-24 lg:px-12 lg:py-28">
        {/* Small ornamental top mark */}
        <div
          aria-hidden
          className="mb-16 flex items-center justify-center gap-5"
          style={{ color: ornamentColor, opacity: isWhite ? 0.75 : 0.55 }}
        >
          <WaveLine width={80} />
          <Sparkle size={11} />
          <WaveLine width={80} reverse />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-16">
          {/* ─── Brand column ─── */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="Welkom Home — accueil"
              className="inline-flex items-center gap-3"
            >
              <WhLogo className="h-14 w-auto" fill={INK_WARM} />
              <span
                className="text-base uppercase"
                style={{ letterSpacing: "0.35em", color: INK_WARM }}
              >
                Welkom Home
              </span>
            </Link>
            <p
              className="mt-7 max-w-sm text-[14px] leading-[1.7]"
              style={{ color: INK_WARM, opacity: 0.85 }}
            >
              Agence hollandaise basée à Den Haag, spécialisée dans
              l&apos;accompagnement des voyageurs néerlandais et belges à la
              recherche de leur maison sur la Côte d&apos;Azur.
            </p>

            {/* Ornament under the description */}
            <div className="mt-8" style={{ color: ornamentColor, opacity: isWhite ? 0.8 : 0.7 }}>
              <OliveBranch />
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center border text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
                style={{ borderColor: INK_WARM, borderRadius: 2 }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center border text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
                style={{ borderColor: INK_WARM, borderRadius: 2 }}
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* ─── Navigation ─── */}
          <FooterColumn title="Navigation" cols="lg:col-span-2">
            <FooterLink href="/">Accueil</FooterLink>
            <FooterLink href="/listing">Catalogue</FooterLink>
            <FooterLink href="/agence">L&apos;agence</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          {/* ─── Contact ─── */}
          <FooterColumn title="Contact" cols="lg:col-span-3">
            <FooterLink href="mailto:contact@welkomhome.eu">
              contact@welkomhome.eu
            </FooterLink>
            <FooterLink href="tel:+33668192755">
              <span className="font-mono">+33 6 68 19 27 55</span>
              <span
                className="ml-2 font-mono text-[10px] uppercase"
                style={{ color: CLAY, letterSpacing: "0.2em", opacity: 0.7 }}
              >
                FR
              </span>
            </FooterLink>
            <FooterLink href="tel:+31690909090">
              <span className="font-mono">+31 6 90 90 90 90</span>
              <span
                className="ml-2 font-mono text-[10px] uppercase"
                style={{ color: CLAY, letterSpacing: "0.2em", opacity: 0.7 }}
              >
                NL
              </span>
            </FooterLink>
            <p
              className="flex flex-col gap-1 text-[13px] leading-[1.6]"
              style={{ color: INK_WARM, opacity: 0.75 }}
            >
              <span className="flex items-center gap-2">
                <span style={{ color: CLAY }}>
                  <Diamond size={5} />
                </span>
                Den Haag, Pays-Bas
              </span>
              <span className="flex items-center gap-2">
                <span style={{ color: CLAY }}>
                  <Diamond size={5} />
                </span>
                Les Issambres, Var
              </span>
            </p>
          </FooterColumn>

          {/* ─── Newsletter ─── */}
          <FooterColumn title="Newsletter" cols="lg:col-span-2">
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: INK_WARM, opacity: 0.75 }}
            >
              Quelques villas, quelques bonnes adresses — deux fois l&apos;an.
            </p>
            <form className="mt-2 flex flex-col gap-2" action="#">
              <label className="sr-only" htmlFor="newsletter-email">
                Adresse email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="ton@email.fr"
                className="border bg-transparent px-3 py-2 text-[13px] outline-none placeholder:opacity-50 focus:outline-none"
                style={{
                  borderColor: hairline,
                  color: INK_WARM,
                  borderRadius: 2,
                }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase transition-opacity hover:opacity-90"
                style={{
                  background: INK_DEEP,
                  color: CREAM,
                  letterSpacing: "0.28em",
                  borderRadius: 2,
                }}
              >
                S&apos;inscrire
              </button>
            </form>
          </FooterColumn>
        </div>

        {/* Closing decorative band before the dark bar */}
        <div
          className="mt-20 flex flex-col items-center gap-5 border-t pt-10"
          style={{ borderColor: hairline }}
        >
          <div
            className="flex items-center gap-5"
            style={{ color: ornamentColor, opacity: 0.6 }}
          >
            <WaveLine width={70} />
            <SunCompass size={28} />
            <WaveLine width={70} reverse />
          </div>
          <p
            className="font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.4em", color: CLAY, opacity: 0.7 }}
          >
            Riviera · MMXXVI
          </p>
        </div>
      </div>

      {/* ─── Layer 5: dark "ground" bar ─── */}
      <div
        className="relative z-10"
        style={{ background: INK_DEEP, color: CREAM_SOFT }}
      >
        <div
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-8 py-6 text-[11px] sm:flex-row sm:items-center lg:px-12"
        >
          <p style={{ opacity: 0.7 }}>
            © {year} Welkom Home — Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            <BottomLink href="/mentions-legales">Mentions légales</BottomLink>
            <BottomLink href="/confidentialite">Confidentialité</BottomLink>
            <BottomLink href="/cgv">CGV</BottomLink>
            <li
              className="font-mono"
              style={{
                color: CREAM_SOFT,
                opacity: 0.5,
                letterSpacing: "0.18em",
              }}
            >
              v0.1
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────

function FooterColumn({
  title,
  cols,
  children,
}: {
  title: string;
  cols: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cols}>
      <p
        className="flex items-center gap-2 text-[10px] uppercase"
        style={{ letterSpacing: "0.34em", color: CLAY }}
      >
        <Sparkle size={8} />
        {title}
      </p>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal =
    href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http");
  const className =
    "text-[13px] transition-opacity hover:opacity-70 inline-flex items-center";
  const style = { color: INK_WARM };

  if (isExternal) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

function BottomLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="uppercase transition-opacity hover:opacity-100"
        style={{ letterSpacing: "0.2em", color: CREAM_SOFT, opacity: 0.7 }}
      >
        {children}
      </Link>
    </li>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.56 1.59-1.56H17V4.2c-.29-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.48-4.1 4.21v2.52H7.7V14h2.74v8h3.06z" />
    </svg>
  );
}
