import { useNavigate } from 'react-router-dom'
import { logout } from '@/features/auth/auth.api'

const Header = ({ user }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }

    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between border-b border-green-100 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-bold text-green-900">Жеке кабинет</h1>
        <p className="text-sm text-gray-500">
          Киберқауіпсіздік бойынша оқу платформасы
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">
            {user?.fullName || user?.name}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-green-900 transition hover:bg-yellow-300"
        >
          Шығу
        </button>
      </div>
    </header>
  )
}

export default Header