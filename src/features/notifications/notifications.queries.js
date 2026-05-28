import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createBroadcastNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from './notifications.api'

export function useNotifications(params = {}) {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => getNotifications(params),
  })
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useCreateBroadcastNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBroadcastNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}