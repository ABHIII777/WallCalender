"use client"



export default function CalendarGrid({
  year,
  month,
  selectedDate,
  setSelectedDate,
  notes
}: any) {

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7 // Monday as first day

  const weekDays = ["MON","TUE","WED","THU","FRI","SAT","SUN"]

  return (
    <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">

      {weekDays.map((d, index) => (
        <div 
          key={d} 
          className={`text-xs font-bold ${index >= 5 ? 'text-[#1ea0df]' : 'text-gray-800'}`}
        >
          {d}
        </div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={"empty-" + i} className="text-gray-300 text-sm font-medium py-1">
           {new Date(year, month, 0 - (firstDay - i - 1)).getDate()}
        </div>
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1
        const key = `${year}-${month}-${day}`
        const hasNote = notes[key]
        
        // Calculate day of week for this specific date (0 = Sun, 1 = Mon ... 6 = Sat)
        const dateObj = new Date(year, month, day)
        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6

        return (
          <div
            key={day}
            onClick={() => setSelectedDate(key)}
            className={`day py-1 rounded-md text-sm font-medium cursor-pointer transition relative
              hover:bg-blue-50
              ${selectedDate === key ? "bg-blue-100 text-blue-800 font-bold" : (isWeekend ? "text-[#1ea0df]" : "text-gray-800")}
            `}
          >
            {day}
            {hasNote && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1ea0df] rounded-full" />
            )}
          </div>
        )
      })}

    </div>
  )
}