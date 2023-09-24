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
  formData.append('file', {
    uri: Platform.OS === 'ios' ? `file://${image}` : image,
    name: image,
    type: Platform.OS === 'ios' ? 'image/jpeg' : 'image/jpg',
  })

  console.log(formData)
  // return
  const res = await API.patch(`/api/members/${id}/profile`, formData, {
    headers: {'content-type': 'multipart/form-data'},
  })
  console.log(formData)
  return res
}
