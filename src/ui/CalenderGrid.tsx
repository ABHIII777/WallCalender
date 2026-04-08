"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export default function CalendarGrid({
  year,
  month,
  selectedDate,
  setSelectedDate,
  notes
}: any) {

  const gridRef = useRef<HTMLDivElement>(null)

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".day",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out"
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [month])

  return (
    <div ref={gridRef} className="grid grid-cols-7 gap-y-3 gap-x-2 text-center mt-4">

      {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d, index) => (
        <div key={d} className="text-sm text-gray-400">{d}</div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={"empty-" + i}></div>
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1
        const key = `${year}-${month}-${day}`
        const hasNote = notes[key]

        return (
          <div
            key={day}
            onClick={() => setSelectedDate(key)}
            className={`day py-2 rounded-lg text-sm cursor-pointer transition
              hover:bg-yellow-100
              ${selectedDate === key ? "bg-yellow-300 font-semibold" : ""}
            `}
          >
            {day}
            {hasNote && (
              <div className="w-1 h-1 bg-red-500 mx-auto mt-1 rounded-full" />
            )}
          </div>
        )
      })}

    </div>
  )
}