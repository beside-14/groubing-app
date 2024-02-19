import React from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Images} from 'assets'

export const FriendHeaderRight = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={Images.ico_setting} style={styles.img} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {marginRight: 17},
  img: {width: 24, height: 24},
})
