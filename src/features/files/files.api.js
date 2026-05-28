import { apiFetch } from '@/lib/api/client'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function getToken() {
  return localStorage.getItem('accessToken')
}

async function uploadFile(path, file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Файл жүктеу кезінде қате пайда болды',
    }))

    throw new Error(error.message || 'Файл жүктеу кезінде қате пайда болды')
  }

  return response.json()
}

export function uploadLessonPresentation(lessonId, file) {
  return uploadFile(`/teacher/lessons/${lessonId}/files/presentation`, file)
}

export function uploadLessonKmj(lessonId, file) {
  return uploadFile(`/teacher/lessons/${lessonId}/files/kmj`, file)
}

export function deleteLessonFile(lessonId, fileId) {
  return apiFetch(`/teacher/lessons/${lessonId}/files/${fileId}`, {
    method: 'DELETE',
  })
}

export function getFile(fileId) {
  return apiFetch(`/files/${fileId}`)
}