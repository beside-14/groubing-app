import {SectionList} from 'react-native'
import React, {useRef} from 'react'
import {StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, Alert} from 'react-native'

import {View} from 'react-native'

import {Images} from 'assets'
import RBSheet from 'react-native-raw-bottom-sheet'

import useUserInfo from 'hooks/useUserInfo'
import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'

import {useFeeds} from '../remote/useFeeds'
import {requestFriends} from '../remote/requestFriend'
import {API_URL} from 'api/restful'

const List = ({title, isLast}: {title: string; isLast: boolean}) => {
  return (
    <View
      style={{paddingHorizontal: 20, paddingVertical: 4, borderBottomWidth: isLast ? 6 : 0, paddingBottom: isLast ? 20 : 4, borderColor: '#F3F3F3'}}>
      <View style={styles.row}>
        <Image source={Images.ico_check} style={{width: 30, height: 30}} />
        {/* <View style={styles.profileimg} /> */}
        <Text style={{fontWeight: '500', fontSize: 16}}>{title}</Text>
      </View>
    </View>
  )
}

const Header = ({name, id, profile, isfriend}) => {
  const refRBSheet = useRef()
  const openMoreModal = () => refRBSheet?.current?.open()
  const {userInfo} = useUserInfo()

  const {navigate} = useRoutes()
  const me = userInfo?.id === id

  const requestFriend = async (id: number) => {
    const res = await requestFriends(id)
    if (res === true) return Alert.alert('친구요청이 완료되었습니다.')

    return Alert.alert('요청이 원활하지 않습니다.')
  }

  return (
    <View style={styles.block}>
      <View style={{...styles.row, justifyContent: 'space-between'}}>
        <View style={styles.row}>
          <TouchableOpacity disabled={me} onPress={() => navigate(MENU.FRIEND_BINGO_LIST, {id, name})}>
            <Image style={{width: 36, height: 36, borderRadius: 50}} source={profile ? {uri: `${API_URL}${profile}`} : Images.icon_profile} />
          </TouchableOpacity>

          <Text style={{fontWeight: '500', fontSize: 16}}>{name}</Text>
        </View>

        {me || isfriend ? null : (
          <TouchableOpacity onPress={() => openMoreModal()}>
            <Image source={Images.icon_more} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        )}
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {borderTopLeftRadius: 20, borderTopRightRadius: 20},
        }}>
        <View style={{width: '1000%', padding: 20}}>
          <TouchableOpacity onPress={() => requestFriend(id)} style={{paddingVertical: 15}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>{name}님에게 친구신청</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{paddingVertical: 15}} onPress={() => refRBSheet?.current?.close()}>
            <Text style={{fontWeight: '700', fontSize: 18}}>취소</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

export const ListView = ({type}: {type: 'friend' | 'all'}) => {
  const {data: feeds} = useFeeds(type)
  if (!feeds) return null
  return (
    <SectionList
      style={{}}
      sections={feeds}
      keyExtractor={(item, index) => item + index}
      renderItem={({item: {title}, index, section}) => <List title={title} index={index} isLast={section.data.length - 1 === index} />}
      renderSectionHeader={({
        section: {
          title: {name, id, profile},
        },
      }) => <Header name={name} id={id} profile={profile} isfriend={type === 'friend'} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8},
  profileimg: {width: 36, height: 36, backgroundColor: 'pink', borderRadius: 50},
  username: {fontWeight: '500', fontSize: 16},
  block: {padding: 20, backgroundColor: 'white'},
})
