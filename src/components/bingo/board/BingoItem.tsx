import {API_URL} from 'api/restful'
import {Images} from 'assets'
import useUserInfo from 'hooks/useUserInfo'
import {useSetAtom} from 'jotai'
import React, {useState} from 'react'
import {Alert} from 'react-native'
import {Image, View} from 'react-native'
import {TouchableOpacity, StyleSheet, Text, Dimensions} from 'react-native'
import {updateItemState} from 'screens/board/remote/bingo'
import {bingo_count_atom, register_item_atom} from 'screens/board/store'
import {font} from 'shared/styles'

const {width} = Dimensions.get('window')

const BingoItem = ({title, size, complete, boardId, id, isTemporary, readonly, img}: any) => {
  const itemSize = width / size
  const fontSize = size === 3 ? 13 : 12

  const [select, setSelect] = useState<boolean>(complete)
  const registerMode = useSetAtom(register_item_atom)
  const setBingoCount = useSetAtom(bingo_count_atom)

  const {user} = useUserInfo()
  const updateBingoElement = async (updateType: 'cancel' | 'complete') => {
    const res = await updateItemState(updateType, boardId, id)

    if (res.status === 200) {
      setBingoCount(res?.data?.data?.totalBingoCount)
      return setSelect(prev => !prev)
    } else {
      return Alert.alert('요청이 원활하지 않습니다.')
    }
  }

  const handleToggle = async () => {
    if (isTemporary) return
    const updateType = select === true ? 'cancel' : 'complete'

    if (updateType === 'complete') return updateBingoElement(updateType)

    Alert.alert('빙고 항목을 취소하시겠습니까?', '', [
      {
        text: '아니요',
        onPress: () => null,
      },
      {text: '네', onPress: () => updateBingoElement(updateType)},
    ])
  }

  if (title === null) {
    return (
      <TouchableOpacity
        disabled={readonly}
        onPress={() => registerMode({mode: true, id: id})}
        style={[styles.registerBtn, {width: itemSize, height: itemSize}]}>
        <View style={styles.make_btn_wrapper}>
          <Image source={Images.icon_make} style={styles.make_btn} />
        </View>
        <Text style={styles.text}>작성하기</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      disabled={readonly}
      style={[styles.itemContainer, {width: itemSize, height: itemSize}, select ? styles.selected : styles.unselected]}
      onPress={handleToggle}>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[styles.itemLabel, select ? styles.selectedFont : styles.unselectedFont, {fontSize: fontSize}]}>
        {title}
      </Text>

      <Image
        source={{
          uri: `${API_URL}/api/files/bingo-item-image/${select ? `${img[0]}_complete.png` : img}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }}
        style={{position: 'absolute', bottom: 0, right: 0, width: size === 4 ? 60 : 80, height: size === 4 ? 60 : 80}}
      />
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
    position: 'relative',
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
  icon: {},
})

export default BingoItem
