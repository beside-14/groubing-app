import {StyleSheet, SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, TextInput, Image, Alert} from 'react-native'

import React, {useState} from 'react'

import {useRoute} from '@react-navigation/native'
import {useAtom, useSetAtom} from 'jotai'
import {registerItem} from '../remote/bingo'
import {register_item_atom, retech_atom, update_memo_atom} from '../store'
import {updateMemo} from 'components/bingo/board/remote'

export const TestInput = () => {
  const {params} = useRoute()
  const {id: boardId} = params || {}
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

    reset()
    setState({mode: false, id: null})
    setRetech(true)
  }
  if (!state.mode) return null
  return (
    <View
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'rbga(0,0,0,0.3)',
        zIndex: 20,
      }}>
      <View style={{marginTop: 60, backgroundColor: 'white', padding: 20, width: '80%', borderWidth: 1, borderRadius: 5}}>
        <TextInput
          placeholder="제목을 입력해주세요"
          onChangeText={t => setContent(prev => ({...prev, title: t}))}
          value={content.title}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular', marginBottom: 12}}
        />
        <TextInput
          placeholder="내용을 입력해주세요"
          onChangeText={t => setContent(prev => ({...prev, subTitle: t}))}
          value={content.subTitle}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular'}}
        />
        <TouchableOpacity onPress={() => addItem()} style={{backgroundColor: 'black', padding: 5, marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'white'}}>제출</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            reset()
            setState({mode: false, id: null})
          }}
          style={{backgroundColor: 'black', padding: 5, marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'white'}}>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const TestMemoInput = () => {
  const {params} = useRoute()
  const {id} = params || {}

  const [state, setState] = useAtom(update_memo_atom)
  const [content, setContent] = useState<string>(state.content)
  const setRetech = useSetAtom(retech_atom)

  const reset = () => {
    setContent('')
  }

  const update = async () => {
    if (!id) return

    const res = await updateMemo(id, content)

    if (res.status !== 200) return Alert.alert('요청이 원활하지 않습니다')
    reset()
    setState({mode: false, content: ''})
    setRetech(true)
  }
  if (!state.mode) return null
  return (
    <View
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'rbga(0,0,0,0.3)',
        zIndex: 20,
      }}>
      <View style={{marginTop: 60, backgroundColor: 'white', padding: 20, width: '80%', borderWidth: 1, borderRadius: 5}}>
        <TextInput
          placeholder="내용을 입력하세요."
          onChangeText={t => setContent(t)}
          value={content}
          style={{borderBottomWidth: 1, fontSize: 16, width: '100%', height: 45, fontFamily: 'NotoSansKR_400Regular', marginBottom: 12}}
        />

        <TouchableOpacity onPress={() => update()} style={{backgroundColor: 'black', padding: 5, marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'white'}}>제출</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            reset()
            setState({mode: false, content: ''})
          }}
          style={{backgroundColor: 'black', padding: 5, marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'white'}}>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
