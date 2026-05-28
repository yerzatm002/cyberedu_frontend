const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

let accessToken = localStorage.getItem('accessToken')
let refreshToken = localStorage.getItem('refreshToken')

export function setTokens(tokens) {
  accessToken = tokens.accessToken
  refreshToken = tokens.refreshToken

  localStorage.setItem('accessToken', tokens.accessToken)
  localStorage.setItem('refreshToken', tokens.refreshToken)
}

export function clearTokens() {
  accessToken = null
  refreshToken = null

  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export function clearAuthStorage() {
  clearTokens()
  localStorage.removeItem('user')
}

async function parseError(response) {
  const error = await response.json().catch(() => ({
    message: 'Сұраныс орындалмады',
  }))

  return error?.message || 'Сұраныс орындалмады'
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  })

  if (response.status === 401 && refreshToken) {
    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (refreshResponse.ok) {
      const data = await refreshResponse.json()

      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })

      localStorage.setItem('user', JSON.stringify(data.user))

      return apiFetch(path, options)
    }

    clearAuthStorage()
    throw new Error('Unauthorized')
  }

  if (response.status === 401) {
    clearAuthStorage()
    throw new Error('Unauthorized')
  }

  if (response.status === 403) {
    const message = await parseError(response)

    if (message === 'User account is not active') {
      clearAuthStorage()
    }

    throw new Error(message)
  }

  if (!response.ok) {
    const message = await parseError(response)
    throw new Error(message)
  }

  return response.json()
}