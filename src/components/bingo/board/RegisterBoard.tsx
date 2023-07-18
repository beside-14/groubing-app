import {Images} from 'assets'
import React, {useState} from 'react'
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Memo} from './Memo'
import {registerItem} from './remote'
const {width} = Dimensions.get('window')

const Block = ({edit, row, column}) => {
  const [selected, setSelected] = useState(false)
  const itemSize = width / 3
  const fontSize = 3 === 3 ? 13 : 12
  return (
    <TouchableOpacity onPress={() => edit()} style={[styles.itemContainer, {width: itemSize, height: itemSize}]}>
      <View style={styles.make_btn_wrapper}>
        <Image source={Images.icon_make} style={styles.make_btn} />
      </View>
      <Text style={styles.text}>작성하기</Text>
    </TouchableOpacity>
  )
}

export const RegisterBoard = ({edit}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: 3}).map((_, i) => (
        <View key={i} style={styles.row}>
          {Array.from({length: 3}).map((_, k) => (
            <Block key={k} edit={() => edit()} row={i + 1} column={k + 1} />
          ))}
        </View>
      ))}

      <Memo />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  container: {flex: 1, backgroundColor: 'white'},
  row: {display: 'flex', flexDirection: 'row'},
  block: {flex: 1, borderWidth: 1, borderColor: 'white', backgroundColor: '#F3F3F3'},

  make_btn_wrapper: {padding: 9, backgroundColor: '#E1E1E1', borderRadius: 50},
  make_btn: {width: 12, height: 12},
  text: {color: '#666666', marginTop: 6, fontSize: 13},
})
