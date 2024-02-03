import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'
import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {View} from 'react-native'
import {MiniBoard} from './MiniBoard'
import {Alert} from 'react-native'
import {deleteBingo} from 'screens/board/remote/bingo'
import {Images} from 'assets'

//일반빙고카드
export const Card = ({item}) => {
  const {id, title, since, until, goal, groupType, open, bingoLines, totalBingoCount, completed, bingoColorValue} = item || {}
  const type = groupType === 'SINGLE' ? '개인' : '그룹'
  const {navigate} = useRoutes()
  const goToBoard = (id: number) => navigate(MENU.BINGO_BOARD, {id: id})

  return (
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
  )
}
//임시빙고카드
export const TemporaryCard = ({item, refetch}) => {
  const {id, title, groupType} = item || {}
  const type = groupType === 'SINGLE' ? '개인' : '그룹'
  const {navigate} = useRoutes()

  const goToBoard = (id: number) => navigate(MENU.BINGO_BOARD, {id: id})
  const deleteBoard = async (id: number) => {
    const res = await deleteBingo(id)

    if (res.status === 200) {
      refetch()
      return Alert.alert('삭제가 완료되었습니다.')
    }
  }

  const handleLongPress = () =>
    Alert.alert('빙고판을 삭제하시겠습니까?', '삭제된 빙고판은 복구할 수 없습니다.', [
      {
        text: '삭제하기',
        onPress: () => deleteBoard(id),
      },
      {
        text: '취소하기',
        onPress: () => {},
        style: 'cancel',
      },
    ])

  return (
    <TouchableOpacity onLongPress={handleLongPress} onPress={() => goToBoard(id)} style={styles.temporaryBlock}>
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
  )
}

const styles = StyleSheet.create({
  row: {display: 'flex', flexDirection: 'row'},
  type: {marginRight: 4, fontWeight: '500', fontSize: 16, color: '#3A8ADB'},
  bingotitle: {fontWeight: '600', fontSize: 16},
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
})
