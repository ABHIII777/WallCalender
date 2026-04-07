export default function CalendarGrid({
  year,
  month,
  selectedDate,
  setSelectedDate,
  notes
}: any) {

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7

  return (
    <div className="grid grid-cols-7 gap-x-2 gap-y-3 text-center mt-4">

      {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => (
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
            className={`p-2 rounded-lg cursor-pointer transition
              hover:bg-yellow-100
              ${selectedDate === key ? "bg-yellow-300 text-black" : ""}
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