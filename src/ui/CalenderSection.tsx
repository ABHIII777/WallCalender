export default function CalenderSection () {
    return (
        <div className="h-full flex flex-col justify-between">
            <div>
                <div className="flex item-denter gap-2">
                    <span className="bg-yellow-400 text-white px-3 py-1 text-sm font-bold">01</span>
                    <div>
                        <h2 className="text-gray-700 font-semibold">2026</h2>
                        <p className="text-gray-400 text-sm">January</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 test-center text-gray600 text-sm">
                {["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"].map(d => (
                    <div className="font-medium" key={d}>{d}</div>
                ))}

                {
                    Array.from({length: 31}, (_, i) => (
                        <div key={i} className="py-1 hover:text-yellow-500 cursor-pointer">{i + 1}</div>
                    ))
                }
            </div>
        </div>
    );
}