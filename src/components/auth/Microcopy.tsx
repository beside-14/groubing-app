import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
import {Images} from 'assets'
import {font} from 'shared/styles'

type MicrocopyProps = {
  microcopy: string
  isError?: boolean
}

const Microcopy = ({microcopy, isError = true}: MicrocopyProps) => {
  return microcopy ? (
    <View style={styles.error_container}>
      <Image source={isError ? Images.icon_info_red : Images.icon_info_gray} style={styles.error_icon} />
      <Text style={isError ? styles.error_message : [styles.error_message, styles.gray]}>{microcopy}</Text>
    </View>
  ) : null
}

export default Microcopy

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 8,
  },
  error_container: {
    marginTop: 6,
    flexDirection: 'row',
  },
  error_icon: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  error_message: {
    color: 'red',
    ...font.NotoSansKR_Regular,
    fontSize: 12,
  },
  gray: {
    color: '#A6A6A6',
  },
})
