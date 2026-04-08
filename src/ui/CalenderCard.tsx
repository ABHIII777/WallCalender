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

    const [selectedDate, setSelectedDate] = useState<string | null>(() => {
        const today = new Date()
        return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
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

        const direction = currentDate > displayDate ? -1 : 1
        setIsAnimating(true)

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                onComplete: () => {
                    setDisplayDate(currentDate)
                    setIsAnimating(false)
                    
                    if (selectedDate) {
                        const [y, m] = selectedDate.split("-").map(Number)
                        if (y !== currentDate.getFullYear() || m !== currentDate.getMonth()) {
                            setSelectedDate(`${currentDate.getFullYear()}-${currentDate.getMonth()}-1`)
                        }
                    }

                    // Force clear GSAP styles safely
                    gsap.set([currentRef.current, nextRef.current], { clearProps: "all" })
                }
            })

            const nextZIndex = direction === 1 ? 30 : 10;
            const currentZIndex = direction === 1 ? 10 : 30;

            // next page initial state
            gsap.set(nextRef.current, {
                rotateY: direction === 1 ? -120 : 120, // deeper rotation
                transformOrigin: direction === 1 ? "left center" : "right center",
                z: -50,
                opacity: 0, // starts invisible
                scale: 0.96,
                zIndex: nextZIndex
            })

            gsap.set(currentRef.current, {
                zIndex: currentZIndex,
                opacity: 1
            })

            tl
                // current page leaves, fading out completely
                .to(currentRef.current, {
                    rotateY: direction === 1 ? 120 : -120,
                    transformOrigin: direction === 1 ? "right center" : "left center",
                    z: -50,
                    opacity: 0, // becomes invisible BEFORE it reaches edge-on constraints
                    scale: 0.98,
                    duration: 1.2,
                    ease: "power3.inOut"
                }, 0)

                // next page enters, fading in
                .to(nextRef.current, {
                    rotateY: 0,
                    opacity: 1,
                    z: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.inOut"
                }, 0) // starts at exactly same time (0)

        }, containerRef)

        return () => ctx.revert()
    }, [currentDate])

    return (
        <div
            ref={containerRef}
            style={{ perspective: "1800px" }}
            className="h-[800px] w-[500px] relative mt-10"
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
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
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
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
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
    selectedDate,
    setSelectedDate,
    notes,
    setNotes,
    setCurrentDate,
    isAnimating
}: any) {

    const year = date.getFullYear()
    const month = date.getMonth()

    return (
        <Card className="h-full w-full overflow-hidden flex flex-col rounded-2xl shadow-[-25px_25px_40px_-10px_rgba(0,0,0,0.15)] bg-white">

            <div className="h-[55%] shrink-0 relative overflow-visible z-10">
                <RightDesign month={month} year={year} />
            </div>

            {/* No divider needed based on design */}

            <div className="flex-1 bg-white pt-2 pb-6 px-6 flex gap-6 overflow-hidden z-0">

                <div className="w-[35%] h-full pt-10">
                    <NotesPanel
                        selectedDate={selectedDate}
                        notes={notes}
                        setNotes={setNotes}
                    />
                </div>

                <div className="w-[65%] flex flex-col pt-2">

                    <Header
                        currentDate={date}
                        setCurrentDate={setCurrentDate}
                        isAnimating={isAnimating}
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