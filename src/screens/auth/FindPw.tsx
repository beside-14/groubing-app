import React, {useState, useEffect} from 'react'
import {StyleSheet, View, SafeAreaView, TextInput, Text, KeyboardAvoidingView, Platform, Image, StatusBar, Alert} from 'react-native'
import {validateEmail, validatePassword} from 'utils/StringUtils'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

import {Images} from 'assets'
import {useRoutes} from 'hooks/useRoutes'

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
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleChange = (text: string) => {
    setAuthCode(text)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardContainer}>
        <StatusBar hidden={true} />

        <View style={styles.container}>
          <Text style={styles.headline}>{headline}</Text>

          {/* 이메일 입력 컴포넌트 */}
          {showEmail ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <TextInput placeholder="아이디(이메일)" onChangeText={id => setId(id)} value={id} style={styles.textInput} />
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={handleFindId}>
                  <Text style={styles.nextBtnTxt}>다음</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 아이디찾기 컴포넌트 */}
          {showFindId ? (
            <View style={styles.bodyContainer}>
              <View style={styles.emojiContainer}>
                <Image source={Images.emoji_01} style={styles.emoji} />
                <Text style={styles.emojiTxt}>{emojiTxt}</Text>
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={() => navigate('FindId')}>
                  <Text style={styles.nextBtnTxt}>아이디 찾기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 이메일 인증 컴포넌트 */}
          {showEmailAuth ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <TextInput value={id} style={styles.textInput} editable={false} />
                <View style={styles.authContainer}>
                  <View style={styles.authInputContainer}>
                    <TextInput placeholder="인증번호" onChangeText={handleChange} value={authCode} maxLength={10} style={styles.textAuthInput} />
                    <Text style={styles.authTime}>{formatTime(timeLeft)}</Text>
                  </View>
                  <View style={styles.resendBtnContainer}>
                    <TouchableOpacity style={styles.resendBtn} disabled>
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
                    setHeadline('비밀번호를 재설정해주세요.')
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
                <TextInput placeholder="비밀번호" onChangeText={pwd => setPassword(pwd)} value={password} secureTextEntry={true} style={styles.pwInput} />
                <TextInput placeholder="비밀번호 확인" onChangeText={pwd => setConfirmPassword(pwd)} value={confirmPassword} secureTextEntry={true} style={styles.pwInput2} />
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={() => {
                    setShowPassword(false)
                    setShowLogin(true)
                    setHeadline('')
                    setEmojiTxt('비밀번호가 변경되었습니다.')
                  }}>
                  <Text style={styles.nextBtnTxt}>다음</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 로그인 컴포넌트 */}
          {showLogin ? (
            <View style={styles.bodyContainer}>
              <View style={styles.emojiContainer}>
                <Image source={Images.emoji_02} style={styles.emoji} />
                <Text style={styles.emojiTxt}>{emojiTxt}</Text>
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={() => navigate('Login')}>
                  <Text style={styles.nextBtnTxt}>로그인 하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
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
    fontWeight: '500',
    fontFamily: 'NotoSansKR_500Medium',
  },
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
  textInput: {
    height: 40,
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    fontFamily: 'NotoSansKR_400Regular',
    color: '#A6A6A6',
    fontSize: 18,
    paddingLeft: 5,
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
    fontFamily: 'NotoSansKR_500Medium',
    color: '#FFFFFF',
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
    height: 40,
    width: '80%',
    fontFamily: 'NotoSansKR_400Regular',
    color: '#A6A6A6',
    fontSize: 18,
    paddingLeft: 5,
  },
  authTime: {
    width: '20%',
    color: '#000000',
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 5,
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
    fontFamily: 'NotoSansKR_400Regular',
    color: '#F3F3F3',
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
    fontFamily: 'NotoSansKR_400Regular',
    color: '#A6A6A6',
    fontSize: 16,
  },
  pwInput: {
    height: 40,
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    fontFamily: 'NotoSansKR_400Regular',
    color: '#A6A6A6',
    fontSize: 18,
    paddingLeft: 5,
  },
  pwInput2: {
    marginTop: 10,
    height: 40,
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    fontFamily: 'NotoSansKR_400Regular',
    color: '#A6A6A6',
    fontSize: 18,
    paddingLeft: 5,
  },
  emojiContainer: {
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  emoji: {
    resizeMode: 'contain',
  },
  emojiTxt: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'NotoSansKR_500Medium',
    textAlign: 'center',
    marginTop: 15,
  },
})
