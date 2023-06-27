import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Login from "../screens/auth/Login"

const Auth = createStackNavigator()
const Main = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthNavigator = () => {
  return (
    <Auth.Navigator initialRouteName="Login">
      <Auth.Screen name="Login" component={Login} />

    </Auth.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="">
      {/* <Tab.Screen name="" /> */}
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Main.Navigator initialRouteName="Auth">
        <Main.Screen name="Auth" component={AuthNavigator} />
        <Main.Screen name="Home" component={TabNavigator} />
      </Main.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator