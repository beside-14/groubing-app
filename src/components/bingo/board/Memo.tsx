import {useAtom, useSetAtom} from 'jotai'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Text, View} from 'react-native'
import {update_memo_atom} from 'screens/board/store'

//memoupdate!!!
export const Memo = ({content}: {content: string}) => {
  const setState = useSetAtom(update_memo_atom)
  const edit = () => {
    setState({mode: true, content: content})
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>메모</Text>
        <TouchableOpacity onPress={() => edit()}>
          <Text style={styles.edit}>{content ? '수정하기' : '작성하기'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.block}>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  row: {display: 'flex', justifyContent: 'space-between', flexDirection: 'row'},
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  edit: {
    fontSize: 13,
  },
  block: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    marginTop: 12,
  },
})
