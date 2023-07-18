import axios from 'axios'
import {LOCAL_SERVER} from 'api/restful'
import {getToken} from 'utils/asyncStorage'

const API = axios.create({
  baseURL: LOCAL_SERVER,
})

API.interceptors.request.use(
  async config => {
    const token = getToken()

    if (token) {
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
