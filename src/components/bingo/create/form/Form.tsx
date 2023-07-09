import {StyleSheet, Text, SafeAreaView, ScrollView, View, TextInput, Image} from 'react-native'
import React, {useState} from 'react'

import {TouchableOpacity} from 'react-native-gesture-handler'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

const Type = ({bingoTypeId, setBingoTypeId}) => {
  const BINGO = {
    개인: ['개인 3×3 9칸', '개인 4×4 16칸'],
    그룹: ['그룹 3×3 9칸', '그룹 4×4 16칸'],
  }

  return (
    <View>
      <Text style={styles.question}>빙고 타입을 선택해주세요.</Text>
      <View style={styles.pContainer}>
        <View style={{marginRight: 16}}>
          <Text style={styles.pTitle}>개인 빙고</Text>
          <Text style={styles.pContent}>나만의 빙고를 만들어요.</Text>
        </View>
        <View style={styles.gridBtn}>
          {BINGO.개인.map(e => (
            <TouchableOpacity onPress={() => setBingoTypeId(e)} style={bingoTypeId === e ? styles.selectedBtn : styles.unSelectedBtn}>
              <View>
                <Text style={bingoTypeId === e ? styles.selectedBtnText : styles.unSelectedBtnText}>{e}</Text>
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
          {BINGO.그룹.map(e => (
            <TouchableOpacity onPress={() => setBingoTypeId(e)} style={bingoTypeId === e ? styles.selectedBtn : styles.unSelectedBtn}>
              <View>
                <Text style={bingoTypeId === e ? styles.selectedBtnText : styles.unSelectedBtnText}>{e}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

const Public = ({disclosure, setDisclosure}) => {
  const onPressPublic = p => {
    // setDisclosure(p)
  }
  return (
    <View>
      <Text style={styles.question}>빙고 공개 여부를 선택해주세요.</Text>
      <View style={styles.gridBtn}>
        <TouchableOpacity onPress={() => onPressPublic('public')} style={disclosure === 'public' ? styles.selectedBtn : styles.unSelectedBtn}>
          <View>
            <Text style={disclosure === 'public' ? styles.selectedBtnText : styles.unSelectedBtnText}>전체 공개</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressPublic('private')} style={disclosure === 'private' ? styles.selectedBtn : styles.unSelectedBtn}>
          <View>
            <Text style={disclosure === 'private' ? styles.selectedBtnText : styles.unSelectedBtnText}>비공개</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Title = ({bingoTitle, setBingoTitle}) => {
  return (
    <View>
      <Text style={styles.question}>빙고 제목을 입력해주세요.</Text>
      <View>
        <TextInput
          placeholder="제목을 입력해주세요"
          onChangeText={t => setBingoTitle(t)}
          value={bingoTitle}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular'}}
        />
      </View>
    </View>
  )
}

const Goal = ({setGoal, goal}) => {
  const onIncrease = () => {
    setGoal((prev: number) => prev + 1)
  }
  const onDecrease = () => {
    if (goal === 1) return
    setGoal((prev: number) => prev - 1)
  }
  return (
    <View>
      <Text style={styles.question}>목표 빙고 개수를 입력해주세요.</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={onDecrease} style={styles.counterBtn}>
          <Text style={styles.counterBtnTxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{goal}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.counterBtn}>
          <Text style={styles.counterBtnTxt}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Period = () => {
  const [visible, setVisible] = useState(false)
  const openCalendar = () => {
    setVisible(true)
  }
  const onConfirm = date => {
    console.log('A date has been picked : ', date)
    onCancel()
  }
  const onCancel = () => {
    setVisible(false)
  }

  return (
    <View>
      <Text style={styles.question}>빙고 진행 기간을 입력해주세요.</Text>
      <View style={{flexDirection: 'row', borderBottomColor: '#DDDDDD', borderBottomWidth: 1, paddingBottom: 10}}>
        <TouchableOpacity onPress={openCalendar}>
          <Text style={{width: 280, height: 16, marginRight: 15, marginLeft: 2, fontSize: 16}}>2023-03-12~2023-04-12</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal isVisible={visible} mode="date" onConfirm={onConfirm} onCancel={onCancel} />
    </View>
  )
}

const Input = ({step}: {step: string}) => {
  const [bingoTypeId, setBingoTypeId] = useState('개인 3×3 9칸')
  const [disclosure, setDisclosure] = useState('public')
  const [bingoTitle, setBingoTitle] = useState('')
  const [goal, setGoal] = useState(1)
  const STEP: any = {
    '빙고 타입': <Type setBingoTypeId={setBingoTypeId} bingoTypeId={bingoTypeId} />,
    '빙고 공개 여부': <Public disclosure={disclosure} setDisclosure={setDisclosure} />,
    '빙고 제목': <Title bingoTitle={bingoTitle} setBingoTitle={setBingoTitle} />,
    '목표 빙고 개수': <Goal setGoal={setGoal} goal={goal} />,
    '빙고 진행 기간': <Period />,
  }

  const BINGO_JSON = {
    title: bingoTitle,
    goal: goal,
    bingoSize: bingoTypeId,
    open: disclosure,
    since: new Date(),
    untile: new Date() + 1,
  }
  const CREATE_INFO: any = {
    '빙고 타입': bingoTypeId,
    '빙고 공개 여부': disclosure,
    '빙고 제목': bingoTitle,
    '목표 빙고 개수': goal,
  }

  const STEPLIST = ['빙고 타입', '빙고 공개 여부', '빙고 제목', '목표 빙고 개수', '빙고 진행 기간']
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

export const Form = ({step}) => {
  return <Input step={step} />
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
    marginHorizontal: 12,
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
    fontWeight: 700,
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
    flexDirection: 'row',
    width: '100%',
  },
  unSelectedBtnText: {
    width: '100%',
    height: 16,
    fontSize: 15,
    color: '#666666',
  },
  unSelectedBtn: {
    backgroundColor: '#F3F3F3',

    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  selectedBtnText: {
    width: '100%',
    height: 16,
    fontSize: 15,
    color: '#FFFFFF',
  },
  selectedBtn: {
    backgroundColor: '#3A8ADB',

    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 6,
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
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
})
