import React from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Images} from 'assets'
import {useRoutes} from 'hooks/useRoutes'
import {MENU} from 'navigation/menu'

export const FriendHeaderRight = () => {
  const {navigate} = useRoutes()
  return (
    <TouchableOpacity onPress={() => navigate(MENU.SEARCH_FRIEND)} style={styles.container}>
      <Image source={Images.icon_make} style={styles.img} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {marginRight: 17},
  img: {width: 24, height: 24},
})
