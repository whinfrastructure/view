"use client"

import { Navbar } from "@/components/navbar"
import { FadeContent } from "@/components/ui/fade-content"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight, Sparkles } from "lucide-react"

const destinations = [
  {
    slug: "saint-tropez",
    name: "Saint-Tropez",
    tagline: "Le joyau de la Côte d'Azur",
    description: "Port légendaire, plages mythiques et ambiance glamour",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90",
    accent: "from-amber-500/80 to-orange-600/80",
    featured: true,
  },
  {
    slug: "cannes",
    name: "Cannes",
    tagline: "La cité du cinéma",
    description: "Entre élégance de la Croisette et authenticité du Suquet",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=90",
    accent: "from-rose-500/80 to-pink-600/80",
    featured: true,
  },
  {
    slug: "ramatuelle",
    name: "Ramatuelle",
    tagline: "Village médiéval perché",
    description: "Vue imprenable sur la baie de Pampelonne",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90",
    accent: "from-emerald-500/80 to-teal-600/80",
  },
  {
    slug: "grimaud",
    name: "Grimaud",
    tagline: "La Venise Provençale",
    description: "Village authentique et cité lacustre unique",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90",
    accent: "from-blue-500/80 to-indigo-600/80",
  },
  {
    slug: "sainte-maxime",
    name: "Sainte-Maxime",
    tagline: "Élégance familiale",
    description: "Face au golfe de Saint-Tropez",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90",
    accent: "from-violet-500/80 to-purple-600/80",
  },
  {
    slug: "cap-d-antibes",
    name: "Cap d'Antibes",
    tagline: "Presqu'île de rêve",
    description: "Écrin de verdure et propriétés légendaires",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=90",
    accent: "from-cyan-500/80 to-sky-600/80",
  },
]

export default function DestinationsPage() {
  const featuredDestinations = destinations.filter(d => d.featured)
  const otherDestinations = destinations.filter(d => !d.featured)

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar currentSection={-1} isAtTop={false} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-neutral-100" />

          <div className="relative max-w-6xl mx-auto text-center">
            <FadeContent>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-neutral-700">Côte d'Azur</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-neutral-900 mb-4">
                Nos <span className="italic font-normal">Destinations</span>
              </h1>

              <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
                Découvrez les plus beaux villages et villes de la Riviera française
              </p>
            </FadeContent>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="px-4 sm:px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {featuredDestinations.map((dest, index) => (
                <FadeContent key={dest.slug} delay={index * 0.1}>
                  <Link href={`/destinations/${dest.slug}`}>
                    <motion.div
                      className="group relative h-[320px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                      />

                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${dest.accent} opacity-60 group-hover:opacity-70 transition-opacity`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-white/80" />
                          <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                            {dest.tagline}
                          </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
                          {dest.name}
                        </h2>

                        <p className="text-white/80 text-sm sm:text-base mb-4 max-w-md">
                          {dest.description}
                        </p>

                        <div className="flex items-center gap-2 text-white font-medium group/btn">
                          <span className="text-sm">Explorer</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </div>
                      </div>

                      {/* Featured badge */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                        <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                          <span className="text-white text-xs font-medium">Populaire</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* Other Destinations Grid */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <FadeContent>
              <h2 className="text-xl sm:text-2xl font-light text-neutral-900 mb-6 sm:mb-8">
                Autres destinations
              </h2>
            </FadeContent>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherDestinations.map((dest, index) => (
                <FadeContent key={dest.slug} delay={index * 0.1}>
                  <Link href={`/destinations/${dest.slug}`}>
                    <motion.div
                      className="group relative h-[200px] sm:h-[240px] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        quality={85}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                        <span className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">
                          {dest.tagline}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          {dest.name}
                        </h3>
                      </div>

                      {/* Hover arrow */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <FadeContent>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-neutral-800" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                <div className="relative px-6 sm:px-12 py-12 sm:py-16 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4">
                    Vous ne trouvez pas votre destination ?
                  </h2>
                  <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                    Contactez-nous pour découvrir notre sélection complète de propriétés sur toute la Côte d'Azur.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-900 font-medium hover:bg-neutral-100 transition-colors"
                  >
                    <span>Nous contacter</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeContent>
          </div>
        </section>
      </main>
    </div>
  )
}
