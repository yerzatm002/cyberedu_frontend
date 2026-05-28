import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addStudentToGroup,
  createTeacherGroup,
  deleteTeacherGroup,
  getGroupStudents,
  getTeacherGroups,
  removeStudentFromGroup,
  updateTeacherGroup,
} from './groups.api'

export function useTeacherGroups(params) {
  return useQuery({
    queryKey: ['teacher-groups', params],
    queryFn: () => getTeacherGroups(params),
  })
}

export function useGroupStudents(groupId) {
  return useQuery({
    queryKey: ['group-students', groupId],
    queryFn: () => getGroupStudents(groupId),
    enabled: Boolean(groupId),
  })
}

export function useCreateTeacherGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTeacherGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-groups'] })
    },
  })
}

export function useUpdateTeacherGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => updateTeacherGroup(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-groups'] })
    },
  })
}

export function useDeleteTeacherGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTeacherGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-groups'] })
    },
  })
}

export function useAddStudentToGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ groupId, studentId }) => addStudentToGroup(groupId, studentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['group-students', variables.groupId],
      })
    },
  })
}

export function useRemoveStudentFromGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ groupId, studentId }) =>
      removeStudentFromGroup(groupId, studentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['group-students', variables.groupId],
      })
    },
  })
}