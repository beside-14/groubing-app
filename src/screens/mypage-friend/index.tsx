import React from 'react'
import {View, Text, Image, StyleSheet, TextInput} from 'react-native'
import {font} from 'shared/styles'
import {Images} from 'assets'
import {useFriendList} from './remote'

const MypageFriend = () => {
  const {data} = useFriendList()
  console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput placeholder="닉네임으로 검색" placeholderTextColor={'#666'} style={styles.search_text} />
        <Image source={Images.ico_search} style={styles.search_icon} />
      </View>
    </View>
  )
}

export default MypageFriend

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 17,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 99,
  },
  search_text: {flex: 0.9, ...font.NotoSansKR_Regular, fontSize: 14, lineHeight: 20},
  search_icon: {width: 16, height: 16},
})
