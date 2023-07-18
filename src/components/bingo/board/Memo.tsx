import React from 'react'
import {StyleSheet} from 'react-native'
import {Text, View} from 'react-native'

export const Memo = ({content}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>메모</Text>
      <View style={styles.block}>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  block: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    marginTop: 12,
  },
})
