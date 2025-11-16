"use client"

export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.015]">
      <svg className="h-full w-full">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
