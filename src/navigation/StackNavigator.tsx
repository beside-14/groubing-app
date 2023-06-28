import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Login, FindId, Bingo} from 'screens'
import {useAuth} from 'hooks/useAuth'

const Auth = createStackNavigator()
const Main = createStackNavigator()
const Root = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="FindId" component={FindId} />
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
