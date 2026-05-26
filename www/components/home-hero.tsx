"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { WhLogo } from "@/components/wh-logo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Warm light beige for the logo + brand text + scroll indicator. Reads as
// luxury hospitality against the Mediterranean blue/green footage, without
// the flatness of pure white.
const CREAM = "#e8d6b7";

export function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([".hero-logo", ".hero-text", ".hero-scroll"], { autoAlpha: 1 });
        return;
      }

      // Splash fades around 3s; start the hero reveal slightly earlier so the
      // wordmark is already settling in as the splash clears, instead of
      // making the user wait through a black moment.
      const tl = gsap.timeline({
        delay: 2.3,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".hero-logo",
        { autoAlpha: 0, scale: 0.97 },
        { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" },
      )
        .fromTo(
          ".hero-text",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          "-=0.55",
        )
        .fromTo(
          ".hero-scroll",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 0.85, y: 0, duration: 0.5 },
          "-=0.25",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      // `sticky top-0` makes the hero "stick" while the user scrolls — the
      // cream section after it slides UP over the video (curtain reveal).
      // z-0 keeps it behind any subsequent section that opts in with z-10+.
      className="sticky top-0 z-0 flex h-screen min-h-[640px] flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Background video — no blur, just a tiny brightness/contrast lift so
          the cream foreground stays readable over a bright shot. */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ filter: "brightness(0.8) contrast(1.05)" }}
        src="/introbitch.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Layered scrim: deeper at top (under the nav) + soft vignette so the
          centered wordmark sits on a calmer patch of footage. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.30) 100%), radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      <WhLogo
        className="hero-logo h-44 w-auto opacity-0 md:h-64 lg:h-72"
        fill={CREAM}
        title="Welkom Home"
      />

      <p
        className="hero-text mt-10 text-2xl font-light uppercase opacity-0 md:text-3xl lg:text-4xl"
        style={{ color: CREAM, letterSpacing: "0.29em" }}
      >
        Welkom&nbsp;Home
      </p>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-12 flex flex-col items-center gap-3 opacity-0">
        <span
          className="text-[10px] uppercase"
          style={{ color: CREAM, letterSpacing: "0.29em" }}
        >
          Scroll
        </span>
        <span
          aria-hidden="true"
          className="block h-12 w-px"
          style={{ background: CREAM, opacity: 0.5 }}
        />
      </div>
    </section>
  );
}
