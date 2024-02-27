import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Platform} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'

import {font} from 'shared/styles'
import {Images} from 'assets'
import useUserInfo from 'hooks/useUserInfo'
import {patchNickname, patchProfileImage} from './remote'
import {useRoutes} from 'hooks/useRoutes'
import {API_URL} from 'api/restful'

const MypageProfile = () => {
  const {user, updateUserData} = useUserInfo()
  const [selectedImage, setSelectedImage] = useState(null)
  const [nickname, setNickname] = useState(user?.nickname)
  const {back} = useRoutes()

  const disabled = nickname.length < 2 || !(nickname !== user?.nickname || (selectedImage !== null && selectedImage !== user?.profileUrl))

  const handleProfileImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 1024,
        maxWidth: 1024,
        quality: 0.5,
        includeBase64: false,
      },
      async (response: any) => {
        if (!response.didCancel && !response.errorCode) {
          setSelectedImage(response)
        }
      },
    )
  }

  const handleComplete = async () => {
    if (nickname !== user?.nickname && selectedImage !== null) {
      const nameRes = await patchNickname(user?.id, nickname)

      if (nameRes) {
        const imageRes = await patchProfileImage(user?.id as number, selectedImage!)
        if (imageRes) {
          updateUserData({profileUrl: imageRes, nickname: nickname})
          Alert.alert('변경이 완료되었습니다.')
          back()
        }
      }
    } else if (nickname !== user?.nickname) {
      const res = await patchNickname(user?.id, nickname)

      if (res) {
        updateUserData({...user, nickname: nickname})
        Alert.alert('변경이 완료되었습니다.')
        back()
      }
    } else if (selectedImage !== user?.profileUrl) {
      const res = await patchProfileImage(user?.id, selectedImage!)

      updateUserData({profileUrl: res})
      Alert.alert('변경이 완료되었습니다.')
      back()
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.image_container} onPress={handleProfileImage}>
        <Image
          style={styles.profile_image}
          source={selectedImage ? {uri: selectedImage?.assets[0]?.uri} : user?.profileUrl ? {uri: `${API_URL}${user?.profileUrl}`} : Images.profile}
          resizeMode="cover"
          resizeMethod="auto"
        />
        <View style={styles.pencil_container}>
          <Image style={styles.pencil} source={Images.ico_pencil} />
        </View>
      </TouchableOpacity>
      <Text style={styles.nickname}>닉네임</Text>
      <TextInput style={styles.nickname_input} value={nickname} onChangeText={text => setNickname(text)} maxLength={7} />
      <View style={styles.nickname_info}>
        <Image style={styles.nickname_info_img} source={Images.caution_icon_gray} />
        <Text style={styles.nickname_info_text}>닉네임은 2~7자로 설정 가능합니다.</Text>
      </View>
      <TouchableOpacity disabled={disabled} style={disabled ? styles.button : [styles.button, styles.button_active]} onPress={handleComplete}>
        <Text style={styles.button_text}>수정완료</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MypageProfile

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  image_container: {flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'},
  profile_image: {width: 100, height: 100, backgroundColor: 'rgba(211, 211, 211, 0.5)', borderRadius: 100},
  pencil_container: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: '#fff',
    position: 'relative',
    left: -25,
  },
  pencil: {width: 16, height: 16},
  nickname: {...font.NotoSansKR_Regular, fontSize: 13, color: '#666', marginTop: 32, marginBottom: 2, marginLeft: 24},
  nickname_input: {
    paddingHorizontal: 4,
    paddingTop: 14,
    paddingBottom: 12,
    marginHorizontal: 20,
    marginBottom: 6,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    ...font.NotoSansKR_Regular,
    fontSize: 16,
  },
  nickname_info: {marginLeft: 20, flexDirection: 'row', alignItems: 'center'},
  nickname_info_img: {width: 17, height: 17, marginRight: 5},
  nickname_info_text: {...font.NotoSansKR_Regular, fontSize: 12, lineHeight: 15.6, color: '#a6a6a6'},
  button: {marginHorizontal: 20, marginTop: 32, paddingTop: 14, paddingBottom: 16, alignItems: 'center', borderRadius: 4, backgroundColor: '#ddd'},
  button_active: {backgroundColor: '#000'},
  button_text: {...font.NotoSansKR_Medium, fontSize: 16, color: '#fff'},
})
