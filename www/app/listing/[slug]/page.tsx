import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties, type Photo } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [me, property] = await Promise.all([
    getCurrentUser(),
    publicProperties.get(slug),
  ]);

  if (!property) notFound();

  const photos = (property.photos ?? []).slice().sort((a, b) => a.position - b.position);
  // The "gallery" set is the 5 hero photos curated in admin. If the admin
  // hasn't marked anything yet, we fall back to the first 5 by position so
  // the hero never collapses to a single image.
  const galleryFromAdmin = photos.filter((p) => p.category === "gallery");
  const heroPhotos =
    galleryFromAdmin.length > 0 ? galleryFromAdmin.slice(0, 5) : photos.slice(0, 5);
  const cover = heroPhotos[0];
  const others = heroPhotos.slice(1);

  return (
    <div className="min-h-screen bg-zinc-50">
      <SiteHeader me={me} />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Crumbs */}
        <nav className="mb-4 text-sm text-zinc-500">
          <Link href="/listing" className="hover:text-zinc-900">Villas</Link>
          <span className="mx-1.5 text-zinc-400">/</span>
          <span className="text-zinc-700">{property.name}</span>
        </nav>

        {/* Title row */}
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {property.name}
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              {[property.city, property.region, property.country]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          {property.base_price_eur != null && (
            <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-right">
              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                À partir de
              </div>
              <div className="font-mono text-base text-zinc-900">
                {property.base_price_eur.toLocaleString("fr-FR")} €{" "}
                <span className="text-xs text-zinc-500">/ nuit</span>
              </div>
            </div>
          )}
        </header>

        {/* Photo grid hero */}
        <PhotoHero cover={cover} others={others} altBase={property.name} />

        {/* Body */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Left column */}
          <section className="space-y-10">
            {/* Key facts */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Capacité" value={`${property.max_guests} pers.`} />
              <Stat label="Chambres" value={property.bedrooms} />
              <Stat label="Salles de bain" value={property.bathrooms} />
              <Stat
                label="Min. de nuits"
                value={property.min_nights}
              />
            </div>

            {/* Description — admin edits this with a WYSIWYG, so we render HTML.
                Input comes from the trusted admin so no sanitization here, but
                if owner-side editing is ever opened up, sanitize server-side. */}
            {property.description && (
              <section>
                <h2 className="text-xl font-semibold text-zinc-900">À propos</h2>
                <DescriptionBody html={property.description} />
              </section>
            )}

            {/* Highlights */}
            {property.highlights.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-zinc-900">Les plus</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                  {property.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1 w-1 rounded-full bg-zinc-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-zinc-900">Équipements</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Beds */}
            {property.beds && property.beds.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-zinc-900">Couchages</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                  {property.beds
                    .slice()
                    .sort((a, b) => a.position - b.position)
                    .map((b) => (
                      <li
                        key={b.id}
                        className="rounded-md border border-zinc-200 bg-white px-3 py-2"
                      >
                        <span className="font-medium text-zinc-900">
                          {b.room_label ?? "—"}
                        </span>
                        <span className="ml-2 text-zinc-500">
                          {b.count} × {b.bed_type}
                        </span>
                      </li>
                    ))}
                </ul>
              </section>
            )}

            {/* All photos */}
            {photos.length > 0 && (
              <section id="photos">
                <h2 className="text-xl font-semibold text-zinc-900">
                  Photos
                  <span className="ml-2 text-sm font-normal text-zinc-500">
                    ({photos.length})
                  </span>
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.map((p) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={p.id}
                      src={p.url}
                      alt={p.alt ?? property.name}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-md object-cover"
                    />
                  ))}
                </div>
              </section>
            )}
          </section>

          {/* Right column — sticky sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-lg border border-zinc-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-zinc-900">Demander un devis</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Pas de paiement en ligne — on revient vers toi sous 24h.
              </p>
              <a
                href={`mailto:contact@welkomhome.eu?subject=${encodeURIComponent(`Demande — ${property.name}`)}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Nous contacter
              </a>
              <div className="mt-4 space-y-2 text-xs text-zinc-600">
                {property.distance_beach_m != null && (
                  <Row label="Plage" value={`${property.distance_beach_m} m`} />
                )}
                {property.distance_shops_m != null && (
                  <Row label="Commerces" value={`${property.distance_shops_m} m`} />
                )}
                {property.distance_airport_km != null && (
                  <Row label="Aéroport" value={`${property.distance_airport_km} km`} />
                )}
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-zinc-900">Confort</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                <Yes ok={property.has_pool} label={`Piscine${property.pool_heated ? " chauffée" : ""}`} />
                <Yes ok={property.has_ac} label="Climatisation" />
                <Yes ok={property.has_wifi} label="Wi-Fi" />
                <Yes ok={property.has_parking} label={`Parking${property.parking_spots ? ` (${property.parking_spots})` : ""}`} />
                <Yes ok={property.has_jacuzzi} label="Jacuzzi" />
                <Yes ok={property.has_sauna} label="Sauna / hammam" />
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// Renders admin-authored HTML (from the TipTap editor). Content is sanitized
// via DOMPurify with a tag/attr allowlist matching what the editor can emit,
// so even a future trust-boundary change (eg. owner-side editing) stays safe.
// Falls back to plain paragraphs for legacy plain-text descriptions.
function DescriptionBody({ html }: { html: string }) {
  const looksLikeHtml = /<\/?(p|h[1-6]|ul|ol|li|strong|em|u|blockquote|br)/i.test(html);
  if (looksLikeHtml) {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "p", "br", "strong", "em", "u", "s",
        "h1", "h2", "h3",
        "ul", "ol", "li",
        "blockquote", "code", "pre",
      ],
      ALLOWED_ATTR: [],
    });
    return (
      <div
        className="prose prose-sm prose-zinc mt-3 max-w-none text-zinc-700"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    );
  }
  return (
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-700">
      {html.split(/\r?\n\r?\n+/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function PhotoHero({
  cover,
  others,
  altBase,
}: {
  cover?: Photo;
  others: Photo[];
  altBase: string;
}) {
  if (!cover) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-zinc-100 text-sm text-zinc-400">
        Aucune photo
      </div>
    );
  }
  const side = others.slice(0, 4);
  return (
    <div className="grid h-[420px] grid-cols-1 gap-2 overflow-hidden rounded-xl sm:grid-cols-4 sm:grid-rows-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover.url}
        alt={cover.alt ?? altBase}
        className="h-full w-full object-cover sm:col-span-2 sm:row-span-2"
      />
      {side.map((p) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={p.id}
          src={p.url}
          alt={p.alt ?? altBase}
          loading="lazy"
          className="hidden h-full w-full object-cover sm:block"
        />
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3">
      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className="font-mono text-zinc-700">{value}</span>
    </div>
  );
}

function Yes({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
          ok ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-400"
        }`}
        aria-hidden
      >
        {ok ? "✓" : "—"}
      </span>
      <span className={ok ? "text-zinc-700" : "text-zinc-400 line-through"}>{label}</span>
    </li>
  );
}
