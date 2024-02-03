import React, {useRef, useState} from 'react'
import {View, Text, Image, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {Images} from 'assets'
import {useFriendList} from './remote'
import RBSheet from 'react-native-raw-bottom-sheet'
import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'

const SearchFriend = () => {
  const refRBSheet = useRef()
  const {navigate} = useRoutes()
  const {data: friends} = useFriendList()
  const openMoreModal = () => refRBSheet?.current?.open()
  const [clickedInfo, setClickedInfo] = useState<{id: number; name: string} | null>(null)
  const resetInfo = () => setClickedInfo(null)
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput placeholder="닉네임으로 검색" placeholderTextColor={'#666'} />
        <Image source={Images.ico_search} style={styles.search_icon} />
      </View>
      <FlatList
        style={{padding: 20, marginTop: 20, paddingVertical: 0}}
        data={friends}
        renderItem={friend => (
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Image style={{width: 36, height: 36}} source={friend.item.profile ? friend.item.profile : Images.icon_profile} />
              <Text>{friend.item.nickname}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // console.log('friend.item.id?', friend.item.id)
                setClickedInfo({id: friend.item.memberId, name: friend.item.nickname})
                openMoreModal()
              }}>
              <Image source={Images.icon_more} style={{width: 25, height: 25}} />
            </TouchableOpacity>
          </View>
        )}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{width: '1000%', padding: 20}}>
          <TouchableOpacity
            onPress={() => {
              refRBSheet?.current?.close()
              navigate(MENU.FRIEND_BINGO_LIST, {id: clickedInfo?.id, name: clickedInfo?.name})
              resetInfo()
            }}
            style={{...styles.row, paddingVertical: 15}}>
            <Image source={Images.icon_bingo} style={{width: 25, height: 25}} />
            <Text style={{fontWeight: '500', fontSize: 18}}>빙고판 보러가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.row, paddingVertical: 15}} onPress={() => refRBSheet?.current?.close()}>
            <Image source={Images.icon_trash_black} style={{width: 25, height: 25}} />
            <Text style={{fontWeight: '500', fontSize: 18}}>친구 삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.row, paddingVertical: 15}} onPress={() => refRBSheet?.current?.close()}>
            <Image source={Images.icon_block_red} style={{width: 25, height: 25}} />
            <Text style={{fontWeight: '500', fontSize: 18, color: '#ED3241'}}>친구차단</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

export default SearchFriend

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 17,
    // paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 99,
    height: 40,
  },
  // search_text: {flex: 0.9, ...font.NotoSansKR_Regular, fontSize: 14},
  search_icon: {width: 20, height: 20, marginRight: 10},
  profile: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: 'green',
  },

  row: {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10},
})
