import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet'
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native'
import {Images} from 'assets'
import {useAtom, useSetAtom} from 'jotai'
import {registerItem} from 'screens/board/remote/bingo'
import {register_item_atom, retech_atom} from 'screens/board/store'

export const ItemRegisterSheet = ({boardId}: {boardId: number | undefined}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['25%', '40%'], [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  //

  const [state, setState] = useAtom(register_item_atom)
  const [content, setContent] = useState<{title: string; subTitle: string}>({
    title: '',
    subTitle: '',
  })
  const setRetech = useSetAtom(retech_atom)
  const reset = () => {
    setContent({
      title: '',
      subTitle: '',
    })
  }
  const addItem = async () => {
    if (!boardId) return

    const res = await registerItem(content, boardId, state.id as number)
    console.log('additem 결과값:', res)
    reset()
    bottomSheetRef?.current?.close()
    setState({mode: false, id: null})
    setRetech(true)
  }

  return (
    <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} keyboardBehavior="fillParent" onChange={handleSheetChanges}>
      <View style={styles.sheetContainer}>
        <View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => bottomSheetRef?.current?.close()} style={styles.arrowWrapper}>
              <Image style={styles.arrow} source={Images.back_btn} />
            </TouchableOpacity>
            <Text style={styles.title}>항목 작성</Text>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>제목</Text>
            <BottomSheetTextInput
              onChangeText={t => setContent(prev => ({...prev, title: t}))}
              value={content.title}
              placeholder="빙고 항목의 타이틀을 작성하세요."
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>내용</Text>
            <BottomSheetTextInput
              onChangeText={t => setContent(prev => ({...prev, subTitle: t}))}
              value={content.subTitle}
              placeholder="자세한 내용을 작성하세요."
              style={styles.input}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => addItem()} style={styles.registerButton}>
          <Text style={styles.btnText}>완료</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  sheetContainer: {padding: 20, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: 1},
  arrow: {width: 30, height: 30},
  title: {marginLeft: 2, fontWeight: '500', fontSize: 18},
  arrowWrapper: {paddingVertical: 5, paddingRight: 8},
  row: {display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 24},
  inputWrapper: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16},
  inputTitle: {fontSize: 15, fontWeight: '500', paddingVertical: 14},
  registerButton: {backgroundColor: 'black', borderRadius: 4, textAlign: 'center', padding: 14},
  btnText: {color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 16},
  input: {
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
    color: 'black',
    borderBottomWidth: 1,
    width: '90%',
    borderColor: '#DDDDDD',
  },
})
