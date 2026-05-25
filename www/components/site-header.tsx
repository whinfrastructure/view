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
  { label: "Conciergerie", href: "/#approche" },
  { label: "Contact", href: "mailto:contact@welkomhome.eu" },
];

// Languages the brand actually publishes in (fr / en / nl per the AI modal).
// Until i18n is wired we just visually highlight the active one — clicking is
// a no-op so we use buttons, not links.
const LANGS = ["fr", "en", "nl"] as const;

export function SiteHeader({
  me,
  transparent = false,
}: {
  me: Me | null;
  transparent?: boolean;
}) {
  // When `transparent` is requested, watch scroll: as soon as the user leaves
  // the hero (~80px in), swap to the opaque/dark style so the header stays
  // readable over the white sections below.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const ghost = transparent && !scrolled;
  const ink = ghost ? CREAM : "var(--ink, #18181b)";

  return (
    <header
      // `transparent` headers float OVER the hero (fixed, no flow space).
      // Other pages keep the original sticky behaviour so content sits below.
      className={`${transparent ? "fixed inset-x-0" : "sticky"} top-0 z-30 transition-colors duration-500 ${
        ghost
          ? "bg-transparent"
          : "border-b backdrop-blur"
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
        className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-8 md:h-20"
        style={{ color: ink }}
      >
        {/* ─── Brand (left) ───
            Hidden while floating over the hero — the hero itself already
            carries the big wordmark, so a second one in the nav reads as
            noise. Once the user scrolls past the hero we fade the wh
            mark + wordmark in so the brand identity stays anchored. */}
        <Link
          href="/"
          aria-label="Welkom Home — accueil"
          className={`flex items-center gap-4 justify-self-start transition-opacity duration-500 hover:opacity-80 ${
            ghost ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <WhLogo className="h-10 w-auto md:h-12" fill="currentColor" />
          <span
            className="text-sm uppercase md:text-base"
            style={{ letterSpacing: "0.35em" }}
          >
            Welkom Home
          </span>
        </Link>

        {/* ─── Nav (center) ─── */}
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

        {/* ─── Social + lang (right) ─── */}
        <div className="flex items-center gap-5 justify-self-end">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
            className="opacity-90 transition-opacity hover:opacity-100"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
            className="opacity-90 transition-opacity hover:opacity-100"
          >
            <FacebookIcon />
          </a>

          <LangSwitcher ink={ink} ghost={ghost} />

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
        </div>
      </div>
    </header>
  );
}

function LangSwitcher({ ink, ghost }: { ink: string; ghost: boolean }) {
  // FR is the active locale by default. Visual treatment: active is boxed,
  // inactive sit beside it in lower opacity — same idiom as south-paradise.
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase" style={{ letterSpacing: "0.2em" }}>
      <span
        className="inline-flex h-7 min-w-7 items-center justify-center border px-1.5"
        style={{
          borderColor: ink,
          color: ink,
          borderRadius: 2,
        }}
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
      {/* Show 'ghost' silently so React doesn't warn about an unused prop in
          future maintenance — kept for symmetry with header style logic. */}
      <span hidden>{String(ghost)}</span>
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
    <svg
      width="18"
      height="18"
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
