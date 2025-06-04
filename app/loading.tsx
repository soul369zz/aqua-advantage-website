export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="mt-4">
          <div className="text-blue-600 text-2xl font-bold">🌊</div>
          <p className="text-gray-600 mt-2">Loading Aqua Advantage...</p>
        </div>
      </div>
    </div>
  )
} 