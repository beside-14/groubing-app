import React, {useState, useEffect} from 'react'
import {StyleSheet, View, SafeAreaView, TextInput, Text, KeyboardAvoidingView, Platform, Image, StatusBar, Alert} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Images} from 'assets'
import {useRoutes} from 'hooks/useRoutes'
import CustomInput from 'components/common/CustomInput'
import {font} from 'shared/styles'

const FindId = () => {
  const [id, setId] = useState('')
  const [headline, setHeadline] = useState('등록된 회원 정보로\n아이디를 찾으실 수 있습니다.')
  const [emojiTxt, setEmojiTxt] = useState('입력하신 정보와\n일치하는 아이디가 없습니다.')
  const [microcopy, setMicrocopy] = useState('개인정보보호를 위해 아이디 뒷자리는 ***로 표시됩니다.')

  const [showFindId, setShowFindId] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const {navigate} = useRoutes()

  const handleFindId = async () => {
    try {
      // findId api 로직

      // const response = await findId(id);
      // console.log(response);
      // if (response == "success") {
      //   // 아이디 찾기 성공
      //   navigate("Nickname");
      // } else {
      //   // 아이디 찾기 실패
      // }

      //navigate("Home");

      setShowFindId(false)
      //setShowSignUp(true);
      //setHeadline("");
      setShowLogin(true)
      setHeadline('입력하신 정보와\n일치하는 아이디 정보입니다.')
    } catch (error) {
      console.log(error)
      Alert.alert('아이디 찾기 실패', '서버와의 연결이 원활하지 않습니다.')
    }
  }

  const handleFindPwClick = () => {
    navigate('FindPw')
  }

  const handleLoginClick = () => {
    navigate('Login')
  }

  const handleSignUpClick = () => {
    navigate('SignUp')
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardContainer}>
        <StatusBar hidden={true} />

        <View style={styles.container}>
          <Text style={styles.headline}>{headline}</Text>

          {/* 아이디 찾기 컴포넌트 */}
          {showFindId ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <CustomInput placeholder={'아이디(이메일)'} onChangeText={id => setId(id)} value={id} />
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={handleFindId}>
                  <Text style={styles.nextBtnTxt}>다음</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 회원가입 컴포넌트 */}
          {showSignUp ? (
            <View style={styles.bodyContainer}>
              <View style={styles.emojiContainer}>
                <Image source={Images.emoji_01} style={styles.emoji} />
                <Text style={styles.emojiTxt}>{emojiTxt}</Text>
              </View>
              <View style={styles.nextBtnContainer}>
                <TouchableOpacity style={styles.nextBtn} onPress={handleSignUpClick}>
                  <Text style={styles.nextBtnTxt}>회원가입 하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* 로그인 컴포넌트 */}
          {showLogin ? (
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <CustomInput placeholder={'아이디(이메일)'} value={id} editable={false} />
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
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default FindId

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
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    flex: 1,
  },
  textInputContainer: {
    width: '100%',
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
    textAlign: 'center',
    marginTop: 15,
    ...font.NotoSansKR_Medium,
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
