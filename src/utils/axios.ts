import axios from 'axios'
import {LOCAL_SERVER} from 'api/restful'
import {getToken} from 'utils/asyncStorage'

axios.defaults.withCredentials = true
export const API = axios.create({
  baseURL: LOCAL_SERVER,
})
// axios.defaults.withCredentials = true
API.interceptors.request.use(
  async config => {
    // const token = getToken()
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJJZCI6MywiZW1haWwiOiJhd2FqaTA4MjlAZ21haWwuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTY4OTI1MjU5MiwiZXhwIjoxNjg5Mjc0MTkyfQ.mXQQ3sHQxy-UyYLE4h7VBh6qiulF8oB84I3POSNc_Lca-gXfIPPrRGVMuKswViUKkO2Kjv0ResdWjWxdLSb8rg'
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
