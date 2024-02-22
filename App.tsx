import React, {useEffect, useState} from 'react'
import StackNavigator from 'navigation/StackNavigator'
import SplashScreen from 'react-native-splash-screen'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import 'react-native-devsettings'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import PushNotification from 'react-native-push-notification'
const queryClient = new QueryClient()

import 'components/common/sheets'
import {getToken} from 'utils/asyncStorage'
import useUserInfo from 'hooks/useUserInfo'
import {useAtom} from 'jotai'
import {isLoggedAtom} from 'store'
import {Text} from 'react-native'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom)
  const {initUserInfo} = useUserInfo()

  useEffect(() => {
    // 로그인 여부 확인
    const checkToken = async () => {
      const token = await getToken()
      if (token) {
        initUserInfo()
        setIsLogged(true)
      }
      setLoading(false)
    }
    checkToken()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1500)
  }, [])

  useEffect(() => {
    PushNotification.configure({
      onAction: function (notification) {
        console.log('onAction!!!!!')
      },
      onNotification: async notification => {
        // pushEnter(notification?.data?.push_id)
        console.log('notification2323', notification)
        const notificationData = notification?.data

        if (notificationData.menu !== 'community') {
          // setMenu(notificationData.menu)
        }
        if (notificationData.menu === 'board/comment' && notificationData.category === 'B010701') {
          // 일반피드는 댓글 상세가 없습니다.
          notificationData.menu = 'board'
        }
        // Notification.navigate(navigate, notificationData as any, push)
      },
      popInitialNotification: true,
      requestPermissions: true,
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <SheetProvider> */}

        {loading ? <Text></Text> : <StackNavigator />}

        {/* </SheetProvider> */}
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

export default App
