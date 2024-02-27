import {Images} from 'assets'
import {useAtom} from 'jotai'
import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {set_now_step} from 'screens/board/store'

type StepBarProps = {
  now: number
  setNowStep: (index: number) => void
}
const TOTAL_STEP = 4

export default function StepBar({setNowStep, now}: StepBarProps) {
  const stepCont = []

  for (let i = 1; i <= TOTAL_STEP; i++) {
    const isCurrentStep = i === now
    const isFinishedStep = i < now

    stepCont.push(
      <TouchableOpacity key={i} onPress={() => setNowStep(i)}>
        {isCurrentStep ? (
          <Image source={Images.step_icon_now} style={styles.stepNow} />
        ) : isFinishedStep ? (
          <View style={styles.default_step} />
        ) : (
          <View style={styles.gray_step} />
        )}
      </TouchableOpacity>,
    )

    if (i < TOTAL_STEP) {
      stepCont.push(<View key={`line_${i}`} style={isFinishedStep ? styles.lineNow : styles.line} />)
    }
  }

  return <View style={styles.container}>{stepCont}</View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  step: {
    width: 14,
    height: 14,
    marginHorizontal: 0,
    backgroundColor: 'orange',
  },
  stepNow: {
    width: 24,
    height: 24,
    marginHorizontal: 0,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 0,
  },
  lineNow: {
    flex: 1,
    height: 1,
    backgroundColor: '#3A8ADB',
    marginHorizontal: 0,
  },

  default_step: {
    width: 14,
    height: 14,
    backgroundColor: '#3A8ADB',
    borderRadius: 14,
    zIndex: 6,
  },
  gray_step: {
    width: 14,
    height: 14,
    backgroundColor: '#DDDDDD',
    borderRadius: 14,
  },
  now_step_wrapper: {padding: 6.5, backgroundColor: 'rgba(58, 138, 219, 0.1)', opacity: 0.1, zIndex: 4},
})
