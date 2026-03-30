import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import mockAnnouncements from '@/data/mockAnnouncements'

const AdminNotificationsPage = () => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [title, setTitle] = useState('')
  const [audience, setAudience] = useState('Барлық пайдаланушылар')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !message.trim()) {
      alert('Барлық өрістерді толтырыңыз')
      return
    }

    const newAnnouncement = {
      id: Date.now(),
      title,
      audience,
      message,
      date: new Date().toISOString().slice(0, 10),
    }

    setAnnouncements((prev) => [newAnnouncement, ...prev])
    setTitle('')
    setAudience('Барлық пайдаланушылар')
    setMessage('')
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-green-900">Хабарландырулар</h2>
          <p className="mt-2 text-gray-600">
            Бұл бөлімде барлық пайдаланушыларға хабар жіберуге болады
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
                  Аудитория
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option>Барлық пайдаланушылар</option>
                  <option>Оқушылар</option>
                  <option>Мұғалімдер</option>
                  <option>Әкімшілер</option>
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
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Хабар жіберу
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            <h3 className="text-2xl font-semibold text-green-800">
              Хабарландырулар тарихы
            </h3>

            <div className="mt-6 space-y-4">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-green-100 bg-green-50 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>

                  <p className="mt-2 text-sm font-medium text-green-800">
                    Аудитория: {item.audience}
                  </p>

                  <p className="mt-3 text-gray-700">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminNotificationsPage