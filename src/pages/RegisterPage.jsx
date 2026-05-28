import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerUser } from '@/features/auth/auth.api'

const RegisterPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, watch } = useForm()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.user.role === 'student') navigate('/student/dashboard')
      if (data.user.role === 'teacher') navigate('/teacher/dashboard')
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Тіркелу кезінде қате пайда болды')
    },
  })

  const onSubmit = (data) => {
    setErrorMessage('')

    if (data.password !== data.confirmPassword) {
      setErrorMessage('Құпиясөздер сәйкес келмейді')
      return
    }

    registerMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">Тіркелу</h1>
          <p className="mt-2 text-sm text-gray-600">
            Платформаға тіркелу үшін негізгі мәліметтерді толтырыңыз
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Аты-жөні
            </label>
            <input
              type="text"
              placeholder="Аты-жөніңізді енгізіңіз"
              {...register('fullName', { required: true })}
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
              {...register('email', { required: true })}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Рөл
            </label>
            <select
              {...register('role', { required: true })}
              defaultValue="student"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            >
              <option value="student">Оқушы</option>
              <option value="teacher">Мұғалім</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Құпиясөз
            </label>
            <input
              type="password"
              placeholder="Құпиясөз енгізіңіз"
              {...register('password', { required: true })}
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
              {...register('confirmPassword', { required: true })}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-start gap-3 rounded-2xl bg-green-50 p-4">
              <input
                type="checkbox"
                {...register('agreement', { required: true })}
                className="mt-1 h-4 w-4"
              />
              <span className="text-sm text-gray-700">
                Мен платформаның пайдалану шарттарымен келісемін
              </span>
            </label>
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {registerMutation.isPending ? 'Тіркелу орындалуда...' : 'Тіркелу'}
            </button>

            <Link
              to="/login"
              className="rounded-2xl border border-green-700 px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
            >
              Кіру бетіне өту
            </Link>
          </div>
        </form>

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