import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { useCreateBroadcastNotification } from '@/features/notifications/notifications.queries'

const AdminNotificationsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [title, setTitle] = useState('')
  const [targetRole, setTargetRole] = useState('student')
  const [type, setType] = useState('info')
  const [message, setMessage] = useState('')
  const [lastResult, setLastResult] = useState(null)

  const createBroadcastMutation = useCreateBroadcastNotification()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !message.trim()) {
      alert('Тақырып пен мәтінді толтырыңыз')
      return
    }

    createBroadcastMutation.mutate(
      {
        title,
        message,
        type,
        targetRole,
      },
      {
        onSuccess: (data) => {
          setLastResult(data)
          setTitle('')
          setMessage('')
          setType('info')
          setTargetRole('student')
        },
      },
    )
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">
            Хабарландырулар
          </h2>
          <p className="mt-2 text-gray-600">
            Әкімші белгілі бір рөлге жалпы хабарландыру жібере алады
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-1">
            <h3 className="text-2xl font-semibold text-green-800">
              Жаңа хабарландыру
            </h3>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Тақырып
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Хабарландыру тақырыбы"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Мақсатты рөл
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="student">Оқушылар</option>
                  <option value="teacher">Мұғалімдер</option>
                  <option value="admin">Әкімшілер</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Түрі
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="info">Ақпарат</option>
                  <option value="success">Сәтті</option>
                  <option value="warning">Ескерту</option>
                  <option value="error">Қате</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Мәтін
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Хабарландыру мәтінін жазыңыз..."
                  className="min-h-[160px] w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </div>

              <button
                type="submit"
                disabled={createBroadcastMutation.isPending}
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {createBroadcastMutation.isPending
                  ? 'Жіберіліп жатыр...'
                  : 'Хабар жіберу'}
              </button>
            </form>

            {createBroadcastMutation.isError && (
              <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {createBroadcastMutation.error.message}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            <h3 className="text-2xl font-semibold text-green-800">
              Жіберу нәтижесі
            </h3>

            {lastResult ? (
              <div className="mt-6 rounded-2xl bg-green-50 p-5">
                <p className="text-lg font-semibold text-green-900">
                  Хабарландыру сәтті жіберілді
                </p>

                <p className="mt-2 text-gray-700">
                  Құрылған хабарландыру саны: {lastResult.createdCount}
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-yellow-50 p-5 text-gray-700">
                Әзірге хабарландыру жіберілген жоқ
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-green-50 p-5">
              <h4 className="font-semibold text-green-900">
                API байланысы
              </h4>
              <p className="mt-2 text-sm text-gray-700">
                Бұл бет POST /admin/notifications endpoint арқылы targetRole
                бойынша broadcast жасайды. Teacher review жасалған кезде оқушыға
                жеке хабарландыру backend арқылы автоматты құрылады.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminNotificationsPage