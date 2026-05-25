"use client";

import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/lib/properties";

type Props = {
  photos: Photo[];
  altBase: string;
};

// Editorial photo grid + lightbox. The grid varies tile sizes (every 5th tile
// spans 2 cols) for a magazine rhythm; the lightbox supports keyboard nav.
export function PhotoGallery({ photos, altBase }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );

  // Keyboard nav + body scroll lock while open.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [openIndex, close, prev, next]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {photos.map((p, i) => {
          // Magazine rhythm: every 5th photo spans 2 columns + 2 rows for a
          // beat against the smaller tiles around it.
          const isWide = i % 5 === 0;
          return (
            <li
              key={p.id}
              className={isWide ? "md:col-span-2 md:row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Voir la photo ${i + 1} sur ${photos.length}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden bg-black/5 md:aspect-square"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={p.alt ?? `${altBase} — photo ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {openIndex !== null && (
        <Lightbox
          photo={photos[openIndex]}
          index={openIndex}
          total={photos.length}
          altBase={altBase}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function Lightbox({
  photo,
  index,
  total,
  altBase,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  index: number;
  total: number;
  altBase: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} sur ${total}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Counter + close, top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 md:px-8">
        <span
          className="pointer-events-auto font-mono text-[11px] uppercase text-white/85"
          style={{ letterSpacing: "0.22em" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Fermer"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Prev / next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Précédente"
        className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 md:left-6 md:h-14 md:w-14"
      >
        <Arrow direction="left" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Suivante"
        className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 md:right-6 md:h-14 md:w-14"
      >
        <Arrow direction="right" />
      </button>

      {/* The photo */}
      <div
        className="relative max-h-[88vh] max-w-[92vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.alt ?? `${altBase} — photo ${index + 1}`}
          className="max-h-[88vh] max-w-[92vw] object-contain"
        />
      </div>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
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
