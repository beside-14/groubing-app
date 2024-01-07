import {get, post, patch, AxiosError} from 'utils/axios'
import messaging from '@react-native-firebase/messaging'
import {useQuery} from 'utils/react-query'

const baseUrl = 'http://49.50.175.32:8080/api'
type LoginProps = {
  email: string
  password: string
  fcmToken: string
}

type SocialType = 'APPLE' | 'KAKAO'

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

export const fetchSocialLogin = async (email: string, socialType: SocialType | undefined, id: string | number, fcmToken: string) => {
  const url = `${baseUrl}/members/social-login`
  const {data} = await post(url, {email: email, socialType: socialType, id: id, fcmToken: fcmToken})
  return data
}

const fetchSocialTypes = async (): Promise<SocialType> => {
  const url = `${baseUrl}/social-types`
  const {data} = await get(url)
  return data
}

export const useSocialTypes = () => {
  return useQuery<SocialType, AxiosError>(['social-types'], () => fetchSocialTypes())
}

export const getDeviceToken = async () => {
  const token = await messaging().getToken()

  return token
}
