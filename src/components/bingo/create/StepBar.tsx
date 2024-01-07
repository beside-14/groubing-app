import {Images} from 'assets'
import {useAtom} from 'jotai'
import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {set_now_step} from 'screens/board/store'

type StepBarProps = {
  step: number
}

export default function StepBar({step}: StepBarProps) {
  const [nowStep, setNowStep] = useAtom(set_now_step)

  const stepCont = []

  for (let i = 1; i <= step; i++) {
    const isCurrentStep = i === nowStep
    const isFinishedStep = i < nowStep

    stepCont.push(
      <TouchableOpacity key={i} onPress={() => setNowStep(i)}>
        <Image
          source={isCurrentStep ? Images.step_icon_now : isFinishedStep ? Images.step_icon_end : Images.step_icon_default}
          style={isCurrentStep ? styles.stepNow : styles.step}
        />
      </TouchableOpacity>,
    )

    if (i < step) {
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
    width: 12,
    height: 12,
    marginHorizontal: 0,
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
})
