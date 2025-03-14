
import authService from '@/api/authService'
import axios from "axios"
import { getAuthFromLocalStorage,deleteAuthFromLocalStorage, setAuthToLocalStorage } from "@/helpers/auth"
import { ENV } from '@/config/enviroment-variables'
import router from "@/router"

const auth = getAuthFromLocalStorage()
const loginUrl = ENV.VITE_BASE_URL
let isRenewToken = false

export const api = axios.create({
  baseURL:`${loginUrl}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: auth ? `Bearer ${auth.token}` : '',
  },
})

api.interceptors.request.use((config) => {
  const auth = getAuthFromLocalStorage()
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

const handleLoginWithRefreshToken = async (originalRequest) => {
 const auth = getAuthFromLocalStorage()
 const refreshToken = auth?.refreshToken
  if (!refreshToken) {
    deleteAuthFromLocalStorage()
    router.replace({ name: 'login' })
    return Promise.reject("No refresh token available");
  }
  try {
   const data = await authService.refreshToken(refreshToken)
   if(data.token){
    setAuthToLocalStorage({
      token: data.token,
      refreshtoken: data.refreshToken
    })
    originalRequest.headers.Authorization = `Bearer ${data.token}`
    return api(originalRequest)
    }
  } catch (error) {
     console.error("Refresh token failed:", error)
    deleteAuthFromLocalStorage()
    router.replace({ name: 'login' })
    return Promise.reject("No refresh token available");
  }

}

const handleRequestSuccess = (response) => response

const handleRequestError = (error) => {
   const originalRequest = error.config
  if (error.response?.status === 401) {
    if (originalRequest && !isRenewToken) {
        isRenewToken = true
        return handleLoginWithRefreshToken(originalRequest)
    }
  }
  return Promise.reject(error)
}

api.interceptors.response.use(handleRequestSuccess, handleRequestError)


