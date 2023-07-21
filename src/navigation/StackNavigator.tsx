import React, {useRef, useState, useEffect} from 'react'
import {StyleSheet, StatusBar, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {BingoScreen, CreateBingoScreen} from 'screens'

import {TouchableOpacity} from 'react-native-gesture-handler'
import TemporaryBoardScreen from 'components/bingo/board/TemporaryBoardScreen'
import {getToken} from 'utils/asyncStorage'
import {isLoggedAtom} from 'store'
import {useAtom} from 'utils/jotai'

import AuthNavigator from './AuthNavigator'
import SplashScreen from './SplashScreen'
import TabNavigator from './TabNavigator'

const Root = createStackNavigator()

const StackNavigator = () => {
  const navigationRef = useRef<undefined | any>()
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom)
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken()
      if (token) {
        setIsLogged(true)
      }
      setLoading(false)
    }
    checkToken()
  }, [])

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
        <Root.Screen
          name="BingoCreate"
          component={CreateBingoScreen}
          options={{
            headerShown: true,
            animationEnabled: true,
            gestureDirection: 'vertical',
            // animation: 'slide_from_bottom',
          }}
        />
        <Root.Screen
          name="BingoBoard"
          component={BingoScreen}
          options={{
            title: '',
            headerShown: true,
            animationEnabled: true,
            gestureDirection: 'vertical',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigationRef.current.navigate('BingoList')} style={{paddingHorizontal: 20}}>
                <Text>닫기</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => null,
            headerStyle: {borderBottomWidth: 0},
            // animation: 'slide_from_bottom',
          }}
        />
        <Root.Screen
          name="TemporaryBoard"
          component={TemporaryBoardScreen}
          options={{
            title: '',
            headerShown: true,
            animationEnabled: true,
            gestureDirection: 'vertical',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigationRef.current.navigate('BingoList')} style={{paddingHorizontal: 20}}>
                <Text>닫기</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => null,
            headerStyle: {borderBottomWidth: 0},
            // animation: 'slide_from_bottom',
          }}
        />
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({
  bottom_tab_image: {
    width: 24,
    height: 24,
  },
})
