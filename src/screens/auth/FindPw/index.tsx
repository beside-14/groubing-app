import React, {useState} from 'react'
import {StyleSheet, View, SafeAreaView, Text, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native'

import {useRoutes} from 'hooks/useRoutes'
import {font} from 'shared/styles'
import EmailCheck from 'components/auth/EmailCheck'
import NoneId from 'components/auth/NoonId'
import FindPwContent from './contents/FindPwContent'
import LoginContent from './contents/LoginContent'
import EmailAuth from './contents/EmailAuth'
import {emailValidate, passwordValidate} from 'utils/validate'
import {fetchFindEmail, fetchChangePassword} from 'hooks/auth'

const FindPwScreen = () => {
  const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [headline, setHeadline] = useState('등록된 회원 정보로\n비밀번호를 찾으실 수 있습니다.')
  const [emojiTxt, setEmojiTxt] = useState('입력하신 정보와\n일치하는 아이디가 없습니다.')
  const [microcopy, setMicrocopy] = useState('')

  const [authCode, setAuthCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(180) // 180초 = 3분

  const [showEmail, setShowEmail] = useState(true)
  const [showFindId, setShowFindId] = useState(false)
  const [showEmailAuth, setShowEmailAuth] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const {navigate} = useRoutes()

  async function handleFindId() {
    if (email.trim() === '') {
      setMicrocopy('아이디가 입력되지 않았습니다.')
      return
    } else if (!emailValidate(email)) {
      setMicrocopy('올바른 이메일 형식이 아닙니다. 다시 입력해주세요.')
      return
    }
    try {
      // findId api 로직
      const data = await fetchFindEmail({email: email})
      setShowEmail(false)
      setShowEmailAuth(true)
      setHeadline('입력하신 이메일 주소로\n인증번호를 발송했습니다.')
      setUserId(data?.id)
    } catch (error) {
      setShowFindId(true)
      setHeadline('')
    }
  }

  const handleFindIdClick = () => {
    setMicrocopy('')
    navigate('FindId')
  }

  const handleLoginClick = () => {
    navigate('Login')
  }

  const handleFindPwClick = async () => {
    if (!userId) return
    if (!password || !confirmPassword) {
      setMicrocopy('비밀번호가 입력되지 않았습니다.')
      return
    } else if (password !== confirmPassword) {
      setMicrocopy('비밀번호가 일치하지 않습니다.')
      return
    } else if (!passwordValidate(password)) {
      setMicrocopy('8~20자 이내 영문 대소문자, 숫자, 특수문자')
      return
    }
    try {
      await fetchChangePassword({id: userId, password: password})
      setShowPassword(false)
      setShowLogin(true)
      setHeadline('')
      setEmojiTxt('비밀번호가 변경되었습니다.')
    } catch (error) {
      console.error('change password error', error)
      navigate('Login')
    }
  }

  const handleEmailAuthClick = () => {
    setShowEmailAuth(false)
    setShowPassword(true)
    setHeadline('비밀번호를 재설정해주세요.')
    setMicrocopy('')
  }

  const handleEmailAuthChange = (text: string) => {
    setAuthCode(text)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
          <View style={styles.container}>
            <Text style={styles.headline}>{headline}</Text>

            {/* 이메일 입력 컴포넌트 */}
            {showEmail ? <EmailCheck id={email} setId={setEmail} handleFindId={handleFindId} microcopy={microcopy} /> : null}

            {/* 아이디찾기 컴포넌트 */}
            {showFindId ? <NoneId guideText={emojiTxt} buttonText={'아이디 찾기'} handleButtonClick={handleFindIdClick} /> : null}

            {/* 이메일 인증 컴포넌트 */}
            {showEmailAuth ? (
              <EmailAuth
                id={email}
                authCode={authCode}
                handleEmailAuthChange={handleEmailAuthChange}
                handleEmailAuthClick={handleEmailAuthClick}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
              />
            ) : null}

            {/* 패스워드 입력 컴포넌트 */}
            {showPassword ? (
              <FindPwContent
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                handleFindPwClick={handleFindPwClick}
                microcopy={microcopy}
              />
            ) : null}

            {/* 로그인 컴포넌트 */}
            {showLogin ? <LoginContent text={emojiTxt} handleLoginClick={handleLoginClick} /> : null}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default FindPwScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 66,
    height: '100%',
  },
  headline: {
    fontSize: 20,
    ...font.NotoSansKR_Medium,
    marginBottom: 24,
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
  },
})
