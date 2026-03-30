import MainLayout from '@/components/layout/MainLayout'
import mockLessons from '@/data/mockLessons'

const StudentDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  const completedLessons = mockLessons.filter((lesson) => lesson.completed).length
  const totalLessons = mockLessons.length
  const progress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Оқушы дашборды</h2>
          <p className="mt-2 text-gray-600">
            Қош келдіңіз, {user?.name}. Мұнда сіздің оқу барысыңыз көрсетіледі.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Аяқталған сабақтар</p>
            <p className="mt-3 text-3xl font-bold text-green-800">
              {completedLessons}/{totalLessons}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Жалпы прогресс</p>
            <p className="mt-3 text-3xl font-bold text-green-800">{progress}%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Орташа нәтиже</p>
            <p className="mt-3 text-3xl font-bold text-green-800">78%</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-800">Соңғы белсенділік</h3>
          <p className="mt-4 text-gray-700">
            Сіз соңғы рет «OSI моделі: 7 қабат және олардың рөлі» сабағын аштыңыз.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default StudentDashboardPage