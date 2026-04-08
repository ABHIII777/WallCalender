"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

type Props = {
  month: number
}

export default function RightDesign({ month }: Props) {

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const images = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517817748491-5c5b87b79f2d?q=80&w=1200&auto=format&fit=crop",
  ]

  const safeMonth = ((month ?? new Date().getMonth()) % 12 + 12) % 12

  const monthName = new Date(2026, safeMonth).toLocaleString("default", {
    month: "long"
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(panelRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        "-=0.6"
      )
      .fromTo(textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.4"
      )
    }, containerRef)

    return () => ctx.revert()
  }, [safeMonth])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-white">

      <img
        ref={imageRef}
        src={images[safeMonth]}
        alt={monthName}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 65%, 40% 100%, 0 100%)"
        }}
      />

      <div
        ref={panelRef}
        className="absolute bottom-0 right-0 w-56 h-40 bg-blue-500 z-20 rounded-br-2xl"
        style={{
          clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)"
        }}
      />

      <div ref={textRef} className="absolute bottom-8 right-8 z-30 text-white text-right">
        <p className="text-sm opacity-80">2026</p>
        <h2 className="text-xl font-bold">{monthName}</h2>
      </div>

    </div>
  )
}