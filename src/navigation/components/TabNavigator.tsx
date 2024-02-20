import React from 'react'
import {Image, View, StyleSheet} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {BingoListScreen, Feed, Mypage} from 'screens'
import {Images} from 'assets'
import {MENU} from '../menu'
import Notification from 'screens/notification'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: '피드',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_feed_focused : Images.icon_feed} style={styles.bottom_tab_image} />
          },
        }}>
        {props => <Feed />}
      </Tab.Screen>
      <Tab.Screen
        name="BingoList"
        options={{
          headerShown: false,
          tabBarLabel: '목록',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_list_focused : Images.icon_list} style={styles.bottom_tab_image} />
          },
        }}>
        {props => <BingoListScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="create"
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
        })}>
        {props => <View></View>}
      </Tab.Screen>
      <Tab.Screen
        name="Alarm"
        options={{
          headerShown: false,
          tabBarLabel: '알림',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_alert_focused : Images.ic_alert} style={styles.bottom_tab_image} />
          },
        }}>
        {props => <Notification />}
      </Tab.Screen>
      <Tab.Screen
        name="Mypage"
        options={{
          headerShown: false,
          tabBarLabel: '마이페이지',
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? Images.icon_myPage_focused : Images.icon_myPage} style={styles.bottom_tab_image} />
          },
        }}>
        {props => <Mypage />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  bottom_tab_image: {
    width: 24,
    height: 24,
  },
})
