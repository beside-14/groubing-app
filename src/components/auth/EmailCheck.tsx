import React from 'react'
import {View, StyleSheet} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from './AuthNextButton'
import Microcopy from './Microcopy'

type EmailCheckProps<T> = {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  handleFindId: () => void
  microcopy: string
}
const EmailCheck = <T,>({id, setId, handleFindId, microcopy}: EmailCheckProps<T>): React.ReactElement => {
  const handleIdChange = (text: string) => {
    setId(text)
  }
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <AuthInput placeholder={'아이디(이메일)'} onChangeText={handleIdChange} value={id} keyboardType="email-address" autoCapitalize="none" />
        <Microcopy microcopy={microcopy} />
      </View>
      <AuthNextButton onPress={handleFindId} buttonText={'다음'} />
    </View>
  )
}

export default EmailCheck

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    flex: 1,
  },
  textInputContainer: {
    width: '100%',
  },
})
