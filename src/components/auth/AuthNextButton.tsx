import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {font} from 'shared/styles'

type AuthNextButtonProps = {
  onPress: () => void
  buttonText: string
}

const AuthNextButton = ({onPress, buttonText}: AuthNextButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
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
    height: 48,
    backgroundColor: '#000000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    ...font.NotoSansKR_Medium,
  },
})
