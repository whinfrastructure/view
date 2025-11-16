"use client"

import { useEffect, useRef } from "react"

interface GradientMeshProps {
  colors: string[]
  distortion?: number
  swirl?: number
  speed?: number
  rotation?: number
  waveAmp?: number
  waveFreq?: number
  waveSpeed?: number
  grain?: number
}

export function GradientMesh({
  colors,
  distortion = 8,
  swirl = 0.2,
  speed = 1,
  rotation = 90,
  waveAmp = 0.2,
  waveFreq = 20,
  waveSpeed = 0.2,
  grain = 0.06,
}: GradientMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      if (!ctx || !canvas) return

      time += 0.01 * speed

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      )

      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color)
      })

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add animated wave effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4

          // Wave distortion
          const wave =
            Math.sin(x * waveFreq * 0.01 + time * waveSpeed) * waveAmp * 10 +
            Math.cos(y * waveFreq * 0.01 + time * waveSpeed) * waveAmp * 10

          // Add grain
          const grainValue = (Math.random() - 0.5) * grain * 255

          pixels[index] += wave + grainValue
          pixels[index + 1] += wave + grainValue
          pixels[index + 2] += wave + grainValue
        }
      }

      ctx.putImageData(imageData, 0, 0)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [colors, distortion, swirl, speed, rotation, waveAmp, waveFreq, waveSpeed, grain])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
