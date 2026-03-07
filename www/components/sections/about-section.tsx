"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface AboutSectionProps {
  scrollToSection: (index: number) => void
  isMobile?: boolean
}

export function AboutSection({ scrollToSection, isMobile = false }: AboutSectionProps) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section className="h-screen w-full shrink-0 flex items-center bg-[#FDFBF7] relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 h-full">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <span className="uppercase text-[10px] tracking-[0.4em] text-[#E6D5B8] font-medium border-b border-[#E6D5B8]/30 pb-2">
              Notre Histoire
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-foreground font-light leading-[1.1] mb-8">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="block"
            >
              L'art de recevoir
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-mea-culpa italic text-5xl sm:text-6xl md:text-7xl text-[#E6D5B8] leading-[0.8] block ml-12 mt-2" 
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.05)"}}
            >
              sur mesure
            </motion.span>
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-muted-foreground font-light leading-relaxed mb-10 max-w-lg space-y-6 text-lg"
          >
            <p>
              WelkomHome redéfinit l'expérience de la location saisonnière sur la Côte d'Azur. 
              Née de la passion de Yohan & Shirley, notre agence cultive l'excellence et la proximité 
              pour offrir des séjours inoubliables.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-6">
              {[
                "Sélection rigoureuse de propriétés",
                "Conciergerie privée disponible 7j/7",
                "Expérience locale authentique"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="w-8 h-[1px] bg-[#E6D5B8] group-hover:w-12 transition-all duration-500" />
                  <span className="text-sm uppercase tracking-wider text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <button
              onClick={() => scrollToSection(4)}
              className="group relative px-8 py-4 bg-transparent border-[0.5px] border-foreground/20 hover:border-[#E6D5B8] text-foreground font-playfair italic tracking-wide transition-all duration-500 overflow-hidden inline-flex items-center gap-3"
            >
              <span className="relative z-10 group-hover:text-[#E6D5B8] transition-colors duration-500">Rencontrer l'équipe</span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2 text-[#E6D5B8]">→</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side: Image Composition */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-full relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[3/4]">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-20 w-full h-full overflow-hidden shadow-2xl"
            >
              <Image
                src="/daronnedaron.jpg"
                alt="Yohan & Shirley - Fondateurs WelkomHome"
                fill
                className="object-cover transition-transform duration-[2s] hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Decorative Frame */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 40, y: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute inset-0 border-[1px] border-[#E6D5B8] z-10"
            />
            
            {/* Floating Element */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-10 -left-10 bg-[#FDFBF7] p-6 shadow-xl z-30 max-w-[200px]"
            >
              <p className="font-playfair text-3xl text-[#E6D5B8] mb-1">10+</p>
              <p className="text-xs uppercase tracking-widest text-foreground/60">Années d'expérience</p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}
