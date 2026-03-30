import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import mockLessons from '@/data/mockLessons'
import mockQuizzes from '@/data/mockQuizzes'

const StudentQuizPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))
  const { id } = useParams()
  const lessonId = Number(id)

  const lesson = mockLessons.find((item) => item.id === lessonId)
  const questions = mockQuizzes[lessonId] || []

  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!isSubmitted || !questions.length) return null

    let correctCount = 0

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount += 1
      }
    })

    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= 70

    return {
      correctCount,
      total: questions.length,
      score,
      passed,
    }
  }, [answers, isSubmitted, questions])

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.keys(answers).length < questions.length) {
      alert('Барлық сұрақтарға жауап беру қажет')
      return
    }

    setIsSubmitted(true)
  }

  if (!lesson) {
    return (
      <MainLayout user={user}>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-green-900">Тест табылмады</h2>
          <p className="mt-3 text-gray-600">Бұл сабаққа қатысты тест жоқ.</p>
          <Link
            to="/student/lessons"
            className="mt-6 inline-block rounded-2xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Сабақтар тізіміне оралу
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <Link
            to={`/student/lesson/${lesson.id}`}
            className="text-sm font-medium text-green-700 transition hover:text-green-800"
          >
            ← Сабақ бетіне оралу
          </Link>

          <h2 className="mt-3 text-3xl font-bold text-green-900">Тест тапсыру</h2>
          <p className="mt-2 text-gray-600">{lesson.title}</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Сұрақ {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-green-900">
                  {question.question}
                </h3>

                <div className="mt-5 space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition hover:border-green-300 hover:bg-green-50"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Тест нәтижесін шығару
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div
              className={`rounded-3xl p-6 shadow-sm ${
                result?.passed ? 'bg-green-50' : 'bg-yellow-50'
              }`}
            >
              <h3
                className={`text-2xl font-bold ${
                  result?.passed ? 'text-green-800' : 'text-yellow-800'
                }`}
              >
                {result?.passed ? 'Құттықтаймыз, тесттен өттіңіз!' : 'Тест нәтижесі дайын'}
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-gray-500">Жалпы ұпай</p>
                  <p className="mt-2 text-3xl font-bold text-green-800">
                    {result?.score}%
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-gray-500">Дұрыс жауаптар</p>
                  <p className="mt-2 text-3xl font-bold text-green-800">
                    {result?.correctCount}/{result?.total}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-gray-500">Қорытынды</p>
                  <p className="mt-2 text-2xl font-bold text-green-800">
                    {result?.passed ? 'Өтті' : 'Қайта тапсыру керек'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-800">
                Сұрақтар бойынша талдау
              </h3>

              <div className="mt-6 space-y-5">
                {questions.map((question, index) => {
                  const userAnswer = answers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div
                      key={question.id}
                      className={`rounded-2xl border p-5 ${
                        isCorrect
                          ? 'border-green-200 bg-green-50'
                          : 'border-yellow-200 bg-yellow-50'
                      }`}
                    >
                      <p className="text-sm text-gray-500">Сұрақ {index + 1}</p>
                      <h4 className="mt-2 text-lg font-semibold text-gray-900">
                        {question.question}
                      </h4>

                      <div className="mt-4 space-y-2 text-sm">
                        <p>
                          <span className="font-medium text-gray-900">
                            Сіздің жауабыңыз:
                          </span>{' '}
                          <span className={isCorrect ? 'text-green-800' : 'text-yellow-800'}>
                            {userAnswer}
                          </span>
                        </p>

                        <p>
                          <span className="font-medium text-gray-900">
                            Дұрыс жауап:
                          </span>{' '}
                          <span className="text-green-800">{question.correctAnswer}</span>
                        </p>

                        <p className="font-semibold">
                          {isCorrect ? 'Дұрыс жауап' : 'Қате жауап'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={`/student/lesson/${lesson.id}`}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  Сабақ бетіне оралу
                </Link>

                <button
                  onClick={() => {
                    setAnswers({})
                    setIsSubmitted(false)
                  }}
                  className="rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-green-900 transition hover:bg-yellow-300"
                >
                  Тестті қайта бастау
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default StudentQuizPage