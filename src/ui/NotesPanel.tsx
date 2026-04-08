"use client"



export default function NotesPanel({ dateRange, notes, setNotes }: any) {

  if (!dateRange?.start) {
    return (
      <div className="text-sm text-gray-400 dark:text-slate-500 transition-colors duration-500">
        Select a date to add a note
      </div>
    )
  }

  const formatStr = (dStr: string) => {
    const [y, m, d] = dStr.split("-").map(Number);
    return new Date(y, m, d).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  }

  const rangeKey = dateRange.end ? `${dateRange.start}:${dateRange.end}` : dateRange.start;
  
  let formattedDate = formatStr(dateRange.start);
  if (dateRange.end) {
    formattedDate += ` - ${formatStr(dateRange.end)}`;
  }

  return (
    <div className="h-full flex flex-col">

      <div className="flex items-end justify-between font-bold text-gray-800 dark:text-slate-200 mb-4 px-1 transition-colors duration-500">
        <h3 className="text-sm">Notes</h3>
        {notes[rangeKey] && (
          <button
            onClick={() =>
              setNotes((prev: any) => {
                const copy = { ...prev }
                delete copy[rangeKey]
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
        className="flex-1 w-full resize-none bg-transparent p-1 px-2 text-sm text-gray-700 dark:text-slate-300 focus:outline-none placeholder-gray-300 dark:placeholder-slate-600 transition-colors duration-500"
        style={{
          lineHeight: "28px",
          backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(148, 163, 184, 0.2) 27px, rgba(148, 163, 184, 0.2) 28px)",
          backgroundAttachment: "local"
        }}
        placeholder={`Write notes for ${formattedDate}...`}
        value={notes[rangeKey] || ""}
        onChange={(e) =>
          setNotes((prev: any) => ({
            ...prev,
            [rangeKey]: e.target.value
          }))
        }
      />

    </div>
  )
}