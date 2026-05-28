import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { useTeacherLessons } from '@/features/lessons/lessons.queries'
import {
  useCreateQuizQuestion,
  useCreateTeacherQuiz,
} from '@/features/quizzes/quizzes.queries'

const TeacherQuizEditorPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [quizForm, setQuizForm] = useState({
    lessonId: '',
    title: '',
    description: '',
    passScore: 70,
    maxAttempts: 2,
    isActive: true,
  })

  const [createdQuiz, setCreatedQuiz] = useState(null)

  const [questionForm, setQuestionForm] = useState({
    questionText: '',
    questionType: 'single_choice',
    explanation: '',
    points: 1,
    orderIndex: 1,
    options: [
      { optionText: '', isCorrect: false, orderIndex: 1 },
      { optionText: '', isCorrect: true, orderIndex: 2 },
      { optionText: '', isCorrect: false, orderIndex: 3 },
      { optionText: '', isCorrect: false, orderIndex: 4 },
    ],
  })

  const { data: lessonsData } = useTeacherLessons({
    page: 1,
    limit: 50,
  })

  const createQuizMutation = useCreateTeacherQuiz()
  const createQuestionMutation = useCreateQuizQuestion()

  const lessons = lessonsData?.items || []

  const handleQuizSubmit = (e) => {
    e.preventDefault()

    createQuizMutation.mutate(
      {
        ...quizForm,
        passScore: Number(quizForm.passScore),
        maxAttempts: Number(quizForm.maxAttempts),
      },
      {
        onSuccess: (data) => {
          setCreatedQuiz(data.quiz || data)
        },
      },
    )
  }

  const handleOptionChange = (index, field, value) => {
    setQuestionForm((prev) => ({
      ...prev,
      options: prev.options.map((option, optionIndex) =>
        optionIndex === index ? { ...option, [field]: value } : option,
      ),
    }))
  }

  const handleCorrectOptionChange = (index) => {
    setQuestionForm((prev) => ({
      ...prev,
      options: prev.options.map((option, optionIndex) => ({
        ...option,
        isCorrect: optionIndex === index,
      })),
    }))
  }

  const handleQuestionSubmit = (e) => {
    e.preventDefault()

    const quizId = createdQuiz?.id

    if (!quizId) {
      alert('Алдымен тест құрыңыз')
      return
    }

    const correctOptionsCount = questionForm.options.filter(
      (option) => option.isCorrect,
    ).length

    if (correctOptionsCount !== 1) {
      alert('Single choice сұрағында дәл 1 дұрыс жауап болуы керек')
      return
    }

    createQuestionMutation.mutate(
      {
        quizId,
        payload: {
          ...questionForm,
          points: Number(questionForm.points),
          orderIndex: Number(questionForm.orderIndex),
        },
      },
      {
        onSuccess: () => {
          setQuestionForm({
            questionText: '',
            questionType: 'single_choice',
            explanation: '',
            points: 1,
            orderIndex: questionForm.orderIndex + 1,
            options: [
              { optionText: '', isCorrect: false, orderIndex: 1 },
              { optionText: '', isCorrect: true, orderIndex: 2 },
              { optionText: '', isCorrect: false, orderIndex: 3 },
              { optionText: '', isCorrect: false, orderIndex: 4 },
            ],
          })
        },
      },
    )
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Тест редакторы</h2>
          <p className="mt-2 text-gray-600">
            Мұғалім сабаққа тест құрып, сұрақтар қоса алады
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">
              Тест құру
            </h3>

            <form onSubmit={handleQuizSubmit} className="mt-6 space-y-4">
              <select
                value={quizForm.lessonId}
                onChange={(e) =>
                  setQuizForm((prev) => ({
                    ...prev,
                    lessonId: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              >
                <option value="">Сабақты таңдаңыз</option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.orderIndex}. {lesson.title}
                  </option>
                ))}
              </select>

              <input
                value={quizForm.title}
                onChange={(e) =>
                  setQuizForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Тест атауы"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <textarea
                value={quizForm.description}
                onChange={(e) =>
                  setQuizForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Тест сипаттамасы"
                className="min-h-[120px] w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  value={quizForm.passScore}
                  onChange={(e) =>
                    setQuizForm((prev) => ({
                      ...prev,
                      passScore: e.target.value,
                    }))
                  }
                  placeholder="Өту балы"
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />

                <input
                  type="number"
                  value={quizForm.maxAttempts}
                  onChange={(e) =>
                    setQuizForm((prev) => ({
                      ...prev,
                      maxAttempts: e.target.value,
                    }))
                  }
                  placeholder="Максимум мүмкіндік"
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">
                <input
                  type="checkbox"
                  checked={quizForm.isActive}
                  onChange={(e) =>
                    setQuizForm((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm text-gray-700">Тест белсенді</span>
              </label>

              <button
                type="submit"
                disabled={createQuizMutation.isPending}
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:bg-gray-300"
              >
                {createQuizMutation.isPending ? 'Құрылып жатыр...' : 'Тест құру'}
              </button>
            </form>

            {createdQuiz && (
              <div className="mt-5 rounded-2xl bg-green-50 p-4">
                <p className="font-semibold text-green-800">Тест құрылды</p>
                <p className="mt-1 text-sm text-gray-700">
                  Quiz ID: {createdQuiz.id}
                </p>
              </div>
            )}

            {createQuizMutation.isError && (
              <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {createQuizMutation.error.message}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">
              Сұрақ қосу
            </h3>

            <form onSubmit={handleQuestionSubmit} className="mt-6 space-y-4">
              <textarea
                value={questionForm.questionText}
                onChange={(e) =>
                  setQuestionForm((prev) => ({
                    ...prev,
                    questionText: e.target.value,
                  }))
                }
                placeholder="Сұрақ мәтіні"
                className="min-h-[120px] w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <textarea
                value={questionForm.explanation}
                onChange={(e) =>
                  setQuestionForm((prev) => ({
                    ...prev,
                    explanation: e.target.value,
                  }))
                }
                placeholder="Түсіндірме"
                className="min-h-[100px] w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  value={questionForm.points}
                  onChange={(e) =>
                    setQuestionForm((prev) => ({
                      ...prev,
                      points: e.target.value,
                    }))
                  }
                  placeholder="Ұпай"
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />

                <input
                  type="number"
                  value={questionForm.orderIndex}
                  onChange={(e) =>
                    setQuestionForm((prev) => ({
                      ...prev,
                      orderIndex: e.target.value,
                    }))
                  }
                  placeholder="Сұрақ реті"
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div className="space-y-3">
                {questionForm.options.map((option, index) => (
                  <div
                    key={option.orderIndex}
                    className="rounded-2xl bg-green-50 p-4"
                  >
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Жауап нұсқасы {index + 1}
                    </label>

                    <input
                      value={option.optionText}
                      onChange={(e) =>
                        handleOptionChange(index, 'optionText', e.target.value)
                      }
                      placeholder="Жауап мәтіні"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                    />

                    <label className="mt-3 flex items-center gap-3">
                      <input
                        type="radio"
                        name="correct-option"
                        checked={option.isCorrect}
                        onChange={() => handleCorrectOptionChange(index)}
                      />
                      <span className="text-sm text-gray-700">
                        Дұрыс жауап
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={createQuestionMutation.isPending}
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:bg-gray-300"
              >
                {createQuestionMutation.isPending
                  ? 'Қосылып жатыр...'
                  : 'Сұрақ қосу'}
              </button>
            </form>

            {createQuestionMutation.isError && (
              <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {createQuestionMutation.error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherQuizEditorPage