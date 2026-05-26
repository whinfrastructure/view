"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const INK_WARM = "#5b3a1f";
const CREAM_SOFT = "#efe6cf";

export type EditorialProps = {
  /** Position of the image vs the text. */
  imageSide: "left" | "right";
  /** Tiny uppercase label above the heading (e.g. "La conciergerie"). */
  eyebrow: string;
  /** Heading nodes — typically a mix of plain text and one <Mark> highlight. */
  heading: React.ReactNode;
  /** Body paragraphs as an array so we can stagger them in. */
  body: React.ReactNode[];
  /** CTA label and href (mailto: or internal route). */
  ctaLabel: string;
  ctaHref: string;
  /** Image URL — typically a villa cover_photo. Falls back to a cream block. */
  imageSrc?: string;
  /** Alt text for the image. */
  imageAlt: string;
};

// Editorial 2-up block in the south-paradise idiom: an edge-flush image on
// one side, a serif italic heading + body + outlined CTA on the other.
// ScrollTrigger fades the column in as it enters the viewport, with the
// image lifting just behind the text for a subtle parallax-like sequencing.
export function EditorialSection({
  imageSide,
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: EditorialProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // ─── Parallax on the image: drifts slower than the section scroll
      // so the photo "breathes" against the text column. yPercent stays in
      // small range because the image is `object-cover` and slightly cropped
      // by the container — moving 8% never exposes the bg.
      gsap.fromTo(
        ".ed-media img",
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

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
        ".ed-media",
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power2.out" },
      )
        .fromTo(
          ".ed-eyebrow",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "<0.15",
        )
        .fromTo(
          ".ed-heading",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          "<0.1",
        )
        .fromTo(
          ".ed-body > *",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "<0.2",
        )
        .fromTo(
          ".ed-cta",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          "<0.15",
        );
    },
    { scope: rootRef },
  );

  const imageOrderClass = imageSide === "right" ? "lg:order-2" : "";
  const textOrderClass = imageSide === "right" ? "lg:order-1" : "";

  return (
    <section
      ref={rootRef}
      className="relative grid grid-cols-1 lg:grid-cols-2"
    >
      {/* ─── Media column ─── */}
      <div
        className={`ed-media relative aspect-[5/4] w-full overflow-hidden lg:aspect-auto lg:min-h-[520px] ${imageOrderClass}`}
        style={{ background: CREAM_SOFT }}
      >
        {imageSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          // Fallback: warm cream gradient so the section never looks empty if
          // the backend hasn't returned a cover photo yet.
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, #f0e3c1 0%, #e3d2a8 50%, #cdb887 100%)",
            }}
          />
        )}
      </div>

      {/* ─── Text column ─── */}
      <div className={`flex items-center px-8 py-20 lg:px-14 lg:py-24 xl:px-20 ${textOrderClass}`}>
        <div className="max-w-md">
          <p
            className="ed-eyebrow text-[10px] uppercase"
            style={{ letterSpacing: "0.34em", color: INK_WARM, opacity: 0.7 }}
          >
            {eyebrow}
          </p>
          <h2
            className="ed-heading mt-5 text-3xl leading-[1.12] md:text-[2.1rem] lg:text-[2.4rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: INK_WARM,
            }}
          >
            {heading}
          </h2>

          <div className="ed-body mt-7 space-y-4 text-[14px] leading-[1.75] text-zinc-800">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <Link
            href={ctaHref}
            className="ed-cta mt-9 inline-flex items-center gap-3 border px-7 py-3 text-[10px] uppercase text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
            style={{
              borderColor: INK_WARM,
              letterSpacing: "0.3em",
              borderRadius: 2,
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
