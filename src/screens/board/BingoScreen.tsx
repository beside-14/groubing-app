import {StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, Alert, Switch, DeviceEventEmitter} from 'react-native'

import React, {useState, useEffect, useRef} from 'react'

import {ProgressBar} from 'react-native-paper'
import BingoBoard from 'components/bingo/board/BingoBoard'
import {Memo} from 'components/bingo/board/Memo'
import {deleteBingo, getBingo, getFriends, publicBoard, publishBingo, shuffleItems} from './remote/bingo'

import {useRoutes} from 'hooks/useRoutes'
import {useRoute} from '@react-navigation/native'

import {useAtom, useSetAtom} from 'jotai'
import {addMonths, bingo_count_atom, retech_atom, show_edit_box_atom} from './store'
import {Images} from 'assets'

import {BingoGoalText} from './contents/BingoGoalText'
import {TestInput, TestMemoInput} from './contents/Test'
import {MENU} from 'navigation/menu'

import RBSheet from 'react-native-raw-bottom-sheet'
import {FlatList} from 'react-native-gesture-handler'
import {format} from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {updateBingoInfo} from 'components/bingo/board/remote'

type BingoGoalText = {
  bingoPercent: number
  bingoCount: number
  maxBingoCount: number
}

const MoreModal = ({info, close}) => {
  const {navigate} = useRoutes()
  const {params} = useRoute()
  const {id} = params || {}

  const [visible, setVisible] = useAtom(show_edit_box_atom)

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

const PublicModal = ({state, close}) => {
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

const InviteModal = ({editDate, close, refetch}) => {
  const {params} = useRoute()
  const {id} = params || {}
  const [friends, setFriends] = useState([])
  const [members, setMembers] = useState<number[]>([])
  let ischecked = (id: number) => {
    console.log('??', members.includes(id))
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
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
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

const DateModal = ({info, group, close, refetch}) => {
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

type ModalState = 'more' | 'public' | 'invite' | 'date' | 'none'

const BingoScreen = () => {
  const [bingoCount, setBingoCount] = useAtom(bingo_count_atom)
  const {navigate, back} = useRoutes()
  const [refetch, setRetech] = useAtom(retech_atom)
  const refRBSheet = useRef()

  const {params} = useRoute()
  const {fromCreate, id} = params || {}
  const [data, setData] = useState()

  const [modalState, setModalState] = useState<ModalState>('none')

  const isTemporary = !data?.completed
  let IS_GROUP = data?.groupType === 'GROUP'

  const [dateGroup, setDateGroup] = useState({since: '', until: ''})

  useEffect(() => {
    if (modalState === 'none') return
    refRBSheet?.current?.open()
  }, [modalState])

  useEffect(() => {
    ;(async () => {
      const res = await getBingo(id)
      setBingoCount(res.data.data.bingoMap.totalBingoCount)
      setData(res.data.data)
    })()
  }, [])

  useEffect(() => {
    if (!refetch) return
    ;(async () => {
      const res = await getBingo(id)
      setBingoCount(res.data.data.bingoMap.totalBingoCount)
      setData(res.data.data)
      setRetech(false)
    })()
  }, [refetch])

  useEffect(() => {
    let subscription = DeviceEventEmitter.addListener('EDIT_COMPLETE', () => {
      setRetech(true)
    })
    return () => subscription.remove()
  }, [])

  const shuffle = async () => {
    const res = await shuffleItems(id)

    if (res?.status === 200) setRetech(true)
  }
  const closeModal = () => {
    setModalState('none')
    refRBSheet?.current?.close()
  }

  const dateCloseModal = (date?: {since: string; until: string}) => {
    if (!date) {
      setModalState('none')
      refRBSheet?.current?.close()
    } else {
      setDateGroup(date)
      setModalState('invite')
    }
  }

  const editData = {
    title: data?.title,
    goal: data?.goal,
    since: data?.since,
    until: data?.until,
  }

  const MODAL = {
    more: <MoreModal info={editData} close={closeModal} />,
    public: <PublicModal state={data?.open} close={closeModal} />,
    invite: <InviteModal close={closeModal} editDate={dateGroup} refetch={() => setRetech(true)} />,
    date: <DateModal info={editData} group={IS_GROUP} close={dateCloseModal} refetch={() => setRetech(true)} />,
    none: '',
  }

  if (!data) return null

  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View
          style={{
            height: 60,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          {fromCreate ? (
            <TouchableOpacity onPress={() => navigate('BingoList')} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Image source={Images.back_btn} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => back()} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Image source={Images.back_btn} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          )}
          {/* 발행하기 버튼 원진님께 9개 다 채웠는지 상태값받기 그걸로 disabled*/}

          {isTemporary ? (
            <TouchableOpacity onPress={() => setModalState('date')} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.icon_check_black} style={{width: 24, height: 24, marginRight: 4}} />
              <Text>발행하기</Text>
            </TouchableOpacity>
          ) : (
            <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
              {/* 공개  */}
              <TouchableOpacity onPress={() => setModalState('public')} style={{alignItems: 'center'}}>
                <Image source={Images.ico_lock} style={{width: 24, height: 24, marginRight: 4}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalState('more')} style={{alignItems: 'center'}}>
                <Image source={Images.icon_more} style={{width: 24, height: 24, marginRight: 4}} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.bingoTypeContainer}>
            <Text style={styles.bingoType}>{data?.groupType === 'SINGLE' ? '개인' : '그룹'}</Text>
            <View style={styles.bingoTitleContainer}>
              <Text style={styles.bingoTitle}>{data?.title}</Text>
              <View style={styles.remainingDaysContainer}>
                <Text style={styles.remainingDaysText}>{data?.dday}</Text>
              </View>
            </View>
            <BingoGoalText bingoPercent={(bingoCount / data?.goal) * 100} bingoCount={bingoCount} maxBingoCount={data?.goal} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <ProgressBar progress={bingoCount / data?.goal} style={styles.progressBar} color="#3A8ADB" />
          </View>

          <BingoBoard isTemporary={isTemporary} board={data.id} size={data?.bingoSize} items={data?.bingoMap?.bingoLines} />
          {isTemporary && (
            <TouchableOpacity onPress={() => shuffle()}>
              <Text style={{textAlign: 'right', padding: 20, paddingBottom: 0, fontWeight: '500', color: '#666666'}}>섞기</Text>
            </TouchableOpacity>
          )}
          <Memo content={data?.memo} />
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          onClose={() => setModalState('none')}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={600}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          {MODAL[modalState]}
        </RBSheet>
      </SafeAreaView>

      <TestInput />
      <TestMemoInput />
    </View>
  )
}

export default BingoScreen

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingBottom: 100, // 하단 네비게이터 높이만큼 패딩을 추가
  },
  bingoTypeContainer: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  bingoType: {
    flex: 1,
    color: '#666666',
    fontSize: 13,
    fontFamily: 'NotoSansKR_400Regular',
    marginBottom: 5,
  },
  bingoTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  bingoTitle: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'NotoSansKR_700Bold',
    fontWeight: '700',
  },
  remainingDaysContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#3A8ADB',
    marginLeft: 8,
    marginBottom: 3,
  },
  remainingDaysText: {
    color: '#3A8ADB',
    fontSize: 13,
    fontFamily: 'NotoSansKR_400Regular',
  },

  progressBar: {
    height: 5,
    marginBottom: 20,
    marginHorizontal: 10,
  },

  bingoCountTextPadding: {
    paddingHorizontal: 2,
  },
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
    // width: '100%',
    padding: 15,
    margin: 20,
    marginTop: 45,
    borderRadius: 4,
    // position: 'absolute',
    // bottom: 0,
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
