import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '@/features/auth/auth.api'

const LoginPage = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.user.role === 'student') navigate('/student/dashboard')
      if (data.user.role === 'teacher') navigate('/teacher/dashboard')
      if (data.user.role === 'admin') navigate('/admin/dashboard')
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Кіру кезінде қате пайда болды')
    },
  })

  const onSubmit = (data) => {
    setErrorMessage('')

    loginMutation.mutate({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800">Жүйеге кіру</h1>
          <p className="mt-2 text-sm text-gray-600">
            Платформаға кіру үшін email және құпиясөз енгізіңіз
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Электрондық пошта
            </label>
            <input
              type="email"
              placeholder="student@cyberqazaq.kz"
              {...register('email', { required: true })}
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
              {...register('password', { required: true })}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-2xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {loginMutation.isPending ? 'Кіру орындалуда...' : 'Кіру'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-sm font-medium text-green-700 transition hover:text-green-800"
          >
            Аккаунтыңыз жоқ па? Тіркелу
          </Link>
        </div>

        <div className="mt-4 text-center">
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