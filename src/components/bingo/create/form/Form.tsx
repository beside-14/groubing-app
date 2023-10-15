import {StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'

import {createBingo} from '../remote'
import {useRoutes} from 'hooks/useRoutes'
import {useAtom, useAtomValue} from 'jotai'
import {bingoBaseData, bingo_base_data_atom} from 'screens/board/store'
import {MENU} from 'navigation/menu'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {format} from 'date-fns'

const Type = () => {
  const [data, setData] = useAtom(bingo_base_data_atom)
  const BINGO = {
    개인: ['3×3 9칸', '4×4 16칸'],
    그룹: ['3×3 9칸', '4×4 16칸'],
  }
  const setType = (type: string, size: number) => {
    setData(prev => ({...prev, bingoSize: size, boardType: type}))
  }

  return (
    <View>
      <Text style={styles.question}>빙고 타입을 선택해주세요.</Text>
      <View style={styles.pContainer}>
        <View style={{marginRight: 16, display: 'flex'}}>
          <Text style={styles.pTitle}>개인 빙고</Text>
          <Text style={styles.pContent}>나만의 빙고를 만들어요.</Text>
        </View>
        <View style={styles.gridBtn}>
          {BINGO.개인.map((e, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setType('SINGLE', i === 0 ? 3 : 4)
              }}
              style={data.boardType === 'SINGLE' && e[0] === data.bingoSize.toString() ? styles.selectedBtn : styles.unSelectedBtn}>
              <View>
                <Text style={data.boardType === 'SINGLE' && data.bingoSize.toString() === e[0] ? styles.selectedBtnText : styles.unSelectedBtnText}>
                  {e}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.divisionLine} />
      <View style={styles.pContainer}>
        <View style={{marginRight: 16}}>
          <Text style={styles.pTitle}>그룹 빙고</Text>
          <Text style={styles.pContent}>친구들과 빙고를 함께 해요.</Text>
        </View>
        <View style={styles.gridBtn}>
          {BINGO.그룹.map((e, i) => (
            <TouchableOpacity
              key={e}
              onPress={() => setType('GROUP', i === 0 ? 3 : 4)}
              style={data.boardType === 'GROUP' && data.bingoSize.toString() === e[0] ? styles.selectedBtn : styles.unSelectedBtn}>
              <View>
                <Text style={data.boardType === 'GROUP' && data.bingoSize.toString() === e[0] ? styles.selectedBtnText : styles.unSelectedBtnText}>
                  {e}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

const Public = () => {
  const [data, setData] = useAtom(bingo_base_data_atom)
  return (
    <View>
      <Text style={styles.question}>빙고 공개 여부를 선택해주세요.</Text>
      <View style={styles.gridBtn}>
        <TouchableOpacity
          onPress={() => setData(prev => ({...prev, open: true}))}
          style={data.open === true ? styles.selectedBtn : styles.unSelectedBtn}>
          <View>
            <Text style={data.open === true ? styles.selectedBtnText : styles.unSelectedBtnText}>전체 공개</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setData(prev => ({...prev, open: false}))}
          style={data.open === false ? styles.selectedBtn : styles.unSelectedBtn}>
          <View>
            <Text style={data.open === false ? styles.selectedBtnText : styles.unSelectedBtnText}>비공개</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Title = () => {
  const [data, setData] = useAtom(bingo_base_data_atom)
  return (
    <View>
      <Text style={styles.question}>빙고 제목을 입력해주세요.</Text>
      <View>
        <TextInput
          placeholder="제목을 입력해주세요"
          onChangeText={t => setData(prev => ({...prev, title: t}))}
          value={data.title}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular'}}
        />
      </View>
    </View>
  )
}

const Goal = () => {
  const [data, setData] = useAtom(bingo_base_data_atom)
  const onIncrease = () => {
    setData(prev => ({...prev, goal: prev.goal + 1}))
  }
  const onDecrease = () => {
    if (data.goal === 1) return
    setData(prev => ({...prev, goal: prev.goal - 1}))
  }
  return (
    <View>
      <Text style={styles.question}>목표 빙고 개수를 입력해주세요.</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={onDecrease} style={styles.counterBtn}>
          <Text style={styles.counterBtnTxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{data.goal}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.counterBtn}>
          <Text style={styles.counterBtnTxt}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Period = () => {
  const [data, setData] = useAtom(bingo_base_data_atom)
  const [datePicker, setDatePicker] = useState('false')
  const [visible, setVisible] = useState<boolean>(false)
  const openCalendar = () => {
    // setVisible(true)
  }
  const onConfirm = (type, selectedDate) => {
    let formatdate = format(selectedDate, 'yyyy-MM-dd')
    setData(prev => {
      return {...prev, [type]: formatdate}
    })
  }

  const onCancel = () => {
    // setVisible(false)
  }

  return (
    <View>
      <Text style={styles.question}>빙고 진행 기간을 입력해주세요.</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={() => setDatePicker('since')}>
          <Text style={styles.date}>{data.since}</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 20}}>~</Text>
        <TouchableOpacity onPress={() => setDatePicker('until')}>
          <Text style={styles.date}>{data.until}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={datePicker !== 'false'}
        mode="date"
        onConfirm={date => {
          onConfirm(datePicker, date)
          setDatePicker('false')
        }}
        onCancel={() => setDatePicker('false')}
      />
    </View>
  )
}

const STEP: any = {
  '빙고 타입': <Type />,
  '빙고 공개 여부': <Public />,
  '빙고 제목': <Title />,
  '목표 빙고 개수': <Goal />,
  // '빙고 진행 기간': <Period />,
}

const Input = ({step}: {step: string}) => {
  const data = useAtomValue(bingo_base_data_atom)

  const CREATE_INFO: any = {
    '빙고 타입': data.boardType === 'SINGLE' ? '개인' : '그룹',
    '빙고 공개 여부': data.open ? '공개' : '비공개',
    '빙고 제목': data.title,
    '목표 빙고 개수': data.goal,
    // '빙고 진행 기간': {since: data.since, until: data.until},
  }

  const STEPLIST = ['빙고 타입', '빙고 공개 여부', '빙고 제목', '목표 빙고 개수']
  const nowstepidx = STEPLIST.findIndex(e => e === step)
  return (
    <>
      {STEP[step]}
      {STEPLIST.map((e, i) => {
        if (nowstepidx <= i) return

        return (
          <View style={styles.summaryContainer} key={i}>
            <Text style={styles.pContent}>{STEPLIST[i]}</Text>
            <Text style={styles.pTitle}>{CREATE_INFO[STEPLIST[i]]}</Text>
          </View>
        )
      })}
    </>
  )
}

export const Form = ({steptext, stepnum, setNowStep}) => {
  const {navigate} = useRoutes()
  const [data, setData] = useAtom(bingo_base_data_atom)

  return (
    <>
      <ScrollView style={styles.headerContainer}>
        <View style={styles.bodyContainer}>
          <Input step={steptext} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={async () => {
          if (stepnum === 4) {
            const res = await createBingo(data)

            if (res.code === 'OK') {
              setData(bingoBaseData)
              return navigate(MENU.BINGO_BOARD, {id: res.data.id, fromCreate: true})
            } else {
              return console.log('생성실패 토큰확인')
            }
          } else {
            setNowStep((nowStep: number) => nowStep + 1)
          }
        }}>
        <Text style={styles.nextBtnTxt}>{stepnum === 5 ? '빙고 생성' : '다음'}</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    flex: 1,
  },
  container: {
    marginHorizontal: 25,
    flex: 1,
    height: '100%',
  },
  headerContainer: {
    height: '15%',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bodyContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
  },
  question: {
    // fontFamily: 'NotoSansKR_700Bold',
    width: '100%',
    height: 36,
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '700',
  },
  pContainer: {
    marginVertical: 10,
  },
  pTitle: {
    fontFamily: 'NotoSansKR_500Medium',
    width: '100%',
    height: 26,
    fontSize: 16,
    marginVertical: 4,
  },
  pContent: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
    width: '100%',
    height: 17,
    color: '#666666',
    marginVertical: 4,
  },
  gridBtn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,

    alignItems: 'center',
  },
  unSelectedBtnText: {
    width: '100%',

    fontSize: 15,
    color: '#666666',
  },
  unSelectedBtn: {
    backgroundColor: '#F3F3F3',
    // width: 150,

    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    // marginRight: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  selectedBtnText: {
    width: '100%',

    fontSize: 15,
    color: '#FFFFFF',
  },
  selectedBtn: {
    backgroundColor: '#3A8ADB',

    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  divisionLine: {
    borderWidth: 0.5,
    borderColor: '#EFEFEF',
    margin: 10,
  },
  nextBtnContainer: {
    width: '100%',
    marginBottom: 13,
  },
  nextBtn: {
    height: 48,
    backgroundColor: '#000000',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 20,
  },
  nextBtn2: {
    height: 48,
    backgroundColor: '#000000',
    width: 214,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  tempBtn: {
    width: 100,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    marginRight: 6,
  },
  tempBtnText: {
    fontFamily: 'NotoSansKR_500Medium',
    width: '100%',
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  nextBtnTxt: {
    fontSize: 14,
    fontFamily: 'NotoSansKR_500Medium',
    color: '#FFFFFF',
  },
  summaryContainer: {
    width: '100%',
    marginVertical: 10,
  },
  stepBarContainer: {
    marginTop: 30,
    width: 150,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    backgroundColor: '#E7F0FA',
    height: 40,
    width: 40,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnTxt: {
    color: '#3A8ADB',
    fontSize: 22,
  },
  countText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 16,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {fontSize: 16},
})
