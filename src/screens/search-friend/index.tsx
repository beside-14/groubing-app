import React, {useRef, useState} from 'react'
import {View, Text, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert} from 'react-native'
import {Images} from 'assets'
import {useFriendList} from './remote'
import RBSheet from 'react-native-raw-bottom-sheet'
import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'
import Autocomplete from 'react-native-autocomplete-input'

import {API_URL} from 'api/restful'
import {requestFriends} from 'screens/feed/remote/requestFriend'

const SearchFriend = () => {
  const refRBSheet = useRef()
  const {navigate} = useRoutes()
  const {data: friends, isLoading} = useFriendList()

  const [clickedInfo, setClickedInfo] = useState<{id: number; name: string} | null>(null)

  const [query, setQuery] = useState('')

  const resetInfo = () => setClickedInfo(null)
  const openMoreModal = () => refRBSheet?.current?.open()

  const findData = (query: string) => {
    if (query === '') {
      return friends
    }

    const regex = new RegExp(`${query.trim()}`, 'i')
    return friends.filter(item => {
      return item.nickname.search(regex) >= 0
    })
  }
  const requestFriend = async (id: number) => {
    const res = await requestFriends(id)
    if (res === true) return Alert.alert('친구요청이 완료되었습니다.')

    return Alert.alert('요청이 원활하지 않습니다.')
  }

  const renderItem = ({data}) => {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <View style={{width: 36, height: 36, borderRadius: 36, overflow: 'hidden'}}>
                <Image style={{width: 36, height: 36}} source={item.profileUrl ? {uri: `${API_URL}${item.profileUrl}`} : Images.icon_profile} />
              </View>
              <Text>{item.nickname}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setClickedInfo({id: item.memberId, name: item.nickname})
                openMoreModal()
              }}>
              <Image source={Images.icon_more} style={{width: 25, height: 25}} />
            </TouchableOpacity>
          </View>
        )}
      />
    )
  }
  if (isLoading) return null
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput style={{height: '100%', width: '80%'}} placeholder="검색하세요" onChangeText={text => setQuery(text)} value={query} />
        <Image source={Images.ico_search} style={styles.search_icon} />
      </View>
      <View style={{flex: 1}}>
        <Autocomplete
          style={{flex: 1}}
          data={findData(query)}
          renderResultList={renderItem}
          listContainerStyle={{padding: 20}}
          inputContainerStyle={{borderWidth: 0}}
        />
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{width: '1000%', padding: 20}}>
          <TouchableOpacity onPress={() => requestFriend(clickedInfo?.id as number)} style={{paddingVertical: 15}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>{clickedInfo?.name}님에게 친구신청</Text>
          </TouchableOpacity>
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

    paddingHorizontal: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 99,
    height: 50,

    marginTop: 10,
  },

  search_icon: {width: 20, height: 20, marginRight: 10},
  profile: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: 'green',
  },

  row: {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10},
})
