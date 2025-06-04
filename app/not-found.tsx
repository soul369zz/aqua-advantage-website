import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-blue-500 text-6xl mb-4">🌊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link
            href="/aquaspa"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Browse Our Spas
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Return to Home
          </Link>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          <p>Popular spa collections:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Link href="/aquaspa/grand-bahama" className="text-blue-600 hover:underline">
              Island Series
            </Link>
            <span>•</span>
            <Link href="/aquaspa/wisteria" className="text-blue-600 hover:underline">
              Garden Series
            </Link>
            <span>•</span>
            <Link href="/aquaspa/activeplus-ep-12" className="text-blue-600 hover:underline">
              TidalFit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 