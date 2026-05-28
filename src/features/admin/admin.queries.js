import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getAdminDashboard,
  getAdminSettings,
  updateAdminSettings,
} from './admin.api'

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: getAdminDashboard,
  })
}

export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: getAdminSettings,
  })
}

export function useUpdateAdminSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAdminSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] })
    },
  })
}