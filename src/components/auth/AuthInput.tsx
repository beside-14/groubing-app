import React from 'react'
import {TextInput, TextInputProps, TextStyle, StyleSheet} from 'react-native'

type InputProps = {
  placeholder?: string
  style?: TextStyle
  value: string
  onChangeText?: (text: string) => void
  onChange?: (event: {nativeEvent: {text: string}}) => void
  editable?: boolean
  maxLength?: number
  secureTextEntry?: boolean
  textContentType?: TextInputProps['textContentType']
}

const AuthInput: React.FC<InputProps> = ({
  placeholder,
  style,
  value,
  onChange,
  onChangeText,
  editable = true,
  maxLength,
  secureTextEntry = false,
  textContentType,
}) => {
  const handleChange = (event: {nativeEvent: {text: string}}) => {
    if (onChange) {
      onChange(event) // `onChange`를 이용해야할 경우
    } else if (onChangeText) {
      onChangeText(event.nativeEvent.text) // `onChangeText`를 이용해야할 경우
    }
  }

  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      value={value}
      onChange={handleChange}
      editable={editable}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      textContentType={textContentType}
    />
  )
}

export default AuthInput

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    fontFamily: 'NotoSansKR_400Regular',
    color: '#A6A6A6',
    fontSize: 18,
    paddingLeft: 5,
  },
})
