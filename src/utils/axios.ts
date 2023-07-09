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
      'eyJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJJZCI6MSwiZW1haWwiOiJob2xlbWFuNzlAbmF2ZXIuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTY4OTE2OTYwMSwiZXhwIjoxNjg5MTkxMjAxfQ.cWCUBgwTsVNS03C4F0MC-vzm3dD-JLEBcsFccbr1PD-fowY_jt8xLa8OfXBzuiLauFZm-nPBCjF1j0yZqfR_QQ'
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

export {axios}
