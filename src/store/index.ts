import {atom} from 'utils/jotai'

export type UserInfo = {
  id: number
  email: string
  nickname: string
  profileUrl: string
  token: string
}

export const isLoggedAtom = atom(false)
export const userInfoAtom = atom<UserInfo>({
  id: 0,
  email: '',
  nickname: '',
  profileUrl: '',
  token: '',
})
export const userData = atom<UserInfo>({
  id: 0,
  email: '',
  nickname: '',
  profileUrl: '',
  token: '',
})
