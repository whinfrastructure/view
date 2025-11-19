"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"
import Image from "next/image"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.2)

  const properties = [
    {
      title: "Villa Tumulus",
      location: "Provence-Alpes-Côte d&apos;Azur",
      image: "/hero-background.jpg",
      price: "€450/nuit"
    },
    {
      title: "Villa Méditerranée",
      location: "Saint-Tropez",
      image: "/image.png",
      price: "€680/nuit"
    },
    {
      title: "Villa Sunset",
      location: "Cannes",
      image: "/hero-background.jpg",
      price: "€520/nuit"
    }
  ]

  return (
    <section 
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 items-center bg-white px-6 py-20 md:px-12"
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="mb-3 font-sans text-3xl font-light text-black md:text-4xl">
            Nos Logements
          </h2>
          <p className="max-w-2xl text-base text-black/60">
            Découvrez notre sélection exclusive de villas de prestige sur la Côte d&apos;Azur
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <motion.div
              key={property.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 text-lg font-medium text-black">{property.title}</h3>
                <p className="mb-3 text-sm text-black/60">{property.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-black">{property.price}</span>
                  <button className="rounded-full bg-black px-4 py-1.5 text-xs text-white transition-all hover:bg-black/80">
                    Découvrir
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
