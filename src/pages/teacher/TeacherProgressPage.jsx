import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { useTeacherGroups } from '@/features/teacher/groups.queries'
import {
  useTeacherGroupProgress,
  useTeacherStudentProgress,
} from '@/features/progress/progress.queries'

const TeacherProgressPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')

  const {
    data: groupsData,
    isLoading: groupsLoading,
    isError: groupsError,
    error: groupsErrorData,
  } = useTeacherGroups({
    page: 1,
    limit: 50,
  })

  const groups = groupsData?.items || []
  const activeGroupId = selectedGroupId || groups[0]?.id || ''

  const {
    data: progressData,
    isLoading: progressLoading,
    isError: progressError,
    error: progressErrorData,
  } = useTeacherGroupProgress(activeGroupId)

  const {
    data: studentProgressData,
    isLoading: studentProgressLoading,
    isError: studentProgressError,
    error: studentProgressErrorData,
  } = useTeacherStudentProgress(selectedStudentId)

  const group = progressData?.group
  const course = progressData?.course
  const summary = progressData?.summary
  const students = progressData?.students || []

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Оқу прогресі</h2>
          <p className="mt-2 text-gray-600">
            Мұғалім топ бойынша және жеке оқушы бойынша оқу прогресін қарай алады
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-800">Топ таңдау</h3>

          {groupsLoading && (
            <div className="mt-4 rounded-2xl bg-green-50 p-4 text-gray-700">
              Топтар жүктеліп жатыр...
            </div>
          )}

          {groupsError && (
            <div className="mt-4 rounded-2xl bg-red-50 p-4 text-red-700">
              {groupsErrorData.message}
            </div>
          )}

          {!groupsLoading && !groupsError && (
            <select
              value={activeGroupId}
              onChange={(e) => {
                setSelectedGroupId(e.target.value)
                setSelectedStudentId('')
              }}
              className="mt-4 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700 md:max-w-md"
            >
              {groups.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}

          {!groupsLoading && !groupsError && groups.length === 0 && (
            <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-gray-700">
              Әзірге топ жоқ. Алдымен «Топ» бөлімінен топ құрыңыз.
            </div>
          )}
        </div>

        {progressLoading && activeGroupId && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Прогресс жүктеліп жатыр...
          </div>
        )}

        {progressError && (
          <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {progressErrorData.message}
          </div>
        )}

        {!progressLoading && !progressError && summary && (
          <>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Курс</p>
              <h3 className="mt-2 text-2xl font-semibold text-green-900">
                {course?.title || 'CyberQazaq.kz курсы'}
              </h3>
              <p className="mt-2 text-gray-600">
                Топ: {group?.name || 'Топ атауы көрсетілмеген'}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Оқушылар саны</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.studentsCount}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Курсты аяқтағандар</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.completedStudents}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Орташа прогресс</p>
                <p className="mt-3 text-3xl font-bold text-green-800">
                  {summary.averageProgress}%
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
                <h3 className="text-2xl font-semibold text-green-800">
                  Оқушылар бойынша прогресс
                </h3>

                <div className="mt-6 space-y-4">
                  {students.map((item) => (
                    <button
                      key={item.student.id}
                      onClick={() => setSelectedStudentId(item.student.id)}
                      className={`w-full rounded-2xl border p-5 text-left transition ${
                        selectedStudentId === item.student.id
                          ? 'border-green-300 bg-green-50'
                          : 'border-green-100 bg-white hover:bg-green-50'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.student.fullName}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            {item.summary.completedLessons}/
                            {item.summary.totalLessons} сабақ аяқталды
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.summary.isCompleted
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.summary.completionPercent}%
                        </span>
                      </div>

                      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-green-100">
                        <div
                          className="h-full rounded-full bg-green-700"
                          style={{
                            width: `${item.summary.completionPercent}%`,
                          }}
                        />
                      </div>
                    </button>
                  ))}

                  {students.length === 0 && (
                    <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                      Бұл топта оқушы прогресі табылмады
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-green-800">
                  Жеке оқушы
                </h3>

                {!selectedStudentId && (
                  <div className="mt-5 rounded-2xl bg-yellow-50 p-5 text-gray-700">
                    Сол жақтан оқушыны таңдаңыз
                  </div>
                )}

                {studentProgressLoading && selectedStudentId && (
                  <div className="mt-5 rounded-2xl bg-green-50 p-5 text-gray-700">
                    Жеке прогресс жүктеліп жатыр...
                  </div>
                )}

                {studentProgressError && (
                  <div className="mt-5 rounded-2xl bg-red-50 p-5 text-red-700">
                    {studentProgressErrorData.message}
                  </div>
                )}

                {studentProgressData && !studentProgressLoading && (
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-green-50 p-4">
                      <p className="text-sm text-gray-600">Оқушы</p>
                      <p className="mt-1 font-semibold text-green-900">
                        {studentProgressData.student?.fullName ||
                          studentProgressData.student?.user?.fullName ||
                          'Оқушы'}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-green-50 p-4">
                      <p className="text-sm text-gray-600">Прогресс</p>
                      <p className="mt-1 text-2xl font-bold text-green-800">
                        {studentProgressData.summary?.completionPercent ?? 0}%
                      </p>
                    </div>

                    <div className="space-y-3">
                      {(studentProgressData.lessons || []).map((lesson) => (
                        <div
                          key={lesson.lessonId}
                          className="rounded-2xl border border-green-100 bg-green-50 p-4"
                        >
                          <p className="font-semibold text-gray-900">
                            {lesson.orderIndex}. {lesson.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            Статус: {lesson.status} • Балл:{' '}
                            {lesson.bestScore ?? '-'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default TeacherProgressPage