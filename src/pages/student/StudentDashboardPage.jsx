import { Link } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import { useStudentProgress } from '@/features/progress/progress.queries'

const StudentDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const { data, isLoading, isError, error } = useStudentProgress()

  const course = data?.course
  const summary = data?.summary
  const lessons = data?.lessons || []

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Оқушы дашборды</h2>
          <p className="mt-2 text-gray-600">
            Қош келдіңіз, {user?.fullName || user?.name}. Мұнда оқу барысыңыз көрсетіледі.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Прогресс жүктеліп жатыр...
          </div>
        )}

        {isError && (
          <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && summary && (
          <>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Курс</p>
              <h3 className="mt-2 text-2xl font-semibold text-green-900">
                {course?.title || 'CyberQazaq.kz курсы'}
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Аяқталған сабақтар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.completedLessons}/{summary.totalLessons}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Жалпы прогресс</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.completionPercent}%
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Курс күйі</p>
                <p className="mt-3 text-2xl font-bold text-green-800">
                  {summary.isCompleted ? 'Аяқталды' : 'Орындалып жатыр'}
                </p>
              </div>
            </div>

            {summary.currentLesson && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-green-800">
                  Ағымдағы сабақ
                </h3>

                <p className="mt-4 text-lg font-medium text-gray-900">
                  {summary.currentLesson.title}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Статус: {summary.currentLesson.status}
                </p>

                {!summary.currentLesson.isLocked && (
                  <Link
                    to={`/student/lesson/${summary.currentLesson.lessonId}`}
                    className="mt-5 inline-block rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    Сабақты жалғастыру
                  </Link>
                )}
              </div>
            )}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-green-800">
                Сабақтар бойынша қысқаша прогресс
              </h3>

              <div className="mt-5 space-y-3">
                {lessons.slice(0, 5).map((lesson) => (
                  <div
                    key={lesson.lessonId}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-green-50 p-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {lesson.orderIndex}. {lesson.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Ең жақсы балл: {lesson.bestScore ?? '-'}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        lesson.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : lesson.isLocked
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {lesson.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default StudentDashboardPage