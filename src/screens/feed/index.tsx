import React, {useRef} from 'react'
import {StyleSheet, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native'
import {FeedHeader, FeedTab} from './contents'
import {View} from 'react-native'
import {SectionList} from 'react-native'
import {useFeeds} from './remote/useFeeds'
import {Images} from 'assets'
import RBSheet from 'react-native-raw-bottom-sheet'

const Header = ({name}) => {
  const refRBSheet = useRef()
  const openMoreModal = () => refRBSheet?.current?.open()
  return (
    <View style={styles.block}>
      <View style={{...styles.row, justifyContent: 'space-between'}}>
        <View style={styles.row}>
          <View style={styles.profileimg} />
          <Text style={{fontWeight: '500', fontSize: 16}}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => openMoreModal()}>
          <Image source={Images.icon_more} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
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
          <TouchableOpacity style={{paddingVertical: 15}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>{name}님에게 친구신청</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: 15}}>
            <Text style={{fontWeight: '700', fontSize: 18, color: '#ED3241'}}>신고하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: 15}} onPress={() => refRBSheet?.current?.close()}>
            <Text style={{fontWeight: '700', fontSize: 18}}>취소</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

const List = ({title, isLast}) => {
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

const Feed = () => {
  const {data: feeds} = useFeeds()

  const DATA = [
    {title: {nickname: 'dd', id: 2, profile: ''}, data: ['1', '2', '3', '4']},
    {title: {nickname: 'dd', id: 2, profile: ''}, data: ['1', '2', '3', '4']},
    {title: {nickname: 'dd', id: 2, profile: ''}, data: ['1', '2', '3', '4']},
  ]

  if (!feeds) return null
  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <FeedHeader />
      {/* 탭 */}
      <FeedTab />
      {/* 피드 리스트 */}

      <SectionList
        style={{}}
        sections={[...feeds, ...feeds, ...feeds]}
        keyExtractor={(item, index) => item + index}
        renderItem={({item: {title}, index, section}) => <List title={title} index={index} isLast={section.data.length - 1 === index} />}
        renderSectionHeader={({
          section: {
            title: {name},
          },
        }) => <Header name={name} />}
      />
    </SafeAreaView>
  )
}

export default Feed

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
