import {post, patch} from 'utils/axios'
const baseUrl = 'http://49.50.175.32:8080/api'
type LoginProps = {
  email: string
  password: string
}

export const fetchEmailLogin = async (params: LoginProps) => {
  const url = `${baseUrl}/members/login`
  const {data} = await post(url, params)
  return data
}

export const fetchFindEmail = async (params: {email: string}) => {
  const url = `${baseUrl}/members/find-email`
  const {data} = await post(url, params)
  return data
}

export const fetchChangePassword = async (params: {id: number; password: string}) => {
  const url = `${baseUrl}/members/${params.id}/password`
  const {data} = await patch(url, {password: params.password})
  return data
}
