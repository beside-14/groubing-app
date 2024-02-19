import React, {useEffect} from 'react'
import {View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {Images} from 'assets'
import {MENU} from 'navigation/menu'
import {useRoutes} from 'hooks/useRoutes'
import useUserInfo from 'hooks/useUserInfo'
import {API_URL} from 'api/restful'
import {getUserInfo} from 'utils/asyncStorage'

type ButtonType = {name: string; icon: ImageSource; route?: string}
const BUTTONS: ButtonType[] = [
  {name: '친구 관리', icon: Images.ico_friend, route: MENU.MYPAGE_FRIEND},
  {name: '알림', icon: Images.ico_alert, route: MENU.MYPAGE_ALARM},
  {name: '약관 및 정책', icon: Images.ico_document, route: MENU.MYPAGE_TERMS},
  {name: '서비스 문의', icon: Images.ico_chat_bubble},
  {name: '버전 정보', icon: Images.ico_info},
  {name: '설정', icon: Images.ico_setting, route: MENU.MYPAGE_SETTING},
]

const Mypage = () => {
  const {navigate} = useRoutes()
  const {user} = useUserInfo()

  const handleItemClick = async (item: ButtonType) => {
    if (item.name === '서비스 문의') {
    } else if (item.name === '버전 정보') {
    } else if (item.route) {
      navigate(item.route)
    }
  }

  const handleProfile = () => {
    navigate(MENU.MYPAGE_PROFILE)
  }
  console.log('프로필 url 에', user?.profileUrl)
  // console.log('###', userInfo?.profileUrl ? {uri: `${API_URL}${userInfo?.profileUrl}`} : Images.profile)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>마이페이지</Text>
      <View style={styles.profile}>
        <View style={styles.profile_info}>
          <Image
            style={styles.profile_image}
            source={user?.profileUrl ? {uri: `${API_URL}${user?.profileUrl}`} : Images.profile}
            resizeMode="cover"
          />
          <Text style={styles.profile_text}>{user?.nickname ? user?.nickname : '닉네임'}</Text>
        </View>
        <TouchableOpacity style={styles.profile_edit} onPress={handleProfile}>
          <Text style={styles.profile_edit_text}>프로필 관리</Text>
          <Image style={styles.profile_edit_btn} source={Images.back_btn} />
        </TouchableOpacity>
      </View>
      <View style={styles.button_list}>
        {BUTTONS.map(item => (
          <TouchableOpacity key={item.name} style={styles.button} onPress={() => handleItemClick(item)}>
            <Image source={item.icon} style={styles.button_image} />
            <Text style={styles.button_text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default Mypage

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {marginTop: 24, paddingLeft: 20, fontSize: 24, ...font.NotoSansKR_Bold},
  profile: {marginTop: 40, marginBottom: 24, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  profile_info: {flexDirection: 'row', alignItems: 'center'},
  profile_image: {width: 72, height: 72, marginRight: 12, backgroundColor: 'rgba(211, 211, 211, 0.5)', borderRadius: 100},
  profile_text: {fontSize: 20, ...font.NotoSansKR_Medium},
  profile_edit: {flexDirection: 'row', alignItems: 'center'},
  profile_edit_text: {fontSize: 14, ...font.NotoSansKR_Regular},
  profile_edit_btn: {marginLeft: 1, width: 16, height: 16, transform: [{rotate: '180deg'}]},
  button_list: {flexDirection: 'row', flexWrap: 'wrap', borderTopColor: '#eaeaea', borderTopWidth: 1},
  button: {
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 13,
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  button_image: {width: 24, height: 24, marginBottom: 6},
  button_text: {fontSize: 14, ...font.NotoSansKR_Regular},
})
