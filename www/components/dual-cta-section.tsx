"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CREAM = "#f3ecd9";

// Two-up "audience split" block — invites the visitor to either entrust their
// villa to Welkom Home (owner side, investment angle) or browse the catalog as
// a traveler. Same DA cues as the rest of the home: Cormorant italic accent,
// thin vertical eyebrow rule, outlined CTAs.
export function DualCtaSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.fromTo(
        ".dual-card",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="py-24 lg:py-32" style={{ background: CREAM }}>
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          <AudienceCard
            eyebrow="Propriétaires"
            heading={
              <>
                Vous cherchez à <em className="italic">valoriser</em> votre villa ?
              </>
            }
            description="Confiez-nous votre maison. On la met en lumière auprès d'une clientèle néerlandaise et belge fidèle, on gère les locations, vous percevez."
            ctaLabel="En savoir plus"
            ctaHref="mailto:contact@welkomhome.eu?subject=Propri%C3%A9taire%20%E2%80%94%20Confier%20ma%20villa"
            imageSrc="/owners-villa.jpg"
            imageAlt="Villa méditerranéenne perchée sur une falaise au-dessus du golfe (photo Niklas, Unsplash)"
          />
          <AudienceCard
            eyebrow="Voyageurs"
            heading={
              <>
                Vous cherchez <em className="italic">votre maison</em> d&apos;été ?
              </>
            }
            description="Des villas triées sur le volet entre Saint-Tropez et Les Issambres. Accueil en néerlandais, français ou anglais."
            ctaLabel="Voir les villas"
            ctaHref="/listing"
            imageSrc="/travelers-pool.jpg"
            imageAlt="Vue depuis une villa : piscine à débordement, cyprès et mer turquoise (photo Arno Senoner, Unsplash)"
          />
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  heading: React.ReactNode;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}) {
  const isExternal = ctaHref.startsWith("mailto:") || ctaHref.startsWith("http");
  const ctaClass =
    "mt-8 inline-flex items-center gap-3 border px-8 py-3.5 text-[10px] uppercase text-[#f3ecd9] transition-colors hover:bg-[#f3ecd9] hover:text-[#5b3a1f]";
  // `color` is intentionally NOT set inline — inline styles beat Tailwind
  // hover utilities, which would freeze the text colour to CREAM and make
  // the label invisible against the cream hover background.
  const ctaStyle: React.CSSProperties = {
    borderColor: CREAM,
    letterSpacing: "0.3em",
    borderRadius: 2,
  };

  return (
    <article className="dual-card group relative aspect-[5/4] overflow-hidden">
      {/* Background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      />

      {/* Scrim — soft top + heavier bottom so the centered text reads on any photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.32) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center lg:px-12">
        {/* Thin vertical rule above the eyebrow — same idiom as south-paradise */}
        <span
          aria-hidden
          className="mb-3 block h-7 w-px"
          style={{ background: CREAM, opacity: 0.85 }}
        />
        <p
          className="text-[11px] uppercase"
          style={{ letterSpacing: "0.32em", color: CREAM, opacity: 0.92 }}
        >
          {eyebrow}
        </p>

        <h2
          className="mt-7 max-w-md text-3xl leading-[1.18] md:text-[2rem] lg:text-[2.4rem]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            color: CREAM,
          }}
        >
          {heading}
        </h2>

        <p
          className="mt-4 max-w-sm text-[13px] leading-[1.6]"
          style={{ color: CREAM, opacity: 0.82 }}
        >
          {description}
        </p>

        {/* Outlined CTA — internal routes use Next/Link for prefetch, mailto/
            external falls back to a plain anchor. */}
        {isExternal ? (
          <a href={ctaHref} className={ctaClass} style={ctaStyle}>
            {ctaLabel}
          </a>
        ) : (
          <Link href={ctaHref} className={ctaClass} style={ctaStyle}>
            {ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
