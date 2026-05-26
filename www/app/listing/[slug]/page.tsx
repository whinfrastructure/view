import sanitizeHtml from "sanitize-html";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mark } from "@/components/mark";
import { PhotoGallery } from "@/components/photo-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties, type Photo, type PropertyDetail } from "@/lib/properties";

export const dynamic = "force-dynamic";

// Magazine palette — sections strictly alternate between CREAM and WHITE.
const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const WHITE = "#ffffff";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";
const HAIRLINE_INK = "rgba(26, 26, 26, 0.12)";

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
  const galleryFromAdmin = photos.filter((p) => p.category === "gallery");
  const heroPhotos =
    galleryFromAdmin.length > 0 ? galleryFromAdmin.slice(0, 5) : photos.slice(0, 5);

  // Pull two interesting photos to use as full-bleed breaks between chapters.
  // We pick the 6th and 11th to avoid clashing with the hero strip.
  const breakPhoto1 = photos[5] ?? photos[2] ?? null;
  const breakPhoto2 = photos[10] ?? photos[7] ?? photos[3] ?? null;

  const publishedReviews = (property.reviews ?? []).filter((r) => r.published);

  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <SiteHeader me={me} />

      {/* ─── Hero photo block ─── */}
      <PhotoHero photos={heroPhotos} altBase={property.name} totalCount={photos.length} />

      {/* ─── I. PRÉSENTATION (cream) ──────────────────────────────────── */}
      <Chapter bg={CREAM} number="I" title="Présentation" anchor="intro">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: huge chapter mark (decorative) */}
          <div className="hidden lg:col-span-2 lg:block">
            <p
              className="font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY }}
            >
              {property.reference ? `Réf. ${property.reference}` : "Welkom Home"}
            </p>
            <span
              aria-hidden
              className="mt-8 block text-[5rem] leading-[0.85] italic"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
                color: CLAY,
                opacity: 0.35,
              }}
            >
              {property.city?.slice(0, 1) ?? "W"}
            </span>
          </div>

          {/* Center: title + intro */}
          <div className="lg:col-span-7">
            <h1
              className="text-4xl leading-[1.05] md:text-5xl lg:text-[3.8rem]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                color: INK_WARM,
              }}
            >
              {splitVillaName(property.name)}
            </h1>
            <p
              className="mt-5 text-[12px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY }}
            >
              {[property.city, property.region, property.country].filter(Boolean).join(" · ")}
            </p>
            {property.short_desc && (
              <p
                className="mt-7 max-w-xl text-[16px] leading-[1.7]"
                style={{ color: INK_WARM, opacity: 0.92 }}
              >
                {property.short_desc}
              </p>
            )}
          </div>

          {/* Right: price + CTA */}
          {property.base_price_eur != null && (
            <div className="lg:col-span-3">
              <div
                className="border p-7"
                style={{ borderColor: HAIRLINE, background: CREAM_SOFT, borderRadius: 2 }}
              >
                <p
                  className="font-mono text-[10px] uppercase"
                  style={{ letterSpacing: "0.3em", color: CLAY }}
                >
                  À partir de
                </p>
                <p className="mt-2 font-mono text-2xl" style={{ color: INK_WARM }}>
                  {property.base_price_eur.toLocaleString("fr-FR")} €
                </p>
                <p
                  className="text-[10px] uppercase"
                  style={{ letterSpacing: "0.22em", color: INK_WARM, opacity: 0.7 }}
                >
                  par nuit · {property.min_nights}+ nuits
                </p>
                <a
                  href={`mailto:contact@welkomhome.eu?subject=${encodeURIComponent(
                    `Demande — ${property.name}`,
                  )}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[10px] uppercase transition-opacity hover:opacity-90"
                  style={{
                    background: "#3a2415",
                    color: CREAM,
                    letterSpacing: "0.28em",
                    borderRadius: 2,
                  }}
                >
                  Demander un devis
                </a>
              </div>
            </div>
          )}
        </div>
      </Chapter>

      {/* ─── II. LES CHIFFRES (white, horizontal numbers band) ────────── */}
      <Chapter bg={WHITE} number="II" title="Les chiffres" anchor="chiffres" hairlineDark>
        <div
          className="grid grid-cols-2 gap-y-12 border-t border-b py-12 sm:grid-cols-3 lg:grid-cols-6"
          style={{ borderColor: HAIRLINE_INK }}
        >
          <BigStat icon={<IconUsers />} label="Personnes" value={property.max_guests} />
          <BigStat icon={<IconBed />} label="Chambres" value={property.bedrooms} />
          <BigStat icon={<IconBath />} label="Salles d'eau" value={property.bathrooms} />
          {property.surface_m2 != null && (
            <BigStat icon={<IconRuler />} label="Surface" value={property.surface_m2} unit="m²" />
          )}
          {property.terrain_m2 != null && (
            <BigStat icon={<IconTree />} label="Terrain" value={property.terrain_m2} unit="m²" />
          )}
          {/* Filter out the "none" value the backend sometimes returns when no
              view has been picked — there's nothing useful to display. */}
          {property.view_type && property.view_type !== "none" && (
            <BigStat icon={<IconEye />} label="Vue" valueText={viewLabel(property.view_type)} />
          )}
        </div>
      </Chapter>

      {/* ─── Full-bleed photo break #1 ─────────────────────────────────── */}
      {breakPhoto1 && (
        <FullBleedPhoto
          photo={breakPhoto1}
          altBase={property.name}
          caption={`${property.city ?? "Côte d'Azur"} — ${property.name}`}
          quote={
            property.tags.length > 0
              ? property.tags.slice(0, 1).join("")
              : undefined
          }
        />
      )}

      {/* ─── III. L'ESPRIT (cream, narrow column for prose) ──────────── */}
      {property.description && (
        <Chapter bg={CREAM} number="III" title="L'esprit de la maison" anchor="esprit">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <p
                className="text-[12px] uppercase italic"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  letterSpacing: "0.18em",
                  color: CLAY,
                }}
              >
                Une parenthèse
                <br />
                <Mark>au calme</Mark>.
              </p>
              <div className="mt-8 hidden h-px w-16 lg:block" style={{ background: CLAY, opacity: 0.6 }} />
            </aside>
            <div className="max-w-2xl lg:col-span-8">
              <DescriptionBody html={property.description} />
            </div>
          </div>
        </Chapter>
      )}

      {/* ─── IV. CE QUI LA DISTINGUE (white, numbered highlights) ───── */}
      {property.highlights.length > 0 && (
        <Chapter bg={WHITE} number="IV" title="Ce qui la distingue" anchor="highlights" hairlineDark>
          <ol className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {property.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-6">
                <span
                  className="font-mono text-[11px] uppercase"
                  style={{ letterSpacing: "0.28em", color: CLAY, paddingTop: 3 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex-1 text-[16px] leading-[1.6]"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    color: INK_WARM,
                  }}
                >
                  {h}
                </span>
              </li>
            ))}
          </ol>
        </Chapter>
      )}

      {/* ─── Full-bleed photo break #2 ─────────────────────────────────── */}
      {breakPhoto2 && (
        <FullBleedPhoto
          photo={breakPhoto2}
          altBase={property.name}
          caption={property.region ?? "Côte d'Azur, France"}
          dark
        />
      )}

      {/* ─── V. COUCHAGES (cream, card grid) ───────────────────────── */}
      {property.beds && property.beds.length > 0 && (
        <Chapter bg={CREAM} number="V" title="Couchages" anchor="beds">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {property.beds
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((b, i) => (
                <div
                  key={b.id}
                  className="flex items-baseline justify-between gap-4 border-b py-6"
                  style={{ borderColor: HAIRLINE }}
                >
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase"
                      style={{ letterSpacing: "0.28em", color: CLAY }}
                    >
                      {String(i + 1).padStart(2, "0")} · {b.room_label ?? "Chambre"}
                    </p>
                    <p
                      className="mt-2 text-2xl"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        color: INK_WARM,
                      }}
                    >
                      {bedLabel(b.bed_type)}
                    </p>
                  </div>
                  <span
                    className="font-mono text-2xl"
                    style={{ color: INK_WARM, opacity: 0.6 }}
                  >
                    ×{b.count}
                  </span>
                </div>
              ))}
          </div>
        </Chapter>
      )}

      {/* ─── VI. ÉQUIPEMENTS (white, 3-col flat list) ─────────────────── */}
      {property.amenities.length > 0 && (
        <Chapter
          bg={WHITE}
          number="VI"
          title="Ce que vous trouverez"
          anchor="amenities"
          hairlineDark
        >
          <ul
            className="grid grid-cols-1 gap-x-12 gap-y-3 border-t pt-10 sm:grid-cols-2 lg:grid-cols-3"
            style={{ borderColor: HAIRLINE_INK }}
          >
            {property.amenities.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 border-b py-3 text-[14px]"
                style={{ borderColor: HAIRLINE_INK, color: "#1a1a1a" }}
              >
                <span
                  className="font-mono text-[10px]"
                  style={{ color: CLAY, opacity: 0.6 }}
                >
                  +
                </span>
                {a}
              </li>
            ))}
          </ul>
        </Chapter>
      )}

      {/* ─── VII. TARIFS (cream, table) ────────────────────────────── */}
      {property.seasons && property.seasons.length > 0 && (
        <Chapter bg={CREAM} number="VII" title="Selon la saison" anchor="seasons">
          <div className="border" style={{ borderColor: HAIRLINE, borderRadius: 2 }}>
            <div
              className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b px-6 py-4"
              style={{ borderColor: HAIRLINE, background: CREAM_SOFT }}
            >
              <p
                className="font-mono text-[10px] uppercase"
                style={{ letterSpacing: "0.28em", color: CLAY }}
              >
                Saison
              </p>
              <p
                className="font-mono text-[10px] uppercase"
                style={{ letterSpacing: "0.28em", color: CLAY }}
              >
                Prix / nuit
              </p>
            </div>
            {property.seasons
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((s, idx, arr) => (
                <div
                  key={s.id}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 px-6 py-5"
                  style={{
                    borderBottom:
                      idx === arr.length - 1 ? "none" : `1px solid ${HAIRLINE}`,
                  }}
                >
                  <div>
                    <p
                      className="text-xl"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontStyle: "italic",
                        color: INK_WARM,
                      }}
                    >
                      {s.name}
                    </p>
                    <p
                      className="mt-1 font-mono text-[11px]"
                      style={{ color: CLAY, opacity: 0.8 }}
                    >
                      {fmtDateRange(s.start_date, s.end_date)}
                    </p>
                  </div>
                  <p className="font-mono text-lg" style={{ color: INK_WARM }}>
                    {s.price_per_night_eur.toLocaleString("fr-FR")} €
                  </p>
                </div>
              ))}
          </div>
        </Chapter>
      )}

      {/* ─── VIII. TÉMOIGNAGES (white, pull-quote layout) ─────────────── */}
      {publishedReviews.length > 0 && (
        <Chapter
          bg={WHITE}
          number="VIII"
          title="Ils y ont séjourné"
          anchor="reviews"
          hairlineDark
        >
          <div className="space-y-16">
            {publishedReviews.slice(0, 3).map((r, i) => (
              <figure
                key={r.id}
                className={`grid grid-cols-1 gap-8 border-t pt-12 lg:grid-cols-12 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
                style={{ borderColor: HAIRLINE_INK }}
              >
                <div className="lg:col-span-3 lg:[direction:ltr]">
                  {r.rating != null && (
                    <p
                      className="font-mono text-[13px]"
                      style={{ color: CLAY, letterSpacing: "0.2em" }}
                    >
                      {"★".repeat(r.rating)}
                      <span style={{ opacity: 0.25 }}>{"★".repeat(5 - r.rating)}</span>
                    </p>
                  )}
                  <p
                    className="mt-4 text-[11px] uppercase"
                    style={{ letterSpacing: "0.28em", color: CLAY }}
                  >
                    {r.author_name}
                  </p>
                  {r.author_city && (
                    <p
                      className="font-mono text-[11px] opacity-70"
                      style={{ color: INK_WARM }}
                    >
                      {r.author_city}
                    </p>
                  )}
                </div>
                <blockquote
                  className="text-[1.6rem] leading-[1.3] lg:col-span-9 lg:text-[2rem] lg:[direction:ltr]"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    color: INK_WARM,
                  }}
                >
                  « {r.body} »
                </blockquote>
              </figure>
            ))}
          </div>
        </Chapter>
      )}

      {/* ─── IX. CONFORT & INFOS PRATIQUES (cream, 2-col split) ───── */}
      <Chapter bg={CREAM} number="IX" title="Confort & pratique" anchor="confort">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Confort list */}
          <div>
            <p
              className="text-[10px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY, opacity: 0.85 }}
            >
              Le confort
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Comfort ok={property.has_pool} label={poolLabel(property)} />
              <Comfort ok={property.has_jacuzzi} label="Jacuzzi" />
              <Comfort ok={property.has_sauna} label="Sauna" />
              <Comfort ok={property.has_fitness} label="Salle de sport" />
              <Comfort ok={property.has_pool_house} label="Pool house" />
              <Comfort ok={property.has_ac} label="Climatisation" />
              <Comfort ok={property.has_wifi} label="Wi-Fi" />
              <Comfort
                ok={property.has_parking}
                label={`Parking${property.parking_spots ? ` (${property.parking_spots})` : ""}`}
              />
            </ul>

            {(property.pets_allowed || property.smoking_allowed || property.parties_allowed) && (
              <div
                className="mt-10 flex flex-wrap gap-2 border-t pt-6"
                style={{ borderColor: HAIRLINE }}
              >
                {property.pets_allowed && <Pill>Animaux acceptés</Pill>}
                {property.smoking_allowed && <Pill>Fumeurs acceptés</Pill>}
                {property.parties_allowed && <Pill>Événements possibles</Pill>}
              </div>
            )}
          </div>

          {/* Distances */}
          <div>
            <p
              className="text-[10px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY, opacity: 0.85 }}
            >
              Distances
            </p>
            <ul className="mt-6 space-y-4">
              {property.distance_beach_m != null && (
                <DistanceRow label="Plage" value={fmtMeters(property.distance_beach_m)} />
              )}
              {property.distance_shops_m != null && (
                <DistanceRow label="Commerces" value={fmtMeters(property.distance_shops_m)} />
              )}
              {property.distance_airport_km != null && (
                <DistanceRow
                  label="Aéroport"
                  value={`${property.distance_airport_km} km`}
                />
              )}
              {property.distance_train_km != null && (
                <DistanceRow label="Gare" value={`${property.distance_train_km} km`} />
              )}
            </ul>
          </div>
        </div>
      </Chapter>

      {/* ─── X. GALERIE (white, full lightbox) ──────────────────────── */}
      {photos.length > 0 && (
        <Chapter
          bg={WHITE}
          number="X"
          title={`${photos.length} photo${photos.length > 1 ? "s" : ""}`}
          anchor="photos"
          hairlineDark
        >
          <PhotoGallery photos={photos} altBase={property.name} />
        </Chapter>
      )}

      {/* ─── XI. RÉSERVATION (cream, prominent CTA) ─────────────────── */}
      <Chapter bg={CREAM} number="XI" title="Réserver la maison" anchor="reserver" centered>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-[15px] leading-[1.7]"
            style={{ color: INK_WARM, opacity: 0.85 }}
          >
            Pas de paiement en ligne. Écris-nous tes dates et tes envies, on revient
            sous 24h avec un devis ferme et toutes les options possibles autour de la maison.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:contact@welkomhome.eu?subject=${encodeURIComponent(
                `Demande — ${property.name}`,
              )}`}
              className="inline-flex items-center gap-3 px-9 py-4 text-[11px] uppercase transition-opacity hover:opacity-90"
              style={{
                background: "#3a2415",
                color: CREAM,
                letterSpacing: "0.3em",
                borderRadius: 2,
              }}
            >
              Demander un devis
            </a>
            <Link
              href="/listing"
              className="inline-flex items-center gap-3 border px-9 py-4 text-[11px] uppercase text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
              style={{
                borderColor: INK_WARM,
                letterSpacing: "0.3em",
                borderRadius: 2,
              }}
            >
              Voir d'autres villas
            </Link>
          </div>
        </div>
      </Chapter>

      <SiteFooter variant="white" />
    </div>
  );
}

// ─── Chapter wrapper ──────────────────────────────────────────────

function Chapter({
  bg,
  number,
  title,
  anchor,
  centered,
  hairlineDark,
  children,
}: {
  bg: string;
  number: string;
  title: string;
  anchor?: string;
  centered?: boolean;
  hairlineDark?: boolean;
  children: React.ReactNode;
}) {
  const headerColor = bg === WHITE ? "#1a1a1a" : INK_WARM;
  return (
    <section
      id={anchor}
      className="scroll-mt-24"
      style={{ background: bg }}
    >
      <div className="mx-auto max-w-7xl px-8 py-24 lg:px-12 lg:py-32">
        {/* Chapter header with roman numeral marker */}
        <header
          className={`mb-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b pb-6 ${
            centered ? "flex-col items-center text-center" : ""
          }`}
          style={{ borderColor: hairlineDark ? HAIRLINE_INK : HAIRLINE }}
        >
          <span
            className="font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.34em", color: CLAY }}
          >
            Chapitre {number}
          </span>
          <h2
            className="text-3xl leading-[1.05] md:text-4xl lg:text-[2.6rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontStyle: "italic",
              color: headerColor,
            }}
          >
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}

// ─── Photo hero (above all chapters) ──────────────────────────────

function PhotoHero({
  photos,
  altBase,
  totalCount,
}: {
  photos: Photo[];
  altBase: string;
  totalCount: number;
}) {
  const cover = photos[0];
  const side = photos.slice(1, 5);

  if (!cover) {
    return (
      <div
        className="flex aspect-[16/7] w-full items-center justify-center"
        style={{ background: CREAM_SOFT, color: CLAY }}
      >
        <span className="text-[11px] uppercase" style={{ letterSpacing: "0.32em" }}>
          Aucune photo
        </span>
      </div>
    );
  }

  const positions = [
    "md:col-start-3 md:row-start-1",
    "md:col-start-4 md:row-start-1",
    "md:col-start-3 md:row-start-2",
    "md:col-start-4 md:row-start-2",
  ];

  return (
    <div className="relative grid h-[60vh] min-h-[480px] grid-cols-4 grid-rows-2 gap-2 px-2 pt-2 md:h-[72vh] md:gap-3 md:px-3 md:pt-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover.url}
        alt={cover.alt ?? altBase}
        className="col-span-4 row-span-2 h-full w-full object-cover md:col-span-2"
      />
      {side.map((p, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={p.id}
          src={p.url}
          alt={p.alt ?? altBase}
          loading="lazy"
          className={`hidden h-full w-full object-cover md:block ${positions[i]}`}
        />
      ))}

      {totalCount > 0 && (
        <a
          href="#photos"
          className="absolute bottom-6 right-6 inline-flex items-center gap-3 border border-white/80 bg-black/30 px-5 py-2.5 text-[10px] uppercase text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          style={{ letterSpacing: "0.28em", borderRadius: 2 }}
        >
          Voir les {totalCount} photos
        </a>
      )}
    </div>
  );
}

// ─── Full-bleed photo break ───────────────────────────────────────

function FullBleedPhoto({
  photo,
  altBase,
  caption,
  quote,
  dark = false,
}: {
  photo: Photo;
  altBase: string;
  caption: string;
  quote?: string;
  dark?: boolean;
}) {
  return (
    <figure className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt={photo.alt ?? altBase}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle scrim so caption + quote read on any photo */}
      {(dark || quote) && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: dark
              ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      )}

      {quote && (
        <blockquote
          className="absolute inset-x-0 top-1/2 mx-auto max-w-3xl -translate-y-1/2 px-8 text-center text-3xl italic md:text-4xl lg:text-5xl"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            color: "#f3ecd9",
            textShadow: "0 2px 24px rgba(0,0,0,0.45)",
          }}
        >
          « {quote} »
        </blockquote>
      )}

      <figcaption
        className="absolute bottom-6 left-6 font-mono text-[10px] uppercase text-white/85"
        style={{ letterSpacing: "0.3em" }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

// ─── Stat / row helpers ───────────────────────────────────────────

function BigStat({
  icon,
  label,
  value,
  valueText,
  unit,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: number;
  valueText?: string;
  unit?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {icon && (
        <span aria-hidden className="mb-5" style={{ color: CLAY }}>
          {icon}
        </span>
      )}
      <p
        className="text-[5rem] leading-[0.85] tracking-tight md:text-[6rem]"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 400,
          color: "#1a1a1a",
        }}
      >
        {value ?? valueText}
        {unit && (
          <span
            className="ml-1 text-[14px] uppercase opacity-60"
            style={{ letterSpacing: "0.2em" }}
          >
            {unit}
          </span>
        )}
      </p>
      <p
        className="mt-3 font-mono text-[10px] uppercase"
        style={{ letterSpacing: "0.3em", color: CLAY }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── Icons (1.5px stroke, 28px box, currentColor inherits from parent) ───

function IconUsers() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M22 19v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBed() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a3 3 0 0 1 3 3v9" />
      <path d="M2 17h20" />
      <circle cx="7" cy="11" r="1.6" />
    </svg>
  );
}

function IconBath() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v.5" />
      <path d="M2 12h20" />
      <path d="M3 12v3a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-3" />
      <path d="M5 19l-1.5 3" />
      <path d="M19 19l1.5 3" />
    </svg>
  );
}

function IconRuler() {
  // Square/surface (interior surface in m²)
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="0.5" />
      <path d="M3 9h3" />
      <path d="M3 15h3" />
      <path d="M9 21v-3" />
      <path d="M15 21v-3" />
    </svg>
  );
}

function IconTree() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2c-3 2.5-5 5-5 8a5 5 0 0 0 4 4.9V22h2v-7.1A5 5 0 0 0 17 10c0-3-2-5.5-5-8z" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DistanceRow({ label, value }: { label: string; value: string }) {
  return (
    <li
      className="flex items-baseline justify-between gap-4 border-b pb-3"
      style={{ borderColor: HAIRLINE }}
    >
      <span
        className="text-[14px]"
        style={{ color: INK_WARM, opacity: 0.85 }}
      >
        {label}
      </span>
      <span
        className="font-mono text-[14px]"
        style={{ color: INK_WARM }}
      >
        {value}
      </span>
    </li>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="border px-3 py-1 text-[10px] uppercase"
      style={{
        borderColor: HAIRLINE,
        color: INK_WARM,
        letterSpacing: "0.24em",
        borderRadius: 2,
      }}
    >
      {children}
    </span>
  );
}

function Comfort({ ok, label }: { ok: boolean; label: string }) {
  if (!ok) return null;
  return (
    <li
      className="flex items-center gap-3 border-b pb-3 text-[14px]"
      style={{ borderColor: HAIRLINE, color: INK_WARM }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: CLAY, flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
      <span>{label}</span>
    </li>
  );
}

// ─── Description body ─────────────────────────────────────────────

function DescriptionBody({ html }: { html: string }) {
  const looksLikeHtml = /<\/?(p|h[1-6]|ul|ol|li|strong|em|u|blockquote|br)/i.test(html);
  if (looksLikeHtml) {
    const clean = sanitizeHtml(html, {
      allowedTags: [
        "p", "br", "strong", "em", "u", "s",
        "h1", "h2", "h3",
        "ul", "ol", "li",
        "blockquote", "code", "pre",
      ],
      allowedAttributes: {},
    });
    return (
      <div
        className="prose prose-zinc max-w-none text-[16px] leading-[1.85]"
        style={{ color: "#3a2415" }}
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    );
  }
  return (
    <div className="space-y-5 text-[16px] leading-[1.85]" style={{ color: "#3a2415" }}>
      {html.split(/\r?\n\r?\n+/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────

function splitVillaName(name: string): React.ReactNode {
  const match = /^(Villa)\s+(.+)$/i.exec(name);
  if (!match) return name;
  return (
    <>
      <span>{match[1]} </span>
      <span className="italic">{match[2]}</span>
    </>
  );
}

function bedLabel(t: string): string {
  switch (t) {
    case "double": return "Lit double";
    case "queen": return "Queen size";
    case "king": return "King size";
    case "single": return "Lit simple";
    case "sofa-bed": return "Canapé-lit";
    case "baby-cot": return "Lit bébé";
    case "bunk": return "Lits superposés";
    default: return t;
  }
}

function viewLabel(t: string): string {
  switch (t) {
    case "sea": return "Mer";
    case "panoramic": return "Pano";
    case "garden": return "Jardin";
    case "pool": return "Piscine";
    case "mountain": return "Montagne";
    default: return t;
  }
}

function poolLabel(p: PropertyDetail): string {
  if (!p.has_pool) return "Piscine";
  const bits: string[] = ["Piscine"];
  if (p.pool_heated) bits.push("chauffée");
  if (p.pool_infinity) bits.push("à débordement");
  return bits.join(" ");
}

function fmtMeters(m: number): string {
  return m >= 1000 ? `${(m / 1000).toFixed(1).replace(".", ",")} km` : `${m} m`;
}

function fmtDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;
  return `${fmt(s)} — ${fmt(e)}`;
}
