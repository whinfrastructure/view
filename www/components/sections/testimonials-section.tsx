"use client"

import { TestimonialsColumn } from "@/components/ui/testimonials-column"
import { motion } from "framer-motion"
import { DotPattern } from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"

interface TestimonialsSectionProps {
  isMobile?: boolean
}

const testimonials = [
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

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function TestimonialsSection({ isMobile = false }: TestimonialsSectionProps) {
  return (
    <section 
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-neutral-50 ${isMobile ? "h-screen w-full snap-start py-8" : "w-screen h-screen"}`}
    >
      <DotPattern
        className={cn(
          "opacity-40 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="container z-10 mx-auto px-4 w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-8 md:mb-12"
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium text-neutral-700">
              TÉMOIGNAGES
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mt-4 md:mt-6 text-center leading-tight px-4">
            Ils nous ont fait{" "}
            <span 
              className="inline-block gradient-text whitespace-nowrap"
              style={{
                fontFamily: "'Dancing Script', cursive",
                background: "linear-gradient(135deg, #d4c5b0 0%, #e8dcc8 50%, #f5ede0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              confiance
            </span>
          </h2>
          
        </motion.div>

        <div className={`flex justify-center gap-3 md:gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] overflow-hidden ${isMobile ? "h-[400px]" : "h-[500px]"}`}>
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn 
            testimonials={secondColumn} 
            className="hidden md:block" 
            duration={19} 
          />
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            className="hidden lg:block" 
            duration={17} 
          />
        </div>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
      `}</style>
    </section>
  )
}
