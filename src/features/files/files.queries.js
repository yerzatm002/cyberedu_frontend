import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deleteLessonFile,
  uploadLessonKmj,
  uploadLessonPresentation,
} from './files.api'

export function useUploadLessonPresentation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, file }) => uploadLessonPresentation(lessonId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
      queryClient.invalidateQueries({
        queryKey: ['teacher-lesson', variables.lessonId],
      })
    },
  })
}

export function useUploadLessonKmj() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, file }) => uploadLessonKmj(lessonId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
      queryClient.invalidateQueries({
        queryKey: ['teacher-lesson', variables.lessonId],
      })
    },
  })
}

export function useDeleteLessonFile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, fileId }) => deleteLessonFile(lessonId, fileId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
      queryClient.invalidateQueries({
        queryKey: ['teacher-lesson', variables.lessonId],
      })
    },
  })
}