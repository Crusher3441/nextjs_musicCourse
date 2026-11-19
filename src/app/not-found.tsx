import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black/[0.96] flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-bold text-white mb-4">404</h1>
      <p className="text-gray-400 mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition"
      >
        Go Home
      </Link>
    </div>
  )
}