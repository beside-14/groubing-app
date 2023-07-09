import React from 'react'
import {Image, StyleSheet, StatusBar} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Login, FindId, FindPw, SignUp, Bingo, BingoScreen, Feed} from 'screens'
import {useAuth} from 'hooks/useAuth'
import NavigatorHeader from 'components/common/NavigatorHeader'
import {Images} from 'assets'

const Auth = createStackNavigator()
const Root = createStackNavigator()
const Tab = createBottomTabNavigator()
// 인증화면 (Auth)
const AuthNavigator = () => {
  return (
    <Auth.Navigator initialRouteName="Login">
      <Auth.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Auth.Screen name="FindId" component={FindId} options={{headerLeft: () => <NavigatorHeader title={'아이디 찾기'} />, title: ''}} />
      <Auth.Screen name="FindPw" component={FindPw} options={{headerLeft: () => <NavigatorHeader title={'비밀번호 찾기'} />, title: ''}} />
      <Auth.Screen name="SignUp" component={SignUp} options={{headerLeft: () => <NavigatorHeader title={'회원가입'} />, title: ''}} />
    </Auth.Navigator>
  )
}
// 바텀탭 (Main)
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          headerShown: false,
          tabBarLabel: '피드',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_feed_focused : Images.icon_feed} style={styles.bottom_tab_image} />
          },
        }}
      />
      <Tab.Screen
        name="Bingo"
        component={BingoScreen}
        options={{
          headerShown: false,
          tabBarLabel: '목록',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_list_focused : Images.icon_list} style={styles.bottom_tab_image} />
          },
        }}
      />
      <Tab.Screen
        name="BingoCreate"
        component={Bingo}
        options={{
          headerShown: false,
          tabBarLabel: '만들기',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_make_focused : Images.icon_make} style={styles.bottom_tab_image} />
          },
        }}
      />
      <Tab.Screen
        name="Alarm"
        component={Bingo}
        options={{
          headerShown: false,
          tabBarLabel: '알림',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_alert_focused : Images.ic_alert} style={styles.bottom_tab_image} />
          },
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={Bingo}
        options={{
          headerShown: false,
          tabBarLabel: '마이페이지',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_myPage_focused : Images.icon_myPage} style={styles.bottom_tab_image} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  const {isLogged} = useAuth()

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Root.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {isLogged ? <Root.Screen name="Main" component={TabNavigator} /> : <Root.Screen name="Auth" component={AuthNavigator} />}
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
