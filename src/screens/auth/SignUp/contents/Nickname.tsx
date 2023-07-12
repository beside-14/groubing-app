import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from 'components/auth/AuthNextButton'
import {font} from 'shared/styles'

type NicknameProps = {
  nickname: string
  setNickname: React.Dispatch<React.SetStateAction<string>>
  handleSignUp: () => void
}

const Nickname = ({nickname, setNickname, handleSignUp}: NicknameProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>만나서 반가워요!</Text>
        <Text style={styles.welcomeSubTitle}>
          GROUBING에서 사용할 닉네임을
          {'\n'}입력해주세요.
        </Text>
        <AuthInput placeholder={'닉네임'} onChangeText={nickname => setNickname(nickname)} value={nickname} style={styles.pwInput} />
      </View>
      <AuthNextButton onPress={handleSignUp} buttonText={'시작하기'} />
    </View>
  )
}

export default Nickname

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    flex: 1,
  },
  pwInput: {
    borderBottomColor: '#000000',
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
})
