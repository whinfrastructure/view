"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "@/app/actions/auth";
import type { Me } from "@/lib/api";
import { WhLogo } from "@/components/wh-logo";

// Warm light beige — same tone as the hero wordmark + scroll indicator so
// the floating nav reads as part of the same brand layer over the video.
const CREAM = "#e8d6b7";

const NAV_LINKS = [
  { label: "Villas", href: "/listing" },
  { label: "L'agence", href: "/agence" },
  { label: "Contact", href: "/contact" },
];

const LANGS = ["fr", "en", "nl"] as const;

export function SiteHeader({
  me,
  transparent = false,
}: {
  me: Me | null;
  transparent?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [menuOpen]);

  // Close menu on route change / esc.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const ghost = transparent && !scrolled && !menuOpen;
  const ink = ghost ? CREAM : "var(--ink, #18181b)";

  return (
    <>
      <header
        className={`${transparent ? "fixed inset-x-0" : "sticky"} top-0 z-30 transition-colors duration-500 ${
          ghost ? "bg-transparent" : "border-b backdrop-blur"
        }`}
        style={
          ghost
            ? undefined
            : {
                background: "rgba(243, 236, 217, 0.92)",
                borderColor: "rgba(91, 58, 31, 0.14)",
              }
        }
      >
        <div
          className="mx-auto grid h-16 max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:h-20 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-8"
          style={{ color: ink }}
        >
          {/* ─── Brand (left) ─── */}
          <Link
            href="/"
            aria-label="Welkom Home — accueil"
            className={`flex items-center gap-3 justify-self-start transition-opacity duration-500 hover:opacity-80 md:gap-4 ${
              ghost ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <WhLogo className="h-8 w-auto md:h-12" fill="currentColor" />
            <span
              className="hidden text-sm uppercase sm:inline md:text-base"
              style={{ letterSpacing: "0.32em" }}
            >
              Welkom Home
            </span>
          </Link>

          {/* ─── Nav (center, desktop only) ─── */}
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12px] uppercase transition-opacity hover:opacity-70"
                style={{ letterSpacing: "0.22em" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ─── Right zone ─── */}
          <div className="flex items-center justify-self-end gap-3 md:gap-5">
            {/* Social icons — hidden on mobile (live in the drawer instead) */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="hidden opacity-90 transition-opacity hover:opacity-100 md:inline-block"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="hidden opacity-90 transition-opacity hover:opacity-100 md:inline-block"
            >
              <FacebookIcon />
            </a>

            <LangSwitcher ink={ink} />

            {me ? (
              <UserMenu email={me.email} firstName={me.first_name} ghost={ghost} />
            ) : (
              <Link
                href="/login"
                className="hidden text-[12px] uppercase transition-opacity hover:opacity-70 md:inline-block"
                style={{ letterSpacing: "0.22em" }}
              >
                Connexion
              </Link>
            )}

            {/* Mobile hamburger / close button */}
            <button
              type="button"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center md:hidden"
              style={{ color: ink }}
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — full-height, opaque cream so it's always readable */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        me={me}
        transparent={transparent}
      />
    </>
  );
}

// ─────────────────── Mobile drawer ───────────────────

function MobileDrawer({
  open,
  onClose,
  me,
  transparent,
}: {
  open: boolean;
  onClose: () => void;
  me: Me | null;
  transparent: boolean;
}) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-20 md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`min-h-screen w-full origin-top transition-all duration-400 ease-out ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
        style={{
          background: "rgba(243, 236, 217, 0.98)",
          paddingTop: transparent ? "4rem" : "4rem",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-10">
          {/* Big nav links */}
          <nav className="flex flex-col gap-7">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="block text-3xl leading-none transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  color: "#5b3a1f",
                  transitionDelay: open ? `${i * 60 + 80}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(8px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "400ms",
                }}
              >
                {l.label}
              </Link>
            ))}
            {!me && (
              <Link
                href="/login"
                onClick={onClose}
                className="block text-3xl leading-none transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#5b3a1f",
                  transitionDelay: open ? `${NAV_LINKS.length * 60 + 80}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(8px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "400ms",
                }}
              >
                Connexion
              </Link>
            )}
          </nav>

          {/* Hairline */}
          <div
            className="my-10 h-px w-full"
            style={{ background: "rgba(91, 58, 31, 0.16)" }}
          />

          {/* Social + contact */}
          <div className="flex items-center gap-5" style={{ color: "#5b3a1f" }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FacebookIcon />
            </a>
          </div>

          <div className="mt-8 space-y-2 text-[12px]" style={{ color: "#5b3a1f" }}>
            <a
              href="mailto:contact@welkomhome.eu"
              className="block transition-opacity hover:opacity-70"
            >
              contact@welkomhome.eu
            </a>
            <a
              href="tel:+31690909090"
              className="block font-mono transition-opacity hover:opacity-70"
            >
              +31 6 90 90 90 90
            </a>
          </div>

          <p
            className="mt-10 font-mono text-[10px] uppercase"
            style={{
              letterSpacing: "0.34em",
              color: "#8d4926",
              opacity: 0.7,
            }}
          >
            Welkom Home — Den Haag · Riviera
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── Sub-components ───────────────────

function LangSwitcher({ ink }: { ink: string }) {
  return (
    <div
      className="flex items-center gap-1.5 text-[10px] uppercase md:gap-2 md:text-[11px]"
      style={{ letterSpacing: "0.2em" }}
    >
      <span
        className="inline-flex h-6 min-w-6 items-center justify-center border px-1 md:h-7 md:min-w-7 md:px-1.5"
        style={{ borderColor: ink, color: ink, borderRadius: 2 }}
      >
        FR
      </span>
      {LANGS.filter((l) => l !== "fr").map((l) => (
        <button
          key={l}
          type="button"
          className="opacity-60 transition-opacity hover:opacity-100"
          style={{ color: ink }}
          aria-label={`Passer en ${l.toUpperCase()}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function UserMenu({
  email,
  firstName,
  ghost,
}: {
  email: string;
  firstName: string | null;
  ghost: boolean;
}) {
  const display = firstName || email.split("@")[0];
  return (
    <div className="flex items-center gap-3">
      <span
        className="hidden text-[11px] uppercase md:inline"
        style={{ letterSpacing: "0.2em", opacity: ghost ? 0.85 : 0.7 }}
      >
        {display}
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="text-[11px] uppercase transition-opacity hover:opacity-70"
          style={{ letterSpacing: "0.2em" }}
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.56 1.59-1.56H17V4.2c-.29-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.48-4.1 4.21v2.52H7.7V14h2.74v8h3.06z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
