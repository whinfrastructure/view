"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"

interface AboutSectionProps {
  scrollToSection: (index: number) => void
}

export function AboutSection({ scrollToSection }: AboutSectionProps) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section 
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 items-center bg-white px-6 py-20 md:px-12"
    >
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 font-sans text-3xl font-light text-black md:text-4xl">
            À Propos
          </h2>
          
          <div className="space-y-4 text-base text-black/70 leading-relaxed">
            <p>
              WelkomHome est né d'une passion pour la Côte d'Azur et le désir de partager 
              les plus belles propriétés de cette région exceptionnelle.
            </p>
            
            <p>
              Grâce à des années d'expérience, nous avons construit une véritable relation 
              de confiance avec nos propriétaires. Cela nous permet de vous ouvrir les portes 
              de maisons que nous proposons en exclusivité.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-6"
            >
              <p className="italic text-black/80 text-base mb-3">
                "Nous avons passé un séjour merveilleux, tant le lieu est d'exception ! 
                Une vue époustouflante sur la Méditerranée et des prestations de qualité 
                en corrélation avec nos exigences."
              </p>
              <p className="text-sm text-black/50">
                — Nadia, Villa Tumulus
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6"
            >
              <button
                onClick={() => scrollToSection(4)}
                className="rounded-full bg-black px-8 py-3 text-sm text-white font-medium transition-all duration-300 hover:bg-black/80"
              >
                Contactez-nous
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
