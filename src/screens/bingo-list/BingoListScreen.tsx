import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {View} from 'react-native'
import {getBingoList} from './remote'
import {useRoutes} from 'hooks/useRoutes'
import {useIsFocused, useNavigation} from '@react-navigation/native'

import {Images} from 'assets'
import {Image} from 'react-native'
import {MENU} from 'navigation/menu'

const MiniBoard = ({bingo}) => {
  const bingoarr = bingo.map(e => e.bingoItems)

  return (
    <View>
      {bingoarr.map((e, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          {e.map(({complete}, i) => (
            <View
              key={i}
              style={{
                width: 16,
                height: 16,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 4,
                backgroundColor: complete ? '#FCB179' : '#DDDDDD',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  )
}
export const Card = ({item}) => {
  // const navigation: LooseObject = useNavigation()

  // const {navigate} = useRoutes()
  const {id, title, since, until, goal, groupType, open, bingoLines, totalCompleteCount} = item || {}
  const type = groupType === 'SINGLE' ? '개인' : '그룹'

  return (
    <TouchableOpacity style={{backgroundColor: 'green'}}>
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginHorizontal: 8}}>
        <View style={styles.row}>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.bingotitle}>{title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{marginRight: 8}}>
            {since} ~ {until}
          </Text>
          <Text>
            {totalCompleteCount}/{goal} 빙고
          </Text>
        </View>
      </View>

      <View style={{width: 52, height: 52, backgroundColor: '#FCB179'}} />
    </TouchableOpacity>
  )
}

const BingoListScreen = () => {
  const {navigate} = useRoutes()
  const [list, setList] = useState([])
  const [category, setCategory] = useState<string>('ALL')
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      const res = await getBingoList()
      setList(res.data.data.reverse())
    })()
  }, [isFocused])

  const CATEGORY: string[] = ['ALL', '개인', '그룹']

  const singleList = useMemo(() => list.filter(e => e?.groupType === 'SINGLE'), [list])
  const groupList = useMemo(() => list.filter(e => e?.groupType === 'GROUP'), [list])

  const selectedList = (category: string) => {
    if (category === '개인') return singleList
    if (category === '그룹') return groupList
    return list
  }

  const goToBoard = (id: number) => navigate(MENU.BINGO_BOARD, {id: id})

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>빙고 목록</Text>

      <View style={styles.wrapper}>
        <View style={styles.row}>
          {CATEGORY.map(name => (
            <TouchableOpacity onPress={() => setCategory(name)} style={styles[category === name ? 'activetab' : 'tab']}>
              <Text style={{color: category === name ? 'white' : 'black'}}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {!list.length ? (
          <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={Images.emoji_01} style={{width: 75, height: 75}} />
              <Text style={{marginTop: 16, fontWeight: '500', fontSize: 18}}>생성된 빙고가 없습니다.</Text>
              <Text style={{marginTop: 4, fontWeight: '400', fontSize: 14, color: '#666666'}}>빙고를 생성하여 빙고목록에서 확인해보세요.</Text>
            </View>
          </View>
        ) : (
          <FlatList
            style={{marginTop: 16}}
            data={selectedList(category)}
            keyExtractor={item => item?.id}
            renderItem={({item}) => {
              const {id, title, since, until, goal, groupType, open, bingoLines, totalBingoCount, completed} = item || {}
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
                      <MiniBoard bingo={bingoLines} />
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
        )}
      </View>
      {/* <RegisterSheet setVisible={() => console.log('dd')} /> */}
    </SafeAreaView>
  )
}

export default BingoListScreen

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  wrapper: {flex: 1, paddingVertical: 24, paddingHorizontal: 12},
  title: {paddingVertical: 24, paddingHorizontal: 20, fontSize: 24, fontWeight: '700'},
  row: {display: 'flex', flexDirection: 'row'},
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
  activename: {color: 'white'},

  ////
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
