import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import mockLessons from '@/data/mockLessons'

const TeacherContentPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  const [selectedLessonId, setSelectedLessonId] = useState(mockLessons[0]?.id || 1)
  const [presentationName, setPresentationName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [materialSaved, setMaterialSaved] = useState(false)

  const selectedLesson = mockLessons.find((lesson) => lesson.id === Number(selectedLessonId))

  const handleSubmit = (e) => {
    e.preventDefault()
    setMaterialSaved(true)
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Мазмұнды басқару</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде сабаққа презентация мен бейнесабақ тіркеуге болады
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Сабақты таңдаңыз
                </label>
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                >
                  {mockLessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.id}. {lesson.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Презентация атауы
                </label>
                <input
                  type="text"
                  value={presentationName}
                  onChange={(e) => setPresentationName(e.target.value)}
                  placeholder="Мысалы: OSI моделі бойынша презентация"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Бейне сілтемесі
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="YouTube немесе MP4 сілтемесін енгізіңіз"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Презентация файлы
                </label>
                <div className="rounded-2xl border-2 border-dashed border-green-200 bg-green-50 p-6 text-center">
                  <p className="text-sm text-gray-700">
                    Бұл жерде кейін PDF/PPT файл жүктеу компоненті қосылады
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    Файл таңдау
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Мазмұнды сақтау
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">Алдын ала қарау</h3>

            {selectedLesson && (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Сабақ</p>
                  <p className="mt-1 font-semibold text-green-900">
                    {selectedLesson.title}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Қазіргі презентация</p>
                  <p className="mt-1 font-semibold text-green-900">
                    {presentationName || selectedLesson.presentationTitle}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Бейне</p>
                  <p className="mt-1 break-all font-semibold text-green-900">
                    {videoUrl || selectedLesson.videoUrl}
                  </p>
                </div>

                {materialSaved && (
                  <div className="rounded-2xl bg-yellow-50 p-4">
                    <p className="font-semibold text-yellow-800">Сақталды</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Mock нұсқада мәліметтер уақытша интерфейс деңгейінде сақталды
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherContentPage