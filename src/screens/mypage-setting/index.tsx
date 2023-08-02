import React, {useState} from 'react'
import {SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {Images} from 'assets'
import CustomModal from 'components/common/CustomModal'
import {useIsLogged} from 'hooks/useIsLogged'
import {useRoutes} from 'hooks/useRoutes'

type ListItemName = '비밀번호 변경' | '로그아웃' | '회원탈퇴'
type ListItemType = {
  name: ListItemName
  icon: ImageSource
  button: ImageSource
  color?: string
}
const LIST: ListItemType[] = [
  {name: '비밀번호 변경', icon: Images.ico_lock, button: Images.back_btn},
  {name: '로그아웃', icon: Images.ico_logout, button: Images.back_btn},
  {name: '회원탈퇴', icon: Images.ico_account_delete, button: Images.back_btn_red, color: 'red'},
]

const MypageSetting = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const {logout} = useIsLogged()
  const {back} = useRoutes()

  const handleItemClick = (name: ListItemName) => {
    if (name === '비밀번호 변경') {
    } else if (name === '로그아웃') {
      setModalVisible(true)
    } else if (name === '회원탈퇴') {
    }
  }

  const handleModalHide = () => {
    setModalVisible(false)
  }

  const handleModalCompletePress = () => {
    try {
      logout()
      back()
      // TODO: 로그아웃 완료 toast
    } catch (error) {
      handleModalHide()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {LIST.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item} onPress={() => handleItemClick(item.name)}>
          <View style={styles.item_left}>
            <Image source={item.icon} style={styles.item_left_image} />
            <Text style={[item.color === 'red' && styles.text_red, styles.item_left_text]}>{item.name}</Text>
          </View>
          <Image source={item.button} style={[item.color !== 'red' && styles.rotate, styles.button]} />
        </TouchableOpacity>
      ))}
      <CustomModal
        visible={modalVisible}
        onRequestClose={handleModalHide}
        style={styles.modal_container}
        title={'로그아웃'}
        content={'로그아웃하면 그룹 빙고와\n친구 요청 메시지 알림을 받을 수 없습니다.\n정말 로그아웃 하시겠습니까?'}
        cancel_text={'취소'}
        complete_text={'로그아웃'}
        onCompletePress={handleModalCompletePress}
      />
    </SafeAreaView>
  )
}

export default MypageSetting

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingTop: 28},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item_left: {flexDirection: 'row', height: 44, alignItems: 'center'},
  item_left_image: {width: 24, height: 24, marginRight: 10},
  item_left_text: {
    ...font.NotoSansKR_Regular,
    fontSize: 16,
  },
  rotate: {transform: [{rotate: '180deg'}]},
  text_red: {color: '#ff3c3c'},
  button: {width: 24, height: 24},
  modal_container: {paddingTop: 32, paddingHorizontal: 24},
})
