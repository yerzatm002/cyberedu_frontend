import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import CertificateCard from '@/components/ui/CertificateCard'
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from '@/features/notifications/notifications.queries'
import { useStudentProgress } from '@/features/progress/progress.queries'

const StudentProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const { data, isLoading, isError, error } = useStudentProgress()

  const summary = data?.summary
  const lessons = data?.lessons || []

  const [notificationsPage, setNotificationsPage] = useState(1)

const {
  data: notificationsData,
  isLoading: notificationsLoading,
  isError: notificationsError,
  error: notificationsErrorData,
} = useNotifications({
  page: notificationsPage,
  limit: 20,
})

const markAsReadMutation = useMarkNotificationAsRead()
const markAllAsReadMutation = useMarkAllNotificationsAsRead()

const notifications = notificationsData?.items || []
const notificationsMeta = notificationsData?.meta


  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Профиль</h2>
          <p className="mt-2 text-gray-600">
            Жеке ақпарат, оқу прогресі және хабарландырулар
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Профиль прогресі жүктеліп жатыр...
          </div>
        )}

        {isError && (
          <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
                <h3 className="text-2xl font-semibold text-green-800">
                  Жеке мәліметтер
                </h3>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-gray-600">Аты-жөні</p>
                    <p className="mt-1 text-lg font-semibold text-green-900">
                      {user?.fullName || user?.name}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-gray-600">Электрондық пошта</p>
                    <p className="mt-1 text-lg font-semibold text-green-900">
                      {user?.email}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-gray-600">Рөл</p>
                    <p className="mt-1 text-lg font-semibold text-green-900">
                      {user?.role}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-gray-600">Аккаунт күйі</p>
                    <p className="mt-1 text-lg font-semibold text-green-900">
                      {user?.status}
                    </p>
                  </div>
                </div>
              </div>

              <CertificateCard studentName={user?.fullName || user?.name || ''} />
            </div>

            {summary && (
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
            )}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-800">
                Сабақтар прогресі
              </h3>

              <div className="mt-6 space-y-4">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.lessonId}
                    className="rounded-2xl border border-green-100 bg-green-50 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
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
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h3 className="text-2xl font-semibold text-green-800">
        Хабарландырулар
      </h3>

      <p className="mt-1 text-sm text-gray-600">
        Оқушыға арналған жеке хабарламалар
      </p>
    </div>

    <button
      onClick={() => markAllAsReadMutation.mutate()}
      disabled={
        markAllAsReadMutation.isPending ||
        !notificationsMeta?.unreadCount
      }
      className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      {markAllAsReadMutation.isPending
        ? 'Орындалып жатыр...'
        : `Барлығын оқылды ету ${
            notificationsMeta?.unreadCount
              ? `(${notificationsMeta.unreadCount})`
              : ''
          }`}
    </button>
  </div>

  {notificationsLoading && (
    <div className="mt-6 rounded-2xl bg-green-50 p-5 text-gray-700">
      Хабарландырулар жүктеліп жатыр...
    </div>
  )}

  {notificationsError && (
    <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-700">
      {notificationsErrorData.message}
    </div>
  )}

  {!notificationsLoading && !notificationsError && (
    <>
      <div className="mt-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-2xl border p-4 ${
              notification.type === 'success'
                ? 'border-green-200 bg-green-50'
                : notification.type === 'warning'
                  ? 'border-yellow-200 bg-yellow-50'
                  : notification.type === 'error'
                    ? 'border-red-200 bg-red-50'
                    : 'border-blue-200 bg-blue-50'
            } ${notification.isRead ? 'opacity-70' : ''}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {notification.title}
                </h4>

                <p className="mt-2 text-gray-700">
                  {notification.message}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {notification.createdAt
                    ? new Date(notification.createdAt).toLocaleString('kk-KZ')
                    : ''}
                </p>
              </div>

              {!notification.isRead && (
                <button
                  onClick={() =>
                    markAsReadMutation.mutate(notification.id)
                  }
                  disabled={markAsReadMutation.isPending}
                  className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-green-800 transition hover:bg-green-100 disabled:bg-gray-200"
                >
                  Оқылды
                </button>
              )}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
            Хабарландырулар жоқ
          </div>
        )}
      </div>

      {notificationsMeta && notificationsMeta.totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Бет: {notificationsMeta.page}/{notificationsMeta.totalPages}
          </p>

          <div className="flex gap-3">
            <button
              disabled={notificationsPage <= 1}
              onClick={() => setNotificationsPage((prev) => prev - 1)}
              className="rounded-xl border border-green-700 px-4 py-2 text-sm font-semibold text-green-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
            >
              Алдыңғы
            </button>

            <button
              disabled={notificationsPage >= notificationsMeta.totalPages}
              onClick={() => setNotificationsPage((prev) => prev + 1)}
              className="rounded-xl border border-green-700 px-4 py-2 text-sm font-semibold text-green-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
            >
              Келесі
            </button>
          </div>
        </div>
      )}
    </>
  )}
</div>

      </div>
    </MainLayout>
  )
}

export default StudentProfilePage