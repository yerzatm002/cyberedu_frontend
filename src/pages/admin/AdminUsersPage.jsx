import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import mockAdminUsers from '@/data/mockAdminUsers'

const AdminUsersPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))
  const [users, setUsers] = useState(mockAdminUsers)

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map((item) =>
      item.id === id ? { ...item, role: newRole } : item,
    )
    setUsers(updatedUsers)
  }

  const handleStatusToggle = (id) => {
    const updatedUsers = users.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === 'Белсенді' ? 'Белсенді емес' : 'Белсенді',
          }
        : item,
    )
    setUsers(updatedUsers)
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
              Бұл бөлімде пайдаланушылардың рөлін өзгерту және күйін басқару мүмкіндігі бар
            </p>
          </div>

          <button className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
            Пайдаланушы қосу
          </button>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
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
                    Мектеп
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Сынып
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Күйі
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
                      {item.name}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">{item.email}</td>

                    <td className="px-4 py-4">
                      <select
                        value={item.role}
                        onChange={(e) => handleRoleChange(item.id, e.target.value)}
                        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-700"
                      >
                        <option value="student">Оқушы</option>
                        <option value="teacher">Мұғалім</option>
                        <option value="admin">Әкімші</option>
                      </select>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">{item.school}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{item.className}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === 'Белсенді'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="rounded-r-2xl px-4 py-4">
                      <button
                        onClick={() => handleStatusToggle(item.id)}
                        className="rounded-xl bg-yellow-400 px-4 py-2 text-xs font-semibold text-green-900 transition hover:bg-yellow-300"
                      >
                        Күйін өзгерту
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminUsersPage