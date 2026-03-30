import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import mockLessons from '@/data/mockLessons'

const StudentTaskPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))
  const { id } = useParams()
  const lessonId = Number(id)

  const lesson = mockLessons.find((item) => item.id === lessonId)

  const [answer, setAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!answer.trim()) {
      alert('Жауап енгізу қажет')
      return
    }

    setIsSubmitted(true)
  }

  if (!lesson) {
    return (
      <MainLayout user={user}>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-green-900">Тапсырма табылмады</h2>
          <p className="mt-3 text-gray-600">Бұл сабаққа қатысты тапсырма жоқ.</p>
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

          <h2 className="mt-3 text-3xl font-bold text-green-900">
            Тапсырма орындау
          </h2>
          <p className="mt-2 text-gray-600">{lesson.title}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-green-800">
            {lesson.task.title}
          </h3>
          <p className="mt-4 leading-7 text-gray-700">{lesson.task.description}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Жауабыңызды жазыңыз
              </label>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Жауабыңызды осы жерге енгізіңіз..."
                className="min-h-[220px] w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-green-700"
              />

              <button
                type="submit"
                className="mt-5 rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Тапсырманы жіберу
              </button>
            </form>
          ) : (
            <div>
              <div className="rounded-2xl bg-green-50 p-5">
                <h4 className="text-lg font-semibold text-green-800">
                  Тапсырма сәтті жіберілді
                </h4>
                <p className="mt-2 text-gray-700">
                  Сіздің жауабыңыз мұғалімнің тексеруіне жіберілді.
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700">Сіздің жауабыңыз:</p>
                <div className="mt-3 rounded-2xl border border-green-100 bg-white p-5">
                  <p className="leading-7 text-gray-700">{answer}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to={`/student/lesson/${lesson.id}`}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  Сабақ бетіне оралу
                </Link>

                <Link
                  to={`/student/quiz/${lesson.id}`}
                  className="rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-green-900 transition hover:bg-yellow-300"
                >
                  Тестке өту
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default StudentTaskPage