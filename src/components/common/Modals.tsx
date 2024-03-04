import {modalStore, useModal} from 'hooks/useModal'
import {useAtomValue} from 'jotai'
import React, {useEffect, useRef} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'

export const BottomSheetContainer = ({type, children, height}) => {
  const refRBSheet = useRef()
  const {isOpen, onClose, onOpen} = useModal(type)

  useEffect(() => {
    isOpen ? refRBSheet?.current?.open() : refRBSheet?.current?.close()
  }, [isOpen])

  return (
    <RBSheet
      ref={refRBSheet}
      onClose={() => onClose()}
      closeOnDragDown={true}
      closeOnPressMask={true}
      dragFromTopOnly={true}
      height={height}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
        },
        draggableIcon: {
          backgroundColor: '#D9D9D9',
        },
        container: {borderTopLeftRadius: 20, borderTopRightRadius: 20},
      }}>
      {/* {MODAL[modalState].content} */}
      {children}
    </RBSheet>
  )
}

const modals = {
  board_more: <Text>board_more</Text>,
  public: <Text>public</Text>,
  invite: <Text>invite</Text>,
  date: <Text>date</Text>,
  register_bingo: <Text>register_bingo</Text>,
  register_memo: <Text>register_memo</Text>,
  feed_more: (
    <View>
      <View style={{width: '100%', padding: 20}}>
        <TouchableOpacity
          //   onPress={() => requestFriend(id)}
          style={{paddingVertical: 15}}>
          <Text style={{fontWeight: '700', fontSize: 18}}>{'dd'}님에게 친구신청</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{paddingVertical: 15}}>
          <Text style={{fontWeight: '700', fontSize: 18}}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
}

const SwitchBlock = ({modals}) => {
  const modalKeys: any = useAtomValue(modalStore) //이 부부분 타입 ㅇ알아내기
  const openedModal: any = Object.keys(modalKeys).find(key => modalKeys[key] === true)

  return (
    <BottomSheetContainer height={300} type={openedModal}>
      {modals[openedModal]}
    </BottomSheetContainer>
  )
}

export const Modals = ({data}: {data?: any}) => <SwitchBlock modals={modals} />
