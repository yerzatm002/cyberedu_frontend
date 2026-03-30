import MainLayout from '@/components/layout/MainLayout'
import mockStudents from '@/data/mockStudents'

const TeacherGroupPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Топты басқару</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде топтағы оқушылар тізімі көрсетіледі
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-green-800">Оқушылар тізімі</h3>
              <p className="mt-1 text-sm text-gray-500">9А сыныбы</p>
            </div>

            <button className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
              Оқушы қосу
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Оқушы
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Сынып
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Күйі
                  </th>
                </tr>
              </thead>

              <tbody>
                {mockStudents.map((student) => (
                  <tr key={student.id} className="rounded-2xl bg-green-50">
                    <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{student.email}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{student.className}</td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === 'Белсенді'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherGroupPage