import React, {useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {useNotifications} from './notification/useNotificationList'
import {Images} from 'assets'
import {API_URL} from 'api/restful'
import {acceptFriend, refuseFriend} from './remote'
import {getUserInfo} from 'utils/asyncStorage'
import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'

const Notification = () => {
  const CATEGORY: string[] = ['활동 알림', '친구 요청']

  const [active, setActive] = useState('활동 알림')
  const {data, refetch} = useNotifications(active)
  const {navigate} = useRoutes()
  const handleRefuseBtn = async (id: number) => await refuseFriend(id)
  const handleAcceptBtn = async (id: number) => await acceptFriend(id)
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
        data={active === '활동 알림' ? data?.contents : data}
        renderItem={notificaion =>
          active === '활동 알림' ? (
            <View style={styles.card_wrapper}>
              <Image
                style={styles.card_profile}
                source={notificaion.item.profile ? {uri: `${API_URL}${notificaion.item.profile}`} : Images.icon_profile}
              />
              <Text style={{...styles.card_contnet, width: '80%'}}>{notificaion.item.message}</Text>
            </View>
          ) : notificaion.item.status === 'ACCEPT' ? (
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
                <TouchableOpacity onPress={() => navigate(MENU.FRIEND_BINGO_LIST, {id: notificaion.item.memberId, name: notificaion.item.nickname})}>
                  <Text style={{color: '#3A8ADB', ...font.NotoSansKR_Medium}}>빙고 둘러보기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.card_wrapper}>
              <Image
                style={styles.card_profile}
                source={notificaion.item.profile ? {uri: `${API_URL}${notificaion.item.profile}`} : Images.icon_profile}
              />
              <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{...styles.card_contnet, ...font.NotoSansKR_Medium}}>{notificaion.item.nickname}</Text>
                  <Text style={styles.card_contnet}>님이 친구를 요청했어요.</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16}}>
                  <TouchableOpacity
                    onPress={() => handleAcceptBtn(notificaion.item.id)}
                    style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4}}>
                    <Image source={Images.icon_blue_check} style={{width: 17, height: 17}} />
                    <Text style={{color: '#3A8ADB', ...font.NotoSansKR_Medium}}>수락</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRefuseBtn(notificaion.item.id)}
                    style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4}}>
                    <Image source={Images.refuse_icon} style={{width: 17, height: 17}} />
                    <Text style={{...font.NotoSansKR_Medium}}>거절</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }
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

    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    gap: 16,
  },
  card_profile: {width: 36, height: 36, borderRadius: 50},
  card_contnet: {fontSize: 16, marginBottom: 10, ...font.NotoSansKR_Regular},
})
