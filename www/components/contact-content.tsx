"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Mark } from "@/components/mark";
import {
  ArcMark,
  Diamond,
  OliveBranch,
  Sparkle,
  SunCompass,
  WaveLine,
} from "@/components/ornaments";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CREAM = "#f3ecd9";
const CREAM_SOFT = "#efe6cf";
const INK = "#1a1a1a";
const INK_WARM = "#5b3a1f";
const CLAY = "#8d4926";
const HAIRLINE = "rgba(91, 58, 31, 0.16)";

export function ContactContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Continuous slow rotation on the corner suns.
      gsap.to(".cc-sun", {
        rotation: 360,
        duration: 90,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      if (reduced) {
        gsap.set(
          [".cc-eyebrow", ".cc-word", ".cc-lede", ".cc-row", ".cc-card", ".cc-field", ".cc-quote"],
          { autoAlpha: 1 },
        );
        return;
      }

      // ─── Initial mount: hero reveal ───
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .fromTo(
          ".cc-hero .cc-eyebrow",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          ".cc-hero .cc-word",
          { autoAlpha: 0, y: 44 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07, ease: "power4.out" },
          "<0.15",
        )
        .fromTo(
          ".cc-hero .cc-lede",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "<0.4",
        );

      // ─── Chapter sections — animate on scroll ───
      gsap.utils.toArray<HTMLElement>(".cc-section").forEach((section) => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          section.querySelectorAll(".cc-eyebrow"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
        )
          .fromTo(
            section.querySelectorAll(".cc-section-title"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            "<0.1",
          )
          .fromTo(
            section.querySelectorAll(".cc-section-lede"),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
            "<0.1",
          )
          .fromTo(
            section.querySelectorAll(".cc-row"),
            { autoAlpha: 0, y: 24, x: -10 },
            { autoAlpha: 1, y: 0, x: 0, duration: 0.65, stagger: 0.1 },
            "<0.15",
          )
          .fromTo(
            section.querySelectorAll(".cc-card"),
            { autoAlpha: 0, y: 28, scale: 0.97 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.12 },
            "<0.1",
          )
          .fromTo(
            section.querySelectorAll(".cc-field"),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 },
            "<0.1",
          )
          .fromTo(
            section.querySelectorAll(".cc-submit"),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
            "<0.2",
          )
          .fromTo(
            section.querySelectorAll(".cc-ornament"),
            { autoAlpha: 0, x: -16 },
            { autoAlpha: 1, x: 0, duration: 0.7 },
            "<-0.3",
          );
      });

      // ─── Final pull-quote: big scale-fade reveal ───
      gsap.fromTo(
        ".cc-quote",
        { autoAlpha: 0, y: 32, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cc-quote",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
    >
      {/* Decorative corner ornaments */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-12 hidden md:block"
        style={{ color: CLAY, opacity: 0.4 }}
      >
        <div className="cc-sun">
          <SunCompass size={56} />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-32 hidden lg:block"
        style={{ color: CLAY, opacity: 0.32 }}
      >
        <ArcMark size={140} />
      </div>

      {/* ─── HERO ─── */}
      <header className="cc-hero mb-14 max-w-3xl sm:mb-20">
        <p
          className="cc-eyebrow flex items-center gap-3 text-[11px] uppercase opacity-0"
          style={{ letterSpacing: "0.34em", color: CLAY }}
        >
          <Sparkle size={10} />
          Contact
        </p>
        <h1
          className="mt-5 text-4xl leading-[1.05] md:text-5xl lg:text-[3.8rem]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            color: INK_WARM,
          }}
        >
          <span className="cc-word inline-block opacity-0">Écrivez-nous,</span>
          <br />
          <span className="cc-word inline-block opacity-0">on revient</span>{" "}
          <span className="cc-word inline-block opacity-0">
            <Mark>sous 24h</Mark>.
          </span>
        </h1>
        <p
          className="cc-lede mt-7 max-w-xl text-[16px] leading-[1.75] opacity-0"
          style={{ color: INK_WARM, opacity: 0.88 }}
        >
          Un projet, une question, une visite à organiser ? Choisis ton canal —
          on lit chaque message et on répond à chaque appel.
        </p>
      </header>

      {/* ─── I. CANAUX DIRECTS ─── */}
      <section
        className="cc-section grid grid-cols-1 gap-10 border-t pt-12 sm:gap-12 sm:pt-16 lg:grid-cols-12 lg:gap-16"
        style={{ borderColor: HAIRLINE }}
      >
        <div className="lg:col-span-3">
          <span
            className="cc-eyebrow flex items-center gap-3 font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.32em", color: CLAY }}
          >
            <Sparkle size={10} />
            I.
          </span>
          <h2
            className="cc-section-title mt-6 text-2xl leading-[1.1] md:text-[1.8rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontStyle: "italic",
              color: INK_WARM,
            }}
          >
            Canaux directs
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-9">
          <ContactBlock
            eyebrow="Par email"
            value="contact@welkomhome.eu"
            href="mailto:contact@welkomhome.eu"
            hint="Réponse sous 24h, du lundi au samedi."
          />
          <ContactBlock
            eyebrow="Téléphone · Pays-Bas"
            value="+31 6 90 90 90 90"
            href="tel:+31690909090"
            hint="Pour les appels depuis NL ou BE."
            mono
          />
          <ContactBlock
            eyebrow="Langues parlées"
            value="NL · FR · EN"
            hint="Écris dans la langue qui te va le mieux."
            mono
          />
        </div>
      </section>

      {/* ─── II. NOS DEUX ANCRES ─── */}
      <section
        className="cc-section mt-16 grid grid-cols-1 gap-10 border-t pt-12 sm:mt-24 sm:gap-12 sm:pt-16 lg:grid-cols-12 lg:gap-16"
        style={{ borderColor: HAIRLINE }}
      >
        <div className="lg:col-span-3">
          <span
            className="cc-eyebrow flex items-center gap-3 font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.32em", color: CLAY }}
          >
            <Sparkle size={10} />
            II.
          </span>
          <h2
            className="cc-section-title mt-6 text-2xl leading-[1.1] md:text-[1.8rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontStyle: "italic",
              color: INK_WARM,
            }}
          >
            Nos deux ancres
          </h2>
          <p className="cc-section-lede mt-4 text-[13px] leading-[1.6] text-zinc-700">
            Notre siège est à Den Haag. Notre terrain est sur le golfe de
            Saint-Tropez. On fait le pont entre les deux depuis 2018.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-9">
          <LocationCard
            eyebrow="Siège"
            city="Den Haag"
            country="Pays-Bas"
            tagline="Là où tout commence — la coordination, les contacts NL/BE."
          />
          <LocationCard
            eyebrow="Sur le terrain"
            city="Golfe de Saint-Tropez"
            country="Var, France"
            tagline="Là où ça se passe — la conciergerie, les villas, l'équipe locale."
          />
        </div>
      </section>

      {/* ─── III. ÉCRIVEZ-NOUS (form) ─── */}
      <section
        className="cc-section mt-16 grid grid-cols-1 gap-10 border-t pt-12 sm:mt-24 sm:gap-12 sm:pt-16 lg:grid-cols-12 lg:gap-16"
        style={{ borderColor: HAIRLINE }}
      >
        <div className="lg:col-span-3">
          <span
            className="cc-eyebrow flex items-center gap-3 font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.32em", color: CLAY }}
          >
            <Sparkle size={10} />
            III.
          </span>
          <h2
            className="cc-section-title mt-6 text-2xl leading-[1.1] md:text-[1.8rem]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontStyle: "italic",
              color: INK_WARM,
            }}
          >
            Un message
          </h2>
          <p className="cc-section-lede mt-4 text-[13px] leading-[1.6] text-zinc-700">
            Décris-nous ton projet — dates, nombre de personnes, envies. On
            revient sous 24h avec une réponse personnalisée.
          </p>
          <div
            className="cc-ornament mt-8 opacity-0"
            style={{ color: CLAY, opacity: 0.65 }}
          >
            <OliveBranch />
          </div>
        </div>

        <form
          action="mailto:contact@welkomhome.eu"
          method="post"
          encType="text/plain"
          className="lg:col-span-9"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <FormField label="Prénom" name="prenom" required />
            <FormField label="Nom" name="nom" required />
            <FormField label="Email" name="email" type="email" required />
            <FormField label="Téléphone (optionnel)" name="telephone" type="tel" />
          </div>
          <div className="mt-6">
            <FormField label="Sujet" name="sujet" required />
          </div>
          <div className="cc-field mt-6 opacity-0">
            <label
              htmlFor="message"
              className="block text-[10px] uppercase"
              style={{ letterSpacing: "0.32em", color: CLAY, opacity: 0.85 }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Dates approximatives, nombre de personnes, type de villa recherchée, contraintes particulières…"
              className="mt-2 block w-full resize-y border bg-transparent px-4 py-3 text-[14px] outline-none placeholder:opacity-50"
              style={{ borderColor: HAIRLINE, color: INK_WARM, borderRadius: 2 }}
            />
          </div>
          <div className="cc-submit mt-10 flex flex-wrap items-center justify-between gap-4 opacity-0">
            <p
              className="font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.28em", color: CLAY, opacity: 0.75 }}
            >
              <Diamond size={4} /> Aucun stockage côté serveur — le message
              ouvre simplement ton client email.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-3 px-9 py-4 text-[11px] uppercase transition-opacity hover:opacity-90"
              style={{
                background: "#3a2415",
                color: CREAM,
                letterSpacing: "0.3em",
                borderRadius: 2,
              }}
            >
              Envoyer
            </button>
          </div>
        </form>
      </section>

      {/* ─── Pull-quote final ─── */}
      <section
        className="mt-20 border-y py-14 text-center sm:mt-32 sm:py-20"
        style={{ borderColor: HAIRLINE, background: CREAM_SOFT }}
      >
        <div
          aria-hidden
          className="mb-6 flex items-center justify-center gap-4"
          style={{ color: CLAY, opacity: 0.6 }}
        >
          <WaveLine width={70} />
          <Sparkle size={11} />
          <WaveLine width={70} reverse />
        </div>
        <blockquote
          className="cc-quote mx-auto max-w-3xl px-6 text-3xl italic leading-[1.25] opacity-0 md:text-4xl lg:text-[3rem]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            color: INK_WARM,
          }}
        >
          « Votre confiance,
          <br className="md:hidden" /> nous savons la mériter. »
        </blockquote>
        <p
          className="mt-8 font-mono text-[11px] uppercase"
          style={{ letterSpacing: "0.34em", color: CLAY }}
        >
          Welkom Home — Den Haag · +31&nbsp;6&nbsp;90&nbsp;90&nbsp;90&nbsp;90
        </p>
      </section>
    </main>
  );
}

// ────────────────── Subcomponents ──────────────────

function ContactBlock({
  eyebrow,
  value,
  href,
  hint,
  mono = false,
}: {
  eyebrow: string;
  value: string;
  href?: string;
  hint?: string;
  mono?: boolean;
}) {
  const valueClass = `mt-3 ${mono ? "font-mono" : ""} text-xl leading-[1.2] md:text-2xl`;
  const valueStyle: React.CSSProperties = mono
    ? { color: INK }
    : { fontFamily: "var(--font-cormorant), serif", fontWeight: 500, color: INK };

  return (
    <div className="cc-row border-l pl-6 opacity-0" style={{ borderColor: HAIRLINE }}>
      <p
        className="text-[10px] uppercase"
        style={{ letterSpacing: "0.32em", color: CLAY }}
      >
        {eyebrow}
      </p>
      {href ? (
        <a
          href={href}
          className={`${valueClass} transition-opacity hover:opacity-70`}
          style={valueStyle}
        >
          {value}
        </a>
      ) : (
        <p className={valueClass} style={valueStyle}>
          {value}
        </p>
      )}
      {hint && (
        <p
          className="mt-2 text-[12px] leading-[1.5] italic"
          style={{ color: INK_WARM, opacity: 0.7 }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function LocationCard({
  eyebrow,
  city,
  country,
  tagline,
}: {
  eyebrow: string;
  city: string;
  country: string;
  tagline: string;
}) {
  return (
    <article
      className="cc-card border p-7 opacity-0"
      style={{ borderColor: HAIRLINE, background: CREAM_SOFT, borderRadius: 2 }}
    >
      <p
        className="text-[10px] uppercase"
        style={{ letterSpacing: "0.32em", color: CLAY }}
      >
        {eyebrow}
      </p>
      <h3
        className="mt-4 text-3xl leading-[1] md:text-[2.4rem]"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
          color: INK_WARM,
        }}
      >
        {city}
      </h3>
      <p
        className="mt-2 font-mono text-[11px] uppercase"
        style={{ letterSpacing: "0.24em", color: CLAY, opacity: 0.8 }}
      >
        {country}
      </p>
      <p className="mt-6 text-[14px] leading-[1.65] text-zinc-700">{tagline}</p>
    </article>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="cc-field opacity-0">
      <label
        htmlFor={name}
        className="block text-[10px] uppercase"
        style={{ letterSpacing: "0.32em", color: CLAY, opacity: 0.85 }}
      >
        {label} {required && <span style={{ color: INK_WARM }}>·</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 block w-full border-b bg-transparent py-2 text-[14px] outline-none placeholder:opacity-50 focus:border-b-2"
        style={{ borderColor: HAIRLINE, color: INK_WARM }}
      />
    </div>
  );
}
