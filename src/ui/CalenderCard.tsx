"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import gsap from "gsap"

import CalendarGrid from "./CalenderGrid"
import NotesPanel from "./NotesPanel"
import Header from "./Header"
import RightDesign from "./RightDesign"

export default function CalendarCard() {

  const [currentDate, setCurrentDate] = useState(new Date())
  const [displayDate, setDisplayDate] = useState(currentDate)

  const containerRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  const [selectedDate, setSelectedDate] = useState<string | null>(() => {
    const today = new Date()
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  })

  const [notes, setNotes] = useState<{ [key: string]: string }>({})

  const year = displayDate.getFullYear()
  const month = displayDate.getMonth()

  const nextYear = currentDate.getFullYear()
  const nextMonth = currentDate.getMonth()

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes")
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes))
  }, [notes])

  // 🔥 PAGE FLIP ANIMATION
  useEffect(() => {
    if (currentDate.getTime() === displayDate.getTime()) return

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        onComplete: () => setDisplayDate(currentDate)
      })

      gsap.set(nextRef.current, {
        rotateY: -90,
        transformOrigin: "left center"
      })

      tl.to(currentRef.current, {
        rotateY: 90,
        transformOrigin: "right center",
        duration: 0.8,
        ease: "power2.in"
      })
      .to(nextRef.current, {
        rotateY: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")

    }, containerRef)

    return () => ctx.revert()
  }, [currentDate])

  return (
    <div
      ref={containerRef}
      style={{ perspective: "1500px" }}
      className="h-[800px] w-[500px] relative"
    >

      {/* CURRENT PAGE */}
      <div
        ref={currentRef}
        className="absolute inset-0"
        style={{ backfaceVisibility: "hidden" }}
      >
        <CardContent
          date={displayDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          notes={notes}
          setNotes={setNotes}
          setCurrentDate={setCurrentDate}
        />
      </div>

      {/* NEXT PAGE */}
      <div
        ref={nextRef}
        className="absolute inset-0"
        style={{ backfaceVisibility: "hidden" }}
      >
        <CardContent
          date={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          notes={notes}
          setNotes={setNotes}
          setCurrentDate={setCurrentDate}
        />
      </div>

    </div>
  )
}

function CardContent({
  date,
  selectedDate,
  setSelectedDate,
  notes,
  setNotes,
  setCurrentDate
}: any) {

  const year = date.getFullYear()
  const month = date.getMonth()

  return (
    <Card className="h-full w-full overflow-hidden flex flex-col rounded-2xl shadow-xl">

      <div className="h-[40%] shrink-0 relative overflow-hidden">
        <RightDesign month={month} />
      </div>

      <div className="h-[1px] shrink-0 bg-gray-200" />

      <div className="flex-1 bg-white p-6 flex gap-4 overflow-hidden">

        <div className="w-[38%] h-full overflow-y-auto">
          <NotesPanel
            selectedDate={selectedDate}
            notes={notes}
            setNotes={setNotes}
          />
        </div>

        <div className="w-[1px] bg-gray-200" />

        <div className="w-[62%] flex flex-col">

          <Header
            currentDate={date}
            setCurrentDate={setCurrentDate}
          />

          <div className="mt-2 flex-1 overflow-y-auto">
            <CalendarGrid
              year={year}
              month={month}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              notes={notes}
            />
          </div>

        </div>

      </div>

    </Card>
  )
}