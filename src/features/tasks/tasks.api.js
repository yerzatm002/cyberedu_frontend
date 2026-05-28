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

export function getStudentTask(lessonId) {
  return apiFetch(`/student/tasks/${lessonId}`)
}

export function submitTask(lessonId, payload) {
  return apiFetch(`/student/tasks/${lessonId}/submission`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createLessonTask(lessonId, payload) {
  return apiFetch(`/teacher/lessons/${lessonId}/task`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTask(taskId, payload) {
  return apiFetch(`/teacher/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function getTeacherSubmissions(params = {}) {
  const query = buildQuery(params)
  return apiFetch(`/teacher/submissions${query ? `?${query}` : ''}`)
}

export function reviewSubmission(submissionId, payload) {
  return apiFetch(`/teacher/submissions/${submissionId}/review`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}