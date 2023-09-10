import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
import {Images} from 'assets'

const FriendHeaderRight = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={Images.ico_setting} style={styles.img} />
    </TouchableOpacity>
  )
}

export default FriendHeaderRight

const styles = StyleSheet.create({
  container: {marginRight: 17},
  img: {width: 24, height: 24},
})
