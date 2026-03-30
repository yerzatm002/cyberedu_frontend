import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <div className="max-w-lg">
        <div className="mb-6 text-7xl">🔍</div>
        <h1 className="text-5xl font-bold text-green-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Кешіріңіз, бұл бет табылмады.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Сіз енгізген сілтеме қате болуы мүмкін немесе бет әлі жасалмаған.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          Бас бетке оралу
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage