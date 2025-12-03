"use client"

import { FeatureShowcase, type TabMedia, type ShowcaseStep } from "@/components/ui/feature-showcase"
import { useState } from "react"

interface ContactSectionProps {
  isMobile?: boolean
}

export function ContactSection({ isMobile = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const tabs: TabMedia[] = [
    {
      value: "contact",
      label: "Contact",
      src: "/baraque.png",
      alt: "Contactez-nous",
    },
  ]

  const steps: ShowcaseStep[] = [
    {
      id: "email",
      title: "📧 Contact par Email",
      content: (
        <div className="space-y-3 text-sm text-neutral-700">
          <div>
            <p className="font-semibold text-neutral-900 mb-1">Email principal</p>
            <a 
              href="mailto:contact@welkomhome.com" 
              className="text-blue-600 hover:underline"
            >
              contact@welkomhome.com
            </a>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Nous répondons généralement sous 24h
          </p>
        </div>
      ),
    },
    {
      id: "social",
      title: "🌐 Réseaux Sociaux",
      content: (
        <div className="space-y-3">
          <a
            href="https://facebook.com/welkomhome"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
              f
            </div>
            <div>
              <p className="font-semibold text-neutral-900 text-sm">Facebook</p>
              <p className="text-xs text-neutral-600">@welkomhome</p>
            </div>
          </a>
          <a
            href="https://instagram.com/welkomhome"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl">
              📷
            </div>
            <div>
              <p className="font-semibold text-neutral-900 text-sm">Instagram</p>
              <p className="text-xs text-neutral-600">@welkomhome</p>
            </div>
          </a>
        </div>
      ),
    }
  ]

  return (
    <div 
      className={`shrink-0 flex items-center justify-center ${isMobile ? "w-full pt-10 pb-8" : "w-screen h-screen pt-28 pb-20"}`}
    >
      <FeatureShowcase
        eyebrow="CONTACT"
        title="Parlons de votre prochain séjour"
        description="Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans la réservation de votre villa de rêve sur la Côte d'Azur."
        stats={["Réponse rapide", "Service personnalisé", "Disponible 7j/7"]}
        steps={steps}
        tabs={tabs}
        defaultTab="contact"
        panelMinHeight={450}
        isMobile={isMobile}
        className="w-full h-full"
      />
    </div>
  )
}
