import React from 'react'
import {Image, View, StyleSheet} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {BingoListScreen, Feed, CreateBingoScreen, Mypage} from 'screens'
import {Images} from 'assets'
import {MENU} from '../menu'
import Notification from 'screens/notification'

const Tab = createBottomTabNavigator()
// const bottomAnimation = {animation: 'slide_from_bottom'}

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
        name="BingoList"
        component={BingoListScreen}
        options={{
          headerShown: false,
          tabBarLabel: '목록',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_list_focused : Images.icon_list} style={styles.bottom_tab_image} />
          },
        }}
      />
      <Tab.Screen
        name="create"
        component={() => <View></View>}
        options={{
          headerShown: false,
          tabBarLabel: '만들기',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_make_focused : Images.icon_make} style={styles.bottom_tab_image} />
          },
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault()
            navigation.navigate(MENU.BINGO_CREATE)
          },
        })}
      />
      <Tab.Screen
        name="Alarm"
        component={Notification}
        options={{
          headerShown: false,
          tabBarLabel: '알림',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_alert_focused : Images.ic_alert} style={styles.bottom_tab_image} />
          },
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
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

export default TabNavigator

const styles = StyleSheet.create({
  bottom_tab_image: {
    width: 24,
    height: 24,
  },
})
