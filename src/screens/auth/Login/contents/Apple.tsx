import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {font} from 'shared/styles'
import {Images} from 'assets'
import appleAuth from '@invertase/react-native-apple-authentication'
import {useSocialTypes, fetchSocialLogin} from 'hooks/auth'
import {setToken, setUserInfo} from 'utils/asyncStorage'
import {useIsLogged} from 'hooks/useIsLogged'
import {useRoutes} from 'hooks/useRoutes'

const Apple = () => {
  const {data} = useSocialTypes()
  const {login} = useIsLogged()
  const {navigate} = useRoutes()

  const appleLogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })
    // console.log(appleAuthRequestResponse)
    const {email, user} = appleAuthRequestResponse
    const res = await fetchSocialLogin(email, data[0], user)
    setUserInfo(res)
    setToken(res.token)
    if (!res.hasNickname) {
      navigate('Nickname')
    } else login()
  }

  return (
    <TouchableOpacity style={styles.snsBtn} onPress={appleLogin}>
      <Image source={Images.apple_icon} />
    </TouchableOpacity>
  )
}

export default Apple

const styles = StyleSheet.create({
  snsBtn: {
    marginHorizontal: 6,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 99,
  },
})
