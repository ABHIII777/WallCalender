export default function ImageSection() {
  return (
    <div className="w-full h-full relative">

      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        className="w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: "polygon(0 0, 60% 0, 30% 100%, 0% 100%)"
        }}
      />

      <div
        className="absolute bg-yellow-400 w-32 h-32 top-0 left-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)"
        }}
      />

      <div className="absolute bottom-6 right-6 bg-white p-4 shadow-lg rounded-lg w-48">
        <h3 className="font-bold text-gray-700">Company Name</h3>
        <p className="text-xs text-gray-500 mt-2">
          info@company.com
        </p>
      </div>

    </div>
  )
}