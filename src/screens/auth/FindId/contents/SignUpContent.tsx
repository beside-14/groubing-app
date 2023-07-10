import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native'
import {Images} from 'assets'
import {font} from 'shared/styles'

type SignUpContentProps = {
  emojiTxt: string
  handleSignUpClick: () => void
}
const SignUpContent = ({emojiTxt, handleSignUpClick}: SignUpContentProps) => {

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.emojiContainer}>
        <Image source={Images.emoji_01} style={styles.emoji} />
        <Text style={styles.emojiTxt}>{emojiTxt}</Text>
      </View>
      <View style={styles.nextBtnContainer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleSignUpClick}>
          <Text style={styles.nextBtnTxt}>회원가입 하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpContent

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
  nextBtnContainer: {
    width: '100%',
    marginBottom: 13,
  },
  nextBtn: {
    height: 48,
    backgroundColor: '#000000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  nextBtnTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    ...font.NotoSansKR_Medium,
  },
})