import {Images} from 'assets'
import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'
import React from 'react'
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'

const FeedHeader = () => {
  const {navigate} = useRoutes()

  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>피드</Text>
      <TouchableOpacity onPress={() => navigate(MENU.SEARCH_FRIEND)}>
        <Image style={styles.header_image} source={Images.icon_search} />
      </TouchableOpacity>
    </View>
  )
}

export default FeedHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 18,
    marginTop: 24,
    marginBottom: 40,
  },
  header_text: {
    ...font.Montserrat_Bold,
    fontSize: 24,
  },
  header_image: {
    width: 24,
    height: 24,
  },
})
