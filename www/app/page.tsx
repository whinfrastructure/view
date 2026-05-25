import Link from "next/link";
import { BrandStatement } from "@/components/brand-statement";
import { DualCtaSection } from "@/components/dual-cta-section";
import { EditorialSection } from "@/components/editorial-section";
import { HomeHero } from "@/components/home-hero";
import { Mark } from "@/components/mark";
import { Sparkle, SunCompass, WaveLine } from "@/components/ornaments";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VillaSelections } from "@/components/villa-selections";
import { getCurrentUser } from "@/lib/auth";
import { publicProperties, type PropertyListItem } from "@/lib/properties";

export const dynamic = "force-dynamic";

// Brand palette echoed across the home surfaces — kept here so future
// maintainers don't have to hunt for hex values across components.
const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const INK_WARM = "#5b3a1f";

export default async function HomePage() {
  // Pull a few cover photos to anchor the editorial sections. If the backend
  // is unreachable the sections gracefully fall back to a cream gradient.
  let featured: PropertyListItem[] = [];
  try {
    const list = await publicProperties.list({
      page: 1,
      limit: 4,
      sort: "created_at",
      order: "desc",
    });
    featured = list.data;
  } catch {
    /* soft-fail */
  }

  const me = await getCurrentUser();

  // Editorial sections use curated static art (not villa cover_photos) so
  // the visual story stays consistent regardless of what's in the catalog.

  return (
    <>
      <SiteHeader me={me} transparent />

      <HomeHero />

      {/* Everything below the hero rides on `z-10`, so as the user scrolls,
          this cream surface slides UP over the sticky hero (curtain reveal). */}
      <div className="relative z-10" style={{ background: CREAM }}>
        <BrandStatement />

        {/* ─── Editorial: origine 2018 (image left) ─── */}
        <EditorialSection
          imageSide="left"
          eyebrow="L'origine — 2018"
          heading={
            <>
              Née au cœur du
              <br />
              <Mark>Golfe</Mark>
            </>
          }
          body={[
            "Après une année d'études, de conception et d'écoute des premiers clients, Welkom Home a vu le jour début 2018 dans le golfe de Saint-Tropez.",
            "Cinq ans plus tard, l'agence est devenue une référence locale dans l'intendance haut de gamme et la mise en relation propriétaires-vacanciers. Un cap maintenu par une équipe dynamique et des partenaires triés sur le volet.",
          ]}
          ctaLabel="Notre histoire"
          ctaHref="/#approche"
          imageSrc="/25.png"
          imageAlt="Chambre d'une villa Welkom Home — palmiers et lumière du Sud"
        />

        {/* ─── Editorial: méthode — périmètre réduit (image right) ─── */}
        <EditorialSection
          imageSide="right"
          eyebrow="La méthode"
          heading={
            <>
              Un périmètre
              <br />
              <Mark>volontairement réduit</Mark>
            </>
          }
          body={[
            "Proximité, disponibilité, réactivité. Notre zone d'intervention reste limitée — c'est cette contrainte qui nous permet d'être réellement présents sur place, en quelques minutes.",
            "Nous ne travaillons qu'avec des prestataires connus, locaux, référencés. C'est notre manière de participer au tissu économique du golfe — et de garantir un service tenu de bout en bout.",
          ]}
          ctaLabel="Demander un devis"
          ctaHref="mailto:contact@welkomhome.eu"
          imageSrc="/1.png"
          imageAlt="Coucher de soleil sur le golfe de Saint-Tropez depuis une villa Welkom Home"
        />

        {/* ─── Audience split (Propriétaires / Voyageurs) ─── */}
        <DualCtaSection />

        {/* ─── Nos sélections (white bg, 3-up carousel) ─── */}
        <VillaSelections villas={featured} />

        {/* ─── Closing band ─── */}
        <section
          id="approche"
          className="relative scroll-mt-24 overflow-hidden border-t py-28"
          style={{ background: CREAM_SOFT, borderColor: "rgba(91,58,31,0.12)" }}
        >
          {/* Decorative sun in the top-right of this band */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-10 top-10 hidden md:block"
            style={{ color: "#8d4926", opacity: 0.35 }}
          >
            <SunCompass size={64} />
          </div>

          <div className="relative mx-auto max-w-4xl px-8 text-center lg:px-12">
            {/* Ornamental top mark */}
            <div
              aria-hidden
              className="mb-6 flex items-center justify-center gap-4"
              style={{ color: "#8d4926", opacity: 0.7 }}
            >
              <WaveLine width={50} />
              <Sparkle size={9} />
              <WaveLine width={50} reverse />
            </div>
            <p
              className="text-[11px] uppercase"
              style={{ letterSpacing: "0.32em", color: INK_WARM, opacity: 0.75 }}
            >
              Prêt à plonger ?
            </p>
            <h2
              className="mt-4 text-4xl leading-[1.1] md:text-5xl lg:text-[3.2rem]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                color: INK_WARM,
              }}
            >
              Trouve la villa qui te <Mark>ressemble</Mark>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.7] text-zinc-700">
              Parcours notre catalogue ou raconte-nous ton projet — on te recommande
              les villas qui collent à ton été, pas l&apos;inverse.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/listing"
                className="inline-flex items-center gap-3 px-9 py-4 text-[11px] uppercase transition-opacity hover:opacity-90"
                style={{
                  background: "#3a2415",
                  color: CREAM,
                  letterSpacing: "0.28em",
                  borderRadius: 2,
                }}
              >
                Voir les villas
              </Link>
              <a
                href="mailto:contact@welkomhome.eu"
                className="inline-flex items-center gap-3 border px-9 py-4 text-[11px] uppercase text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
                style={{
                  borderColor: INK_WARM,
                  letterSpacing: "0.28em",
                  borderRadius: 2,
                }}
              >
                Nous écrire
              </a>
            </div>
          </div>
        </section>

        {/* ─── Témoignages clients ─── */}
        <ReviewsCarousel />

        {/* ─── Footer ─── */}
        <SiteFooter />
      </div>
    </>
  );
}
