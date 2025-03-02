import {api} from './index'

const authService = {
  login: async (payload) => {
    const response = await api.post('/login', payload)
    return response
  },

  refreshToken: async(refreshToken) => {
    const response = await api.post('/login/refresh-token', { refreshToken })
    return response
  }
}

export default authService