import { Link, useParams } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import ProgressBar from '@/components/ui/ProgressBar'
import { useStudentLesson } from '@/features/lessons/lessons.queries'

const StudentLessonDetailPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()

  const { data, isLoading, isError, error } = useStudentLesson(id)
  const lesson = data?.lesson || data

  const files = lesson?.files || []
  const presentationFiles = files.filter((file) => file.kind === 'presentation')
  const kmjFiles = files.filter((file) => file.kind === 'kmj')
  const otherFiles = files.filter(
    (file) => file.kind !== 'presentation' && file.kind !== 'kmj',
  )

  const videos = lesson?.videos || []
const mainVideo = videos[0]

const getYoutubeEmbedUrl = (url) => {
  if (!url) return ''

  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  return url
}

const videoUrl =
  mainVideo?.sourceType === 'youtube'
    ? getYoutubeEmbedUrl(mainVideo.youtubeUrl)
    : mainVideo?.fileUrl

  return (
    <MainLayout user={user}>
      {isLoading && (
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          Сабақ жүктеліп жатыр...
        </div>
      )}

      {isError && (
        <div className="rounded-3xl bg-red-50 p-8 text-red-700 shadow-sm">
          <h2 className="text-2xl font-bold">Сабақ ашылмады</h2>
          <p className="mt-3">
            {error.message === 'Lesson is locked'
              ? 'Бұл сабақ әзірге құлыпталған. Алдыңғы сабақты аяқтау қажет.'
              : error.message}
          </p>

          <Link
            to="/student/lessons"
            className="mt-6 inline-block rounded-2xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Сабақтар тізіміне оралу
          </Link>
        </div>
      )}

      {!isLoading && !isError && lesson && (
        <div className="space-y-6">
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
              Деңгейі: {lesson.difficultyLevel || 'Орта'} • Өту балы:{' '}
              {lesson.passScore || 70}%
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <ProgressBar value={lesson.progressPercent || lesson.progress || 0} />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">
              Сабақ сипаттамасы
            </h3>
            <p className="mt-4 leading-7 text-gray-700">
              {lesson.description || 'Сабақ сипаттамасы кейін қосылады'}
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-800">
                Презентация материалдары
              </h3>

              {presentationFiles.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {presentationFiles.map((file) => (
                    <a
                      key={file.id}
                      href={file.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-green-100 bg-green-50 p-4 transition hover:bg-green-100"
                    >
                      <p className="font-semibold text-green-900">
                        {file.fileName}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Түрі: {file.mimeType || 'presentation'} • Көлемі:{' '}
                        {file.fileSize ? `${Math.round(file.fileSize / 1024)} KB` : '-'}
                      </p>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="mt-5 flex min-h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-green-200 bg-green-50 p-6 text-center">
                  <div>
                    <div className="text-5xl">📄</div>
                    <p className="mt-4 text-base font-medium text-green-900">
                      Презентация әлі жүктелмеген
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Мұғалім материал жүктегеннен кейін осы жерде көрінеді
                    </p>
                  </div>
                </div>
              )}
            </div>

<div className="rounded-3xl bg-white p-6 shadow-sm">
  <h3 className="text-2xl font-semibold text-green-800">
    Бейнесабақ
  </h3>

  {videoUrl ? (
    <div className="mt-5">
      {mainVideo?.title && (
        <p className="mb-3 font-medium text-gray-800">
          {mainVideo.title}
        </p>
      )}

      {mainVideo?.sourceType === 'youtube' ? (
        <div className="overflow-hidden rounded-2xl">
          <iframe
            className="h-[260px] w-full"
            src={videoUrl}
            title={mainVideo?.title || lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <video
          className="w-full rounded-2xl"
          src={videoUrl}
          controls
        >
          Сіздің браузеріңіз video тегін қолдамайды.
        </video>
      )}
    </div>
  ) : (
    <div className="mt-5 rounded-2xl bg-yellow-50 p-6 text-gray-700">
      Бейне материал әзірге жүктелмеген
    </div>
  )}
</div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">
              Сабақ файлдары
            </h3>

            {files.length > 0 ? (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {files.map((file) => (
                  <a
                    key={file.id}
                    href={file.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-green-100 bg-green-50 p-4 transition hover:bg-green-100"
                  >
                    <p className="font-semibold text-green-900">
                      {file.fileName}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Категория: {file.kind}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Көлемі:{' '}
                      {file.fileSize ? `${Math.round(file.fileSize / 1024)} KB` : '-'}
                    </p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-yellow-50 p-5 text-gray-700">
                Бұл сабаққа файлдар әлі қосылмаған
              </div>
            )}
          </div>

          {kmjFiles.length > 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-800">
                КМЖ материалдары
              </h3>

              <div className="mt-5 space-y-3">
                {kmjFiles.map((file) => (
                  <a
                    key={file.id}
                    href={file.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-yellow-100 bg-yellow-50 p-4 transition hover:bg-yellow-100"
                  >
                    <p className="font-semibold text-green-900">
                      {file.fileName}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Мұғалім жүктеген жоспар материалы
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-800">Тапсырма</h3>
              <p className="mt-3 leading-7 text-gray-700">
                Бұл сабақ бойынша өмірлік жағдаят тапсырмасы кейін API арқылы
                қосылады.
              </p>

              <Link
                to={`/student/task/${lesson.id}`}
                className="mt-6 inline-block rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Тапсырманы орындау
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-800">Тест</h3>
              <p className="mt-3 text-gray-700">
                Өту шегі: {lesson.passScore || 70}%
              </p>

              <Link
                to={`/student/quiz/${lesson.id}`}
                className="mt-6 inline-block rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Тестті бастау
              </Link>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default StudentLessonDetailPage