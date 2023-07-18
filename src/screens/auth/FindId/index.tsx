import React, {useState} from 'react'
import {StyleSheet, View, SafeAreaView, Text, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {useRoutes} from 'hooks/useRoutes'
import {font} from 'shared/styles'
import LoginContent from './contents/LoginContent'
import EmailCheck from 'components/auth/EmailCheck'
import NoneId from 'components/auth/NoonId'
import {emailValidate} from 'utils/validate'
import {fetchFindEmail} from 'hooks/auth'

const defaultMicrocopy = '개인정보보호를 위해 아이디 뒷자리는 ***로 표시됩니다.'

const FindIdScreen = () => {
  const [id, setId] = useState('')
  const [headline, setHeadline] = useState('등록된 회원 정보로\n아이디를 찾으실 수 있습니다.')
  const [emojiTxt, setEmojiTxt] = useState('입력하신 정보와\n일치하는 아이디 정보가 없습니다.')
  const [microcopy, setMicrocopy] = useState('')

  const [showFindId, setShowFindId] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const {navigate} = useRoutes()

  const handleFindId = async () => {
    if (id.trim() === '') {
      setMicrocopy('아이디가 입력되지 않았습니다.')
      return
    } else if (!emailValidate(id)) {
      setMicrocopy('올바른 이메일 형식이 아닙니다. 다시 입력해주세요.')
      return
    }
    try {
      const {email} = await fetchFindEmail({email: id})
      setShowFindId(false)
      setShowLogin(true)
      setHeadline('입력하신 정보와\n일치하는 아이디 정보입니다.')
    } catch (error) {
      setShowFindId(false)
      setShowSignUp(true)
      setHeadline('')
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
          <View style={styles.container}>
            <Text style={styles.headline}>{headline}</Text>

            {/* 아이디 찾기 컴포넌트 */}
            {showFindId ? <EmailCheck id={id} setId={setId} handleFindId={handleFindId} microcopy={microcopy} /> : null}
            {/* 회원가입 컴포넌트 */}
            {showSignUp ? <NoneId guideText={emojiTxt} buttonText={'회원가입 하기'} handleButtonClick={handleSignUpClick} /> : null}

            {/* 로그인 컴포넌트 */}
            {showLogin ? (
              <LoginContent id={id} microcopy={defaultMicrocopy} handleFindPwClick={handleFindPwClick} handleLoginClick={handleLoginClick} />
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default FindIdScreen

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
