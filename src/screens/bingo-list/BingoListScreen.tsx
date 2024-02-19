import React, {useEffect, useMemo, useState} from 'react'
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {View} from 'react-native'
import {useBingoList} from './remote'

import {Images} from 'assets'
import {Image} from 'react-native'
import useUserInfo from 'hooks/useUserInfo'
import {Card, TemporaryCard} from './components'
import {font} from 'shared/styles'
import {DeviceEventEmitter} from 'react-native'

type Category = 'ALL' | '개인' | '그룹'

const BingoListScreen = () => {
  const [category, setCategory] = useState<Category>('ALL')
  const {user} = useUserInfo()
  const {data: list, refetch, isLoading} = useBingoList(user?.id)

  const CATEGORY: Category[] = ['ALL', '개인', '그룹']

  const singleList = useMemo(() => list?.filter(e => e?.groupType === 'SINGLE'), [list])
  const groupList = useMemo(() => list?.filter(e => e?.groupType === 'GROUP'), [list])

  const data = {
    개인: singleList,
    그룹: groupList,
    ALL: list,
  }

  useEffect(() => {
    let subscription = DeviceEventEmitter.addListener('REFRESH', () => refetch())
    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>빙고 목록</Text>

      <View style={styles.wrapper}>
        <View style={styles.row}>
          {CATEGORY.map(name => (
            <TouchableOpacity key={name} onPress={() => setCategory(name)} style={styles[category === name ? 'activetab' : 'tab']}>
              <Text style={{color: category === name ? 'white' : 'black', ...font.NotoSansKR_Medium}}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {isLoading ? null : !data[category]?.length ? (
          <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={Images.emoji_01} style={{width: 75, height: 75}} />
              <Text style={{marginTop: 16, fontWeight: '500', fontSize: 18}}>생성된 빙고가 없습니다.</Text>
              <Text style={{marginTop: 4, fontWeight: '400', fontSize: 14, color: '#666666'}}>빙고를 생성하여 빙고목록에서 확인해보세요.</Text>
            </View>
          </View>
        ) : (
          <FlatList
            refreshing={isLoading}
            onRefresh={() => refetch()}
            style={{marginTop: 16}}
            data={data[category]}
            keyExtractor={item => item?.id}
            renderItem={({item}) => {
              const {completed} = item || {}

              return completed ? <Card item={item} /> : <TemporaryCard item={item} refetch={refetch} />
            }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default BingoListScreen

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  wrapper: {flex: 1, paddingTop: 24, paddingHorizontal: 12},
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
})
