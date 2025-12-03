"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface NavbarProps {
  currentSection: number
  scrollToSection: (index: number) => void
  isAtTop: boolean
}

interface DropdownItem {
  label: string
  description?: string
  icon?: string
  onClick: () => void
}

interface NavItem {
  label: string
  index: number
  dropdown?: DropdownItem[]
}

export function Navbar({ currentSection, scrollToSection, isAtTop }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const router = useRouter()

  // When at top of hero (section 0), use transparent/dark styling
  // When scrolled or on other sections, use solid white background
  const shouldBeTransparent = isAtTop && currentSection === 0

  const navItems: NavItem[] = [
    {
      label: "Accueil",
      index: 0,
    },
    {
      label: "Logements",
      index: 1,
      dropdown: [
        {
          label: "Tous les logements",
          description: "Découvrez notre collection complète",
          icon: "🏠",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Villas de luxe",
          description: "Propriétés haut de gamme",
          icon: "✨",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Vues sur mer",
          description: "Panoramas exceptionnels",
          icon: "🌊",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Avec piscine",
          description: "Espaces aquatiques privés",
          icon: "🏊",
          onClick: () => scrollToSection(1),
        },
      ],
    },
    {
      label: "Avis",
      index: 2,
    },
    {
      label: "À Propos",
      index: 3,
    },
    {
      label: "Contact",
      index: 4,
    },
    {
      label: "Services",
      index: -1,
      dropdown: [
        {
          label: "Conciergerie",
          description: "Service personnalisé 24/7",
          icon: "🔑",
          onClick: () => scrollToSection(3),
        },
        {
          label: "Chef à domicile",
          description: "Gastronomie raffinée",
          icon: "👨‍🍳",
          onClick: () => scrollToSection(3),
        },
        {
          label: "Transferts VIP",
          description: "Transport premium",
          icon: "🚗",
          onClick: () => scrollToSection(3),
        },
        {
          label: "Événements privés",
          description: "Organisation sur-mesure",
          icon: "🎉",
          onClick: () => scrollToSection(3),
        },
      ],
    },
    {
      label: "Destinations",
      index: -1,
      dropdown: [
        {
          label: "Saint-Tropez",
          description: "Élégance et glamour",
          icon: "⛵",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Les Issambres",
          description: "Tranquillité et authenticité",
          icon: "🏖️",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Sainte-Maxime",
          description: "Charme familial",
          icon: "🌊",
          onClick: () => scrollToSection(1),
        },
        {
          label: "Grimaud",
          description: "Village médiéval",
          icon: "🏰",
          onClick: () => scrollToSection(1),
        },
      ],
    },
  ]

  const handleMouseEnter = (label: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
      setActiveDropdown(label)
    }
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 transition-all duration-700 md:px-8 border-b opacity-100 ${
        shouldBeTransparent
          ? "text-black bg-white/95 backdrop-blur-md border-black/10 shadow-sm md:text-white md:bg-transparent md:border-transparent"
          : "text-black bg-white/95 backdrop-blur-md border-black/10 shadow-sm"
      }`}
      style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollToSection(0)}
        className="flex items-center gap-2 transition-transform hover:scale-105"
      >
        <svg 
          className={`h-9 w-9 transition-colors ${shouldBeTransparent ? "text-black md:text-white" : "text-black"}`}
          viewBox="0 0 226.26 214.71"
        >
          <polygon fill="currentColor" points="34.37 58.99 52.78 58.99 100.51 165.6 80.96 165.6 34.37 58.99"/>
          <polygon fill="currentColor" points="83.01 58.99 100.51 58.99 118.24 97.63 108.92 115.36 83.01 58.99"/>
          <polygon fill="currentColor" points="118.24 137.87 126.88 119.68 148.93 165.6 130.06 165.6 118.24 137.87"/>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="100.51" y1="155.37" x2="143.25" y2="60.58"/>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="125.28" y1="100.44" x2="173.48" y2="100.82"/>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="149.38" y1="154.24" x2="191.89" y2="61.95"/>
        </svg>
        <span className={`font-sans text-base font-semibold tracking-tight transition-colors ${
          shouldBeTransparent ? "text-black md:text-white" : "text-black"
        }`}>WelkomHome</span>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.label, !!item.dropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => item.index >= 0 && scrollToSection(item.index)}
              className={`group relative flex items-center gap-1 font-sans text-xs font-medium transition-colors ${
                currentSection === item.index 
                  ? (shouldBeTransparent ? "text-white" : "text-black")
                  : (shouldBeTransparent ? "text-white/80 hover:text-white" : "text-black/60 hover:text-black")
              }`}
            >
              {item.label}
              {item.dropdown && (
                <svg 
                  className={`w-3 h-3 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              <span
                className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  shouldBeTransparent ? "bg-white" : "bg-black"
                } ${currentSection === item.index ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {item.dropdown && activeDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full pt-2 min-w-[280px]"
                >
                  <div className="rounded-xl bg-white shadow-xl border border-neutral-200 overflow-hidden">
                    <div className="p-2">
                      {item.dropdown.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            dropdownItem.onClick()
                            setActiveDropdown(null)
                          }}
                          className="w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-neutral-50 group"
                        >
                          {dropdownItem.icon && (
                            <span className="text-2xl mt-0.5 transition-transform group-hover:scale-110">
                              {dropdownItem.icon}
                            </span>
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-sm text-neutral-900 mb-0.5">
                              {dropdownItem.label}
                            </div>
                            {dropdownItem.description && (
                              <div className="text-xs text-neutral-500">
                                {dropdownItem.description}
                              </div>
                            )}
                          </div>
                          <svg 
                            className="w-4 h-4 text-neutral-400 mt-1 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5 w-6">
          <span className={`h-0.5 w-full transition-all duration-300 bg-black ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`h-0.5 w-full transition-all duration-300 bg-black ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-full transition-all duration-300 bg-black ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </div>
      </button>

      {/* CTA Button - Desktop only */}
      <button
        onClick={() => router.push('/auth/register')}
        className={`hidden md:block rounded-full backdrop-blur-md px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
          shouldBeTransparent 
            ? "bg-white/10 border border-white/20 text-white hover:bg-white/20" 
            : "bg-black text-white hover:bg-black/80"
        }`}
      >
        Réserver
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-black/10">
                  <span className="font-sans text-lg font-semibold text-black">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 p-6">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        <button
                          onClick={() => {
                            if (item.index >= 0) {
                              scrollToSection(item.index)
                            }
                            setMobileMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                            currentSection === item.index
                              ? "bg-black text-white"
                              : "text-black hover:bg-black/5"
                          }`}
                        >
                          {item.label}
                        </button>
                        {item.dropdown && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.dropdown.map((dropdownItem, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  dropdownItem.onClick()
                                  setMobileMenuOpen(false)
                                }}
                                className="w-full text-left px-4 py-2 rounded-lg text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors flex items-center gap-2"
                              >
                                <span>{dropdownItem.icon}</span>
                                <span>{dropdownItem.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-black/10">
                  <button
                    onClick={() => {
                      router.push('/auth/register')
                      setMobileMenuOpen(false)
                    }}
                    className="w-full rounded-full bg-black text-white px-6 py-3 font-medium transition-all hover:bg-black/80"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
