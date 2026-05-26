import { ListingGrid } from "@/components/listing-grid";
import { ListingHero } from "@/components/listing-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

const CREAM = "#f3ecd9";

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

      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <ListingHero total={list.pagination.total} />

        {/* Client grid handles search + filtering live. Initial query is read
            from the URL so a deep-link like /listing?q=piscine still works. */}
        <ListingGrid initialQuery={sp.q ?? ""} villas={list.data} />
      </main>

      <SiteFooter variant="white" />
    </div>
  );
}
