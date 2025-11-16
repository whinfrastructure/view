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
  }))

  return (
    <section className="min-h-screen w-screen shrink-0 flex items-center bg-white py-12 sm:py-16 lg:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-8 pt-12 sm:pt-16">
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
    src: "/media/chair.png",
  },
  {
    title: "Villa Les Tourterelles",
    city: "Ramatuelle",
    src: "/media/cuisine.png",
  },
  {
    title: "Villa Méditerranée",
    city: "Cannes",
    src: "/media/image.png",
  },
  {
    title: "Villa Prestige",
    city: "Sainte-Maxime",
    src: "/media/salon.png",
  },
  {
    title: "Villa Azure",
    city: "Grimaud",
    src: "/media/bedroom.png",
  },
  {
    title: "Villa Riviera",
    city: "Cap d'Antibes",
    src: "/media/bedroom.png",
  },
]
