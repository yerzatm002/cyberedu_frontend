import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  generateStudentCertificate,
  getStudentCertificate,
} from './certificates.api'

export function useStudentCertificate(params = {}) {
  return useQuery({
    queryKey: ['student-certificate', params],
    queryFn: () => getStudentCertificate(params),
  })
}

export function useGenerateStudentCertificate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: generateStudentCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-certificate'] })
      queryClient.invalidateQueries({ queryKey: ['student-progress'] })
    },
  })
}