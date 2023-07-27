import {StyleSheet, SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, TextInput, Image} from 'react-native'

import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'

import BingoItemData from '../../assets/dataset/BingoItemData.json'
import {generateBingoBoard, countBingos} from '../../utils/BingoUtil'
import {ProgressBar} from 'react-native-paper'
import BingoBoard from 'components/bingo/board/BingoBoard'
import {Memo} from 'components/bingo/board/Memo'
import {getBingo, registerItem} from './remote/bingo'
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider, BottomSheetTextInput} from '@gorhom/bottom-sheet'
import {useQuery} from 'react-query'
import {useRoutes} from 'hooks/useRoutes'
import {useRoute} from '@react-navigation/native'

import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {bingo_count_atom, register_item_atom, retech_atom} from './store'
import {Images} from 'assets'
import {updateBingoInfo} from 'components/bingo/board/remote'
import {ItemRegisterSheet} from 'components/bingo/board/contents/ItemRegisterSheet'
import {BingoGoalText} from './contents/BingoGoalText'
import {TestInput, TestMemoInput} from './contents/Test'

// import {TextInput} from 'react-native-gesture-handler'

type BingoGoalText = {
  bingoPercent: number
  bingoCount: number
  maxBingoCount: number
}

const BingoScreen = () => {
  const [visibleForm, setVisibleForm] = useState<boolean>(false)
  const [bingoCount, setBingoCount] = useAtom(bingo_count_atom)
  const {navigate, back} = useRoutes()
  const [refetch, setRetech] = useAtom(retech_atom)
  const {params} = useRoute()
  const {fromCreate, id} = params || {}
  const [data, setData] = useState()

  const isTemporary = !data?.completed
  ////
  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  ////
  useEffect(() => {
    ;(async () => {
      const res = await getBingo(id)
      setBingoCount(res.data.data.bingoMap.totalBingoCount)
      setData(res.data.data)
      console.log(data)
    })()
  }, [])

  useEffect(() => {
    if (!refetch) return
    ;(async () => {
      const res = await getBingo(id)
      setBingoCount(res.data.data.bingoMap.totalBingoCount)
      setData(res.data.data)
      setRetech(false)
    })()
  }, [refetch])

  if (!data) return null
  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View
          style={{
            height: 60,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          {fromCreate ? (
            <View></View>
          ) : (
            <TouchableOpacity onPress={() => back()} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Image source={Images.back_btn} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          )}

          {isTemporary ? (
            <TouchableOpacity
              onPress={async () => {
                const result = await updateBingoInfo(data.id, {title: data.title, goal: data.goal})

                if (result?.status === 200) navigate('BingoList')
                return
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.icon_check_black} style={{width: 24, height: 24, marginRight: 4}} />
              <Text>저장하기</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              // onPress={() => navigate('BingoList')}
              onPress={() => bottomSheetModalRef.current?.present()}
              style={{alignItems: 'center'}}>
              <Image source={Images.icon_more} style={{width: 24, height: 24, marginRight: 4}} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.bingoTypeContainer}>
            <Text style={styles.bingoType}>{data?.type === 'SINGLE' ? '개인' : '그룹'}</Text>
            <View style={styles.bingoTitleContainer}>
              <Text style={styles.bingoTitle}>{data?.title}</Text>
              <View style={styles.remainingDaysContainer}>
                <Text style={styles.remainingDaysText}>{data?.dday}</Text>
              </View>
            </View>
            <BingoGoalText bingoPercent={(bingoCount / data?.goal) * 100} bingoCount={bingoCount} maxBingoCount={data?.goal} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <ProgressBar progress={bingoCount / data?.goal} style={styles.progressBar} color="#3A8ADB" />
          </View>

          <BingoBoard isTemporary={isTemporary} board={data.id} size={data?.bingoSize} items={data?.bingoMap?.bingoLines} />
          <Memo content={data?.memo} />
        </ScrollView>
        {/* {true && <ItemRegisterSheet boardId={3} />} */}
      </SafeAreaView>
      {/* <ItemRegisterSheet boardId={3} /> */}
      <TestInput />
      <TestMemoInput />
    </View>
  )
}

export default BingoScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingBottom: 100, // 하단 네비게이터 높이만큼 패딩을 추가
  },
  bingoTypeContainer: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  bingoType: {
    flex: 1,
    color: '#666666',
    fontSize: 13,
    fontFamily: 'NotoSansKR_400Regular',
    marginBottom: 5,
  },
  bingoTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  bingoTitle: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'NotoSansKR_700Bold',
    fontWeight: '700',
  },
  remainingDaysContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#3A8ADB',
    marginLeft: 8,
    marginBottom: 3,
  },
  remainingDaysText: {
    color: '#3A8ADB',
    fontSize: 13,
    fontFamily: 'NotoSansKR_400Regular',
  },

  progressBar: {
    height: 5,
    marginBottom: 20,
    marginHorizontal: 10,
  },

  bingoCountTextPadding: {
    paddingHorizontal: 2,
  },
})
