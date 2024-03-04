import React from 'react'
import {StyleSheet, SafeAreaView, Text} from 'react-native'
import {FeedHeader, FeedTab} from './contents'

import Tabs from './contents/tab/Tab'
import TabPane from './contents/tab/TabPane'
import {ListView} from './contents/ListView'
import {useModal} from 'hooks/useModal'
import {Modals} from 'components/common/Modals'
import {TouchableOpacity} from 'react-native-gesture-handler'

const Feed = () => {
  const {isOpen, onClose, onOpen} = useModal('feed_more')

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <FeedHeader />
      {/* 탭 */}
      {/* <TouchableOpacity style={{backgroundColor: 'orange', width: 100, height: 100}} onPress={() => (isOpen ? onClose() : onOpen())}>
        <Text>1</Text>
      </TouchableOpacity> */}
      <Tabs>
        <TabPane title="빙고 둘러보기">
          <ListView type={'all'} />
        </TabPane>

        <TabPane title="친구 둘러보기">
          <ListView type={'friend'} />
        </TabPane>
      </Tabs>
      <Modals />
    </SafeAreaView>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8},
  profileimg: {width: 36, height: 36, backgroundColor: 'pink', borderRadius: 50},
  username: {fontWeight: '500', fontSize: 16},
  block: {padding: 20, backgroundColor: 'white'},
})
