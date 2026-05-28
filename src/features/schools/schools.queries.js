import { useQuery } from '@tanstack/react-query'
import { getSchools } from './schools.api'

export function usePublicSchools(params) {
  return useQuery({
    queryKey: ['schools', params],
    queryFn: () => getSchools(params),
  })
}