import React from 'react'
import {TouchableOpacity, View} from 'react-native'

export const BingoEditModal = () => {
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
        {/* <TextInput
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
            </TouchableOpacity> */}
      </View>
    </View>
  )
}
