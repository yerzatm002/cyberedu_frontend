import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import mockSubmissions from '@/data/mockSubmissions'

const TeacherReviewsPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))
  const [selectedSubmission, setSelectedSubmission] = useState(mockSubmissions[0])
  const [comment, setComment] = useState(selectedSubmission?.teacherComment || '')
  const [score, setScore] = useState(selectedSubmission?.score || '')
  const [saved, setSaved] = useState(false)

  const handleSelect = (submission) => {
    setSelectedSubmission(submission)
    setComment(submission.teacherComment || '')
    setScore(submission.score || '')
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Пікірлер мен бағалау</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде оқушылардың тапсырмаларын қарап, пікір қалдыруға болады
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">Жіберілген жұмыстар</h3>

            <div className="mt-5 space-y-4">
              {mockSubmissions.map((submission) => (
                <button
                  key={submission.id}
                  onClick={() => handleSelect(submission)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedSubmission?.id === submission.id
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-200 hover:bg-green-50'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{submission.studentName}</p>
                  <p className="mt-1 text-sm text-gray-600">{submission.lessonTitle}</p>
                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      submission.status === 'Тексерілді'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {submission.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            {selectedSubmission && (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-green-800">
                    Тапсырманы тексеру
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {selectedSubmission.studentName} • {selectedSubmission.lessonTitle}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-sm text-gray-600">Оқушы жауабы</p>
                  <p className="mt-3 leading-7 text-gray-700">
                    {selectedSubmission.answer}
                  </p>
                </div>

                <form onSubmit={handleSave} className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Балл
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      placeholder="0-100 аралығында"
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Мұғалім пікірі
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Оқушы жұмысына пікір жазыңыз..."
                      className="min-h-[180px] w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-green-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                  >
                    Пікірді сақтау
                  </button>
                </form>

                {saved && (
                  <div className="mt-6 rounded-2xl bg-yellow-50 p-4">
                    <p className="font-semibold text-yellow-800">Сақталды</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Бұл mock нұсқада пікір интерфейс деңгейінде уақытша сақталды
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherReviewsPage