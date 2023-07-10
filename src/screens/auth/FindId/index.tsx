import React, {useState} from 'react'
import {StyleSheet, View, SafeAreaView, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native'
import {useRoutes} from 'hooks/useRoutes'
import {font} from 'shared/styles'
import { FindIdContent, SignUpContent, LoginContent } from './contents'

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
        <View style={styles.container}>
          <Text style={styles.headline}>{headline}</Text>

          {/* 아이디 찾기 컴포넌트 */}
          {showFindId ? <FindIdContent id={id} setId={setId} handleFindId={handleFindId} /> : null}

          {/* 회원가입 컴포넌트 */}
          {showSignUp ? <SignUpContent emojiTxt={emojiTxt} handleSignUpClick={handleSignUpClick} />: null}

          {/* 로그인 컴포넌트 */}
          {showLogin ? <LoginContent id={id} microcopy={microcopy} handleFindPwClick={handleFindPwClick} handleLoginClick={handleLoginClick} /> : null}
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
})
