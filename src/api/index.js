
import authService from '@/api/authService'

import axios from "axios"
import { getAuthFromLocalStorage,deleteAuthFromLocalStorage, setAuthToLocalStorage } from "@/helpers/auth"
import { ENV } from '@/config/enviroment-variables'
import router from "@/router"

const auth = getAuthFromLocalStorage()
const loginUrl = ENV.VITE_BASE_URL

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
 // Obtengo mi refresh token del localstorage y verifico si existe
 const auth = getAuthFromLocalStorage()
 const refreshToken = auth.data?.refreshtoken
  if (!refreshToken) {
    deleteAuthFromLocalStorage()
    router.replace({ name: 'login' })
    return Promise.reject("No refresh token available");
  }
  try {
    // Hago una peticion a mi servidor para que me genere un nuevo token
   const {data} = await authService.refreshToken(refreshToken)
   console.log({data});
   
   // Si el servidor me responde con un nuevo token, lo guardo en el localstorage
   if(data.token){
    setAuthToLocalStorage({
      token: data.token,
      refreshtoken: data.refreshtoken
    })
    // Actualizo headers de la petición original y reintentarlo
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
  // logica cuando el error es 401
  const originalRequest = error.config
  if (error.response?.status === 401) {
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      return handleLoginWithRefreshToken(originalRequest);
    }
     deleteAuthFromLocalStorage()
    router.replace({ name: 'login' })
  }
  return Promise.reject(error)
}

api.interceptors.response.use(handleRequestSuccess, handleRequestError)


