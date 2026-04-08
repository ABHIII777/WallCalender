"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function NotesPanel({ selectedDate, notes, setNotes }: any) {

  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectedDate) return

    const ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 }
      )
    })

    return () => ctx.revert()
  }, [selectedDate])

  if (!selectedDate) {
    return (
      <div className="mt-4 text-sm text-gray-400 text-center">
        Select a date to add a note
      </div>
    )
  }

  const formattedDate = new Date(selectedDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div ref={panelRef} className="mt-4 border-t pt-4">

      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">
          Notes for {formattedDate}
        </p>

        {notes[selectedDate] && (
          <button
            onClick={() =>
              setNotes((prev: any) => {
                const copy = { ...prev }
                delete copy[selectedDate]
                return copy
              })
            }
            className="text-xs text-red-400 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>

      <textarea
        className="w-full resize-none rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
        rows={3}
        placeholder="Write something..."
        value={notes[selectedDate] || ""}
        onChange={(e) =>
          setNotes((prev: any) => ({
            ...prev,
            [selectedDate]: e.target.value
          }))
        }
      />

    </div>
  )
}