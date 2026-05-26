import { ListingGrid } from "@/components/listing-grid";
import { Mark } from "@/components/mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

const CREAM = "#f3ecd9";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";

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

      <SiteFooter variant="white" />
    </div>
  );
}
