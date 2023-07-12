import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from './AuthNextButton'

type EmailCheckProps<T> = {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  handleFindId: () => void
}
const EmailCheck = <T,>({id, setId, handleFindId}: EmailCheckProps<T>): React.ReactElement => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <AuthInput placeholder={'아이디(이메일)'} onChangeText={id => setId(id)} value={id} />
      </View>
      <AuthNextButton onPress={handleFindId} buttonText={'다음'} />
    </View>
  )
}

export default EmailCheck

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
})
