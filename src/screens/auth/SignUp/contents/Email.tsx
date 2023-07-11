import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import AuthInput from 'components/auth/AuthInput'
import AuthNextButton from 'components/auth/AuthNextButton'
import {Images} from 'assets'
import {font} from 'shared/styles'

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
        <AuthInput placeholder={'아이디(이메일)'} onChangeText={id => setId(id)} value={id} />
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
      </View>
      <AuthNextButton onPress={handleEmailClick} buttonText={'다음'} />
    </View>
  )
}

export default Email

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
})
