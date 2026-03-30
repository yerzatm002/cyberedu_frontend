import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import mockLessons from '@/data/mockLessons'

const TeacherQuizEditorPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  const [selectedLessonId, setSelectedLessonId] = useState(mockLessons[0]?.id || 1)
  const [question, setQuestion] = useState('')
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [optionC, setOptionC] = useState('')
  const [optionD, setOptionD] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [questions, setQuestions] = useState([])

  const handleAddQuestion = (e) => {
    e.preventDefault()

    if (!question.trim() || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      alert('Барлық өрістерді толтырыңыз')
      return
    }

    const newQuestion = {
      id: Date.now(),
      question,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer,
    }

    setQuestions((prev) => [...prev, newQuestion])
    setQuestion('')
    setOptionA('')
    setOptionB('')
    setOptionC('')
    setOptionD('')
    setCorrectAnswer('')
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Тест редакторы</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде мұғалім тест сұрақтарын құрастыра алады
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-1">
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Сабақ
                </label>
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
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
                  Сұрақ мәтіні
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Сұрақты енгізіңіз"
                  className="min-h-[120px] w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </div>

              <input
                type="text"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                placeholder="A нұсқасы"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <input
                type="text"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                placeholder="B нұсқасы"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <input
                type="text"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                placeholder="C нұсқасы"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <input
                type="text"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
                placeholder="D нұсқасы"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Дұрыс жауап
                </label>
                <select
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="">Таңдаңыз</option>
                  {[optionA, optionB, optionC, optionD]
                    .filter(Boolean)
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Сұрақты қосу
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            <h3 className="text-2xl font-semibold text-green-800">
              Қосылған сұрақтар
            </h3>

            {questions.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-green-50 p-5">
                <p className="text-gray-700">Әзірге сұрақтар қосылған жоқ</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {questions.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-green-100 bg-green-50 p-5"
                  >
                    <p className="text-sm text-gray-500">Сұрақ {index + 1}</p>
                    <h4 className="mt-2 text-lg font-semibold text-gray-900">
                      {item.question}
                    </h4>

                    <div className="mt-4 space-y-2">
                      {item.options.map((option) => (
                        <p
                          key={option}
                          className={`rounded-xl px-3 py-2 text-sm ${
                            item.correctAnswer === option
                              ? 'bg-green-100 font-semibold text-green-800'
                              : 'bg-white text-gray-700'
                          }`}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherQuizEditorPage