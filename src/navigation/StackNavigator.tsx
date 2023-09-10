import React, {useRef, useState, useEffect, ComponentType} from 'react'
import {StyleSheet, StatusBar} from 'react-native'
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {BingoScreen, CreateBingoScreen, MypageSetting, MypageProfile, PasswordChange, MypageFriend} from 'screens'

import {getToken, getUserInfo} from 'utils/asyncStorage'
import {isLoggedAtom} from 'store'
import {useAtom} from 'utils/jotai'

import AuthNavigator from './components/AuthNavigator'
import SplashScreen from './components/SplashScreen'
import TabNavigator from './components/TabNavigator'
import {MENU} from './menu'
import NavigatorHeader from 'components/common/NavigatorHeader'
import useUserInfo from 'hooks/useUserInfo'

interface ScreenItemType {
  name: string
  component: ComponentType<any>
  options: StackNavigationOptions
}

const defaultOptions: StackNavigationOptions = {
  headerShown: true,
  animationEnabled: true,
  title: '',
  headerStyle: {
    borderBottomWidth: 0, // header border 제거
    elevation: 0, // Android에서 그림자 제거
    shadowOpacity: 0, // IOS에서 그림자 제거
  },
}

const screens: ScreenItemType[] = [
  {
    name: MENU.BINGO_CREATE,
    component: CreateBingoScreen,
    options: {
      ...defaultOptions,
      gestureDirection: 'vertical',
    },
  },
  {
    name: MENU.BINGO_BOARD,
    component: BingoScreen,
    options: {
      ...defaultOptions,
      headerShown: false,
      gestureDirection: 'vertical',
    },
  },
  {
    name: MENU.MYPAGE_SETTING,
    component: MypageSetting,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'설정'} />,
    },
  },
  {
    name: MENU.BINGO_EDIT,
    component: EditScreen,
    options: {
      ...defaultOptions,
      // headerLeft: () => <NavigatorHeader title={'설정'} />,
    },
  },
  {
    name: MENU.PASSWORD_CHANGE,
    component: PasswordChange,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'비밀번호 변경'} />,
    },
  },
  {
    name: MENU.MYPAGE_PROFILE,
    component: MypageProfile,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'프로필 관리'} />,
    },
  },
  {
    name: MENU.MYPAGE_FRIEND,
    component: MypageFriend,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'친구 관리'} />,
      headerRight: () => <FriendHeaderRight />,
    },
  },
  // 여기에 추가 스크린 정보를 추가합니다.
]

import {EditScreen} from 'screens/board/contents/EditScreen'
import FriendHeaderRight from './components/FriendHeaderRight'

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
      setUserInfo(user)
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

const styles = StyleSheet.create({
  bottom_tab_image: {
    width: 24,
    height: 24,
  },
})
