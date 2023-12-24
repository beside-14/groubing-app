import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Platform} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import {font} from 'shared/styles'
import {Images} from 'assets'
import useUserInfo from 'hooks/useUserInfo'
import {patchNickname, patchProfileImage} from './remote'
import {useRoutes} from 'hooks/useRoutes'

const MypageProfile = () => {
  const {userInfo, setUserInfo} = useUserInfo()
  const [selectedImage, setSelectedImage] = useState(null)
  const [nickname, setNickname] = useState(userInfo?.nickname)
  const disabled = (!nickname || nickname?.length < 2 || nickname === userInfo?.nickname) && selectedImage === userInfo?.profileUrl
  const {back} = useRoutes()

  const handleProfileImage = () => {
    launchImageLibrary({noData: true}, async (response: any) => {
      // console.log(response)
      if (!response.didCancel && !response.errorCode) {
        const {uri} = response.assets[0]
        console.log('uriuri', uri)
        const resizedImage = await ImageResizer.createResizedImage(uri, 200, 200, 'JPEG', 100)
        // console.log(resizedImage)
        // setSelectedImage(resizedImage.path)
        setSelectedImage(response)
      }
    })
  }

  const handleComplete = async () => {
    if (nickname !== userInfo?.nickname && selectedImage !== userInfo?.profileUrl) {
      Promise.all([patchNickname(userInfo?.id, nickname), patchProfileImage(userInfo?.id, selectedImage)]).then(res =>
        Promise.all(res.map(res => res.json()))
          .then(data => {
            console.log('nickname', data[0])
            console.log('profile', data[1])
          })
          .catch(err => {
            console.log(err)
          }),
      )
    } else if (nickname !== userInfo?.nickname) {
      const res = await patchNickname(userInfo?.id, nickname)
      if (res) {
        setUserInfo({...userInfo, nickname: nickname})
        back()
      }
      // back()
    } else if (selectedImage !== userInfo?.profileUrl) {
      const res = await patchProfileImage(userInfo?.id, selectedImage)
      console.log(res)
    }
  }

  console.log('userInfo?', userInfo)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.image_container} onPress={handleProfileImage}>
        <Image
          style={styles.profile_image}
          source={selectedImage ? {uri: selectedImage} : userInfo?.profileUrl ? userInfo?.profileUrl : Images.profile}
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
