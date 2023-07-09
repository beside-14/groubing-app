import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, SafeAreaView, Image, TextInput, Text, KeyboardAvoidingView, Platform, StatusBar, Alert} from 'react-native'
import {validateEmail, validatePassword} from 'utils/stringUtils'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

// 사용 시 에러 발생. 직접 만들어야 할듯.
// import { CheckBox } from "react-native-elements";
import StepBar from 'components/bingo/create/StepBar'

import {Images} from 'assets'
import {useRoutes} from 'hooks/useRoutes'
import CustomInput from 'components/common/CustomInput'
import {font} from 'shared/styles'
import {useAuth} from 'hooks/useAuth'

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
  const [timeLeft, setTimeLeft] = useState(5) // 180초 = 3분

  const [terms1, setTerms1] = useState(false)
  const [terms2, setTerms2] = useState(false)
  const [nowStep, setNowStep] = useState(1)

  const [errorMessage, setErrorMessage] = useState('')
  const [microcopy, setMicrocopy] = useState('')

  const resendBtnRef = useRef(null)
  const {navigate} = useRoutes()
  const {changeNavigationStack} = useAuth()

  async function handleSignUp() {
    const userInfo = {id, password}
    console.log('Signed up : ', userInfo)

    // if (id === "" || password === "" || confirmPassword == "") {
    //   setErrorMessage("Please fill out all fields");
    //   console.log(errorMessage);
    //   alert("Form Check", errorMessage);
    //   return;
    // }

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

  //이메일 인증 코드 3분 제한 관련
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    if (time <= 0) {
      //재발송 버튼 활성화
      //resendBtnRef.current.disabled = false;
      return ''
    } else {
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
  }

  const handleChange = (text: string) => {
    setAuthCode(text)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardContainer}>
        <StatusBar hidden={true} />
        <View style={styles.stepBarContainer}>
          <StepBar step={5} now={nowStep} />
        </View>

        <View style={styles.container}>
          {headline ? <Text style={styles.headline}>{headline}</Text> : null}

          {/* 이메일 입력 컴포넌트 */}
          {showEmail ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <CustomInput placeholder={'아이디(이메일)'} onChangeText={id => setId(id)} value={id} />
                <View style={styles.microcopyContainer}>
                  {microcopy ? (
                    <>
                      <TouchableOpacity style={styles.cautionIcon}>
                        <Image source={Images.caution_icon} />
                      </TouchableOpacity>
                      <Text style={styles.microcopy}>{microcopy}</Text>
                    </>
                  ) : null}
                </View>
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={() => {
                    setShowEmailAuth(true)
                    setShowEmail(false)
                    setHeadline('입력하신 이메일 주소로\n인증 번호를 발송하였습니다.')
                    setNowStep(nowStep + 1)
                  }}>
                  <Text style={styles.nextBtnTxt}>다음</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 이메일 인증 컴포넌트 */}
          {showEmailAuth ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <CustomInput placeholder={'아이디(이메일)'} onChangeText={id => setId(id)} value={id} editable={false} />
                <View style={styles.authContainer}>
                  <View style={styles.authInputContainer}>
                    <CustomInput placeholder={'인증번호'} onChangeText={handleChange} value={authCode} maxLength={10} style={styles.textAuthInput} />
                    <Text style={styles.authTime}>{formatTime(timeLeft)}</Text>
                  </View>
                  <View style={styles.resendBtnContainer}>
                    <TouchableOpacity
                      ref={resendBtnRef}
                      style={styles.resendBtn}
                      onPress={() => {
                        //재발송 로직
                        setTimeLeft(180)
                      }}
                      disabled>
                      <Text style={styles.resendBtnTxt}>재발송</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={() => {
                    setShowEmailAuth(false)
                    setShowPassword(true)
                    setHeadline('비밀번호를 입력해주세요.')
                    setNowStep(nowStep + 1)
                  }}>
                  <Text style={styles.nextBtnTxt}>다음</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 패스워드 입력 컴포넌트 */}
          {showPassword ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <CustomInput
                  placeholder={'비밀번호'}
                  onChangeText={pwd => setPassword(pwd)}
                  value={password}
                  secureTextEntry
                  style={styles.pwInput}
                />
                <View style={styles.microcopyContainer}>
                  {microcopy ? (
                    <TouchableOpacity style={styles.cautionIcon}>
                      <Image source={Images.caution_icon} />
                    </TouchableOpacity>
                  ) : null}
                  {microcopy ? <Text style={styles.microcopy}>{microcopy}</Text> : null}
                </View>

                <CustomInput
                  placeholder={'비밀번호 확인'}
                  onChangeText={pwd => setConfirmPassword(pwd)}
                  value={confirmPassword}
                  secureTextEntry
                  style={styles.pwInput2}
                />
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={() => {
                    setShowPassword(false)
                    setShowAgreement(true)
                    setHeadline('약관 동의')
                    setNowStep(nowStep + 1)
                  }}>
                  <Text style={styles.nextBtnTxt}>다음</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 약관동의 컴포넌트 */}
          {showAgreement ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <View style={styles.checkBoxContainer}>
                  {/* <CheckBox
                    checked={terms1}
                    onPress={() => setTerms1(!terms1)}
                    style={styles.checkBox}
                    checkedIcon={<Image source={Images.icon_checked} />}
                    uncheckedIcon={<Image source={Images.icon_unchecked} />}
                  /> */}
                  <Text style={styles.checkBoxTxt}>
                    <Text style={styles.linkText} onPress={() => Alert.alert('이용약관')}>
                      이용약관
                    </Text>
                    에 동의합니다. (필수)
                  </Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  {/* <CheckBox
                    checked={terms2}
                    onPress={() => setTerms2(!terms2)}
                    checkedIcon={<Image source={Images.icon_checked} />}
                    uncheckedIcon={<Image source={Images.icon_unchecked} />}
                  /> */}
                  <Text style={styles.checkBoxTxt}>
                    <Text style={styles.linkText} onPress={() => Alert.alert('개인정보 처리방침')}>
                      개인정보 처리방침
                    </Text>
                    에 동의합니다. (필수)
                  </Text>
                </View>
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={() => {
                    setShowAgreement(false)
                    setShowNickname(true)
                    setHeadline('')
                    setNowStep(nowStep + 1)
                  }}>
                  <Text style={styles.nextBtnTxt}>다음</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 닉네임 컴포넌트 */}
          {showNickname ? (
            <View style={styles.bodyContainer}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>만나서 반가워요!</Text>
                <Text style={styles.welcomeSubTitle}>
                  GROUBING에서 사용할 닉네임을
                  {'\n'}입력해주세요.
                </Text>
                <CustomInput placeholder={'닉네임'} onChangeText={nickname => setNickname(nickname)} value={nickname} style={styles.pwInput} />
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={() => {
                    handleSignUp()
                  }}>
                  <Text style={styles.nextBtnTxt}>시작하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUpScreen

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
  bodyContainer: {
    marginTop: 15,
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
    color: '#FF3C3C',
    fontSize: 16,
    ...font.NotoSansKR_Regular,
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
  },
  nextBtnContainer: {
    width: '100%',
    marginBottom: 13,
  },
  nextBtn: {
    height: 48,
    backgroundColor: '#000000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  nextBtnTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    ...font.NotoSansKR_Medium,
  },
  authContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  authInputContainer: {
    height: 48,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  textAuthInput: {
    width: '80%',
    borderBottomWidth: 0,
  },
  authTime: {
    width: '20%',
    color: '#000000',
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 5,
    ...font.NotoSansKR_Regular,
  },
  resendBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  resendBtn: {
    height: 48,
    backgroundColor: '#DDDDDD',
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  resendBtnTxt: {
    fontSize: 14,
    color: '#F3F3F3',
    ...font.NotoSansKR_Regular,
  },
  pwInput: {
    borderBottomColor: '#000000',
  },
  pwInput2: {
    marginTop: 10,
  },
  welcomeTitle: {
    fontSize: 42,
    ...font.NotoSansKR_Medium,
  },
  welcomeSubTitle: {
    fontSize: 22,
    fontStyle: 'normal',
    color: '#666666',
    marginBottom: 150,
    ...font.NotoSansKR_Regular,
  },
  welcomeContainer: {
    width: '100%',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkBox: {
    marginLeft: 0,
  },
  checkBoxTxt: {
    fontSize: 20,
    color: '#000000',
    ...font.NotoSansKR_Regular,
  },
  linkText: {
    fontSize: 20,
    color: '#000000',
    textDecorationLine: 'underline',
    ...font.NotoSansKR_Regular,
  },
  stepBarContainer: {
    marginTop: 40,
    width: 150,
    marginHorizontal: 12,
    marginBottom: 20,
  },
})
