import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Login from "screens/auth/Login"
import Bingo from "screens/bingo/Bingo"
import {useAtomValue} from "utils/jotai"
import {isLoggedAtom} from "store"

const Auth = createStackNavigator()
const Main = createStackNavigator()
const Root = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthNavigator = () => {
  return (
    <Auth.Navigator initialRouteName="Login">
      <Auth.Screen name="Login" component={Login} />

    </Auth.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <Main.Navigator initialRouteName="Bingo">
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
  const isLogged = useAtomValue(isLoggedAtom)

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
      {isLogged ? (
        <Root.Screen name="Main" component={MainNavigator} />
      ) : (
        <Root.Screen name="Auth" component={AuthNavigator} />
      )}
      
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator