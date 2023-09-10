declare type LooseObject = {
  [key: string]: any
}

declare type ImageSource = ReturnType<typeof require>

declare type UserInfoType = {
  email: string
  id: number
  profileUrl: string | null
  token: string
  nickname: string
} | null
