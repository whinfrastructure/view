"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.2)

  const services = [
    {
      icon: "🏠",
      title: "Disponibilité",
      description: "Nos équipes locales sont disponibles à tout moment pendant votre séjour dans toutes nos destinations"
    },
    {
      icon: "🔒",
      title: "Confidentialité",
      description: "Le respect de votre vie privée est le fondement de notre relation avec vous"
    },
    {
      icon: "💎",
      title: "Meilleure offre",
      description: "Nous travaillons directement avec nos propriétaires pour vous assurer les prix les plus justes"
    },
    {
      icon: "⭐",
      title: "Exclusivité",
      description: "Des logements que nous proposons en exclusivité et que vous ne trouverez nulle part ailleurs"
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
            Nos Services
          </h2>
          <p className="max-w-2xl text-base text-black/60">
            Une expérience unique pour un séjour inoubliable
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group rounded-xl bg-gray-50 border border-gray-200 p-6 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300"
            >
              <div className="mb-3 text-4xl">{service.icon}</div>
              <h3 className="mb-2 text-lg font-medium text-black">{service.title}</h3>
              <p className="text-sm text-black/60 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
