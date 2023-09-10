import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'

import {font} from 'shared/styles'
import {Images} from 'assets'
import useUserInfo from 'hooks/useUserInfo'

const MypageProfile = () => {
  const {userInfo} = useUserInfo()
  const [selectedImage, setSelectedImage] = useState(null)
  const [nickname, setNickname] = useState(userInfo?.nickname)
  const disabled = !nickname || nickname?.length < 2

  const handleProfileImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      // console.log(response)
      if (!response.didCancel && !response.errorCode) {
        const {uri} = response.assets[0]
        setSelectedImage(uri)
      }
    })
  }

  const handleComplete = () => {
    Alert.alert('수정완료')
  }

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
