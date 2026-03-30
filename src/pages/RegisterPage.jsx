import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log('Тіркелу деректері:', data)
    alert('Бұл prototype нұсқа. Қазіргі кезеңде тіркелу mock форматында көрсетіледі.')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">Тіркелу</h1>
          <p className="mt-2 text-sm text-gray-600">
            Платформаға тіркелу үшін төмендегі мәліметтерді толтырыңыз
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Аты-жөні
            </label>
            <input
              type="text"
              placeholder="Аты-жөніңізді енгізіңіз"
              {...register('fullName')}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

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
              Рөл
            </label>
            <select
              {...register('role')}
              defaultValue="student"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            >
              <option value="student">Оқушы</option>
              <option value="teacher">Мұғалім</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Мектеп
            </label>
            <input
              type="text"
              placeholder="Мектеп атауы"
              {...register('school')}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Сынып
            </label>
            <input
              type="text"
              placeholder="Мысалы: 9А"
              {...register('className')}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Құпиясөз
            </label>
            <input
              type="password"
              placeholder="Құпиясөз енгізіңіз"
              {...register('password')}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Құпиясөзді растау
            </label>
            <input
              type="password"
              placeholder="Құпиясөзді қайта енгізіңіз"
              {...register('confirmPassword')}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-start gap-3 rounded-2xl bg-green-50 p-4">
              <input type="checkbox" {...register('agreement')} className="mt-1 h-4 w-4" />
              <span className="text-sm text-gray-700">
                Мен платформаның пайдалану шарттарымен келісемін және өз
                мәліметтерімді өңдеуге рұқсат беремін
              </span>
            </label>
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-4">
            <button
              type="submit"
              className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Тіркелу
            </button>

            <Link
              to="/login"
              className="rounded-2xl border border-green-700 px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
            >
              Кіру бетіне өту
            </Link>
          </div>
        </form>

        <div className="mt-6 rounded-2xl bg-yellow-50 p-4 text-sm text-gray-700">
          <p className="font-medium text-yellow-800">Ескерту</p>
          <p className="mt-1">
            Бұл нұсқа frontend prototype болып табылады. Қазіргі кезеңде тіркелу
            серверге жіберілмейді.
          </p>
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

export default RegisterPage