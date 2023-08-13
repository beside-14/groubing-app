import React, {useEffect} from 'react'
import {StyleSheet, SafeAreaView, Text} from 'react-native'
import {FeedHeader, FeedTab} from './contents'
import {View} from 'react-native'
import {API} from 'utils/axios'

const Card = () => {
  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <View style={styles.profileimg} />
        <Text>kay</Text>
      </View>
    </View>
  )
}

const getFriends = async () => {
  const res = await API.get('/api/friends')

  return res
}
const Feed = () => {
  useEffect(() => {
    ;(async () => {
      const res = await getFriends()

      console.log('결과값!', res)
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <FeedHeader />
      {/* 탭 */}
      <FeedTab />
      {/* 피드 리스트 */}
      <Card />
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
  block: {padding: 20},
})
