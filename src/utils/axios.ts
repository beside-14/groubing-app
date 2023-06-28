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

export {axios}
