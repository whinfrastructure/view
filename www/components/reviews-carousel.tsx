"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useRef } from "react";
import { Mark } from "@/components/mark";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const INK = "#1a1a1a";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";

type Review = {
  quote: string;
  author: string;
  location: string;
  villa: string;
};

// Hand-curated testimonials surfaced on the home. Replace with backend data
// when the reviews API ships — until then they're hard-coded so the section
// always has something to render.
const REVIEWS: Review[] = [
  {
    quote:
      "Shirley et Yoan ont été disponibles et très réactifs à chaque demande. De plus très sympathiques et accueillants. Les prestations sont à la hauteur et la propreté était irréprochable. Nous vous les conseillons les yeux fermés — nous referons appel à eux pour nos prochaines vacances dans le sud.",
    author: "Jordan",
    location: "Le Raincy, France",
    villa: "Villa Les Tourterelles",
  },
  {
    quote:
      "Merci à Yohan et Shirley pour leur écoute et leur accompagnement. Nous avons passé un magnifique moment au Mas Yuralla.",
    author: "Simon",
    location: "Paris, France",
    villa: "Mas Yuralla",
  },
  {
    quote:
      "Spacious villa with exceptional view in a calm neighborhood. Great amenities!",
    author: "Ernst",
    location: "Erlangen, Allemagne",
    villa: "Villa Tumulus",
  },
  {
    quote:
      "Logement conforme à l'annonce, beaucoup d'équipements pour la cuisine, il suffit de poser vos valises et de vous régaler avec la vue magnifique. Merci à l'hôte pour sa gentillesse — nous recommandons ce logement au top.",
    author: "François",
    location: "Paris, France",
    villa: "Villa Naïades",
  },
  {
    quote:
      "Nous avons passé un séjour merveilleux, tant le lieu est exceptionnel — une vue époustouflante sur la Méditerranée et des prestations en corrélation avec nos attentes. Nous repartons la tête pleine de souvenirs inoubliables.",
    author: "Laurence",
    location: "Provence-Alpes-Côte d'Azur",
    villa: "Villa Tumulus",
  },
];

export function ReviewsCarousel() {
  const rootRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

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
        ".rc-header > *",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
      ).fromTo(
        ".rc-card",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
        "<0.2",
      );
    },
    { scope: rootRef },
  );

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".rc-card") as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 24; // gap-6
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-28 lg:py-32"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Header */}
        <div className="rc-header mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="text-[10px] uppercase"
              style={{ letterSpacing: "0.34em", color: CLAY }}
            >
              Ils en parlent
            </p>
            <h2
              className="mt-4 text-3xl leading-[1.1] md:text-5xl lg:text-[2.8rem]"
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
            className="font-mono text-[11px] uppercase"
            style={{ letterSpacing: "0.22em", color: CLAY }}
          >
            {String(REVIEWS.length).padStart(2, "0")} témoignages
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows */}
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => scrollBy(-1)}
            className="absolute -left-5 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-[0_4px_18px_rgba(26,26,26,0.08)] transition-all hover:scale-105 hover:bg-[#1a1a1a] hover:text-white md:flex"
            style={{ borderColor: "rgba(26,26,26,0.16)", color: INK }}
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => scrollBy(1)}
            className="absolute -right-5 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-[0_4px_18px_rgba(26,26,26,0.08)] transition-all hover:scale-105 hover:bg-[#1a1a1a] hover:text-white md:flex"
            style={{ borderColor: "rgba(26,26,26,0.16)", color: INK }}
          >
            <Arrow direction="right" />
          </button>

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="rc-card flex w-[88%] flex-shrink-0 snap-start flex-col justify-between p-8 sm:w-[60%] lg:w-[calc((100%-3rem)/3)] lg:p-10"
                style={{
                  background: i % 2 === 0 ? CREAM_SOFT : CREAM,
                  border: "1px solid rgba(91,58,31,0.12)",
                  borderRadius: 2,
                  minHeight: "320px",
                }}
              >
                {/* Decorative opening quote mark */}
                <span
                  aria-hidden
                  className="-mt-2 text-6xl leading-none italic"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    color: CLAY,
                    opacity: 0.5,
                  }}
                >
                  «
                </span>

                <blockquote
                  className="mt-4 text-[15px] italic leading-[1.65] flex-1"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    color: INK_WARM,
                  }}
                >
                  {r.quote}
                </blockquote>

                <footer className="mt-6">
                  <p
                    className="text-[11px] uppercase"
                    style={{ letterSpacing: "0.28em", color: INK }}
                  >
                    {r.author}
                  </p>
                  <p
                    className="mt-1 font-mono text-[11px]"
                    style={{ color: INK_WARM, opacity: 0.7 }}
                  >
                    {r.location}
                  </p>
                  <p
                    className="mt-3 text-[13px] italic"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      color: CLAY,
                    }}
                  >
                    {r.villa}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
