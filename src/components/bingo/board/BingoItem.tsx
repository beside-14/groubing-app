import {Images} from 'assets'
import React, {useState} from 'react'
import {Alert} from 'react-native'
import {Image, View} from 'react-native'
import {TouchableOpacity, StyleSheet, Text, Dimensions} from 'react-native'
import {updateItemState} from 'screens/board/remote/bingo'
import {font} from 'shared/styles'

const {width} = Dimensions.get('window')

const BingoItem = ({onToggle, title, size, complete, boardId, id}: any) => {
  const itemSize = width / size
  const fontSize = size === 3 ? 13 : 12

  const [select, setSelect] = useState<boolean>(complete)

  const handleToggle = async () => {
    const updateType = complete === true ? 'cancel' : 'complete'
    const res = await updateItemState(updateType, boardId, id)

    if (res.status === 200) {
      return setSelect(prev => !prev)
    } else {
      return Alert.alert('요청이 원활하지 않습니다.')
    }
  }

  if (title === null) {
    return (
      <TouchableOpacity style={[styles.registerBtn, {width: itemSize, height: itemSize}]} onPress={handleToggle}>
        <View style={styles.make_btn_wrapper}>
          <Image source={Images.icon_make} style={styles.make_btn} />
        </View>
        <Text style={styles.text}>작성하기</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      style={[styles.itemContainer, {width: itemSize, height: itemSize}, select ? styles.selected : styles.unselected]}
      onPress={handleToggle}>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[styles.itemLabel, select ? styles.selectedFont : styles.unselectedFont, {fontSize: fontSize}]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  registerBtn: {flex: 1, aspectRatio: 1, margin: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F3F3'},
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
  },
  selected: {
    backgroundColor: '#3A8ADB',
  },
  unselected: {
    backgroundColor: '#F3F3F3',
  },
  selectedFont: {
    color: '#FFFFFF',
  },
  unselectedFont: {
    color: '#000000',
  },
  itemLabel: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
    ...font.NotoSansKR_Bold,
  },
  make_btn_wrapper: {padding: 9, backgroundColor: '#E1E1E1', borderRadius: 50},
  make_btn: {width: 12, height: 12},
  text: {color: '#666666', marginTop: 6, fontSize: 13},
})

export default BingoItem
