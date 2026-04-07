"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import CalendarGrid from "./CalenderGrid"
import NotesPanel from "./NotesPanel"
import Header from "./Header"
import RightDesign from "./RightDesign"


export default function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [notes, setNotes] = useState<{ [key: string]: string }>({})

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes")
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes))
  }, [notes])

    return (
        <Card className="h-[800px] w-[500px] overflow-hidden flex flex-col rounded-2xl shadow-xl">

            {/* TOP IMAGE */}
            <div className="h-[40%] shrink-0 relative overflow-hidden">
            <RightDesign />
            </div>

            {/* DIVIDER (optional but clean) */}
            <div className="h-[1px] shrink-0 bg-gray-200" />

            {/* BOTTOM CONTENT */}
            <div className="flex-1 bg-white p-6 flex flex-col justify-between overflow-y-auto">

            <div>
                <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                />

                <CalendarGrid
                year={year}
                month={month}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                notes={notes}
                />
            </div>

            <NotesPanel
                selectedDate={selectedDate}
                notes={notes}
                setNotes={setNotes}
            />

            </div>

        </Card>
    )
}