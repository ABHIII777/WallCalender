"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import gsap from "gsap"

import CalendarGrid from "./CalenderGrid"
import NotesPanel from "./NotesPanel"
import Header from "./Header"
import RightDesign from "./RightDesign"

export default function CalendarCard() {

    const [currentDate, setCurrentDate] = useState(new Date())
    const [displayDate, setDisplayDate] = useState(currentDate)
    const [isAnimating, setIsAnimating] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const currentRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const shadowRef = useRef<HTMLDivElement>(null)

    const [dateRange, setDateRange] = useState<{start: string | null, end: string | null}>(() => {
        const today = new Date()
        return { start: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`, end: null }
    })

    const [notes, setNotes] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const saved = localStorage.getItem("calendar-notes")
        if (saved) setNotes(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem("calendar-notes", JSON.stringify(notes))
    }, [notes])

    useLayoutEffect(() => {
        if (currentDate.getTime() === displayDate.getTime()) return

        setIsAnimating(true)

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                onComplete: () => {
                    setDisplayDate(currentDate)
                    setIsAnimating(false)
                    
                    // We no longer reset the date selection here because a range might span months

                    // Force clear GSAP styles safely
                    gsap.set([currentRef.current, nextRef.current], { clearProps: "all" })
                }
            })

            // We use the same tearing animation for both directions now.
            const nextZIndex = 10;
            const currentZIndex = 30;

            // Tearing off the current page
            gsap.set(nextRef.current, {
                clearProps: "transform",
                scale: 0.9,
                opacity: 0,
                zIndex: nextZIndex
            });

            gsap.set(currentRef.current, {
                clearProps: "transform",
                transformOrigin: "top left",
                zIndex: currentZIndex,
                opacity: 1
            });

            tl
              .to(currentRef.current, {
                  y: 1200,          // Drop far out of view for taller screens
                  rotationZ: -25,    // Rip from top left
                  opacity: 0,
                  duration: 0.9,
                  ease: "power2.in"
              }, 0)
              .to(nextRef.current, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power3.out"
              }, 0.2); // slight delay

        }, containerRef)

        return () => ctx.revert()
    }, [currentDate])

    return (
        <div
            ref={containerRef}
            style={{ perspective: "1800px" }}
            className="w-full max-w-[500px] h-[90vh] md:h-[85vh] min-h-[500px] md:min-h-[700px] max-h-[850px] relative mt-2 md:mt-10 mx-auto"
        >

            {/* SHADOW OVERLAY (adds realism) */}
            <div
                ref={shadowRef}
                className="absolute inset-0 bg-black z-10 pointer-events-none"
                style={{ opacity: 0 }}
            />

            {/* CURRENT PAGE */}
            <div
                ref={currentRef}
                className="absolute inset-0 z-20"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
                <CardContent
                    date={displayDate}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    notes={notes}
                    setNotes={setNotes}
                    setCurrentDate={setCurrentDate}
                    isAnimating={isAnimating}
                />
            </div>

            {/* NEXT PAGE */}
            <div
                ref={nextRef}
                className="absolute inset-0 z-0"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
                <CardContent
                    date={currentDate}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    notes={notes}
                    setNotes={setNotes}
                    setCurrentDate={setCurrentDate}
                    isAnimating={isAnimating}
                />
            </div>

        </div>
    )
}

function CardContent({
    date,
    dateRange,
    setDateRange,
    notes,
    setNotes,
    setCurrentDate,
    isAnimating
}: any) {

    const year = date.getFullYear()
    const month = date.getMonth()

    return (
        <Card className="h-full w-full overflow-hidden flex flex-col rounded-xl shadow-[-40px_50px_80px_-15px_rgba(0,0,0,0.3)] bg-white dark:bg-slate-800 dark:border-slate-700 transition-colors duration-500">

            <div className="h-[35%] md:h-[50%] shrink-0 relative overflow-visible z-10 transition-all duration-300">
                <RightDesign month={month} year={year} />
            </div>

            {/* No divider needed based on design */}

            <div className="flex-1 bg-white dark:bg-slate-800 pt-2 pb-4 md:pb-6 px-4 md:px-6 flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden z-0 transition-colors duration-500">

                <div className="w-full md:w-[35%] flex-1 min-h-[90px] md:min-h-[140px] md:h-full md:pt-10 order-2 md:order-1 overflow-hidden">
                    <NotesPanel
                        dateRange={dateRange}
                        notes={notes}
                        setNotes={setNotes}
                    />
                </div>

                <div className="w-full md:w-[65%] flex flex-col pt-2 order-1 md:order-2 shrink-0 h-auto md:h-full">

                    <Header
                        currentDate={date}
                        setCurrentDate={setCurrentDate}
                        isAnimating={isAnimating}
                    />

                    <div className="mt-2 flex-1 overflow-y-auto mb-2 md:mb-0">
                        <CalendarGrid
                            year={year}
                            month={month}
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            notes={notes}
                        />
                    </div>

                </div>

            </div>

        </Card>
    )
}