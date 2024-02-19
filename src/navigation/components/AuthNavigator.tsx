import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Login, FindId, FindPw, SignUp, SocialNickname} from 'screens'
import NavigatorHeader from 'components/common/NavigatorHeader'

const Auth = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <Auth.Navigator initialRouteName="Login">
      <Auth.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Auth.Screen
        name="FindId"
        component={FindId}
        options={{
          headerLeft: () => <NavigatorHeader title={'아이디 찾기'} />,
          title: '',
          headerStyle: {
            borderBottomWidth: 0, // header border 제거
            elevation: 0, // Android에서 그림자 제거
            shadowOpacity: 0, // IOS에서 그림자 제거
          },
        }}
      />
      <Auth.Screen
        name="FindPw"
        component={FindPw}
        options={{
          headerLeft: () => <NavigatorHeader title={'비밀번호 찾기'} />,
          title: '',
          headerStyle: {
            borderBottomWidth: 0, // header border 제거
            elevation: 0, // Android에서 그림자 제거
            shadowOpacity: 0, // IOS에서 그림자 제거
          },
        }}
      />
      <Auth.Screen name="SignUp" component={SignUp} options={{headerLeft: () => <NavigatorHeader title={'회원가입'} />, title: ''}} />
      <Auth.Screen name="Nickname" component={SocialNickname} options={{headerShown: false, animationEnabled: true}} />
    </Auth.Navigator>
  )
}
