import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {View} from 'react-native'
import {getBingoList} from './remote'
import {useRoutes} from 'hooks/useRoutes'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet'
import {RegisterSheet} from 'components/bingo/board/TemporaryBoardScreen'

const MiniBoard = ({bingo}) => {
  const bingoarr = bingo.map(e => e.bingoItems)

  return (
    <View>
      {bingoarr.map(e => (
        <View style={{flexDirection: 'row'}}>
          {e.map(({complete}) => (
            <View
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
    <TouchableOpacity>
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
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

        <FlatList
          style={{marginTop: 16}}
          data={selectedList(category)}
          keyExtractor={item => item?.id}
          renderItem={({item}) => {
            const {id, title, since, until, goal, groupType, open, bingoLines, totalBingoCount} = item || {}
            const type = groupType === 'SINGLE' ? '개인' : '그룹'
            return (
              <TouchableOpacity onPress={() => navigate('BingoBoard', id)} style={styles.block}>
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
            )
          }}
        />
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
  block: {height: 52, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24},
  type: {marginRight: 4, fontWeight: '500', fontSize: 16, color: '#3A8ADB'},
  bingotitle: {fontWeight: '600', fontSize: 16},
})
