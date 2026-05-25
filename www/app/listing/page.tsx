import Link from "next/link";
import { ListingGrid } from "@/components/listing-grid";
import { Mark } from "@/components/mark";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";

export default async function ListingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;

  // Fetch a generous batch so client-side fuzzy can operate on the whole
  // catalogue. The brand currently lists < 100 villas; well below this limit.
  const [me, list] = await Promise.all([
    getCurrentUser(),
    publicProperties.list({
      page: 1,
      limit: 100,
      sort: "created_at",
      order: "desc",
    }),
  ]);

  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <SiteHeader me={me} />

      <main className="mx-auto max-w-7xl px-8 py-16 lg:px-12 lg:py-24">
        {/* Editorial header */}
        <header className="mb-14 max-w-3xl">
          <p
            className="text-[11px] uppercase"
            style={{ letterSpacing: "0.34em", color: CLAY }}
          >
            Notre catalogue
          </p>
          <h1
            className="mt-4 text-4xl leading-[1.08] md:text-5xl lg:text-[3.4rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: INK_WARM,
            }}
          >
            {list.pagination.total} villa{list.pagination.total > 1 ? "s" : ""}{" "}
            <Mark>à la location</Mark>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-zinc-700">
            Entre Saint-Tropez et Les Issambres, des maisons triées sur le volet —
            calendriers à jour en temps réel, devis sous 24h, conciergerie sur place.
          </p>
        </header>

        {/* Client grid handles search + filtering live. Initial query is read
            from the URL so a deep-link like /listing?q=piscine still works. */}
        <ListingGrid initialQuery={sp.q ?? ""} villas={list.data} />
      </main>

      {/* Minimal footer to match home */}
      <footer
        className="mt-24 border-t py-10"
        style={{ background: CREAM_SOFT, borderColor: HAIRLINE }}
      >
        <div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-8 text-xs sm:flex-row lg:px-12"
          style={{ color: INK_WARM, opacity: 0.85 }}
        >
          <div className="flex items-center gap-3">
            <span style={{ letterSpacing: "0.3em" }} className="uppercase">
              Welkom Home
            </span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="uppercase tracking-widest hover:opacity-70">
              Accueil
            </Link>
            <a
              href="mailto:contact@welkomhome.eu"
              className="uppercase tracking-widest hover:opacity-70"
            >
              Contact
            </a>
            <span className="font-mono">+33 668 192 755</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
