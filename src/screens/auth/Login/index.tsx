// import { login } from "../../utils/AuthUtil";
import {useIsLogged} from 'hooks/useIsLogged'
import React, {useState} from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import {Images} from 'assets'
import {useRoutes} from 'hooks/useRoutes'
import {font} from 'shared/styles'
import {emailValidate, passwordValidate} from 'utils/validate'
import LoginInput from './contents/LoginInput'
import {fetchEmailLogin} from 'hooks/auth'
import {setToken} from 'utils/asyncStorage'
import Kakao from './contents/Kakao'

const LoginScreen = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [microcopyId, setMicrocopyId] = useState('')
  const [microcopyPw, setMicrocopyPw] = useState('')
  const {navigate} = useRoutes()
  const {login} = useIsLogged()

  async function handleLogin() {
    setMicrocopyId('')
    setMicrocopyPw('')

    if (id.trim() === '') {
      setMicrocopyId('아이디가 입력되지 않았습니다.')
    } else if (pw.trim() === '') {
      setMicrocopyPw('비밀번호가 입력되지 않았습니다.')
    } else if (!emailValidate(id)) {
      setMicrocopyId('올바른 이메일 형식이 아닙니다. 다시 입력해주세요.')
    } else if (!passwordValidate(pw)) {
      setMicrocopyPw('8~20자 이내 영문 대소문자, 숫자, 특수문자')
    } else {
      try {
        const {email, token} = await fetchEmailLogin({email: id, password: pw})
        await setToken(token)
        login()
      } catch (error) {
        console.error('login error', error)
        // TODO: 에러 처리. 아이디 또는 비밀번호 잘못 입력했을 때.
      }
    }
  }

  const handleFindIdClick = () => {
    navigate('FindId')
  }

  const handleFindPwClick = () => {
    navigate('FindPw')
  }

  const handleSignUpClick = () => {
    navigate('SignUp')
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.mainText}>GROUBING</Text>
          <Text style={styles.subText}>우리 모두 그루버해요!</Text>

          <View style={styles.formContainer}>
            <LoginInput value={id} setValue={setId} microcopy={microcopyId} placeholder={'아이디(이메일)'} isEmail />
            <LoginInput value={pw} setValue={setPw} microcopy={microcopyPw} placeholder={'비밀번호'} inputStyle={styles.textInputPw} />
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnTxt}>로그인</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handleFindIdClick}>
                <Text style={styles.subBtnTxt}>아이디 찾기</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity onPress={handleFindPwClick}>
                <Text style={styles.subBtnTxt}>비밀번호 찾기</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity onPress={handleSignUpClick}>
                <Text style={styles.subBtnTxt}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.snsText}>SNS 계정으로 로그인하기</Text>

          <View style={styles.snsBtnContainer}>
            <TouchableOpacity style={styles.snsBtn} onPress={() => Alert.alert('준비 중입니다.')}>
              <Image source={Images.google_icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snsBtn} onPress={() => Alert.alert('준비 중입니다.')}>
              <Image source={Images.apple_icon} />
            </TouchableOpacity>
            <Kakao />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  mainText: {
    fontStyle: 'normal',
    fontSize: 40,
    letterSpacing: 1.6,
    textAlign: 'center',
    color: '#3A8ADB',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    marginTop: 110,
    ...font.Montserrat_ExtraBold,
  },
  subText: {
    fontStyle: 'normal',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.64,
    color: '#3A8ADB',
    ...font.NotoSansKR_Regular,
  },
  formContainer: {
    marginTop: 131,
    width: '100%',
    paddingHorizontal: 20,
  },

  textInputPw: {
    marginTop: 12,
  },

  loginBtn: {
    marginTop: 24,
    backgroundColor: '#3A8ADB',
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginBtnTxt: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    ...font.NotoSansKR_Medium,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  subBtnTxt: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    ...font.NotoSansKR_Regular,
  },
  line: {
    width: 1,
    height: 13,
    backgroundColor: '#DDD',
    marginHorizontal: 12,
  },
  snsText: {
    fontStyle: 'normal',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 120,
    ...font.NotoSansKR_Regular,
  },
  snsBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  snsBtn: {
    marginHorizontal: 6,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 99,
  },
})
