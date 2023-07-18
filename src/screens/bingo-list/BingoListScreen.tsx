import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {View} from 'react-native'
import {getBingoList} from './remote'
import {useRoutes} from 'hooks/useRoutes'
import {useNavigation} from '@react-navigation/native'

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
  useEffect(() => {
    ;(async () => {
      const res = await getBingoList()
      setList(res.data.data)
    })()
  }, [])
  // kay_TODO: 카드분리
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>빙고 목록</Text>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabname}>ALL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabname}>개인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabname}>그룹</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={list}
            keyExtractor={item => item?.id}
            renderItem={({item}) => {
              const {id, title, since, until, goal, groupType, open, bingoLines, totalCompleteCount} = item || {}
              const type = groupType === 'SINGLE' ? '개인' : '그룹'
              return (
                <TouchableOpacity onPress={() => navigate('BingoBoard', id)} style={styles.block}>
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
            }}
          />
        </View>
      </ScrollView>
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
  tabname: {},
  ////
  block: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24},
  type: {marginRight: 4, fontWeight: '500', fontSize: 16, color: '#3A8ADB'},
  bingotitle: {fontWeight: '500', fontSize: 16},
})
