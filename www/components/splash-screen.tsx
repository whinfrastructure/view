"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { WhLogo } from "@/components/wh-logo";

gsap.registerPlugin(useGSAP);

export function SplashScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  // `mounted` gates rendering until after the client takes over, to avoid an
  // SSR/CSR mismatch (the server can't run window/sessionStorage checks).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll lock follows `mounted` so we always release the lock when the
  // splash hides. Tying it to mount/unmount alone would leak `overflow:hidden`
  // forever because <SplashScreen /> stays mounted in the root layout — it
  // just renders `null` after the animation finishes.
  useEffect(() => {
    if (!mounted) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mounted]);

  useGSAP(
    () => {
      if (!mounted) return;

      // Respect users who asked for less motion: short crossfade only,
      // still timed to ~3s total.
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set([".splash-logo", ".splash-text"], { autoAlpha: 1 });
        gsap.to(rootRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          delay: 2.6,
          onComplete: () => setMounted(false),
        });
        return;
      }

      // Total ≈ 3s: 1.1 (logo fade) + 0.55 (text fade, overlapping) + 1.3 hold + 0.65 fade-out.
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setMounted(false),
      });

      tl.fromTo(
        ".splash-logo",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.1, ease: "power2.out" },
      )
        .fromTo(
          ".splash-text",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.55",
        )
        .to(
          rootRef.current,
          { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" },
          "+=1.3",
        );
    },
    { scope: rootRef, dependencies: [mounted] },
  );

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10"
      style={{ backgroundColor: "#f6f4f0" }}
    >
      <WhLogo
        className="splash-logo h-40 w-auto opacity-0 md:h-56 lg:h-64"
        fill="#1a1a1a"
      />

      <p
        className="splash-text text-base font-light uppercase text-zinc-900 opacity-0 md:text-xl"
        style={{ letterSpacing: "0.5em" }}
      >
        Welkom&nbsp;Home
      </p>
    </div>
  );
}
