import { LoginForm } from "@/components/login-form"
import { GradientMesh } from "@/components/gradient-mesh"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" aria-label="home" className="flex gap-2 items-center">
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
            <span className="font-sans text-lg font-semibold tracking-tight text-black">WelkomHome</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <GradientMesh
          colors={["#bcecf6", "#00aaff", "#ffd447"]}
          distortion={8}
          swirl={0.2}
          speed={1}
          rotation={90}
          waveAmp={0.2}
          waveFreq={20}
          waveSpeed={0.2}
          grain={0.06}
        />
      </div>
    </div>
  )
}
