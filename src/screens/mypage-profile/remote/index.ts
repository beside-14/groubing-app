import {Platform} from 'react-native'

import {API, axios} from 'utils/axios'
import RNFetchBlob, {ReactNativeBlobUtil} from 'react-native-blob-util'
import {getToken} from 'utils/asyncStorage'

export const patchNickname = async (id: number, nickname: string) => {
  const res = await API.patch(`/api/members/${id}/nickname`, {nickname: nickname})
  return res
}

export const patchProfileImage = async (id: number, image: string) => {
  const formData = new FormData()
  // const resp = await fetch(image.assets[0].uri)
  // const blob = await resp.blob()
  // console.log(' image.assets>>>>', image.assets)
  // console.log(fileUri)
  formData.append('profile', {
    name: image.assets[0].fileName,
    type: image.assets[0].type,
    uri: Platform.OS === 'ios' ? image.assets[0].uri.replace('file://', '') : image.uri,
  })

  // formData.append('profile', blob)

  const res = await API.patch(`/api/members/${id}/profile`, formData, {
    headers: {'Content-Type': 'multipart/form-data', Accept: 'multipart/form-data'},
  })
  return res
}
