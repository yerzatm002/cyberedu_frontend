import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import {
  useStudentTask,
  useSubmitTask,
} from '@/features/tasks/tasks.queries'

const StudentTaskPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()
  const lessonId = id

  const [submissionText, setSubmissionText] = useState('')

  const { data, isLoading, isError, error } = useStudentTask(lessonId)
  const submitMutation = useSubmitTask()

  const task = data?.task

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!submissionText.trim()) {
      alert('Жауап мәтінін енгізіңіз')
      return
    }

    submitMutation.mutate({
      lessonId,
      payload: {
        submissionText,
      },
    })
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <Link
            to={`/student/lesson/${lessonId}`}
            className="text-sm font-medium text-green-700 transition hover:text-green-800"
          >
            ← Сабақ бетіне оралу
          </Link>

          <h2 className="mt-3 text-3xl font-bold text-green-900">
            Тапсырма орындау
          </h2>
          <p className="mt-2 text-gray-600">
            Сабақ бойынша өмірлік жағдаят тапсырмасы
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Тапсырма жүктеліп жатыр...
          </div>
        )}

        {isError && (
          <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && !task && (
          <div className="rounded-3xl bg-yellow-50 p-6 text-gray-700 shadow-sm">
            Бұл сабаққа тапсырма әлі қосылмаған
          </div>
        )}

        {!isLoading && !isError && task && (
          <>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-green-800">
                    {task.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {task.isRequired ? 'Міндетті тапсырма' : 'Қосымша тапсырма'}
                  </p>
                </div>

                {task.submission && (
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      task.submission.status === 'reviewed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {task.submission.status === 'reviewed'
                      ? 'Тексерілді'
                      : 'Жіберілді'}
                  </span>
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-green-50 p-5">
                <p className="text-sm font-semibold text-green-800">
                  Жағдаят
                </p>
                <p className="mt-3 leading-7 text-gray-700">
                  {task.scenarioText}
                </p>
              </div>

              {task.instructionsText && (
                <div className="mt-5 rounded-2xl bg-yellow-50 p-5">
                  <p className="text-sm font-semibold text-yellow-800">
                    Нұсқаулық
                  </p>
                  <p className="mt-3 leading-7 text-gray-700">
                    {task.instructionsText}
                  </p>
                </div>
              )}
            </div>

            {task.submission ? (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-green-800">
                  Сіздің жауабыңыз
                </h3>

                <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5">
                  <p className="leading-7 text-gray-700">
                    {task.submission.submissionText}
                  </p>
                </div>

                {task.submission.review && (
                  <div className="mt-6 rounded-2xl bg-yellow-50 p-5">
                    <h4 className="text-lg font-semibold text-yellow-800">
                      Мұғалім пікірі
                    </h4>

                    <p className="mt-3 text-gray-700">
                      Балл: {task.submission.review.score ?? '-'}
                    </p>

                    <p className="mt-2 leading-7 text-gray-700">
                      {task.submission.review.comment || 'Пікір жоқ'}
                    </p>
                  </div>
                )}

                <Link
                  to={`/student/quiz/${lessonId}`}
                  className="mt-6 inline-block rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  Тестке өту
                </Link>
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <form onSubmit={handleSubmit}>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Жауабыңызды жазыңыз
                  </label>

                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Жауабыңызды осы жерге енгізіңіз..."
                    className="min-h-[220px] w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-green-700"
                  />

                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="mt-5 rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {submitMutation.isPending
                      ? 'Жіберіліп жатыр...'
                      : 'Тапсырманы жіберу'}
                  </button>
                </form>

                {submitMutation.isError && (
                  <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                    {submitMutation.error.message}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default StudentTaskPage