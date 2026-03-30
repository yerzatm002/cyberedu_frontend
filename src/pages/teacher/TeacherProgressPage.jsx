import MainLayout from '@/components/layout/MainLayout'
import mockStudents from '@/data/mockStudents'

const TeacherProgressPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Оқу прогресі</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде оқушылардың үлгерімі мен орташа нәтижелері көрсетіледі
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Топтағы оқушылар саны</p>
            <p className="mt-3 text-3xl font-bold text-green-800">
              {mockStudents.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Орташа прогресс</p>
            <p className="mt-3 text-3xl font-bold text-green-800">71%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Орташа тест нәтижесі</p>
            <p className="mt-3 text-3xl font-bold text-green-800">80%</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-green-800">
            Оқушылар бойынша мәлімет
          </h3>

          <div className="mt-6 space-y-4">
            {mockStudents.map((student) => (
              <div
                key={student.id}
                className="rounded-2xl border border-green-100 bg-green-50 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {student.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">{student.email}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === 'Белсенді'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {student.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-600">Аяқталған сабақтар</span>
                      <span className="text-sm font-semibold text-green-800">
                        {student.completedLessons}/6
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-green-100">
                      <div
                        className="h-full rounded-full bg-green-700"
                        style={{
                          width: `${Math.round(
                            (student.completedLessons / 6) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-600">Орташа балл</span>
                      <span className="text-sm font-semibold text-green-800">
                        {student.averageScore}%
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-green-100">
                      <div
                        className="h-full rounded-full bg-yellow-400"
                        style={{ width: `${student.averageScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherProgressPage