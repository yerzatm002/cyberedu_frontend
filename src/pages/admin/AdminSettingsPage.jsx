import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import mockSystemSettings from '@/data/mockSystemSettings'

const AdminSettingsPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  const [settings, setSettings] = useState(mockSystemSettings)
  const [saved, setSaved] = useState(false)

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Жүйе баптаулары</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде платформаның негізгі параметрлерін өзгертуге болады
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Платформа атауы
              </label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => handleChange('platformName', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Академиялық жыл
              </label>
              <input
                type="text"
                value={settings.academicYear}
                onChange={(e) => handleChange('academicYear', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Тіл
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              >
                <option>Қазақ тілі</option>
                <option>Орыс тілі</option>
                <option>Ағылшын тілі</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Сабақ саны
              </label>
              <input
                type="number"
                value={settings.totalLessons}
                onChange={(e) => handleChange('totalLessons', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
              />
            </div>

            <div className="rounded-2xl bg-green-50 p-4">
              <label className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Сертификат беру жүйесі
                </span>
                <input
                  type="checkbox"
                  checked={settings.certificateEnabled}
                  onChange={(e) =>
                    handleChange('certificateEnabled', e.target.checked)
                  }
                  className="h-5 w-5"
                />
              </label>
            </div>

            <div className="rounded-2xl bg-green-50 p-4">
              <label className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Хабарландыру жүйесі
                </span>
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={(e) =>
                    handleChange('notificationsEnabled', e.target.checked)
                  }
                  className="h-5 w-5"
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Баптауларды сақтау
              </button>
            </div>
          </form>

          {saved && (
            <div className="mt-6 rounded-2xl bg-yellow-50 p-4">
              <p className="font-semibold text-yellow-800">Сақталды</p>
              <p className="mt-1 text-sm text-gray-700">
                Бұл mock нұсқада баптаулар интерфейс деңгейінде уақытша сақталды
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminSettingsPage