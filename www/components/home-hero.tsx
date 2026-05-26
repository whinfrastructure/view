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

      // Splash sits on top for ~3s, then fades out. We want the hero to be
      // *already in place* by the time the splash begins dissolving, so the
      // reveal feels instant rather than a slow grow-in. Total reveal
      // finishes around 1.6s — well before the splash fade-out kicks in.
      const tl = gsap.timeline({
        delay: 0.9,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".hero-logo",
        { autoAlpha: 0, scale: 0.97 },
        { autoAlpha: 1, scale: 1, duration: 0.65, ease: "power2.out" },
      )
        .fromTo(
          ".hero-text",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          "-=0.4",
        )
        .fromTo(
          ".hero-scroll",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 0.85, y: 0, duration: 0.4 },
          "-=0.2",
        );

      // ─── Scroll-driven parallax ─────────────────────────────────
      // `immediateRender: false` is CRITICAL here — the mount-reveal timeline
      // above runs with a 2.3s delay (waiting for the splash). If the scrub
      // tweens snapshot their starting state immediately, they capture the
      // pre-mount values (autoAlpha 0) and scrolling back up would freeze the
      // wordmark to invisible. Deferring the snapshot lets the scrub pick up
      // the *post-mount* state (autoAlpha 1) when it first activates.
      gsap.fromTo(
        ".hero-video",
        { scale: 1 },
        {
          scale: 1.08,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        [".hero-logo", ".hero-text"],
        { y: 0, autoAlpha: 1 },
        {
          y: -60,
          autoAlpha: 0.15,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      // Scroll indicator fades out as soon as the user starts scrolling —
      // it has served its purpose.
      gsap.fromTo(
        ".hero-scroll",
        { autoAlpha: 0.85 },
        {
          autoAlpha: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "top -120",
            scrub: 1,
          },
        },
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
        className="hero-video absolute inset-0 -z-10 h-full w-full object-cover"
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
