import React, {useState} from 'react'
import {Alert, SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native'
import {font} from 'shared/styles'
import {API, patch} from 'utils/axios'

export const AlarmSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = async (state: boolean) => {
    await API.patch(`/api/members/notification-${state ? 'on' : 'off'}`, {})
    setIsEnabled(previousState => !previousState)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.block}>
          <View style={{width: '60%'}}>
            <Text style={styles.title}>푸쉬 알림</Text>
            <Text style={styles.desc}>그룹빙고의 팀원이 빙고를 달성하면 알림을 전송합니다.</Text>
          </View>

          <Switch
            trackColor={{false: '#DDDDDD', true: '#3A8ADB'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 20},
  wrapper: {padding: 20},
  block: {display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'},
  title: {...font.NotoSansKR_Bold, fontSize: 16, marginBottom: 8},
  desc: {color: '#666', fontSize: 14},
})
