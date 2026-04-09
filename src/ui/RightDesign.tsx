"use client"

type Props = {
    month: number
    year?: number
}

export default function RightDesign({ month, year }: Props) {

    const images = [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop",
        // "https://images.unsplash.com/photo-1517817748491-5c5b87b79f2d?q=80&w=1200&auto=format&fit=crop",
        // "https://images.unsplash.com/photo-1608889175119-5a0d8a9a4b3f?q=80&w=1200&auto=format&fit=crop"

        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
    ]

    const safeMonth = ((month ?? new Date().getMonth()) % 12 + 12) % 12

    const monthName = new Date(year ?? 2026, safeMonth).toLocaleString("default", {
        month: "long"
    }).toUpperCase()

    const displayYear = year ?? 2026

    return (
        <div className="w-full h-full relative bg-white dark:bg-slate-800 transition-colors duration-500">

            {/* IMAGE */}
            <img
                src={images[safeMonth]}
                alt={monthName}
                className="absolute top-0 left-0 w-full h-[150%] object-cover object-center"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 45%, 50% 70%, 0 45%)"
                }}
            />

            {/* BLUE V - LEFT WING */}
            <div
                className="absolute top-0 left-0 w-full h-[150%] bg-[#1ea0df] z-10"
                style={{
                    clipPath: "polygon(0 45%, 50% 70%, 0 70%)"
                }}
            />

            {/* BLUE V - RIGHT WING text container */}
            <div
                className="absolute top-0 left-0 w-full h-[150%] bg-[#1ea0df] z-10"
                style={{
                    clipPath: "polygon(100% 45%, 100% 70%, 50% 70%)"
                }}
            >
                <div className="absolute right-4 md:right-8 top-[55%] z-30 text-white text-right">
                    <p className="text-lg md:text-2xl font-light tracking-widest">{displayYear}</p>
                    <h2 className="text-xl md:text-3xl font-bold tracking-wider">{monthName}</h2>
                </div>
            </div>

        </div>
    )
}
