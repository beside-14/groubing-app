import {Images} from 'assets'
import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
import {font} from 'shared/styles'

const FeedHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>피드</Text>
      <Image style={styles.header_image} source={Images.icon_search} />
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
