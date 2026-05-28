import { useEffect, useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  useAdminSettings,
  useUpdateAdminSettings,
} from '@/features/admin/admin.queries'

const AdminSettingsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const { data, isLoading, isError, error } = useAdminSettings()
  const updateMutation = useUpdateAdminSettings()

  const [settings, setSettings] = useState({
    academicYear: '',
    platformName: '',
    courseTitle: '',
    defaultLanguage: 'kk',
    registrationEnabled: true,
    certificateEnabled: true,
    courseActive: true,
  })

  useEffect(() => {
    if (data?.settings) {
      setSettings(data.settings)
    }
  }, [data])

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    updateMutation.mutate(settings)
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Жүйе баптаулары</h2>
          <p className="mt-2 text-gray-600">
            Платформа, курс, тіркелу және сертификат параметрлерін басқару
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            Баптаулар жүктеліп жатыр...
          </div>
        )}

        {isError && (
          <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">
            {error.message}
          </div>
        )}

        {!isLoading && !isError && (
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
                  Курс атауы
                </label>
                <input
                  type="text"
                  value={settings.courseTitle}
                  onChange={(e) => handleChange('courseTitle', e.target.value)}
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
                  placeholder="2025-2026"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Негізгі тіл
                </label>
                <select
                  value={settings.defaultLanguage}
                  onChange={(e) =>
                    handleChange('defaultLanguage', e.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="kk">Қазақ тілі</option>
                  <option value="ru">Орыс тілі</option>
                  <option value="en">Ағылшын тілі</option>
                </select>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <label className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Тіркелу қосулы
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.registrationEnabled}
                    onChange={(e) =>
                      handleChange('registrationEnabled', e.target.checked)
                    }
                    className="h-5 w-5"
                  />
                </label>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <label className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Сертификат беру қосулы
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

              <div className="rounded-2xl bg-green-50 p-4 md:col-span-2">
                <label className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Курс белсенді
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.courseActive}
                    onChange={(e) =>
                      handleChange('courseActive', e.target.checked)
                    }
                    className="h-5 w-5"
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {updateMutation.isPending
                    ? 'Сақталып жатыр...'
                    : 'Баптауларды сақтау'}
                </button>
              </div>
            </form>

            {updateMutation.isSuccess && (
              <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-green-800">
                Баптаулар сәтті сақталды
              </div>
            )}

            {updateMutation.isError && (
              <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {updateMutation.error.message}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default AdminSettingsPage