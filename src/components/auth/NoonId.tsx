import React from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import {Images} from 'assets'
import {font} from 'shared/styles'
import AuthNextButton from './AuthNextButton'

type NoneIdProps = {
  guideText: string
  buttonText: string
  handleButtonClick: () => void
}
const NoneId = ({guideText, handleButtonClick, buttonText}: NoneIdProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.emojiContainer}>
        <Image source={Images.emoji_01} style={styles.emoji} />
        <Text style={styles.text}>{guideText}</Text>
      </View>
      <AuthNextButton onPress={handleButtonClick} buttonText={buttonText} />
    </View>
  )
}

export default NoneId

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
    width: 75,
    height: 73,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    ...font.NotoSansKR_Medium,
  },
})
