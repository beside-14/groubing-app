import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {useNotifications} from './notification/useNotificationList'
import {Images} from 'assets'

const Notification = () => {
  const {data} = useNotifications()

  // console.log('data?', data.contents.contents)

  // const notificaitons
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>알림</Text>

      <FlatList
        // style={{padding: 20, marginTop: 20, paddingVertical: 0}}
        data={data?.contents}
        renderItem={notificaion => (
          <View
            style={{
              padding: 20,
              // marginTop: 20,
              paddingVertical: 0,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 100,
              borderWidth: 3,
              borderColor: '#eeeeee',
            }}>
            {/* <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}> */}
            <View style={{backgroundColor: 'gray', width: 50, height: 50, borderWidth: 1, borderRadius: 50}} />
            <Text style={{flex: 0.9, fontSize: 16}}>{notificaion.item.message}</Text>
            {/* </View> */}
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {marginTop: 24, paddingLeft: 20, fontSize: 24, ...font.NotoSansKR_Bold},
})
