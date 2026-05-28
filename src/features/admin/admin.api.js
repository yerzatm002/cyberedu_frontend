import { apiFetch } from '@/lib/api/client'

export function getAdminDashboard() {
  return apiFetch('/admin/dashboard')
}

export function getAdminSettings() {
  return apiFetch('/admin/settings')
}

export function updateAdminSettings(payload) {
  return apiFetch('/admin/settings', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}