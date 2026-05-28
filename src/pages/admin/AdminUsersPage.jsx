import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  useAdminUsers,
  useCreateAdminUser,
  useDeleteAdminUser,
  useUpdateAdminUserRole,
  useUpdateAdminUserStatus,
} from '@/features/admin/users.queries'

const AdminUsersPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [page, setPage] = useState(1)
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: 'Password123!',
    role: 'student',
    status: 'active',
  })

  const params = {
    page,
    limit: 10,
    role,
    status,
    search,
  }

  const { data, isLoading, isError, error } = useAdminUsers(params)

  const createMutation = useCreateAdminUser()
  const roleMutation = useUpdateAdminUserRole()
  const statusMutation = useUpdateAdminUserStatus()
  const deleteMutation = useDeleteAdminUser()

  const users = data?.items || []
  const meta = data?.meta

  const handleCreateUser = (e) => {
    e.preventDefault()

    createMutation.mutate(newUser, {
      onSuccess: () => {
        setShowCreateForm(false)
        setNewUser({
          fullName: '',
          email: '',
          password: 'Password123!',
          role: 'student',
          status: 'active',
        })
      },
    })
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm('Пайдаланушыны өшіруге сенімдісіз бе?')

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
              Пайдаланушыларды басқару
            </h2>
            <p className="mt-2 text-gray-600">
              Пайдаланушыларды көру, іздеу, рөлін өзгерту және статусын басқару
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {showCreateForm ? 'Форманы жабу' : 'Пайдаланушы қосу'}
          </button>
        </div>

        {showCreateForm && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-800">
              Жаңа пайдаланушы жасау
            </h3>

            <form
              onSubmit={handleCreateUser}
              className="mt-6 grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Аты-жөні
                </label>
                <input
                  value={newUser.fullName}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                  placeholder="New Teacher"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                  placeholder="newteacher@cyberqazaq.kz"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Құпиясөз
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Рөл
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="student">Оқушы</option>
                  <option value="teacher">Мұғалім</option>
                  <option value="admin">Әкімші</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Статус
                </label>
                <select
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="active">Белсенді</option>
                  <option value="inactive">Белсенді емес</option>
                  <option value="blocked">Бұғатталған</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {createMutation.isPending ? 'Жасалып жатыр...' : 'Жасау'}
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
          <div className="grid gap-4 md:grid-cols-4">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Іздеу..."
              className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
            />

            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value)
                setPage(1)
              }}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
            >
              <option value="">Барлық рөлдер</option>
              <option value="student">Оқушы</option>
              <option value="teacher">Мұғалім</option>
              <option value="admin">Әкімші</option>
            </select>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
            >
              <option value="">Барлық статустар</option>
              <option value="active">Белсенді</option>
              <option value="inactive">Белсенді емес</option>
              <option value="blocked">Бұғатталған</option>
            </select>

            <button
              onClick={() => {
                setSearch('')
                setRole('')
                setStatus('')
                setPage(1)
              }}
              className="rounded-2xl border border-green-700 px-4 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
            >
              Тазалау
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          {isLoading && (
            <div className="rounded-2xl bg-green-50 p-5 text-gray-700">
              Пайдаланушылар жүктеліп жатыр...
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
                        Аты-жөні
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Рөл
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Статус
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Құрылған күні
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Әрекет
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((item) => (
                      <tr key={item.id} className="bg-green-50">
                        <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-gray-900">
                          {item.fullName}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700">
                          {item.email}
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={item.role}
                            onChange={(e) =>
                              roleMutation.mutate({
                                id: item.id,
                                role: e.target.value,
                              })
                            }
                            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-700"
                          >
                            <option value="student">Оқушы</option>
                            <option value="teacher">Мұғалім</option>
                            <option value="admin">Әкімші</option>
                          </select>
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              statusMutation.mutate({
                                id: item.id,
                                status: e.target.value,
                              })
                            }
                            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-700"
                          >
                            <option value="active">Белсенді</option>
                            <option value="inactive">Белсенді емес</option>
                            <option value="blocked">Бұғатталған</option>
                          </select>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString('kk-KZ')
                            : '-'}
                        </td>

                        <td className="rounded-r-2xl px-4 py-4">
                          <button
                            onClick={() => handleDelete(item.id)}
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

              {users.length === 0 && (
                <div className="rounded-2xl bg-yellow-50 p-5 text-gray-700">
                  Пайдаланушылар табылмады
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

export default AdminUsersPage