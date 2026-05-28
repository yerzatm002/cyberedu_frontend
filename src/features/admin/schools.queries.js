import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createSchool,
  deleteSchool,
  getSchools,
  updateSchool,
} from './schools.api'

export function useSchools(params) {
  return useQuery({
    queryKey: ['admin-schools', params],
    queryFn: () => getSchools(params),
  })
}

export function useCreateSchool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schools'] })
    },
  })
}

export function useUpdateSchool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => updateSchool(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schools'] })
    },
  })
}

export function useDeleteSchool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schools'] })
    },
  })
}   