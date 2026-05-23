import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties, type PropertyListItem } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function ListingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; city?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const [me, list] = await Promise.all([
    getCurrentUser(),
    publicProperties.list({
      page,
      limit: 24,
      q: sp.q,
      city: sp.city,
      sort: "created_at",
      order: "desc",
    }),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-900">
            Welkom Home
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/listing" className="text-zinc-700 hover:text-zinc-900">Villas</Link>
            {me ? (
              <UserMenu email={me.email} firstName={me.first_name} />
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
              >
                Se connecter
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Catalogue</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900">
              {list.pagination.total} villa{list.pagination.total > 1 ? "s" : ""}
              <span className="ml-1 text-zinc-500 italic">à la location</span>
            </h1>
          </div>
        </div>

        {/* Filters */}
        <form className="mb-8 flex flex-wrap gap-2">
          <input
            name="q"
            type="search"
            defaultValue={sp.q ?? ""}
            placeholder="Recherche par nom, description…"
            className="flex-1 min-w-64 max-w-md rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100"
          />
          <input
            name="city"
            type="text"
            defaultValue={sp.city ?? ""}
            placeholder="Ville"
            className="w-40 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-100"
          />
          <button
            type="submit"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Filtrer
          </button>
        </form>

        {/* Grid */}
        {list.data.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-white py-16 text-center text-sm text-zinc-500">
            Aucune villa ne correspond à ces critères.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.data.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {list.pagination.total_pages > 1 && (
          <div className="mt-10 flex items-center justify-between text-sm text-zinc-600">
            <span>
              Page {list.pagination.page} / {list.pagination.total_pages}
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={hrefWithPage(sp, page - 1)}
                  className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 hover:bg-zinc-50"
                >
                  ← Précédent
                </Link>
              )}
              {page < list.pagination.total_pages && (
                <Link
                  href={hrefWithPage(sp, page + 1)}
                  className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 hover:bg-zinc-50"
                >
                  Suivant →
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function PropertyCard({ property: p }: { property: PropertyListItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] w-full bg-zinc-100">
        {p.cover_photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.cover_photo}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
            sans photo
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate text-base font-semibold text-zinc-900">{p.name}</h3>
          {p.base_price_eur != null && (
            <span className="shrink-0 font-mono text-xs text-zinc-700">
              {p.base_price_eur.toLocaleString("fr-FR")} €/n
            </span>
          )}
        </div>
        <p className="mt-1 truncate text-sm text-zinc-600">
          {p.city ?? "—"} · {p.bedrooms} ch · {p.max_guests} pers
        </p>
        {p.short_desc && (
          <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{p.short_desc}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.has_pool && <Tag label="Piscine" />}
          {p.view_type === "sea" && <Tag label="Vue mer" />}
          {p.view_type === "panoramic" && <Tag label="Vue pano" />}
          {p.amenities?.slice(0, 2).map((a) => (
            <Tag key={a} label={a} />
          ))}
        </div>
      </div>
    </article>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-600">
      {label}
    </span>
  );
}

function UserMenu({ email, firstName }: { email: string; firstName: string | null }) {
  const display = firstName || email.split("@")[0];
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-600">{display}</span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}

function hrefWithPage(sp: Record<string, string | undefined>, page: number): string {
  const u = new URLSearchParams();
  if (sp.q) u.set("q", sp.q);
  if (sp.city) u.set("city", sp.city);
  u.set("page", String(page));
  return "/listing?" + u.toString();
}
