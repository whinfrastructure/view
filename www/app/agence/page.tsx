import type { Metadata } from "next";
import { AgenceContent } from "@/components/agence-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "L'agence — Welkom Home · Pour les propriétaires",
  description:
    "Confiez votre villa à Welkom Home — agence basée à Den Haag, intervenant sur le golfe de Saint-Tropez depuis 2018. Service de conciergerie, recherche de vacanciers, gestion administrative.",
};

export default async function AgencePage() {
  const me = await getCurrentUser();

  return (
    <div className="min-h-screen" style={{ background: "#f3ecd9" }}>
      <SiteHeader me={me} />
      <AgenceContent />
      <SiteFooter variant="white" />
    </div>
  );
}
