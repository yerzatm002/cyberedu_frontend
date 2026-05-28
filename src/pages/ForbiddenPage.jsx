import { Link } from 'react-router-dom'

const ForbiddenPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="text-6xl">🚫</div>

        <h1 className="mt-6 text-3xl font-bold text-green-900">
          Қолжетімділік шектелген
        </h1>

        <p className="mt-3 text-gray-600">
          Бұл бетке кіруге сіздің рөліңізге рұқсат берілмеген.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          Кіру бетіне өту
        </Link>
      </div>
    </div>
  )
}

export default ForbiddenPage