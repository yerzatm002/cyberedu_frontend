import { useQuery } from '@tanstack/react-query'
import {
  getStudentProgress,
  getTeacherGroupProgress,
  getTeacherProgress,
  getTeacherStudentProgress,
} from './progress.api'

export function useStudentProgress(params = {}) {
  return useQuery({
    queryKey: ['student-progress', params],
    queryFn: () => getStudentProgress(params),
  })
}

export function useTeacherProgress(params = {}) {
  return useQuery({
    queryKey: ['teacher-progress', params],
    queryFn: () => getTeacherProgress(params),
  })
}

export function useTeacherGroupProgress(groupId, params = {}) {
  return useQuery({
    queryKey: ['teacher-group-progress', groupId, params],
    queryFn: () => getTeacherGroupProgress(groupId, params),
    enabled: Boolean(groupId),
  })
}

export function useTeacherStudentProgress(studentId, params = {}) {
  return useQuery({
    queryKey: ['teacher-student-progress', studentId, params],
    queryFn: () => getTeacherStudentProgress(studentId, params),
    enabled: Boolean(studentId),
  })
}