import { useMutation } from '@tanstack/vue-query'
import authService from '../api/authService'

export const useLogin = () => {
  const query = useMutation({
    mutationKey: ['login'],
    mutationFn: (payload) => authService.login(payload),
  })
  return query
}
