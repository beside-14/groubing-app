import React from 'react'
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import {font} from 'shared/styles'

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>알림</Text>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {marginTop: 24, paddingLeft: 20, fontSize: 24, ...font.NotoSansKR_Bold},
})
