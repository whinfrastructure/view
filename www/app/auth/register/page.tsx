"use client"

import { RegisterForm } from "@/components/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2 transition-transform hover:scale-105">
        <svg 
          className="h-10 w-10 text-black"
          viewBox="0 0 226.26 214.71"
        >
          <polygon fill="currentColor" points="34.37 58.99 52.78 58.99 100.51 165.6 80.96 165.6 34.37 58.99"/>
          <polygon fill="currentColor" points="83.01 58.99 100.51 58.99 118.24 97.63 108.92 115.36 83.01 58.99"/>
          <polygon fill="currentColor" points="118.24 137.87 126.88 119.68 148.93 165.6 130.06 165.6 118.24 137.87"/>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="100.51" y1="155.37" x2="143.25" y2="60.58"/>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="125.28" y1="100.44" x2="173.48" y2="100.82"/>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" x1="149.38" y1="154.24" x2="191.89" y2="61.95"/>
        </svg>
        <span className="font-sans text-xl font-semibold tracking-tight text-black">WelkomHome</span>
      </Link>

      {/* Register Form Card */}
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl">
        <RegisterForm />
      </div>

      {/* Back to home */}
      <Link 
        href="/" 
        className="mt-6 text-sm text-neutral-600 hover:text-black transition-colors underline-offset-4 hover:underline"
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  )
}
