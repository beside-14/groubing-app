import React, {useRef, useState} from 'react'
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native'
import {Images} from 'assets'
import {useFriendList} from './remote'
import RBSheet from 'react-native-raw-bottom-sheet'
import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'
import Autocomplete from 'react-native-autocomplete-input'

const MypageFriend = () => {
  const refRBSheet: any = useRef()
  const {navigate} = useRoutes()

  const [query, setQuery] = useState('')
  const [clickedInfo, setClickedInfo] = useState<{id: number; name: string} | null>(null)

  const {data: friends, isLoading} = useFriendList('친구')
  const openMoreModal = () => refRBSheet?.current?.open()
  const resetInfo = () => setClickedInfo(null)

  const findData = (value: string) => {
    if (value === '') {
      return friends
    }

    const regex = new RegExp(`${query.trim()}`, 'i')
    return friends.filter(item => {
      return item.nickname.search(regex) >= 0
    })
  }

  if (isLoading) return null
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput style={{height: '100%', width: '80%'}} placeholder="검색하세요" onChangeText={text => setQuery(text)} value={query} />
        <Image source={Images.ico_search} style={styles.search_icon} />
      </View>

      <Autocomplete
        style={{flex: 1}}
        data={findData(query)}
        renderResultList={({data}) => {
          return (
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
                      <Image style={{width: 36, height: 36}} source={item.profile ? item.profile : Images.icon_profile} />
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
                )
              }}
            />
          )
        }}
        listContainerStyle={{marginTop: 20}}
        inputContainerStyle={{borderWidth: 0}}
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

export default MypageFriend

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 17},
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 99,
    height: 40,
  },

  search_icon: {width: 20, height: 20, marginRight: 10},
  profile: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: 'green',
  },

  row: {display: 'flex', flexDirection: 'row', alignItems: 'center'},

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
  },
  activetab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'black',
  },
})
