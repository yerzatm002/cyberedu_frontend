import { apiFetch, clearAuthStorage, setTokens } from '@/lib/api/client'

export async function login(payload) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  })

  localStorage.setItem('user', JSON.stringify(data.user))

  return data
}

export async function register(payload) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  })

  localStorage.setItem('user', JSON.stringify(data.user))

  return data
}

export async function getMe() {
  return apiFetch('/auth/me')
}

export async function logout() {
  const refreshToken = localStorage.getItem('refreshToken')

  if (refreshToken) {
    await apiFetch('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  clearAuthStorage()
}

export async function forgotPassword(payload) {
  return apiFetch('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function resetPassword(payload) {
  return apiFetch('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}