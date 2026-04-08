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
    <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center mt-4">

      {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d, index) => {
        const isWeekend = index === 5 || index === 6

        return (
          <div
            key={d}
            className={`text-sm ${
              isWeekend
                ? "text-yellow-500 font-medium"
                : "text-gray-400"
            }`}
          >
            {d}
          </div>
        )
      })}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={"empty-" + i}></div>
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1
        const key = `${year}-${month}-${day}`

        const dayOfWeek = new Date(year, month, day).getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        const hasNote = notes[key]

        return (
          <div
            key={day}
            onClick={() => setSelectedDate(key)}
            className={`py-2 rounded-lg text-sm cursor-pointer transition
              hover:bg-yellow-100
              ${selectedDate === key ? "bg-yellow-300 font-semibold text-black" : ""}
              ${
                isWeekend
                  ? "text-yellow-500 font-medium"
                  : "text-gray-700"
              }
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