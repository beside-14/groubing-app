import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native'

import {Images} from 'assets'
import appleAuth from '@invertase/react-native-apple-authentication'
import {useSocialTypes, fetchSocialLogin, getDeviceToken} from 'hooks/auth'
import {setToken, setUserInfo} from 'utils/asyncStorage'
import {useIsLogged} from 'hooks/useIsLogged'
import {useRoutes} from 'hooks/useRoutes'
import useUserInfo from 'hooks/useUserInfo'

const Apple = () => {
  const {data} = useSocialTypes()
  const {login} = useIsLogged()
  const {navigate} = useRoutes()
  const {updateUserData} = useUserInfo()

  async function handleLogin(profile) {
    const {email, id} = profile
    getDeviceToken().then(async token => {
      const res = await fetchSocialLogin(email, data[1], id, token)
      setUserInfo(res)
      updateUserData({...res, id: id, email: email})
      setToken(res.token)
      if (!res.hasNickanme) {
        navigate('Nickname')
      } else login()
    })
  }

  const appleLogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    handleLogin(appleAuthRequestResponse)
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
