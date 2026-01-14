"use client"

import React from "react"
import DragCarousel, { type CarouselItem } from "@/components/ui/drag-carousel"
import { FadeContent } from "@/components/ui/fade-content"
import { SectionHeader } from "@/components/landing/section-header"

export function CollectionStrip() {
  const carouselItems: CarouselItem[] = villaData.map((villa, index) => ({
    id: index + 1,
    url: villa.src,
    title: `${villa.title} - ${villa.city}`,
    href: `/destinations/${villa.city.toLowerCase().replace(/[' ]/g, "-")}`,
  }))

  return (
    <section className="min-h-screen w-screen shrink-0 flex items-center justify-center bg-white py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <FadeContent>
          <SectionHeader
            badge="Sélection d'Exception 💐"
            title="Nos logements en"
            highlight="exclusivité"
            highlightClassName="font-mea-culpa text-[1.1em] sm:text-[1.2em] md:text-[1.25em] pl-1 pr-2 leading-[1.05] tracking-[0.012em]"
            titleClassName="text-center text-base sm:text-lg md:text-xl"
            align="center"
            className="mb-8"
            descriptionClassName="max-w-4xl mb-0 text-[11px] sm:text-xs mx-auto"
          />
        </FadeContent>        <FadeContent delay={0.2}>
          <DragCarousel items={carouselItems} />
        </FadeContent>
      </div>
    </section>
  )
}

const villaData = [
  {
    title: "Villa Tumulus",
    city: "Saint-Tropez",
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=800",
  },
  {
    title: "Villa Les Tourterelles",
    city: "Ramatuelle",
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800",
  },
  {
    title: "Villa Méditerranée",
    city: "Cannes",
    src: "https://images.unsplash.com/photo-1600596542815-2a4d9f8770dd?auto=format&fit=crop&w=800",
  },
  {
    title: "Villa Prestige",
    city: "Sainte-Maxime",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800",
  },
  {
    title: "Villa Azure",
    city: "Grimaud",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800",
  },
  {
    title: "Villa Riviera",
    city: "Cap d'Antibes",
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800",
  },
]
