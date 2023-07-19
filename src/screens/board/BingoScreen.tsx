import {StyleSheet, SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native'
import React, {useState, useEffect} from 'react'

import BingoItemData from '../../assets/dataset/BingoItemData.json'
import {generateBingoBoard, countBingos} from '../../utils/BingoUtil'
import {ProgressBar} from 'react-native-paper'
import BingoBoard from 'components/bingo/board/BingoBoard'
import {Memo} from 'components/bingo/board/Memo'
import {getBingo} from './remote/bingo'
import {useQuery} from 'react-query'
import {useRoutes} from 'hooks/useRoutes'
import {useRoute} from '@react-navigation/native'

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

const BingoScreen = () => {
  const [boardSize, setBoardSize] = useState<number>(3) // 초기값은 3
  const [board, setBoard] = useState<any>([]) // 빙고판 상태
  const [bingoCount, setBingoCount] = useState(0) // 빙고 수
  const [bingoItems, setBingoItems] = useState(BingoItemData) //빙고 데이터

  const maxBingoCount = 2 * boardSize + 2 //목표 빙고 수
  const bingoPercent = (bingoCount / maxBingoCount) * 100 //빙고 달성 퍼센트
  const {params} = useRoute()

  const [data, setData] = useState()
  const handleToggle = (x: number, y: number) => {
    setBingoItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.x === x && item.y === y) {
          return {...item, selected: !item.selected}
        }
        return item
      })

      const updatedBoard = generateBingoBoard(boardSize, updatedItems)
      const updatedBingoCount = countBingos(updatedBoard, boardSize)
      setBingoCount(updatedBingoCount)
      return updatedItems
    })
  }

  useEffect(() => {
    ;(async () => {
      const res = await getBingo(params)
      console.log('빙고조회 데이터!!', res.data.data)
      setData(res.data.data)
    })()
  }, [])
  // "totalCompleteCount": 0,
  // "horizontalCompleteLineIndexes": [],
  // "verticalCompleteLineIndexes": [],
  // "diagonalCompleteLineIndexes": []
  // BingoItemData의 길이에 따라 빙고판의 크기 결정
  const dataSize = BingoItemData.length
  useEffect(() => {
    let initialBoardSize = 0
    let initialBoard

    if (dataSize <= 9) {
      initialBoardSize = 3
      initialBoard = generateBingoBoard(3, BingoItemData)
    } else if (dataSize <= 16) {
      initialBoardSize = 4
      initialBoard = generateBingoBoard(4, BingoItemData)
    }

    setBoardSize(initialBoardSize)
    setBoard(initialBoard)

    // 초기 빙고 달성 수 계산
    const initialBingoCount = countBingos(initialBoard, initialBoardSize)
    setBingoCount(initialBingoCount)
  }, [dataSize])

  if (!data) return null
  return (
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

        <BingoGoalText bingoPercent={(data?.bingoMap?.totalCompleteCount / data?.goal) * 100} bingoCount={bingoCount} maxBingoCount={maxBingoCount} />
        <ProgressBar progress={data?.bingoMap?.totalCompleteCount / data?.goal} style={styles.progressBar} color="#3A8ADB" />
        <BingoBoard board={data.id} size={data?.bingoSize} onToggle={handleToggle} items={data?.bingoMap?.bingoLines} />
        <Memo content={data?.memo} />
      </ScrollView>
    </SafeAreaView>
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
