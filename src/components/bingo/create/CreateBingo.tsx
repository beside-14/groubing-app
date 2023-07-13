import {StyleSheet, SafeAreaView, View, KeyboardAvoidingView, Platform} from 'react-native'
import React, {useState} from 'react'

import StepBar from './StepBar'
import {Form} from './form/Form'
import {isIphoneX} from 'react-native-iphone-x-helper'

const CreateBingo = () => {
  const [nowStep, setNowStep] = useState(1)

  const isIphone = isIphoneX() && Platform.OS === 'ios'
  const paddingBottom = isIphone ? 90 : 0

  const STEP = ['빙고 타입', '빙고 공개 여부', '빙고 제목', '목표 빙고 개수', '빙고 진행 기간']

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{...styles.container}}>
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* 스텝바 */}
        <View style={styles.stepBarContainer}>
          <StepBar step={4} now={nowStep} goback={setNowStep} />
        </View>
        {/* 바디 콘테이너 */}
        <Form steptext={STEP[nowStep - 1]} stepnum={nowStep} setNowStep={setNowStep} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: '#FFFFFF',

    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    position: 'relative',
    // justifyContent: 'space-between',
  },
  question: {
    fontFamily: 'NotoSansKR_700Bold',
    width: '100%',
    height: 36,
    fontSize: 24,
    marginBottom: 10,
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
    width: 89,
    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 6,
  },
  selectedBtnText: {
    width: '100%',
    height: 16,
    fontSize: 15,
    color: '#FFFFFF',
  },
  selectedBtn: {
    backgroundColor: '#3A8ADB',
    width: 89,
    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 6,
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
    height: 56,
    backgroundColor: '#000000',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 20,
    // marginBottom: 100,
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
    // width: 150,
    width: '50%',
    paddingHorizontal: 20,
  },
  counterContainer: {
    flexDirection: 'row',
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
export default CreateBingo
