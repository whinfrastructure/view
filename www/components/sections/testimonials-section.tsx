"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsSectionProps {
  isMobile?: boolean
}

const testimonials: Testimonial[] = [
  {
    text: "Une expérience inoubliable dans cette villa d'exception. Le service était impeccable et la vue à couper le souffle. Je recommande vivement !",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sophie Martin",
    role: "Saint-Tropez",
  },
  {
    text: "La villa était encore plus belle que sur les photos. Chaque détail a été pensé pour notre confort. Un séjour de rêve !",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Thomas Dubois",
    role: "Cannes",
  },
  {
    text: "Service exceptionnel et prestations haut de gamme. L'équipe WelkomHome a répondu à toutes nos attentes. Parfait pour des vacances de luxe.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Marie Lefebvre",
    role: "Ramatuelle",
  },
  {
    text: "La confidentialité et le calme de cette villa nous ont permis de nous ressourcer complètement. Un havre de paix sur la Côte d'Azur.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Pierre Rousseau",
    role: "Grimaud",
  },
  {
    text: "Des prestations dignes d'un palace dans un cadre intimiste. La piscine et le jardin sont magnifiques. Nous reviendrons sans hésiter !",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Isabelle Bernard",
    role: "Sainte-Maxime",
  },
  {
    text: "L'excellence du service et la qualité de la villa ont dépassé nos attentes. Une adresse à conserver précieusement.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Camille Petit",
    role: "Cap d'Antibes",
  },
  {
    text: "Vue panoramique exceptionnelle et équipements de standing. Chaque moment passé dans cette villa fut un enchantement.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Laurent Moreau",
    role: "Èze",
  },
  {
    text: "WelkomHome a su trouver la villa parfaite pour notre famille. Emplacement idéal et confort absolu. Merci pour tout !",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Claire Simon",
    role: "Villefranche-sur-Mer",
  },
  {
    text: "Un séjour luxueux dans un cadre paradisiaque. La réactivité de l'équipe et la qualité des prestations sont remarquables.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Alexandre Garnier",
    role: "Monaco",
  },
]

export function TestimonialsSection({ isMobile = false }: TestimonialsSectionProps) {
  return (
    <section 
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-[#FDFBF7] ${isMobile ? "w-full py-20" : "w-screen h-screen"}`}
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-6xl z-10 mx-auto px-6 w-full relative flex flex-col items-center justify-center h-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="uppercase text-[10px] tracking-[0.3em] text-[#E6D5B8] font-medium border-b border-[#E6D5B8]/30 pb-2 mb-4 inline-block">
            Témoignages
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-foreground font-light leading-tight">
            Ils nous ont fait <span className="font-mea-culpa italic text-[#E6D5B8] text-4xl md:text-6xl lg:text-7xl ml-2">confiance</span>
          </h2>
        </motion.div>

        {/* Elegant Slider */}
        <div className="w-full max-w-4xl relative">
          <TestimonialSlider testimonials={testimonials} />
        </div>

      </div>
    </section>
  )
}

function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="relative w-full min-h-[300px] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-8 relative">
             <span className="absolute -top-8 -left-8 text-6xl text-[#E6D5B8]/20 font-serif">"</span>
             <p className="font-playfair text-xl md:text-3xl italic text-foreground/80 leading-relaxed max-w-2xl">
              {testimonials[currentIndex].text}
            </p>
            <span className="absolute -bottom-8 -right-8 text-6xl text-[#E6D5B8]/20 font-serif">"</span>
          </div>

          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="relative w-16 h-16 overflow-hidden rounded-full border border-[#E6D5B8]/30 p-1">
              <Image
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-sans uppercase tracking-[0.2em] text-xs font-medium text-foreground">
                {testimonials[currentIndex].name}
              </h4>
              <p className="font-playfair italic text-sm text-[#E6D5B8] mt-1">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="flex gap-3 mt-12">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-[#E6D5B8]" : "w-2 bg-[#E6D5B8]/30 hover:bg-[#E6D5B8]/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
