import { apiFetch } from '@/lib/api/client'

export function getTeacherGroups(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.append(key, value)
    }
  })

  return apiFetch(`/teacher/groups${query.toString() ? `?${query.toString()}` : ''}`)
}

export function getTeacherGroup(id) {
  return apiFetch(`/teacher/groups/${id}`)
}

export function createTeacherGroup(payload) {
  return apiFetch('/teacher/groups', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTeacherGroup(id, payload) {
  return apiFetch(`/teacher/groups/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteTeacherGroup(id) {
  return apiFetch(`/teacher/groups/${id}`, {
    method: 'DELETE',
  })
}

export function getGroupStudents(groupId) {
  return apiFetch(`/teacher/groups/${groupId}/students`)
}

export function addStudentToGroup(groupId, studentId) {
  return apiFetch(`/teacher/groups/${groupId}/students`, {
    method: 'POST',
    body: JSON.stringify({ studentId }),
  })
}

export function removeStudentFromGroup(groupId, studentId) {
  return apiFetch(`/teacher/groups/${groupId}/students/${studentId}`, {
    method: 'DELETE',
  })
}