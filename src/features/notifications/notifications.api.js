import { apiFetch } from '@/lib/api/client'

function buildQuery(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.append(key, value)
    }
  })

  return query.toString()
}

export function getNotifications(params = {}) {
  const query = buildQuery(params)
  return apiFetch(`/notifications${query ? `?${query}` : ''}`)
}

export function markNotificationAsRead(id) {
  return apiFetch(`/notifications/${id}/read`, {
    method: 'PATCH',
  })
}

export function markAllNotificationsAsRead() {
  return apiFetch('/notifications/read-all', {
    method: 'PATCH',
  })
}

export function createBroadcastNotification(payload) {
  return apiFetch('/admin/notifications', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}