"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Mark } from "@/components/mark";
import {
  OliveBranch,
  PalmFrond,
  Sparkle,
  SunCompass,
  WaveLine,
} from "@/components/ornaments";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const INK = "#1a1a1a";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE_INK = "rgba(26, 26, 26, 0.12)";

type Review = {
  quote: string;
  author: string;
  location: string;
  villa: string;
};

// Hand-curated testimonials. Replace with backend data when the reviews API
// ships — until then they're hard-coded so the section always has content.
// The FIRST entry is the "hero" featured quote (longer, most evocative).
const REVIEWS: Review[] = [
  {
    quote:
      "Nous avons passé un séjour merveilleux, tant le lieu est exceptionnel — une vue époustouflante sur la Méditerranée, des prestations en corrélation parfaite avec nos attentes. Nous repartons la tête pleine de souvenirs inoubliables.",
    author: "Laurence",
    location: "Provence-Alpes-Côte d'Azur",
    villa: "Villa Tumulus",
  },
  {
    quote:
      "Shirley à été disponibles et très réactifs. Les prestations sont à la hauteur et la propreté irréprochable. Nous les conseillons les yeux fermés.",
    author: "Jordan",
    location: "Le Raincy, France",
    villa: "Villa Les Tourterelles",
  },
  {
    quote:
      "Merci à Shirley pour son écoute et son accompagnement. Un magnifique moment au Mas Yuralla.",
    author: "Simon",
    location: "Paris, France",
    villa: "Mas Yuralla",
  },
  {
    quote:
      "Spacious villa with exceptional view in a calm neighborhood. Great amenities.",
    author: "Ernst",
    location: "Erlangen, Allemagne",
    villa: "Villa Tumulus",
  },
  {
    quote:
      "Logement conforme à l'annonce, beaucoup d'équipements. Il suffit de poser vos valises et de profiter de la vue. Merci à l'hôte pour sa gentillesse — nous recommandons.",
    author: "François",
    location: "Paris, France",
    villa: "Villa Naïades",
  },
];

const ROMAN = ["I", "II", "III", "IV", "V"];

export function ReviewsCarousel() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".rv-header > *",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
      )
        .fromTo(
          ".rv-featured",
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" },
          "<0.15",
        )
        .fromTo(
          ".rv-support",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "<0.25",
        );
    },
    { scope: rootRef },
  );

  const featured = REVIEWS[0];
  const support = REVIEWS.slice(1);

  return (
    <section
      ref={rootRef}
      className="relative py-20 sm:py-28 lg:py-36"
      style={{ background: "#ffffff" }}
    >
      {/* Decorative top margin ornament — small sun on the right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-12 lg:right-16 lg:top-16"
        style={{ color: CLAY, opacity: 0.45 }}
      >
        <SunCompass size={36} />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ─── Header ─── */}
        <div className="rv-header mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 md:flex-row md:items-end lg:mb-20">
          <div>
            <p
              className="flex items-center gap-3 text-[10px] uppercase"
              style={{ letterSpacing: "0.34em", color: CLAY }}
            >
              <Sparkle size={9} />
              Témoignages — {String(REVIEWS.length).padStart(2, "0")}
            </p>
            <h2
              className="mt-4 text-3xl leading-[1.05] md:text-5xl lg:text-[3rem]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                color: INK_WARM,
              }}
            >
              Ils ont <Mark>séjourné</Mark> chez nous
            </h2>
          </div>
          <p
            className="hidden max-w-xs text-[12px] italic leading-[1.5] md:block"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              color: CLAY,
              opacity: 0.7,
            }}
          >
            Quelques mots reçus après leur séjour, retranscrits sans retouche.
          </p>
        </div>

        {/* ─── I. FEATURED PULL-QUOTE ─── */}
        <article
          className="rv-featured grid grid-cols-1 gap-8 border-y py-12 sm:gap-10 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20"
          style={{ borderColor: HAIRLINE_INK }}
        >
          {/* Left margin: roman numeral + ornament */}
          <div className="lg:col-span-2">
            <span
              className="flex items-center gap-3 font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY }}
            >
              <Sparkle size={10} />
              {ROMAN[0]}
            </span>
            <span
              aria-hidden
              className="mt-6 block text-[6rem] leading-[0.6] italic"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                color: CLAY,
                opacity: 0.45,
              }}
            >
              «
            </span>
            {/* Vertical decorative palm/leaf running down the margin */}
            <div
              aria-hidden
              className="mt-10 hidden lg:block"
              style={{ color: CLAY, opacity: 0.5 }}
            >
              <PalmFrond />
            </div>
          </div>

          {/* Main quote + author */}
          <div className="lg:col-span-10">
            <blockquote
              className="text-2xl leading-[1.25] italic md:text-[2.2rem] lg:text-[2.6rem]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                color: INK_WARM,
              }}
            >
              {featured.quote}
            </blockquote>

            {/* Olive branch separator before the author footer */}
            <div className="mt-8" style={{ color: CLAY, opacity: 0.6 }}>
              <OliveBranch />
            </div>

            <footer className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <span
                className="text-[12px] uppercase"
                style={{ letterSpacing: "0.3em", color: INK }}
              >
                {featured.author}
              </span>
              <span
                className="font-mono text-[11px]"
                style={{ color: INK_WARM, opacity: 0.7 }}
              >
                {featured.location}
              </span>
              <span
                className="text-[14px] italic"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  color: CLAY,
                }}
              >
                — {featured.villa}
              </span>
            </footer>
          </div>
        </article>

        {/* ─── Wave divider between featured and supporting ─── */}
        <div
          aria-hidden
          className="my-16 flex items-center justify-center gap-6 lg:my-20"
          style={{ color: CLAY, opacity: 0.5 }}
        >
          <WaveLine />
          <Sparkle size={14} />
          <WaveLine reverse />
        </div>

        {/* ─── II–V. SUPPORTING GRID (asymmetric spread) ─── */}
        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 sm:mt-20 sm:gap-y-16 lg:grid-cols-12 lg:gap-y-20">
          {support.map((r, i) => {
            // Asymmetric col-spans + offsets create the magazine rhythm.
            // II: wide left   |  III: narrow right
            // IV: narrow left |  V:  wide right
            const layouts = [
              "lg:col-span-7 lg:col-start-1",
              "lg:col-span-4 lg:col-start-9",
              "lg:col-span-5 lg:col-start-2",
              "lg:col-span-6 lg:col-start-7",
            ];
            const layout = layouts[i] ?? "";
            // Vary text alignment so the spread doesn't read like a uniform grid.
            const isRightAligned = i === 1 || i === 3;
            return (
              <article
                key={i}
                className={`rv-support ${layout} ${isRightAligned ? "text-right" : "text-left"}`}
              >
                <span
                  className={`flex items-center gap-2.5 font-mono text-[10px] uppercase ${
                    isRightAligned ? "justify-end" : "justify-start"
                  }`}
                  style={{ letterSpacing: "0.32em", color: CLAY }}
                >
                  <Sparkle size={9} />
                  {ROMAN[i + 1]}
                </span>
                <blockquote
                  className="mt-5 text-lg italic leading-[1.45] md:text-xl lg:text-[1.45rem]"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    color: INK_WARM,
                  }}
                >
                  « {r.quote} »
                </blockquote>
                <footer
                  className={`mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1 ${
                    isRightAligned ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className="text-[11px] uppercase"
                    style={{ letterSpacing: "0.28em", color: INK }}
                  >
                    {r.author}
                  </span>
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: INK_WARM, opacity: 0.7 }}
                  >
                    {r.location}
                  </span>
                  <span
                    className="w-full text-[13px] italic"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      color: CLAY,
                    }}
                  >
                    {r.villa}
                  </span>
                </footer>
              </article>
            );
          })}
        </div>

        {/* ─── Closing ornament (defined below) ─── */}
        <div
          className="mt-16 flex flex-col items-center gap-5 border-t pt-10 sm:mt-24 sm:pt-12"
          style={{ borderColor: HAIRLINE_INK }}
        >
          <div style={{ color: CLAY }}>
            <SunCompass size={32} />
          </div>
          <div
            aria-hidden
            className="flex items-center gap-4"
            style={{ color: CLAY, opacity: 0.55 }}
          >
            <WaveLine />
            <span
              className="font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.36em" }}
            >
              Fin du recueil
            </span>
            <WaveLine reverse />
          </div>
        </div>
      </div>
    </section>
  );
}

