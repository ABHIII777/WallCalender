"use client"



export default function NotesPanel({ selectedDate, notes, setNotes }: any) {

  if (!selectedDate) {
    return (
      <div className="text-sm text-gray-400">
        Select a date to add a note
      </div>
    )
  }

  const [y, m, d] = selectedDate.split("-").map(Number)
  const dateObj = new Date(y, m, d)
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  })

  return (
    <div className="h-full flex flex-col">

      <div className="flex items-end justify-between font-bold text-gray-800 mb-4 px-1">
        <h3 className="text-sm">Notes</h3>
        {notes[selectedDate] && (
          <button
            onClick={() =>
              setNotes((prev: any) => {
                const copy = { ...prev }
                delete copy[selectedDate]
                return copy
              })
            }
            className="text-[10px] uppercase font-bold text-red-400 hover:text-red-600 tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      <textarea
        className="flex-1 w-full resize-none bg-transparent p-1 px-2 text-sm text-gray-700
        focus:outline-none placeholder-gray-300"
        style={{
          lineHeight: "28px",
          backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)",
          backgroundAttachment: "local"
        }}
        placeholder={`Write notes for ${formattedDate}...`}
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