import MainLayout from '@/components/layout/MainLayout'
import CertificateCard from '@/components/ui/CertificateCard'
import mockLessons from '@/data/mockLessons'
import mockNotifications from '@/data/mockNotifications'

const StudentProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  const completedLessons = mockLessons.filter((lesson) => lesson.completed).length
  const totalLessons = mockLessons.length
  const progress = Math.round((completedLessons / totalLessons) * 100)

  const isCertificateAvailable = completedLessons >= totalLessons

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Профиль</h2>
          <p className="mt-2 text-gray-600">
            Жеке ақпарат, оқу прогресі және хабарландырулар
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            <h3 className="text-2xl font-semibold text-green-800">
              Жеке мәліметтер
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm text-gray-600">Аты-жөні</p>
                <p className="mt-1 text-lg font-semibold text-green-900">
                  {user?.name}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm text-gray-600">Электрондық пошта</p>
                <p className="mt-1 text-lg font-semibold text-green-900">
                  {user?.email}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm text-gray-600">Мектеп</p>
                <p className="mt-1 text-lg font-semibold text-green-900">
                  {user?.school}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm text-gray-600">Сынып</p>
                <p className="mt-1 text-lg font-semibold text-green-900">
                  {user?.className}
                </p>
              </div>
            </div>
          </div>

          <CertificateCard
            isAvailable={isCertificateAvailable}
            studentName={user?.name || ''}
          />
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
          <h3 className="text-2xl font-semibold text-green-800">
            Хабарландырулар
          </h3>

          <div className="mt-6 space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl border p-4 ${
                  notification.type === 'success'
                    ? 'border-green-200 bg-green-50'
                    : notification.type === 'warning'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {notification.title}
                  </h4>
                  <span className="text-sm text-gray-500">{notification.date}</span>
                </div>

                <p className="mt-2 text-gray-700">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default StudentProfilePage