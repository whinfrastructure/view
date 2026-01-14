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
    <section className="min-h-screen w-screen shrink-0 flex items-center justify-center bg-white py-6 sm:py-8">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <FadeContent>
          <SectionHeader
            badge="Sélection d'Exception 💐"
            title="Nos logements en"
            highlight="exclusivité"
            highlightClassName="font-mea-culpa text-[1.1em] sm:text-[1.2em] md:text-[1.25em] pl-1 pr-2 leading-[1.05] tracking-[0.012em]"
            titleClassName="text-center text-sm sm:text-base md:text-lg"
            align="center"
            className="mb-4 sm:mb-6"
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
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90",
  },
  {
    title: "Villa Les Tourterelles",
    city: "Ramatuelle",
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90",
  },
  {
    title: "Villa Méditerranée",
    city: "Cannes",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=90",
  },
  {
    title: "Villa Prestige",
    city: "Sainte-Maxime",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90",
  },
  {
    title: "Villa Azure",
    city: "Grimaud",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90",
  },
  {
    title: "Villa Riviera",
    city: "Cap d'Antibes",
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1600&q=90",
  },
]
