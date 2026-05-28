import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUserRole,
  updateAdminUserStatus,
} from './users.api'

export function useAdminUsers(params) {
  return useQuery({
    queryKey: ['admin-users', params],
    queryFn: () => getAdminUsers(params),
  })
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}

export function useUpdateAdminUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, role }) => updateAdminUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}

export function useUpdateAdminUserStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }) => updateAdminUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}