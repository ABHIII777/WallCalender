import { Button } from "@/components/ui/button"

export default function Header({ currentDate, setCurrentDate, isAnimating }: any) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return (
    <div className="flex justify-end items-center mb-2 gap-2">

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full shadow-sm text-gray-500 hover:text-gray-900 border-gray-200 bg-white"
        onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
        disabled={isAnimating}
      >
        <span className="text-xs">←</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full shadow-sm text-gray-500 hover:text-gray-900 border-gray-200 bg-white"
        onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
        disabled={isAnimating}
      >
        <span className="text-xs">→</span>
      </Button>

    </div>
  )
}