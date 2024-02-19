import React, {useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from 'components/auth/AuthNextButton'
import {font} from 'shared/styles'
import {useIsLogged} from 'hooks/useIsLogged'
import {getUserInfo, setUserInfo} from 'utils/asyncStorage'
import {API} from 'utils/axios'
import useUserInfo from 'hooks/useUserInfo'

const SocialNickname = () => {
  const [nickname, setNickname] = useState('')
  const {login} = useIsLogged()
  const disabled = nickname.length < 2
  const {updateUserData, user} = useUserInfo()

  const patchNickname = async (id: number, nickname: string) => {
    const res = await API.patch(`/api/members/${id}/nickname`, {nickname: nickname})
    return res
  }

  const handleSignUp = async () => {
    // const userInfo = await getUserInfo()

    const res = await patchNickname(user?.id, nickname)
    if (res) {
      updateUserData({...user, nickname: nickname})
    }
    login()
  }
  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={styles.subContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>만나서 반가워요!</Text>
          <Text style={styles.welcomeSubTitle}>
            GROUBING에서 사용할 닉네임을
            {'\n'}입력해주세요.
          </Text>
          <AuthInput
            placeholder={'닉네임'}
            onChangeText={nickname => setNickname(nickname)}
            value={nickname}
            style={styles.pwInput}
            maxLength={7}
            keyboardType="url"
          />
        </View>
        <AuthNextButton isDisabled={disabled} onPress={handleSignUp} buttonText={'시작하기'} />
      </View>
    </SafeAreaView>
  )
}

export default SocialNickname

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 40,
    marginTop: 80,
  },
  pwInput: {
    borderBottomColor: '#000000',
  },
  welcomeTitle: {
    fontSize: 28,
    ...font.NotoSansKR_Medium,
    lineHeight: 42,
    color: '#000',
  },
  welcomeSubTitle: {
    fontSize: 16,
    fontStyle: 'normal',
    color: '#666666',
    marginTop: 8,
    marginBottom: 96,
    ...font.NotoSansKR_Medium,
  },
  welcomeContainer: {
    width: '100%',
  },
})
