import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/mark";
import {
  ArcMark,
  Diamond,
  OliveBranch,
  PalmFrond,
  Sparkle,
  SunCompass,
  WaveLine,
} from "@/components/ornaments";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "L'agence — Welkom Home · Pour les propriétaires",
  description:
    "Confiez votre villa à Welkom Home — agence basée à Den Haag, intervenant sur le golfe de Saint-Tropez depuis 2018. Service de conciergerie, recherche de vacanciers, gestion administrative.",
};

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const WHITE = "#ffffff";
const INK = "#1a1a1a";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";
const HAIRLINE_INK = "rgba(26, 26, 26, 0.12)";

// Services for the "Bénéficiez de notre offre de service exclusive" block.
const SERVICE_BENEFITS = [
  "Un ménage de qualité professionnelle, après chaque séjour.",
  "Surveillance régulière de l'état de votre logement.",
  "Prise en charge des éventuels problèmes — plomberie, jardin, équipements.",
  "Gestion des demandes spécifiques et imprévues, avant et pendant le séjour.",
];

// Services for the "Accompagnement dans la recherche de vacanciers" block.
const SERVICE_RENTAL = [
  "Prise de photos aux standards des professionnels de l'immobilier.",
  "Mise en ligne et gestion de vos annonces sur les sites de référence.",
  "Réponses rapides et professionnelles aux questions des vacanciers — en néerlandais, français ou anglais.",
  "Préparation de vos différents supports de présentation et de communication.",
];

export default async function AgencePage() {
  const me = await getCurrentUser();

  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <SiteHeader me={me} />

      {/* ─── Hero / Intro ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: CREAM }}
      >
        {/* Corner ornaments */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-10 top-12 hidden md:block"
          style={{ color: CLAY, opacity: 0.4 }}
        >
          <SunCompass size={56} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-8 bottom-0 hidden lg:block"
          style={{ color: CLAY, opacity: 0.3 }}
        >
          <PalmFrond />
        </div>

        <div className="relative mx-auto max-w-7xl px-8 py-20 lg:px-12 lg:py-28">
          <p
            className="flex items-center gap-3 text-[11px] uppercase"
            style={{ letterSpacing: "0.34em", color: CLAY }}
          >
            <Sparkle size={10} />
            L&apos;agence — pour les propriétaires
          </p>
          <h1
            className="mt-6 max-w-4xl text-4xl leading-[1.05] md:text-5xl lg:text-[3.8rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: INK_WARM,
            }}
          >
            Votre bien, <Mark>entre nos mains</Mark>.
          </h1>
          <p
            className="mt-8 max-w-2xl text-[16px] leading-[1.75]"
            style={{ color: INK_WARM, opacity: 0.88 }}
          >
            Vous avez un bien que vous souhaitez mettre à la location. Welkom Home
            vous accompagne et vous conseille pour donner à votre maison la
            meilleure visibilité, simplifier les tâches administratives, et
            préparer l&apos;arrivée de vos invités.
          </p>

          {/* Pull-quote — the brand promise */}
          <blockquote
            className="mt-12 max-w-2xl border-l-2 pl-6 italic"
            style={{
              borderColor: CLAY,
              fontFamily: "var(--font-cormorant), serif",
              color: INK_WARM,
              fontSize: "1.4rem",
              lineHeight: 1.4,
            }}
          >
            « Notre mission : faciliter la vie des propriétaires de résidences
            secondaires en leur apportant une gamme complète de services
            accessibles depuis leur résidence principale. »
          </blockquote>
        </div>
      </section>

      {/* ─── II. Offre de service exclusive (white, image left) ─── */}
      <section
        className="relative grid grid-cols-1 lg:grid-cols-2"
        style={{ background: WHITE }}
      >
        {/* Image column */}
        <div
          className="relative aspect-[5/4] w-full overflow-hidden lg:aspect-auto lg:min-h-[600px]"
          style={{ background: CREAM_SOFT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/owners-villa.jpg"
            alt="Villa méditerranéenne — type de bien que nous gérons pour nos propriétaires"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Text column */}
        <div className="relative flex items-center px-8 py-20 lg:px-14 lg:py-24 xl:px-20">
          <div className="max-w-xl">
            <span
              className="flex items-center gap-3 font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY }}
            >
              <Sparkle size={10} />
              II. — Notre offre
            </span>
            <h2
              className="mt-6 text-3xl leading-[1.1] md:text-[2.2rem] lg:text-[2.6rem]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                color: INK_WARM,
              }}
            >
              Bénéficiez d&apos;un <Mark>service exclusif</Mark>
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-zinc-700">
              Une prestation pensée pour les propriétaires qui veulent louer
              sereinement, sans avoir à se déplacer ni à gérer chaque détail.
            </p>

            <ServiceList items={SERVICE_BENEFITS} />
          </div>
        </div>
      </section>

      {/* ─── III. Accompagnement vacanciers (cream, image right) ─── */}
      <section
        className="relative grid grid-cols-1 lg:grid-cols-2"
        style={{ background: CREAM }}
      >
        {/* Text column (left on desktop, first in DOM) */}
        <div className="relative flex items-center px-8 py-20 lg:order-1 lg:px-14 lg:py-24 xl:px-20">
          <div className="max-w-xl">
            <span
              className="flex items-center gap-3 font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY }}
            >
              <Sparkle size={10} />
              III. — L&apos;accompagnement
            </span>
            <h2
              className="mt-6 text-3xl leading-[1.1] md:text-[2.2rem] lg:text-[2.6rem]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
                color: INK_WARM,
              }}
            >
              La recherche de <Mark>vacanciers</Mark>
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-zinc-700">
              On présente votre bien là où il sera vu — et on s&apos;occupe des
              échanges, en plusieurs langues, jusqu&apos;à la signature.
            </p>

            <ServiceList items={SERVICE_RENTAL} />
          </div>
        </div>

        {/* Image column (right on desktop) */}
        <div
          className="relative aspect-[5/4] w-full overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[600px]"
          style={{ background: CREAM_SOFT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/travelers-pool.jpg"
            alt="Piscine à débordement avec vue mer — ce que verront vos futurs locataires"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      {/* ─── IV. La promesse hollandaise (white, pull-quote spread) ─── */}
      <section
        className="relative overflow-hidden border-t"
        style={{ background: WHITE, borderColor: HAIRLINE_INK }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute right-12 top-12 hidden lg:block"
          style={{ color: "#dfcb9d", opacity: 0.85 }}
        >
          <ArcMark size={120} />
        </div>

        <div className="relative mx-auto max-w-7xl px-8 py-24 lg:px-12 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <span
                className="flex items-center gap-3 font-mono text-[10px] uppercase"
                style={{ letterSpacing: "0.32em", color: CLAY }}
              >
                <Sparkle size={10} />
                IV. — Notre force
              </span>
              <h2
                className="mt-6 text-2xl leading-[1.1] md:text-[1.8rem]"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: INK_WARM,
                }}
              >
                Un réseau singulier
              </h2>
            </div>

            <div className="lg:col-span-9">
              <blockquote
                className="text-2xl leading-[1.3] italic md:text-[2rem] lg:text-[2.4rem]"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  color: INK,
                }}
              >
                Une clientèle néerlandaise et belge fidèle, qui revient chaque
                été — et qui fait confiance à l&apos;agence pour le bouche-à-oreille.
              </blockquote>

              <div
                className="mt-10 flex items-center gap-4"
                style={{ color: "#8d4926" }}
              >
                <WaveLine width={60} />
                <Sparkle size={10} />
                <WaveLine width={60} reverse />
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
                <KeyFigure value="2018" label="Création" />
                <KeyFigure value="5+" label="Ans d'existence" unit="ans" />
                <KeyFigure value="NL/FR/EN" label="Langues" />
                <KeyFigure value="<24h" label="Réponse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── V. CTA confier ma villa (cream, centered) ─── */}
      <section
        className="relative overflow-hidden border-t py-28 lg:py-32"
        style={{ background: CREAM, borderColor: HAIRLINE }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2"
          style={{ color: CLAY, opacity: 0.55 }}
        >
          <SunCompass size={44} />
        </div>

        <div className="mx-auto max-w-3xl px-8 text-center lg:px-12">
          <div
            aria-hidden
            className="mt-6 mb-8 flex items-center justify-center gap-4"
            style={{ color: CLAY, opacity: 0.55 }}
          >
            <WaveLine width={50} />
            <Sparkle size={9} />
            <WaveLine width={50} reverse />
          </div>

          <p
            className="text-[11px] uppercase"
            style={{ letterSpacing: "0.32em", color: CLAY }}
          >
            Et maintenant
          </p>
          <h2
            className="mt-4 text-4xl leading-[1.08] md:text-5xl lg:text-[3.2rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              color: INK_WARM,
            }}
          >
            Confiez-nous <Mark>votre villa</Mark>.
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.7] text-zinc-700"
          >
            Un premier échange pour comprendre votre bien, vos contraintes et
            vos attentes. On revient ensuite avec une proposition claire,
            adaptée à votre maison.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:contact@welkomhome.eu?subject=Propri%C3%A9taire%20%E2%80%94%20Confier%20ma%20villa"
              className="inline-flex items-center gap-3 px-9 py-4 text-[11px] uppercase transition-opacity hover:opacity-90"
              style={{
                background: "#3a2415",
                color: CREAM,
                letterSpacing: "0.3em",
                borderRadius: 2,
              }}
            >
              Demander un rendez-vous
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border px-9 py-4 text-[11px] uppercase text-[#5b3a1f] transition-colors hover:bg-[#5b3a1f] hover:text-[#f3ecd9]"
              style={{
                borderColor: INK_WARM,
                letterSpacing: "0.3em",
                borderRadius: 2,
              }}
            >
              Nous écrire
            </Link>
          </div>

          {/* Tagline ornament */}
          <div className="mt-16">
            <div
              aria-hidden
              className="mx-auto mb-4 flex items-center justify-center gap-3"
              style={{ color: CLAY, opacity: 0.6 }}
            >
              <Diamond size={5} />
              <span
                className="font-mono text-[10px] uppercase"
                style={{ letterSpacing: "0.4em" }}
              >
                Welkom Home
              </span>
              <Diamond size={5} />
            </div>
            <p
              className="text-[14px] italic"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                color: INK_WARM,
                opacity: 0.85,
              }}
            >
              « Votre confiance, nous savons la mériter. »
            </p>
          </div>
        </div>
      </section>

      <SiteFooter variant="white" />
    </div>
  );
}

// ────────────────── Components ──────────────────

// Editorial service list — mono index column + hairline-separated rows.
// Replaces the checkbox-circles which felt generic; this matches the
// magazine numbering pattern used across the rest of the site.
function ServiceList({ items }: { items: string[] }) {
  return (
    <ol
      className="mt-8 border-t"
      style={{ borderColor: "rgba(91, 58, 31, 0.18)" }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="group grid grid-cols-[56px_1fr] gap-6 border-b py-5 transition-colors hover:bg-[rgba(91,58,31,0.04)]"
          style={{ borderColor: "rgba(91, 58, 31, 0.18)" }}
        >
          <span
            className="pt-1 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: CLAY }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="text-[15px] leading-[1.65]"
            style={{ color: INK_WARM }}
          >
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function KeyFigure({
  value,
  label,
  unit,
}: {
  value: string;
  label: string;
  unit?: string;
}) {
  return (
    <div>
      <p
        className="text-[2.4rem] leading-[0.95] md:text-[2.8rem]"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          color: INK,
        }}
      >
        {value}
        {unit && (
          <span
            className="ml-1 text-[12px] uppercase opacity-60"
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
