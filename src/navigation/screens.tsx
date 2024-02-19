import React, {ComponentType} from 'react'

import {StackNavigationOptions} from '@react-navigation/stack'

import {BingoScreen, CreateBingoScreen, MypageSetting, MypageProfile, PasswordChange, MypageFriend} from 'screens'
import {MENU} from './menu'
import NavigatorHeader from 'components/common/NavigatorHeader'
import {EditScreen} from 'screens/board/contents/EditScreen'
import {FriendBingoList} from 'screens/friend-bingo-list'
import SearchFriend from 'screens/search-friend'
import {FriendHeaderRight} from './components'
import {AlarmSetting} from 'screens/mypage-setting/\balarm'

const defaultOptions: StackNavigationOptions = {
  headerShown: true,
  animationEnabled: true,
  title: '',
  headerStyle: {
    borderBottomWidth: 0, // header border 제거
    elevation: 0, // Android에서 그림자 제거
    shadowOpacity: 0, // IOS에서 그림자 제거
  },
}

interface ScreenItemType {
  name: string
  component: ComponentType<any>
  options: StackNavigationOptions
}

export const screens: ScreenItemType[] = [
  {
    name: MENU.FRIEND_BINGO_LIST,
    component: FriendBingoList,
    options: {
      ...defaultOptions,

      headerLeft: () => <NavigatorHeader title={''} />,
    },
  },
  {
    name: MENU.BINGO_CREATE,
    component: CreateBingoScreen,
    options: {
      ...defaultOptions,

      headerLeft: () => <NavigatorHeader title={'빙고 만들기'} />,
    },
  },
  {
    name: MENU.BINGO_BOARD,
    component: BingoScreen,
    options: {
      ...defaultOptions,
      headerShown: false,
    },
  },
  {
    name: MENU.MYPAGE_SETTING,
    component: MypageSetting,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'설정'} />,
    },
  },
  {
    name: MENU.BINGO_EDIT,
    component: EditScreen,
    options: {
      ...defaultOptions,
    },
  },
  {
    name: MENU.PASSWORD_CHANGE,
    component: PasswordChange,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'비밀번호 변경'} />,
    },
  },
  {
    name: MENU.MYPAGE_PROFILE,
    component: MypageProfile,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'프로필 관리'} />,
    },
  },
  {
    name: MENU.MYPAGE_FRIEND,
    component: MypageFriend,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'친구 관리'} />,
      headerRight: () => <FriendHeaderRight />,
    },
  },
  {
    name: MENU.SEARCH_FRIEND,
    component: SearchFriend,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'친구 관리'} />,
    },
  },
  {
    name: MENU.MYPAGE_ALARM,
    component: AlarmSetting,
    options: {
      ...defaultOptions,
      headerLeft: () => <NavigatorHeader title={'알림 설정'} />,
    },
  },
  // 여기에 추가 스크린 정보를 추가합니다.
]
