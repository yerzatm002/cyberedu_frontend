import MainLayout from '@/components/layout/MainLayout'

const TeacherDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Мұғалім дашборды</h2>
          <p className="mt-2 text-gray-600">
            Мұнда оқушылардың белсенділігі мен оқу нәтижелері көрсетіледі.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Топтағы оқушылар саны</p>
            <p className="mt-3 text-3xl font-bold text-green-800">28</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Орташа белсенділік</p>
            <p className="mt-3 text-3xl font-bold text-green-800">82%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Орташа тест нәтижесі</p>
            <p className="mt-3 text-3xl font-bold text-green-800">74%</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-800">Жалпы ақпарат</h3>
          <p className="mt-4 text-gray-700">
            Бұл бетте кейін топ бойынша прогресс, сабақ статистикасы және
            тапсырмаларға пікір жазу мүмкіндігі қосылады.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherDashboardPage