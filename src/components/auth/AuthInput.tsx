// AuthInput.tsx
import React from 'react'
import {TextInput, View, TextInputProps, TextStyle, StyleSheet} from 'react-native'
import {font} from 'shared/styles'

type InputProps = TextInputProps & {
  placeholderTextColor?: string
  style?: TextStyle
}

const AuthInput: React.FC<InputProps> = ({placeholderTextColor = '#A6A6A6', style, ...props}) => {
  return (
    <View>
      <TextInput
        textBreakStrategy={'highQuality'}
        secureTextEntry={false}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input]}
        {...props}
      />
    </View>
  )
}

export default AuthInput

const styles = StyleSheet.create({
  input: {
    // width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    ...font.NotoSansKR_Regular,
    // fontSize: 16,
    // height: 42,

    // backgroundColor: 'orange',
    lineHeight: 24,
    padding: 30,
    margin: 0,
    // paddingTop:
    // paddingBottom: 12,
  },
})
