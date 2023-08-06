import {useRoute} from '@react-navigation/native'
import {updateBingoInfo} from 'components/bingo/board/remote'
import {format} from 'date-fns'
import {useRoutes} from 'hooks/useRoutes'
import React, {useState} from 'react'
import {Alert, DeviceEventEmitter} from 'react-native'
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {Text, View} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

function addMonths(date, months) {
  date.setMonth(date.getMonth() + months)

  return date
}

export const EditScreen = () => {
  const dateobject = new Date()
  const {back} = useRoutes()
  const {params} = useRoute()
  const {id, title, goal, since, until} = params || {}
  const [data, setData] = useState({title: title, goal: goal, since: since, until: until})
  const today = format(dateobject, 'yyyy-MM-dd')
  const inituntil = format(addMonths(dateobject, 1), 'yyyy-MM-dd')
  const [datePicker, setDatePicker] = useState('false')
  const [date, setDate] = useState({since: today, until: inituntil})

  const onIncrease = () => {
    setData(prev => ({...prev, goal: prev.goal + 1}))
  }
  const onDecrease = () => {
    if (data.goal === 1) return
    setData(prev => ({...prev, goal: prev.goal - 1}))
  }

  const onConfirm = (type, selectedDate) => {
    let formatdate = format(selectedDate, 'yyyy-MM-dd')
    setDate(prev => {
      return {...prev, [type]: formatdate}
    })
  }

  const isDateValid = () => {
    const since = new Date(date.since)
    const until = new Date(date.until)
    if (since > until) return false
    return true
  }

  const update = async () => {
    if (data.title.length === 0) return Alert.alert('빙고 제목을 입력해주세요.')
    if (!isDateValid()) return Alert.alert('기간을 확인해주세요.')

    const res = await updateBingoInfo(id, {...data, ...date})
    if (res.status === 200) {
      DeviceEventEmitter.emit('EDIT_COMPLETE')
      Alert.alert('빙고 수정이 완료되었습니다.')

      back()
      return
    }
    return Alert.alert('요청이 원활하지 않습니다.')
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, position: 'relative'}}>
      <View style={styles.row}>
        <Text style={styles.title}>빙고 제목</Text>
        <TextInput
          placeholder="제목을 입력해주세요"
          onChangeText={t => setData(prev => ({...prev, title: t}))}
          value={data.title}
          style={styles.input}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>빙고 개수</Text>
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
        <Text style={styles.title}>빙고 기간</Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => setDatePicker('since')}>
            <Text style={styles.date}>{date.since}</Text>
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20}}>~</Text>
          <TouchableOpacity onPress={() => setDatePicker('until')}>
            <Text style={styles.date}>{date.until}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.nextBtn} onPress={() => update()}>
        <Text style={styles.nextBtnTxt}>{'수정하기'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={datePicker !== 'false'}
        mode="date"
        onConfirm={date => {
          onConfirm(datePicker, date)
          setDatePicker('false')
        }}
        onCancel={() => setDatePicker('false')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 30, marginBottom: 25},
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
  title: {fontWeight: '500', fontSize: 15},
  input: {borderBottomWidth: 1, fontSize: 16, height: 45, width: '70%', fontFamily: 'NotoSansKR_400Regular'},
  date: {fontSize: 16},
  nextBtn: {
    position: 'absolute',
    bottom: 25,
    height: 48,
    width: '100%',
    backgroundColor: '#000000',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 20,
  },
  nextBtnTxt: {
    fontSize: 14,
    fontFamily: 'NotoSansKR_500Medium',
    color: '#FFFFFF',
  },
})
