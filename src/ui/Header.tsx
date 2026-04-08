import { Button } from "@/components/ui/button"

export default function Header({ currentDate, setCurrentDate, isAnimating }: any) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return (
    <div className="flex justify-between items-center mb-6">

      <Button
        variant="ghost"
        onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
        disabled={isAnimating}
      >
        ←
      </Button>

      <h2 className="text-xl font-semibold text-gray-700">
        {currentDate.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <Button
        variant="ghost"
        onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
        disabled={isAnimating}
      >
        →
      </Button>

    </div>
  )
}