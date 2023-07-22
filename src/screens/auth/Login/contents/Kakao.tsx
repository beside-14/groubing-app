import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import {login, getProfile} from '@react-native-seoul/kakao-login'
import {Images} from 'assets'

const kakaoLogin = () => {
  login()
    .then(result => {
      console.log('Login Success', JSON.stringify(result))
      fetchKakaoProfile()
    })
    .catch(error => {
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log('Login Cancel', error.message)
      } else {
        console.log(`Login Fail(code:${error.code})`, error.message)
      }
    })
}
const fetchKakaoProfile = () => {
  getProfile()
    .then(result => {
      console.log('GetProfile Success', JSON.stringify(result))
    })
    .catch(error => {
      console.log(`GetProfile Fail(code:${error.code})`, error.message)
    })
}

const Kakao = () => {
  return (
    <TouchableOpacity style={styles.snsBtn} onPress={kakaoLogin}>
      <Image source={Images.kakao_icon} />
    </TouchableOpacity>
  )
}

export default Kakao

const styles = StyleSheet.create({
  snsBtn: {
    marginHorizontal: 6,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 99,
  },
})
