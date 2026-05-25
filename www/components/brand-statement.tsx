"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { Mark } from "@/components/mark";
import { ArcMark, Sparkle, SunCompass } from "@/components/ornaments";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Editorial palette for this surface — sampled from south-paradise.com.
// Kept local because these tones only live in the brand-statement block.
const BG = "#f3ecd9";        // section bg — soft warm cream
const HEADING = "#5b3a1f";   // serif italic — warm cocoa
const HIGHLIGHT = "#ecdfba"; // marker stroke behind highlighted words
const CTA_BG = "#3a2415";    // deep warm cocoa — replaces the previous green
const CTA_INK = "#f3ecd9";   // cream on cocoa
const WATERMARK = "#5b3a1f"; // same family as headings — subtle low-opacity wash

export function BrandStatement() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".bs-watermark",
        { autoAlpha: 0, x: -40 },
        { autoAlpha: 1, x: 0, duration: 1.4, ease: "power2.out" },
      )
        .fromTo(
          ".bs-heading",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 1.1 },
          "<0.15",
        )
        .fromTo(
          ".bs-body > *",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "<0.25",
        )
        .fromTo(
          ".bs-cta",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "<0.2",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      // `relative z-10` so it draws OVER the sticky hero as the user scrolls.
      className="relative z-10 overflow-hidden"
      style={{ background: BG }}
    >
      {/* Vertical decorative phrase along the left edge. Sized small enough
          that the full phrase always fits the section height (no clipping),
          and toned down so it reads as an ornamental wash, not a headline. */}
      {/* Decorative corner ornaments — anchor the layout */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-12 hidden md:block"
        style={{ color: WATERMARK, opacity: 0.45 }}
      >
        <SunCompass size={52} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden lg:block"
        style={{ color: WATERMARK, opacity: 0.32 }}
      >
        <ArcMark size={140} />
      </div>

      <span
        aria-hidden="true"
        className="bs-watermark pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 select-none whitespace-nowrap md:left-6"
        style={{
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
          lineHeight: 1,
          color: WATERMARK,
          opacity: 0.22,
          letterSpacing: "0.2em",
        }}
      >
        Welkom Home · Côte d&apos;Azur
      </span>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 px-8 py-32 md:py-40 lg:grid-cols-[1.05fr_1fr] lg:gap-24 lg:px-12">
        {/* Left — display heading + CTA */}
        <div className="relative">
          <h2
            className="bs-heading text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-[3.6rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: HEADING,
            }}
          >
            Des villas d&apos;exception,
            <br />
            un <Mark color={HIGHLIGHT}>accueil hollandais</Mark>.

          </h2>

          <Link
            href="/listing"
            className="bs-cta mt-12 inline-flex items-center gap-3 px-9 py-4 text-sm uppercase transition-colors hover:opacity-90"
            style={{
              background: CTA_BG,
              color: CTA_INK,
              letterSpacing: "0.22em",
              borderRadius: 2,
            }}
          >
            Voir les villas
          </Link>
        </div>

        {/* Right — body copy */}
        <div className="bs-body space-y-6 text-[15px] leading-[1.7] text-zinc-800 lg:pt-4">
          {/* Tiny sparkle as a paragraph initial — magazine flourish */}
          <span
            aria-hidden
            className="inline-flex items-center gap-2"
            style={{ color: HEADING, opacity: 0.7 }}
          >
            <Sparkle size={10} />
            <span
              className="font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.32em" }}
            >
              La maison
            </span>
          </span>
          <p>
            <strong className="font-semibold" style={{ color: HEADING }}>
              Welkom Home,
            </strong>{" "}
            c&apos;est une agence hollandaise basée à Den Haag, ancrée sur la Côte
            d&apos;Azur depuis 2018 — au cœur du golfe de Saint-Tropez.
          </p>
          <p>
            Notre métier : faciliter la vie de ceux qui viennent ici, qu&apos;ils
            possèdent leur maison ou qu&apos;ils la louent pour quelques semaines.
            On parle néerlandais, français et anglais, et on traite chaque dossier
            comme si c&apos;était le seul.
          </p>
          <p
            className="border-l pl-4 italic"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              borderColor: HEADING,
              color: HEADING,
              fontSize: "1.05rem",
            }}
          >
            « Votre confiance, nous savons la mériter. »
          </p>
        </div>
      </div>
    </section>
  );
}

