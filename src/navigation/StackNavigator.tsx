import React, {useRef, useState, useEffect} from 'react'
import {StatusBar} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import {getToken, getUserInfo} from 'utils/asyncStorage'
import {isLoggedAtom} from 'store'
import {useAtom} from 'utils/jotai'

import AuthNavigator from './components/AuthNavigator'
import SplashScreen from './components/SplashScreen'
import TabNavigator from './components/TabNavigator'
import useUserInfo from 'hooks/useUserInfo'

import {screens} from './screens'

const Root = createStackNavigator()

const StackNavigator = () => {
  const navigationRef = useRef<undefined | any>()
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom)
  const {setUserInfo} = useUserInfo()

  useEffect(() => {
    // 로그인 여부 확인
    const checkToken = async () => {
      const token = await getToken()
      if (token) {
        setIsLogged(true)
      }
      setLoading(false)
    }
    checkToken()
  }, [isLogged])

  useEffect(() => {
    // 로그인 유저 정보 확인
    const checkUserInfo = async () => {
      const user = await getUserInfo()
      const token = await getToken()
      setUserInfo({...user, token: `Bearer ${token}`})
    }
    checkUserInfo()
  }, [isLogged])

  return loading ? (
    <SplashScreen />
  ) : (
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
