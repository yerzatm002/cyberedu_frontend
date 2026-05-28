import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import {
  useStartQuiz,
  useStudentQuiz,
  useSubmitQuiz,
} from '@/features/quizzes/quizzes.queries'

const StudentQuizPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()
  const lessonId = id

  const [answers, setAnswers] = useState({})
  const [attemptStarted, setAttemptStarted] = useState(false)
  const [result, setResult] = useState(null)

  const { data, isLoading, isError, error } = useStudentQuiz(lessonId)
  const startMutation = useStartQuiz()
  const submitMutation = useSubmitQuiz()

  const quiz = data?.quiz
  const attempts = data?.attempts || []
  const remainingAttempts = data?.remainingAttempts ?? 0

  const handleStart = () => {
    startMutation.mutate(lessonId, {
      onSuccess: () => {
        setAttemptStarted(true)
        setResult(null)
        setAnswers({})
      },
    })
  }

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!quiz?.questions?.length) return

    if (Object.keys(answers).length < quiz.questions.length) {
      alert('Барлық сұрақтарға жауап беріңіз')
      return
    }

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      }),
    )

    submitMutation.mutate(
      {
        lessonId,
        answers: formattedAnswers,
      },
      {
        onSuccess: (data) => {
          setResult(data.result)
          setAttemptStarted(false)
        },
      },
    )
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

          <h2 className="mt-3 text-3xl font-bold text-green-900">Тест тапсыру</h2>
          <p className="mt-2 text-gray-600">
            Сабақ бойынша білімді тексеру
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Тест жүктеліп жатыр...
          </div>
        )}

        {isError && (
          <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && !quiz && (
          <div className="rounded-3xl bg-yellow-50 p-6 text-gray-700 shadow-sm">
            Бұл сабаққа тест әлі қосылмаған
          </div>
        )}

        {!isLoading && !isError && quiz && (
          <>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-green-800">
                    {quiz.title}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {quiz.description || 'Тест сипаттамасы жоқ'}
                  </p>
                </div>

                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                  Қалған мүмкіндік: {remainingAttempts}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Өту балы</p>
                  <p className="mt-1 text-2xl font-bold text-green-800">
                    {quiz.passScore}%
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Максимум мүмкіндік</p>
                  <p className="mt-1 text-2xl font-bold text-green-800">
                    {quiz.maxAttempts}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Сұрақ саны</p>
                  <p className="mt-1 text-2xl font-bold text-green-800">
                    {quiz.questions?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {attempts.length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-green-800">
                  Тапсыру тарихы
                </h3>

                <div className="mt-4 space-y-3">
                  {attempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="rounded-2xl bg-green-50 p-4"
                    >
                      <p className="font-semibold text-gray-900">
                        Мүмкіндік #{attempt.attemptNumber}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Статус: {attempt.status} • Балл:{' '}
                        {attempt.score ?? '-'} •{' '}
                        {attempt.passed ? 'Өтті' : 'Өткен жоқ'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!attemptStarted && !result && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                {remainingAttempts > 0 ? (
                  <button
                    onClick={handleStart}
                    disabled={startMutation.isPending}
                    className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {startMutation.isPending
                      ? 'Тест басталып жатыр...'
                      : 'Тестті бастау'}
                  </button>
                ) : (
                  <div className="rounded-2xl bg-red-50 p-5 text-red-700">
                    Тест тапсыру мүмкіндігі аяқталды
                  </div>
                )}

                {startMutation.isError && (
                  <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                    {startMutation.error.message}
                  </div>
                )}
              </div>
            )}

            {attemptStarted && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-3xl bg-white p-6 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">Сұрақ {index + 1}</p>

                    <h3 className="mt-2 text-xl font-semibold text-green-900">
                      {question.questionText}
                    </h3>

                    <div className="mt-5 space-y-3">
                      {question.options.map((option) => (
                        <label
                          key={option.id}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition hover:border-green-300 hover:bg-green-50"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={answers[question.id] === option.id}
                            onChange={() =>
                              handleAnswerChange(question.id, option.id)
                            }
                            className="h-4 w-4"
                          />

                          <span className="text-sm text-gray-700">
                            {option.optionText}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {submitMutation.isPending
                    ? 'Нәтиже есептеліп жатыр...'
                    : 'Тестті аяқтау'}
                </button>

                {submitMutation.isError && (
                  <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                    {submitMutation.error.message}
                  </div>
                )}
              </form>
            )}

            {result && (
              <div className="space-y-6">
                <div
                  className={`rounded-3xl p-6 shadow-sm ${
                    result.passed ? 'bg-green-50' : 'bg-yellow-50'
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold ${
                      result.passed ? 'text-green-800' : 'text-yellow-800'
                    }`}
                  >
                    {result.passed
                      ? 'Құттықтаймыз, тесттен өттіңіз!'
                      : 'Тест нәтижесі дайын'}
                  </h3>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-sm text-gray-500">Жалпы балл</p>
                      <p className="mt-2 text-3xl font-bold text-green-800">
                        {result.score}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-sm text-gray-500">Жинаған ұпай</p>
                      <p className="mt-2 text-3xl font-bold text-green-800">
                        {result.awardedPoints}/{result.totalPoints}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-sm text-gray-500">Қорытынды</p>
                      <p className="mt-2 text-2xl font-bold text-green-800">
                        {result.passed ? 'Өтті' : 'Қайта тапсыру керек'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-2xl font-semibold text-green-800">
                    Жауаптарды талдау
                  </h3>

                  <div className="mt-6 space-y-4">
                    {result.answers.map((answer, index) => (
                      <div
                        key={answer.questionId}
                        className={`rounded-2xl border p-5 ${
                          answer.isCorrect
                            ? 'border-green-200 bg-green-50'
                            : 'border-yellow-200 bg-yellow-50'
                        }`}
                      >
                        <p className="text-sm text-gray-500">
                          Сұрақ {index + 1}
                        </p>

                        <p className="mt-2 font-semibold">
                          {answer.isCorrect ? 'Дұрыс жауап' : 'Қате жауап'}
                        </p>

                        <p className="mt-2 text-sm text-gray-700">
                          Ұпай: {answer.awardedPoints}
                        </p>

                        {answer.explanation && (
                          <p className="mt-3 leading-7 text-gray-700">
                            {answer.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/student/lessons"
                    className="mt-6 inline-block rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                  >
                    Сабақтар тізіміне оралу
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default StudentQuizPage