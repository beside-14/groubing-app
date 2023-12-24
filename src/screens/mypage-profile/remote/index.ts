import {Platform} from 'react-native'
import {API} from 'utils/axios'

export const patchNickname = async (id: number, nickname: string) => {
  const res = await API.patch(`/api/members/${id}/nickname`, {nickname: nickname})
  return res
}

export const patchProfileImage = async (id: number, image: string) => {
  const formData = new FormData()
  // const fileUri = Platform.OS === 'ios' ? `file://${image}` : image
  // console.log(fileUri)
  // formData.append('file', {
  //   profile: image,
  //   // name: image,
  //   // type: Platform.OS === 'ios' ? 'image/jpeg' : 'image/jpg',
  // })

  console.log('이거', image.assets[0])
  formData.append('profile', {
    name: image.assets[0].fileName,
    type: image.assets[0].type,
    uri: Platform.OS === 'ios' ? image.assets[0].uri.replace('file://', '') : image.uri,
  })

  console.log(formData)
  // return
  const res = await API.patch(`/api/members/${id}/profile`, formData, {
    headers: {'content-type': 'multipart/form-data'},
  })
  console.log(formData)
  return res
}
