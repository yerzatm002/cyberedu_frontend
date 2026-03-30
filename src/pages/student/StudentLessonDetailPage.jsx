import { Link, useParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import ProgressBar from '@/components/ui/ProgressBar'
import mockLessons from '@/data/mockLessons'

const StudentLessonDetailPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))
  const { id } = useParams()

  const lessonId = Number(id)
  const lesson = mockLessons.find((item) => item.id === lessonId)
  const currentIndex = mockLessons.findIndex((item) => item.id === lessonId)
  const nextLesson = mockLessons[currentIndex + 1]

  if (!lesson) {
    return (
      <MainLayout user={user}>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-green-900">Сабақ табылмады</h2>
          <p className="mt-3 text-gray-600">
            Көрсетілген сабақ жүйеде жоқ немесе уақытша қолжетімсіз.
          </p>
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/student/lessons"
              className="text-sm font-medium text-green-700 transition hover:text-green-800"
            >
              ← Сабақтар тізіміне оралу
            </Link>

            <h2 className="mt-3 text-3xl font-bold text-green-900">
              {lesson.title}
            </h2>

            <p className="mt-2 text-gray-600">
              Блок: {lesson.block} • Деңгейі: {lesson.level}
            </p>
          </div>

          <div>
            {lesson.completed ? (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                Сабақ аяқталған
              </span>
            ) : (
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                Сабақ орындалып жатыр
              </span>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <ProgressBar value={lesson.progress} />
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-green-800">Сабақ сипаттамасы</h3>
          <p className="mt-4 leading-7 text-gray-700">{lesson.description}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">Презентация</h3>
            <p className="mt-4 text-gray-700">
              Тақырып: {lesson.presentationTitle}
            </p>

            <div className="mt-5 flex min-h-[260px] items-center justify-center rounded-2xl border-2 border-dashed border-green-200 bg-green-50 p-6 text-center">
              <div>
                <div className="text-5xl">📄</div>
                <p className="mt-4 text-base font-medium text-green-900">
                  Презентация қарау аймағы
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Кейін бұл жерде PDF немесе слайд viewer қосылады
                </p>
                <button className="mt-5 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
                  Презентацияны ашу
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">Бейнесабақ</h3>
            <p className="mt-4 text-gray-700">
              Сабақ тақырыбы бойынша қысқаша түсіндірме бейне
            </p>

            <div className="mt-5 overflow-hidden rounded-2xl">
              <iframe
                className="h-[260px] w-full"
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-green-800">
                  Тапсырма
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Өмірлік жағдаятқа негізделген жауап
                </p>
              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                {lesson.task.status}
              </span>
            </div>

            <p className="mt-5 font-medium text-gray-800">{lesson.task.title}</p>
            <p className="mt-3 leading-7 text-gray-700">{lesson.task.description}</p>

            <div className="mt-6">
              <Link
                to={`/student/task/${lesson.id}`}
                className="inline-block rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Тапсырманы орындау
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-green-800">Тест</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Сабақ тақырыбы бойынша білімді тексеру
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                {lesson.quiz.status}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Сұрақ саны:</span>{' '}
                {lesson.quiz.questionsCount}
              </p>
              <p>
                <span className="font-medium text-gray-900">Өту шегі:</span>{' '}
                {lesson.quiz.passingScore}%
              </p>
            </div>

            <div className="mt-6">
              <Link
                to={`/student/quiz/${lesson.id}`}
                className="inline-block rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Тестті бастау
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-green-800">
                Келесі қадам
              </h3>
              <p className="mt-2 text-gray-600">
                Сабақты аяқтағаннан кейін келесі тақырыпқа өтуге болады
              </p>
            </div>

            {nextLesson ? (
              <Link
                to={`/student/lesson/${nextLesson.id}`}
                className="rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-green-900 transition hover:bg-yellow-300"
              >
                Келесі сабаққа өту
              </Link>
            ) : (
              <button className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white">
                Курс аяқталды
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default StudentLessonDetailPage