import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from 'components/auth/AuthNextButton'
import {Images} from 'assets'
import {font} from 'shared/styles'
import Microcopy from 'components/auth/Microcopy'

type EmailProps = {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  microcopy: string
  handleEmailClick: () => void
}

const Email = ({id, setId, microcopy, handleEmailClick}: EmailProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <AuthInput placeholder={'아이디(이메일)'} onChangeText={id => setId(id)} value={id} keyboardType="email-address" autoCapitalize="none" />
        <Microcopy microcopy={microcopy} />
      </View>
      <AuthNextButton onPress={handleEmailClick} buttonText={'다음'} isDisabled={!id} />
    </View>
  )
}

export default Email

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    flex: 1,
  },
  textInputContainer: {
    width: '100%',
  },
})
