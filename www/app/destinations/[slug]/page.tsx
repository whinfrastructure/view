"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { FadeContent } from "@/components/ui/fade-content"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { MapPin, History, ArrowRight, ArrowLeft, Waves, Star, Camera, Utensils, Home } from "lucide-react"

// City data
const cityData: Record<string, {
  name: string
  tagline: string
  description: string
  history: string
  highlights: string[]
  activities: { title: string; description: string; icon: React.ElementType }[]
  images: {
    hero: string
    gallery: string[]
  }
  color: string
}> = {
  "saint-tropez": {
    name: "Saint-Tropez",
    tagline: "Le joyau de la Côte d'Azur",
    description: "Célèbre pour son port, ses plages et son ambiance glamour, Saint-Tropez incarne l'élégance de la Riviera.",
    history: "Ancien village de pêcheurs devenu destination mondiale dans les années 50, propulsé par le cinéma et des icônes comme Brigitte Bardot. Le village a su préserver son charme provençal avec ses ruelles colorées et sa célèbre place des Lices.",
    highlights: ["Le Port de Saint-Tropez", "La Citadelle", "Plage de Pampelonne", "Musée de l'Annonciade"],
    activities: [
      { title: "Plages de Pampelonne", description: "Les plages les plus célèbres du monde", icon: Waves },
      { title: "Shopping de Luxe", description: "Boutiques des grandes maisons", icon: Star },
      { title: "Vie Nocturne", description: "Soirées légendaires", icon: Camera },
      { title: "Gastronomie", description: "Tarte Tropézienne sur le port", icon: Utensils },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
      ]
    },
    color: "amber"
  },
  "ramatuelle": {
    name: "Ramatuelle",
    tagline: "Village médiéval perché",
    description: "Un village en escargot typiquement provençal offrant une vue imprenable sur la baie de Pampelonne.",
    history: "Bâti à flanc de colline pour échapper aux incursions sarrasines, Ramatuelle est le gardien des célèbres plages de Pampelonne, tout en offrant un calme absolu dans ses terres.",
    highlights: ["Le Village Médiéval", "Phare de Camarat", "Moulins de Paillas", "Festival de Ramatuelle"],
    activities: [
      { title: "Randonnée Littorale", description: "Sentier et criques secrètes", icon: Camera },
      { title: "Dégustation de Vin", description: "Domaines viticoles prestigieux", icon: Utensils },
      { title: "Plages Sauvages", description: "L'Escalet et ses eaux cristallines", icon: Waves },
      { title: "Culture", description: "Théâtre sous les étoiles", icon: Star },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85",
      ]
    },
    color: "emerald"
  },
  "cannes": {
    name: "Cannes",
    tagline: "La cité du cinéma",
    description: "Entre élégance de la Croisette et authenticité du Suquet, Cannes rayonne mondialement.",
    history: "De son passé de village de pêcheurs, Cannes s'est transformée au XIXe siècle en station balnéaire aristocratique. Elle rayonne aujourd'hui grâce à son Festival International du Film.",
    highlights: ["La Croisette", "Palais des Festivals", "Le Suquet", "Îles de Lérins"],
    activities: [
      { title: "La Croisette", description: "Palaces et plages de sable", icon: Camera },
      { title: "Îles de Lérins", description: "Escapade nature et historique", icon: Waves },
      { title: "Marché Forville", description: "Saveurs locales historiques", icon: Utensils },
      { title: "Shopping", description: "Grandes marques rue d'Antibes", icon: Star },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
      ]
    },
    color: "rose"
  },
  "sainte-maxime": {
    name: "Sainte-Maxime",
    tagline: "Élégance familiale",
    description: "Une destination familiale et élégante face au golfe de Saint-Tropez.",
    history: "Sainte-Maxime a toujours été un port d'échanges important. Protégée des vents par les Maures, elle offre un climat exceptionnel qui a séduit artistes et écrivains.",
    highlights: ["Promenade Simon Lorière", "Carré Léon Gaumont", "Port de Plaisance", "Plages de la Nartelle"],
    activities: [
      { title: "Sports Nautiques", description: "Jet-ski, voile et plongée", icon: Waves },
      { title: "Golf", description: "Parcours avec vue mer", icon: Star },
      { title: "Balades en Mer", description: "Calanques de l'Estérel", icon: Camera },
      { title: "Marchés Provençaux", description: "Produits locaux", icon: Utensils },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
      ]
    },
    color: "violet"
  },
  "grimaud": {
    name: "Grimaud",
    tagline: "La Venise Provençale",
    description: "Un village médiéval authentique et sa cité lacustre unique, Port-Grimaud.",
    history: "Grimaud est l'un des plus anciens villages du massif des Maures. Dominé par son château féodal, il contraste avec Port-Grimaud, créée dans les années 60 par l'architecte François Spoerry.",
    highlights: ["Château de Grimaud", "Port-Grimaud", "Église Saint-Michel", "Pont des Fées"],
    activities: [
      { title: "Canaux", description: "Bateau électrique dans la cité", icon: Waves },
      { title: "Château Féodal", description: "Vue panoramique sur le golfe", icon: Camera },
      { title: "Vignobles", description: "Vins AOC Côtes de Provence", icon: Utensils },
      { title: "Ruelles Médiévales", description: "Charme intemporel", icon: Star },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
      ]
    },
    color: "blue"
  },
  "cap-d-antibes": {
    name: "Cap d'Antibes",
    tagline: "Presqu'île de rêve",
    description: "Une presqu'île de rêve, écrin de verdure et de propriétés légendaires.",
    history: "Le Cap d'Antibes est devenu à la fin du XIXe siècle le refuge de l'aristocratie et des artistes. De Scott Fitzgerald à Picasso, tous ont été séduits par sa lumière unique.",
    highlights: ["Phare de la Garoupe", "Sentier de Tire-Poil", "Villa Eilenroc", "Hôtel du Cap-Eden-Roc"],
    activities: [
      { title: "Sentier du Littoral", description: "Plus belle balade de la Riviera", icon: Camera },
      { title: "Plage de la Garoupe", description: "Crique aux eaux turquoise", icon: Waves },
      { title: "Jardins Botaniques", description: "Parcs des villas historiques", icon: Star },
      { title: "Gastronomie Étoilée", description: "Expérience culinaire unique", icon: Utensils },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
      ]
    },
    color: "cyan"
  },
}

// Default data for unknown cities
const defaultData = {
  name: "Destination",
  tagline: "Côte d'Azur",
  description: "Une destination magnifique sur la Riviera française.",
  history: "Cette ville possède une histoire riche liée au développement de la Côte d'Azur.",
  highlights: ["Centre historique", "Front de mer", "Marchés locaux", "Patrimoine"],
  activities: [
    { title: "Découverte", description: "Charmes cachés de la ville", icon: Camera },
    { title: "Détente", description: "Soleil et mer", icon: Waves },
    { title: "Culture", description: "Histoire locale", icon: Star },
    { title: "Saveurs", description: "Cuisine provençale", icon: Utensils },
  ],
  images: {
    hero: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
    ]
  },
  color: "neutral"
}

export default function DestinationPage() {
  const params = useParams()
  const slug = params.slug as string
  const data = cityData[slug] || { ...defaultData, name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ") }

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentSection={-1} isAtTop={false} />

      <main>
        {/* Hero Section - Full screen */}
        <section className="relative h-[70vh] sm:h-[80vh] flex items-end">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={data.images.hero}
              alt={data.name}
              fill
              className="object-cover"
              priority
              quality={95}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </div>

          {/* Back button */}
          <Link
            href="/destinations"
            className="absolute top-24 left-4 sm:left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour</span>
          </Link>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16">
            <FadeContent>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-sm font-medium uppercase tracking-widest">
                  {data.tagline}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-4">
                {data.name}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 max-w-2xl font-light">
                {data.description}
              </p>
            </FadeContent>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text */}
              <FadeContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <History className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-widest">Histoire</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-light text-neutral-900">
                    L'âme de <span className="italic">{data.name}</span>
                  </h2>

                  <p className="text-neutral-600 leading-relaxed">
                    {data.history}
                  </p>

                  {/* Highlights */}
                  <div className="pt-4 grid grid-cols-2 gap-3">
                    {data.highlights.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        <span className="text-sm text-neutral-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeContent>

              {/* Gallery Grid */}
              <FadeContent delay={0.2}>
                <div className="grid grid-cols-6 grid-rows-4 gap-3 h-[350px] sm:h-[400px]">
                  <motion.div
                    className="col-span-4 row-span-4 relative rounded-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={data.images.gallery[0]}
                      alt={`${data.name} - 1`}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="(max-width: 1024px) 60vw, 400px"
                    />
                  </motion.div>
                  <motion.div
                    className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={data.images.gallery[1]}
                      alt={`${data.name} - 2`}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="(max-width: 1024px) 40vw, 200px"
                    />
                  </motion.div>
                  <motion.div
                    className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={data.images.gallery[2]}
                      alt={`${data.name} - 3`}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="(max-width: 1024px) 40vw, 200px"
                    />
                  </motion.div>
                </div>
              </FadeContent>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <FadeContent>
              <div className="text-center mb-12 sm:mb-16">
                <span className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-4 block">
                  Expériences
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-neutral-900">
                  Que faire à <span className="italic">{data.name}</span>
                </h2>
              </div>
            </FadeContent>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.activities.map((activity, i) => (
                <FadeContent key={i} delay={i * 0.1}>
                  <motion.div
                    className="group bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all h-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-5 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {activity.description}
                    </p>
                  </motion.div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <FadeContent>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 mb-6">
                <Home className="w-4 h-4 text-neutral-600" />
                <span className="text-sm font-medium text-neutral-600">Nos propriétés</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4">
                Prêt à découvrir <span className="italic">{data.name}</span> ?
              </h2>

              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                Explorez notre sélection de villas d'exception et vivez une expérience inoubliable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/hosting"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
                >
                  <span>Voir nos logements</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-200 text-neutral-900 font-medium hover:bg-neutral-50 transition-colors"
                >
                  <span>Nous contacter</span>
                </Link>
              </div>
            </FadeContent>
          </div>
        </section>
      </main>
    </div>
  )
}
