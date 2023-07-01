import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {StepDefault, StepEnd, StepNow} from '../../../../assets'

export default function StepBar({now, step}: {now: number; step: number}) {
  const stepCont = []
  for (let i = 1; i <= step; i++) {
    if (i < now) {
      stepCont.push(<Image key={i} source={StepEnd} style={styles.step} />)
    } else if (i == now) {
      stepCont.push(<Image key={i} source={StepNow} style={styles.stepNow} />)
    } else {
      stepCont.push(<Image key={i} source={StepDefault} style={styles.step} />)
    }
    if (i < step) {
      if (i < now) {
        stepCont.push(<View key={`line_${i}`} style={styles.lineNow} />)
      } else {
        stepCont.push(<View key={`line_${i}`} style={styles.line} />)
      }
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
