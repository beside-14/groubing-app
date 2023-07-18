import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native'
import {Images} from 'assets'
import {font} from 'shared/styles'
import AuthInput from 'components/auth/AuthInput'
import Microcopy from 'components/auth/Microcopy'
import {maskEmail} from 'utils/stringUtils'

type LoginContentProps = {
  id: string
  microcopy: string
  handleFindPwClick: () => void
  handleLoginClick: () => void
}

const LoginContent = ({id, microcopy, handleFindPwClick, handleLoginClick}: LoginContentProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <AuthInput placeholder={'아이디(이메일)'} value={maskEmail(id)} editable={false} />
        <Microcopy microcopy={microcopy} isError={false} />
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity style={[styles.findPwBtn, styles.button]} onPress={handleFindPwClick}>
          <Text style={[styles.findPwBtnTxt, styles.button_text]}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginBtn, styles.button]} onPress={handleLoginClick}>
          <Text style={[styles.loginBtnTxt, styles.button_text]}>로그인 하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginContent

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  textInputContainer: {
    width: '100%',
  },
  microcopyContainer: {
    marginTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cautionIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 8,
  },
  microcopy: {
    color: '#A6A6A6',
    fontSize: 16,
    ...font.NotoSansKR_Regular,
  },
  loginBtnContainer: {
    width: '100%',
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    flexGrow: 1,
    flex: 1,
    width: '100%',
  },
  button_text: {
    ...font.NotoSansKR_Medium,
    fontSize: 14,
  },
  findPwBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    marginRight: 6,
  },
  findPwBtnTxt: {
    color: '#000000',
  },
  loginBtn: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  loginBtnTxt: {
    color: '#FFFFFF',
  },
})
