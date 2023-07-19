import React, {useState} from 'react'
import {StyleSheet, View, SafeAreaView, Text, KeyboardAvoidingView, Platform, Alert, Keyboard, TouchableWithoutFeedback} from 'react-native'

// 사용 시 에러 발생. 직접 만들어야 할듯.
// import { CheckBox } from "react-native-elements";
import StepBar from 'components/bingo/create/StepBar'

import {useRoutes} from 'hooks/useRoutes'
import {font} from 'shared/styles'
import {useAuth} from 'hooks/useIsLogged'
import Email from './contents/Email'
import EmailAuth from './contents/EmailAuth'
import FindPwContent from './contents/FindPwContent'
import Agree from './contents/Agree'
import Nickname from './contents/Nickname'
import {passwordValidate, emailValidate} from 'utils/validate'

const SignUpScreen = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [headline, setHeadline] = useState('아이디(이메일)를 입력해주세요.')
  const [nickname, setNickname] = useState('')

  const [showEmail, setShowEmail] = useState(true)
  const [showEmailAuth, setShowEmailAuth] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showAgreement, setShowAgreement] = useState(false)
  const [showNickname, setShowNickname] = useState(false)

  const [authCode, setAuthCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  const [terms1, setTerms1] = useState(false)
  const [terms2, setTerms2] = useState(false)
  const [nowStep, setNowStep] = useState(1)

  const [errorMessage, setErrorMessage] = useState('')
  const [microcopy, setMicrocopy] = useState('')

  const {navigate} = useRoutes()
  const {changeNavigationStack} = useAuth()

  async function handleSignUp() {
    //비밀번호 형식 체크
    // if (validatePassword(password)) {
    //   setErrorMessage(
    //     "Password must be at least 8 characters, one number, one lowercase."
    //   );
    //   alert("Password validation", errorMessage);
    //   return;
    // }

    //확인용 비밀번호와 비밀번호의 일치 체크
    // if (password != confirmPassword) {
    //   setErrorMessage("Passwords do not match. Please check back.");
    //   alert("Confirm password", errorMessage);
    //   return;
    // }

    //이메일 유효성 체크
    // if (!validateEmail(email)) {
    //   setErrorMessage("Please check Email address format.");
    //   alert("Email validation", errorMessage);
    //   return;
    // }
    setErrorMessage('')

    if (errorMessage === '') {
      try {
        // login api 로직
        // const response = await signUp(userInfo);
        // console.log(response);
        // if (response == "success") {
        //   // 회원가입 성공
        //   navigation.navigate("Nickname");
        // } else {
        //   // 회원가입 실패
        // }
        //회원가입 성공 시 닉네임 설정 화면 이동
        // navigate('Home')
        changeNavigationStack()
      } catch (error) {
        console.log(error)
        Alert.alert('회원가입 실패', '서버와의 연결이 원활하지 않습니다.')
      }
    }
  }

  const handleEmailClick = () => {
    if (!emailValidate(id)) {
      setMicrocopy('올바른 이메일 형식이 아닙니다. 다시 입력해주세요.')
    } else {
      setShowEmailAuth(true)
      setShowEmail(false)
      setHeadline('입력하신 이메일 주소로\n인증 번호를 발송하였습니다.')
      setNowStep(nowStep + 1)
    }
  }

  const handleEmailAuthChange = (text: string) => {
    setAuthCode(text)
  }

  const handleEmailAuthClick = () => {
    setShowEmailAuth(false)
    setShowPassword(true)
    setHeadline('비밀번호를 입력해주세요.')
    setNowStep(nowStep + 1)
  }

  const handleFindPwClick = () => {
    setShowPassword(false)
    setShowAgreement(true)
    setHeadline('약관 동의')
    setNowStep(nowStep + 1)
  }

  const handleAgrreClick = () => {
    setShowAgreement(false)
    setShowNickname(true)
    setHeadline('')
    setNowStep(nowStep + 1)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
          <View style={styles.stepBarContainer}>
            <StepBar step={5} now={nowStep} />
          </View>

          <View style={styles.container}>
            {headline ? <Text style={styles.headline}>{headline}</Text> : null}

            {/* 이메일 입력 컴포넌트 */}
            {showEmail ? <Email id={id} setId={setId} microcopy={microcopy} handleEmailClick={handleEmailClick} /> : null}

            {/* 이메일 인증 컴포넌트 */}
            {showEmailAuth ? (
              <EmailAuth
                id={id}
                setId={setId}
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
                microcopy={microcopy}
                handleFindPwClick={handleFindPwClick}
              />
            ) : null}

            {/* 약관동의 컴포넌트 */}
            {showAgreement ? <Agree handleAgreeClick={handleAgrreClick} /> : null}

            {/* 닉네임 컴포넌트 */}
            {showNickname ? <Nickname nickname={nickname} setNickname={setNickname} handleSignUp={handleSignUp} /> : null}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
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
  stepBarContainer: {
    marginTop: 40,
    width: 150,
    marginHorizontal: 20,
    marginBottom: 33,
  },
})
