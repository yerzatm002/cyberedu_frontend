import MainLayout from '@/components/layout/MainLayout'
import { useAdminDashboard } from '@/features/admin/admin.queries'

const AdminDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const { data, isLoading, isError, error } = useAdminDashboard()

  const summary = data?.summary
  const recentUsers = data?.recentUsers || []
  const recentActivities = data?.recentActivities || []

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Әкімші панелі</h2>
          <p className="mt-2 text-gray-600">
            Жүйе бойынша жалпы статистика, пайдаланушылар және оқу белсенділігі
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Деректер жүктеліп жатыр...
          </div>
        )}

        {isError && (
          <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && summary && (
          <>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Барлық пайдаланушылар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.usersCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Оқушылар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.studentsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Мұғалімдер</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.teachersCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Әкімшілер</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.adminsCount}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Белсенді аккаунттар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.activeUsersCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Белсенді емес</p>
                <p className="mt-3 text-3xl font-bold text-yellow-700">
                  {summary.inactiveUsersCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Бұғатталған</p>
                <p className="mt-3 text-3xl font-bold text-red-700">
                  {summary.blockedUsersCount}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Мектептер</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.schoolsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Топтар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.groupsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Сабақтар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.lessonsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Жарияланған сабақтар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.publishedLessonsCount}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Тапсырма жауаптары</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.submissionsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Тексеруді күтеді</p>
                <p className="mt-3 text-3xl font-bold text-yellow-700">
                  {summary.pendingSubmissionsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Сертификаттар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.certificatesCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Орташа тест балы</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.averageQuizScore}%
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Тесттен өту үлесі</p>
              <p className="mt-3 text-3xl font-bold text-green-800">
                {summary.passRate}%
              </p>

              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-green-100">
                <div
                  className="h-full rounded-full bg-green-700"
                  style={{ width: `${summary.passRate || 0}%` }}
                />
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-green-800">
                  Соңғы пайдаланушылар
                </h3>

                <div className="mt-6 space-y-4">
                  {recentUsers.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-green-100 bg-green-50 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.fullName}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            {item.email}
                          </p>
                        </div>

                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-800">
                          {item.role} • {item.status}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString('kk-KZ')
                          : ''}
                      </p>
                    </div>
                  ))}

                  {recentUsers.length === 0 && (
                    <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                      Соңғы пайдаланушылар жоқ
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-green-800">
                  Соңғы оқу белсенділігі
                </h3>

                <div className="mt-6 space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={`${activity.student?.id || index}-${activity.submittedAt || index}`}
                      className="rounded-2xl border border-green-100 bg-green-50 p-4"
                    >
                      <p className="font-semibold text-gray-900">
                        {activity.student?.fullName || 'Оқушы'}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {activity.lesson?.orderIndex}. {activity.lesson?.title}
                      </p>

                      <p className="mt-2 text-sm text-gray-700">
                        Балл: {activity.score}% •{' '}
                        {activity.passed ? 'Өтті' : 'Өткен жоқ'}
                      </p>

                      <p className="mt-2 text-xs text-gray-500">
                        {activity.submittedAt
                          ? new Date(activity.submittedAt).toLocaleString('kk-KZ')
                          : ''}
                      </p>
                    </div>
                  ))}

                  {recentActivities.length === 0 && (
                    <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                      Соңғы белсенділік жоқ
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

export default AdminDashboardPage