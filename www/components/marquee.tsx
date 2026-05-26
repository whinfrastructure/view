"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

type Props = {
  /** The text repeated across the strip. */
  text: string;
  /** Pixels per second. Lower = slower (default 35). */
  speed?: number;
  /** Reverse the direction. */
  reverse?: boolean;
  /** Background colour applied to the strip. */
  background?: string;
  /** Text colour. */
  color?: string;
  /** Border tone for the top/bottom hairlines. */
  borderColor?: string;
  /** Pause the loop on hover. */
  pauseOnHover?: boolean;
};

// Infinite horizontal marquee. Two copies of the inner row are rendered side
// by side; we tween x by exactly one copy's width, then loop. Result: a
// seamless scrolling strip.
export function Marquee({
  text,
  speed = 35,
  reverse = false,
  background = "transparent",
  color = "#8d4926",
  borderColor = "rgba(91, 58, 31, 0.16)",
  pauseOnHover = true,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const inner = rootRef.current?.querySelector(".marquee-inner") as HTMLElement | null;
      if (!inner) return;
      const single = inner.firstElementChild as HTMLElement | null;
      if (!single) return;

      // Width of ONE copy — we'll loop by that width.
      const width = single.offsetWidth;
      if (!width) return;

      tweenRef.current = gsap.to(inner, {
        x: reverse ? width : -width,
        duration: width / speed,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: rootRef, dependencies: [text, speed, reverse] },
  );

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden border-y py-6 lg:py-8"
      style={{ background, borderColor }}
      onMouseEnter={pauseOnHover ? () => tweenRef.current?.pause() : undefined}
      onMouseLeave={pauseOnHover ? () => tweenRef.current?.resume() : undefined}
    >
      <div className="marquee-inner flex whitespace-nowrap will-change-transform">
        {/* Two identical strips back-to-back so the loop is seamless. */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 pr-10 italic lg:gap-14 lg:pr-14"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
            aria-hidden={i === 1}
          >
            {text.split("·").map((bit, idx, arr) => (
              <span key={idx} className="inline-flex items-center gap-10 lg:gap-14">
                <span>{bit.trim()}</span>
                {idx < arr.length - 1 && (
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rotate-45"
                    style={{ background: color, opacity: 0.55 }}
                  />
                )}
              </span>
            ))}
            {/* Diamond after the last bit too, to bridge into the next copy. */}
            <span
              aria-hidden
              className="inline-block h-2 w-2 rotate-45"
              style={{ background: color, opacity: 0.55 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
