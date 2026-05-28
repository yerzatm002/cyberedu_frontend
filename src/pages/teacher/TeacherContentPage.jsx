import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  useCreateTeacherLesson,
  useDeleteTeacherLesson,
  useTeacherLessons,
  useUpdateTeacherLesson,
} from '@/features/lessons/lessons.queries'
import {
  useUploadLessonKmj,
  useUploadLessonPresentation,
} from '@/features/files/files.queries'
import {
  useCreateLessonTask,
  useUpdateTask,
} from '@/features/tasks/tasks.queries'

const TeacherContentPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [taskForms, setTaskForms] = useState({})

  const [newLesson, setNewLesson] = useState({
    courseId: '',
    blockId: '',
    title: '',
    description: '',
    difficultyLevel: 'Бастауыш',
    orderIndex: 1,
    passScore: 70,
    isFinal: false,
    isPublished: true,
  })

  const { data, isLoading, isError, error } = useTeacherLessons({
    page: 1,
    limit: 50,
  })

  const createMutation = useCreateTeacherLesson()
  const updateMutation = useUpdateTeacherLesson()
  const deleteMutation = useDeleteTeacherLesson()
  const uploadPresentationMutation = useUploadLessonPresentation()
  const uploadKmjMutation = useUploadLessonKmj()
  const createTaskMutation = useCreateLessonTask()
  const updateTaskMutation = useUpdateTask()

  const lessons = data?.items || []

  const handleCreateLesson = (e) => {
    e.preventDefault()

    createMutation.mutate(
      {
        ...newLesson,
        orderIndex: Number(newLesson.orderIndex),
        passScore: Number(newLesson.passScore),
      },
      {
        onSuccess: () => {
          setShowCreateForm(false)
          setNewLesson({
            courseId: '',
            blockId: '',
            title: '',
            description: '',
            difficultyLevel: 'Бастауыш',
            orderIndex: 1,
            passScore: 70,
            isFinal: false,
            isPublished: true,
          })
        },
      },
    )
  }

  const handleTaskFieldChange = (lessonId, field, value) => {
    setTaskForms((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [field]: value,
      },
    }))
  }

  const getTaskPayload = (lesson) => ({
    title: taskForms[lesson.id]?.title ?? lesson.task?.title ?? '',
    scenarioText:
      taskForms[lesson.id]?.scenarioText ?? lesson.task?.scenarioText ?? '',
    instructionsText:
      taskForms[lesson.id]?.instructionsText ??
      lesson.task?.instructionsText ??
      '',
    isRequired:
      taskForms[lesson.id]?.isRequired ?? lesson.task?.isRequired ?? false,
  })

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-green-900">
              Сабақтарды басқару
            </h2>
            <p className="mt-2 text-gray-600">
              Мұғалім сабақтарды құрып, материалдарды жүктеп, тапсырма қосып,
              жариялау күйін басқара алады
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {showCreateForm ? 'Форманы жабу' : 'Сабақ қосу'}
          </button>
        </div>

        {showCreateForm && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">Жаңа сабақ</h3>

            <form
              onSubmit={handleCreateLesson}
              className="mt-6 grid gap-5 md:grid-cols-2"
            >
              <input
                value={newLesson.courseId}
                onChange={(e) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    courseId: e.target.value,
                  }))
                }
                placeholder="COURSE_ID"
                className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <input
                value={newLesson.blockId}
                onChange={(e) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    blockId: e.target.value,
                  }))
                }
                placeholder="BLOCK_ID"
                className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <input
                value={newLesson.title}
                onChange={(e) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Сабақ атауы"
                className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700 md:col-span-2"
              />

              <textarea
                value={newLesson.description}
                onChange={(e) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Сабақ сипаттамасы"
                className="min-h-[120px] rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700 md:col-span-2"
              />

              <select
                value={newLesson.difficultyLevel}
                onChange={(e) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    difficultyLevel: e.target.value,
                  }))
                }
                className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              >
                <option value="Бастауыш">Бастауыш</option>
                <option value="Орта">Орта</option>
                <option value="Жоғары">Жоғары</option>
              </select>

              <input
                type="number"
                value={newLesson.orderIndex}
                onChange={(e) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    orderIndex: e.target.value,
                  }))
                }
                placeholder="Реті"
                className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <input
                type="number"
                value={newLesson.passScore}
                onChange={(e) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    passScore: e.target.value,
                  }))
                }
                placeholder="Өту балы"
                className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />

              <label className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">
                <input
                  type="checkbox"
                  checked={newLesson.isPublished}
                  onChange={(e) =>
                    setNewLesson((prev) => ({
                      ...prev,
                      isPublished: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm text-gray-700">Жарияланған</span>
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {createMutation.isPending ? 'Қосылып жатыр...' : 'Сабақ қосу'}
                </button>
              </div>
            </form>

            {createMutation.isError && (
              <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {createMutation.error.message}
              </div>
            )}
          </div>
        )}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          {isLoading && <div>Сабақтар жүктеліп жатыр...</div>}

          {isError && (
            <div className="rounded-2xl bg-red-50 p-5 text-red-700">
              {error.message}
            </div>
          )}

          {!isLoading && !isError && (
            <div className="space-y-5">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="rounded-2xl border border-green-100 bg-green-50 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Сабақ #{lesson.orderIndex || lesson.id}
                      </p>

                      <h3 className="mt-1 text-xl font-semibold text-green-900">
                        {lesson.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-700">
                        {lesson.description || 'Сипаттама жоқ'}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                          {lesson.difficultyLevel || 'Деңгей көрсетілмеген'}
                        </span>

                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-800">
                          Өту балы: {lesson.passScore || 70}%
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            lesson.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {lesson.isPublished ? 'Жарияланған' : 'Жасырылған'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          updateMutation.mutate({
                            id: lesson.id,
                            payload: {
                              isPublished: !lesson.isPublished,
                            },
                          })
                        }
                        className="rounded-xl bg-yellow-400 px-4 py-2 text-xs font-semibold text-green-900"
                      >
                        {lesson.isPublished ? 'Жасыру' : 'Жариялау'}
                      </button>

                      <button
                        onClick={() => deleteMutation.mutate(lesson.id)}
                        className="rounded-xl bg-red-100 px-4 py-2 text-xs font-semibold text-red-700"
                      >
                        Өшіру
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Презентация жүктеу
                      </label>

                      <input
                        type="file"
                        accept=".ppt,.pptx,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]

                          if (file) {
                            uploadPresentationMutation.mutate({
                              lessonId: lesson.id,
                              file,
                            })
                          }
                        }}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      />

                      {uploadPresentationMutation.isPending && (
                        <p className="mt-2 text-sm text-gray-500">
                          Жүктеліп жатыр...
                        </p>
                      )}

                      {uploadPresentationMutation.isError && (
                        <p className="mt-2 text-sm text-red-600">
                          {uploadPresentationMutation.error.message}
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        КМЖ жүктеу
                      </label>

                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]

                          if (file) {
                            uploadKmjMutation.mutate({
                              lessonId: lesson.id,
                              file,
                            })
                          }
                        }}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      />

                      {uploadKmjMutation.isPending && (
                        <p className="mt-2 text-sm text-gray-500">
                          Жүктеліп жатыр...
                        </p>
                      )}

                      {uploadKmjMutation.isError && (
                        <p className="mt-2 text-sm text-red-600">
                          {uploadKmjMutation.error.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {lesson.files?.length > 0 && (
                    <div className="mt-5 rounded-2xl bg-white p-4">
                      <p className="mb-3 text-sm font-semibold text-green-800">
                        Жүктелген файлдар
                      </p>

                      <div className="space-y-2">
                        {lesson.files.map((file) => (
                          <a
                            key={file.id}
                            href={file.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800 hover:bg-green-100"
                          >
                            {file.kind}: {file.fileName}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-5 rounded-2xl bg-white p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-green-800">
                          Сабақ тапсырмасы
                        </h4>

                        <p className="mt-1 text-sm text-gray-600">
                          Оқушылар орындайтын жағдаят тапсырмасы
                        </p>
                      </div>

                      {lesson.task && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          Тапсырма қосылған
                        </span>
                      )}
                    </div>

                    <div className="mt-5 space-y-4">
                      <input
                        value={
                          taskForms[lesson.id]?.title ||
                          lesson.task?.title ||
                          ''
                        }
                        onChange={(e) =>
                          handleTaskFieldChange(
                            lesson.id,
                            'title',
                            e.target.value,
                          )
                        }
                        placeholder="Тапсырма атауы"
                        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                      />

                      <textarea
                        value={
                          taskForms[lesson.id]?.scenarioText ||
                          lesson.task?.scenarioText ||
                          ''
                        }
                        onChange={(e) =>
                          handleTaskFieldChange(
                            lesson.id,
                            'scenarioText',
                            e.target.value,
                          )
                        }
                        placeholder="Жағдаят мәтіні"
                        className="min-h-[120px] w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                      />

                      <textarea
                        value={
                          taskForms[lesson.id]?.instructionsText ||
                          lesson.task?.instructionsText ||
                          ''
                        }
                        onChange={(e) =>
                          handleTaskFieldChange(
                            lesson.id,
                            'instructionsText',
                            e.target.value,
                          )
                        }
                        placeholder="Нұсқаулық мәтіні"
                        className="min-h-[120px] w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
                      />

                      <label className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">
                        <input
                          type="checkbox"
                          checked={
                            taskForms[lesson.id]?.isRequired ??
                            lesson.task?.isRequired ??
                            false
                          }
                          onChange={(e) =>
                            handleTaskFieldChange(
                              lesson.id,
                              'isRequired',
                              e.target.checked,
                            )
                          }
                        />

                        <span className="text-sm text-gray-700">
                          Міндетті тапсырма
                        </span>
                      </label>

                      {lesson.task ? (
                        <button
                          onClick={() =>
                            updateTaskMutation.mutate({
                              taskId: lesson.task.id,
                              payload: getTaskPayload(lesson),
                            })
                          }
                          disabled={updateTaskMutation.isPending}
                          className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-green-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          {updateTaskMutation.isPending
                            ? 'Сақталып жатыр...'
                            : 'Тапсырманы жаңарту'}
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            createTaskMutation.mutate({
                              lessonId: lesson.id,
                              payload: getTaskPayload(lesson),
                            })
                          }
                          disabled={createTaskMutation.isPending}
                          className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          {createTaskMutation.isPending
                            ? 'Қосылып жатыр...'
                            : 'Тапсырма қосу'}
                        </button>
                      )}

                      {createTaskMutation.isError && (
                        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                          {createTaskMutation.error.message}
                        </div>
                      )}

                      {updateTaskMutation.isError && (
                        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                          {updateTaskMutation.error.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {lessons.length === 0 && (
                <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                  Сабақтар табылмады
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default TeacherContentPage