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

export function getStudentLessons(params = {}) {
  const query = buildQuery(params)
  return apiFetch(`/student/lessons${query ? `?${query}` : ''}`)
}

export function getStudentLesson(id) {
  return apiFetch(`/student/lessons/${id}`)
}

export function getTeacherLessons(params = {}) {
  const query = buildQuery(params)
  return apiFetch(`/teacher/lessons${query ? `?${query}` : ''}`)
}

export function getTeacherLesson(id) {
  return apiFetch(`/teacher/lessons/${id}`)
}

export function createTeacherLesson(payload) {
  return apiFetch('/teacher/lessons', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTeacherLesson(id, payload) {
  return apiFetch(`/teacher/lessons/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteTeacherLesson(id) {
  return apiFetch(`/teacher/lessons/${id}`, {
    method: 'DELETE',
  })
}