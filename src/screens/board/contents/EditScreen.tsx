import React, {useState} from 'react'
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {Text, View} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export const EditScreen = () => {
  const [data, setData] = useState({title: '', goal: 2})
  const onIncrease = () => {
    // setData(prev => ({...prev, goal: prev.goal + 1}))
  }
  const onDecrease = () => {
    if (data.goal === 1) return
    // setData(prev => ({...prev, goal: prev.goal - 1}))
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20}}>
      <View style={styles.row}>
        <Text>빙고 제목</Text>
        <TextInput
          placeholder="제목을 입력해주세요"
          //   onChangeText={t => setContent(prev => ({...prev, title: t}))}
          //   value={content.title}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular', marginBottom: 12}}
        />
      </View>
      <View style={styles.row}>
        <Text>빙고 개수</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={onDecrease} style={styles.counterBtn}>
            <Text style={styles.counterBtnTxt}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>{data.goal}</Text>
          <TouchableOpacity onPress={onIncrease} style={styles.counterBtn}>
            <Text style={styles.counterBtnTxt}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Text>빙고 기간</Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity>
            <Text>2022.04.02</Text>
          </TouchableOpacity>
          <Text>~</Text>
          <TouchableOpacity>
            <Text>2022.04.02</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <DateTimePickerModal isVisible={true} mode="date" onConfirm={() => console.log('d')} onCancel={() => console.log('d')} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 30},
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    backgroundColor: '#E7F0FA',
    height: 30,
    width: 30,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnTxt: {
    color: '#3A8ADB',
    fontSize: 22,
  },
  countText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 16,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
