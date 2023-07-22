import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {Images} from 'assets'
import useFeed from '../hooks/useFeed'

// api 요청할 때 전달하는 값 확인.
const TABS = [
  {name: '빙고 둘러보기', code: '0'},
  {name: '친구 둘러보기', code: '1'},
]

const FeedTab = () => {
  const {currentFeedTab, setCurrentFeedTab} = useFeed()

  const handleTabPress = code => {
    setCurrentFeedTab(() => code)
  }

  return (
    <View style={styles.container}>
      {TABS.map(item => (
        <TouchableOpacity
          key={item?.code}
          style={[styles.tab_container, currentFeedTab === item.code && styles.tab_container_clicked]}
          onPress={() => handleTabPress(item.code)}>
          <Text style={[styles.tab, currentFeedTab === item.code && styles.tab_clicked]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default FeedTab

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  tab_container: {
    marginHorizontal: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 99,
  },
  tab_container_clicked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  tab: {
    ...font.NotoSansKR_Regular,
    fontSize: 14,
  },
  tab_clicked: {
    color: '#FFF',
    ...font.NotoSansKR_Medium,
  },
})
