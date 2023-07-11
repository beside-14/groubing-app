import React, {useState} from 'react'
import {StyleSheet, View, SafeAreaView, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native'

import {useRoutes} from 'hooks/useRoutes'
import {font} from 'shared/styles'
import EmailCheck from 'components/auth/EmailCheck'
import NoneId from 'components/auth/NoonId'
import FindPwContent from './contents/FindPwContent'
import LoginContent from './contents/LoginContent'
import EmailAuth from './contents/EmailAuth'

const FindPwScreen = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [headline, setHeadline] = useState('등록된 회원 정보로\n비밀번호를 찾으실 수 있습니다.')
  const [emojiTxt, setEmojiTxt] = useState('입력하신 정보와\n일치하는 아이디가 없습니다.')
  const [microcopy, setMicrocopy] = useState('개인정보보호를 위해 아이디 뒷자리는 ***로 표시됩니다.')

  const [authCode, setAuthCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(180) // 180초 = 3분

  const [showEmail, setShowEmail] = useState(true)
  const [showFindId, setShowFindId] = useState(false)
  const [showEmailAuth, setShowEmailAuth] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const {navigate} = useRoutes()

  async function handleFindId() {
    try {
      // findId api 로직

      // const response = await findId(id);
      // console.log(response);
      // if (response == "success") {
      //   // 아이디 찾기 성공
      //   navigation.navigate("Nickname");
      // } else {
      //   // 아이디 찾기 실패
      // }

      //navigation.navigate("Home");

      setShowEmail(false)

      //setShowFindId(true);
      //setHeadline("");

      setShowEmailAuth(true)
      setHeadline('입력하신 이메일 주소로\n인증번호를 발송했습니다.')
    } catch (error) {
      console.log(error)
      Alert.alert('아이디 찾기 실패', '서버와의 연결이 원활하지 않습니다.')
    }
  }

  const handleFindIdClick = () => {
    navigate('FindId')
  }

  const handleLoginClick = () => {
    navigate('Login')
  }

  const handleFindPwClick = () => {
    setShowPassword(false)
    setShowLogin(true)
    setHeadline('')
    setEmojiTxt('비밀번호가 변경되었습니다.')
  }

  const handleEmailAuthClick = () => {
    setShowEmailAuth(false)
    setShowPassword(true)
    setHeadline('비밀번호를 재설정해주세요.')
  }

  const handleEmailAuthChange = (text: string) => {
    setAuthCode(text)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
        <View style={styles.container}>
          <Text style={styles.headline}>{headline}</Text>

          {/* 이메일 입력 컴포넌트 */}
          {showEmail ? <EmailCheck id={id} setId={setId} handleFindId={handleFindId} /> : null}

          {/* 아이디찾기 컴포넌트 */}
          {showFindId ? <NoneId guideText={emojiTxt} buttonText={'아이디 찾기'} handleButtonClick={handleFindIdClick} /> : null}

          {/* 이메일 인증 컴포넌트 */}
          {showEmailAuth ? (
            <EmailAuth
              id={id}
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
            />
          ) : null}

          {/* 로그인 컴포넌트 */}
          {showLogin ? <LoginContent text={emojiTxt} handleLoginClick={handleLoginClick} /> : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default FindPwScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 12,
    height: '100%',
  },
  headline: {
    fontSize: 24,
    ...font.NotoSansKR_Medium,
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
  },
})
