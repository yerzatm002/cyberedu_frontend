import { apiFetch } from '@/lib/api/client'

export function getSchools(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.append(key, value)
    }
  })

  return apiFetch(`/schools${query.toString() ? `?${query.toString()}` : ''}`)
}