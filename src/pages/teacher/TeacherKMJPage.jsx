import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import mockLessons from '@/data/mockLessons'

const TeacherKMJPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    setGenerated(true)
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">КМЖ генерациясы</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде күнтізбелік-мерзімдік жоспардың mock нұсқасы құрастырылады
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-green-800">
                КМЖ құрастыру
              </h3>
              <p className="mt-2 text-gray-600">
                34 сабақ бойынша жоспар генерациялау
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                КМЖ жасау
              </button>

              <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-green-900 transition hover:bg-yellow-300">
                DOCX жүктеу
              </button>

              <button className="rounded-2xl border border-green-700 px-5 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50">
                PDF жүктеу
              </button>
            </div>
          </div>
        </div>

        {generated && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">КМЖ кестесі</h3>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      №
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Сабақ тақырыбы
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Мақсат
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Үй тапсырмасы
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {mockLessons.map((lesson) => (
                    <tr key={lesson.id} className="bg-green-50">
                      <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-gray-900">
                        {lesson.id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{lesson.title}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        Оқушылардың киберқауіпсіздік бойынша білімін қалыптастыру
                      </td>
                      <td className="rounded-r-2xl px-4 py-4 text-sm text-gray-700">
                        Тест немесе тапсырма орындау
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl bg-yellow-50 p-4">
              <p className="font-semibold text-yellow-800">Ескерту</p>
              <p className="mt-1 text-sm text-gray-700">
                Бұл нұсқа алдын ала қорғауға арналған prototype. Кейін backend арқылы
                DOCX және PDF экспорт жасалады.
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default TeacherKMJPage