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

export function getStudentProgress(params = {}) {
  const query = buildQuery(params)
  return apiFetch(`/student/progress${query ? `?${query}` : ''}`)
}

export function getTeacherProgress(params = {}) {
  const query = buildQuery(params)
  return apiFetch(`/teacher/progress${query ? `?${query}` : ''}`)
}

export function getTeacherGroupProgress(groupId, params = {}) {
  const query = buildQuery(params)

  return apiFetch(
    `/teacher/progress/group/${groupId}${query ? `?${query}` : ''}`,
  )
}

export function getTeacherStudentProgress(studentId, params = {}) {
  const query = buildQuery(params)

  return apiFetch(
    `/teacher/progress/student/${studentId}${query ? `?${query}` : ''}`,
  )
}