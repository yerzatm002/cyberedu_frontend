import { Link } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import { useTeacherProgress } from '@/features/progress/progress.queries'

const TeacherDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const { data, isLoading, isError, error } = useTeacherProgress()

  const course = data?.course
  const summary = data?.summary
  const groups = data?.groups || []
  const recentActivities = data?.recentActivities || []

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Мұғалім дашборды</h2>
          <p className="mt-2 text-gray-600">
            Топтар, оқушылар прогресі және соңғы белсенділік бойынша қысқаша шолу
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Мұғалім прогресі жүктеліп жатыр...
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

            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Топтар саны</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.groupsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Оқушылар саны</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.studentsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Орташа прогресс</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.averageProgress}%
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Орташа балл</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.averageScore ?? 0}%
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-green-800">
                      Топтар бойынша прогресс
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Мұғалімге бекітілген топтардың оқу динамикасы
                    </p>
                  </div>

                  <Link
                    to="/teacher/progress"
                    className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    Толық көру
                  </Link>
                </div>

                <div className="mt-6 space-y-4">
                  {groups.map((item) => (
                    <div
                      key={item.group.id}
                      className="rounded-2xl border border-green-100 bg-green-50 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.group.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            {item.summary.studentsCount} оқушы •{' '}
                            {item.summary.completedStudents} курс аяқтады
                          </p>
                        </div>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          {item.summary.averageProgress}%
                        </span>
                      </div>

                      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-green-100">
                        <div
                          className="h-full rounded-full bg-green-700"
                          style={{
                            width: `${item.summary.averageProgress || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {groups.length === 0 && (
                    <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                      Әзірге топтар бойынша прогресс жоқ
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-green-800">
                  Соңғы белсенділік
                </h3>

                <div className="mt-6 space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={activity.id || index}
                      className="rounded-2xl bg-green-50 p-4"
                    >
                      <p className="font-semibold text-gray-900">
                        {activity.title || activity.type || 'Белсенділік'}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {activity.description ||
                          activity.message ||
                          'Жаңа әрекет тіркелді'}
                      </p>

                      {activity.createdAt && (
                        <p className="mt-2 text-xs text-gray-500">
                          {new Date(activity.createdAt).toLocaleString('kk-KZ')}
                        </p>
                      )}
                    </div>
                  ))}

                  {recentActivities.length === 0 && (
                    <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                      Соңғы белсенділік әзірге жоқ
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default TeacherDashboardPage