import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { usePublicSchools } from '@/features/schools/schools.queries'
import {
  useCreateTeacherGroup,
  useDeleteTeacherGroup,
  useGroupStudents,
  useTeacherGroups,
} from '@/features/teacher/groups.queries'

const TeacherGroupPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [studentProfileId, setStudentProfileId] = useState('')

  const [newGroup, setNewGroup] = useState({
    name: '',
    grade: 8,
    academicYear: '2025-2026',
    schoolId: '',
  })

  const { data: groupsData, isLoading, isError, error } = useTeacherGroups({
    page: 1,
    limit: 20,
  })

  const { data: schoolsData } = usePublicSchools({
    page: 1,
    limit: 100,
  })

  const groups = groupsData?.items || []
  const schools = schoolsData?.items || []

  const activeGroupId = selectedGroupId || groups[0]?.id || ''

  const { data: studentsData, isLoading: studentsLoading } =
    useGroupStudents(activeGroupId)

  const createGroupMutation = useCreateTeacherGroup()
  const deleteGroupMutation = useDeleteTeacherGroup()

  const students = studentsData?.items || []

  const handleCreateGroup = (e) => {
    e.preventDefault()

    if (!newGroup.name.trim() || !newGroup.schoolId) {
      alert('Топ атауы мен мектепті таңдаңыз')
      return
    }

    createGroupMutation.mutate(
      {
        ...newGroup,
        grade: Number(newGroup.grade),
      },
      {
        onSuccess: () => {
          setShowCreateForm(false)
          setNewGroup({
            name: '',
            grade: 8,
            academicYear: '2025-2026',
            schoolId: '',
          })
        },
      },
    )
  }

  const handleDeleteGroup = (id) => {
    const confirmed = window.confirm('Топты өшіруге сенімдісіз бе?')

    if (confirmed) {
      deleteGroupMutation.mutate(id)
    }
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-green-900">Топты басқару</h2>
            <p className="mt-2 text-gray-600">
              Мұғалім өз топтарын құрып, оқушылар тізімін қарай алады
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {showCreateForm ? 'Форманы жабу' : 'Топ қосу'}
          </button>
        </div>

        {showCreateForm && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">Жаңа топ құру</h3>

            <form
              onSubmit={handleCreateGroup}
              className="mt-6 grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Топ атауы
                </label>
                <input
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="8Б CyberQazaq"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Сынып
                </label>
                <input
                  type="number"
                  value={newGroup.grade}
                  onChange={(e) =>
                    setNewGroup((prev) => ({
                      ...prev,
                      grade: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Академиялық жыл
                </label>
                <input
                  value={newGroup.academicYear}
                  onChange={(e) =>
                    setNewGroup((prev) => ({
                      ...prev,
                      academicYear: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Мектеп
                </label>
                <select
                  value={newGroup.schoolId}
                  onChange={(e) =>
                    setNewGroup((prev) => ({
                      ...prev,
                      schoolId: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="">Мектеп таңдаңыз</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={createGroupMutation.isPending}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {createGroupMutation.isPending ? 'Құрылып жатыр...' : 'Топ құру'}
                </button>
              </div>
            </form>

            {createGroupMutation.isError && (
              <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {createGroupMutation.error.message}
              </div>
            )}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">Топтар</h3>

            {isLoading && (
              <div className="mt-5 rounded-2xl bg-green-50 p-5 text-gray-700">
                Топтар жүктеліп жатыр...
              </div>
            )}

            {isError && (
              <div className="mt-5 rounded-2xl bg-red-50 p-5 text-red-700">
                {error.message}
              </div>
            )}

            {!isLoading && !isError && (
              <div className="mt-5 space-y-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`rounded-2xl border p-4 ${
                      activeGroupId === group.id
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setSelectedGroupId(group.id)}
                      className="w-full text-left"
                    >
                      <p className="font-semibold text-gray-900">{group.name}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {group.grade || '-'} сынып • {group.academicYear || '-'}
                      </p>
                    </button>

                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="mt-4 rounded-xl bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      Топты өшіру
                    </button>
                  </div>
                ))}

                {groups.length === 0 && (
                  <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                    Әзірге топ жоқ
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            <h3 className="text-2xl font-semibold text-green-800">
              Топ оқушылары
            </h3>

            {!activeGroupId && (
              <div className="mt-5 rounded-2xl bg-yellow-50 p-5 text-gray-700">
                Алдымен топ таңдаңыз немесе жаңа топ құрыңыз
              </div>
            )}

            {activeGroupId && (
              <>
                <div className="mt-5 rounded-2xl bg-yellow-50 p-4">
                  <p className="font-semibold text-yellow-800">Ескерту</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Оқушыны топқа қосу үшін backend studentProfile.id күтеді.
                    Қазір осы id қолмен енгізіледі.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <input
                    value={studentProfileId}
                    onChange={(e) => setStudentProfileId(e.target.value)}
                    placeholder="STUDENT_PROFILE_ID"
                    className="min-w-[260px] flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                  />

                  <button
                    onClick={() => {
                      if (!studentProfileId.trim()) {
                        alert('studentProfile.id енгізіңіз')
                        return
                      }

                      import('@/features/teacher/groups.api').then(
                        ({ addStudentToGroup }) => {
                          addStudentToGroup(activeGroupId, studentProfileId).then(() => {
                            window.location.reload()
                          })
                        },
                      )
                    }}
                    className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    Оқушы қосу
                  </button>
                </div>

                {studentsLoading && (
                  <div className="mt-5 rounded-2xl bg-green-50 p-5 text-gray-700">
                    Оқушылар жүктеліп жатыр...
                  </div>
                )}

                {!studentsLoading && (
                  <div className="mt-6 space-y-4">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className="rounded-2xl border border-green-100 bg-green-50 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {student.user?.fullName || student.fullName || 'Оқушы'}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                              {student.user?.email || student.email || '-'}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              import('@/features/teacher/groups.api').then(
                                ({ removeStudentFromGroup }) => {
                                  removeStudentFromGroup(
                                    activeGroupId,
                                    student.id,
                                  ).then(() => window.location.reload())
                                },
                              )
                            }}
                            className="rounded-xl bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                          >
                            Топтан шығару
                          </button>
                        </div>
                      </div>
                    ))}

                    {students.length === 0 && (
                      <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                        Бұл топта оқушылар жоқ
                      </div>
                    )}
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

export default TeacherGroupPage