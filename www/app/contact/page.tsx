import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Contact — Welkom Home",
  description:
    "Écrivez-nous depuis Den Haag ou Saint-Tropez. Réponse sous 24 heures, en néerlandais, français ou anglais.",
};

export default async function ContactPage() {
  const me = await getCurrentUser();

  return (
    <div className="min-h-screen" style={{ background: "#f3ecd9" }}>
      <SiteHeader me={me} />
      <ContactContent />
      <SiteFooter variant="white" />
    </div>
  );
}
