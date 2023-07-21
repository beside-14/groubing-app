import {Images} from 'assets'
import React from 'react'
import {StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native'
import {FeedHeader, FeedTab} from './contents'
import {useIsLogged} from 'hooks/useIsLogged'
import {getToken} from 'utils/asyncStorage'

const Feed = () => {
  const {logout} = useIsLogged()
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          const asyncToken = async () => {
            const token = await getToken()
            console.log(token)
          }
          asyncToken()
          logout()
        }}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
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
