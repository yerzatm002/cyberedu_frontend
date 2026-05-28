import { apiFetch } from '@/lib/api/client'

export function getAdminUsers(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.append(key, value)
    }
  })

  return apiFetch(`/admin/users${query.toString() ? `?${query.toString()}` : ''}`)
}

export function getAdminUser(id) {
  return apiFetch(`/admin/users/${id}`)
}

export function createAdminUser(payload) {
  return apiFetch('/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateAdminUserRole(id, role) {
  return apiFetch(`/admin/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
}

export function updateAdminUserStatus(id, status) {
  return apiFetch(`/admin/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function deleteAdminUser(id) {
  return apiFetch(`/admin/users/${id}`, {
    method: 'DELETE',
  })
}