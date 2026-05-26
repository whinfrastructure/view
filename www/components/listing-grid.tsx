"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import type { PropertyListItem } from "@/lib/properties";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CREAM_SOFT = "#efe6cf";
const INK = "#1a1a1a";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";

// ─── Hand-rolled fuzzy matcher ─────────────────────────────────────────
// Lightweight subsequence/substring scoring so we don't pull in a 16 KB dep
// for a feature on a single page. Catches typos like "isambres" → "Les
// Issambres" and "vumer" → "vue mer".

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // strip combining diacritics
}

function fuzzyScore(query: string, target: string): number {
  const q = normalize(query);
  const t = normalize(target);
  if (!q) return 1;
  // Substring is the strongest signal — earlier position scores higher.
  const idx = t.indexOf(q);
  if (idx >= 0) return 1000 - idx;
  // Subsequence: each query char appears in order. Adjacent matches boost.
  let qi = 0;
  let score = 0;
  let lastMatch = -2;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += ti - lastMatch === 1 ? 4 : 2;
      lastMatch = ti;
      qi++;
    }
  }
  return qi === q.length ? score : 0;
}

function buildHaystack(p: PropertyListItem): string {
  return [
    p.name,
    p.city ?? "",
    p.region ?? "",
    p.short_desc ?? "",
    p.reference ?? "",
    p.has_pool ? "piscine" : "",
    p.view_type === "sea" ? "vue mer" : "",
    p.view_type === "panoramic" ? "vue panoramique" : "",
    `${p.bedrooms} chambres`,
    `${p.max_guests} personnes`,
    ...(p.amenities ?? []),
  ].join(" · ");
}

// ──────────────────────────────────────────────────────────────────────

type Props = {
  initialQuery: string;
  villas: PropertyListItem[];
};

export function ListingGrid({ initialQuery, villas }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(initialQuery);
  const deferredQ = useDeferredValue(q); // keep typing snappy on big lists

  const filtered = useMemo(() => {
    if (!deferredQ.trim()) return villas;
    const scored = villas
      .map((v) => ({ v, score: fuzzyScore(deferredQ, buildHaystack(v)) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.map((x) => x.v);
  }, [deferredQ, villas]);

  // ─── Reveal animations ────────────────────────────
  // Re-runs whenever the filtered list size changes — without this, newly
  // rendered cards stay invisible because their `opacity-0` className never
  // gets cleared by a tween. `gsap.from` + `overwrite: "auto"` make this
  // idempotent: cards already visible jump back to their start, then animate
  // forward again, which reads as a clean refresh of the grid.
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set([".lg-search", ".lg-count > *", ".lg-card"], { autoAlpha: 1 });
        return;
      }

      // Ensure end-state first (kills any leftover `opacity-0`), then animate
      // back from the hidden state. `from` reads current values as the END,
      // so we explicitly `set` the end state first to be safe across re-runs.
      gsap.set([".lg-search", ".lg-count > *", ".lg-card"], { clearProps: "opacity,transform" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(
        ".lg-search",
        { autoAlpha: 0, y: 20, duration: 0.8 },
        0.05,
      )
        .from(
          ".lg-count > *",
          { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 },
          "<0.15",
        )
        .from(
          ".lg-card",
          {
            autoAlpha: 0,
            y: 32,
            scale: 0.97,
            duration: 0.75,
            stagger: 0.07,
            ease: "power3.out",
            overwrite: "auto",
          },
          "<0.1",
        );
    },
    { scope: rootRef, dependencies: [filtered.length] },
  );

  return (
    <div ref={rootRef}>
      {/* ─── Search bar ─── */}
      <form
        className="lg-search mb-12 grid grid-cols-1 gap-3 border-y py-6"
        style={{ borderColor: HAIRLINE }}
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex flex-col gap-1.5">
          <span
            className="text-[9px] uppercase"
            style={{ letterSpacing: "0.34em", color: CLAY, opacity: 0.85 }}
          >
            Recherche
          </span>
          <div className="flex items-center gap-3">
            <SearchIcon />
            <input
              name="q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Vue mer · Piscine · Saint-Tropez · Villa…"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-400"
              style={{ color: INK_WARM, letterSpacing: "0.01em" }}
              autoComplete="off"
              spellCheck={false}
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Effacer la recherche"
                className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
                style={{ color: INK_WARM }}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </label>
      </form>

      {/* ─── Count / reset ─── */}
      <div className="lg-count mb-10 flex items-center justify-between">
        <p
          className="font-mono text-[11px] uppercase"
          style={{ letterSpacing: "0.22em", color: CLAY }}
        >
          {String(filtered.length).padStart(2, "0")} villa
          {filtered.length > 1 ? "s" : ""}
          {deferredQ.trim() ? " correspondante" : ""}
          {filtered.length > 1 && deferredQ.trim() ? "s" : ""}
          {!deferredQ.trim() && villas.length !== filtered.length
            ? ` · ${villas.length} au total`
            : ""}
        </p>
        {deferredQ.trim() && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="text-[11px] uppercase transition-opacity hover:opacity-70"
            style={{ letterSpacing: "0.24em", color: INK_WARM }}
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* ─── Grid ─── */}
      {filtered.length === 0 ? (
        <div
          className="border py-24 text-center"
          style={{ borderColor: HAIRLINE, background: CREAM_SOFT }}
        >
          <p
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontStyle: "italic",
              color: INK_WARM,
            }}
          >
            Aucune villa ne correspond à <span className="italic">«&nbsp;{deferredQ}&nbsp;»</span>.
          </p>
          <p className="mt-3 text-sm text-zinc-600">
            Essaie un autre mot, ou écris-nous pour qu&apos;on te trouve la maison qui colle.
          </p>
          <a
            href="mailto:contact@welkomhome.eu"
            className="mt-7 inline-flex items-center gap-3 border px-7 py-3 text-[10px] uppercase text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
            style={{
              borderColor: INK_WARM,
              letterSpacing: "0.3em",
              borderRadius: 2,
            }}
          >
            Nous écrire
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <PropertyCard
              key={p.id}
              property={p}
              index={i}
              total={filtered.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────

function PropertyCard({
  property: p,
  index,
  total,
}: {
  property: PropertyListItem;
  index: number;
  total: number;
}) {
  const featureTag =
    p.has_pool ? "Piscine" :
    p.view_type === "sea" ? "Vue mer" :
    p.view_type === "panoramic" ? "Vue panoramique" :
    p.amenities?.[0] ?? null;

  return (
    <Link href={`/listing/${p.slug}`} className="lg-card group block">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden"
        style={{ background: CREAM_SOFT }}
      >
        {p.cover_photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={p.cover_photo}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-[10px] uppercase"
            style={{ letterSpacing: "0.3em", color: CLAY, opacity: 0.55 }}
          >
            sans photo
          </div>
        )}

        {/* Reference chip */}
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
          {p.reference
            ? `Réf. ${p.reference}`
            : `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </span>

        {/* Hover scrim + arrow */}
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
          <ArrowRight />
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="text-[10px] uppercase"
            style={{ letterSpacing: "0.3em", color: CLAY }}
          >
            {p.city ?? "Côte d'Azur"}
          </p>
          <h3
            className="mt-3 truncate text-[1.55rem] leading-[1.1] md:text-[1.7rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: INK,
            }}
          >
            {p.name}
          </h3>
          <p
            className="mt-2 text-[12px] text-zinc-600"
            style={{ letterSpacing: "0.05em" }}
          >
            {p.bedrooms} chambres · {p.max_guests} personnes
            {featureTag && <span> · {featureTag}</span>}
          </p>
        </div>
        {p.base_price_eur != null && (
          <div className="shrink-0 text-right">
            <p
              className="font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.18em", color: CLAY, opacity: 0.85 }}
            >
              dès
            </p>
            <p className="mt-1 font-mono text-[13px]" style={{ color: INK_WARM }}>
              {p.base_price_eur.toLocaleString("fr-FR")} €
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ color: CLAY, flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
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
  );
}

function ArrowRight() {
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
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
