import React, {useRef, useEffect} from 'react'
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from 'components/auth/AuthNextButton'
import {font} from 'shared/styles'

type EmailAuthProps = {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  authCode: string
  handleEmailAuthChange: (text: string) => void
  handleEmailAuthClick: () => void
  timeLeft: number
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
}

const EmailAuth = ({id, setId, authCode, handleEmailAuthChange, handleEmailAuthClick, timeLeft, setTimeLeft}: EmailAuthProps) => {
  const resendBtnRef = useRef(null)

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

  //이메일 인증 코드 3분 제한 관련
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <AuthInput onChangeText={id => setId(id)} value={id} editable={false} style={styles.idInput} />
        <View style={styles.authContainer}>
          <View style={styles.authInputContainer}>
            <AuthInput
              placeholder={'인증번호'}
              onChangeText={handleEmailAuthChange}
              value={authCode}
              maxLength={10}
              style={styles.textAuthInput}
              keyboardType="number-pad"
            />
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
      <AuthNextButton onPress={handleEmailAuthClick} buttonText={'다음'} />
    </View>
  )
}

export default EmailAuth

const styles = StyleSheet.create({
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
  idInput: {
    color: '#666',
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
    color: '#FFF',
    ...font.NotoSansKR_Regular,
  },
})
