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

export function getStudentCertificate(params = {}) {
  const query = buildQuery(params)
  return apiFetch(`/student/certificate${query ? `?${query}` : ''}`)
}

export function generateStudentCertificate(params = {}) {
  const query = buildQuery(params)

  return apiFetch(`/student/certificate/generate${query ? `?${query}` : ''}`, {
    method: 'POST',
  })
}