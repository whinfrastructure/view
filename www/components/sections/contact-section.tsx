"use client"

import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"
import { useState } from "react"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.2)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section 
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 items-center bg-white px-6 py-20 md:px-12"
    >
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-3 font-sans text-3xl font-light text-black md:text-4xl">
            Contactez-nous
          </h2>
          <p className="mb-6 text-base text-black/60">
            Une question ? Un projet ? N'hésitez pas à nous contacter
          </p>

          <div className="mb-6 rounded-xl bg-gray-50 border border-gray-200 p-5">
            <p className="text-xl font-medium text-black mb-1">
              +33 668 192 755
            </p>
            <p className="text-sm text-black/50">
              Disponible 7j/7
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Nom complet"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-gray-400 focus:outline-none transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-gray-400 focus:outline-none transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <input
                type="tel"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-gray-400 focus:outline-none transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <textarea
                placeholder="Votre message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-gray-400 focus:outline-none transition-all resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full rounded-full bg-black px-8 py-3 text-sm text-white font-medium transition-all duration-300 hover:bg-black/80"
            >
              Envoyer le message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
