import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTeacherLesson,
  deleteTeacherLesson,
  getStudentLesson,
  getStudentLessons,
  getTeacherLesson,
  getTeacherLessons,
  updateTeacherLesson,
} from './lessons.api'

export function useStudentLessons(params = {}) {
  return useQuery({
    queryKey: ['student-lessons', params],
    queryFn: () => getStudentLessons(params),
  })
}

export function useStudentLesson(id) {
  return useQuery({
    queryKey: ['student-lesson', id],
    queryFn: () => getStudentLesson(id),
    enabled: Boolean(id),
    retry: false,
  })
}

export function useTeacherLessons(params = {}) {
  return useQuery({
    queryKey: ['teacher-lessons', params],
    queryFn: () => getTeacherLessons(params),
  })
}

export function useTeacherLesson(id) {
  return useQuery({
    queryKey: ['teacher-lesson', id],
    queryFn: () => getTeacherLesson(id),
    enabled: Boolean(id),
  })
}

export function useCreateTeacherLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTeacherLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}

export function useUpdateTeacherLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => updateTeacherLesson(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
      queryClient.invalidateQueries({
        queryKey: ['teacher-lesson', variables.id],
      })
    },
  })
}

export function useDeleteTeacherLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTeacherLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}