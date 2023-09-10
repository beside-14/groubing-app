import {View, Text, TouchableOpacity, Image, Alert, Switch} from 'react-native'

import React, {useState, useEffect} from 'react'

import {deleteBingo, getFriends, publicBoard, publishBingo} from '../../remote/bingo'

import {useRoutes} from 'hooks/useRoutes'
import {useRoute} from '@react-navigation/native'

import {useSetAtom} from 'jotai'
import {addMonths, retech_atom, show_edit_box_atom} from '../../store'
import {Images} from 'assets'

import {MENU} from 'navigation/menu'

import {FlatList} from 'react-native-gesture-handler'
import {format} from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {updateBingoInfo} from 'components/bingo/board/remote'
import {StyleSheet} from 'react-native'

export const MoreModal = ({info, close}) => {
  const {navigate} = useRoutes()
  const {params} = useRoute()
  const {id} = params || {}

  const setVisible = useSetAtom(show_edit_box_atom)

  const deleteBoard = async () => {
    const res = await deleteBingo(id)

    if (res.status === 200) {
      setVisible(false)
      navigate('BingoList')

      return Alert.alert('삭제가 완료되었습니다.')
    }
  }

  return (
    <View style={{padding: 20, width: '80%'}}>
      <TouchableOpacity
        onPress={() => {
          close()
          setVisible(false)
          navigate(MENU.BINGO_EDIT, {id: id, ...info})
        }}
        style={{padding: 5, marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image source={Images.icon_edit} style={{width: 24, height: 24, marginRight: 4}} />
        <Text style={{textAlign: 'center'}}>수정</Text>
      </TouchableOpacity>
      <View style={{height: 1, width: '100%', backgroundColor: '#EFEFEF', marginVertical: 10}} />
      <TouchableOpacity
        onPress={() => {
          close()
          setVisible(false)
          deleteBoard()
        }}
        style={{padding: 5, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image source={Images.icon_trash} style={{width: 24, height: 24, marginRight: 4}} />
        <Text style={{textAlign: 'center', color: '#FF3C3C'}}>삭제</Text>
      </TouchableOpacity>
    </View>
  )
}

export const PublicModal = ({state, close}) => {
  const {params} = useRoute()
  const {id} = params || {}
  const refetch = useSetAtom(retech_atom)

  const [isEnabled, setIsEnabled] = useState(state)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const changePublicState = async () => {
    const res = await publicBoard(id, isEnabled)
    if (res.data.code === 'OK') {
      refetch(true)

      close()

      let TEXT = res.data.data.open === true ? '공개' : '비공개'
      Alert.alert(`${TEXT} 설정이 완료되었습니다.`)
    }
  }
  return (
    <View style={{padding: 12, width: '100%', position: 'relative', height: '80%'}}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => close()} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Image source={Images.back_btn} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <Text style={{fontWeight: '500', fontSize: 18}}>공개 설정</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 8, marginTop: 24, justifyContent: 'space-between'}}>
        <Text style={{fontWeight: '500', fontSize: 18}}>빙고 공개 설정</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => changePublicState()}>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 18, textAlign: 'center'}}>완료</Text>
      </TouchableOpacity>
    </View>
  )
}

export const InviteModal = ({editDate, close, refetch}) => {
  const {params} = useRoute()
  const {id} = params || {}
  const [friends, setFriends] = useState([])
  const [members, setMembers] = useState<number[]>([])
  let ischecked = (id: number) => {
    return members.includes(id) ? true : false
  }
  useEffect(() => {
    ;(async () => {
      const res = await getFriends()
      setFriends(res.data.data)
    })()
  }, [])

  const setMember = (id: number) => {
    let arr = [...members]

    if (arr.includes(id)) {
      arr = arr.filter(e => e !== id)
    } else {
      arr.push(id)
    }

    setMembers(arr)
  }

  const sendDateWithMembers = async () => {
    console.log(members, editDate)

    const res = await publishBingo(id, editDate, members)

    if (res.data.code === 'OK') {
      Alert.alert('발행이 완료되었습니다.')
      refetch()
      return close()
    }
  }

  return (
    <View style={{padding: 20, width: '100%', position: 'relative', height: '100%'}}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => close()} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Image source={Images.back_btn} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <Text style={{fontWeight: '500', fontSize: 18}}>그룹원 초대</Text>
      </View>
      <FlatList
        style={{paddingHorizontal: 5, marginTop: 20}}
        data={friends}
        renderItem={friend => (
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <View style={styles.profile} />
              <Text>{friend.item.nickname}</Text>
            </View>
            <TouchableOpacity onPress={() => setMember(friend.item.memberId)}>
              <Image source={Images[ischecked(friend.item.memberId) ? 'ico_check' : 'ico_uncheck']} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={() => sendDateWithMembers()} style={styles.button}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 18, textAlign: 'center'}}>발행하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const DateModal = ({info, group, close, refetch}) => {
  const {params} = useRoute()
  const {id} = params || {}
  const dateobject = new Date()
  const today = format(dateobject, 'yyyy-MM-dd')
  const inituntil = format(addMonths(dateobject, 1), 'yyyy-MM-dd')
  const [datePicker, setDatePicker] = useState('false')
  const [date, setDate] = useState<{since: string; until: string}>({since: today, until: inituntil})

  const onConfirm = (type, selectedDate) => {
    let formatdate = format(selectedDate, 'yyyy-MM-dd')
    setDate(prev => {
      return {...prev, [type]: formatdate}
    })
  }

  const update = async () => {
    if (group) return close(date)

    const res = await updateBingoInfo(id, {...info, ...date})

    if (res.data.code === 'OK') {
      refetch()
      Alert.alert('발행이 완료되었습니다.')
      close()
    }
  }

  return (
    <View style={{padding: 12, width: '100%', position: 'relative', height: '100%'}}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => close()} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Image source={Images.back_btn} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <Text style={{fontWeight: '500', fontSize: 18}}>빙고 진행 기간</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={() => setDatePicker('since')}>
          <Text style={styles.date}>{date.since}</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 20}}>~</Text>
        <TouchableOpacity onPress={() => setDatePicker('until')}>
          <Text style={styles.date}>{date.until}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={() => update()} style={styles.button}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 18, textAlign: 'center'}}>{group ? '다음' : '발행'}</Text>
        </TouchableOpacity>
      </View>
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
  btnWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: 'center',
    alignitems: 'center',
  },
  button: {
    backgroundColor: '#000000',

    padding: 15,
    margin: 20,
    marginTop: 45,
    borderRadius: 4,
  },

  profile: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: 'green',
  },
  counterContainer: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  date: {fontSize: 16},
})
