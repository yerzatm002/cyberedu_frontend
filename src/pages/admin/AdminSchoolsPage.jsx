import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  useCreateSchool,
  useDeleteSchool,
  useSchools,
} from '@/features/admin/schools.queries'

const AdminSchoolsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [newSchool, setNewSchool] = useState({
    name: '',
    region: '',
    city: '',
  })

  const { data, isLoading, isError, error } = useSchools({
    page,
    limit: 10,
    search,
  })

  const createMutation = useCreateSchool()
  const deleteMutation = useDeleteSchool()

  const schools = data?.items || []
  const meta = data?.meta

  const handleCreateSchool = (e) => {
    e.preventDefault()

    if (!newSchool.name.trim()) {
      alert('Мектеп атауын енгізіңіз')
      return
    }

    createMutation.mutate(newSchool, {
      onSuccess: () => {
        setNewSchool({
          name: '',
          region: '',
          city: '',
        })
        setShowCreateForm(false)
      },
    })
  }

  const handleDeleteSchool = (id) => {
    const confirmed = window.confirm('Мектепті өшіруге сенімдісіз бе?')

    if (confirmed) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-green-900">
              Мектептерді басқару
            </h2>
            <p className="mt-2 text-gray-600">
              Мектептер тізімін көру, іздеу, қосу және өшіру
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {showCreateForm ? 'Форманы жабу' : 'Мектеп қосу'}
          </button>
        </div>

        {showCreateForm && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">
              Жаңа мектеп қосу
            </h3>

            <form
              onSubmit={handleCreateSchool}
              className="mt-6 grid gap-5 md:grid-cols-3"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Мектеп атауы
                </label>
                <input
                  value={newSchool.name}
                  onChange={(e) =>
                    setNewSchool((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="№1 мектеп-лицей"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Өңір
                </label>
                <input
                  value={newSchool.region}
                  onChange={(e) =>
                    setNewSchool((prev) => ({
                      ...prev,
                      region: e.target.value,
                    }))
                  }
                  placeholder="Астана"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Қала
                </label>
                <input
                  value={newSchool.city}
                  onChange={(e) =>
                    setNewSchool((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  placeholder="Астана"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {createMutation.isPending ? 'Қосылып жатыр...' : 'Қосу'}
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
          <div className="flex flex-wrap gap-4">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Мектеп іздеу..."
              className="min-w-[260px] flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
            />

            <button
              onClick={() => {
                setSearch('')
                setPage(1)
              }}
              className="rounded-2xl border border-green-700 px-5 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
            >
              Тазалау
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          {isLoading && (
            <div className="rounded-2xl bg-green-50 p-5 text-gray-700">
              Мектептер жүктеліп жатыр...
            </div>
          )}

          {isError && (
            <div className="rounded-2xl bg-red-50 p-5 text-red-700">
              {error.message}
            </div>
          )}

          {!isLoading && !isError && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Мектеп атауы
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Өңір
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Қала
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Әрекет
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {schools.map((school) => (
                      <tr key={school.id} className="bg-green-50">
                        <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-gray-900">
                          {school.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">
                          {school.region || '-'}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">
                          {school.city || '-'}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4">
                          <button
                            onClick={() => handleDeleteSchool(school.id)}
                            className="rounded-xl bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                          >
                            Өшіру
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {schools.length === 0 && (
                <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                  Мектептер табылмады
                </div>
              )}

              {meta && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Барлығы: {meta.total} • Бет: {meta.page}/{meta.totalPages}
                  </p>

                  <div className="flex gap-3">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((prev) => prev - 1)}
                      className="rounded-xl border border-green-700 px-4 py-2 text-sm font-semibold text-green-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                    >
                      Алдыңғы
                    </button>

                    <button
                      disabled={page >= meta.totalPages}
                      onClick={() => setPage((prev) => prev + 1)}
                      className="rounded-xl border border-green-700 px-4 py-2 text-sm font-semibold text-green-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                    >
                      Келесі
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminSchoolsPage