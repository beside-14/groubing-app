import React, {useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {useNotifications} from './notification/useNotificationList'
import {Images} from 'assets'

const Notification = () => {
  const {data} = useNotifications()
  const CATEGORY: string[] = ['활동알림', '친구신청']

  const [active, setActive] = useState('활동알림')

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>알림</Text>

      <View style={styles.tab_wrapper}>
        {CATEGORY.map(category => (
          <TouchableOpacity key={category} onPress={() => setActive(category)} key={name} style={styles[category === active ? 'activetab' : 'tab']}>
            <Text style={{color: category === active ? 'white' : 'black', ...font.NotoSansKR_Medium}}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={data?.contents}
        renderItem={notificaion => (
          <View style={styles.card_wrapper}>
            <View style={styles.card_profile} />
            <Text style={styles.card_contnet}>{notificaion.item.message}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 20},
  header: {marginTop: 20, marginBottom: 40, paddingLeft: 20, fontSize: 24, ...font.NotoSansKR_Bold},
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
  },
  activetab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontWeight: '500',
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'black',
  },
  tab_wrapper: {display: 'flex', flexDirection: 'row', gap: 4, paddingHorizontal: 20},

  card_wrapper: {
    padding: 20,
    paddingVertical: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  card_profile: {backgroundColor: 'gray', width: 50, height: 50, borderWidth: 1, borderRadius: 50},
  card_contnet: {flex: 0.9, fontSize: 16},
})
