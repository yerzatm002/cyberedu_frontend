import { Link } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import { useStudentLessons } from '@/features/lessons/lessons.queries'

const StudentLessonsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const { data, isLoading, isError, error } = useStudentLessons({
    page: 1,
    limit: 50,
  })

  const lessons = data?.items || []

  return (
    <MainLayout user={user}>
      <div>
        <h2 className="text-3xl font-bold text-green-900">Сабақтар тізімі</h2>
        <p className="mt-2 text-gray-600">
          Бұл бөлімде сізге қолжетімді сабақтар көрсетіледі.
        </p>

        {isLoading && (
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            Сабақтар жүктеліп жатыр...
          </div>
        )}

        {isError && (
          <div className="mt-8 rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {lessons.map((lesson) => {
              const isLocked = lesson.isLocked || lesson.progressStatus === 'locked'

              return (
                <div
                  key={lesson.id}
                  className={`rounded-3xl border p-6 shadow-sm ${
                    isLocked
                      ? 'border-gray-200 bg-gray-100'
                      : 'border-green-100 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Сабақ #{lesson.orderIndex || lesson.id}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-green-900">
                        {lesson.title}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        lesson.difficultyLevel === 'Бастауыш'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {lesson.difficultyLevel || lesson.level || 'Орта'}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                    {lesson.description || 'Сабақ сипаттамасы кейін қосылады'}
                  </p>

                  <div className="mt-5">
                    {lesson.progressStatus === 'completed' ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        Аяқталған
                      </span>
                    ) : isLocked ? (
                      <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                        Құлыпталған
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                        Қолжетімді
                      </span>
                    )}
                  </div>

                  {isLocked ? (
                    <button
                      disabled
                      className="mt-6 w-full cursor-not-allowed rounded-2xl bg-gray-300 px-5 py-3 text-sm font-semibold text-gray-500"
                    >
                      Алдыңғы сабақты аяқтау керек
                    </button>
                  ) : (
                    <Link
                      to={`/student/lesson/${lesson.id}`}
                      className="mt-6 block w-full rounded-2xl bg-green-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                      Сабақты ашу
                    </Link>
                  )}
                </div>
              )
            })}

            {lessons.length === 0 && (
              <div className="rounded-3xl bg-yellow-50 p-6 text-gray-700">
                Сабақтар табылмады
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default StudentLessonsPage