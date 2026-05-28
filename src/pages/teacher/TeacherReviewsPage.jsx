import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  useReviewSubmission,
  useTeacherSubmissions,
} from '@/features/tasks/tasks.queries'

const TeacherReviewsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [score, setScore] = useState('')
  const [comment, setComment] = useState('')

  const { data, isLoading, isError, error } = useTeacherSubmissions({
    page,
    limit: 20,
    status,
  })

  const reviewMutation = useReviewSubmission()

  const submissions = data?.items || []
  const meta = data?.meta

  const handleSelectSubmission = (submission) => {
    setSelectedSubmission(submission)
    setScore(submission.review?.score || '')
    setComment(submission.review?.comment || '')
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()

    if (!selectedSubmission) return

    reviewMutation.mutate(
      {
        submissionId: selectedSubmission.id,
        payload: {
          score: Number(score),
          comment,
        },
      },
      {
        onSuccess: () => {
          setSelectedSubmission(null)
          setScore('')
          setComment('')
        },
      },
    )
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">
            Пікірлер мен бағалау
          </h2>
          <p className="mt-2 text-gray-600">
            Оқушылар жіберген тапсырмаларды қарап, балл және пікір қалдыру
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-4">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
            >
              <option value="">Барлық жұмыстар</option>
              <option value="submitted">Тексеруді күтуде</option>
              <option value="reviewed">Тексерілген</option>
            </select>

            <button
              onClick={() => {
                setStatus('')
                setPage(1)
              }}
              className="rounded-2xl border border-green-700 px-5 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
            >
              Тазалау
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">
              Жіберілген жұмыстар
            </h3>

            {isLoading && (
              <div className="mt-5 rounded-2xl bg-green-50 p-5 text-gray-700">
                Жұмыстар жүктеліп жатыр...
              </div>
            )}

            {isError && (
              <div className="mt-5 rounded-2xl bg-red-50 p-5 text-red-700">
                {error.message}
              </div>
            )}

            {!isLoading && !isError && (
              <div className="mt-5 space-y-4">
                {submissions.map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => handleSelectSubmission(submission)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedSubmission?.id === submission.id
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-200 hover:bg-green-50'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">
                      {submission.student?.user?.fullName || 'Оқушы'}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {submission.student?.user?.email || '-'}
                    </p>

                    <p className="mt-2 text-sm text-green-800">
                      {submission.task?.lesson?.orderIndex}.{' '}
                      {submission.task?.lesson?.title}
                    </p>

                    <span
                      className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        submission.status === 'reviewed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {submission.status === 'reviewed'
                        ? 'Тексерілді'
                        : 'Тексеруді күтуде'}
                    </span>
                  </button>
                ))}

                {submissions.length === 0 && (
                  <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                    Жіберілген жұмыстар жоқ
                  </div>
                )}

                {meta && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
                    <p className="text-sm text-gray-600">
                      {meta.page}/{meta.totalPages || 1}
                    </p>

                    <div className="flex gap-2">
                      <button
                        disabled={page <= 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="rounded-xl border border-green-700 px-3 py-2 text-sm text-green-800 disabled:border-gray-300 disabled:text-gray-400"
                      >
                        Алдыңғы
                      </button>

                      <button
                        disabled={page >= meta.totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="rounded-xl border border-green-700 px-3 py-2 text-sm text-green-800 disabled:border-gray-300 disabled:text-gray-400"
                      >
                        Келесі
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            {!selectedSubmission ? (
              <div className="rounded-2xl bg-yellow-50 p-6 text-gray-700">
                Тексеру үшін сол жақтан жұмысты таңдаңыз
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-green-800">
                    Тапсырманы тексеру
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {selectedSubmission.student?.user?.fullName || 'Оқушы'} •{' '}
                    {selectedSubmission.task?.lesson?.title}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Тобы: {selectedSubmission.student?.group?.name || '-'}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-sm font-semibold text-green-800">
                    Оқушы жауабы
                  </p>

                  <p className="mt-3 leading-7 text-gray-700">
                    {selectedSubmission.submissionText}
                  </p>
                </div>

                <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5">
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
                    disabled={reviewMutation.isPending}
                    className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {reviewMutation.isPending ? 'Сақталып жатыр...' : 'Пікірді сақтау'}
                  </button>
                </form>

                {reviewMutation.isError && (
                  <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                    {reviewMutation.error.message}
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