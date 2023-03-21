import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BingoScreen from "../screens/bingo/BingoScreen";
import BingoFeedScreen from "../screens/bingo/BingoFeedScreen";
import BingoListScreen from "../screens/bingo/BingoListScreen";
import NotiListScreen from "../screens/info/NotiListScreen";
import MyPageScreen from "../screens/info/MyPageScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import React from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Bingo" component={BingoScreen} />
        <Stack.Screen name="BingoFeed" component={BingoFeedScreen} />
        <Stack.Screen name="BingoList" component={BingoListScreen} />
        <Stack.Screen name="NotiList" component={NotiListScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Bingo"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="BingoFeed"
        component={BingoFeedScreen}
        options={{ tabBarLabel: "피드" }}
      />
      <Tab.Screen
        name="BingoList"
        component={BingoListScreen}
        options={{ tabBarLabel: "빙고 목록" }}
      />
      <Tab.Screen
        name="Bingo"
        component={BingoScreen}
        options={{ tabBarLabel: "+빙고" }}
      />
      <Tab.Screen
        name="NotiList"
        component={NotiListScreen}
        options={{ tabBarLabel: "알림" }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ tabBarLabel: "마이" }}
      />
    </Tab.Navigator>
  );
}

export default StackNavigator;
