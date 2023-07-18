import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {font} from 'shared/styles'

type AuthNextButtonProps = {
  onPress: () => void
  buttonText: string
  isDisabled?: boolean
}

const AuthNextButton = ({onPress, buttonText, isDisabled}: AuthNextButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={isDisabled ? [styles.button, styles.disabled_button] : styles.button} onPress={onPress} disabled={isDisabled}>
        <Text style={styles.text}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AuthNextButton

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 13,
  },
  button: {
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#000000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  disabled_button: {
    backgroundColor: '#DDD',
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    ...font.NotoSansKR_Medium,
  },
})
