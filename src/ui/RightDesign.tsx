export default function RightDesign() {
  return (
    <div className="w-full h-full relative overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/10 z-[5]" />

      <div
        className="absolute inset-0 bg-white z-10"
        style={{
          clipPath: "polygon(0 75%, 100% 55%, 100% 100%, 0% 100%)"
        }}
      />

      <div
        className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 z-20"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)"
        }}
      />

      <div className="absolute bottom-6 right-6 z-30 bg-white p-4 rounded-xl shadow-xl w-52">
        <h3 className="font-semibold text-gray-700">Company Name</h3>
        <p className="text-xs text-gray-500 mt-2">
          info@company.com
        </p>
      </div>

      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20" />

    </div>
  )
}