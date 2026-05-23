import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties, type PropertyListItem } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Pull a few featured villas to anchor the landing visually. If the backend
  // is unreachable we just skip the section instead of failing the home page.
  let featured: PropertyListItem[] = [];
  try {
    const list = await publicProperties.list({ page: 1, limit: 3, sort: "created_at", order: "desc" });
    featured = list.data;
  } catch {
    /* soft-fail */
  }

  const me = await getCurrentUser();

  return (
    <>
      <SiteHeader me={me} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Côte d&apos;Azur · Saint-Tropez → Les Issambres
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Des villas d&apos;exception,
              <br />
              <span className="italic text-zinc-700">une équipe qui sait recevoir.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-600">
              Welkom Home centralise les plus belles villas privées de la Côte d&apos;Azur.
              Conciergerie sur place, calendriers synchronisés, devis sous 24h.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/listing"
                className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Voir les villas
              </Link>
              <a
                href="mailto:contact@welkomhome.eu"
                className="rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Nous contacter
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-zinc-500">
              <Stat n="50+" label="villas centralisées" />
              <Stat n="15min" label="temps de réponse" />
              <Stat n="7/7" label="conciergerie" />
            </div>
          </div>

          {/* Right column — featured photo collage */}
          <div className="grid h-[420px] grid-cols-2 grid-rows-2 gap-2 lg:h-auto">
            {featured[0]?.cover_photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={featured[0].cover_photo}
                alt={featured[0].name}
                className="col-span-2 h-full w-full rounded-lg object-cover"
              />
            ) : (
              <div className="col-span-2 h-full w-full rounded-lg bg-gradient-to-br from-amber-100 via-amber-50 to-emerald-50" />
            )}
            {featured.slice(1, 3).map((p) =>
              p.cover_photo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={p.id}
                  src={p.cover_photo}
                  alt={p.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div
                  key={p.id}
                  className="h-full w-full rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200"
                />
              ),
            )}
          </div>
        </div>
      </section>

      {/* Featured villas */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                Sélection
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                Coup de cœur du moment
              </h2>
            </div>
            <Link
              href="/listing"
              className="text-sm font-medium text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline"
            >
              Tout voir →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <MiniCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Value props */}
      <section className="border-y border-zinc-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Notre approche
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
            Une location, sans les frictions.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Catalogue centralisé"
              body="Toutes nos villas dans une seule app, avec calendriers à jour en temps réel — fini les doubles bookings."
            />
            <Feature
              title="Conciergerie sur place"
              body="Une équipe locale qui connaît chaque villa. Accueil personnalisé, prestataires triés, anglophones."
            />
            <Feature
              title="Devis en 24h"
              body="Pas de paiement en ligne — on étudie ta demande et on revient avec un devis ferme sous une journée."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Prêt à trouver ta villa ?
          </h2>
          <p className="mt-3 text-sm text-zinc-300">
            Explore le catalogue ou raconte-nous ton projet — on te recommande la villa qui colle.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/listing"
              className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
            >
              Voir les villas
            </Link>
            <a
              href="mailto:contact@welkomhome.eu"
              className="rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              contact@welkomhome.eu
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-zinc-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white">
              w
            </span>
            <span>© {new Date().getFullYear()} Welkom Home</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/listing" className="hover:text-zinc-900">Villas</Link>
            <a href="mailto:contact@welkomhome.eu" className="hover:text-zinc-900">
              Contact
            </a>
            <span className="font-mono">+33 668 192 755</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-lg text-zinc-900">{n}</div>
      <div className="text-zinc-500">{label}</div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</p>
    </div>
  );
}

function MiniCard({ property: p }: { property: PropertyListItem }) {
  return (
    <Link
      href={`/listing/${p.slug}`}
      className="group block overflow-hidden rounded-lg border border-zinc-200 bg-white"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        {p.cover_photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={p.cover_photo}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="truncate text-base font-semibold text-zinc-900">{p.name}</h3>
        <p className="mt-1 truncate text-sm text-zinc-600">
          {p.city ?? "—"} · {p.bedrooms} ch · {p.max_guests} pers
        </p>
      </div>
    </Link>
  );
}
