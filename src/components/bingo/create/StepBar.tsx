import {Images} from 'assets'
import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

type StepBarProps = {
  now: number
  step: number
  goback: (i: number) => void
}

export default function StepBar({now, step, goback}: StepBarProps) {
  const stepCont = []

  for (let i = 1; i <= step; i++) {
    const isCurrentStep = i === now
    const isFinishedStep = i < now

    stepCont.push(
      <Image
        key={i}
        source={isCurrentStep ? Images.step_icon_now : isFinishedStep ? Images.step_icon_end : Images.step_icon_default}
        style={isCurrentStep ? styles.stepNow : styles.step}
      />,
    )

    // if (i < now) {
    //   stepCont.push(
    //     <TouchableOpacity onPress={() => goback(i)}>
    //       <Image key={i} source={Images.step_icon_end} style={styles.step} />
    //     </TouchableOpacity>,
    //   )
    // } else if (i == now) {
    //   stepCont.push(<Image key={i} source={Images.step_icon_now} style={styles.stepNow} />)
    // } else {
    //   stepCont.push(<Image key={i} source={Images.step_icon_default} style={styles.step} />)
    // }

    if (i < step) {
      stepCont.push(<View key={`line_${i}`} style={isFinishedStep ? styles.lineNow : styles.line} />)
    }
  }

  return <View style={styles.container}>{stepCont}</View>
  // const stepCont = []
  // for (let i = 1; i <= step; i++) {
  //   if (i < now) {
  //     stepCont.push(<Image key={i} source={Images.step_icon_end} style={styles.step} />)
  //   } else if (i == now) {
  //     stepCont.push(<Image key={i} source={Images.step_icon_now} style={styles.stepNow} />)
  //   } else {
  //     stepCont.push(<Image key={i} source={Images.step_icon_default} style={styles.step} />)
  //   }
  //   if (i < step) {
  //     if (i < now) {
  //       stepCont.push(<View key={`line_${i}`} style={styles.lineNow} />)
  //     } else {
  //       stepCont.push(<View key={`line_${i}`} style={styles.line} />)
  //     }
  //   }
  // }

  // return <View style={styles.container}>{stepCont}</View>
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
