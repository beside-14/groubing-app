import React, {useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {useNotifications} from './notification/useNotificationList'
import {Images} from 'assets'
import {API_URL} from 'api/restful'
import {acceptFriend, refuseFriend} from './remote'

import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'

export type ALARM_CATEGORY = '활동 알림' | '받은 요청' | '보낸 요청'

const Notification = () => {
  const CATEGORY: ALARM_CATEGORY[] = ['활동 알림', '받은 요청', '보낸 요청']

  const [active, setActive] = useState<ALARM_CATEGORY>('활동 알림')
  const {data, refetch, isLoading} = useNotifications(active)
  const {navigate} = useRoutes()

  const handleRefuseBtn = async (id: number) => {
    await refuseFriend(id)
    refetch()
  }
  const handleAcceptBtn = async (id: number) => {
    await acceptFriend(id)
    refetch()
  }

  let notifications = active === '활동 알림' ? data?.contents : data

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>알림</Text>

      <View style={styles.tab_wrapper}>
        {CATEGORY.map(category => (
          <TouchableOpacity key={category} onPress={() => setActive(category)} style={styles[category === active ? 'activetab' : 'tab']}>
            <Text style={{color: category === active ? 'white' : 'black', ...font.NotoSansKR_Medium}}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isLoading ? null : notifications?.length === 0 ? (
        <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.emoji_01} style={{width: 75, height: 75}} />
            <Text style={{marginTop: 16, fontWeight: '500', fontSize: 18}}>{active}이 없습니다.</Text>
            <Text style={{marginTop: 4, fontWeight: '400', fontSize: 14, color: '#666666'}}>뭐라고 하면 좋을까나</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={notificaion =>
            active === '활동 알림' ? (
              <View style={styles.card_wrapper}>
                <Image
                  style={styles.card_profile}
                  source={notificaion.item.profile ? {uri: `${API_URL}${notificaion.item.profile}`} : Images.icon_profile}
                />
                <Text style={{...styles.card_contnet, width: '80%'}}>{notificaion.item.message}</Text>
              </View>
            ) : notificaion.item.status === 'REJECT' ? null : notificaion.item.status === 'ACCEPT' ? (
              <View style={styles.card_wrapper}>
                <Image
                  style={styles.card_profile}
                  source={notificaion.item.profile ? {uri: `${API_URL}${notificaion.item.profile}`} : Images.icon_profile}
                />
                <View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{...styles.card_contnet, ...font.NotoSansKR_Medium}}>{notificaion.item.nickname}</Text>
                    <Text style={styles.card_contnet}>님과 친구가 되었어요 :)</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigate(MENU.FRIEND_BINGO_LIST, {id: notificaion.item.memberId, name: notificaion.item.nickname})}>
                    <Text style={{color: '#3A8ADB', ...font.NotoSansKR_Medium}}>빙고 둘러보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : active === '받은 요청' ? (
              <Text style={{...styles.card_contnet, width: '80%'}}>{notificaion.item.message}</Text>
            ) : (
              <View style={styles.card_wrapper}>
                <Image
                  style={styles.card_profile}
                  source={notificaion.item.profile ? {uri: `${API_URL}${notificaion.item.profile}`} : Images.icon_profile}
                />
                <View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{...styles.card_contnet, ...font.NotoSansKR_Medium}}>{notificaion.item.nickname}</Text>
                    <Text style={styles.card_contnet}>님에게 친구를 요청했어요 :)</Text>
                  </View>
                </View>
              </View>
            )
          }
        />
      )}
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

    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    gap: 16,
  },
  card_profile: {width: 36, height: 36, borderRadius: 50},
  card_contnet: {fontSize: 16, marginBottom: 10, ...font.NotoSansKR_Regular},
})
