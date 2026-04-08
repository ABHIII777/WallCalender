"use client"



export default function CalendarGrid({
  year,
  month,
  dateRange,
  setDateRange,
  notes
}: any) {

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7 // Monday as first day
  
  const weekDays = ["MON","TUE","WED","THU","FRI","SAT","SUN"]

  const parseDate = (dStr: string) => {
      const [y, m, d] = dStr.split('-').map(Number);
      return new Date(y, m, d).getTime();
  }

  const startT = dateRange?.start ? parseDate(dateRange.start) : null;
  const endT = dateRange?.end ? parseDate(dateRange.end) : null;

  const handleDateClick = (clickedKey: string) => {
      if (!dateRange?.start || (dateRange?.start && dateRange?.end)) {
          setDateRange({ start: clickedKey, end: null });
      } else {
          const clickedT = parseDate(clickedKey);
          if (startT && clickedT < startT) {
              setDateRange({ start: clickedKey, end: null });
          } else {
              setDateRange({ start: dateRange.start, end: clickedKey });
          }
      }
  }

  return (
    <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">

      {weekDays.map((d, index) => (
        <div 
          key={d} 
          className={`text-xs font-bold transition-colors duration-500 ${index >= 5 ? 'text-[#1ea0df]' : 'text-gray-800 dark:text-slate-300'}`}
        >
          {d}
        </div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={"empty-" + i} className="text-gray-300 dark:text-slate-600 text-sm font-medium py-1 transition-colors duration-500">
           {new Date(year, month, 0 - (firstDay - i - 1)).getDate()}
        </div>
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1
        const key = `${year}-${month}-${day}`
        const keyT = new Date(year, month, day).getTime()
        
        let hasNote = false;
        if (notes) {
            Object.keys(notes).forEach(noteKey => {
                const noteVal = notes[noteKey];
                if (!noteVal || noteVal.trim() === "") return;
                const parts = noteKey.split(":");
                if (parts.length === 1 && parts[0] === key) {
                    hasNote = true;
                } else if (parts.length === 2) {
                    const s = parseDate(parts[0]);
                    const e = parseDate(parts[1]);
                    if (keyT >= s && keyT <= e) hasNote = true;
                }
            });
        }
        
        // Calculate day of week for this specific date (0 = Sun, 1 = Mon ... 6 = Sat)
        const dateObj = new Date(year, month, day)
        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6

        const isStart = dateRange?.start === key;
        const isEnd = dateRange?.end === key;
        const isBetween = startT && endT && keyT > startT && keyT < endT;

        let cellClass = "day py-1 text-sm font-medium cursor-pointer transition-all duration-300 relative hover:bg-blue-50 dark:hover:bg-slate-700/50 ";
        let dotClass = "bg-[#1ea0df]";

        if (isStart && !dateRange?.end) {
            cellClass += "rounded-md bg-blue-100 dark:bg-[#1ea0df]/20 text-blue-800 dark:text-[#1ea0df] font-bold";
        } else if (isStart) {
            cellClass += "rounded-l-md bg-[#1ea0df] text-white font-bold";
            dotClass = "bg-white";
        } else if (isEnd) {
            cellClass += "rounded-r-md bg-[#1ea0df] text-white font-bold";
            dotClass = "bg-white";
        } else if (isBetween) {
            cellClass += "bg-blue-50 dark:bg-slate-700/50 text-[#1ea0df] font-bold";
        } else {
            cellClass += `rounded-md ${isWeekend ? "text-[#1ea0df]" : "text-gray-800 dark:text-slate-300"}`;
        }

        return (
          <div
            key={day}
            onClick={() => handleDateClick(key)}
            className={cellClass}
          >
            {day}
            {hasNote && (
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${dotClass}`} />
            )}
          </div>
        )
      })}

    </div>
  )
}