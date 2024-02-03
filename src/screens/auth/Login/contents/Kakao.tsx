import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import {login as KakaoLogin, getProfile} from '@react-native-seoul/kakao-login'
import {Images} from 'assets'
import {useSocialTypes, fetchSocialLogin, getDeviceToken} from 'hooks/auth'
import {setToken, setUserInfo} from 'utils/asyncStorage'
import {useIsLogged} from 'hooks/useIsLogged'
import {useRoutes} from 'hooks/useRoutes'

const Kakao = () => {
  const {data} = useSocialTypes()
  const {login} = useIsLogged()
  const {navigate} = useRoutes()

  const kakaoLogin = () => {
    KakaoLogin()
      .then(result => {
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

  async function handleLogin(profile) {
    const {email, id} = profile
    getDeviceToken().then(async token => {
      const res = await fetchSocialLogin(email, data[1], id, token)

      setUserInfo(res)
      setToken(res.token)
      if (!res.hasNickname) {
        navigate('Nickname')
      } else login()
    })
  }

  const fetchKakaoProfile = () => {
    getProfile()
      .then(async result => {
        handleLogin(result)
      })
      .catch(error => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message)
      })
  }

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
