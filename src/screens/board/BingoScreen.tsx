import {StyleSheet, SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'

import BingoItemData from '../../assets/dataset/BingoItemData.json'
import {generateBingoBoard, countBingos} from '../../utils/BingoUtil'
import {ProgressBar} from 'react-native-paper'
import BingoBoard from 'components/bingo/board/BingoBoard'
import {Memo} from 'components/bingo/board/Memo'
import {getBingo, registerItem} from './remote/bingo'
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet'
import {useQuery} from 'react-query'
import {useRoutes} from 'hooks/useRoutes'
import {useRoute} from '@react-navigation/native'
import {RegisterSheet} from 'components/bingo/board/TemporaryBoardScreen'
import {useAtom, useAtomValue} from 'jotai'
import {bingo_count_atom, register_item_atom} from './store'
// import {TextInput} from 'react-native-gesture-handler'

type BingoGoalText = {
  bingoPercent: number
  bingoCount: number
  maxBingoCount: number
}

export const BingoGoalText = ({bingoPercent, bingoCount, maxBingoCount}: BingoGoalText) => {
  if (bingoPercent === 100) {
    return (
      <View style={styles.bingoGoal}>
        <Text style={styles.bingoGoalText}>목표를 달성했어요!</Text>
        <Text style={styles.bingoCountText}>
          <Text style={styles.bingoCountTextColor}>{bingoCount}</Text>/<Text style={styles.bingoCountTextPadding}>{maxBingoCount}</Text>빙고
        </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.bingoGoal}>
        <Text style={styles.bingoGoalText}>
          목표까지 <Text style={styles.bingoPercent}>{bingoPercent.toFixed(0)}%</Text> 남았어요!
        </Text>
        <Text style={styles.bingoCountText}>
          <Text style={styles.bingoCountTextColor}>{bingoCount}</Text>/<Text style={styles.bingoCountTextPadding}>{maxBingoCount}</Text>빙고
        </Text>
      </View>
    )
  }
}

export const TestInput = () => {
  const {params: boardId} = useRoute()
  const [state, setState] = useAtom(register_item_atom)
  const [content, setContent] = useState<{title: string; subTitle: string}>({
    title: '',
    subTitle: '',
  })

  const addItem = async () => {
    if (!boardId) return

    const res = await registerItem(content, boardId, state.id as number)
    console.log(res)
    setState({mode: false, id: null})
  }
  if (!state.mode) return null
  return (
    <View
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'rbga(0,0,0,0.3)',
        zIndex: 20,
      }}>
      <View style={{marginTop: 60, backgroundColor: 'white', padding: 20, width: '80%', borderWidth: 1, borderRadius: 5}}>
        <TextInput
          placeholder="제목을 입력해주세요"
          onChangeText={t => setContent(prev => ({...prev, title: t}))}
          value={content.title}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular', marginBottom: 12}}
        />
        <TextInput
          placeholder="내용을 입력해주세요"
          onChangeText={t => setContent(prev => ({...prev, subTitle: t}))}
          value={content.subTitle}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular'}}
        />
        <TouchableOpacity onPress={() => addItem()} style={{backgroundColor: 'black', padding: 5, marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'white'}}>제출</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setState({mode: false, id: null})} style={{backgroundColor: 'black', padding: 5, marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'white'}}>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const BingoScreen = () => {
  const [boardSize, setBoardSize] = useState<number>(3) // 초기값은 3

  // const [bingoCount, setBingoCount] = useState(0) // 빙고 수

  const [visibleForm, setVisibleForm] = useState<boolean>(false)
  const [bingoCount, setBingoCount] = useAtom(bingo_count_atom)
  const maxBingoCount = 2 * boardSize + 2 //목표 빙고 수

  const {params} = useRoute()

  const [data, setData] = useState()
  const handleToggle = (x: number, y: number) => {}
  const [state, setState] = useAtom(register_item_atom)

  useEffect(() => {
    ;(async () => {
      const res = await getBingo(params)
      setBingoCount(res.data.data.bingoMap.totalBingoCount)
      setData(res.data.data)
    })()
  }, [])

  if (!data) return null
  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <View style={styles.bingoTypeContainer}>
            <Text style={styles.bingoType}>{data?.type === 'SINGLE' ? '개인' : '그룹'}</Text>
            <View style={styles.bingoTitleContainer}>
              <Text style={styles.bingoTitle}>{data?.title}</Text>
              <View style={styles.remainingDaysContainer}>
                <Text style={styles.remainingDaysText}>{data?.dday}</Text>
              </View>
            </View>
          </View>

          <BingoGoalText bingoPercent={(bingoCount / data?.goal) * 100} bingoCount={bingoCount} maxBingoCount={data?.goal} />
          <ProgressBar progress={bingoCount / data?.goal} style={styles.progressBar} color="#3A8ADB" />
          <BingoBoard board={data.id} size={data?.bingoSize} onToggle={handleToggle} items={data?.bingoMap?.bingoLines} />
          <Memo content={data?.memo} />
        </ScrollView>

        {/* {state.mode && <RegisterSheet setVisible={() => setState({mode: false, id: null})} />} */}
      </SafeAreaView>
      <TestInput />
    </>
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
    paddingLeft: 10,
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
  },
  bingoTitle: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'NotoSansKR_700Bold',
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
  bingoGoal: {
    flex: 1,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 5,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  bingoPercent: {
    flex: 1,
    fontFamily: 'NotoSansKR_700Bold',
    alignItems: 'flex-start',
    paddingLeft: 4,
    paddingRight: 4,
    color: '#3A8ADB',
    fontSize: 18,
    fontWeight: '600',
  },
  bingoGoalText: {
    flex: 1,
    fontFamily: 'NotoSansKR_700Bold',
    alignItems: 'flex-start',
    paddingLeft: 10,
    fontSize: 13,
    color: '#000000',
  },
  bingoCountText: {
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'right',
    paddingRight: 10,
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 13,
    color: '#666666',
    marginRight: 1,
  },
  bingoCountTextPadding: {
    paddingHorizontal: 2,
  },
  bingoCountTextColor: {
    color: '#3A8ADB',
    fontSize: 18,
  },
})
