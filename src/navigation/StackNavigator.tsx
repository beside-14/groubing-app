import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Login, FindId, FindPw, SignUp, Bingo} from 'screens'
import {useAuth} from 'hooks/useAuth'
import BingoScreen from 'screens/board/BingoScreen'
import NavigatorHeader from 'components/common/NavigatorHeader'

const Auth = createStackNavigator()
const Main = createStackNavigator()
const Root = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Auth.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Auth.Screen name="FindId" component={FindId} options={{headerLeft: () => <NavigatorHeader title={'아이디 찾기'} />, title: ''}} />
      <Auth.Screen name="FindPw" component={FindPw} options={{headerLeft: () => <NavigatorHeader title={'비밀번호 찾기'} />, title: ''}} />
      <Auth.Screen name="SignUp" component={SignUp} options={{headerLeft: () => <NavigatorHeader title={'회원가입'} />, title: ''}} />
    </Auth.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <Main.Navigator
      initialRouteName="Bingo"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Main.Screen name="Bingo" component={Bingo} />
    </Main.Navigator>
  )
}

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator initialRouteName="Home">

//     </Tab.Navigator>
//   )
// }

const StackNavigator = () => {
  const {isLogged} = useAuth()

  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {isLogged ? <Root.Screen name="Main" component={MainNavigator} /> : <Root.Screen name="Auth" component={AuthNavigator} />}
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
