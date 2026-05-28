import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createQuizQuestion,
  createTeacherQuiz,
  deleteQuizQuestion,
  getQuizHistory,
  getStudentQuiz,
  startQuiz,
  submitQuiz,
  updateQuizQuestion,
  updateTeacherQuiz,
} from './quizzes.api'

export function useStudentQuiz(lessonId) {
  return useQuery({
    queryKey: ['student-quiz', lessonId],
    queryFn: () => getStudentQuiz(lessonId),
    enabled: Boolean(lessonId),
    retry: false,
  })
}

export function useQuizHistory(lessonId) {
  return useQuery({
    queryKey: ['quiz-history', lessonId],
    queryFn: () => getQuizHistory(lessonId),
    enabled: Boolean(lessonId),
  })
}

export function useStartQuiz() {
  return useMutation({
    mutationFn: startQuiz,
  })
}

export function useSubmitQuiz() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, answers }) => submitQuiz(lessonId, answers),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['student-quiz', variables.lessonId],
      })
      queryClient.invalidateQueries({
        queryKey: ['student-lessons'],
      })
      queryClient.invalidateQueries({
        queryKey: ['student-lesson', variables.lessonId],
      })
    },
  })
}

export function useCreateTeacherQuiz() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTeacherQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}

export function useUpdateTeacherQuiz() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ quizId, payload }) => updateTeacherQuiz(quizId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}

export function useCreateQuizQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ quizId, payload }) => createQuizQuestion(quizId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}

export function useUpdateQuizQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ questionId, payload }) =>
      updateQuizQuestion(questionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}

export function useDeleteQuizQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteQuizQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] })
    },
  })
}