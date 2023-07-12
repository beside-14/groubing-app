import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from 'components/auth/AuthNextButton'
import {Images} from 'assets'
import {font} from 'shared/styles'

type FindPwContentProps = {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
  microcopy: string
  handleFindPwClick: () => void
}

const FindPwContent = ({password, setPassword, confirmPassword, setConfirmPassword, microcopy, handleFindPwClick}: FindPwContentProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <AuthInput placeholder={'비밀번호'} onChangeText={pwd => setPassword(pwd)} value={password} secureTextEntry style={styles.pwInput} />
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

        <AuthInput
          placeholder={'비밀번호 확인'}
          onChangeText={pwd => setConfirmPassword(pwd)}
          value={confirmPassword}
          secureTextEntry
          style={styles.pwInput2}
        />
      </View>
      <AuthNextButton onPress={handleFindPwClick} buttonText={'다음'} />
    </View>
  )
}

export default FindPwContent

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
  pwInput: {
    borderBottomColor: '#000000',
  },
  pwInput2: {
    marginTop: 10,
  },
})
