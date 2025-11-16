"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"
import { GooeyText } from "@/components/ui/gooey-text"

interface AboutSectionProps {
  scrollToSection: (index: number) => void
}

export function AboutSection({ scrollToSection }: AboutSectionProps) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section 
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 items-center bg-white px-6 py-20 md:py-32"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Gooey Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-12 lg:mb-16"
        >
          <div className="h-[100px] flex items-end justify-center">
            <GooeyText
              texts={["WELKOM", "HOME", "LUXE", "EXCELLENCE"]}
              morphTime={1.5}
              cooldownTime={0.5}
              className="font-bold"
              textClassName="text-3xl md:text-4xl lg:text-5xl text-neutral-900"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl bg-neutral-100">
              <img
                src="/daronnedaron.jpg"
                alt="Équipe WelkomHome"
                className="w-full h-full object-cover"
              />
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xs">
                    <p className="font-semibold text-neutral-900">Yohan & Shirley</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-6 text-neutral-700">
              <p className="text-lg leading-relaxed">
                WelkomHome vous ouvre les portes des <strong>plus belles propriétés</strong> de la Côte d'Azur. 
                Grâce à des années d'expérience et une <strong>relation de confiance</strong> avec nos propriétaires, 
                nous vous proposons des villas d'exception en exclusivité.
              </p>
              
              <p className="text-base leading-relaxed text-neutral-600">
                Que vous recherchiez une villa moderne à <em>Saint-Tropez</em>, une demeure élégante à <em>Cannes</em> 
                ou un refuge prestigieux à <em>Monaco</em>, notre sélection rigoureuse garantit des séjours 
                inoubliables dans un cadre d'exception.
              </p>

              <div className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-900 mt-1">✓</span>
                    <span className="text-neutral-700">Sélection exclusive de propriétés d'exception</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-900 mt-1">✓</span>
                    <span className="text-neutral-700">Service personnalisé et accompagnement sur-mesure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-900 mt-1">✓</span>
                    <span className="text-neutral-700">Expertise locale et connaissance approfondie</span>
                  </li>
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-6"
              >
                <button
                  onClick={() => scrollToSection(4)}
                  className="group relative inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-base text-white font-medium transition-all duration-300 hover:bg-neutral-800 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Contactez-nous</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
