import {Images} from 'assets'
import React from 'react'
import {StyleSheet, SafeAreaView} from 'react-native'
import {FeedHeader, FeedTab} from './contents'

const Feed = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <FeedHeader />
      {/* 탭 */}
      <FeedTab />
      {/* 피드 리스트 */}
    </SafeAreaView>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
