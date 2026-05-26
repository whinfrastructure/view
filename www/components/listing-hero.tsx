"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Mark } from "@/components/mark";
import { Sparkle, SunCompass, WaveLine } from "@/components/ornaments";

gsap.registerPlugin(useGSAP);

const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";

type Props = {
  total: number;
};

// Animated editorial header for the catalog page. Word-by-word reveal on the
// big H1, fade-up on the eyebrow + lede, draw-in on the ornaments — kicks off
// the page with intent.
export function ListingHero({ total }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Continuous slow rotation on the corner sun.
      gsap.to(".lh-sun", {
        rotation: 360,
        duration: 90,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      if (reduced) {
        gsap.set([".lh-eyebrow", ".lh-word", ".lh-lede", ".lh-counter"], { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".lh-eyebrow",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
      )
        .fromTo(
          ".lh-ornament",
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: 0.8 },
          "<0.05",
        )
        .fromTo(
          ".lh-word",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.08, ease: "power4.out" },
          "<0.1",
        )
        .fromTo(
          ".lh-lede",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          "<0.3",
        );

      // Counter from 0 → total, kicks off with the heading reveal.
      if (counterRef.current && total > 0) {
        const c = { v: 0 };
        gsap.to(c, {
          v: total,
          duration: 1.6,
          ease: "power3.out",
          delay: 0.4,
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = String(Math.floor(c.v));
          },
        });
      }
    },
    { scope: rootRef, dependencies: [total] },
  );

  return (
    <header ref={rootRef} className="relative mb-14 max-w-3xl">
      {/* Corner ornament */}
      <div
        aria-hidden
        className="lh-ornament pointer-events-none absolute -right-4 top-0 hidden lg:block"
        style={{ color: CLAY, opacity: 0.4 }}
      >
        <div className="lh-sun">
          <SunCompass size={48} />
        </div>
      </div>

      <p
        className="lh-eyebrow flex items-center gap-3 text-[11px] uppercase"
        style={{ letterSpacing: "0.34em", color: CLAY, opacity: 0 }}
      >
        <Sparkle size={10} />
        Notre catalogue
        <WaveLine width={40} />
      </p>

      <h1
        className="mt-4 text-4xl leading-[1.06] md:text-5xl lg:text-[3.4rem]"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          color: INK_WARM,
        }}
      >
        <span className="lh-word inline-block opacity-0">
          <span ref={counterRef}>0</span>
        </span>{" "}
        <span className="lh-word inline-block opacity-0">
          villa{total > 1 ? "s" : ""}
        </span>{" "}
        <span className="lh-word inline-block opacity-0">
          <Mark>à la location</Mark>
        </span>
      </h1>

      <p
        className="lh-lede mt-5 max-w-xl text-[15px] leading-[1.7] text-zinc-700"
        style={{ opacity: 0 }}
      >
        Entre Saint-Tropez et Les Issambres, des maisons triées sur le volet —
        calendriers à jour en temps réel, devis sous 24h, conciergerie sur place.
      </p>
    </header>
  );
}
