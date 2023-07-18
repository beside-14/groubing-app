// AuthInput.tsx
import React from 'react'
import {TextInput, TextInputProps, TextStyle, StyleSheet} from 'react-native'
import {font} from 'shared/styles'

type InputProps = TextInputProps & {
  placeholderTextColor?: string
  style?: TextStyle
}

const AuthInput: React.FC<InputProps> = ({placeholderTextColor = '#A6A6A6', style, ...props}) => {
  return <TextInput secureTextEntry={false} placeholderTextColor={placeholderTextColor} style={[styles.input, style]} {...props} />
}

export default AuthInput

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    ...font.NotoSansKR_Regular,
    fontSize: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
})
