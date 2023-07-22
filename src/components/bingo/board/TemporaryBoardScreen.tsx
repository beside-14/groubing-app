import React, {useCallback, useMemo, useRef, useState} from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {ProgressBar} from 'react-native-paper'
import {BingoGoalText} from 'screens/board/BingoScreen'
import {RegisterBoard} from './RegisterBoard'
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet'
import {registerItem} from './remote'
import {Images} from 'assets'
import {ForceTouchGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/forceTouchGesture'

export const RegisterSheet = ({setVisible}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  return (
    <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} keyboardBehavior="fillParent" onChange={handleSheetChanges}>
      <View style={styles.sheetContainer}>
        <View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.arrowWrapper}>
              <Image style={styles.arrow} source={Images.back_btn} />
            </TouchableOpacity>
            <Text style={styles.title}>항목 작성</Text>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>제목</Text>
            <BottomSheetTextInput placeholder="빙고 항목의 타이틀을 작성하세요." style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>내용</Text>
            <BottomSheetTextInput placeholder="자세한 내용을 작성하세요." style={styles.input} />
          </View>
        </View>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.btnText}>완료</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  )
}

const TemporaryBoardScreen = () => {
  const [visibleForm, setVisibleForm] = useState<boolean>(false)

  const [itemNum, setItemNum] = useState({row: 1, column: 1})
  // const {bottomSheet} = useActionSheet({
  //   visible: visibleForm,
  //   component: () => <Text>폼폼</Text>,
  // })
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables

  // callbacks

  const registerMode = (row: number, column: number) => {
    setItemNum({row: row, column: column})

    setVisibleForm(true)
  }

  console.log('visibleForm', visibleForm)

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{...styles.rootContainer}}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.bingoTypeContainer}>
            <View style={styles.bingoTitleContainer}>
              <Text style={styles.bingoTitle}>2</Text>
              <View style={styles.remainingDaysContainer}>
                <Text style={styles.remainingDaysText}>{`D-${3}`}</Text>
              </View>
            </View>
          </View>
          <BingoGoalText bingoPercent={40} bingoCount={4} maxBingoCount={5} />
          <ProgressBar progress={3 / 8} style={styles.progressBar} color="#3A8ADB" />

          <RegisterBoard edit={() => setVisibleForm(true)} />
        </ScrollView>
      </SafeAreaView>
      {visibleForm && <RegisterSheet setVisible={() => setVisibleForm(true)} />}
      {/* <View style={{position: 'absolute', bottom: 0, width: '100%', height: 400, backgroundColor: 'green'}}></View> */}
    </KeyboardAvoidingView>
  )
}
export default TemporaryBoardScreen

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  arrow: {width: 10},
  arrowWrapper: {paddingVertical: 5, paddingRight: 8},
  title: {marginLeft: 2, fontWeight: '500', fontSize: 18},
  input: {
    // margin: 20,
    // marginTop: 8,
    // marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    // lineHeight: 20,
    padding: 8,
    color: 'black',
    borderBottomWidth: 1,
    width: '90%',
    borderColor: '#DDDDDD',
    // backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  sheetContainer: {padding: 20, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: 1},
  row: {display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 24},
  inputWrapper: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16},
  inputTitle: {fontSize: 15, fontWeight: '500', paddingVertical: 14},
  registerButton: {backgroundColor: 'black', borderRadius: 4, textAlign: 'center', padding: 14},
  btnText: {color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 16},
  //
  rootContainer: {
    flex: 1,
  },
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
