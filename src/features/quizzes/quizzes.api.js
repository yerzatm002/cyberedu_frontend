import { apiFetch } from '@/lib/api/client'

export function getStudentQuiz(lessonId) {
  return apiFetch(`/student/quizzes/${lessonId}`)
}

export function startQuiz(lessonId) {
  return apiFetch(`/student/quizzes/${lessonId}/start`, {
    method: 'POST',
  })
}

export function submitQuiz(lessonId, answers) {
  return apiFetch(`/student/quizzes/${lessonId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  })
}

export function getQuizHistory(lessonId) {
  return apiFetch(`/student/quizzes/${lessonId}/history`)
}

export function createTeacherQuiz(payload) {
  return apiFetch('/teacher/quizzes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTeacherQuiz(quizId, payload) {
  return apiFetch(`/teacher/quizzes/${quizId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function createQuizQuestion(quizId, payload) {
  return apiFetch(`/teacher/quizzes/${quizId}/questions`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateQuizQuestion(questionId, payload) {
  return apiFetch(`/teacher/questions/${questionId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteQuizQuestion(questionId) {
  return apiFetch(`/teacher/questions/${questionId}`, {
    method: 'DELETE',
  })
}