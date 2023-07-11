import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native'
import {Images} from 'assets'
import {font} from 'shared/styles'
import AuthInput from 'components/auth/AuthInput'

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
        <AuthInput placeholder={'아이디(이메일)'} value={id} editable={false} />
        <View style={styles.microcopyContainer}>
          <TouchableOpacity style={styles.cautionIcon}>
            <Image source={Images.caution_icon_gray} />
          </TouchableOpacity>
          <Text style={styles.microcopy}>{microcopy}</Text>
        </View>
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity style={styles.findPwBtn} onPress={handleFindPwClick}>
          <Text style={styles.findPwBtnTxt}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLoginClick}>
          <Text style={styles.loginBtnTxt}>로그인 하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginContent

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
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
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  findPwBtn: {
    height: 48,
    backgroundColor: '#FFFFFF',
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  findPwBtnTxt: {
    fontSize: 18,
    color: '#000000',
    ...font.NotoSansKR_Medium,
  },
  loginBtn: {
    height: 48,
    backgroundColor: '#000000',
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  loginBtnTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    ...font.NotoSansKR_Medium,
  },
})
