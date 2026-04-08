"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import CalendarGrid from "./CalenderGrid"
import NotesPanel from "./NotesPanel"
import Header from "./Header"
import RightDesign from "./RightDesign"

export default function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const [selectedDate, setSelectedDate] = useState<string | null>(() => {
    const today = new Date()
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  })

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
        <RightDesign month={month} />
      </div>

      <div className="h-[1px] shrink-0 bg-gray-200" />

      {/* BOTTOM CONTENT */}
      <div className="flex-1 bg-white p-6 flex gap-4 overflow-hidden">

        {/* NOTES */}
        <div className="w-[38%] h-full overflow-y-auto">
          <NotesPanel
            selectedDate={selectedDate}
            notes={notes}
            setNotes={setNotes}
          />
        </div>

        <div className="w-[1px] bg-gray-200" />

        {/* CALENDAR */}
        <div className="w-[62%] flex flex-col">

          <Header
            currentDate={currentDate}
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