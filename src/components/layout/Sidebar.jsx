import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ role }) => {
  const location = useLocation()

  const menuByRole = {
    student: [
      { label: 'Дашборд', path: '/student/dashboard' },
      { label: 'Сабақтар', path: '/student/lessons' },
      { label: 'Профиль', path: '/student/profile' },
    ],
    teacher: [
      { label: 'Дашборд', path: '/teacher/dashboard' },
      { label: 'Топ', path: '/teacher/group' },
      { label: 'Прогресс', path: '/teacher/progress' },
      { label: 'Мазмұн', path: '/teacher/content' },
      { label: 'Пікірлер', path: '/teacher/reviews' },
      { label: 'Тест редакторы', path: '/teacher/quiz-editor' },
      { label: 'КМЖ', path: '/teacher/kmj' },
    ],
    admin: [
      { label: 'Дашборд', path: '/admin/dashboard' },
      { label: 'Пайдаланушылар', path: '/admin/users' },
      { label: 'Хабарландырулар', path: '/admin/notifications' },
      { label: 'Баптаулар', path: '/admin/settings' },
    ],
  }

  const menuItems = menuByRole[role] || []

  return (
    <aside className="min-h-screen w-72 border-r border-green-100 bg-white px-5 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-800">CyberQazaq.kz</h2>
        <p className="mt-1 text-sm text-gray-500">Оқу платформасы</p>
      </div>

      <div className="mb-6 rounded-2xl bg-green-50 p-4">
        <p className="text-sm text-gray-600">Ағымдағы рөл</p>
        <p className="mt-1 font-semibold text-green-900">
          {role === 'student' && 'Оқушы'}
          {role === 'teacher' && 'Мұғалім'}
          {role === 'admin' && 'Әкімші'}
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-green-700 text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar