import {StyleSheet, SafeAreaView, View, KeyboardAvoidingView, Platform} from 'react-native'
import React, {useState} from 'react'

import StepBar from './StepBar'
import {Form} from './form/Form'
import {isIphoneX} from 'react-native-iphone-x-helper'

const CreateBingo = () => {
  const [nowStep, setNowStep] = useState(1)

  const isIphone = isIphoneX() && Platform.OS === 'ios'
  const paddingBottom = isIphone ? 90 : 0

  const STEP = ['빙고 타입', '빙고 공개 여부', '빙고 제목', '목표 빙고 개수']

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
  stepBarContainer: {
    marginTop: 30,
    width: '50%',
    paddingHorizontal: 20,
  },
})
export default CreateBingo
