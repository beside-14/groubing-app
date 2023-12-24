import {StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, DeviceEventEmitter} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import {ProgressBar} from 'react-native-paper'
import BingoBoard from 'components/bingo/board/BingoBoard'
import {Memo} from 'components/bingo/board/Memo'
import {getBingo, shuffleItems} from './remote/bingo'
import {useRoutes} from 'hooks/useRoutes'
import {useRoute} from '@react-navigation/native'
import {useAtom} from 'jotai'
import {bingo_count_atom, register_item_atom, retech_atom, update_memo_atom} from './store'
import {Images} from 'assets'
import {BingoGoalText} from './contents/BingoGoalText'
import RBSheet from 'react-native-raw-bottom-sheet'
import {DateModal, InviteModal, MemoInput, ItemInput, MoreModal, PublicModal} from './contents/bottom-sheet/modal'
import {font} from 'shared/styles'

type BingoGoalText = {
  bingoPercent: number
  bingoCount: number
  maxBingoCount: number
}

type ModalState = 'more' | 'public' | 'invite' | 'date' | 'register_bingo' | 'register_memo' | 'none'

export const hipslap = {top: 32, bottom: 32, left: 32, right: 32}
const BingoScreen = () => {
  const [bingoCount, setBingoCount] = useAtom(bingo_count_atom)
  const {navigate, back} = useRoutes()
  const [refetch, setRetech] = useAtom(retech_atom)
  const refRBSheet = useRef()
  const [addBingo, setAddBingo] = useAtom(register_item_atom)

  const [addMemo, setAddMemo] = useAtom(update_memo_atom)
  const {params} = useRoute()
  const {fromCreate, id, isfriend} = params || {}
  const [data, setData] = useState()

  const [modalState, setModalState] = useState<ModalState>('none')

  const isTemporary = !data?.completed
  let IS_GROUP = data?.groupType === 'GROUP'

  const [dateGroup, setDateGroup] = useState({since: '', until: ''})

  const [otherBingos, setOtherBingos] = useState([])

  const READ_ONLY = isfriend

  // 전역state 한번 reset 처리!!!!

  useEffect(() => {
    if (addBingo.mode === false && addMemo.mode === false) return
    if (addBingo.mode) return setModalState('register_bingo')
    if (addMemo.mode) return setModalState('register_memo')
  }, [addBingo, addMemo])

  useEffect(() => {
    if (modalState === 'none') return
    refRBSheet?.current?.open()
  }, [modalState])

  useEffect(() => {
    ;(async () => {
      const res = await getBingo(id)
      setBingoCount(res.data.data.bingoMap.totalBingoCount)
      setData(res.data.data)
      setOtherBingos(res.data.data.otherBingoMaps)
    })()
  }, [])

  useEffect(() => {
    if (!refetch) return
    ;(async () => {
      const res = await getBingo(id)
      setBingoCount(res.data.data.bingoMap.totalBingoCount)
      setData(res.data.data)
      setOtherBingos(res.data.data.otherBingoMaps)
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
    more: {content: <MoreModal info={editData} close={closeModal} />, height: 200},
    public: {content: <PublicModal state={data?.open} close={closeModal} />, height: 250},
    invite: {content: <InviteModal close={closeModal} editDate={dateGroup} refetch={() => setRetech(true)} />, height: 400},
    date: {content: <DateModal info={editData} group={IS_GROUP} close={dateCloseModal} refetch={() => setRetech(true)} />, height: 400},
    register_bingo: {content: <ItemInput close={closeModal} />, height: 300},
    register_memo: {content: <MemoInput close={closeModal} />, height: 300},
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
          <TouchableOpacity
            hitSlop={hipslap}
            onPress={() => (fromCreate ? navigate('BingoList') : back())}
            style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <Image source={Images.back_btn} style={{width: 30, height: 30}} />
          </TouchableOpacity>

          {/* 발행하기 버튼 원진님께 9개 다 채웠는지 상태값받기 그걸로 disabled*/}

          {READ_ONLY ? null : isTemporary ? (
            <TouchableOpacity hitSlop={hipslap} onPress={() => setModalState('date')} style={{flexDirection: 'row', alignItems: 'center'}}>
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
              {!isTemporary && (
                <View style={styles.remainingDaysContainer}>
                  <Text style={styles.remainingDaysText}>{data?.dday === 0 ? '기간 만료' : `D-${data?.dday}`}</Text>
                </View>
              )}
            </View>
            {!isTemporary && <BingoGoalText bingoPercent={(bingoCount / data?.goal) * 100} bingoCount={bingoCount} maxBingoCount={data?.goal} />}
          </View>
          {!isTemporary && (
            <View style={{marginHorizontal: 10}}>
              <ProgressBar progress={bingoCount / data?.goal} style={styles.progressBar} color="#3A8ADB" />
            </View>
          )}
          {/* 빙고판!!!!*/}
          <BingoBoard readonly={READ_ONLY} isTemporary={isTemporary} board={data.id} size={data?.bingoSize} items={data?.bingoMap?.bingoLines} />

          {isTemporary && !READ_ONLY && (
            <TouchableOpacity disabled={READ_ONLY} onPress={() => shuffle()}>
              <Text style={{textAlign: 'right', padding: 20, paddingBottom: 0, color: '#666666', ...font.NotoSansKR_Regular}}>섞기</Text>
            </TouchableOpacity>
          )}
          {IS_GROUP && !isTemporary && (
            <View style={styles.miniboardContainer}>
              <Text style={styles.title}>함께하는 그루버</Text>
              <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
                {otherBingos?.map(bingo => {
                  const bingoarr = bingo?.bingoLines?.map(e => e?.bingoItems)

                  return (
                    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      {bingoarr?.map((e, i) => (
                        <View key={i} style={{flexDirection: 'row'}}>
                          {e?.map(({complete}, i) => (
                            <View
                              key={i}
                              style={{
                                width: 16,
                                height: 16,
                                borderWidth: 1,
                                borderColor: 'white',
                                borderRadius: 4,
                                backgroundColor: complete ? 'pink' : '#DDDDDD',
                              }}
                            />
                          ))}
                        </View>
                      ))}
                      <Text style={{marginTop: 8}}>{bingo?.nickName}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
          <Memo content={data?.memo} readonly={READ_ONLY} />
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          onClose={() => setModalState('none')}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={MODAL[modalState].height}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
            },
            draggableIcon: {
              backgroundColor: '#D9D9D9',
            },
            container: {borderTopLeftRadius: 20, borderTopRightRadius: 20},
          }}>
          {MODAL[modalState].content}
        </RBSheet>
      </SafeAreaView>
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
  miniboardContainer: {marginTop: 40, paddingHorizontal: 20},
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
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
    borderColor: 'rgba(58, 138, 219, 0.30)',
    marginLeft: 8,
    marginBottom: 3,
  },
  remainingDaysText: {
    color: '#3A8ADB',
    fontSize: 13,
    fontFamily: 'NotoSansKR_600Regular',
    fontWeight: '600',
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
