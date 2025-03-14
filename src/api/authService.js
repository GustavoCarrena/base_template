import {api} from './index'

const authService = {
  login: async (payload) => {
    const {data} = await api.post('/login', payload)
    return data
  },

  refreshToken: async(refreshToken) => {
    const {data} = await api.post('/refresh-token', { refreshToken })
    return data
  }
}

export default authService