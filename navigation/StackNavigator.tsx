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
import FindIdScreen from "../screens/auth/FindIdScreen";
import FindPwScreen from "../screens/auth/FindPwScreen";
import NicknameScreen from "../screens/auth/NicknameScreen";
import React from "react";
import { Image, StatusBar } from "react-native";
import CreateBingo from "../screens/bingo/CreateBingo";
import {icon_feed, icon_list, icon_make, icon_alert, icon_myPage} from "assets/images"

const RootStack = createStackNavigator()
const MainStack = createStackNavigator() // 인증 관련 (로그인)
const Tab = createBottomTabNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="Bingo" component={BingoScreen} />
        <MainStack.Screen
          name="CreateBingo"
          component={CreateBingo}
          options={{
            title: "빙고만들기",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTintColor: "#000000",
            headerTitleStyle: { fontFamily: "NotoSansKR_500Medium" },
            headerShadowVisible: false,
          }}
        />
        <MainStack.Screen name="BingoFeed" component={BingoFeedScreen} />
        <MainStack.Screen name="BingoList" component={BingoListScreen} />
        <MainStack.Screen name="NotiList" component={NotiListScreen} />
        <MainStack.Screen name="MyPage" component={MyPageScreen} />
    </MainStack.Navigator>
  )
}

function StackNavigator() {
  return (
    <NavigationContainer>
      <StatusBar statusBarStyle='dart-content'/>
      <RootStack.Navigator initialRouteName="Login">
        
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="FindId" component={FindIdScreen} options={{ headerShown: false }}/>
        <RootStack.Screen name="FindPw" component={FindPwScreen} options={{ headerShown: false }}/>
        <RootStack.Screen
          name="Nickname"
          component={NicknameScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Main" component={MainStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Bingo"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          marginBottom: 15,
          color: "#222222",
        },
        tabBarActiveTintColor: "#3A8ADB",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        name="BingoFeed"
        component={BingoFeedScreen}
        options={{
          tabBarLabel: "피드",
          tabBarIcon: () => {
            return (
              <Image
                source={icon_feed}
                style={{ width: 19, height: 19 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="BingoList"
        component={BingoListScreen}
        options={{
          tabBarLabel: "목록",
          tabBarIcon: () => {
            return (
              <Image
                source={icon_list}
                style={{ width: 19, height: 19 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bingo"
        component={BingoScreen}
        options={{
          tabBarLabel: "만들기",
          tabBarIcon: () => {
            return (
              <Image
                source={icon_make}
                style={{ width: 19, height: 19 }}
              />
            );
          },
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("CreateBingo");
          },
        })}
      />
      <Tab.Screen
        name="NotiList"
        component={NotiListScreen}
        options={{
          tabBarLabel: "알림",
          tabBarIcon: () => {
            return (
              <Image
                source={icon_alert}
                style={{ width: 19, height: 19 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: () => {
            return (
              <Image
                source={icon_myPage}
                style={{ width: 19, height: 19 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default StackNavigator;
