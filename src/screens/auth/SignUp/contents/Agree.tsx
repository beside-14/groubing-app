import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import AuthNextButton from 'components/auth/AuthNextButton'
import {font} from 'shared/styles'

type AgreeProps = {
  handleAgreeClick: () => void
}

const Agree = ({handleAgreeClick}: AgreeProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <View style={styles.checkBoxContainer}>
          {/* <CheckBox
            checked={terms1}
            onPress={() => setTerms1(!terms1)}
            style={styles.checkBox}
            checkedIcon={<Image source={Images.icon_checked} />}
            uncheckedIcon={<Image source={Images.icon_unchecked} />}
          /> */}
          <Text style={styles.checkBoxTxt}>
            <Text style={styles.linkText} onPress={() => Alert.alert('이용약관')}>
              이용약관
            </Text>
            에 동의합니다. (필수)
          </Text>
        </View>
        <View style={styles.checkBoxContainer}>
          {/* <CheckBox
            checked={terms2}
            onPress={() => setTerms2(!terms2)}
            checkedIcon={<Image source={Images.icon_checked} />}
            uncheckedIcon={<Image source={Images.icon_unchecked} />}
          /> */}
          <Text style={styles.checkBoxTxt}>
            <Text style={styles.linkText} onPress={() => Alert.alert('개인정보 처리방침')}>
              개인정보 처리방침
            </Text>
            에 동의합니다. (필수)
          </Text>
        </View>
      </View>
      <AuthNextButton onPress={handleAgreeClick} buttonText={'다음'} />
    </View>
  )
}

export default Agree

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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkBox: {
    marginLeft: 0,
  },
  checkBoxTxt: {
    fontSize: 20,
    color: '#000000',
    ...font.NotoSansKR_Regular,
  },
  linkText: {
    fontSize: 20,
    color: '#000000',
    textDecorationLine: 'underline',
    ...font.NotoSansKR_Regular,
  },
})
