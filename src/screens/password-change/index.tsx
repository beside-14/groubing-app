import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import {font} from 'shared/styles'
import {Images} from 'assets'
import {patchPassword} from './remote'
import useUserInfo from 'hooks/useUserInfo'
import {useRoutes} from 'hooks/useRoutes'

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const {user} = useUserInfo()
  const {back} = useRoutes()

  const disabled = newPassword !== newPasswordConfirm || newPassword === '' || currentPassword === ''
  const onChangeCurrentPassword = (value: string) => setCurrentPassword(value)
  const onChangeNewPassword = (value: string) => setNewPassword(value)
  const onChangeNewPasswordConfirm = (value: string) => setNewPasswordConfirm(value)
  const onPress = async () => {
    try {
      const res = await patchPassword(user?.id, currentPassword, newPassword)
      back()
    } catch (err) {
      Alert.alert('비밀번호 변경에 실패하였습니다.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="기존 비밀번호" placeholderTextColor={'#a6a6a6'} style={styles.input_default} onChangeText={onChangeCurrentPassword} />
      <TextInput
        value={newPassword}
        onChangeText={onChangeNewPassword}
        placeholder="새 비밀번호"
        placeholderTextColor={'#a6a6a6'}
        style={styles.input_new}
      />
      <TextInput
        value={newPasswordConfirm}
        onChangeText={onChangeNewPasswordConfirm}
        placeholder="새 비밀번호 확인"
        placeholderTextColor={'#a6a6a6'}
        style={styles.input_new}
      />
      <TouchableOpacity disabled={disabled} style={disabled ? styles.button : [styles.button, styles.button_active]} onPress={onPress}>
        <Text style={styles.button_text}>변경</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PasswordChange

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingTop: 15},
  input_default: {marginHorizontal: 20, marginBottom: 12, paddingVertical: 13, borderBottomColor: '#000', borderBottomWidth: 1},
  input_new: {marginHorizontal: 20, paddingVertical: 13, borderBottomColor: '#ddd', borderBottomWidth: 1},
  button: {marginHorizontal: 20, marginTop: 32, paddingTop: 14, paddingBottom: 16, alignItems: 'center', borderRadius: 4, backgroundColor: '#ddd'},
  button_active: {backgroundColor: '#000'},
  button_text: {...font.NotoSansKR_Medium, fontSize: 16, color: '#fff'},
})
