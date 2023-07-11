import React from 'react'
import {View, StyleSheet} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from 'components/auth/AuthNextButton'

type FindPwContentProps = {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
  handleFindPwClick: () => void
}

const FindPwContent = ({password, setPassword, confirmPassword, setConfirmPassword, handleFindPwClick}: FindPwContentProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <AuthInput placeholder={'비밀번호'} onChangeText={pwd => setPassword(pwd)} value={password} secureTextEntry />
        <AuthInput
          placeholder={'비밀번호 확인'}
          onChangeText={pwd => setConfirmPassword(pwd)}
          value={confirmPassword}
          secureTextEntry
          style={styles.pwInput}
        />
      </View>
      <AuthNextButton onPress={handleFindPwClick} buttonText={'다음'} />
    </View>
  )
}

export default FindPwContent

const styles = StyleSheet.create({
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
  pwInput: {
    marginTop: 10,
  },
})
