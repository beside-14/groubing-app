import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import CustomInput from 'components/common/CustomInput'
import {font} from 'shared/styles'

type FindIdContentProps<T> = {
  id: T;
  setId: React.Dispatch<React.SetStateAction<T>>
  handleFindId: () => void
}
const FindIdContent = <T,>({id, setId, handleFindId}: FindIdContentProps<T>): React.ReactElement => {

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.textInputContainer}>
        <CustomInput placeholder={'아이디(이메일)'} onChangeText={id => setId(id)} value={id} />
      </View>
      <View style={styles.nextBtnContainer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleFindId}>
          <Text style={styles.nextBtnTxt}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FindIdContent

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