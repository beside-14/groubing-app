import React from 'react'
import AuthInput from 'components/auth/AuthInput'
import {StyleSheet, View, Image, Text, TextStyle, Platform} from 'react-native'
import {Images} from 'assets'
import Microcopy from 'components/auth/Microcopy'
import {font} from 'shared/styles'

type LoginInputProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
  microcopy: string
  inputStyle?: TextStyle
  isEmail?: boolean
}
const LoginInput = ({value, setValue, placeholder, microcopy, inputStyle, isEmail}: LoginInputProps) => {
  return (
    <>
      <AuthInput
        placeholder={placeholder}
        onChangeText={value => setValue(value)}
        value={value}
        style={{...styles.textInput, ...inputStyle}}
        keyboardType={isEmail ? 'email-address' : 'default'}
        secureTextEntry={!isEmail}
        autoCapitalize="none"
      />

      <Microcopy microcopy={microcopy} />
    </>
  )
}

export default LoginInput

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 8,
    backgroundColor: 'red',
    // ...font.NotoSansKR_Regular,
    fontSize: 16,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: 60,
      },
    }),
  },
})
