import axios from 'axios'
import {API_URL} from 'api/restful'
import {getToken} from 'utils/asyncStorage'

axios.defaults.withCredentials = true
export const API = axios.create({
  baseURL: API_URL,
})
// axios.defaults.withCredentials = true
API.interceptors.request.use(
  async config => {
    const token = await getToken()

    if (token) {
      config.withCredentials = true
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

const get = async (url: string, params?: Record<string, unknown>) => {
  const {data} = await axios.get(url, {params})
  return data
}

const post = async (url: string, params: Record<string, unknown>): Promise<any> => {
  const {data} = await axios.post(url, params)
  return data
}

const patch = async (url: string, params: Record<string, unknown>): Promise<any> => {
  const {data} = await axios.patch(url, params)
  return data
}

export {axios, get, post, patch}
