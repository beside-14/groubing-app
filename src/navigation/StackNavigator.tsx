import React, {useRef, useState, useEffect} from 'react'
import {StatusBar} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import {getToken, getUserInfo} from 'utils/asyncStorage'
import {isLoggedAtom} from 'store'
import {useAtom} from 'utils/jotai'

import {screens} from './screens'
import {AuthNavigator, SplashScreen, TabNavigator} from './components'
import useUserInfo from 'hooks/useUserInfo'

const Root = createStackNavigator()

const StackNavigator = () => {
  const navigationRef = useRef<undefined | any>()
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom)

  // useEffect(() => {
  //   // 로그인 여부 확인
  //   const checkToken = async () => {
  //     const token = await getToken()
  //     if (token) {
  //       initUserInfo()
  //       setIsLogged(true)
  //     }
  //     setLoading(false)
  //   }
  //   checkToken()
  // }, [])

  // useEffect(() => {
  //   // 로그인 유저 정보 확인
  //   // console.log('???', isLogged)
  //   // checkUserInfo()

  //   if (isLogged) {
  //     initUserInfo()
  //   }
  // }, [isLogged])

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      <Root.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {isLogged ? <Root.Screen name="Main" component={TabNavigator} /> : <Root.Screen name="Auth" component={AuthNavigator} />}
        {screens.map((screen, index) => (
          <Root.Screen key={index} name={screen.name} component={screen.component} options={screen.options} />
        ))}
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
