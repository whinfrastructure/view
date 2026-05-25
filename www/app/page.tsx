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

        {/* ─── Editorial: conciergerie (image left) ─── */}
        <EditorialSection
          imageSide="left"
          eyebrow="La conciergerie"
          heading={
            <>
              Une équipe locale,
              <br />
              <Mark>à votre écoute</Mark>
            </>
          }
          body={[
            "Welkom Home, c'est une équipe ancrée entre Les Issambres et Saint-Tropez. Une présence sur place, une connaissance fine des villas et des prestataires de la région.",
            "De l'accueil personnalisé jusqu'au dernier service, chaque détail est anticipé pour que ton séjour se vive — pas qu'il se gère.",
          ]}
          ctaLabel="Découvrir l'approche"
          ctaHref="/#approche"
          imageSrc="/25.png"
          imageAlt="Chambre d'une villa Welkom Home — palmiers et lumière du Sud"
        />

        {/* ─── Editorial: devis (image right) ─── */}
        <EditorialSection
          imageSide="right"
          eyebrow="L'expérience"
          heading={
            <>
              Pas de paiement en ligne,
              <br />
              juste un <Mark>devis ferme</Mark>
            </>
          }
          body={[
            "On étudie ta demande, on confirme les disponibilités auprès des propriétaires, et on revient sous 24 heures avec un devis clair — sans surprise, sans engagement.",
            "Une fois la villa repérée, on prend le relais : conditions négociées, prestations sur-mesure, séjour calé autour de toi — que tu viennes en couple, en famille, ou en tribu d'amis.",
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
