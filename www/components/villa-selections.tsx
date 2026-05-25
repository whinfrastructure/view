"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { Mark } from "@/components/mark";
import { Sparkle, WaveLine } from "@/components/ornaments";
import type { PropertyListItem } from "@/lib/properties";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const INK = "#1a1a1a";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";

type Props = {
  villas: PropertyListItem[];
};

// Editorial 3-up selection on a clean white background. Cards are laid out in
// a horizontal scroller so the arrow controls can page through them even when
// the list grows past 3 items.
export function VillaSelections({ villas }: Props) {
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
          start: "top 78%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".vs-header > *",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
      ).fromTo(
        ".vs-card",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
        "<0.2",
      );
    },
    { scope: rootRef },
  );

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Page by one full card + gap. Width is computed live so this stays
    // correct after a resize.
    const card = el.querySelector(".vs-card") as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 32; // gap-8
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  }, []);

  if (villas.length === 0) return null;

  return (
    <section
      ref={rootRef}
      className="relative py-28 lg:py-32"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Header row */}
        <div className="vs-header mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="flex items-center gap-3 text-[10px] uppercase"
              style={{ letterSpacing: "0.34em", color: CLAY }}
            >
              <Sparkle size={9} />
              Nos villas
            </p>
            <h2
              className="mt-4 text-3xl leading-[1.1] md:text-5xl lg:text-[2.8rem]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                color: INK_WARM,
              }}
            >
              Découvrez nos <Mark>sélections</Mark>
            </h2>
          </div>
          <Link
            href="/listing"
            className="inline-flex items-center gap-3 border px-7 py-3 text-[10px] uppercase transition-colors hover:bg-[#1a1a1a] hover:text-white"
            style={{
              borderColor: INK,
              color: INK,
              letterSpacing: "0.3em",
              borderRadius: 2,
            }}
          >
            Toutes les villas
          </Link>
        </div>

        {/* Count + hairline divider — gives the carousel an editorial frame
            and tells the user how many properties are available. */}
        <div
          className="vs-header mb-12 flex items-center gap-4 border-t pt-5"
          style={{ borderColor: "rgba(26,26,26,0.12)" }}
        >
          <span
            className="font-mono text-[11px] uppercase"
            style={{ letterSpacing: "0.22em", color: CLAY }}
          >
            {String(villas.length).padStart(2, "0")} villas
          </span>
          <span aria-hidden style={{ color: CLAY, opacity: 0.55 }}>
            <WaveLine width={36} />
          </span>
          <span className="text-[11px] text-zinc-500" style={{ letterSpacing: "0.1em" }}>
            Saint-Tropez · Sainte-Maxime · Les Issambres
          </span>
        </div>

        {/* Carousel — arrows anchored on the image's vertical midpoint
            (aspect-[4/5] makes the image ~80% of card height; visual center
            sits around 40% of the card). */}
        <div className="relative">
          {/* Arrows */}
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => scrollBy(-1)}
            className="group/arrow absolute -left-5 top-[34%] z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-[0_4px_18px_rgba(26,26,26,0.08)] transition-all hover:scale-105 hover:bg-[#f3ecd9] hover:text-white md:flex"
            style={{ borderColor: "rgba(26,26,26,0.16)", color: INK }}
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => scrollBy(1)}
            className="group/arrow absolute -right-5 top-[34%] z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-[0_4px_18px_rgba(26,26,26,0.08)] transition-all hover:scale-105 hover:bg-[#f3ecd9] hover:text-white md:flex"
            style={{ borderColor: "rgba(26,26,26,0.16)", color: INK }}
          >
            <Arrow direction="right" />
          </button>

          {/* Scroller — snaps card-by-card so the arrow navigation lands cleanly. */}
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {villas.map((v, i) => (
              <article
                key={v.id}
                className="vs-card w-[88%] flex-shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-4rem)/3)]"
              >
                <Link href={`/listing/${v.slug}`} className="group block">
                  {/* Image + corner number index + hover arrow */}
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden"
                    style={{ background: "#f3ecd9" }}
                  >
                    {v.cover_photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={v.cover_photo}
                        alt={v.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      />
                    ) : null}

                    {/* Reference chip — cream-on-cream-blur is readable on
                        any photo (mix-blend-difference can flip to clay on
                        warm backdrops). Falls back to the position index. */}
                    <span
                      className="absolute left-4 top-4 inline-flex items-center font-mono text-[10px] uppercase backdrop-blur-md"
                      style={{
                        letterSpacing: "0.22em",
                        color: INK_WARM,
                        background: "rgba(243, 236, 217, 0.88)",
                        padding: "5px 10px",
                        borderRadius: 2,
                      }}
                    >
                      {v.reference
                        ? `Réf. ${v.reference}`
                        : `${String(i + 1).padStart(2, "0")} / ${String(villas.length).padStart(2, "0")}`}
                    </span>

                    {/* Hover overlay — soft scrim + arrow CTA bottom-right */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-4 right-4 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/70 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Arrow direction="right" />
                    </span>
                  </div>

                  {/* Card text */}
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="text-[10px] uppercase"
                        style={{ letterSpacing: "0.3em", color: CLAY }}
                      >
                        {v.city ?? "Côte d'Azur"}
                      </p>
                      <h3
                        className="mt-3 text-[1.65rem] leading-[1.1] md:text-[1.85rem]"
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontWeight: 500,
                          color: INK,
                        }}
                      >
                        {v.name}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="mt-3 text-[12px] text-zinc-600"
                    style={{ letterSpacing: "0.06em" }}
                  >
                    {v.bedrooms} chambres · {v.max_guests} personnes
                  </p>
                </Link>
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
