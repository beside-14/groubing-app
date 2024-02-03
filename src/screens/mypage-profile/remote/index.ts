import {Platform} from 'react-native'

import {API} from 'utils/axios'

export const patchNickname = async (id: number, nickname: string) => {
  const res = await API.patch(`/api/members/${id}/nickname`, {nickname: nickname})
  return res
}

export const patchProfileImage = async (id: number, image: string, header: any) => {
  const formData = new FormData()

  const photo = {
    name: image.assets[0].fileName,
    type: image.assets[0].type,
    uri: Platform.OS === 'ios' ? image.assets[0].uri.replace('file://', '') : image.uri,
  }
  formData.append('profile', photo)

  const res = await API.patch(`/api/members/${id}/profile`, formData, {
    headers: header,
  })
  return res
}
