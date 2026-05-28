import { apiFetch } from '@/lib/api/client'

export function getSchools(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.append(key, value)
    }
  })

  return apiFetch(`/admin/schools${query.toString() ? `?${query.toString()}` : ''}`)
}

export function createSchool(payload) {
  return apiFetch('/admin/schools', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateSchool(id, payload) {
  return apiFetch(`/admin/schools/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteSchool(id) {
  return apiFetch(`/admin/schools/${id}`, {
    method: 'DELETE',
  })
}