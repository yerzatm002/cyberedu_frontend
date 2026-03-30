import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import mockUsers from '@/data/mockUsers'

const LoginPage = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const foundUser = mockUsers.find(
      (user) =>
        user.email === data.email &&
        user.password === data.password &&
        user.role === data.role,
    )

    if (!foundUser) {
      alert('Қате мәліметтер енгізілді')
      return
    }

    localStorage.setItem('mockUser', JSON.stringify(foundUser))

    if (foundUser.role === 'student') {
      navigate('/student/dashboard')
    }

    if (foundUser.role === 'teacher') {
      navigate('/teacher/dashboard')
    }

    if (foundUser.role === 'admin') {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">Жүйеге кіру</h1>
          <p className="mt-2 text-sm text-gray-600">
            Рөлге сәйкес тесттік аккаунт арқылы кіріңіз
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Электрондық пошта
            </label>
            <input
              type="email"
              placeholder="Email енгізіңіз"
              {...register('email')}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Құпиясөз
            </label>
            <input
              type="password"
              placeholder="Құпиясөзді енгізіңіз"
              {...register('password')}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Рөл
            </label>
            <select
              {...register('role')}
              defaultValue="student"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            >
              <option value="student">Оқушы</option>
              <option value="teacher">Мұғалім</option>
              <option value="admin">Әкімші</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Кіру
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-yellow-50 p-4 text-sm text-gray-700">
          <p className="font-medium text-yellow-800">Тесттік аккаунттар</p>
          <div className="mt-3 space-y-2">
            <p>Оқушы: student@cyberqazaq.kz / 123456</p>
            <p>Мұғалім: teacher@cyberqazaq.kz / 123456</p>
            <p>Әкімші: admin@cyberqazaq.kz / 123456</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-green-700 transition hover:text-green-800"
          >
            ← Бас бетке оралу
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage