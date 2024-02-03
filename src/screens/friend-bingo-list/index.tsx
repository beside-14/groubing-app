import React from 'react'

import {useRoute} from '@react-navigation/native'
import {useQuery} from '@tanstack/react-query'
import {useRoutes} from 'hooks/useRoutes'
import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Images} from 'assets'

import {getBingoList} from 'screens/bingo-list/remote'
import {MENU} from 'navigation/menu'
import {MiniBoard} from 'screens/bingo-list/components'

export const FriendBingoList = () => {
  const {navigate} = useRoutes()
  const {params} = useRoute()

  const {id, name} = params
  const {data: bingos} = useQuery(['friend-bingo-list', id], () => getBingoList(id))

  const goToBoard = (id: number) => navigate(MENU.BINGO_BOARD, {id: id, isfriend: true})

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}님의 빙고목록</Text>
      <View style={styles.wrapper}>
        <FlatList
          style={{marginTop: 16}}
          data={bingos}
          keyExtractor={item => item?.id}
          renderItem={({item}) => {
            const {id, title, since, until, goal, groupType, open, bingoLines, totalBingoCount, completed, bingoColorValue} = item || {}
            const type = groupType === 'SINGLE' ? '개인' : '그룹'
            return (
              <>
                {completed ? (
                  <TouchableOpacity onPress={() => goToBoard(id)} style={styles.block}>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                      <View style={styles.row}>
                        <Text style={styles.type}>{type}</Text>
                        <Text style={styles.bingotitle}>{title}</Text>
                      </View>
                      <View style={{...styles.row, marginTop: 4}}>
                        <Text style={{marginRight: 8, color: '#666666'}}>
                          {since} ~ {until}
                        </Text>
                        <Text style={{color: '#666666'}}>
                          {totalBingoCount}/{goal} 빙고
                        </Text>
                      </View>
                    </View>
                    <MiniBoard bingo={bingoLines} color={bingoColorValue} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => goToBoard(id)} style={styles.temporaryBlock}>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                      <Text style={{fontSize: 13, color: '#3A8ADB', fontWeight: '500'}}>빙고 생성을 완료해주세요!</Text>
                      <View style={{...styles.row, marginTop: 6, gap: 4}}>
                        <Text style={{color: '#A6A6A6', fontWeight: '500', fontSize: 16}}>{type}</Text>
                        <Text style={{color: '#666666', fontWeight: '500', fontSize: 16}}>{title}</Text>
                      </View>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontWeight: '500', fontSize: 13, color: '#3A8ADB'}}>마저 만들기</Text>
                      <View style={{padding: 3}}>
                        <Image source={Images.icon_arrow_blue} style={{width: 5, height: 10}} />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  title: {paddingTop: 15, paddingHorizontal: 20, fontSize: 24, fontWeight: '700'},
  row: {display: 'flex', flexDirection: 'row'},
  wrapper: {flex: 1, paddingTop: 24, paddingHorizontal: 12},
  block: {
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 8,
  },
  temporaryBlock: {
    height: 72,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 8,
    backgroundColor: '#F3F3F3',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderLeftWidth: 3,
    borderColor: '#3A8ADB',
    borderRadius: 8,
  },
  type: {marginRight: 4, fontWeight: '500', fontSize: 16, color: '#3A8ADB'},
  bingotitle: {fontWeight: '600', fontSize: 16},
})
