import { useQuery } from '@tanstack/vue-query'
import usersService from '@/api/usersService'

export const useUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getUsers(),
    enabled: true
  })
  return query
}
