import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createLessonTask,
  getStudentTask,
  getTeacherSubmissions,
  reviewSubmission,
  submitTask,
  updateTask,
} from './tasks.api'

export function useStudentTask(lessonId) {
  return useQuery({
    queryKey: ['student-task', lessonId],
    queryFn: () => getStudentTask(lessonId),
    enabled: Boolean(lessonId),
    retry: false,
  })
}

export function useSubmitTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, payload }) => submitTask(lessonId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['student-task', variables.lessonId],
      })
    },
  })
}

export function useCreateLessonTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, payload }) => createLessonTask(lessonId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, payload }) => updateTask(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}

export function useTeacherSubmissions(params = {}) {
  return useQuery({
    queryKey: ['teacher-submissions', params],
    queryFn: () => getTeacherSubmissions(params),
  })
}

export function useReviewSubmission() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ submissionId, payload }) =>
      reviewSubmission(submissionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-submissions'] })
    },
  })
}