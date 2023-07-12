import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {Images} from 'assets'
import {font} from 'shared/styles'
import AuthNextButton from 'components/auth/AuthNextButton'

type LoginContentProps = {
  text: string
  handleLoginClick: () => void
}

const LoginContent = ({text, handleLoginClick}: LoginContentProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.emojiContainer}>
        <Image source={Images.emoji_02} style={styles.emoji} />
        <Text style={styles.emojiTxt}>{text}</Text>
      </View>
      <AuthNextButton onPress={handleLoginClick} buttonText={'로그인 하기'} />
    </View>
  )
}

export default LoginContent

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    flex: 1,
  },
  emojiContainer: {
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  emoji: {
    resizeMode: 'contain',
  },
  emojiTxt: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    ...font.NotoSansKR_Medium,
  },
})
