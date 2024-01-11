import {Platform} from 'react-native'
import {API} from 'utils/axios'

export const patchNickname = async (id: number, nickname: string) => {
  const res = await API.patch(`/api/members/${id}/nickname`, {nickname: nickname})
  return res
}

export const patchProfileImage = async (id: number, image: string) => {
  // const fileUri = Platform.OS === 'ios' ? `file://${image}` : image
  // console.log(fileUri)
  // formData.append('file', {
  //   profile: image,
  //   // name: image,
  //   // type: Platform.OS === 'ios' ? 'image/jpeg' : 'image/jpg',
  // })
  const formData = new FormData()

  formData.append('profile', {
    name: image.assets[0].fileName,
    type: image.assets[0].type,
    uri: Platform.OS === 'ios' ? image.assets[0].uri.replace('file://', '') : image.uri,
  })

  const res = await API.patch(`/api/members/${id}/profile`, formData, {
    headers: {'Content-Type': 'multipart/form-data', Accept: 'multipart/form-data'},
  })

  return res
}
