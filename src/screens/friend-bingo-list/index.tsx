import {useQuery} from '@tanstack/react-query'
import {useRoutes} from 'hooks/useRoutes'
import React from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native'
import {Text, View} from 'react-native'
import {getBingoList} from 'screens/bingo-list/remote'

export const FriendBingoList = () => {
  const {navigate} = useRoutes()
  const {data} = useQuery(['friend-bingo-list'], () => getBingoList())

  return <SafeAreaView style={styles.container}></SafeAreaView>
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
})
