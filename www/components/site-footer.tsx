import Link from "next/link";
import { WhLogo } from "@/components/wh-logo";

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";

// Editorial 4-column footer. Same brand palette as the rest of the site so
// it reads as the bottom of one continuous surface rather than a tacked-on
// block. Shared across home / listing / detail pages.
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ background: CREAM, borderColor: HAIRLINE, color: INK_WARM }}
    >
      <div className="mx-auto max-w-7xl px-8 py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-16">
          {/* ─── Brand column ─── */}
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Welkom Home — accueil" className="inline-flex items-center gap-3">
              <WhLogo className="h-12 w-auto" fill={INK_WARM} />
              <span
                className="text-sm uppercase"
                style={{ letterSpacing: "0.35em", color: INK_WARM }}
              >
                Welkom Home
              </span>
            </Link>
            <p
              className="mt-7 max-w-sm text-[14px] leading-[1.7]"
              style={{ color: INK_WARM, opacity: 0.85 }}
            >
              Conciergerie de villas privées entre Saint-Tropez et Les Issambres.
              Calendriers synchronisés, devis sous 24h, équipe locale.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center border transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
                style={{ borderColor: INK_WARM, color: INK_WARM, borderRadius: 2 }}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* ─── Navigation ─── */}
          <FooterColumn title="Navigation" cols="lg:col-span-2">
            <FooterLink href="/">Accueil</FooterLink>
            <FooterLink href="/listing">Catalogue</FooterLink>
            <FooterLink href="/#approche">Conciergerie</FooterLink>
            <FooterLink href="mailto:contact@welkomhome.eu?subject=Propri%C3%A9taire%20%E2%80%94%20Confier%20ma%20villa">
              Propriétaires
            </FooterLink>
          </FooterColumn>

          {/* ─── Contact ─── */}
          <FooterColumn title="Contact" cols="lg:col-span-3">
            <FooterLink href="mailto:contact@welkomhome.eu">
              contact@welkomhome.eu
            </FooterLink>
            <FooterLink href="tel:+33668192755">
              <span className="font-mono">+33 6 68 19 27 55</span>
            </FooterLink>
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: INK_WARM, opacity: 0.75 }}
            >
              Les Issambres
              <br />
              Var, Côte d&apos;Azur
            </p>
          </FooterColumn>

          {/* ─── Newsletter ─── */}
          <FooterColumn title="Newsletter" cols="lg:col-span-2">
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: INK_WARM, opacity: 0.75 }}
            >
              Quelques villas, quelques bonnes adresses, deux ou trois fois l&apos;an.
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
                  borderColor: HAIRLINE,
                  color: INK_WARM,
                  borderRadius: 2,
                }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase transition-opacity hover:opacity-90"
                style={{
                  background: "#3a2415",
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
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: HAIRLINE, background: CREAM_SOFT }}>
        <div
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-8 py-5 text-[11px] sm:flex-row sm:items-center lg:px-12"
          style={{ color: INK_WARM }}
        >
          <p style={{ opacity: 0.7 }}>
            © {year} Welkom Home — Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            <BottomLink href="/mentions-legales">Mentions légales</BottomLink>
            <BottomLink href="/confidentialite">Confidentialité</BottomLink>
            <BottomLink href="/cgv">CGV</BottomLink>
            <span
              className="font-mono"
              style={{ color: CLAY, letterSpacing: "0.18em", opacity: 0.85 }}
            >
              Côte d&apos;Azur · MMXXVI
            </span>
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
        className="text-[10px] uppercase"
        style={{ letterSpacing: "0.34em", color: CLAY }}
      >
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
  const isExternal = href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http");
  const className = "text-[13px] transition-opacity hover:opacity-70";
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
        className="uppercase transition-opacity hover:opacity-70"
        style={{ letterSpacing: "0.2em", color: INK_WARM, opacity: 0.85 }}
      >
        {children}
      </Link>
    </li>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
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
